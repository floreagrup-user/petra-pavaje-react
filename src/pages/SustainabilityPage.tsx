import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sun, Cloud, TreePine, Cpu, Zap, GraduationCap, Users, Home, Trophy, PartyPopper, Calendar } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

const HERO_STATS = [
  { icon: Sun, value: '10.000 mp', label: 'Panouri fotovoltaice' },
  { icon: Cloud, value: '600+ tone', label: 'CO₂ evitate anual' },
  { icon: TreePine, value: '41.000+', label: 'Puieți plantați' },
]

interface Pillar {
  number: string
  icon: typeof Sun
  title: string
  body: string
  highlightValue: string
  highlightLabel: string
  image: string
  alt: string
  reversed?: boolean
}

const PILLARS: Pillar[] = [
  {
    number: '01',
    icon: Sun,
    title: 'Energia verde și reducerea emisiilor',
    body: 'Tranziția către o economie cu emisii scăzute de carbon reprezintă pilonul central al investițiilor noastre tehnologice. Am transformat infrastructura celor patru fabrici Petra Pavaje în hub-uri de energie verde prin implementarea unui sistem de panouri fotovoltaice ce acoperă aproximativ 10.000 mp. Cu o capacitate instalată de 1.740 kWp, această infrastructură ne permite să evităm anual eliberarea a peste 600 de tone de CO₂, asigurând independența energetică a proceselor industriale.',
    highlightValue: '1.740 kWp',
    highlightLabel: 'Capacitate instalată panouri fotovoltaice',
    image: `${R2}/energie-verde-si-emsii-0-web1-1.avif`,
    alt: 'Panouri fotovoltaice Petra Pavaje - Energie verde',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Inovația tehnologică și optimizarea resurselor',
    body: 'Eficiența industrială este redefinită la Petra Pavaje prin utilizarea unor tehnologii de ultimă generație care prioritizează conservarea resurselor. Procesele noastre de producție sunt complet automatizate, asigurând o precizie care elimină pierderile de materie primă și maximizează durabilitatea produsului finit. Mai mult, viziunea noastră asupra sustenabilității include optimizarea lanțului logistic — prin localizarea strategică a fabricilor, reducem distanțele de transport către beneficiari, minimizând impactul emisiilor de noxe asociate distribuției.',
    highlightValue: '4 Fabrici',
    highlightLabel: 'Localizate strategic pentru a reduce transportul',
    image: `${R2}/inovatie-tehnologica-web1-1.avif`,
    alt: 'Linie de producție automatizată Petra Pavaje',
    reversed: true,
  },
  {
    number: '03',
    icon: Zap,
    title: 'Mobilitatea electrică',
    body: 'Suntem deplin angajați în adoptarea soluțiilor de mobilitate nepoluantă, integrând în activitatea noastră curentă o flotă de peste 60 de vehicule electrice. Această tranziție este susținută de o rețea proprie de stații de încărcare rapidă, implementată în locațiile noastre strategice.',
    highlightValue: '60+ vehicule',
    highlightLabel: 'Electrice în flota operațională',
    image: `${R2}/mobilitate-electrica-web1-1.avif`,
    alt: 'Flotă vehicule electrice Petra Pavaje',
  },
  {
    number: '04',
    icon: TreePine,
    title: 'Campanii de împădurire',
    body: 'Conștienți de rolul vital al pădurilor în reglarea climatică, derulăm campanii de împădurire de anvergură. Acțiunea noastră din 2025, concretizată prin plantarea a peste 41.000 de puieți de fag, molid, frasin și larice, reprezintă un efort sistematic de restaurare a peste 8 hectare de fond forestier în județul Alba. Aceste demersuri nu vizează doar compensarea amprentei de carbon, ci și protejarea biodiversității locale.',
    highlightValue: '41.000+ puieți',
    highlightLabel: 'Plantați pe 8+ hectare în județul Alba',
    image: `${R2}/actiune-impadurire-web1-2.avif`,
    alt: 'Campanie împădurire Petra Pavaje - 41.000 puieți',
    reversed: true,
  },
]

interface CommunityCard {
  number: string
  icon: typeof Sun
  title: string
  body: string
  tag: string
  image: string
  alt: string
  full?: boolean
}

