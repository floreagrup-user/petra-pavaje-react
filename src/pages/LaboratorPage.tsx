import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FlaskConical, HelpCircle, BadgeCheck, ClipboardCheck, Wrench, Phone, Mail, MapPin, ExternalLink } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

const ROLE_ITEMS = [
  'Asigurarea calității și constanței performanței produselor Petra Pavaje',
  'Dezvoltarea produselor noi',
  'Testarea durabilității prefabricatelor din beton',
  'Implementarea și testarea soluțiilor noi pentru protecția suprafețelor',
  'Analiza materiilor prime care intră în compoziția prefabricatelor de beton',
  'Studiul mixurilor și al rețetelor pentru produsele Petra Pavaje',
]

const KNOW_THAT_ITEMS = [
  'Laboratorul Petra Pavaje se adresează și clienților externi, punând la dispoziția acestora experiența, imparțialitatea și calitatea garantată a serviciilor de top pentru verificarea calității materialelor de construcții.',
  'Laboratorul Petra Pavaje este printre singurele laboratoare de construcții din țară și din străinătate care efectuează încercările de întindere prin despicare/încovoiere ale prefabricatelor din beton în permanență în mediu ud, adică în cea mai defavorabilă condiție — asigurând astfel o rezistență net superioară a elementelor, comparativ cu cele ale altor producători.',
  'Testele din laboratorul Petra Pavaje se fac în toate etapele de dezvoltare a unui produs: se analizează materia primă, produsul proaspăt scos de pe linia de fabricație și produsul care are o anumită vechime.',
  'Pentru toate produsele Petra Pavaje se asigură trasabilitatea pe întreg fluxul de producție — pentru fiecare pavaj produs se poate spune cu exactitate lotul materiilor prime care au intrat în compoziția lor.',
]

const ANALYSIS_ITEMS = [
  'Determinarea absorbției totale de apă a pavelelor din beton',
  'Rezistența la întindere prin despicare a pavelelor din beton',
  'Determinarea absorbției totale de apă a dalelor din beton',
  'Rezistența la încovoiere dale din beton',
  'Determinarea absorbției totale de apă a bordurilor din beton',
  'Rezistența la încovoiere borduri din beton',
  'Determinarea absorbției totale de apă a canalelor de evacuare',
]

const EQUIPMENT_ITEMS = [
  'Presă de încercare la compresiune de 3000 kN',
  'Cadru secundar pentru încovoiere elemente prefabricate și BCR-uri',
  'Presă Marshall',
  'Compactor Marshall',
  'Baie de apă Marshall',
  'Picnometru',
  'Centrifugă de extracție',
  'Aparat proctor automat',
  'Aparat de sitat',
  'Spectrofotometru',
  'Vâscozimetru Engler',
  'Extractor',
  'Etuve, balanțe',
  'Baie de apă termostată, penetrometru automat, agitator magnetic cu încălzire',
  'Carotieră, pârghie Benkelman, placă Zorn etc.',
]

