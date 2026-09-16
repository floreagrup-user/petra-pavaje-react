// Regenerates public/sitemap.xml from the app's own real data and routes,
// so it can never drift from what actually exists on the site. Run with:
//   npx tsx scripts/generate-sitemap.ts
import { writeFileSync } from 'node:fs'
import { categories } from '../src/data/site'
import { products } from '../src/data/products'
import { elementCategories } from '../src/data/elements'
import { woodstoneCategories } from '../src/data/woodstone'
import { blogPosts } from '../src/data/blog'
import { categoryUrl, productUrl } from '../src/lib/product-urls'
import { TRANSLATED_PATHS } from '../src/lib/i18n-routes'

const SITE_URL = 'https://petrapavaje.ro'

type AltLang = { lang: string; loc: string }
type Entry = { loc: string; changefreq: string; priority: string; lastmod?: string; altLangs?: AltLang[] }

const entries: Entry[] = []
const seen = new Set<string>()
function add(loc: string, changefreq: string, priority: string, lastmod?: string) {
  if (seen.has(loc)) return
  seen.add(loc)
  entries.push({ loc, changefreq, priority, lastmod })
}

// Home + top-level static pages
add('/', 'weekly', '1.0')
add('/produse', 'weekly', '0.9')
add('/elemente', 'weekly', '0.8')
add('/tur-virtual', 'monthly', '0.8')
add('/contact', 'monthly', '0.7')
add('/blog', 'weekly', '0.8')
add('/calculator-pavaj', 'monthly', '0.7')
add('/despre-noi', 'monthly', '0.7')
add('/sustenabilitate', 'monthly', '0.6')
add('/florea-grup', 'monthly', '0.6')
add('/garantie', 'monthly', '0.6')
add('/laborator', 'monthly', '0.6')
add('/cariera', 'monthly', '0.6')
add('/catalog', 'monthly', '0.7')
add('/montaj', 'monthly', '0.6')
add('/modele-de-montaj', 'monthly', '0.6')
add('/intretinere', 'monthly', '0.6')
add('/degivrare', 'monthly', '0.6')
add('/faq', 'monthly', '0.6')
add('/documente', 'monthly', '0.7')
add('/brosuri', 'monthly', '0.6')
add('/confidentialitate', 'yearly', '0.3')
add('/cookie-uri', 'yearly', '0.3')
add('/termeni', 'yearly', '0.3')

// English (/en) — scoped translation, mirrors TRANSLATED_PATHS from src/lib/i18n-routes.ts
for (const roPath of TRANSLATED_PATHS) {
  add(roPath === '/' ? '/en' : `/en${roPath}`, 'monthly', roPath === '/' ? '0.9' : '0.6')
}

// Cross-link every RO/EN page pair with hreflang alternates (+ x-default -> RO)
for (const roPath of TRANSLATED_PATHS) {
  const enPath = roPath === '/' ? '/en' : `/en${roPath}`
  const roEntry = entries.find((e) => e.loc === roPath)
  const enEntry = entries.find((e) => e.loc === enPath)
  if (!roEntry || !enEntry) continue
  const altLangs: AltLang[] = [
    { lang: 'ro', loc: roPath },
    { lang: 'en', loc: enPath },
    { lang: 'x-default', loc: roPath },
  ]
  roEntry.altLangs = altLangs
  enEntry.altLangs = altLangs
}

// Product categories (pavaje-premium, pavaje-standard, woodstone-lemn-pietrificat, borduri, boltari, jardiniere, palisada, banci, treapta, bloc-de-zid, garduri, elemente-de-canalizare)
for (const cat of categories) {
  add(categoryUrl(cat.slug), 'monthly', '0.8')
}

// Individual products (pavaje-premium/:product, pavaje-standard/:product, pavaje-standard/quatro/:product, borduri/:product)
for (const product of products) {
  const categoryMeta = categories.find((c) => c.id === product.category)
  const categorySlug = categoryMeta?.slug || product.category
  add(productUrl(categorySlug, product.slug), 'monthly', '0.7')
}

// Quatro hub page
add('/pavaje-standard/quatro', 'monthly', '0.7')