const COMMUNITY_CARDS: CommunityCard[] = [
  {
    number: '01',
    icon: Home,
    title: 'Susținerea economiei locale',
    body: 'Succesul Petra Pavaje este indisolubil legat de prosperitatea comunității în care activăm. Ne mândrim cu o strategie de achiziții care prioritizează în proporție de peste 90% furnizorii români, consolidând astfel economia națională. Prin scurtarea lanțurilor de aprovizionare, reducem impactul logistic asupra mediului și asigurăm o circulație eficientă a capitalului în interiorul comunității.',
    tag: '90%+ furnizori români',
    image: `${R2}/economia-locala-web2.avif`,
    alt: 'Susținerea economiei locale - Petra Pavaje',
  },
  {
    number: '02',
    icon: Users,
    title: 'Respectul față de oameni',
    body: 'O companie sustenabilă se bazează pe oameni motivați și protejați. Petra Pavaje oferă locuri de muncă stabile, într-un mediu guvernat de cele mai înalte standarde de etică profesională și siguranță. Investim constant în programe de dezvoltare a competențelor și în modernizarea condițiilor de lucru, considerând că bunăstarea angajaților noștri este cel mai bun indicator al succesului nostru.',
    tag: 'Etică și siguranță',
    image: `${R2}/respectul-fata-de-oameni-web2.avif`,
    alt: 'Respectul față de oameni - Petra Pavaje',
  },
  {
    number: '03',
    icon: GraduationCap,
    title: 'Sprijin pentru educație',
    body: 'Investiția în educație reprezintă, pentru noi, o investiție în viitorul inovației. Prin parteneriatele strategice cu Universitatea „1 Decembrie 1918" din Alba Iulia și Universitatea Tehnică din Cluj-Napoca, facilităm schimbul de cunoștințe între mediul academic și cel industrial, oferind studenților stagii de practică și mentorat. În paralel, ne implicăm activ în modernizarea școlilor și construirea de spații de joacă sigure pentru copii, completând acest angajament prin susținerea proiectelor sociale dedicate persoanelor aflate în dificultate.',
    tag: 'Parteneriate universitare',
    image: `${R2}/sprijin-pt-educatie-web2.avif`,
    alt: 'Sprijin pentru educație - Petra Pavaje',
    full: true,
  },
  {
    number: '04',
    icon: Trophy,
    title: 'Susținerea sportului de performanță',
    body: 'Performanța sub presiune și rigoarea tehnică sunt valori pe care le regăsim atât în business, cât și în sportul de elită. Petra Pavaje susține excelența prin sponsorizarea Campionatului Național de Rally și a echipelor de rugby și fotbal. Susținând sportivii de performanță, promovăm modele de succes și determinare pentru întreaga comunitate.',
    tag: 'Rally · Rugby · Fotbal',
    image: `${R2}/sustinerea-sportului-de-performanta-web2.avif`,
    alt: 'Susținerea sportului de performanță - Petra Pavaje',
  },
  {
    number: '05',
    icon: PartyPopper,
    title: 'Organizarea evenimentelor sportive',
    body: 'Dincolo de performanță, credem în puterea sportului de a uni comunitatea și de a promova un stil de viață echilibrat. Organizăm anual competiții de volei și tenis de câmp și sponsorizăm competiții de ciclism și alergare, care se adresează tuturor categoriilor de vârstă. Aceste inițiative sunt modul nostru de a mulțumi comunității și de a investi în vitalitatea tinerelor generații.',
    tag: 'Volei · Tenis · Ciclism · Alergare',
    image: `${R2}/organizarea-evenimentelor-sportive-web2.avif`,
    alt: 'Organizarea evenimentelor sportive - Petra Pavaje',
  },
]

