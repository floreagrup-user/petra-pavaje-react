// Paving visualizer: lays a chosen Petra Pavaje product into the client's
// own photo with Google's Gemini image model. Photos are only held in memory
// for the length of this request and are never stored by the site. The
// product name, formats and colour come from the site's own data, never
// from the client, so the prompt cannot be steered with free text.

import { verifyTurnstile } from '../_turnstile'
import { clientIp, hashValue, quotaStatus, reserve } from './_quota'
import { recordConsents } from './_consent'
import { json } from './_http'
import { productShape } from './_shapes'
import { products } from '../../../src/data/products'

// Chosen after side-by-side tests: 2.5 Flash Image kept the old paving's
// layout and only recoloured it; 3.1 Flash Image lays the chosen pattern.
const DEFAULT_MODEL = 'gemini-3.1-flash-image'
// Base64 lengths: about 4.5 MB for the photo, 1.5 MB for each reference.
const MAX_PHOTO_B64 = 6_000_000
const MAX_REF_B64 = 2_000_000
const ASPECT_RATIOS = ['1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9']

function isBase64Image(value: unknown, max: number): value is string {
  return typeof value === 'string' && value.length > 100 && value.length <= max && /^[A-Za-z0-9+/=]+$/.test(value)
}

function nearestAspectRatio(width: number, height: number): string {
  if (!(width > 0 && height > 0)) return '4:3'
  const target = width / height
  let best = ASPECT_RATIOS[0]
  let bestDiff = Infinity
  for (const ratio of ASPECT_RATIOS) {
    const [w, h] = ratio.split(':').map(Number)
    const diff = Math.abs(Math.log(w / h / target))
    if (diff < bestDiff) {
      best = ratio
      bestDiff = diff
    }
  }
  return best
}

// The model gets the client's photo with the zone covered in solid magenta,
// never the original ground: when the old paving showed through, it kept
// its pattern instead of laying the chosen product.
function buildPrompt(opts: { name: string; formats: string; shape: string; colour: string; hasSwatch: boolean }) {
  const { name, formats, shape, colour, hasSwatch } = opts
  return [
    "Image 1 is a real photo of a client's yard or property in which the area to pave has been covered with solid magenta.",
    `Image 2 shows the paving product "${name}" by Petra Pavaje already laid on the ground. Use it only as the reference for the stone shape, size, joints and laying pattern.`,
    hasSwatch
      ? `Image 3 is a close-up of the colour and surface finish "${colour}". The paving must have exactly this colour and surface texture.`
      : null,
    `The product "${name}" is made of ${shape}. Reproduce exactly this stone shape and scale.`,
    `Task: return a photorealistic version of image 1 in which the whole magenta area is newly paved with this product in colour "${colour}", replacing all of the magenta.`,
    `Available formats of the product: ${formats}. Keep the stones at a realistic scale relative to the house, doors, cars and people, in correct perspective, following the slope of the ground, with realistic joints, clean edges along borders and walls, and shadows and lighting that match the photo.`,
    'Keep everything outside the magenta area exactly as in image 1: the same buildings, plants, objects, framing, camera angle and proportions. Do not add or remove objects.',
    'No magenta may remain. Do not add text, logos or watermarks. Do not copy any objects or people from the reference photos (props, plants, gravel, logos).',
  ].filter(Boolean).join('\n')
}

export async function onRequestPost(context: any) {
  const { env, request } = context
  const apiKey = (env.GEMINI_API_KEY || '').trim()
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set - visualizer is disabled')
    return json({ error: 'not-configured' }, 503)
  }
  if (!env.NEWSLETTER_DB) return json({ error: 'not-configured' }, 503)

  let body: any
  try {
    body = await request.json()
  } catch {
    return json({ error: 'bad-request' }, 400)
  }

  // Both boxes of the first-image dialog: photo processing and age 16+.
  if (body?.consentPhoto !== true || body?.consentAge !== true) return json({ error: 'consent-required' }, 400)
  if (!isBase64Image(body.pattern, MAX_REF_B64)) return json({ error: 'bad-image' }, 400)
  // The zone is mandatory: the client pastes the result back into it, and
  // the photo with the zone covered is the only photo the model receives.
  const marked = body.marked
  const swatch = body.swatch == null ? null : body.swatch
  if (!isBase64Image(marked, MAX_PHOTO_B64)) return json({ error: 'zone-required' }, 400)
  if (swatch !== null && !isBase64Image(swatch, MAX_REF_B64)) return json({ error: 'bad-image' }, 400)

  const product = products.find((p) => p.slug === body.productSlug && (p.category === 'premium' || p.category === 'standard'))
  if (!product) return json({ error: 'unknown-product' }, 400)
  const colour = product.colors.find((c) => c.name === body.colorName)
  if (!colour) return json({ error: 'unknown-colour' }, 400)

  const ip = clientIp(request)
  if (env.TURNSTILE_SECRET_KEY) {
    const human = await verifyTurnstile(body.turnstileToken, env.TURNSTILE_SECRET_KEY, ip)
    if (!human) return json({ error: 'verification-failed' }, 403)
  }

  const who = { ipHash: await hashValue(env, 'ip', ip) }
  const reservation = await reserve(env, who)
  if (!reservation.ok) return json({ error: reservation.reason }, 429)
  await recordConsents(env, `ip:${who.ipHash}`, ['photo', 'age'])

  const formats = product.dimensionsList?.length
    ? product.dimensionsList.slice(0, 8).map((d) => d.label).join(', ')
    : product.dimensions

  const parts: any[] = [
    { text: buildPrompt({ name: product.name, formats, shape: productShape(product.slug, formats), colour: colour.name, hasSwatch: swatch !== null }) },
    { inlineData: { mimeType: 'image/jpeg', data: marked } },
    { inlineData: { mimeType: 'image/jpeg', data: body.pattern } },
  ]
  if (swatch) parts.push({ inlineData: { mimeType: 'image/jpeg', data: swatch } })

  const model = (env.GEMINI_IMAGE_MODEL || DEFAULT_MODEL).trim()
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE'],
          imageConfig: { aspectRatio: nearestAspectRatio(Number(body.width), Number(body.height)) },
        },
      }),
      signal: AbortSignal.timeout(90_000),
    })

    if (!res.ok) {
      console.error('Gemini error', res.status, (await res.text()).slice(0, 500))
      await reservation.release()
      return json({ error: 'generation-failed' }, 502)
    }

    const data: any = await res.json()
    const outParts: any[] = data?.candidates?.[0]?.content?.parts ?? []
    const image = outParts.find((p) => p?.inlineData?.data)?.inlineData
    if (!image) {
      console.error('Gemini returned no image', data?.candidates?.[0]?.finishReason, JSON.stringify(data?.promptFeedback ?? null))
      await reservation.release()
      return json({ error: 'no-image' }, 502)
    }

    return json({
      image: image.data,
      mimeType: image.mimeType || 'image/png',
      ...(await quotaStatus(env, who)),
    })
  } catch (error) {
    console.error('Visualizer generation error', error)
    await reservation.release()
    return json({ error: 'generation-failed' }, 502)
  }
}
