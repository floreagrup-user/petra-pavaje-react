import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { Camera, Download, Info, ImagePlus, Loader2, RotateCcw, ShieldCheck, Sparkles, Trash2, Undo2 } from 'lucide-react'
import { products } from '@/data/products'
import type { Product } from '@/data/types'
import { productUrl } from '@/lib/product-urls'
import { useTurnstile } from '@/hooks/useTurnstile'
import { compositeIntoZone, markZone, prepareReference, preparePhoto, type Point, type PreparedPhoto } from './visualizer-image'
import { CONSENT_VERSION, DAILY_LIMIT, GLOBAL_DAILY_CAP } from './consent-texts'
import { FirstImageDialog } from './FirstImageDialog'
import { NewsletterOptIn } from './NewsletterOptIn'

interface QuotaState {
  limit: number
  remaining: number
}

type Category = 'premium' | 'standard'

// Tactile, parking and cycle-lane slabs are public-space markings, not
// something a client lays in a yard, so they stay out of the picker.
const EXCLUDED = /Tactil|Parcare|Biciclete/
const CATALOG: Record<Category, Product[]> = {
  premium: products.filter((p) => p.category === 'premium' && p.image && p.colors.length > 0),
  standard: products.filter((p) => p.category === 'standard' && p.image && p.colors.length > 0 && !EXCLUDED.test(p.name)),
}

const ERRORS: Record<string, string> = {
  'daily-limit': `Ai folosit cele ${DAILY_LIMIT} imagini de azi. Poți genera din nou după ora 00:00.`,
  'global-cap': `Azi s-a atins limita de ${GLOBAL_DAILY_CAP} de imagini pentru tot site-ul. Revino mâine, după ora 00:00, sau cere o ofertă și te ajutăm noi cu o propunere.`,
  'verification-failed': 'Nu am putut confirma că ești o persoană reală. Reîncarcă pagina și încearcă din nou.',
  'no-image':
    'AI-ul nu a reușit să genereze o imagine pentru această fotografie. Încearcă o fotografie mai luminoasă sau marchează zona mai clar. Încercarea nu a fost consumată.',
  'zone-required': 'Marchează zona de pavat pe fotografie, apoi încearcă din nou.',
  'consent-required': 'Pentru a genera imaginea este nevoie de acordul tău. Apasă din nou pe Generează și bifează cele două acorduri.',
  'not-configured': 'Vizualizatorul nu este disponibil momentan. Încearcă mai târziu.',
}
const GENERIC_ERROR = 'Generarea nu a reușit. Încercarea nu a fost consumată, poți reîncerca.'

// The first-image dialog is shown once per browser tab for each version of
// the consent texts. Storage can be blocked (private mode), hence try/catch.
const CONSENT_KEY = `pv-viz-consent-${CONSENT_VERSION}`
function consentGiven(): boolean {
  try {
    return sessionStorage.getItem(CONSENT_KEY) === '1'
  } catch {
    return false
  }
}
function rememberConsent() {
  try {
    sessionStorage.setItem(CONSENT_KEY, '1')
  } catch {
    // the dialog will simply be shown again after a reload
  }
}

const TOOL_BUTTON =
  'inline-flex items-center gap-1.5 rounded-md border border-charcoal-300 px-3 py-2 text-sm text-charcoal-700 hover:bg-charcoal-100 active:bg-charcoal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none'

