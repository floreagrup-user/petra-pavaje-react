import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SprayCan, AlertTriangle } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

type Product = {
  title: string
  image: string
  description: string
  application: string
  coverage: string
  warning: string
}

const PRODUCTS: Product[] = [
  {
    title: 'Anti-Mucegai',
    image: `${R2}/Anti-mucegai.avif`,
    description:
      'Soluție alcalină special creată pentru eliminarea petelor de mucegai, igrasie, tanin, alge și mușchi de pe suprafețele minerale. Se utilizează pe pavaje, piatră naturală, beton, marmură sau granit, redând curățenia și aspectul inițial al acestora.',
    application:
      'Produsul se aplică uniform pe suprafața dorită cu ajutorul unei pensule sau prin pulverizare. Se lasă să acționeze timp de câteva ore, apoi se freacă cu o perie din plastic, iar la final se clătește abundent cu apă, de preferat de două-trei ori.',
    coverage: 'Până la 10 m² / 1L',
    warning: 'Nu se amestecă cu alte produse. Evitați contactul cu ochii. Purtați mănuși. Acțiune oxidantă puternică.',
  },
  {
    title: 'Detergent Alcalin Profesional',
    image: `${R2}/Detergent-alcalin.avif`,
    description:
      'Detergent concentrat, foarte puternic, destinat îndepărtării petelor de ulei, smog, praf sau urme de cauciuc. Este ideal pentru curățarea eficientă a pavajelor, gardurilor, betonului, pietrei naturale, marmurei și granitului.',
    application:
      'Produsul se aplică uniform pe suprafața dorită, folosind o pensulă sau un pulverizator. Se lasă să acționeze câteva minute, apoi se freacă cu o perie din plastic, se îndepărtează surplusul cu o cârpă uscată și se clătește abundent cu apă, de două-trei ori.',
    coverage: '5–10 m² / 1L (pete rezistente) · 10–30 m² / 1L (curățare generală)',
    warning: 'Nu se amestecă cu alți detergenți. Evitați ochii. Purtați mănuși.',
  },
  {
    title: 'Impregnant cu Efect Umed',
    image: `${R2}/impregnant-efect-umded.avif`,
    description:
      'Produs cu rol de protecție și înfrumusețare, care intensifică culoarea naturală și impermeabilizează suprafața tratată. Se aplică pe pavaje, piatră, beton, marmură și granit pentru a spori rezistența la apă, smog, îngheț și murdărie.',
    application:
      'Produsul se aplică uniform pe suprafața curată și uscată, folosind o pensulă, un trafalet sau un pulverizator. Se lasă să acționeze timp de 15–20 de minute, după care se șterge surplusul cu o cârpă uscată.',
    coverage: '10–30 m² / 1L',
    warning: 'Nu se amestecă cu alte produse. Evitați ochii. Purtați mănuși.',
  },
  {
    title: 'Impregnant cu Efect Natural',
    image: `${R2}/impregnant-efect-natural.avif`,
    description:
      'Soluție de protecție invizibilă ce păstrează aspectul natural al suprafeței, oferind totodată impermeabilizare eficientă. Este potrivit pentru pavaje, garduri, trepte și alte suprafețe verticale sau orizontale din beton.',
    application:
      'Produsul se aplică uniform pe suprafața dorită cu pensula, trafaletul sau prin pulverizare. Se lasă să acționeze timp de 15–20 de minute, apoi surplusul se îndepărtează cu o cârpă uscată.',
    coverage: '10–30 m² / 1L',
    warning: 'Inflamabil. Evitați contactul cu ochii. Folosiți mănuși.',
  },
  {
    title: 'Anti-Eflorescență',
    image: `${R2}/Anti-eflorescenta.avif`,
    description:
      'Detergent special conceput pentru îndepărtarea petelor albe de eflorescență, ciment sau adeziv care apar la suprafața betonului. Se utilizează pe pavaje, garduri, piatră sau alte suprafețe minerale, curățând în profunzime fără a deteriora structura.',
    application:
      'Produsul se aplică uniform pe suprafața dorită, cu ajutorul unei pensule sau prin pulverizare. Se lasă să acționeze câteva minute, apoi se freacă cu o perie din plastic și se clătește abundent cu apă.',
    coverage: '4–8 m² / 1L',
    warning: 'Nu se aplică pe marmură lucioasă. Evitați ochii. Purtați mănuși.',
  },
  {
    title: 'Anti-Rugină',
    image: `${R2}/Anti-rugina.avif`,
    description:
      'Produs destinat curățării petelor de rugină apărute pe suprafețele dure din exterior, cu acțiune eficientă și rapidă. Se aplică pe pavaje, piatră, beton, marmură și granit, fără a compromite finisajul acestora.',
    application:
      'Produsul se aplică uniform pe suprafața dorită, folosind o pensulă sau un pulverizator. Se lasă să acționeze câteva ore, după care se freacă cu o perie din plastic și se clătește abundent cu apă.',
    coverage: '8–12 m² / 1L',
    warning: 'Nu se folosește pe marmură lucioasă. Evitați ochii. Folosiți mănuși.',
  },
]

export function IntretinerePage() {
  useEffect(() => {
    const url = `${window.location.origin}/intretinere`
    const title = `Recomandări produse de întreținere | ${SEO_SITE_NAME}`
    const description =
      'Descoperă produse de întreținere pentru curățarea pavajelor și pietrei naturale. Restabilește aspectul inițial!'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/intretinere', '/en/intretinere')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', PRODUCTS[0].image)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Întreținere', item: url },
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
              <span className="text-white">Întreținere</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Ghid</p>
            <h1 className="heading-h1 mb-2 max-w-3xl">Recomandări produse de întreținere</h1>
            <p className="text-xl text-charcoal-300 mb-6">Soluții profesionale pentru pavajul tău</p>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Păstrează aspectul impecabil al pavajelor tale cu produsele noastre profesionale de întreținere. De la
              detergenți specializați la soluții anti-eflorescență și impregnanți protectori, găsești tot ce ai
              nevoie pentru curățare, protecție și înfrumusețare.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                className="rounded-xl border border-charcoal-100 bg-white overflow-hidden flex flex-col"
              >
                <div className="aspect-square bg-charcoal-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <SprayCan className="w-4 h-4 text-brand-600 shrink-0" />
                    <h2 className="text-lg font-bold text-charcoal-900">{product.title}</h2>
                  </div>
                  <p className="text-charcoal-600 leading-relaxed text-sm mb-4">{product.description}</p>

                  <div className="mb-4">
                    <h3 className="text-xs font-semibold tracking-[0.1em] uppercase text-charcoal-400 mb-1.5">
                      Mod de aplicare
                    </h3>
                    <p className="text-charcoal-600 leading-relaxed text-sm">{product.application}</p>
                  </div>

                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
                      Acoperire: {product.coverage}
                    </span>
                  </div>

                  <div className="mt-auto flex gap-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-amber-800 text-xs leading-relaxed">{product.warning}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
