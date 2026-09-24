export const SEO_SITE_NAME = 'Petra Pavaje'
export const SEO_DEFAULT_TITLE = 'Petra Pavaje - Producător Premium de Pavaje'
export const SEO_DEFAULT_DESCRIPTION =
  'Pavaje Premium si Standard, Dale, Borduri, Boltari, Jardiniere, Garduri, Elemente de canalizare. Producator national cu 4 fabrici in Romania.'
// Matches index.html's static <meta name="robots"> default exactly, so
// resetSEO() never regresses it after a page that overrides robots (e.g.
// NotFoundPage's "noindex, follow") is left via client-side navigation.
export const SEO_DEFAULT_ROBOTS = 'index, follow, max-image-preview:large'

// Truncates to Google's practical meta-description limit (~155-160 chars)
// at the nearest word boundary, so the SERP snippet never ends mid-word.
export function truncateDescription(text: string, maxLen = 155): string {
  if (text.length <= maxLen) return text
  const cut = text.slice(0, maxLen)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd().replace(/[.,;:—-]$/, '') + '…'
}

export function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function upsertJsonLd(id: string, data: object | null) {
  const existing = document.getElementById(id)
  if (existing) existing.remove()
  if (!data) return
  const script = document.createElement('script')
  script.id = id
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

const HREFLANG_LANGS = ['ro', 'en', 'x-default'] as const

function upsertHreflang(lang: string, href: string) {
  const id = `hreflang-${lang}`
  let el = document.getElementById(id) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.id = id
    el.setAttribute('rel', 'alternate')
    document.head.appendChild(el)
  }
  el.setAttribute('hreflang', lang)
  el.setAttribute('href', href)
}

// Registers the ro/en alternate pair for a page that exists in both
// languages, plus x-default pointing at the Romanian (primary) version.
export function upsertHreflangPair(roPath: string, enPath: string) {
  const origin = window.location.origin
  upsertHreflang('ro', `${origin}${roPath}`)
  upsertHreflang('en', `${origin}${enPath}`)
  upsertHreflang('x-default', `${origin}${roPath}`)
}

function clearHreflang() {
  HREFLANG_LANGS.forEach((lang) => document.getElementById(`hreflang-${lang}`)?.remove())
}

export function resetSEO() {
  document.title = SEO_DEFAULT_TITLE
  upsertMeta('name', 'description', SEO_DEFAULT_DESCRIPTION)
  upsertMeta('name', 'robots', SEO_DEFAULT_ROBOTS)
  upsertJsonLd('product-schema', null)
  upsertJsonLd('faq-schema', null)
  upsertJsonLd('breadcrumb-schema', null)
  upsertJsonLd('itemlist-schema', null)
  clearHreflang()
}
