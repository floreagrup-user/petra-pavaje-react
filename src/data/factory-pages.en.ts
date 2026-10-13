// English versions of the factory pages. A faithful translation of the
// Romanian content in factory-pages.ts (itself taken from the company's
// factory description document) -- no fact here may differ from or go beyond
// the Romanian text. Images, schema addresses and ids are reused from the RO
// entries so the two languages can never drift apart on those.
import { FACTORY_PAGES, type FactoryPageData } from './factory-pages'

export const FLOREA_GRUP_ABOUT_EN =
  'Petra Pavaje is a brand of Florea Grup, a company founded in Alba Iulia in 1996 with fully Romanian capital. Besides precast concrete production, the group operates in construction, ready-mix concrete, asphalt mixes, fuel retail and the hotel industry. 5 June, celebrated as World Environment Day, is also Petra Pavaje\'s anniversary.'

const ro = (slug: string) => {
  const page = FACTORY_PAGES.find((p) => p.slug === slug)
  if (!page) throw new Error(`Missing RO factory page: ${slug}`)
  return page
}

const withAlts = (page: FactoryPageData, alts: string[]) =>
  page.images.map((img, i) => ({ ...img, alt: alts[i] ?? img.alt }))

const PREMIUM = { label: 'Premium Pavers', href: '/en/pavaje-premium' }
const STANDARD = { label: 'Standard Pavers', href: '/en/pavaje-standard' }
// Curbs, drains and the rest of the range have no English pages yet, so
// these link to the Romanian category pages.
const CURBS = { label: 'Curbs', href: '/borduri' }
const DRAINS = { label: 'Drainage channels', href: '/rigole' }
const SEWER = { label: 'Sewer elements', href: '/elemente-de-canalizare' }