export function SustainabilityPage() {
  const { ref: pillarsRef, isIntersecting: pillarsIn } = useIntersectionObserver({ threshold: 0.05 })
  const { ref: cardsRef, isIntersecting: cardsIn } = useIntersectionObserver({ threshold: 0.05 })

  useEffect(() => {
    const url = `${window.location.origin}/sustenabilitate`
    const title = `Sustenabilitate - În armonie cu natura | ${SEO_SITE_NAME}`
    const description =
      'Investiții concrete în energie verde, mobilitate electrică și campanii de împădurire, plus responsabilitate socială pentru comunitate, educație și sport.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${R2}/Cover-web1.avif`)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Sustenabilitate', item: url },
      ],
    })

    return resetSEO
  }, [])

  return (
    <div className="pt-20 md:pt-24">
      <section className="relative bg-charcoal-950 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${R2}/Cover-web1.avif`}
            alt="Petra Pavaje - Sustenabilitate"
            className="w-full h-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-charcoal-950/40" />
        </div>
        <div className="container-premium relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-300 mb-6">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">Sustenabilitate</span>
            </nav>
            <p className="inline-flex items-center gap-2 text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Sustenabilitate
            </p>
            <h1 className="heading-h1 mb-6 max-w-2xl">În armonie cu natura<sup className="text-lg align-super">®</sup></h1>
            <p className="text-body-lg text-charcoal-200 max-w-2xl mb-10">
              Pentru noi, sustenabilitatea nu este un proiect punctual, ci o evoluție naturală a felului în care ne
              desfășurăm activitatea. Fie că vorbim despre investițiile în energie verde, modernizarea liniilor de
              producție sau reducerea consumului de resurse, fiecare decizie urmărește același obiectiv: un impact
              mai responsabil asupra mediului.
            </p>
            <div className="flex flex-wrap gap-8 md:gap-12 pt-8 border-t border-white/10">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <stat.icon className="w-6 h-6 text-brand-500 shrink-0" />
                  <div>
                    <div className="text-xl md:text-2xl font-bold leading-none">{stat.value}</div>
                    <div className="text-xs text-charcoal-300 uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={pillarsRef} className="py-16 md:py-24 bg-white">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-emerald-700 text-sm font-medium tracking-[0.2em] uppercase mb-3">Angajamentul nostru</p>
            <h2 className="heading-h2 text-charcoal-900 mb-4">Grija față de mediu</h2>
            <p className="text-body-lg text-charcoal-500">Investiții concrete și măsurabile pentru un viitor mai verde</p>
          </motion.div>

          <div className="space-y-16 md:space-y-20">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                animate={pillarsIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.08 }}
                className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${pillar.reversed ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <div className="relative rounded-xl overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 text-5xl font-bold text-white/70" style={{ fontFamily: 'inherit' }}>
                    {pillar.number}
                  </span>
                  <img src={pillar.image} alt={pillar.alt} className="w-full h-auto object-cover" loading={index === 0 ? 'eager' : 'lazy'} />
                </div>
                <div>
                  <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                    <pillar.icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal-900 mb-3">{pillar.title}</h3>
                  <p className="text-charcoal-600 leading-relaxed mb-5">{pillar.body}</p>
                  <div className="inline-flex flex-col gap-0.5 border-l-4 border-emerald-600 pl-4 py-1">
                    <span className="text-xl font-bold text-emerald-700">{pillar.highlightValue}</span>
                    <span className="text-xs text-charcoal-500 uppercase tracking-wide">{pillar.highlightLabel}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-16 md:mt-20 max-w-2xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-medium text-charcoal-800 italic leading-snug">
              „Fiecare investiție în tehnologie verde și fiecare copac plantat reprezintă o{' '}
              <strong className="text-emerald-700 not-italic">promisiune concretă</strong> pentru generațiile viitoare."
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={cardsRef} className="py-16 md:py-24 bg-charcoal-50">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Responsabilitate socială</p>
            <h2 className="heading-h2 text-charcoal-900 mb-4">Grija față de comunitate</h2>
            <p className="text-body-lg text-charcoal-500">Construim valoare dincolo de produse — pentru oameni, educație și comunitate</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMMUNITY_CARDS.map((card, index) => (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, y: 30 }}
                animate={cardsIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06 }}
                className={`rounded-xl overflow-hidden bg-white border border-charcoal-100 ${card.full ? 'md:col-span-2' : ''}`}
              >
                <div className={`relative overflow-hidden ${card.full ? 'aspect-[21/9]' : 'aspect-[3/2]'}`}>
                  <img src={card.image} alt={card.alt} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent" />
                  <span className="absolute top-3 left-4 text-3xl font-bold text-white/80">{card.number}</span>
                </div>
                <div className="p-6">
                  <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center mb-3">
                    <card.icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-charcoal-600 leading-relaxed mb-4">{card.body}</p>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-charcoal-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600" aria-hidden="true" />
                    {card.tag}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 rounded-2xl bg-emerald-900 text-white p-10 md:p-14 text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6">
              <TreePine className="w-3.5 h-3.5" />
              Ziua Mediului
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">„În armonie cu natura"</h3>
            <p className="text-emerald-100 leading-relaxed mb-6">
              Sub motto-ul „În armonie cu natura", aniversarea Petra Pavaje este celebrată anual pe 5 iunie, chiar de
              Ziua Mediului, confirmând angajamentul nostru față de protejarea resurselor naturale.
            </p>
            <div className="inline-flex items-center gap-2 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <strong>5 Iunie</strong> — Ziua Mondială a Mediului
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