// English Premium paver catalog -- fully translated (see src/data/products.en.ts),
// unlike the rest of the product catalog, so it gets its own EN URLs here
// alongside the TRANSLATED_PATHS loop above.
const premiumProducts = products.filter((p) => p.category === 'premium')
add('/en/pavaje-premium', 'weekly', '0.8')
for (const product of premiumProducts) {
  add(`/en/pavaje-premium/${product.slug}`, 'monthly', '0.7')
}

// English Standard paver catalog -- also fully translated, including the
// bespoke Quatro hub page and its 19 dimension/marking variants (nested
// under pavaje-standard/quatro/, same as the RO routes).
const standardProducts = products.filter((p) => p.category === 'standard')
const standardQuatroVariants = standardProducts.filter((p) => p.slug.startsWith('quatro-'))
const standardNonQuatro = standardProducts.filter((p) => !p.slug.startsWith('quatro-'))
add('/en/pavaje-standard', 'weekly', '0.8')
add('/en/pavaje-standard/quatro', 'monthly', '0.7')
for (const product of standardNonQuatro) {
  add(`/en/pavaje-standard/${product.slug}`, 'monthly', '0.7')
}
for (const product of standardQuatroVariants) {
  add(`/en/pavaje-standard/quatro/${product.slug}`, 'monthly', '0.6')
}

// Cross-link RO/EN Premium and Standard pairs with hreflang alternates (+ x-default -> RO)
function linkAltLangs(roPath: string, enPath: string) {
  const roEntry = entries.find((e) => e.loc === roPath)
  const enEntry = entries.find((e) => e.loc === enPath)
  if (!roEntry || !enEntry) return
  const altLangs: AltLang[] = [
    { lang: 'ro', loc: roPath },
    { lang: 'en', loc: enPath },
    { lang: 'x-default', loc: roPath },
  ]
  roEntry.altLangs = altLangs
  enEntry.altLangs = altLangs
}
linkAltLangs('/pavaje-premium', '/en/pavaje-premium')
for (const product of premiumProducts) {
  linkAltLangs(`/pavaje-premium/${product.slug}`, `/en/pavaje-premium/${product.slug}`)
}
linkAltLangs('/pavaje-standard', '/en/pavaje-standard')
linkAltLangs('/pavaje-standard/quatro', '/en/pavaje-standard/quatro')
for (const product of standardNonQuatro) {
  linkAltLangs(`/pavaje-standard/${product.slug}`, `/en/pavaje-standard/${product.slug}`)
}
for (const product of standardQuatroVariants) {
  linkAltLangs(`/pavaje-standard/quatro/${product.slug}`, `/en/pavaje-standard/quatro/${product.slug}`)
}

// Element categories: top-level (rigole, boltari, jardiniere, palisada, banci, treapta, bloc-de-zid)
// and nested under garduri / elemente-de-canalizare
for (const el of elementCategories) {
  if (el.parent) {
    add(`${categoryUrl(el.parent.slug)}/${el.slug}`, 'monthly', '0.7')
  } else {
    add(categoryUrl(el.slug), 'monthly', '0.8')
  }
}

// Woodstone categories
for (const wc of woodstoneCategories) {
  add(`/woodstone-lemn-pietrificat/${wc.slug}`, 'monthly', '0.7')
}

// Blog posts
for (const post of blogPosts) {
  const lastmod = post.date ? new Date(post.date).toISOString().slice(0, 10) : undefined
  add(`/blog/${post.slug}`, 'monthly', '0.5', lastmod)
}

entries.sort((a, b) => a.loc.localeCompare(b.loc))

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...entries.map((e) => {
    const lastmod = e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''
    const altLinks = (e.altLangs || [])
      .map((a) => `<xhtml:link rel="alternate" hreflang="${a.lang}" href="${SITE_URL}${a.loc}"/>`)
      .join('')
    return `  <url><loc>${SITE_URL}${e.loc}</loc>${lastmod}<changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority>${altLinks}</url>`
  }),
  '</urlset>',
  '',
].join('\n')

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`Wrote ${entries.length} URLs to public/sitemap.xml`)
