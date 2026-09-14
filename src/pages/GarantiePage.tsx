import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Settings2, Microscope, Award } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

export function GarantiePage() {
  useEffect(() => {
    const url = `${window.location.origin}/garantie`
    const title = `Garanție - 5 Ani pentru Pavele, Dale și Borduri | ${SEO_SITE_NAME}`
    const description =
      'Linia de producție automatizată și testarea riguroasă în laborator propriu asigură 5 ani de garanție pentru toate produsele Petra Pavaje.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Garanție', item: url },
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
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">Garanție</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Calitate garantată</p>
            <h1 className="heading-h1 mb-4 max-w-3xl">5 Ani de Garanție</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Toate produsele Petra Pavaje beneficiază de o garanție de 5 ani, susținută de o producție integral
              automatizată și testări riguroase în laboratorul propriu.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid sm:grid-cols-3 gap-6 mb-14"
          >
            <div className="rounded-xl bg-charcoal-50 p-6">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                <Settings2 className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="font-semibold text-charcoal-900 mb-1.5">Producție automatizată</h2>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Linie de producție integral automatizată, cu monitorizare și control permanent al calității.
              </p>
            </div>
            <div className="rounded-xl bg-charcoal-50 p-6">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                <Microscope className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="font-semibold text-charcoal-900 mb-1.5">Testare în laborator propriu</h2>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Prefabricatele din beton sunt riguros testate, conform unor grafice personalizate pentru fiecare
                tip de produs.
              </p>
            </div>
            <div className="rounded-xl bg-charcoal-50 p-6">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="font-semibold text-charcoal-900 mb-1.5">5 ani garanție</h2>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Pentru pavele, dale și borduri — susținută de tehnologii inovatoare pe tot fluxul de producție.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-body-lg text-charcoal-600 leading-relaxed"
          >
            <p>
              Linia de producție integral automatizată dispune de un sistem de monitorizare și control permanent al
              calității prefabricatelor. Acesta, cumulat cu tehnologiile inovatoare înglobate în întregul flux de
              producție, permite realizarea unor produse de pionierat pe piața românească în ceea ce privește
              dimensiunile, forma, tratamentele de suprafață etc.
            </p>
            <p>
              În paralel cu sistemele automate ale liniei de producție, prefabricatele din beton sunt riguros
              testate în laboratorul propriu, conform unor grafice personalizate pe fiecare tip de produs în parte.
            </p>
            <p className="font-semibold text-charcoal-900">
              Toate aceste elemente facilitează acordarea de 5 ani de garanție pentru pavele, dale și borduri.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-xl bg-charcoal-50 p-8 text-center"
          >
            <p className="text-charcoal-600 mb-6">
              Pentru mai multe detalii privind acordarea garanției, contactează-ne direct.
            </p>
            <Link to="/contact" className="btn-primary">
              Contactează-ne
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
