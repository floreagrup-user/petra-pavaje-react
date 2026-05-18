import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2, Info, ArrowLeft, ArrowRight } from 'lucide-react'

// Virtual Tour placeholder - integrate Marzipano here
// For production, load Marzipano from CDN and initialize with R2-hosted tiles

export function VirtualTourPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading - replace with actual Marzipano initialization
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="pt-20 md:pt-24">
      {/* Breadcrumbs */}
      <div className="bg-anthracite-50 border-b border-anthracite-100">
        <div className="container-premium py-4">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-anthracite-500 hover:text-anthracite-700 transition-colors">Acasa</a>
            <span className="text-anthracite-300">/</span>
            <span className="text-anthracite-900 font-medium">Tur Virtual</span>
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
            <h1 className="heading-h1 text-anthracite-900 mb-4">Tur Virtual Gradina Expozitionala</h1>
            <p className="text-body-lg text-anthracite-500 max-w-2xl">
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
            className="relative aspect-video bg-anthracite-900 rounded-2xl overflow-hidden"
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-white/70">Se incarca turul virtual...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Marzipano container - replace with actual integration */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-anthracite-800 to-anthracite-900">
                  <div className="text-center text-white">
                    <img
                      src="https://petrapavaje.ro/wp-content/uploads/petra-pavaje-tur-virtual-expozitie-ploiesti-1200x540-1.webp"
                      alt="Tur Virtual Preview"
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                    <p className="mt-4 text-white/50 text-sm">
                      Turul virtual va fi disponibil in curand. Integrare Marzipano cu tile-uri R2.
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors">
                      <Info className="w-5 h-5" />
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Tour Info */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="p-5 bg-anthracite-50 rounded-xl">
              <h3 className="font-semibold text-anthracite-900 mb-2">Navigare</h3>
              <p className="text-sm text-anthracite-500">
                Foloseste mouse-ul sau gesturile touch pentru a naviga prin turul virtual. Click pe punctele de navigare pentru a te misca intre zone.
              </p>
            </div>
            <div className="p-5 bg-anthracite-50 rounded-xl">
              <h3 className="font-semibold text-anthracite-900 mb-2">Hotspot-uri</h3>
              <p className="text-sm text-anthracite-500">
                Click pe icon-urile de informatie pentru a afla detalii despre produsele expuse si specificatiile tehnice.
              </p>
            </div>
            <div className="p-5 bg-anthracite-50 rounded-xl">
              <h3 className="font-semibold text-anthracite-900 mb-2">Mobile</h3>
              <p className="text-sm text-anthracite-500">
                Pe dispozitive mobile, foloseste gyroscope-ul pentru o experienta imersiva. Misca telefonul pentru a privi in jur.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
