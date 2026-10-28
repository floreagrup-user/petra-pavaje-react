// Same-origin proxy for product photos on the public R2 bucket. The bucket
// sends no CORS headers, so the browser could draw these photos but not
// read them back from a canvas to send them to the visualizer. Only image
// paths inside that one bucket are accepted (some live in folders such as
// 2020/06/), so this is not an open proxy.

const R2_ORIGIN = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'
const FILE_RE = /^(?:[A-Za-z0-9._%-]+\/)*[A-Za-z0-9._%-]+\.(avif|jpe?g|png|webp)$/i

export async function onRequestGet(context: any) {
  const src = new URL(context.request.url).searchParams.get('src') || ''
  if (!FILE_RE.test(src) || src.includes('..')) {
    return new Response('Bad request', { status: 400 })
  }

  const upstream = await fetch(`${R2_ORIGIN}/${src}`, { cf: { cacheTtl: 86400, cacheEverything: true } } as RequestInit)
  if (!upstream.ok) return new Response('Not found', { status: 404 })

  return new Response(upstream.body, {
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') || 'application/octet-stream',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
