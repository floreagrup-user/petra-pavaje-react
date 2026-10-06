import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calculator, ChevronDown, MessageCircle, Wrench } from 'lucide-react'
import { products } from '@/data/products'
import { blogPosts } from '@/data/blog'
import type { Product, ProductFAQ } from '@/data/types'
import { ProductGridCard } from '@/components/product/ProductGridCard'
import { buildHubProduct } from '@/lib/product-filters'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

// Hub for the "pavaje curte" / "pavele curte" / "pavaj curte" searches
// (~2,300 impressions a month at position ~10 with no dedicated page).
// Everything here is assembled from data the site already publishes: the
// product list is driven by each product's own `usage` tags, and every FAQ
// answer restates a published article (linked from the answer's topic) --
// no new technical claims are introduced on this page.

const PATH = '/pavaje-curte'
const TITLE = 'Pavaje pentru Curte - Modele, Grosimi și Borduri | Petra Pavaje'
const DESCRIPTION =
  'Pavaje și pavele pentru curte: modele Premium și Standard pentru alei, terase și zona auto, ce grosime alegi (6 sau 8 cm), borduri și idei de amenajare.'

const BASE_PATH: Record<string, string> = {
  premium: '/pavaje-premium',
  standard: '/pavaje-standard',
  borduri: '/borduri',
}

const isCourtyardFit = (usage: string[]) =>
  usage.some((u) => /curț/i.test(u)) ||
  (usage.some((u) => /alei/i.test(u)) && usage.some((u) => /teras|grădin/i.test(u)))

const ARTICLE_SLUGS = [
  'pavaje-de-6-sau-de-8-cm',
  'pavaj-gri-sau-colorat',
  'cum-iti-amenajezi-curtea',
  'planul-pentru-o-curte-de-vis',
  'curte-amenajata-sahara-travertin',
  'solutii-delimitare-pavaj-gradina-design-impecabil',
]

const THICKNESS_GUIDE = [
  {
    value: '6 cm',
    zone: 'Alei, terase, trotuare',
    text: 'Potrivit pentru zonele cu trafic pietonal. Pentru alei și zone pietonale, pavajul de 6 cm este, de regulă, suficient.',
  },
  {
    value: '8 cm',
    zone: 'Zona în care circulă sau staționează mașina',
    text: 'Recomandat acolo unde circulă sau staționează autoturismele, mai ales cele de tonaj mare.',
  },
  {
    value: '4 cm',
    zone: 'Încărcări reduse',
    text: 'Disponibil pentru anumite produse din gama Standard, precum Holland, pentru amenajări cu cerințe de încărcare reduse.',
  },
]

const FAQ: ProductFAQ[] = [
  {
    question: 'Ce grosime de pavaj aleg pentru curte?',
    answer:
      'Depinde de modul în care va fi folosită fiecare zonă. Aleile, terasele și trotuarele pot fi amenajate cu pavaje de 6 cm, iar zona în care circulă sau staționează autoturismele este, de regulă, mai potrivită pentru pavaje de 8 cm. Nu alege grosimea doar după aspect sau după preț.',
  },
  {
    question: 'Pot folosi același model de pavaj în toată curtea?',
    answer:
      'Da. Multe modele Petra Pavaje sunt disponibile atât în varianta de 6 cm, cât și în varianta de 8 cm. De exemplu, poți folosi Roca Gri Antic de 8 cm în zona auto și Roca Gri Antic de 6 cm pe alei, păstrând același stil vizual în întreaga amenajare.',
  },
  {
    question: 'De ce am nevoie de borduri?',
    answer:
      'Bordurile nu au doar rol estetic, ci și de susținere. Solul se contractă în perioadele secetoase și se dilată în cele ploioase, iar bordura limitează deplasarea pavelelor. Fără o bordură montată corect, pavelele se vor deplasa în timp.',
  },
  {
    question: 'Culoarea pavajului influențează rezistența?',
    answer:
      'Nu. Rezistența ține de caracteristicile tehnice ale produsului, nu de faptul că pavajul este gri sau colorat. Toate pavajele Petra Pavaje sunt analizate într-un laborator de construcții certificat.',
  },
  {
    question: 'Este suficient un pavaj gros pentru o curte rezistentă?',
    answer:
      'Nu singur. Stratul suport și compactarea lui sunt esențiale: chiar și un pavaj gros poate avea tasări sau denivelări dacă fundația este pregătită necorespunzător. Ghidul nostru de montaj descrie pașii, de la pregătirea suprafeței la compactare.',
  },
]

