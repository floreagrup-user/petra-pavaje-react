import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2, Play, ExternalLink } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

const TOUR_BASE_URL = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/tur-virtual-3d'
const TOUR_URL = `${TOUR_BASE_URL}/index.htm`
const TOUR_PREVIEW_IMAGE = `${TOUR_BASE_URL}/socialThumbnail.jpg`

export function VirtualTourPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [started, setStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const url = `${window.location.origin}/tur-virtual`
    const title = `Tur Virtual 360° - Grădina Expozițională Petra Pavaje, Ploiești | ${SEO_SITE_NAME}`
    const description =
      'Exploreaza gradina expozitionala Petra Pavaje din Ploiesti intr-un tur virtual 360 de grade. Descopera pavajele, bordurile, gardurile si jardinierele in context real.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', TOUR_PREVIEW_IMAGE)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Tur Virtual', item: url },
      ],
    })

    return resetSEO
  }, [])

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const startTour = () => {
    setIsLoading(true)
    setStarted(true)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div className="pt-20 md:pt-24">
      {/* Breadcrumbs */}
      <div className="bg-charcoal-50 border-b border-charcoal-100">
        <div className="container-premium py-4">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-charcoal-500 hover:text-charcoal-700 transition-colors">Acasa</a>
            <span className="text-charcoal-300">/</span>
            <span className="text-charcoal-900 font-medium">Tur Virtual</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-h1 text-charcoal-900 mb-4">Tur Virtual Gradina Expozitionala</h1>
            <p className="text-body-lg text-charcoal-500 max-w-2xl">
              Exploreaza produsele Petra Pavaje intr-un experience imersiv. Navigheaza prin gradina noastra expozitionala si descopera cum arata produsele in context real.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tour Viewer */}
      <section className="pb-12 md:pb-16">
        <div className="container-premium">
          <div
            ref={containerRef}
            className="relative h-[70vh] min-h-[420px] max-h-[900px] bg-charcoal-900 rounded-2xl overflow-hidden"
          >
            {!started ? (
              <button
                type="button"
                onClick={startTour}
                className="group absolute inset-0 w-full h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/50"
                aria-label="Porneste turul virtual 360 de grade"
              >
                <img
                  src={TOUR_PREVIEW_IMAGE}
                  alt="Previzualizare tur virtual - Gradina Expozitionala Petra Pavaje, Ploiesti"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center gap-3 px-6 py-4 rounded-full bg-white/95 text-charcoal-900 font-semibold shadow-lg group-hover:scale-105 transition-transform">
                    <Play className="w-5 h-5 fill-current" />
                    Porneste turul virtual
                  </span>
                </div>
              </button>
            ) : (
              <>
                <iframe
                  src={TOUR_URL}
                  title="Tur virtual 360 de grade - Gradina Expozitionala Petra Pavaje, Ploiesti"
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; gyroscope; magnetometer; fullscreen; xr-spatial-tracking"
                  allowFullScreen
                  onLoad={() => setIsLoading(false)}
                />

                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal-900 pointer-events-none">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-white/70">Se incarca turul virtual...</p>
                    </div>
                  </div>
                )}

                {!isLoading && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <a
                      href={TOUR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-black/50 hover:bg-black/70 text-white text-sm rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Deschide intr-un tab nou
                    </a>
                    <button
                      onClick={toggleFullscreen}
                      className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      aria-label={isFullscreen ? 'Iesi din ecran complet' : 'Ecran complet'}
                      aria-pressed={isFullscreen}
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Tour Info */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="p-5 bg-charcoal-50 rounded-xl">
              <h3 className="font-semibold text-charcoal-900 mb-2">Navigare</h3>
              <p className="text-sm text-charcoal-500">
                Foloseste mouse-ul sau gesturile touch pentru a naviga prin turul virtual. Click pe punctele de navigare pentru a te misca intre zone.
              </p>
            </div>
            <div className="p-5 bg-charcoal-50 rounded-xl">
              <h3 className="font-semibold text-charcoal-900 mb-2">Hotspot-uri</h3>
              <p className="text-sm text-charcoal-500">
                Click pe icon-urile de informatie pentru a afla detalii despre produsele expuse si specificatiile tehnice.
              </p>
            </div>
            <div className="p-5 bg-charcoal-50 rounded-xl">
              <h3 className="font-semibold text-charcoal-900 mb-2">Mobile</h3>
              <p className="text-sm text-charcoal-500">
                Pe dispozitive mobile, foloseste gyroscope-ul pentru o experienta imersiva. Misca telefonul pentru a privi in jur.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
