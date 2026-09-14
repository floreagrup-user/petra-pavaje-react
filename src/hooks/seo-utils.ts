export const SEO_SITE_NAME = 'Petra Pavaje'
export const SEO_DEFAULT_TITLE = 'Petra Pavaje - Producător Premium de Pavaje'
export const SEO_DEFAULT_DESCRIPTION =
  'Pavaje Premium si Standard, Dale, Borduri, Boltari, Jardiniere, Garduri, Elemente de canalizare. Producator national cu 4 fabrici in Romania.'

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

export function resetSEO() {
  document.title = SEO_DEFAULT_TITLE
  upsertMeta('name', 'description', SEO_DEFAULT_DESCRIPTION)
  upsertJsonLd('product-schema', null)
  upsertJsonLd('faq-schema', null)
  upsertJsonLd('breadcrumb-schema', null)
  upsertJsonLd('itemlist-schema', null)
}
