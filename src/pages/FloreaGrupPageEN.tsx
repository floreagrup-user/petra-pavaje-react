import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

interface TimelineEntry {
  year: string
  title: string
  body: string
  image: string
  alt: string
}

const TIMELINE: TimelineEntry[] = [
  {
    year: '1996',
    title: 'Florea Grup is Founded',
    body: "The entrepreneurial spirit of the two brothers, Marcel and David, was a family trait. It was only a matter of time before it was their turn to start a small business — and that happened in 1996, in Alba Iulia. For two twenty-somethings, it seemed like an ambitious idea, but hard work and perseverance brought them where they are today.",
    image: `${R2}/1996-Infiintare-Florea-Grup-web.jpg`,
    alt: 'Florea Grup founded, 1996',
  },
  {
    year: '1997',
    title: 'First Florea Oil Fuel Station',
    body: "On the outskirts of Alba Iulia, in the town of Sântimbru, stood the location of the first Florea Oil fuel station. Today, the Florea Oil network numbers 10 fuel stations across Alba county — in Alba Iulia, Blaj, Ocna Mureș, Aiud, Câmpeni, Sântimbru, Mihalț, Zlatna and Șard. The stations are also present in rural areas, an important support for local agriculture and tourism.",
    image: `${R2}/1997-Prima-statie-de-carburanti-Florea-Oil-web.jpg`,
    alt: 'First Florea Oil fuel station, 1997',
  },
  {
    year: '1998',
    title: 'Revenue Reaches €1 Million',
    body: 'On an upward trend from the very start, Florea Grup reaches €1 million in revenue just two years after launch. Alongside fuel distribution, the company also runs construction projects — a field that would become its core business in the years to come.',
    image: `${R2}/1998-Cifra-de-afaceri-atinge-1-milion-Euro-web.jpg`,
    alt: 'Revenue reaches €1 million',
  },
  {
    year: '2003',
    title: 'Florea Taxi is Founded',
    body: '2003 marks a new stage in the company\'s growth, as it begins operating in passenger transport. Florea Taxi goes on to become one of the most innovative taxi companies in Alba Iulia, the first to launch a mobile app, and later adding hybrid vehicles to its fleet, which cut carbon emissions by up to 90% compared to a fossil-fuel car.',
    image: `${R2}/2003-Infiintare-Florea-Taxi-web.jpg`,
    alt: 'Florea Taxi founded, 2003',
  },
  {
    year: '2006',
    title: 'First Concrete Plant in Alba Iulia',
    body: 'The Alba Iulia concrete plant is part of a building materials production complex that supplies, alongside every standard grade of ready-mix concrete, screeds and mortars, asphalt mixtures and natural mineral aggregates — sorted, crushed and washed. The years that followed brought the opening of new plants in the neighboring counties of Cluj, Sibiu and Hunedoara.',
    image: `${R2}/2006-Prima-statie-de-betoane-in-Alba-Iulia-web.jpg`,
    alt: 'First concrete plant in Alba Iulia, 2006',
  },
  {
    year: '2008',
    title: 'Hotel Astoria Alba Iulia Opens',
    body: 'Style, refinement, luxury, elegance, prompt and discreet quality service — that is Hotel Astoria Alba Iulia in a few words. Set in a quiet area, the location became known for the generous green spaces surrounding the building, its peaceful terrace, and, not least, its restaurant and ballroom, which can host events for up to 350 people.',
    image: `${R2}/2008-Inaugurare-Hotel-Astoria-Alba-Iulia-web.jpg`,
    alt: 'Hotel Astoria Alba Iulia opens, 2008',
  },
  {
    year: '2011',
    title: 'Asphalt Plant Opens',
    body: 'Construction activity was backed by an investment in a modern plant for preparing and producing asphalt mixtures. The quality of these materials meets national and European standards, and they are used as raw materials both for the company\'s own projects and for third parties.',
    image: `${R2}/2011-Inaugurare-fabrica-de-asfalt-web.jpg`,
    alt: 'Asphalt plant opens, 2011',
  },
  {
    year: '2013',
    title: 'Company Reaches 500 Employees',
    body: 'As its business lines grew, so did the company\'s headcount. The 500-employee mark was reached in 2013. From cashiers and cleaning staff to directors and senior managers, everyone contributed to making Florea Grup what it is today.',
    image: `${R2}/2013-Compania-ajunge-la-500-angajati-web.jpg`,
    alt: 'Company reaches 500 employees, 2013',
  },
  {
    year: '2014',
    title: 'Almaș Stone Quarry',
    body: 'The stone quarry in the Apuseni Mountains secures full control over the production flow, starting with the raw-material extraction stage. This enables a controlled manufacturing process, delivering finished products of the highest quality.',
    image: `${R2}/2014-Cariera-de-piatra-Almas-web.jpg`,
    alt: 'Almaș stone quarry, 2014',
  },
  {
    year: '2015',
    title: 'Hotel Transilvania Reopens',
    body: 'After a two-year renovation, Hotel Transilvania reopened its doors as a luxury location in the center of Alba Iulia. Hotel Transilvania was recognized at the Top Hotel Awards Gala in 2016 and 2018 as one of the best independent 4-star hotels in Romania, and took first place at the eTravel Awards in 2017.',
    image: `${R2}/2015-Deschidere-Hotel-Transilvania-web.jpg`,
    alt: 'Hotel Transilvania reopens, 2015',
  },
  {
    year: '2017',
    title: 'Florea Pavaje Launches',
    body: 'On June 5, 2017, the company launches its concrete precast division under the Florea Pavaje name, following a €10 million investment. This made Florea Grup one of the few construction companies in Romania that manufactures its own key raw materials used in road building.',
    image: `${R2}/2017-Inaugurare-Florea-Pavaje-web.jpg`,
    alt: 'Florea Pavaje launches, 2017',
  },
  {
    year: '2018',
    title: 'Astoria Pool Park Opens',
    body: "Marking 10 years since Hotel Astoria's opening, the complex becomes even more attractive with the newest and most modern water park in Alba Iulia. The pool, covering 336 sqm, has heated water. The most anticipated surprise was the two water slides — a 20-meter speed slide and a 60-meter winding one.",
    image: `${R2}/2018-Deschidere-Astoria-Pool-Park-web.jpg`,
    alt: 'Astoria Pool Park opens, 2018',
  },
  {
    year: '2020',
    title: 'Nationwide Expansion via a New Precast Plant',
    body: 'The opening of the Petra Pavaje factory in Ploiești marked the company\'s nationwide expansion, with a Show Room of over 5,500 sqm, the largest of its kind in the country. The company also invested in a rebranding campaign, and products are now sold under the "Petra Pavaje" name.',
    image: `${R2}/2020-Extindere-la-nivel-national-printr-o-noua-unitate-de-productie-de-prefabricate-web.jpg`,
    alt: 'Nationwide expansion, 2020',
  },
  {
    year: '2021',
    title: 'Petra Pavaje Arad Opens',
    body: 'On September 23, 2021, the third Petra Pavaje factory was opened, located in the commune of Vladimirescu, Arad county, following an investment of over €10 million. The unit has a capacity of 6,000 sqm/day and produces pavers, curbs and garden elements, CE- and ISO-certified, providing 70 jobs.',
    image: `${R2}/petra-pavaje-arad-1.avif`,
    alt: 'Petra Pavaje Arad opens, 2021',
  },
  {
    year: '2022',
    title: 'Petra Pavaje Roman Opens',
    body: 'In 2022, the fourth Petra Pavaje concrete precast factory was opened in Roman, an investment of over €10 million that cemented Florea Grup\'s position as the fastest-expanding company in the building materials industry, bringing total investment to over €40 million.',
    image: `${R2}/fabrica-neamt-petra-pavaje.avif`,
    alt: 'Petra Pavaje Roman factory, Neamț, 2022',
  },
]

