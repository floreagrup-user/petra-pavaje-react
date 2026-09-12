import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wrench, Shovel, Ruler, Layers, Hammer, Sparkles, ArrowRight } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

const TOOLS_ITEMS = [
  'Roabă, lopeți, târnăcop, greblă (pentru pregătirea solului și a stratului de bază)',
  'Placă vibrantă (cu piesă de prelungire din cauciuc)',
  'Țevi profilate (3-6 cm) și dreptar din aluminiu (pentru netezirea stratului de nisip)',
  'Ciocan de cauciuc (pentru fixarea pavajelor)',
  'Polizor sau ghilotină pentru pavaje (pentru tăierea marginilor/bordurilor)',
  'Mătură (pentru umplerea rosturilor dintre pavaje)',
  'Nivelă, teodolit (pentru stabilirea cotelor, aliniamentelor)',
]

const SUBSTRATE_THICKNESS = [
  'Minim 15 cm, pentru căi de acces pietonal',
  'Minim 20 cm, pentru traficul de autoturisme',
  'Minim 30 cm, în cazul traficului intens și greu (camioane)',
]

const STEPS = [
  {
    icon: Shovel,
    title: 'Pregătirea suprafeței',
    image: `${R2}/montare-1-web.jpg`,
    alt: 'Pregătire suprafață',
    width: '1094',
    height: '547',
    paragraphs: [
      'După realizarea măsurătorilor, se face împrejmuirea și decopertarea zonei, prin îndepărtarea stratului de pământ (cca. 10-35 cm). Pentru un drenaj adecvat, suprafața finală trebuie să prezinte o pantă ușoară, plană.',
      'Se umple suprafața decopertată cu straturi succesive de balast sau piatră concasată, care se compactează cu ajutorul plăcii vibrante.',
    ],
    subheading: 'Grosimea stratului suport',
    list: SUBSTRATE_THICKNESS,
  },
  {
    icon: Ruler,
    title: 'Montarea bordurilor',
    image: `${R2}/montare-2-web.jpg`,
    alt: 'Compactare suprafață',
    width: '1094',
    height: '729',
    paragraphs: [
      'Bordurile se montează după compactarea stratului suport prin realizarea săpăturii necesare. Cotele bordurilor vor fi transmise cu ajutorul nivelei, iar aliniamentele cu ajutorul teodolitului.',
      'Bordurile se montează pe o fundație de beton de aproximativ 10×15 cm pentru borduri mici și 10×20 cm pentru borduri carosabile. Ulterior se împănează pe lateral (minimum o treime din înălțimea bordurii) pentru a prelua forțele transmise de pavaj.',
    ],
  },
  {
    icon: Layers,
    title: 'Nivelarea patului de nisip',
    image: `${R2}/montare-3-web.jpg`,
    alt: 'Nivelare nisip',
    width: '1000',
    height: '647',
    paragraphs: [
      'Pavelele vor fi așezate pe un strat de nisip care va ajuta la poziționarea acestora. În general, este nevoie de un strat de 4-6 cm de nisip cu granulație de 0-4 mm, combinat cu sort cu granulație 8-16 mm.',
      'Se realizează cel mai ușor folosind țevi profilate paralele ca reper și un dreptar pentru nivelarea uniformă a nisipului prin mișcări stânga-dreapta.',
    ],
  },
  {
    icon: Hammer,
    title: 'Montarea pavelelor',
    image: `${R2}/montare-4-web.jpg`,
    alt: 'Pregătire montaj pavele',
    width: '1090',
    height: '728',
    paragraphs: [
      'Montarea pavelelor pe suprafața de nisip nivelat trebuie să înceapă fie dintr-un colț drept, de 90°, fie de la o linie dreaptă, pentru a se evita operațiunile de tăiere.',
      'Pavelele se așează una lângă alta, urmărindu-se alinierea acestora. La așezare, nu trebuie înclinate, deoarece acest lucru va distruge nivelarea patului de nisip. Pentru ajustarea pavelelor se poate folosi ciocanul de cauciuc.',
      'Se poate călca imediat pe suprafața montată. Nu uitați să verificați înclinația pavajului: minim 2-2,5% pentru evacuarea apei.',
    ],
  },
  {
    icon: Sparkles,
    title: 'Aplicarea nisipului printre rosturi și compactarea',
    image: `${R2}/montare-5-web.jpg`,
    alt: 'Compactare pavaj',
    width: '1000',
    height: '637',
    paragraphs: [
      'După montarea pavelelor pe întreaga suprafață, se întinde un strat subțire de nisip fin (0,2 mm) uscat cu ajutorul unei mături, pentru a umple toate rosturile.',
      'Se îndepărtează nisipul în exces și se compactează cu ajutorul plăcii vibrante (cu piesa de prelungire din cauciuc). Se compactează atât longitudinal, cât și transversal, pentru o presare optimă. Se repetă operațiunea de acoperire cu nisip a suprafeței, până când rosturile sunt complet umplute.',
      'Pentru o rezistență sporită se poate uda și lăsa 2-3 zile până la îndepărtarea excesului de nisip. Acest proces va asigura fixarea finală a pavajelor.',
    ],
  },
]

export function MontajPage() {
  useEffect(() => {
    const url = `${window.location.origin}/modele-montaj`
    const title = `Sfaturi și instrucțiuni de montaj - Pavaj, pavele, dale | ${SEO_SITE_NAME}`
    const description =
      'Ghid complet de montaj pentru pavajele Petra Pavaje. Găsiți cele mai bune metode de montaj, inclusiv sfaturi pentru pregătirea suprafeței, aliniament și stratul de bază.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${R2}/montare-4-web.jpg`)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Montaj', item: url },
      ],
    })

    upsertJsonLd('howto-schema', {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Sfaturi și instrucțiuni de montaj pentru pavaje, pavele, dale',
      description,
      step: STEPS.map((step) => ({
        '@type': 'HowToStep',
        name: step.title,
        text: step.paragraphs.join(' '),
        image: step.image,
      })),
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
              <span className="text-white">Montaj</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Utile</p>
            <h1 className="heading-h1 mb-2 max-w-3xl">Sfaturi și instrucțiuni de montaj</h1>
            <p className="text-xl text-charcoal-300 mb-6">Pavaj, pavele, dale</p>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Ghid complet de montaj pentru pavajele Petra Pavaje. Urmează pașii corecți pentru o suprafață durabilă
              și un aspect profesional.
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
            className="mb-14 rounded-xl bg-charcoal-50 p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Unelte necesare</h2>
            </div>
            <ul className="space-y-3">
              {TOOLS_ITEMS.map((item) => (
                <li key={item} className="flex gap-3 text-charcoal-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-14"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-charcoal-400">
                    Pasul {index + 1}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">{step.title}</h2>
                <div className="space-y-4 text-body-lg text-charcoal-600 leading-relaxed mb-6">
                  {step.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {step.subheading && step.list && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-charcoal-900 mb-3">{step.subheading}</h3>
                    <ul className="space-y-3">
                      {step.list.map((item) => (
                        <li key={item} className="flex gap-3 text-charcoal-600 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2.5 shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-auto"
                    width={step.width}
                    height={step.height}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </motion.div>
            )
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-charcoal-50 p-8 md:p-10 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-3">Pavajul este montat</h2>
            <p className="text-charcoal-600 mb-6 max-w-xl mx-auto">
              Pentru a-i păstra aspectul și durabilitatea în timp, urmează recomandările noastre de întreținere.
            </p>
            <Link to="/intretinere" className="btn-primary inline-flex">
              Vezi ghidul de întreținere
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
