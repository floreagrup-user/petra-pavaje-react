// Regenerates public/llms-full.txt from the app's own real data, so it can
// never drift from or fabricate what's actually on the site. Unlike
// llms.txt (a short curated index), this includes full product specs,
// FAQ answers and factory profiles -- but blog posts stay as
// title+excerpt+link only (per product decision: full post bodies would
// bloat this file with HTML-derived prose that adds little structured
// value an LLM can't already get from following the link).
// Run with: npx tsx scripts/generate-llms-full.ts
import { writeFileSync } from 'node:fs'
import { categories, factories } from '../src/data/site'
import { products } from '../src/data/products'
import { woodstoneCategories } from '../src/data/woodstone'
import { elementCategories } from '../src/data/elements'
import { blogPosts } from '../src/data/blog'
import { FAQ_ITEMS } from '../src/data/faq'
import { categoryUrl, productUrl } from '../src/lib/product-urls'

const SITE_URL = 'https://petrapavaje.ro'
const lines: string[] = []
const push = (s = '') => lines.push(s)

push('# Petra Pavaje — Referință completă de conținut (llms-full.txt)')
push()
push(
  '> Producător național de pavaje decorative, dale, borduri, bolțari, garduri ornamentale ' +
    'și elemente de canalizare din beton vibropresat, parte a Florea Grup. 4 fabrici în ' +
    'România, capacitate 24.000 mp/zi, peste 800 de produse în portofoliu. Înființată în 1996.'
)
push()
push(
  'Acest fișier conține conținutul integral pentru paginile esențiale: toate produsele cu ' +
    'specificații tehnice, toate întrebările frecvente cu răspuns complet, și profilul fiecărei ' +
    'fabrici. Articolele de blog apar doar ca titlu + rezumat + link (conținutul complet e la URL); ' +
    'varianta scurtă/index e la [llms.txt](' + SITE_URL + '/llms.txt).'
)
push()
push('---')
push()

// ---------------------------------------------------------------------------
// Fabrici
// ---------------------------------------------------------------------------
push('## Fabrici')
push()
for (const f of factories) {
  push(`### ${f.name}`)
  push(`- Adresă: ${f.address}`)
  push(`- Telefon: ${f.phone}`)
  push(`- Email: ${f.email}`)
  push(`- Program: ${f.schedule}`)
  push(`- Coordonate: ${f.lat}, ${f.lng}`)
  push()
}
push('---')
push()

// ---------------------------------------------------------------------------
// Produse (pavaje premium/standard, borduri etc. -- SKU-uri individuale)
// ---------------------------------------------------------------------------
push('## Produse')
push()
for (const cat of categories) {
  const catProducts = products.filter((p) => p.category === cat.id)
  if (catProducts.length === 0) continue
  push(`### ${cat.name}`)
  push(`${cat.description}`)
  push(`URL categorie: ${SITE_URL}${categoryUrl(cat.slug)}`)
  push()
  for (const p of catProducts) {
    push(`#### ${p.name}`)
    push(`- URL: ${SITE_URL}${productUrl(cat.slug, p.slug)}`)
    push(`- Descriere: ${p.shortDescription}`)
    push(`- Dimensiuni: ${p.dimensions}`)
    push(`- Greutate: ${p.weight}`)
    if (p.colors.length) push(`- Culori: ${p.colors.map((c) => c.name).join(', ')}`)
    if (p.usage.length) push(`- Utilizare: ${p.usage.join(', ')}`)
    if (p.specs.length) push(`- Specificații: ${p.specs.map((s) => `${s.label}: ${s.value}`).join('; ')}`)
    if (p.dimensionsList?.length) {
      push(
        `- Formate disponibile: ${p.dimensionsList
          .map((d) => `${d.label} (${d.size}, grosime ${d.thickness})`)
          .join('; ')}`
      )
    }
    push()
  }
}
push('---')
push()

// ---------------------------------------------------------------------------
// Woodstone (lemn pietrificat) -- linie de produs pe categorii, nu SKU-uri
// ---------------------------------------------------------------------------
push('## Woodstone — Lemn Pietrificat')
push(`URL: ${SITE_URL}/woodstone-lemn-pietrificat`)
push()
for (const wc of woodstoneCategories) {
  push(`### ${wc.name}`)
  push(`URL: ${SITE_URL}/woodstone-lemn-pietrificat/${wc.slug}`)
  push(`${wc.description}`)
  if (wc.heroFeatures?.length) push(`- Caracteristici: ${wc.heroFeatures.join(', ')}`)
  push()
}
push('---')
push()

// ---------------------------------------------------------------------------
// Elemente (rigole, bolțari, garduri, jardiniere, elemente de canalizare etc.)
// ---------------------------------------------------------------------------
push('## Elemente de amenajare')
push()
for (const el of elementCategories) {
  const url = el.parent ? `${categoryUrl(el.parent.slug)}/${el.slug}` : categoryUrl(el.slug)
  push(`### ${el.name}`)
  push(`URL: ${SITE_URL}${url}`)
  push(`${el.description}`)
  if (el.heroFeatures?.length) push(`- Caracteristici: ${el.heroFeatures.join(', ')}`)
  if (el.colors?.length) push(`- Culori: ${el.colors.map((c) => c.name).join(', ')}`)
  push()
}
push('---')
push()

// ---------------------------------------------------------------------------
// Întrebări frecvente (răspuns complet)
// ---------------------------------------------------------------------------
push('## Întrebări frecvente')
push(`URL: ${SITE_URL}/faq`)
push()
const faqByCategory = new Map<string, typeof FAQ_ITEMS>()
for (const item of FAQ_ITEMS) {
  if (!faqByCategory.has(item.category)) faqByCategory.set(item.category, [])
  faqByCategory.get(item.category)!.push(item)
}
for (const [category, items] of faqByCategory) {
  push(`### ${category}`)
  for (const item of items) {
    push(`**${item.question}**`)
    push(item.answer)
    if (item.warning) push(`Atenție: ${item.warning}`)
    push()
  }
}
push('---')
push()

// ---------------------------------------------------------------------------
// Blog -- titlu + rezumat + link, NU continutul integral
// ---------------------------------------------------------------------------
push('## Blog (rezumate)')
push(`URL secțiune: ${SITE_URL}/blog`)
push()
const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
for (const post of sortedPosts) {
  const date = post.date.slice(0, 10)
  push(`- [${post.title}](${SITE_URL}/blog/${post.slug}) — ${date}, ${post.author}. ${post.excerpt}`)
}
push()
push('---')
push()
push(`_Generat automat din datele reale ale site-ului (${new Date().toISOString().slice(0, 10)}). Nu editați manual — rulați \`npx tsx scripts/generate-llms-full.ts\`._`)

writeFileSync('public/llms-full.txt', lines.join('\n') + '\n')
console.log(`Wrote public/llms-full.txt (${lines.join('\n').length} bytes, ${sortedPosts.length} blog posts, ${products.length} products, ${FAQ_ITEMS.length} FAQ items)`)
