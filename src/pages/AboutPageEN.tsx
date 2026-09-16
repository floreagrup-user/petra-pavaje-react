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
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

const STATS = [
  { value: '30', suffix: '', label: 'years of Florea Grup entrepreneurship' },
  { value: '4', suffix: '', label: 'factories nationwide' },
  { value: '24,000', suffix: '', label: 'sqm of daily production' },
  { value: '800', suffix: '+', label: 'Petra Pavaje products in the range' },
]

const TECH_ITEMS = [
  {
    icon: Layers,
    title: 'Splitting',
    body: 'The newest installation on the Petra Pavaje production line. Once a concrete unit has dried, at least a week after casting, it undergoes controlled splitting by applying pressure. The resulting products are well compacted, highly durable, and carry one or more faces with a distinctive texture. The concrete block keeps its regular shape, making it easy to install. Step elements, palisades, and wall blocks are just a few of the products made with this technique.',
  },
  {
    icon: History,
    title: 'Antiquing',
    body: 'Through the antiquing process, products take on the look of natural stone, with a weathered texture and coloring that closely mimics the tones found in a stone quarry. This surface-aging process does not affect the strength of the product. The resulting pavers resemble cobblestone, in 10 or 20 cm lengths — combining the beauty and natural character of stone with the strength of vibro-pressed concrete.',
  },
  {
    icon: Droplets,
    title: 'Surface Impregnation',
    body: "The colored surface of the pavers is achieved by impregnating the top layer with special substances that ensure vivid, long-lasting colors. The process is the combined result of our production engineers and our R&D lab team, replicating the uneven coloring found in natural stone.",
  },
]

const BUSINESS_CARDS = [
  {
    icon: Building2,
    title: 'Building Materials',
    body: "Florea Grup's core activity remains the extraction and processing of mineral aggregates, the production of asphalt mixtures and, more recently, concrete precast manufacturing. The company operates 5 concrete plants, in Cluj-Napoca, Sibiu, Deva, and two in Alba Iulia. Owning the full production and testing chain lets us supply building materials at consistently high quality and a competitive price.",
  },
  {
    icon: HardHat,
    title: 'Construction Works',
    body: 'Florea Grup is a partner on some of the largest infrastructure projects in Transylvania: the Sebeș-Turda motorway, the Coșlariu–Vințu de Jos railway line, the DN1 national road, and the Turdaș tunnel. Civil and industrial construction is also part of the portfolio: residential blocks in Alba, Sibiu, Deva and Cluj, industrial halls, tourism projects, and the Bosch Blaj and Daimler Sebeș industrial platforms.',
  },
  {
    icon: Fuel,
    title: 'Fuel Distribution',
    body: "From the fuel station that marked Florea Grup's first step into entrepreneurship, the company now runs 10 fuel stations across Alba county: Alba Iulia, Șard, Zlatna, Câmpeni, Sântimbru, Aiud, Ocna Mureș, Mihalț, Blaj.",
  },
  {
    icon: Car,
    title: 'Taxi Services',
    body: "Florea Taxi's fleet currently numbers 25 of its own vehicles, providing passenger transport in Alba Iulia as well as airport transfers and long-distance trips, through the Florea Taxi app on iOS and Android.",
  },
]

interface Milestone {
  year: string
  title: string
  body: string
}

const MILESTONES: Milestone[] = [
  { year: '1996', title: 'Florea Grup is Founded', body: 'Marcel and David Florea lay the company\'s foundations in Alba Iulia, with 100% Romanian capital.' },
  { year: '2006', title: 'First Concrete Plant', body: "The company's first ready-mix concrete plant opens in Alba Iulia." },
  { year: '2014', title: 'Almaș Stone Quarry', body: 'Full control over the production chain, starting from raw material extraction.' },
  { year: '2017', title: 'Florea Pavaje Launches', body: 'Launch of the concrete precast division — the most modern factory in Transylvania.' },
  { year: '2020', title: 'Expansion to Ploiești', body: 'Second precast factory, doubled production capacity, rebranding to Petra Pavaje.' },
  { year: '2021', title: 'Petra Pavaje Arad Opens', body: 'Third concrete precast factory, in Vladimirescu commune, Arad county.' },
  { year: '2022', title: 'Petra Pavaje Roman Opens', body: 'Fourth factory — the fastest expansion in the building materials industry.' },
]

