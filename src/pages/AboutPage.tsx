import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ExternalLink,
  ArrowRight,
  Quote,
  Layers,
  History,
  Droplets,
  Building2,
  HardHat,
  Fuel,
  Car,
  Hotel,
} from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

const STATS = [
  { value: '30', suffix: '', label: 'ani de antreprenoriat Florea Grup' },
  { value: '4', suffix: '', label: 'fabrici la nivel național' },
  { value: '24.000', suffix: '', label: 'mp producție zilnică' },
  { value: '800', suffix: '+', label: 'produse Petra Pavaje în portofoliu' },
]

const TECH_ITEMS = [
  {
    icon: Layers,
    title: 'Splitarea',
    body: 'Este cea mai nouă instalație din linia de fabricație a produselor Petra Pavaje. Odată ce elementul de beton a fost uscat, la minim o săptămână după turnare, urmează despicarea controlată a acestuia, prin aplicarea unei presiuni. Produsele rezultate sunt bine compactate, au durabilitate ridicată și una sau mai multe fețe cu o textură deosebită. Blocul din beton își păstrează forma regulată, putând fi astfel ușor de montat. Elementele de treaptă, palisadele și blocurile de zid sunt doar câteva dintre produsele realizate prin această tehnică.',
  },
  {
    icon: History,
    title: 'Antichizarea',
    body: 'Prin procesul de antichizare, produsele capătă aspectul pietrei naturale, cu textură învechită și culoare care imită foarte bine nuanțele întâlnite într-o carieră de piatră. Acest proces de îmbătrânire a suprafeței nu afectează rezistența produsului. Pavajele astfel obținute se aseamănă pietrei cubice, având lungimi de 10 sau 20 cm — combinând frumusețea și naturalețea pietrei cu rezistența betonului vibropresat.',
  },
  {
    icon: Droplets,
    title: 'Impregnarea suprafețelor',
    body: 'Suprafața colorată a pavajelor se obține prin impregnarea stratului superior cu substanțe speciale care asigură culori vii și rezistență în timp. Procesul este rezultatul coroborat al inginerilor din producție și a echipei din laboratorul de cercetare și dezvoltare, imitând coloritul neuniform al pietrei naturale.',
  },
]

const BUSINESS_CARDS = [
  {
    icon: Building2,
    title: 'Materiale de construcții',
    body: 'Activitatea de bază a companiei Florea Grup rămâne extracția și prelucrarea agregatelor minerale, fabricarea mixturilor asfaltice și, recent, fabricarea prefabricatelor din beton. Compania operează 5 stații de betoane, la Cluj-Napoca, Sibiu, Deva și două în Alba Iulia. Deținerea integrală a unităților de producție și testare permite furnizarea materialelor de construcții la o calitate constant ridicată și la un preț competitiv.',
  },
  {
    icon: HardHat,
    title: 'Lucrări de construcții',
    body: 'Florea Grup este partenerul unora dintre cele mai mari proiecte de infrastructură din Transilvania: autostrada Sebeș-Turda, execuția liniei ferate Coșlariu–Vințu de Jos, drumul național DN1 sau tunelul de la Turdaș. Construcțiile civile și industriale fac parte din portofoliu: blocuri de locuințe în Alba, Sibiu, Deva și Cluj, hale industriale, proiecte turistice și platformele industriale Bosch Blaj și Daimler Sebeș.',
  },
  {
    icon: Fuel,
    title: 'Distribuție carburanți',
    body: 'De la stația de carburanți care a însemnat primul pas în antreprenoriat pentru Florea Grup, compania a ajuns astăzi la 10 stații de distribuție a carburanților în județul Alba: Alba Iulia, Șard, Zlatna, Câmpeni, Sântimbru, Aiud, Ocna Mureș, Mihalț, Blaj.',
  },
  {
    icon: Car,
    title: 'Servicii de taxi',
    body: 'Parcul auto Florea Taxi numără în prezent 25 de autoturisme proprii, care asigură transportul de persoane în Alba Iulia, dar și transferuri spre și dinspre aeroport sau destinații îndepărtate, prin aplicația Florea Taxi pe iOS și Android.',
  },
]