export function LaboratorPage() {
  useEffect(() => {
    const url = `${window.location.origin}/laborator`
    const title = `Laborator - Petra Pavaje, parte a Florea Grup | ${SEO_SITE_NAME}`
    const description =
      'Laboratorul propriu de analize și încercări Petra Pavaje, autorizat de Inspectoratul de Stat în Construcții, testează durabilitatea prefabricatelor din beton la standardul SR EN ISO/IEC 17025:2018.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${R2}/laborator-echipament-1.png`)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Laborator', item: url },
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
              <span className="text-white">Laborator</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Laborator</p>
            <h1 className="heading-h1 mb-6 max-w-3xl">Laboratorul Petra Pavaje, parte a Florea Grup</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Fabricile Petra Pavaje funcționează ca huburi deschise de cercetare și inovație. În acest proces,
              fiecare fabrică deține un laborator propriu de analiză și testare. Procesul creativ de dezvoltare a
              produselor noi este realizat pe baza încercărilor exacte făcute cu aparatură de ultimă generație și
              aflate sub autorizarea Inspectoratului de Stat în Construcții.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-xl border border-charcoal-100 p-8 md:p-10 flex justify-center">
            <img
              src={`${R2}/Picture-1.png`}
              alt="Logo Laborator Florea Grup"
              className="w-full max-w-md h-auto"
              width="1430"
              height="754"
              loading="eager"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <FlaskConical className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Rolul laboratorului</h2>
            </div>
            <ul className="space-y-3 mb-6">
              {ROLE_ITEMS.map((item) => (
                <li key={item} className="flex gap-3 text-charcoal-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-body-lg text-charcoal-600 leading-relaxed">
              Calitatea produselor Petra Pavaje este consolidată grație interesului sporit pentru îmbunătățire
              continuă. Acest lucru se realizează prin studiul diverselor variabile precum materia primă folosită,
              optimizarea rețetei fiecărui produs și a parametrilor de procesare, modul de depozitare, volumul de
              trafic sau vechimea pavajului. Analizând acești factori, se dezvoltă produse care răspund cât mai bine
              nevoilor, astfel încât clienții se pot bucura pe termen lung de pavaje, iar aspectul lor să rămână cât
              mai atractiv odată cu trecerea timpului.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14 rounded-xl bg-charcoal-50 p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Știați că…</h2>
            </div>
            <ul className="space-y-4">
              {KNOW_THAT_ITEMS.map((item) => (
                <li key={item} className="flex gap-3 text-charcoal-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Certificări</h2>
            </div>
            <div className="space-y-4 text-body-lg text-charcoal-600 leading-relaxed">
              <p>
                Laboratorul de analize și încercări Florea Grup este <strong className="text-charcoal-900">autorizat de către Inspectoratul de Stat în Construcții</strong> cu autorizația nr. 2128, începând cu anul 2006. Competența laboratorului este dovedită atât clienților laboratorului, cât și autorităților de reglementare, acreditare și control, prin implementarea riguroasă a{' '}
                <strong className="text-charcoal-900">SR EN ISO/IEC 17025:2018</strong>.
              </p>
              <p>
                Laboratorul este parte independentă a organizației și asigură <strong className="text-charcoal-900">imparțialitatea, confidențialitatea și profesionalismul</strong> rezultatelor obținute.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Analize efectuate</h2>
            </div>
            <div className="space-y-4 text-body-lg text-charcoal-600 leading-relaxed mb-6">
              <p>
                Laboratorul de analize și încercări Florea Grup este autorizat de către Inspectoratul de Stat în
                Construcții pentru a efectua încercări în următoarele profiluri:{' '}
                <strong className="text-charcoal-900">B, BA, BP, MBM, GTF, D, MD, EP</strong>.
              </p>
              <p className="font-semibold text-charcoal-900">
                Laboratorul realizează o largă serie de testări și analize pentru a studia durabilitatea
                prefabricatelor din beton.
              </p>
            </div>
            <ul className="space-y-3 mb-6">
              {ANALYSIS_ITEMS.map((item) => (
                <li key={item} className="flex gap-3 text-charcoal-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-body-lg text-charcoal-600 leading-relaxed mb-4">
              Încercările se efectuează cu aparatură de ultimă generație, calibrată și verificată metrologic, în
              spații special amenajate și care dispun de condiții de mediu conform exigențelor normativelor și
              standardelor românești și europene în vigoare.
            </p>
            <p className="text-body-lg text-charcoal-600 leading-relaxed">
              Lista completă a analizelor efectuate de Laboratorul de analize și încercări Florea Grup se poate
              vedea{' '}
              <a
                href="https://floreagrup.ro/projects/laborator-constructii/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 font-semibold hover:underline inline-flex items-center gap-1"
              >
                aici
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              .
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Dotare laborator</h2>
            </div>
            <p className="text-body-lg text-charcoal-600 leading-relaxed mb-6">Dotarea laboratorului cuprinde:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
              {EQUIPMENT_ITEMS.map((item) => (
                <li key={item} className="flex gap-3 text-charcoal-600 leading-relaxed text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="rounded-xl overflow-hidden">
              <img
                src={`${R2}/laborator-echipament-1.png`}
                alt="Dotări laborator Petra Pavaje"
                className="w-full h-auto"
                width="2093"
                height="1803"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-charcoal-50 p-8 md:p-10"
          >
            <p className="text-body-lg text-charcoal-600 leading-relaxed mb-6">
              Preocuparea pentru dezvoltarea permanentă a personalului și îmbunătățirea calității serviciilor
              prestate asigură eficiența maximă și profesionalism. Puteți cere o ofertă personalizată pe datele de
              contact de mai jos.
            </p>
            <div className="space-y-3">
              <p className="font-semibold text-charcoal-900">Șef Laborator: Ing. Gabriela Marchiș</p>
              <div className="flex items-center gap-3 text-charcoal-600">
                <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                <a href="tel:0728999941" className="hover:text-brand-600 transition-colors">0728 999 941</a>
              </div>
              <div className="flex items-center gap-3 text-charcoal-600">
                <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                <a href="mailto:laborator@floreagrup.ro" className="hover:text-brand-600 transition-colors">laborator@floreagrup.ro</a>
              </div>
              <div className="flex items-center gap-3 text-charcoal-600">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Alba Iulia, str. Pietrar nr. 20</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