// Product and page names that appear in the copy below, linked wherever
// they occur in a rendered answer. FAQ answers stay plain strings so the
// same text feeds the FAQPage JSON-LD unchanged.
const INLINE_LINKS: { text: string; to: string }[] = [
  { text: 'Roca Gri Antic', to: '/pavaje-premium/roca' },
  { text: 'Holland', to: '/pavaje-standard/holland' },
  { text: 'laborator de construcții certificat', to: '/laborator' },
  { text: 'Ghidul nostru de montaj', to: '/montaj' },
]

function withLinks(text: string): ReactNode[] {
  const pattern = new RegExp(`(${INLINE_LINKS.map((l) => l.text).join('|')})`, 'g')
  return text.split(pattern).map((part, i) => {
    const link = INLINE_LINKS.find((l) => l.text === part)
    return link ? (
      <Link key={i} to={link.to} className="link-premium">
        {part}
      </Link>
    ) : (
      part
    )
  })
}

function useCourtyardProducts() {
  return useMemo(() => {
    const fit = products.filter((p) => p.category !== 'borduri' && isCourtyardFit(p.usage))
    const quatro = fit.filter((p) => p.slug.startsWith('quatro-'))
    const quatroHub = buildHubProduct(
      {
        id: 'quatro',
        name: 'Quatro',
        slug: 'quatro',
        category: 'standard',
        shortDescription: 'Formatul pătrat clasic, de la 10x10 la 50x50 cm',
        description:
          'Forma pătrată oferă o suprafață echilibrată, simetrică. Quatro este cel mai popular format de pavaj exterior.',
        image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1.-Quatro-20-x-20-cm-gri.avif',
        dimensions: `${quatro.length} variante pentru curte`,
        weight: 'Vezi pagina dedicată pentru fiecare variantă',
        featured: true,
      },
      quatro
    )
    const premium = fit.filter((p) => p.category === 'premium')
    const standard = [...fit.filter((p) => p.category === 'standard' && !p.slug.startsWith('quatro-')), quatroHub]
    const borduri = products.filter((p) => p.category === 'borduri' && p.usage.some((u) => /curț/i.test(u)))
    return { premium, standard, borduri }
  }, [])
}

function useCourtyardSEO(items: Product[]) {
  useEffect(() => {
    const url = `${window.location.origin}${PATH}`
    const image = items[0]?.heroImages?.[0] || items[0]?.image
    document.title = TITLE
    upsertMeta('name', 'description', DESCRIPTION)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', TITLE)
    upsertMeta('property', 'og:description', DESCRIPTION)
    upsertMeta('property', 'og:url', url)
    if (image) upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', TITLE)
    upsertMeta('name', 'twitter:description', DESCRIPTION)
    if (image) upsertMeta('name', 'twitter:image', image)

    upsertJsonLd('itemlist-schema', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: items.map((p, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: p.name,
        url: `${window.location.origin}${BASE_PATH[p.category]}/${p.slug}`,
        image: p.image,
      })),
    })
    upsertJsonLd('faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })
    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Pavaje pentru curte', item: url },
      ],
    })
    return resetSEO
  }, [items])
}

function ProductSection({ title, intro, items, badge }: { title: string; intro: string; items: Product[]; badge: string }) {
  return (
    <div className="mb-14 last:mb-0">
      <div className="flex flex-wrap items-end justify-between gap-2 mb-6">
        <div>
          <h3 className="heading-h3 text-charcoal-900 mb-1">{title}</h3>
          <p className="text-body text-charcoal-600 max-w-2xl">{intro}</p>
        </div>
        <p className="text-sm text-charcoal-500">
          <span className="font-semibold text-charcoal-900">{items.length}</span> {items.length === 1 ? 'produs' : 'produse'}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductGridCard
            key={product.id}
            product={product}
            basePath={BASE_PATH[product.category]}
            badgeLabel={badge}
            extraBadge={product.slug === 'quatro' ? product.dimensions : undefined}
          />
        ))}
      </div>
    </div>
  )
}

