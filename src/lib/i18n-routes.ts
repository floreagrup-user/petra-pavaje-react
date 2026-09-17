// Pages that exist in both Romanian (root paths) and English (/en prefix).
// The product catalog, blog and technical documents are intentionally not
// translated (see the scoped /en build), so this list is deliberately a
// small, explicit allowlist rather than "every route" — anything not in it
// has no English counterpart and the language switcher falls back to /en.
export const TRANSLATED_PATHS = [
  '/',
  '/despre-noi',
  '/florea-grup',
  '/sustenabilitate',
  '/garantie',
  '/laborator',
  '/cariera',
  '/calculator-pavaj',
  '/montaj',
  '/modele-de-montaj',
  '/intretinere',
  '/degivrare',
  '/faq',
  '/contact',
  '/compania',
  '/cookie-uri',
] as const

export function isEnglishPath(pathname: string): boolean {
  return pathname === '/en' || pathname.startsWith('/en/')
}

// The Premium and Standard paver catalogs (hub + individual products, incl.
// the nested Quatro hub under Standard) plus the Woodstone -- Petrified Wood
// range (hub + 7 categories) are fully translated -- see
// src/data/products.en.ts, src/pages/QuatroPageEN.tsx and
// src/data/woodstone.en.ts -- unlike the rest of the product catalog, so
// they need their own prefix-match rule alongside the exact-match
// TRANSLATED_PATHS list above.
const TRANSLATED_PREFIXES = ['/pavaje-premium', '/pavaje-standard', '/woodstone-lemn-pietrificat']

// RO path -> EN path for the language switcher. Falls back to the EN
// homepage when the current RO page has no translation.
export function toEnglishPath(roPathname: string): string {
  if (roPathname === '/') return '/en'
  if (TRANSLATED_PREFIXES.some((prefix) => roPathname === prefix || roPathname.startsWith(`${prefix}/`))) {
    return `/en${roPathname}`
  }
  return (TRANSLATED_PATHS as readonly string[]).includes(roPathname) ? `/en${roPathname}` : '/en'
}

// EN path -> RO path for the language switcher (always exists, since every
// /en route mirrors a real RO route).
export function toRomanianPath(enPathname: string): string {
  const stripped = enPathname.replace(/^\/en/, '')
  return stripped === '' ? '/' : stripped
}
