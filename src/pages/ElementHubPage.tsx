import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { getElementsByParent } from '@/data/elements'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO, truncateDescription } from '@/hooks/seo-utils'
import { categoryUrl, productUrl } from '@/lib/product-urls'

interface HubConfig {
  title: string
  shortDescription: string
  description: string
}

const HUBS: Record<string, HubConfig> = {
  garduri: {
    title: 'Garduri',
    shortDescription: 'Elemente Prefabricate pentru Garduri',
    description:
      'Petra Pavaje oferă trei game de elemente de gard din beton — Robusto (masiv, 16 cm grosime), Modern (sistem 3D cu îmbinare Nut-Feder) și Baroc (eleganță clasică) — pentru orice stil arhitectural, cu garanție de 5 ani.',
  },
  'elemente-de-canalizare': {
    title: 'Elemente de canalizare',
    shortDescription: 'Beton Rezistent pentru Infrastructură',
    description:
      'Gamă completă de elemente prefabricate din beton pentru rețele de canalizare și infrastructură rutieră — blocuri de beton, elemente pentru cămine de vizitare, tuburi, timpane și capace carosabile/necarosabile.',
  },
}

export function ElementHubPage({ slug: slugProp }: { slug?: string } = {}) {
  const { category: parentSlugParam } = useParams<{ category?: string }>()
  const parentSlug = slugProp || parentSlugParam
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const hub = HUBS[parentSlug || '']
  const children = getElementsByParent(parentSlug || '')

  useEffect(() => {
    if (!hub || !children.length) return
    const url = `${window.location.origin}${categoryUrl(parentSlug || '')}`
    const title = `${hub.title} - ${hub.shortDescription} | ${SEO_SITE_NAME}`
    const description = truncateDescription(`${hub.shortDescription}. ${hub.description}`)
    const image = children[0]?.image

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('itemlist-schema', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: children.map((c, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: c.name,
        url: `${url}/${c.slug}`,
        image: c.image,
      })),
    })

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: hub.title, item: url },
      ],
    })

    return resetSEO
  }, [hub, children, parentSlug])

  if (!hub || children.length === 0) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="heading-h1 text-charcoal-900 mb-4">Categorie negăsită</h1>
        <p className="text-charcoal-500 mb-8">Categoria pe care o cauți nu există.</p>
        <Link to="/produse" className="btn-primary">Înapoi la produse</Link>
      </div>
    )
  }

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">{hub.title}</span>
            </nav>
            <h1 className="heading-h1 mb-4">{hub.title}</h1>
            <p className="text-body-lg text-charcoal-400 max-w-3xl">{hub.description}</p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-white">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {children.map((child, index) => (
              <motion.div
                key={child.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={productUrl(parentSlug || "", child.slug)} className="group block card-premium">
                  <div className="relative aspect-[16/10] overflow-hidden" style={{ aspectRatio: '16/10' }}>
                    <img
                      src={child.image}
                      alt={child.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{child.name}</h2>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <p className="text-sm text-charcoal-500 mb-4 line-clamp-2">{child.shortDescription}</p>
                    <div className="flex items-center text-brand-600 font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                      Vezi produsele
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-charcoal-50">
        <div className="container-premium text-center">
          <h2 className="heading-h3 text-charcoal-900 mb-3">Ai nevoie de o ofertă personalizată?</h2>
          <p className="text-body text-charcoal-600 mb-6 max-w-2xl mx-auto">
            Echipa noastră te poate ajuta să alegi varianta potrivită pentru proiectul tău.
          </p>
          <Link to="/contact" className="btn-primary inline-flex">
            <Phone className="w-4 h-4 mr-2" />
            Solicită Ofertă
          </Link>
        </div>
      </section>
    </div>
  )
}