export function PavajeCurtePage() {
  const { premium, standard, borduri } = useCourtyardProducts()
  const allItems = useMemo(() => [...premium, ...standard, ...borduri], [premium, standard, borduri])
  const articles = useMemo(
    () => ARTICLE_SLUGS.map((slug) => blogPosts.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => Boolean(p)),
    []
  )
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  useCourtyardSEO(allItems)

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white">Pavaje pentru curte</span>
            </nav>
            <h1 className="heading-h1 mb-4">Pavaje pentru curte</h1>
            <p className="text-body-lg text-charcoal-400 max-w-3xl">
              Pavele pentru alei, terase și zona în care parchezi mașina. Mai jos găsești modelele potrivite pentru curte,
              grosimea recomandată pentru fiecare zonă și bordurile care țin pavajul la locul lui.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href="#modele" className="btn-primary">
                Vezi modelele
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <Link to="/calculator-pavaj" className="btn-outline-light">
                <Calculator className="w-4 h-4 mr-2" />
                Calculează necesarul
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white border-b border-charcoal-100">
        <div className="container-premium">
          <h2 className="heading-h2 text-charcoal-900 mb-3">Ce grosime alegi pentru curte</h2>
          <p className="text-body text-charcoal-600 max-w-3xl mb-8">
            Grosimea se alege după cum va fi folosită fiecare zonă, nu după aspect sau preț. Multe modele există și în 6, și în 8 cm,
            așa că poți păstra același pavaj în toată curtea.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {THICKNESS_GUIDE.map((item, idx) => (
              <div
                key={item.value}
                className={`rounded-xl border p-6 ${idx === 0 ? 'border-brand-600 bg-brand-50' : 'border-charcoal-100 bg-white'}`}
              >
                <p className="text-4xl font-bold text-charcoal-900 mb-1">{item.value}</p>
                <p className="text-sm font-medium text-brand-700 mb-3">{item.zone}</p>
                <p className="text-sm text-charcoal-600 leading-relaxed">{withLinks(item.text)}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-charcoal-500 mt-6">
            Detalii și exemple în articolul{' '}
            <Link to="/blog/pavaje-de-6-sau-de-8-cm" className="link-premium">
              Pavaje de 6 sau de 8 cm
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="modele" className="py-12 md:py-16 scroll-mt-24">
        <div className="container-premium">
          <h2 className="heading-h2 text-charcoal-900 mb-10">Modele de pavaj pentru curte</h2>
          <ProductSection
            title="Pavaje Premium"
            intro="Paletă largă de culori și finisaje, inspirate din piatră naturală, pentru curțile în care pavajul face parte din design."
            items={premium}
            badge="Premium"
          />
          <ProductSection
            title="Pavaje Standard"
            intro="Formate robuste și culori esențiale, cu un raport bun calitate-preț."
            items={standard}
            badge="Standard"
          />
          <ProductSection
            title="Borduri pentru curte"
            intro="Bordura delimitează pavajul și îl susține, ca pavelele să nu se deplaseze în timp."
            items={borduri}
            badge="Bordură"
          />
        </div>
      </section>

      {articles.length > 0 && (
        <section className="py-12 md:py-16 bg-charcoal-50">
          <div className="container-premium">
            <h2 className="heading-h2 text-charcoal-900 mb-8">Idei și ghiduri pentru amenajarea curții</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group block bg-white rounded-xl overflow-hidden border border-charcoal-100">
                  <div className="aspect-[16/10] overflow-hidden bg-charcoal-100">
                    <img
                      src={post.image}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-charcoal-900 group-hover:text-brand-700 transition-colors mb-2">{post.title}</h3>
                    <p className="text-sm text-charcoal-600 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16">
        <div className="container-premium">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Întrebări Frecvente</p>
            <h2 className="heading-h2 text-charcoal-900">Pavajul din curte, pe scurt</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ.map((item, idx) => (
              <div key={item.question} className="bg-white rounded-xl border border-charcoal-100 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left"
                >
                  <span className="font-medium text-charcoal-900">{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-charcoal-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && <p className="px-4 pb-4 text-sm text-charcoal-600 leading-relaxed">{withLinks(item.answer)}</p>}
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <Link to="/montaj" className="btn-secondary">
              <Wrench className="w-4 h-4 mr-2" />
              Ghid de montaj
            </Link>
            <Link to="/contact" className="btn-primary">
              <MessageCircle className="w-4 h-4 mr-2" />
              Cere o ofertă
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