export function AboutPageEN() {
  const { ref: milestonesRef, isIntersecting: milestonesVisible } = useIntersectionObserver({ threshold: 0.05 })

  useEffect(() => {
    const url = `${window.location.origin}/en/despre-noi`
    const title = `About Us - Florea Grup, 30 Years | ${SEO_SITE_NAME}`
    const description =
      'Petra Pavaje is part of Florea Grup, a Romanian entrepreneurial company founded 30 years ago. Discover the story, the technology, and the nationwide expansion.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/despre-noi', '/en/despre-noi')
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/en` },
        { '@type': 'ListItem', position: 2, name: 'About Us', item: url },
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
              <Link to="/en" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">About Us</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-4">About Us</p>
            <h1 className="heading-display mb-4 max-w-3xl">Florea Grup</h1>
            <p className="text-brand-500 text-xl md:text-2xl font-semibold tracking-wide mb-6">30 years of Romanian entrepreneurship</p>
            <p className="text-body-lg text-charcoal-300 max-w-2xl">
              Petra Pavaje is the concrete precast brand of Florea Grup — a company with 100% Romanian capital,
              built on quality raw materials, top technology, and industry know-how.
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
              <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Who We Are</p>
              <h2 className="heading-h2 text-charcoal-900 mb-6">From Florea Pavaje to Petra Pavaje</h2>
              <div className="space-y-5 text-body-lg text-charcoal-600 leading-relaxed">
                <p>
                  Florea Pavaje, later renamed Petra Pavaje, is Florea Grup's youngest brand, launched in June 2017
                  with the production of concrete precast elements — pavers, slabs, channels, curbs, blocks, wall
                  units — in a wide range of sizes, shapes, and shades. The products serve both residential
                  landscaping and industrial projects.
                </p>
                <p>
                  Through Petra, the product comes to life. Our pavers, blocks and curbs stay with people beyond
                  their physical presence. They help us shape a space the way we imagined it. It's stone
                  transformed into something alive. We want anyone who discovers Petra Pavaje to feel inspired to
                  create gardens or pathways as unique as the ones that turn a house into a{' '}
                  <strong className="text-charcoal-900">HOME</strong>. That's the Petra story: the journey from raw
                  material to a source of everyday joy.
                </p>
                <p>
                  Petra Pavaje's range now numbers over 800 products, spread across several lines: premium pavers,
                  standard pavers, curbs, drainage channels, blocks, and garden products. Premium products go
                  through a series of treatments that elevate them — washing, splitting and antiquing are just a
                  few of these processes. To serve infrastructure projects, our factories also run production lines
                  for drainage elements, concrete pipes, and other precast units used in infrastructure works.
                </p>
              </div>
              <Link to="/en/florea-grup" className="link-premium inline-flex items-center gap-1.5 mt-6">
                Discover the 30-year Florea Grup story
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
                alt="Florea Pavaje launch, 2017"
                className="w-full h-auto"
                width="1000"
                height="750"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP QUOTE 1 — CEO */}
      <section className="relative bg-charcoal-950 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-noise" aria-hidden="true" />
        <div className="container-premium relative max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Quote className="w-10 h-10 md:w-12 md:h-12 text-brand-500 mb-6" aria-hidden="true" />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug text-balance mb-8">
              "Creating a quality product takes three ingredients: quality raw materials, top technology, and
              industry know-how. We took all three into account when we launched Florea Pavaje, and we're confident
              we can offer our customers products with an attractive price-to-quality ratio."
            </blockquote>
            <footer className="flex items-center gap-4">
              <span className="w-12 h-0.5 bg-brand-500 shrink-0" aria-hidden="true" />
              <cite className="not-italic">
                <span className="block font-semibold text-white text-lg">Marcel Florea</span>
                <span className="block text-sm text-charcoal-400">CEO Florea Grup</span>
              </cite>
            </footer>
          </motion.div>
        </div>
      </section>

      {/* TECHNOLOGY / KNOW-HOW TRIAD */}
      <section className="section-padding bg-charcoal-50">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-2xl mb-12 md:mb-16">
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Know-How</p>
            <h2 className="heading-h2 text-charcoal-900 mb-4">
              Modern technology helps us deliver outstanding products
            </h2>
            <p className="text-body-lg text-charcoal-500">
              Quality raw materials, top technology, and industry know-how — the three ingredients behind every
              Petra Pavaje product.
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
                alt="Nationwide expansion — the Petra Pavaje Ploiești factory"
                className="w-full h-auto"
                width="1000"
                height="730"
                loading="lazy"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:order-1">
              <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Nationwide Expansion</p>
              <h2 className="heading-h2 text-charcoal-900 mb-6">We invest constantly in capacity and technology</h2>
              <div className="space-y-5 text-body-lg text-charcoal-600 leading-relaxed">
                <p>
                  In the autumn of 2019, Florea Grup began work on the factory in Ploiești — Strejnicu. After the
                  Florea Pavaje brand launched in the summer of 2017 with the inauguration of the most modern
                  precast factory in Transylvania, the Alba Iulia-based company expanded its activity into the
                  south of the country, becoming a major national player.
                </p>
                <p>
                  Investment in this project exceeds <strong className="text-charcoal-900">10 million euros</strong>.
                  The factory has a capacity of <strong className="text-charcoal-900">6,000 sqm per day</strong> —
                  this investment doubles the company's output, which, together with the Alba Iulia factory, adds
                  up to a combined capacity of <strong className="text-charcoal-900">12,000 sqm daily</strong>. The
                  technology used is state-of-the-art, developed in partnership with leading manufacturers from
                  Germany, and the production flow is fully automated to ensure higher product quality.
                </p>
                <p>
                  The Strejnicu production unit has a Show Room of over{' '}
                  <strong className="text-charcoal-900">5,500 sqm</strong>, the largest of its kind in the country —
                  offering aesthetic and practical solutions for outdoor landscaping, making it far easier for
                  customers to interact visually and physically with the products.
                </p>
                <p>
                  Market demand keeps growing, and the new factories serve both individual homeowners and real
                  estate developers and road infrastructure contractors. All products come with a 5-year warranty
                  and CE and ISO certifications.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP QUOTE 2 — CEO */}
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
                "In our nearly 25 years of activity, we've learned that growing a business has to be gradual, and
                decisions have to be carefully calculated. Expanding nationally comes at a stage of maturity for
                the company, when we're confident that our experience and industry know-how can secure our
                competitiveness in this industry. The factory will serve as an open innovation hub, where we'll
                work closely with our partners and customers to find the best solutions for their projects."
              </blockquote>
              <footer>
                <cite className="not-italic">
                  <span className="block font-semibold text-charcoal-900">Marcel Florea</span>
                  <span className="block text-sm text-charcoal-500">CEO Florea Grup</span>
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
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">History</p>
            <h2 className="heading-h2 text-charcoal-900 mb-4">30 years of gradual growth</h2>
            <p className="text-body-lg text-charcoal-500">
              From a small entrepreneurial venture to one of the most important players in Romania's building
              materials industry.
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

          <Link to="/en/florea-grup" className="link-premium inline-flex items-center gap-1.5 mt-10">
            See the full year-by-year history
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FLOREA GRUP — DIVERSIFICATION */}
      <section className="section-padding bg-charcoal-50">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-2xl mb-12 md:mb-16">
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Florea Grup</p>
            <h2 className="heading-h2 text-charcoal-900 mb-4">A story about people</h2>
            <div className="space-y-4 text-body-lg text-charcoal-600 leading-relaxed">
              <p>
                Florea Grup is a story about entrepreneurship, about courage, about perseverance… but above all,
                it's a story about people! It all began with a small but ambitious team. Starting from a small
                business that was continuously invested in, the company has grown into one of the largest in
                Transylvania today.
              </p>
              <p>
                The team now numbers over 600 people: dedicated, hard-working people guided by shared values —
                respect for customers and employees, professionalism, and responsibility. Petra Pavaje rounds out
                the wide range of products and services Florea Grup offers:
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
              <h3 className="font-semibold text-charcoal-900 mb-3">Tourism Services</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  Our first investment in tourism came in 2008. The Astoria tourist complex includes 30 rooms rated
                  3-star, an event hall with over 350 seats, and a restaurant serving traditional dishes alongside
                  international specialties. Ten years after opening, Astoria unveiled a project unique to Alba
                  county: Astoria Pool Park — a water recreation complex.
                </p>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  In 2015, Florea Grup reopened Hotel Transilvania, awarded a year later as one of the best
                  independent 4-star hotels in Romania. Located in the center of Alba Iulia, the hotel includes 80
                  rooms, an internationally-themed restaurant, a seasonal terrace, an English Bar, and two
                  conference rooms.
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
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Upcoming Investments</p>
            <h2 className="heading-h2 text-charcoal-900 mb-6">Investments for the Period Ahead</h2>
            <p className="text-body-lg text-charcoal-600 leading-relaxed mb-10">
              Florea Grup's upcoming investments will focus on growing the concrete precast segment. The Petra
              Pavaje factories operate as open innovation hubs in this industry. Backed by our international
              partners, we're constantly looking for ways to better meet market demands — splitting, antiquing, and
              surface waterproofing are just a few of the improvements brought to our production lines. Every
              production unit has its own laboratory, where we constantly test raw materials and finished products
              to ensure higher quality.
            </p>

            <p className="text-sm text-charcoal-500 pt-6 border-t border-charcoal-200">
              For more information about Florea Grup, visit{' '}
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