export const FACTORY_PAGES_EN: FactoryPageData[] = [
  {
    ...ro('alba'),
    name: 'Petra Pavaje Alba Iulia Factory',
    place: 'Alba Iulia, Alba County',
    metaTitle: 'Paver Factory in Alba Iulia - Petra Pavaje | Exhibition Garden',
    metaDescription:
      'The Petra Pavaje factory in Alba Iulia, Romania: 6,000 sqm of pavers a day, over 800 products and an exhibition garden of over 5,500 sqm. Address, hours and contact.',
    lead:
      'The Petra Pavaje factory in Alba Iulia is located at the Florea Grup production base, on the city\'s ring road. It is part of an integrated building-materials production process spread over 20 hectares, at one of the most modern production bases in Romania.',
    facts: [
      { label: 'Production capacity', value: '6,000 sqm/day' },
      { label: 'Products', value: '800+' },
      { label: 'Exhibition garden', value: '5,500+ sqm' },
      { label: 'Jobs', value: '100+' },
    ],
    sections: [
      {
        heading: 'Production and technology',
        paragraphs: [
          'The Alba Iulia factory has a production capacity of 6,000 sqm a day and offers a diverse portfolio of products for outdoor landscaping and construction projects.',
          'The range includes premium and standard slabs and pavers, drainage channels, curbs, concrete blocks, fence elements, sewer elements and road infrastructure products. With over 800 products in a variety of shapes and colours, Petra Pavaje serves customers such as contractors, installers, builders\' merchants and specialist shops, with solutions adapted to diverse requirements.',
          'By developing this production capacity at the Petra Pavaje factory, Florea Grup set out to become one of the major players on the paver market, while also building on the tradition of this industry in Alba County.',
        ],
      },
      {
        heading: 'Exhibition garden',
        paragraphs: [
          'The Alba Iulia factory has an exhibition garden of over 5,500 sqm. It shows Petra Pavaje products in finished outdoor layouts and lets visitors discover a wide range of pavers and solutions for their own projects.',
        ],
      },
      {
        heading: 'Logistics and integrated operations',
        paragraphs: [
          'The Alba Iulia factory complements the building-materials production of Florea Grup, which the Petra Pavaje brand is part of. Logistics services and a modern vehicle fleet ensure safe and fast transport of products to partners and to their building sites.',
        ],
      },
      {
        heading: 'Green energy and environmental protection',
        paragraphs: [
          'The industrial platform is powered by its own photovoltaic park, which can cover roughly 40–50% of its energy needs. The photovoltaic park helps protect the environment and reduce CO₂ emissions.',
          'The company also supports the transition to electric mobility, with a fleet of more than 60 electric vehicles in daily operation and its own network of fast-charging stations at its strategic locations. The modern technology used in production contributes to the energy efficiency of the machinery and to a lower environmental impact.',
        ],
      },
      {
        heading: 'Contribution to the local community',
        paragraphs: [
          'The factory supports local economic and community development. It provides more than 100 jobs, supporting employment in Alba County.',
        ],
      },
    ],
    images: withAlts(ro('alba'), [
      'Aerial view of the Florea Grup production base in Alba Iulia, with the Petra Pavaje factory and the product yard',
    ]),
    products: [
      PREMIUM,
      STANDARD,
      CURBS,
      DRAINS,
      { label: 'Concrete blocks', href: '/boltari' },
      { label: 'Fences', href: '/garduri' },
      SEWER,
      { label: 'Road infrastructure', href: '/elemente-de-canalizare/infrastructura-rutiera' },
    ],
    blogSlugs: [],
  },
  {
    ...ro('arad'),
    name: 'Petra Pavaje Arad Factory',
    place: 'Vladimirescu, Arad County',
    metaTitle: 'Paver Factory in Arad (Vladimirescu) - Petra Pavaje',
    metaDescription:
      'The Petra Pavaje factory in Vladimirescu, Arad: 6,000 sqm of pavers a day, over 800 products, permanent stock and an exhibition garden. Address, hours and contact.',
    lead:
      'Commissioned on 23 September 2021, the third Petra Pavaje factory is located in the west of Romania, in Vladimirescu, Arad County. It stands out for its modern technology and fully automated production flow, making it one of the most efficient and modern precast concrete factories in western Romania.',
    facts: [
      { label: 'In operation since', value: '23 September 2021' },
      { label: 'Production capacity', value: '6,000 sqm/day' },
      { label: 'Products', value: '800+' },
      { label: 'Jobs', value: '50+' },
    ],
    sections: [
      {
        heading: 'Production and technology',
        paragraphs: [
          'The Petra Pavaje Arad factory has a production capacity of 6,000 sqm a day and provides more than 50 jobs. Its state-of-the-art technology was developed together with leading German manufacturers. The fully automated production flow makes manufacturing more efficient and helps deliver quality products.',
          'Over 800 products are made here, including premium slabs and pavers, standard pavers, curbs, drainage channels and other vibro-pressed concrete products. The variety of the range makes it easy to find the right solution for different types of outdoor projects.',
        ],
      },
      {
        heading: 'Logistics and delivery',
        paragraphs: [
          'One of the strengths of the Arad factory is its logistics capacity. Its large warehouse makes it possible to keep goods permanently in stock.',
          'Being close to customers matters for building materials, whose weight drives transport costs. Commercial offers vary with delivery distance, and being close to the areas served helps keep prices competitive. A modern fleet specialised in transporting building materials also allows fast and safe delivery.',
        ],
      },
      {
        heading: 'Exhibition garden',
        paragraphs: [
          'The factory has a large exhibition garden with a generous variety of products on display and green spaces. Visitors can discover different solutions for outdoor landscaping and see the products in a finished setting.',
        ],
      },
      {
        heading: 'Green energy and environmental protection',
        paragraphs: [
          'The Arad factory is designed to have a minimal impact on the environment. Its modern technology gives the machinery high energy efficiency, supporting a responsible use of resources in production.',
        ],
      },
    ],
    images: withAlts(ro('arad'), [
      'Aerial view of the Petra Pavaje factory in Vladimirescu, Arad, with the production halls and the paver yard',
      'The Petra Pavaje Arad factory team in the production hall at the factory\'s commissioning',
    ]),
    products: [PREMIUM, STANDARD, CURBS, DRAINS],
    blogSlugs: [],
  },
  {
    ...ro('prahova'),
    name: 'Petra Pavaje Prahova Factory',
    place: 'Strejnicu, Prahova County',
    metaTitle: 'Paver Factory in Prahova (Strejnicu) - Petra Pavaje | Outdoor Showroom',
    metaDescription:
      'The Petra Pavaje factory in Strejnicu, Prahova: 6,000 sqm of pavers a day, over 800 products and an outdoor showroom of over 5,500 sqm. Address, hours and contact.',
    lead:
      'Opened in 2020, the Petra Pavaje factory in Strejnicu, Prahova County, marked an important stage in the growth of Florea Grup. With the expansion to a national scale, the Florea Pavaje brand went through a rebranding and became Petra Pavaje, as it is known today.',
    facts: [
      { label: 'Opened in', value: '2020' },
      { label: 'Production capacity', value: '6,000 sqm/day' },
      { label: 'Outdoor showroom', value: '5,500+ sqm' },
      { label: 'Jobs', value: '60+' },
    ],
    sections: [
      {
        heading: 'The factory in southern Romania',
        paragraphs: [
          'The factory\'s location supports the company\'s growth in southern Romania, an area with demand for Premium products and continuously developing infrastructure, giving customers access to products suited to their needs.',
        ],
      },
      {
        heading: 'Production and technology',
        paragraphs: [
          'The Petra Pavaje factory in Prahova has a production capacity of 6,000 sqm a day and provides more than 60 jobs. The production flow is fully automated, and its state-of-the-art technology was developed together with leading German manufacturers. These solutions make manufacturing more efficient and help deliver quality products.',
          'Over 800 products are made here, including premium slabs and pavers, standard pavers, curbs, drainage channels, sewer elements and other vibro-pressed concrete products. The variety of the range makes it easy to find the right solution for different types of outdoor projects.',
        ],
      },
      {
        heading: 'The outdoor showroom',
        paragraphs: [
          'One of the highlights of the Strejnicu factory is its outdoor showroom of over 5,500 sqm, the largest of its kind in the country. It presents attractive and practical outdoor landscaping solutions and lets customers see and touch the products before making a purchase decision.',
        ],
      },
      {
        heading: 'Logistics and delivery',
        paragraphs: [
          'The large warehouse makes it possible to keep goods permanently in stock, which matters because for building materials the distance to the customer affects the commercial offer. The factory benefits from logistics services and a modern fleet specialised in the safe and fast transport of building materials.',
        ],
      },
      {
        heading: 'Green energy and environmental protection',
        paragraphs: [
          'The Prahova factory aims to reduce its environmental impact through modern technology that gives the machinery high energy efficiency. These measures reflect the company\'s commitment to the responsible use of resources and to more efficient production.',
        ],
      },
    ],
    images: withAlts(ro('prahova'), [
      'Aerial view of the Petra Pavaje factory in Strejnicu, Prahova, with the paver and slab yard',
      'The Petra Pavaje Prahova factory team in the production hall at the factory\'s opening',
    ]),
    products: [PREMIUM, STANDARD, CURBS, DRAINS, SEWER],
    blogSlugs: [],
  },
  {
    ...ro('neamt'),
    name: 'Petra Pavaje Roman Factory',
    place: 'Roman, Neamț County',
    metaTitle: 'Paver Factory in Roman, Neamț - Petra Pavaje | Exhibition Garden',
    metaDescription:
      'The Petra Pavaje factory near Roman, Neamț: 6,000 sqm of pavers a day, over 800 products, its own delivery fleet and an exhibition garden. Address and contact.',
    lead:
      'The fourth Petra Pavaje factory was commissioned on 20 July 2022 near the city of Roman, Neamț County. It is one of the most modern and efficient precast concrete factories in eastern Romania, developed together with leading European manufacturers. The total investment exceeds 10 million euros, and the Florea Grup Roman industrial platform covers 80,000 sqm.',
    facts: [
      { label: 'In operation since', value: '20 July 2022' },
      { label: 'Production capacity', value: '6,000 sqm/day' },
      { label: 'Industrial platform', value: '80,000 sqm' },
      { label: 'Jobs', value: '80+' },
    ],
    sections: [
      {
        heading: 'Production and technology',
        paragraphs: [
          'The Roman factory has a production capacity of 6,000 sqm a day and provides more than 80 jobs. The production flow is fully automated and uses industrial robots, making manufacturing more efficient and helping deliver quality products.',
          'Over 800 products are made here, including premium slabs and pavers, standard pavers, curbs, drainage channels and other vibro-pressed concrete products. The diversity of the range meets a wide variety of needs for outdoor landscaping and construction projects.',
        ],
      },
      {
        heading: 'Logistics and delivery',
        paragraphs: [
          'The Roman factory has its own fleet of utility vehicles, so products can be delivered to any area near the factory in good conditions. By combining production with transport services, the company aims to keep products available and deliver them to customers on time.',
        ],
      },
      {
        heading: 'Exhibition garden',
        paragraphs: [
          'The Petra Pavaje factory in Roman also has an exhibition garden with generous green spaces, designed as a source of inspiration for partners and as a place to relax for employees. It complements the industrial space and reflects the Petra Pavaje philosophy, expressed in the motto "În armonie cu natura" ("In harmony with nature").',
        ],
      },
      {
        heading: 'Green energy and environmental protection',
        paragraphs: [
          'The industrial platform is powered by its own photovoltaic park, which reduces CO₂ emissions by 148 tonnes a year. The machinery is highly energy-efficient, and the measures in place reflect the company\'s commitment to reducing its environmental impact. The factory also has charging stations for electric vehicles.',
        ],
      },
    ],
    images: withAlts(ro('neamt'), [
      'Aerial view of the Petra Pavaje factory near Roman, Neamț, with the halls, solar panels and product yard',
      'The exhibition garden of the Petra Pavaje factory in Roman seen from above, with paths in different pavers and green spaces',
      'The Petra Pavaje Roman factory team at the factory\'s inauguration, in the production hall',
    ]),
    products: [PREMIUM, STANDARD, CURBS, DRAINS],
    blogSlugs: [],
  },
]

export const getFactoryPages = (isEnglish: boolean) => (isEnglish ? FACTORY_PAGES_EN : FACTORY_PAGES)