export function PavingVisualizer() {
  const [photo, setPhoto] = useState<PreparedPhoto | null>(null)
  const [photoError, setPhotoError] = useState<string | null>(null)
  const [points, setPoints] = useState<Point[]>([])
  const [category, setCategory] = useState<Category>('premium')
  const [productSlug, setProductSlug] = useState<string>(CATALOG.premium[0]?.slug ?? '')
  const [colorName, setColorName] = useState<string>(CATALOG.premium[0]?.colors[0]?.name ?? '')
  const [consent, setConsent] = useState(consentGiven)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [compare, setCompare] = useState(50)
  const [quota, setQuota] = useState<QuotaState | null>(null)

  const stageRef = useRef<HTMLDivElement>(null)
  const dragIndex = useRef<number | null>(null)
  const { containerRef: turnstileRef, getToken } = useTurnstile()

  const product = useMemo(
    () => [...CATALOG.premium, ...CATALOG.standard].find((p) => p.slug === productSlug) ?? null,
    [productSlug],
  )
  const color = product?.colors.find((c) => c.name === colorName) ?? product?.colors[0] ?? null
  const hasZone = points.length >= 3
  const outOfTries = quota !== null && quota.remaining <= 0

  useEffect(() => {
    let cancelled = false
    fetch('/api/visualizer/quota')
      .then((r) => (r.ok ? r.json() : null))
      .then((q) => {
        if (!cancelled && q && typeof q.remaining === 'number') setQuota({ limit: q.limit, remaining: q.remaining })
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(
    () => () => {
      if (photo) URL.revokeObjectURL(photo.url)
    },
    [photo],
  )

  async function onFile(file: File | undefined) {
    if (!file) return
    setPhotoError(null)
    if (!file.type.startsWith('image/')) {
      setPhotoError('Fișierul ales nu este o imagine. Alege o fotografie JPG, PNG sau HEIC.')
      return
    }
    try {
      const prepared = await preparePhoto(file)
      setPhoto(prepared)
      setPoints([])
      setResult(null)
      setError(null)
    } catch {
      setPhotoError('Nu am putut deschide fotografia. Încearcă altă fotografie, în format JPG sau PNG.')
    }
  }

  function selectCategory(next: Category) {
    setCategory(next)
    const first = CATALOG[next][0]
    if (first) {
      setProductSlug(first.slug)
      setColorName(first.colors[0]?.name ?? '')
    }
  }

  function selectProduct(p: Product) {
    setProductSlug(p.slug)
    setColorName(p.colors[0]?.name ?? '')
  }

  function pointFromEvent(e: ReactPointerEvent): Point | null {
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return null
    return {
      x: Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)),
    }
  }

  function onStagePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (result || loading) return
    const handle = (e.target as HTMLElement).closest<HTMLElement>('[data-vertex]')
    if (handle) {
      dragIndex.current = Number(handle.dataset.vertex)
      e.currentTarget.setPointerCapture(e.pointerId)
      return
    }
    const p = pointFromEvent(e)
    if (p) setPoints((prev) => [...prev, p])
  }

  function onStagePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (dragIndex.current === null) return
    const p = pointFromEvent(e)
    const index = dragIndex.current
    if (p) setPoints((prev) => prev.map((q, i) => (i === index ? p : q)))
  }

  function onStagePointerUp() {
    dragIndex.current = null
  }

  function requestGenerate() {
    if (!photo || !product || !color || !hasZone || loading || outOfTries) return
    if (!consent) {
      setDialogOpen(true)
      return
    }
    generate()
  }

  function acceptDialog() {
    rememberConsent()
    setConsent(true)
    setDialogOpen(false)
    generate()
  }

  async function generate() {
    if (!photo || !product || !color || !hasZone || loading) return
    setLoading(true)
    setError(null)
    try {
      const [pattern, swatch, marked] = await Promise.all([
        prepareReference(product.image, true),
        color.image ? prepareReference(color.image).catch(() => null) : Promise.resolve(null),
        markZone(photo, points),
      ])
      // If the challenge never answers (blocked script, unsupported host),
      // send no token rather than spin forever; the server decides.
      const turnstileToken = await Promise.race([
        getToken(),
        new Promise<string>((resolve) => setTimeout(() => resolve(''), 15_000)),
      ])

      const res = await fetch('/api/visualizer/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Only the photo with the zone covered leaves the browser; the
        // original ground is never sent.
        body: JSON.stringify({
          marked,
          pattern,
          swatch,
          width: photo.width,
          height: photo.height,
          productSlug: product.slug,
          colorName: color.name,
          consentPhoto: true,
          consentAge: true,
          consentVersion: CONSENT_VERSION,
          turnstileToken,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.image) {
        if (data.error === 'daily-limit') setQuota((q) => (q ? { ...q, remaining: 0 } : q))
        if (data.error === 'consent-required') setConsent(false)
        setError(ERRORS[data.error] ?? GENERIC_ERROR)
        return
      }

      // The model's output is only ever shown pasted into the marked zone of
      // the client's own photo, re-encoded in the browser.
      const raw = `data:${data.mimeType || 'image/png'};base64,${data.image}`
      const composite = await compositeIntoZone(photo, raw, points)
      setResult(composite)
      setCompare(50)
      if (typeof data.remaining === 'number') setQuota({ limit: data.limit, remaining: data.remaining })
    } catch {
      setError(GENERIC_ERROR)
    } finally {
      setLoading(false)
    }
  }

  const shownResult = result
  const polygon = points.map((p) => `${p.x * 100},${p.y * 100}`).join(' ')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-6 lg:gap-8 items-start">
      {/* Workspace */}
      <div className="min-w-0">
        {!photo ? (
          <div className="rounded-2xl border-2 border-dashed border-charcoal-300 bg-charcoal-50 p-8 md:p-12 text-center">
            <ImagePlus className="w-10 h-10 text-brand-600 mx-auto mb-4" aria-hidden="true" />
            <h2 className="heading-h3 text-charcoal-900 mb-2">Încarcă o fotografie cu curtea ta</h2>
            <p className="text-body-sm text-charcoal-600 max-w-md mx-auto mb-6">
              Fotografiază zona din picioare, la lumina zilei, cu toată suprafața în cadru. Merge și o poză făcută cu telefonul.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <label className="btn-primary cursor-pointer gap-2 focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2">
                <ImagePlus className="w-5 h-5" aria-hidden="true" />
                Alege o fotografie
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
              </label>
              <label className="btn-secondary cursor-pointer gap-2 sm:hidden focus-within:ring-2 focus-within:ring-charcoal-500 focus-within:ring-offset-2">
                <Camera className="w-5 h-5" aria-hidden="true" />
                Fă o poză
                <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
              </label>
            </div>
            {photoError && (
              <p role="alert" className="mt-4 text-sm text-red-700">
                {photoError}
              </p>
            )}
          </div>
        ) : (
          <div>
            <div
              ref={stageRef}
              className={`relative mx-auto overflow-hidden rounded-2xl bg-charcoal-900 select-none touch-none ${result || loading ? '' : 'cursor-crosshair'}`}
              // Portrait phone photos would be taller than the screen; cap the
              // height at 75vh and let the width follow the photo's ratio.
              style={{
                aspectRatio: `${photo.width} / ${photo.height}`,
                width: `min(100%, calc(75vh * ${photo.width / photo.height}))`,
              }}
              onPointerDown={onStagePointerDown}
              onPointerMove={onStagePointerMove}
              onPointerUp={onStagePointerUp}
              onPointerCancel={onStagePointerUp}
            >
              <img src={photo.url} alt="Fotografia ta" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

              {shownResult ? (
                <>
                  <img
                    src={shownResult}
                    alt={`Vizualizare generată cu ${product?.name ?? 'pavajul ales'}, culoarea ${color?.name ?? ''}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ clipPath: `inset(0 0 0 ${compare}%)` }}
                    draggable={false}
                  />
                  <div className="absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${compare}%` }} aria-hidden="true" />
                  <span className="absolute top-3 left-3 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">Înainte</span>
                  <span className="absolute top-3 right-3 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">După</span>
                </>
              ) : (
                <>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    {points.length >= 2 && (
                      <polygon
                        points={polygon}
                        fill={hasZone ? 'rgba(255,0,255,0.3)' : 'none'}
                        stroke="rgb(255,0,255)"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                    )}
                  </svg>
                  {points.map((p, i) => (
                    <span
                      key={i}
                      data-vertex={i}
                      className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white bg-[rgb(255,0,255)] shadow cursor-grab"
                      style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
                      aria-hidden="true"
                    />
                  ))}
                </>
              )}

              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/55 text-white text-center p-6" role="status" aria-live="polite">
                  <Loader2 className="w-8 h-8 animate-spin" aria-hidden="true" />
                  <p className="font-medium">Se generează imaginea</p>
                  <p className="text-sm text-white/80">Durează de obicei între 10 și 30 de secunde.</p>
                </div>
              )}
            </div>

            {result ? (
              <div className="mt-4 space-y-4">
                <label className="flex items-center gap-3 text-sm text-charcoal-700">
                  <span className="shrink-0">Înainte</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={compare}
                    onChange={(e) => setCompare(Number(e.target.value))}
                    className="w-full accent-brand-600"
                    aria-label="Compară fotografia originală cu vizualizarea"
                  />
                  <span className="shrink-0">După</span>
                </label>
                <p className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-900">
                  Imagine orientativă, generată automat cu inteligență artificială. Modelul, culoarea și dimensiunile reale ale
                  pavajului pot diferi de cele din imagine. Pentru alegerea finală, vezi mostrele în fabrică sau cere sfatul unui
                  specialist Petra Pavaje.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={shownResult ?? undefined} download={`vizualizare-${product?.slug ?? 'pavaj'}.jpg`} className="btn-primary gap-2">
                    <Download className="w-5 h-5" aria-hidden="true" />
                    Descarcă imaginea
                  </a>
                  <Link to="/contact" className="btn-secondary">
                    Cere o ofertă
                  </Link>
                  <button type="button" onClick={() => setResult(null)} className={TOOL_BUTTON}>
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    Încearcă alt pavaj
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <p className="text-sm text-charcoal-600 mr-auto">
                  {points.length === 0
                    ? 'Atinge fotografia ca să pui puncte pe conturul zonei de pavat.'
                    : points.length < 3
                      ? `Încă ${3 - points.length} ${3 - points.length === 1 ? 'punct' : 'puncte'} și zona e gata.`
                      : 'Zona e marcată. Poți muta punctele trăgând de ele.'}
                </p>
                <button type="button" onClick={() => setPoints((prev) => prev.slice(0, -1))} disabled={points.length === 0 || loading} className={TOOL_BUTTON}>
                  <Undo2 className="w-4 h-4" aria-hidden="true" />
                  Ultimul punct
                </button>
                <button type="button" onClick={() => setPoints([])} disabled={points.length === 0 || loading} className={TOOL_BUTTON}>
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                  Șterge zona
                </button>
                <label className={`${TOOL_BUTTON} cursor-pointer focus-within:ring-2 focus-within:ring-brand-500`}>
                  <ImagePlus className="w-4 h-4" aria-hidden="true" />
                  Altă fotografie
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} disabled={loading} />
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Steps */}
      <div className="min-w-0 rounded-2xl bg-charcoal-50 p-5 md:p-6 space-y-6">
        <section aria-labelledby="viz-step-zone">
          <h2 id="viz-step-zone" className="text-sm font-semibold uppercase tracking-wider text-charcoal-500 mb-2">
            1. Fotografia și zona
          </h2>
          <p className="text-sm text-charcoal-700">
            {!photo
              ? 'Încarcă fotografia curții.'
              : hasZone
                ? `Zonă marcată cu ${points.length} puncte.`
                : 'Marchează zona de pavat: atinge fotografia în cel puțin 3 puncte de pe contur.'}
          </p>
          {photo && (
            <p className="mt-2 text-xs text-charcoal-500">
              Mobilierul, ghivecele sau alte obiecte aflate în zonă sunt redesenate automat și pot arăta diferit.
            </p>
          )}
        </section>

        <section aria-labelledby="viz-step-product">
          <h2 id="viz-step-product" className="text-sm font-semibold uppercase tracking-wider text-charcoal-500 mb-3">
            2. Pavajul
          </h2>
          <div className="grid grid-cols-2 gap-1 rounded-lg bg-charcoal-200/70 p-1 mb-3" role="group" aria-label="Gama de pavaje">
            {(['premium', 'standard'] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => selectCategory(c)}
                aria-pressed={category === c}
                className={`rounded-md py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  category === c ? 'bg-white text-charcoal-900 shadow-sm' : 'text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                {c === 'premium' ? 'Premium' : 'Standard'}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto p-0.5">
            {CATALOG[category].map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => selectProduct(p)}
                aria-pressed={productSlug === p.slug}
                className={`text-left rounded-lg overflow-hidden bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  productSlug === p.slug ? 'ring-2 ring-brand-600' : 'ring-1 ring-charcoal-200 hover:ring-charcoal-400'
                }`}
              >
                <img src={p.image} alt="" loading="lazy" className="w-full aspect-square object-cover" />
                <span className="block px-1.5 py-1 text-[11px] leading-tight font-medium text-charcoal-800 line-clamp-2">{p.name}</span>
              </button>
            ))}
          </div>

          {product && (
            <div className="mt-4">
              <p className="text-sm text-charcoal-700 mb-2">
                Culoare: <span className="font-semibold text-charcoal-900">{color?.name}</span>
              </p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Culoarea pavajului">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColorName(c.name)}
                    aria-pressed={color?.name === c.name}
                    aria-label={c.name}
                    title={c.name}
                    className={`w-9 h-9 rounded-full overflow-hidden border border-charcoal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                      color?.name === c.name ? 'ring-2 ring-brand-600 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {c.image && <img src={c.image} alt="" loading="lazy" className="w-full h-full object-cover" />}
                  </button>
                ))}
              </div>
              <Link
                to={productUrl(product.category === 'premium' ? 'pavaje-premium' : 'pavaje-standard', product.slug)}
                className="mt-3 inline-block text-sm text-brand-700 hover:text-brand-800 underline underline-offset-2"
              >
                Vezi detaliile produsului {product.name}
              </Link>
            </div>
          )}
        </section>

        <section aria-labelledby="viz-step-generate">
          <h2 id="viz-step-generate" className="text-sm font-semibold uppercase tracking-wider text-charcoal-500 mb-3">
            3. Generează
          </h2>
          <div role="note" className="mb-3 flex gap-2 rounded-lg border border-brand-200 bg-brand-50 p-3 text-sm text-charcoal-800">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
            <p>
              Poți genera <strong>maximum {DAILY_LIMIT} imagini pe zi</strong>, gratuit și fără cont. Numărătoarea pornește din nou la ora
              00:00.
            </p>
          </div>
          <div className="rounded-lg bg-white border border-charcoal-200 p-4 text-sm text-charcoal-700 space-y-2 mb-4">
            <p className="flex items-center gap-2 font-semibold text-charcoal-900">
              <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" aria-hidden="true" />
              Pe scurt, despre datele tale
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Fotografia este trimisă unui furnizor extern de servicii de inteligență artificială doar pentru a genera imaginea. Petra
                Pavaje nu o salvează.
              </li>
              <li>Nu încărca fotografii în care se văd persoane, numere de înmatriculare sau documente.</li>
            </ul>
            <p>
              Înainte de prima imagine îți arătăm toate detaliile și îți cerem acordul. Vezi și{' '}
              <Link to="/confidentialitate" className="text-brand-700 underline underline-offset-2">
                Politica de confidențialitate
              </Link>
              .
            </p>
          </div>

          <div ref={turnstileRef} />

          <button
            type="button"
            onClick={requestGenerate}
            disabled={!photo || !hasZone || !product || loading || outOfTries}
            aria-busy={loading}
            className="btn-primary w-full gap-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Sparkles className="w-5 h-5" aria-hidden="true" />}
            {loading ? 'Se generează' : 'Generează vizualizarea'}
          </button>
          <p className="mt-2 text-xs text-charcoal-600 text-center">
            {quota
              ? outOfTries
                ? `Ai folosit cele ${quota.limit} imagini de azi. Revino după ora 00:00.`
                : `Îți ${quota.remaining === 1 ? 'mai rămâne o imagine' : `mai rămân ${quota.remaining} imagini`} azi, din ${quota.limit}.`
              : `Maximum ${DAILY_LIMIT} imagini pe zi.`}
            {!photo ? ' Încarcă întâi o fotografie.' : !hasZone ? ' Marchează zona de pavat pe fotografie.' : ''}
          </p>
          {error && (
            <p role="alert" className="mt-3 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
              {error}
            </p>
          )}

          <div className="mt-6">
            <NewsletterOptIn getToken={getToken} hasResult={result !== null} />
          </div>
        </section>
      </div>
      <FirstImageDialog open={dialogOpen} onCancel={() => setDialogOpen(false)} onAccept={acceptDialog} />
    </div>
  )
}