interface Milestone {
  year: string
  title: string
  body: string
}

const MILESTONES: Milestone[] = [
  { year: '1996', title: 'Înființare Florea Grup', body: 'Marcel și David Florea pun bazele companiei în Alba Iulia, cu capital integral românesc.' },
  { year: '2006', title: 'Prima stație de betoane', body: 'Se inaugurează prima stație de betoane a companiei, în Alba Iulia.' },
  { year: '2014', title: 'Cariera de piatră Almaș', body: 'Controlul integral al fluxului de producție, de la extragerea materiei prime.' },
  { year: '2017', title: 'Inaugurare Florea Pavaje', body: 'Lansarea diviziei de prefabricate din beton — cea mai modernă fabrică din Transilvania.' },
  { year: '2020', title: 'Extindere la Ploiești', body: 'A doua fabrică de prefabricate, capacitate dublată, rebranding la Petra Pavaje.' },
  { year: '2021', title: 'Inaugurare Petra Pavaje Arad', body: 'A treia fabrică de prefabricate din beton, în comuna Vladimirescu, județul Arad.' },
  { year: '2022', title: 'Inaugurare Petra Pavaje Roman', body: 'A patra fabrică — cea mai rapidă expansiune din domeniul materialelor de construcții.' },
]

export function AboutPage() {
  const { ref: milestonesRef, isIntersecting: milestonesVisible } = useIntersectionObserver({ threshold: 0.05 })

  useEffect(() => {
    const url = `${window.location.origin}/despre-noi`
    const title = `Despre Noi - Florea Grup, 30 de ani | ${SEO_SITE_NAME}`
    const description =
      'Petra Pavaje este parte a Florea Grup, companie antreprenorială românească fondată acum 30 de ani. Descoperă povestea, tehnologia și extinderea la nivel național.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${R2}/Cover-sustenabilitate.jpg`)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Despre Noi', item: url },
      ],
    })

    return resetSEO
  }, [])

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={`${R2}/Cover-sustenabilitate.jpg`}
            alt=""
            className="w-full h-full object-cover opacity-35"
            width="1960"
            height="980"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/85 to-charcoal-950/60" />
        </div>

        <div className="container-premium relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-44 lg:pb-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-8" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">Despre Noi</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-4">Despre Noi</p>
            <h1 className="heading-display mb-4 max-w-3xl">Florea Grup</h1>
            <p className="text-brand-500 text-xl md:text-2xl font-semibold tracking-wide mb-6">30 de ani de antreprenoriat românesc</p>
            <p className="text-body-lg text-charcoal-300 max-w-2xl">
              Petra Pavaje este brandul de prefabricate din beton al Florea Grup — o companie cu capital integral
              românesc, construită pe materie primă de calitate, tehnologie de top și know-how în domeniu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-white border-b border-charcoal-100">
        <div className="container-premium py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y divide-x-0 md:divide-y-0 md:divide-x divide-charcoal-100">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="px-2 py-4 md:px-8 md:py-0 text-center md:text-left first:pl-0"
              >
                <div className="text-3xl md:text-4xl font-bold text-brand-600 mb-1">
                  {stat.value}
                  <span className="text-brand-400">{stat.suffix}</span>
                </div>
                <p className="text-sm text-charcoal-500 leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY INTRO */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Cine suntem</p>
              <h2 className="heading-h2 text-charcoal-900 mb-6">De la Florea Pavaje la Petra Pavaje</h2>
              <div className="space-y-5 text-body-lg text-charcoal-600 leading-relaxed">
                <p>
                  Florea Pavaje, devenit mai târziu Petra Pavaje, este cel mai tânăr brand Florea Grup, lansat în
                  iunie 2017, cu producția prefabricatelor din beton — pavele, dale, rigole, borduri, bolțari,
                  elemente de zidărie — într-o gamă variată de mărimi, forme și nuanțe. Produsele sunt dedicate atât
                  pentru amenajarea reședințelor, cât și pentru proiecte industriale.
                </p>
                <p>
                  Prin Petra produsul prinde viață. Pavajele, bolțarii sau bordurile ne sunt alături mai mult decât
                  prin prezența fizică. Ele ne ajută să amenajăm spațiul așa cum am visat. Este piatra transformată
                  în ceva viu. Ne dorim ca oricine face cunoștință cu Petra Pavaje să fie inspirat să creeze grădini
                  sau alei unice, care transformă o casă în <strong className="text-charcoal-900">ACASĂ</strong>.
                  Aceasta este povestea Petra: drumul de la materie primă, la element de bucurie în viața de zi cu
                  zi.
                </p>
                <p>
                  Petra Pavaje are în portofoliu peste 800 de produse, împărțite în mai multe game: pavaje premium,
                  pavaje standard, borduri, rigole, bolțari și produse pentru grădină. Produsele premium trec
                  printr-o serie de prelucrări care le înnobilează — spălarea, splitarea și antichizarea sunt doar o
                  parte dintre aceste procese. Pentru a răspunde proiectelor de infrastructură, la fabrici există și
                  linii de producție pentru elemente de canalizare, tuburi de beton și alte prefabricate destinate
                  lucrărilor de infrastructură.
                </p>
              </div>
              <Link to="/florea-grup" className="link-premium inline-flex items-center gap-1.5 mt-6">
                Descoperă cei 30 de ani de istorie Florea Grup
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl overflow-hidden shadow-premium"
            >
              <img
                src={`${R2}/2017-Inaugurare-Florea-Pavaje-web.jpg`}
                alt="Inaugurare Florea Pavaje, 2017"
                className="w-full h-auto"
                width="1000"
                height="750"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP QUOTE 1 — DIRECTOR GENERAL */}
      <section className="relative bg-charcoal-950 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-noise" aria-hidden="true" />
        <div className="container-premium relative max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Quote className="w-10 h-10 md:w-12 md:h-12 text-brand-500 mb-6" aria-hidden="true" />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug text-balance mb-8">
              „Pentru a crea un produs de calitate este nevoie de trei ingrediente: materie primă de calitate,
              tehnologie de top și know-how în domeniu. Toate aceste trei aspecte au fost luate în considerare
              atunci când am lansat Florea Pavaje și avem încredere că vom putea oferi clienților produse cu un
              raport preț-calitate atractiv.”
            </blockquote>
            <footer className="flex items-center gap-4">
              <span className="w-12 h-0.5 bg-brand-500 shrink-0" aria-hidden="true" />
              <cite className="not-italic">
                <span className="block font-semibold text-white text-lg">Marcel Florea</span>
                <span className="block text-sm text-charcoal-400">Director General</span>
              </cite>
            </footer>
          </motion.div>
        </div>
      </section>

      {/* TECHNOLOGY / KNOW-HOW TRIAD */}
      <section className="section-padding bg-charcoal-50">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-2xl mb-12 md:mb-16">
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Know-how</p>
            <h2 className="heading-h2 text-charcoal-900 mb-4">
              Tehnologia modernă ne ajută să oferim produse deosebite
            </h2>
            <p className="text-body-lg text-charcoal-500">
              Materie primă de calitate, tehnologie de top și know-how în domeniu — cele trei ingrediente din
              spatele fiecărui produs Petra Pavaje.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {TECH_ITEMS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium p-8"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-brand-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-charcoal-900 mb-3">{item.title}</h3>
                <p className="text-charcoal-600 leading-relaxed text-sm">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NATIONAL EXPANSION */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl overflow-hidden shadow-premium lg:order-2"
            >
              <img
                src={`${R2}/2020-Extindere-la-nivel-national-printr-o-noua-unitate-de-productie-de-prefabricate-web.jpg`}
                alt="Extindere la nivel național — fabrica Petra Pavaje Ploiești"
                className="w-full h-auto"
                width="1000"
                height="730"
                loading="lazy"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:order-1">
              <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Extindere națională</p>
              <h2 className="heading-h2 text-charcoal-900 mb-6">Investim constant în capacitate și tehnologie</h2>
              <div className="space-y-5 text-body-lg text-charcoal-600 leading-relaxed">
                <p>
                  În toamna anului 2019, compania Florea Grup a demarat lucrările la fabrica din Ploiești —
                  Strejnicu. După ce în vara anului 2017 s-a lansat brandul Florea Pavaje, prin inaugurarea celei
                  mai moderne fabrici de prefabricate din Transilvania, compania albaiuliană și-a extins activitatea
                  și în zona de sud a țării, devenind un jucător important la nivel național.
                </p>
                <p>
                  Investiția în acest proiect depășește <strong className="text-charcoal-900">10 milioane Euro</strong>.
                  Capacitatea fabricii este de <strong className="text-charcoal-900">6.000 mp zilnic</strong> —
                  această investiție dublează producția companiei, care, împreună cu fabrica din Alba Iulia,
                  însumează o capacitate combinată de <strong className="text-charcoal-900">12.000 mp zilnic</strong>.
                  Tehnologia folosită este de ultimă generație, dezvoltată în colaborare cu producători de top din
                  Germania, iar fluxul tehnologic este integral automatizat pentru a asigura o calitate sporită a
                  produselor.
                </p>
                <p>
                  Unitatea de producție din Strejnicu are un Show Room de peste{' '}
                  <strong className="text-charcoal-900">5.500 mp</strong>, cel mai mare de acest gen din țară —
                  oferind soluții estetice și practice pentru amenajările exterioare, clienților fiindu-le mult mai
                  ușor să interacționeze vizual și tactil cu produsele.
                </p>
                <p>
                  Cererea de pe piață este tot mai mare, iar noile fabrici răspund atât cerințelor persoanelor
                  fizice, cât și ale dezvoltatorilor imobiliari și constructorilor de infrastructură rutieră. Toate
                  produsele au garanție 5 ani și sunt însoțite de certificări CE și ISO.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP QUOTE 2 — DIRECTOR GENERAL */}
      <section className="section-padding bg-brand-50/50 border-y border-brand-100">
        <div className="container-premium max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start"
          >
            <div className="w-14 h-14 rounded-full bg-brand-600 flex items-center justify-center shrink-0" aria-hidden="true">
              <Quote className="w-7 h-7 text-white" />
            </div>
            <div>
              <blockquote className="text-xl md:text-2xl font-medium text-charcoal-800 italic leading-relaxed mb-6">
                „În cei aproape 25 de ani de activitate, am învățat că dezvoltarea unei afaceri trebuie să fie
                treptată, iar deciziile trebuie să fie calculate. Extinderea la nivel național vine într-o etapă de
                maturitate a companiei, când suntem convinși că experiența și know-how-ul în domeniu ne pot asigura
                competitivitate în această industrie. Fabrica va servi ca un hub deschis de inovație, unde vom lucra
                strâns cu colaboratorii și clienții noștri pentru a găsi cele mai bune soluții pentru proiectele
                lor.”
              </blockquote>
              <footer>
                <cite className="not-italic">
                  <span className="block font-semibold text-charcoal-900">Marcel Florea</span>
                  <span className="block text-sm text-charcoal-500">Director General</span>
                </cite>
              </footer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MILESTONES / TIMELINE */}
      <section ref={milestonesRef} className="section-padding">
        <div className="container-premium max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12 md:mb-16">
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Istoric</p>
            <h2 className="heading-h2 text-charcoal-900 mb-4">30 de ani de dezvoltare treptată</h2>
            <p className="text-body-lg text-charcoal-500">
              De la o mică afacere antreprenorială la unul dintre cei mai importanți jucători din materialele de
              construcții din România.
            </p>
          </motion.div>

          <ol className="relative border-l-2 border-charcoal-100 pl-8 space-y-10">
            {MILESTONES.map((entry, index) => (
              <motion.li
                key={entry.year}
                initial={{ opacity: 0, x: -16 }}
                animate={milestonesVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="relative"
              >
                <span className="absolute -left-[calc(2rem+7px)] top-1 w-3.5 h-3.5 rounded-full bg-brand-600 ring-4 ring-white" aria-hidden="true" />
                <div className="text-2xl font-bold text-brand-600 mb-1">{entry.year}</div>
                <h3 className="text-lg font-semibold text-charcoal-900 mb-1.5">{entry.title}</h3>
                <p className="text-charcoal-600 leading-relaxed text-sm md:text-base">{entry.body}</p>
              </motion.li>
            ))}
          </ol>

          <Link to="/florea-grup" className="link-premium inline-flex items-center gap-1.5 mt-10">
            Vezi istoricul complet, an cu an
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FLOREA GRUP — DIVERSIFICATION */}
      <section className="section-padding bg-charcoal-50">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-2xl mb-12 md:mb-16">
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Florea Grup</p>
            <h2 className="heading-h2 text-charcoal-900 mb-4">O poveste despre oameni</h2>
            <div className="space-y-4 text-body-lg text-charcoal-600 leading-relaxed">
              <p>
                Florea Grup este o poveste despre antreprenoriat, despre curaj, despre perseverență… dar în primul
                rând, este o poveste despre oameni! Totul a început cu o echipă restrânsă, dar ambițioasă. Pornind
                de la o afacere mică în care s-a investit continuu, compania a ajuns astăzi una dintre cele mai mari
                din Transilvania.
              </p>
              <p>
                Echipa are acum peste 600 de membri: oameni implicați, harnici și ghidați de valori comune —
                respectul față de clienți și angajați, profesionalismul și responsabilitatea. Petra Pavaje
                completează astfel gama largă de produse și servicii pe care Florea Grup le oferă:
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {BUSINESS_CARDS.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="card-premium p-6 bg-white"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-brand-600" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-charcoal-900 mb-2">{card.title}</h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">{card.body}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="sm:col-span-2 rounded-xl border border-brand-100 bg-white p-6 md:p-8"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                <Hotel className="w-5 h-5 text-brand-600" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-charcoal-900 mb-3">Servicii turistice</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  Prima investiție în turism a fost în anul 2008. Complexul turistic Astoria include 30 de camere
                  clasificate la 3*, o sală de evenimente cu peste 350 de locuri și un restaurant cu preparate
                  tradiționale, dar și cu specialități din bucătăria internațională. La 10 ani de la deschidere,
                  Astoria inaugurează un proiect unic pentru județul Alba: Astoria Pool Park — un complex acvatic de
                  agrement.
                </p>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  În anul 2015, Florea Grup a redeschis Hotel Transilvania, premiat un an mai târziu ca unul dintre
                  cele mai bune hoteluri independente de 4* din România. Situat în centrul orașului Alba Iulia,
                  hotelul include 80 de camere, un restaurant cu specific internațional, o terasă sezonieră, un
                  English Bar și două săli pentru conferințe.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FUTURE INVESTMENTS */}
      <section className="section-padding">
        <div className="container-premium max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Investiții viitoare</p>
            <h2 className="heading-h2 text-charcoal-900 mb-6">Investițiile perioadei următoare</h2>
            <p className="text-body-lg text-charcoal-600 leading-relaxed mb-10">
              Investițiile perioadei următoare pentru Florea Grup se vor concentra pe dezvoltarea segmentului de
              prefabricate de beton. Fabricile Petra Pavaje funcționează ca huburi deschise de inovație în această
              industrie. Sprijiniți de partenerii noștri internaționali, căutăm mereu soluții pentru a răspunde cât
              mai bine cerințelor pieței — splitarea, antichizarea sau impermeabilizarea suprafețelor sunt doar
              câteva dintre îmbunătățirile aduse liniilor noastre de producție. Deținem la fiecare unitate de
              producție laboratoare proprii unde testăm constant materiile prime și produsele, pentru a le asigura
              o calitate sporită.
            </p>

            <p className="text-sm text-charcoal-500 pt-6 border-t border-charcoal-200">
              Mai multe informații despre compania Florea Grup puteți obține accesând{' '}
              <a
                href="https://www.floreagrup.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 font-semibold hover:underline inline-flex items-center gap-1"
              >
                www.floreagrup.ro
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              .
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
