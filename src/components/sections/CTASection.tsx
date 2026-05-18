import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'

export function CTASection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section ref={ref} className="section-padding bg-brand-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800" />
        <div className="absolute inset-0 opacity-10 bg-noise" />
      </div>

      <div className="container-premium relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Transformă-ți curtea în spațiul visat
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Contactează reprezentantul din zona ta pentru o ofertă personalizată sau descarcă catalogul nostru complet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-600 font-semibold rounded-md shadow-lg hover:bg-warm-gray-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              Solicita Oferta
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-md hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4 mr-2" />
              Descarcă Catalog
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