export function FloreaGrupPageEN() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05 })

  useEffect(() => {
    const url = `${window.location.origin}/en/florea-grup`
    const title = `Florea Grup - 30 Years | ${SEO_SITE_NAME}`
    const description =
      "Florea Grup celebrates 30 years. Discover the company's story, the key milestones in its history, and the plans for the future."

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/florea-grup', '/en/florea-grup')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${R2}/timeline-petra.avif`)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('itemlist-schema', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: TIMELINE.map((t, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${t.year} — ${t.title}`,
      })),
    })

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/en` },
        { '@type': 'ListItem', position: 2, name: 'Company', item: `${window.location.origin}/en/compania` },
        { '@type': 'ListItem', position: 3, name: 'Florea Grup – 30 Years', item: url },
      ],
    })

    return resetSEO
  }, [])

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="container-premium relative grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6 flex-wrap">
              <Link to="/en" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/en/compania" className="hover:text-white transition-colors">Company</Link>
              <span>/</span>
              <span className="text-white">Florea Grup – 30 Years</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Anniversary</p>
            <h1 className="heading-h1 mb-2">Florea Grup</h1>
            <p className="text-brand-500 text-2xl font-bold tracking-wide">30 Years</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden"
          >
            <img
              src={`${R2}/timeline-petra.avif`}
              alt="Florea Grup, 30 years"
              className="w-full h-auto"
              width="850"
              height="1196"
              loading="eager"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-body-lg text-charcoal-600 leading-relaxed mb-8">
              This year, Florea Grup, under whose umbrella the Petra Pavaje brand operates, celebrates 30 years.
              Three decades since the foundations were laid for a business that has grown into one of the most
              important companies in Romania today.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">
              Growth Built on Vertical Integration and Innovation
            </h2>
            <div className="space-y-5 text-body-lg text-charcoal-600 leading-relaxed mb-10">
              <p>
                Florea Grup's story began with the opening of its first fuel station. From there, the company
                gradually expanded into construction. In 2005 it entered concrete production, and later became a
                contractor for civil and industrial construction. Over the years, Florea Grup has been involved in
                rehabilitating national and county roads, as well as developing large-scale projects: motorways,
                industrial platforms, and shopping centers.
              </p>
              <p>
                Today, under the Florea Grup umbrella, the <em>Petra Pavaje</em> brand also operates, specializing
                in the production of pavers and concrete precast elements, with four factories strategically located
                nationwide — in Alba Iulia, Ploiești, Arad and Roman (Neamț county), plus warehouses in Cluj Napoca,
                Sibiu and Deva. This growth has been recognized as the fastest expansion by a company in the
                building materials industry, with Florea Grup quickly becoming one of the most important producers
                in the market.
              </p>
              <p>
                The vertical integration strategy the company has adopted means investing across the entire
                production chain: from its own quarry that secures raw-material extraction, to sorting stations and
                the four concrete precast production lines. On top of that, Florea Grup provides the associated
                logistics services through its own fleet of commercial vehicles.
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">Tourism and Integrated Services</h2>
            <div className="space-y-5 text-body-lg text-charcoal-600 leading-relaxed mb-10">
              <p>
                Alongside its industrial and construction activities, Florea Grup has also built a portfolio in the
                hospitality sector, owning Hotel Transilvania, Hotel Astoria and Hotel Cetate in Alba Iulia. Beyond
                accommodation, these hotels offer complementary facilities for tourists, providing a complete
                service package: restaurants, terraces, conference rooms, and a leisure center with sports courts
                and a water park.
              </p>
              <p>
                The hotels in Florea Grup's portfolio have been the first choice for many tourists, while also
                serving as a benchmark for quality and hospitality, earning prestigious awards at competitions such
                as the "Top Hotel Awards" or "eTravel Awards".
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">Florea Grup for the Community</h2>
            <div className="space-y-5 text-body-lg text-charcoal-600 leading-relaxed mb-10">
              <p>
                For over three decades, the company has supported social and environmental responsibility
                initiatives. Florea Grup owns one of the largest fully-electric vehicle fleets in Romania, electric
                charging stations, and 7 of its own solar parks that supply up to 45% of the energy autonomy of
                those production sites. "In harmony with nature" is a registered trademark of the company, and a
                landmark project was the campaign to plant 42,000 saplings across 9 hectares in Alba county.
              </p>
              <p>
                Community involvement, however, means more than reducing our carbon footprint. Florea Grup is an
                important internship partner for high school and university institutions, offering work placements
                and interactive workshops. What's more, the company supports sports activities, organizing or
                sponsoring cycling, running, tennis and volleyball competitions.
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">A Company About People</h2>
            <p className="text-body-lg text-charcoal-600 leading-relaxed mb-6">
              Florea Grup and the companies within its group mean over 800 jobs, fair partnerships, and fair working
              conditions.
            </p>

            <blockquote className="border-l-4 border-brand-600 pl-6 py-2 mb-4 text-body-lg text-charcoal-700 italic leading-relaxed">
              "These 30 years are, for us, the confirmation of a bold vision and the sustained work of an
              extraordinary team. Florea Grup is a story written by every employee, through the knowledge, ideas
              and dedication they brought. We look to the future with optimism and continue to uphold the values
              that define us: innovation, quality, and responsibility toward our customers, partners and community."
            </blockquote>
            <p className="text-sm font-semibold text-charcoal-500">– Marcel Florea, CEO Florea Grup</p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="py-16 md:py-24 bg-charcoal-50">
        <div className="container-premium max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">History</p>
            <h2 className="heading-h2 text-charcoal-900 mb-4">Key Milestones in the Company's History</h2>
            <p className="text-body-lg text-charcoal-500 max-w-2xl mx-auto">
              These 30 years have gathered many moments worth mentioning. Some had an economic impact, others were
              events that strengthened the team or consolidated our working processes. The most important ones are
              summarized below.
            </p>
          </motion.div>

          <div className="space-y-12 md:space-y-16">
            {TIMELINE.map((entry, index) => {
              const reverse = index % 2 === 1
              return (
                <motion.div
                  key={entry.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.06 }}
                  className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
                >
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={entry.image}
                      alt={entry.alt}
                      className="w-full h-auto object-cover"
                      loading={index < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-brand-600 mb-2">{entry.year}</div>
                    <h3 className="text-xl font-semibold text-charcoal-900 mb-3">{entry.title}</h3>
                    <p className="text-charcoal-600 leading-relaxed">{entry.body}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-6">Plans for the Future</h2>
            <div className="space-y-5 text-body-lg text-charcoal-600 leading-relaxed mb-8">
              <p>
                The company's growth has been organic, with each stage building on an already-consolidated
                business. Even though development plans have been closely analyzed, unexpected factors have often
                come into play. Growth decisions have been both prudent and bold at the same time.
              </p>
              <p>
                Company stability has always been an important factor when making a new investment. But perhaps
                even more important has been know-how — that is, industry expertise — an undeniable competitive
                advantage, given the 30 years of experience Florea Grup has gained. Yet the most important factor
                driving growth is the team behind a brand: the passion people put into their work, and the synergy
                created among its members.
              </p>
              <p>
                All of this creates the conditions for sustainable growth, which Florea Grup has set as its goal
                for the coming years. Construction will remain the main direction of development, both through
                infrastructure works and through the concrete precast division — with the goal of strengthening the
                company's position as a national player in the construction market.
              </p>
              <p>
                Upcoming investments will focus on growing the concrete precast segment. The Petra Pavaje factories
                operate as open innovation hubs in this industry. Splitting, antiquing, and surface waterproofing
                are just a few of the improvements brought to our production lines. Every production unit has its
                own laboratory, where we constantly test raw materials and products to ensure higher quality.
              </p>
            </div>

            <blockquote className="border-l-4 border-brand-600 pl-6 py-2 text-body-lg text-charcoal-700 italic leading-relaxed">
              Florea Grup thanks all the employees, customers and partners who have stood alongside us over this
              quarter-century, for giving us the opportunity to prove that great projects can be built together!
              May the years ahead bring an even more prosperous collaboration!
            </blockquote>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
