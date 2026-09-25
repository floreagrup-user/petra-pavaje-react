import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Calculator, Home, MessageCircle, Search } from 'lucide-react'
import { upsertMeta, resetSEO } from '@/hooks/seo-utils'
import { categories } from '@/data/site'
import { categoryUrl } from '@/lib/product-urls'
import { trackEvent } from '@/lib/analytics'
import { categoryImages } from '@/components/sections/CategoriesSection'

const FEATURED = ['pavaje-premium', 'pavaje-standard', 'borduri', 'garduri', 'boltari', 'woodstone-lemn-pietrificat']
const featured = FEATURED.map((slug) => categories.find((c) => c.slug === slug)).filter((c) => c !== undefined)

const tokens = (path: string) =>
  path
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2 && !/^\d+$/.test(t))

// Scores every sitemap route against the words in the broken URL, weighting
// rare words higher (IDF), so "/cum-construiesti-un-gard-2/" finds the blog
// article rather than every page that happens to contain "pavaje".
function suggest(path: string, routes: string[]): string[] {
  const wanted = new Set(tokens(path))
  if (!wanted.size) return []
  const docs = routes.map((r) => new Set(tokens(r)))
  const df = new Map<string, number>()
  docs.forEach((d) => d.forEach((t) => df.set(t, (df.get(t) ?? 0) + 1)))
  return routes
    .map((route, i) => {
      let score = 0
      docs[i].forEach((t) => {
        if (wanted.has(t)) score += Math.log(routes.length / df.get(t)!)
      })
      return { route, score }
    })
    .filter((s) => s.score > 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.route)
}

function routeLabel(route: string) {
  const parts = route.split('/').filter(Boolean)
  const last = parts[parts.length - 1] ?? ''
  const title = last.replace(/-/g, ' ')
  const section = parts[0] === 'blog' ? 'Articol' : parts.length > 1 ? 'Produs' : 'Pagină'
  return { section, title: title.charAt(0).toUpperCase() + title.slice(1) }
}

// 6x4 running-bond paver field; one stone lifted out of its slot.
const ROWS = 4
const COLS = 6
const MISSING = { row: 1, col: 3 }

function PaverField() {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md select-none">
      <div className="space-y-2 overflow-hidden rounded-2xl bg-stone-200/70 p-3 shadow-inner ring-1 ring-stone-300/60">
        {Array.from({ length: ROWS }, (_, row) => (
          <div key={row} className={`flex gap-2 ${row % 2 ? '-ml-8' : ''}`}>
            {Array.from({ length: COLS + (row % 2) }, (_, col) => {
              const missing = row === MISSING.row && col === MISSING.col
              return (
                <motion.div
                  key={col}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (row * COLS + col) * 0.02, duration: 0.4 }}
                  className={
                    missing
                      ? 'h-14 flex-1 rounded-md border-2 border-dashed border-brand-500/70 bg-stone-300/40'
                      : 'h-14 flex-1 rounded-md bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300 shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_1px_2px_rgba(43,35,29,.15)]'
                  }
                />
              )
            })}
          </div>
        ))}
      </div>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20, rotate: 0 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: [-6, 6, -6], rotate: [-8, -5, -8] }}
        transition={reduce ? undefined : { y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.5, delay: 0.6 } }}
        className="absolute -top-10 right-6 flex h-14 w-24 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold tracking-tight text-white shadow-2xl shadow-brand-900/30"
      >
        404
      </motion.div>
    </div>
  )
}

export function NotFoundPage() {
  const { pathname } = useLocation()
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    document.title = 'Pagina nu a fost găsită | Petra Pavaje'
    upsertMeta('name', 'robots', 'noindex, follow')
    return resetSEO
  }, [])

  useEffect(() => {
    trackEvent('page_not_found', { page_path: pathname })
    let cancelled = false
    fetch('/sitemap.xml')
      .then((r) => (r.ok ? r.text() : ''))
      .then((xml) => {
        const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
        if (!cancelled) setSuggestions(suggest(pathname, routes))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [pathname])

  return (
    <div className="bg-stone-50">
      <section className="container-premium grid items-center gap-16 pt-32 pb-20 lg:grid-cols-2 lg:pt-40 lg:pb-28">
        <div>
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-brand-600 uppercase">Eroare 404</p>
          <h1 className="heading-display mb-6 text-charcoal-900">Aici lipsește o pavea.</h1>
          <p className="text-body mb-3 max-w-lg text-charcoal-600">
            Pagina pe care o cauți nu există sau a fost mutată. Site-ul nostru a fost reconstruit, așa că unele adrese
            vechi nu mai funcționează.
          </p>
          <p className="mb-10 max-w-lg truncate font-mono text-sm text-charcoal-500" title={pathname}>
            {pathname}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/" className="btn-primary gap-2">
              <Home className="h-4 w-4" aria-hidden="true" />
              Pagina principală
            </Link>
            <Link to="/produse" className="btn-secondary">
              Vezi produsele
            </Link>
          </div>
        </div>
        <PaverField />
      </section>

      {suggestions.length > 0 && (
        <section className="container-premium pb-16" aria-labelledby="nf-suggestions">
          <h2 id="nf-suggestions" className="mb-5 flex items-center gap-2 text-lg font-semibold text-charcoal-900">
            <Search className="h-5 w-5 text-brand-600" aria-hidden="true" />
            Poate căutai
          </h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {suggestions.map((route) => {
              const { section, title } = routeLabel(route)
              return (
                <li key={route}>
                  <Link
                    to={route}
                    onClick={() => trackEvent('not_found_suggestion_click', { from: pathname, to: route })}
                    className="group flex h-full items-center justify-between gap-4 rounded-xl bg-white p-5 ring-1 ring-charcoal-100 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-brand-200 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
                  >
                    <span>
                      <span className="mb-1 block text-xs font-medium tracking-wider text-stone-600 uppercase">{section}</span>
                      <span className="line-clamp-2 font-medium text-charcoal-900">{title}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-charcoal-300 transition group-hover:translate-x-1 group-hover:text-brand-600" aria-hidden="true" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <section className="border-t border-stone-200 bg-white py-16 lg:py-20" aria-labelledby="nf-categories">
        <div className="container-premium">
          <h2 id="nf-categories" className="heading-h3 mb-8 text-charcoal-900">
            Explorează gamele noastre
          </h2>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {featured.map((c) => (
              <li key={c.slug}>
                <Link
                  to={categoryUrl(c.slug)}
                  className="group block overflow-hidden rounded-xl bg-stone-100 ring-1 ring-stone-200 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={categoryImages[c.id] || c.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="flex items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-charcoal-900">
                    {c.name.split(' - ')[0]}
                    <ArrowRight className="h-4 w-4 text-charcoal-300 transition group-hover:translate-x-1 group-hover:text-brand-600" aria-hidden="true" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Link
              to="/calculator-pavaj"
              className="group flex items-center gap-5 rounded-2xl bg-charcoal-900 p-6 text-white transition hover:bg-charcoal-800 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Calculator className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="block font-semibold">Calculator pavaj</span>
                <span className="text-sm text-white/70">Află câte pavele îți trebuie în câteva secunde.</span>
              </span>
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="group flex items-center gap-5 rounded-2xl bg-brand-600 p-6 text-white transition hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <MessageCircle className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="block font-semibold">Nu găsești ce cauți?</span>
                <span className="text-sm text-white/80">Scrie-ne și te ajutăm să alegi produsul potrivit.</span>
              </span>
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
