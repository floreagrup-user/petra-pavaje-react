import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

const PATTERN_GROUPS: { label: string; key: string; count: number }[] = [
  { label: '10x10', key: '10x10', count: 4 },
  { label: '20x10', key: '20x10', count: 4 },
  { label: '20x20', key: '20x20', count: 4 },
  { label: '30x20', key: '30x20', count: 4 },
  { label: '30x30', key: '30x30', count: 4 },
  { label: '40x40', key: '40x40', count: 4 },
  { label: '60x30', key: '60x30', count: 4 },
  { label: 'Mix 4.4', key: 'Mix-4.4', count: 4 },
  { label: 'Mix 4.30, 6.30, 8.30', key: 'Mix-4.30-6.30-8.30', count: 4 },
  { label: 'Mix 5.28', key: 'Mix-5.28', count: 4 },
  { label: 'Mix 6.6', key: 'Mix-6.6', count: 4 },
  { label: 'Mix 6.14', key: 'Mix-6.14', count: 1 },
  { label: 'Mix 6.72', key: 'Mix-6.72', count: 4 },
  { label: 'Mix 7.9', key: 'Mix-7.9', count: 4 },
  { label: 'Mix 8.20', key: 'Mix-8.20', count: 1 },
]

type PatternImage = { url: string; alt: string; groupLabel: string }

const GROUPS = PATTERN_GROUPS.map((group) => ({
  ...group,
  images: Array.from({ length: group.count }, (_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return {
      url: `${R2}/Modele-de-montaj_${group.key}-${n}.avif`,
      alt: `Installation pattern ${group.label} ${i + 1}`,
      groupLabel: group.label,
    } satisfies PatternImage
  }),
}))

const ALL_IMAGES: PatternImage[] = GROUPS.flatMap((g) => g.images)

export function ModeleMontajPageEN() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + ALL_IMAGES.length) % ALL_IMAGES.length)
  }, [])

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % ALL_IMAGES.length)
  }, [])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevLightbox()
      if (e.key === 'ArrowRight') nextLightbox()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxOpen, closeLightbox, prevLightbox, nextLightbox])

  useEffect(() => {
    const url = `${window.location.origin}/en/modele-de-montaj`
    const title = `Installation Patterns - Get Inspired for Your Project | ${SEO_SITE_NAME}`
    const description =
      'Discover the best Petra Pavaje installation patterns for gardens, yards and pathways, perfect for unique spaces.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/modele-de-montaj', '/en/modele-de-montaj')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', ALL_IMAGES[0].url)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/en` },
        { '@type': 'ListItem', position: 2, name: 'Installation Patterns', item: url },
      ],
    })

    return resetSEO
  }, [])

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
              <Link to="/en" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Installation Patterns</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Helpful</p>
            <h1 className="heading-h1 mb-2 max-w-3xl">Installation Patterns</h1>
            <p className="text-xl text-charcoal-300 mb-6">Get Inspired for Your Project</p>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Looking for inspiration? Discover Petra Pavaje paving and slab installation patterns! Detailed
              layouts for a variety of sizes, from gardens and yards to pathways. Create unique spaces, step by
              step.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Pattern Gallery</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GROUPS.map((group) => {
              const startIndex = ALL_IMAGES.findIndex((img) => img === group.images[0])
              return (
                <motion.div
                  key={group.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="rounded-xl border border-charcoal-100 bg-white overflow-hidden"
                >
                  {group.images.length === 1 ? (
                    <button
                      type="button"
                      onClick={() => openLightbox(startIndex)}
                      className="block w-full aspect-square overflow-hidden group"
                      aria-label={`View installation pattern ${group.label}`}
                    >
                      <img
                        src={group.images[0].url}
                        alt={group.images[0].alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 gap-0.5 bg-charcoal-100">
                      {group.images.map((img, i) => (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => openLightbox(startIndex + i)}
                          className="aspect-square overflow-hidden group"
                          aria-label={`View image ${i + 1} of installation pattern ${group.label}`}
                        >
                          <img
                            src={img.url}
                            alt={img.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-charcoal-900">{group.label}</h3>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Installation pattern viewer"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevLightbox() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextLightbox() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <img
            src={ALL_IMAGES[lightboxIndex].url}
            alt={ALL_IMAGES[lightboxIndex].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 text-white/60 text-sm">
            {ALL_IMAGES[lightboxIndex].groupLabel} · {lightboxIndex + 1} / {ALL_IMAGES.length}
          </div>
        </div>
      )}
    </div>
  )
}
