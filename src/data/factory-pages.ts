// Content for /fabrici and /fabrici/:slug. Every fact below comes from the
// company's own "Descriere fabrici - Petra Pavaje" document (Oct 2026); only
// typing errors were corrected. Do not add capacities, dates or claims that
// are not in that document. Contact data, schedule, coordinates and Google
// rating live in `factories` (site.ts) and are joined by `factoryId`.

export interface FactoryFact {
  label: string
  value: string
}

export interface FactorySection {
  heading: string
  paragraphs: string[]
}

export interface FactoryImage {
  lg: string
  sm: string
  width: number
  height: number
  alt: string
  /** Index of the section the photo follows (non-hero photos only); defaults to its order. */
  afterSection?: number
}

export interface FactoryPageData {
  slug: string
  factoryId: string
  name: string
  /** Short place label used in cards and breadcrumbs. */
  place: string
  metaTitle: string
  metaDescription: string
  lead: string
  /** ISO date or year, for schema.org foundingDate. */
  opened?: string
  facts: FactoryFact[]
  sections: FactorySection[]
  images: FactoryImage[]
  products: { label: string; href: string }[]
  blogSlugs: string[]
  schemaAddress: { streetAddress: string; addressLocality: string; addressRegion: string }
}

const IMG = '/images/fabrici'

export const FLOREA_GRUP_ABOUT =
  'Petra Pavaje este un brand al companiei Florea Grup, companie înființată în Alba Iulia în anul 1996, cu capital integral românesc. Pe lângă producția de prefabricate din beton, grupul activează în domeniul construcțiilor, al betoanelor, al mixturilor asfaltice, al comerțului cu carburanți și al industriei hoteliere. Ziua de 5 iunie, când este sărbătorită Ziua Mediului, coincide cu aniversarea Petra Pavaje.'

const PREMIUM = { label: 'Pavaje Premium', href: '/pavaje-premium' }
const STANDARD = { label: 'Pavaje Standard', href: '/pavaje-standard' }
const BORDURI = { label: 'Borduri', href: '/borduri' }
const RIGOLE = { label: 'Rigole', href: '/rigole' }
const CANALIZARE = { label: 'Elemente de canalizare', href: '/elemente-de-canalizare' }

export const FACTORY_PAGES: FactoryPageData[] = [
  {
    slug: 'alba',
    factoryId: 'alba',
    name: 'Fabrica Petra Pavaje Alba Iulia',
    place: 'Alba Iulia, județul Alba',
    metaTitle: 'Fabrica de Pavaje Alba Iulia - Petra Pavaje | Grădină Expozițională',
    metaDescription:
      'Fabrica Petra Pavaje din Alba Iulia: 6.000 mp de pavaje pe zi, peste 800 de produse și o grădină expozițională de peste 5.500 mp. Adresă, program și contact.',
    lead:
      'Fabrica Petra Pavaje din Alba Iulia este situată în baza de producție Florea Grup, pe șoseaua de centură a municipiului. Unitatea face parte dintr-un proces integrat de producție a materialelor de construcții, desfășurat pe o suprafață de 20 de hectare, într-una dintre cele mai moderne baze de producție din România.',
    facts: [
      { label: 'Capacitate de producție', value: '6.000 mp/zi' },
      { label: 'Produse', value: '800+' },
      { label: 'Grădină expozițională', value: '5.500+ mp' },
      { label: 'Locuri de muncă', value: '100+' },
    ],
    sections: [
      {
        heading: 'Producție și tehnologie',
        paragraphs: [
          'Fabrica din Alba Iulia are o capacitate de producție de 6.000 mp pe zi și oferă un portofoliu diversificat de produse pentru amenajări exterioare și proiecte de construcții.',
          'Gama cuprinde dale și pavaje premium și standard, rigole, borduri, bolțari, elemente pentru garduri, elemente de canalizare și produse pentru infrastructura rutieră. Cu peste 800 de produse disponibile în forme și culori variate, Petra Pavaje se adresează clienților precum contractorii, montatorii, depozitele și magazinele de profil, oferind soluții adaptate unor cerințe diverse.',
          'Prin dezvoltarea acestei capacități de producție a fabricii Petra Pavaje, Florea Grup și-a propus să devină unul dintre jucătorii importanți de pe piața pavajelor, valorificând totodată tradiția activităților de profil din județul Alba.',
        ],
      },
      {
        heading: 'Grădina expozițională',
        paragraphs: [
          'Fabrica din Alba Iulia dispune de o grădină expozițională cu o suprafață de peste 5.500 mp. Spațiul permite prezentarea produselor Petra Pavaje în amenajări exterioare și oferă vizitatorilor posibilitatea de a descoperi o mulțime de variante de pavaje și soluții pentru proiectele proprii.',
        ],
      },
      {
        heading: 'Logistică și integrarea activităților',
        paragraphs: [
          'Fabrica din Alba Iulia completează activitățile de producție a materialelor de construcții desfășurate de Florea Grup, din care face parte și brandul Petra Pavaje. Serviciile logistice și flota auto performantă asigură transportul sigur și rapid al produselor către parteneri și spre șantierele acestora.',
        ],
      },
      {
        heading: 'Energie verde și protecția mediului',
        paragraphs: [
          'Platforma industrială este alimentată de un parc fotovoltaic propriu, care poate asigura aproximativ 40–50% din necesarul de energie. Parcul fotovoltaic contribuie la protejarea mediului și la reducerea emisiilor de CO₂.',
          'Compania susține, de asemenea, tranziția către mobilitatea electrică prin integrarea în activitatea curentă a unei flote de peste 60 de vehicule electrice și prin dezvoltarea unei rețele proprii de stații de încărcare rapidă în locațiile sale strategice. Tehnologia modernă utilizată în procesul de producție contribuie la eficiența energetică a utilajelor și la reducerea impactului asupra mediului.',
        ],
      },
      {
        heading: 'Contribuția la comunitatea locală',
        paragraphs: [
          'Activitatea fabricii susține dezvoltarea economică locală și a comunității. Unitatea asigură peste 100 de locuri de muncă, sprijinind ocuparea forței de muncă în județul Alba.',
        ],
      },
    ],
    images: [
      {
        lg: `${IMG}/fabrica-pavaje-alba-iulia-lg.webp`,
        sm: `${IMG}/fabrica-pavaje-alba-iulia-sm.webp`,
        width: 1600,
        height: 915,
        alt: 'Vedere aeriană a bazei de producție Florea Grup din Alba Iulia, cu fabrica Petra Pavaje și depozitul de produse',
      },
    ],
    products: [
      PREMIUM,
      STANDARD,
      BORDURI,
      RIGOLE,
      { label: 'Bolțari', href: '/boltari' },
      { label: 'Garduri', href: '/garduri' },
      CANALIZARE,
      { label: 'Infrastructură rutieră', href: '/elemente-de-canalizare/infrastructura-rutiera' },
    ],
    blogSlugs: ['florea-grup-a-inceput-montarea-parcului-fotovoltaic'],
    schemaAddress: { streetAddress: 'Strada Pietrar nr. 20', addressLocality: 'Alba Iulia', addressRegion: 'Alba' },
  },
  {
    slug: 'arad',
    factoryId: 'arad',
    name: 'Fabrica Petra Pavaje Arad',
    place: 'Vladimirescu, județul Arad',
    metaTitle: 'Fabrica de Pavaje Arad (Vladimirescu) - Petra Pavaje',
    metaDescription:
      'Fabrica Petra Pavaje din Vladimirescu, Arad: 6.000 mp de pavaje pe zi, peste 800 de produse, stoc permanent și grădină expozițională. Adresă, program și contact.',
    lead:
      'Pusă în funcțiune la data de 23 septembrie 2021, cea de-a treia fabrică Petra Pavaje este situată în vestul țării, în comuna Vladimirescu, județul Arad. Unitatea de producție se remarcă prin tehnologia modernă utilizată și prin fluxul tehnologic integral automatizat, fiind una dintre cele mai eficiente și moderne fabrici de prefabricate din beton din vestul țării.',
    opened: '2021-09-23',
    facts: [
      { label: 'În funcțiune din', value: '23 septembrie 2021' },
      { label: 'Capacitate de producție', value: '6.000 mp/zi' },
      { label: 'Produse', value: '800+' },
      { label: 'Locuri de muncă', value: '50+' },
    ],
    sections: [
      {
        heading: 'Producție și tehnologie',
        paragraphs: [
          'Fabrica Petra Pavaje Arad are o capacitate de producție de 6.000 mp pe zi și asigură peste 50 de locuri de muncă. Tehnologia folosită este de ultimă generație și a fost dezvoltată în colaborare cu producători de top din Germania. Automatizarea integrală a fluxului tehnologic contribuie la eficientizarea procesului de fabricație și la obținerea unor produse de calitate.',
          'Aici se produc peste 800 de produse, printre care dale și pavaje premium, pavaje standard, borduri, rigole și alte produse din beton vibropresat. Varietatea produselor permite identificarea unor soluții potrivite pentru diferite tipuri de amenajări exterioare.',
        ],
      },
      {
        heading: 'Logistică și livrare',
        paragraphs: [
          'Unul dintre avantajele fabricii din Arad este capacitatea logistică. Depozitul generos permite menținerea unui stoc permanent de marfă.',
          'Proximitatea față de clienți este importantă în cazul materialelor de construcții, a căror greutate influențează costurile de transport. Oferta comercială variază în funcție de distanța de livrare, iar apropierea de zonele deservite contribuie la menținerea unor prețuri competitive. Totodată, flota auto performantă, specializată în transportul materialelor de construcții, permite livrarea rapidă și în siguranță.',
        ],
      },
      {
        heading: 'Grădina expozițională',
        paragraphs: [
          'Fabrica beneficiază de o grădină expozițională de mari dimensiuni, cu o varietate generoasă de produse expuse și spații verzi. Aceasta le oferă vizitatorilor posibilitatea de a descoperi diferite soluții pentru amenajări exterioare și de a observa produsele într-un cadru amenajat.',
        ],
      },
      {
        heading: 'Energie verde și protecția mediului',
        paragraphs: [
          'Fabrica din Arad este concepută pentru a avea un impact minim asupra mediului. Tehnologia modernă utilizată asigură o eficiență energetică ridicată a utilajelor, contribuind la utilizarea responsabilă a resurselor în procesul de producție.',
        ],
      },
    ],
    images: [
      {
        lg: `${IMG}/fabrica-pavaje-arad-vladimirescu-lg.webp`,
        sm: `${IMG}/fabrica-pavaje-arad-vladimirescu-sm.webp`,
        width: 1600,
        height: 900,
        alt: 'Vedere aeriană a fabricii Petra Pavaje din Vladimirescu, Arad, cu halele de producție și depozitul de pavaje',
      },
      {
        lg: `${IMG}/echipa-fabrica-pavaje-arad-lg.webp`,
        sm: `${IMG}/echipa-fabrica-pavaje-arad-sm.webp`,
        width: 1024,
        height: 768,
        alt: 'Echipa fabricii Petra Pavaje Arad în hala de producție, la punerea în funcțiune',
      },
    ],
    products: [PREMIUM, STANDARD, BORDURI, RIGOLE],
    blogSlugs: [
      'florea-grup-a-inaugurat-cea-de-a-treia-fabrica-petra-pavaje',
      'florea-grup-incepe-lucrarile-la-cea-de-a-treia-fabrica-petra-pavaje',
    ],
    schemaAddress: {
      streetAddress: 'Str. 1 Decembrie 1918, nr. 28',
      addressLocality: 'Horia, comuna Vladimirescu',
      addressRegion: 'Arad',
    },
  },
  {
    slug: 'prahova',
    factoryId: 'prahova',
    name: 'Fabrica Petra Pavaje Prahova',
    place: 'Strejnicu, județul Prahova',
    metaTitle: 'Fabrica de Pavaje Prahova (Strejnicu) - Petra Pavaje | Showroom Exterior',
    metaDescription:
      'Fabrica Petra Pavaje din Strejnicu, Prahova: 6.000 mp de pavaje pe zi, peste 800 de produse și un showroom exterior de peste 5.500 mp. Adresă, program și contact.',
    lead:
      'Inaugurată în anul 2020, fabrica Petra Pavaje din localitatea Strejnicu, județul Prahova, a marcat o etapă importantă în dezvoltarea companiei Florea Grup. Odată cu extinderea la nivel național, brandul Florea Pavaje a trecut printr-un proces de rebranding, devenind Petra Pavaje, așa cum este cunoscut astăzi.',
    opened: '2020',
    facts: [
      { label: 'Inaugurată în', value: '2020' },
      { label: 'Capacitate de producție', value: '6.000 mp/zi' },
      { label: 'Showroom exterior', value: '5.500+ mp' },
      { label: 'Locuri de muncă', value: '60+' },
    ],
    sections: [
      {
        heading: 'Fabrica din sudul țării',
        paragraphs: [
          'Amplasarea fabricii susține dezvoltarea activității companiei în sudul țării, într-o zonă cu cerere de produse Premium și cu o infrastructură în continuă dezvoltare, oferind astfel acces la produse adaptate nevoilor clienților.',
        ],
      },
      {
        heading: 'Producție și tehnologie',
        paragraphs: [
          'Fabrica Petra Pavaje din Prahova are o capacitate de producție de 6.000 mp pe zi și asigură peste 60 de locuri de muncă. Fluxul tehnologic este integral automatizat, iar tehnologia de ultimă generație a fost dezvoltată în colaborare cu producători de top din Germania. Aceste soluții contribuie la eficientizarea proceselor de fabricație și la obținerea unor produse de calitate.',
          'Aici se produc peste 800 de produse, printre care dale și pavaje premium, pavaje standard, borduri, rigole, elemente de canalizare și alte produse din beton vibropresat. Varietatea produselor permite identificarea unor soluții potrivite pentru diferite tipuri de amenajări exterioare.',
        ],
      },
      {
        heading: 'Showroomul exterior',
        paragraphs: [
          'Unul dintre punctele de atracție ale fabricii din Strejnicu este showroomul exterior, cu o suprafață de peste 5.500 mp, cel mai mare de acest gen din țară. Spațiul prezintă soluții estetice și practice pentru amenajări exterioare și le permite clienților să interacționeze vizual și tactil cu produsele înainte de a lua o decizie de cumpărare.',
        ],
      },
      {
        heading: 'Logistică și livrare',
        paragraphs: [
          'Depozitul generos permite menținerea unui stoc permanent de marfă, mai ales că în cazul materialelor de construcții proximitatea față de clienți este importantă, deoarece distanța de transport influențează oferta comercială. Fabrica beneficiază de servicii logistice și de o flotă auto performantă, specializată în transportul sigur și rapid al materialelor de construcții.',
        ],
      },
      {
        heading: 'Energie verde și protecția mediului',
        paragraphs: [
          'Fabrica din Prahova urmărește reducerea impactului asupra mediului prin utilizarea unei tehnologii moderne, care asigură o eficiență energetică ridicată a utilajelor. Aceste măsuri reflectă preocuparea companiei pentru utilizarea responsabilă a resurselor și pentru eficientizarea proceselor de producție.',
        ],
      },
    ],
    images: [
      {
        lg: `${IMG}/fabrica-pavaje-prahova-strejnicu-lg.webp`,
        sm: `${IMG}/fabrica-pavaje-prahova-strejnicu-sm.webp`,
        width: 1280,
        height: 852,
        alt: 'Vedere aeriană a fabricii Petra Pavaje din Strejnicu, Prahova, cu depozitul de pavaje și dale',
      },
      {
        lg: `${IMG}/echipa-fabrica-pavaje-prahova-lg.webp`,
        sm: `${IMG}/echipa-fabrica-pavaje-prahova-sm.webp`,
        width: 1600,
        height: 900,
        alt: 'Echipa fabricii Petra Pavaje Prahova în hala de producție, la deschiderea fabricii',
      },
    ],
    products: [PREMIUM, STANDARD, BORDURI, RIGOLE, CANALIZARE],
    blogSlugs: ['florea-pavaje-devine-petra-pavaje'],
    schemaAddress: {
      streetAddress: 'DN1A, km 62+200',
      addressLocality: 'Strejnicu, comuna Târgșoru Vechi',
      addressRegion: 'Prahova',
    },
  },
  {
    slug: 'neamt',
    factoryId: 'neamt',
    name: 'Fabrica Petra Pavaje Roman',
    place: 'Roman, județul Neamț',
    metaTitle: 'Fabrica de Pavaje Roman, Neamț - Petra Pavaje | Grădină Expozițională',
    metaDescription:
      'Fabrica Petra Pavaje de lângă Roman, Neamț: 6.000 mp de pavaje pe zi, peste 800 de produse, flotă proprie de livrare și grădină expozițională. Adresă și contact.',
    lead:
      'Cea de-a patra fabrică Petra Pavaje a fost pusă în funcțiune la data de 20 iulie 2022, în proximitatea orașului Roman, județul Neamț. Unitatea de producție reprezintă una dintre cele mai moderne și eficiente fabrici de prefabricate din beton din estul țării, fiind dezvoltată în colaborare cu producători de top din Europa. Investiția totală depășește 10 milioane de euro, iar platforma industrială Florea Grup Roman se întinde pe o suprafață de 80.000 mp.',
    opened: '2022-07-20',
    facts: [
      { label: 'În funcțiune din', value: '20 iulie 2022' },
      { label: 'Capacitate de producție', value: '6.000 mp/zi' },
      { label: 'Platformă industrială', value: '80.000 mp' },
      { label: 'Locuri de muncă', value: '80+' },
    ],
    sections: [
      {
        heading: 'Producție și tehnologie',
        paragraphs: [
          'Fabrica din Roman are o capacitate de producție de 6.000 mp pe zi și asigură peste 80 de locuri de muncă. Fluxul tehnologic este complet automatizat și integrează roboți industriali, contribuind la eficientizarea proceselor de fabricație și la obținerea unor produse de calitate.',
          'Aici se produc peste 800 de produse, printre care dale și pavaje premium, pavaje standard, borduri, rigole și alte produse din beton vibropresat. Diversitatea gamei permite adresarea unor nevoi variate pentru amenajări exterioare și proiecte de construcții.',
        ],
      },
      {
        heading: 'Logistică și livrare',
        paragraphs: [
          'Fabrica din Roman beneficiază de o flotă proprie de autoutilitare, care permite livrarea produselor în orice zonă din proximitatea fabricii, în condiții optime. Prin integrarea producției cu serviciile de transport, compania urmărește să asigure disponibilitatea produselor și livrarea acestora în timp util către clienți.',
        ],
      },
      {
        heading: 'Grădina expozițională',
        paragraphs: [
          'La fabrica Petra Pavaje din Roman a fost amenajată și o grădină expozițională cu spații verzi generoase, concepută ca sursă de inspirație pentru parteneri, dar și ca loc de relaxare pentru angajați. Aceasta completează spațiul industrial și susține filosofia Petra Pavaje, exprimată prin motto-ul „În armonie cu natura”.',
        ],
      },
      {
        heading: 'Energie verde și protecția mediului',
        paragraphs: [
          'Platforma industrială este alimentată de un parc fotovoltaic propriu, ceea ce contribuie la reducerea emisiilor de CO₂ cu 148 de tone pe an. Utilajele beneficiază de o eficiență energetică ridicată, iar măsurile implementate reflectă preocuparea companiei pentru reducerea impactului asupra mediului. În plus, fabrica dispune de stații de încărcare pentru vehiculele electrice.',
        ],
      },
    ],
    images: [
      {
        lg: `${IMG}/fabrica-pavaje-roman-neamt-lg.webp`,
        sm: `${IMG}/fabrica-pavaje-roman-neamt-sm.webp`,
        width: 1600,
        height: 773,
        alt: 'Vedere aeriană a fabricii Petra Pavaje de lângă Roman, Neamț, cu halele, panourile fotovoltaice și depozitul',
      },
      {
        lg: `${IMG}/gradina-expozitionala-fabrica-roman-lg.webp`,
        sm: `${IMG}/gradina-expozitionala-fabrica-roman-sm.webp`,
        width: 1600,
        height: 1067,
        alt: 'Grădina expozițională a fabricii Petra Pavaje din Roman, văzută de sus, cu alei din pavaje diferite și spații verzi',
        afterSection: 2,
      },
      {
        lg: `${IMG}/inaugurare-fabrica-pavaje-roman-lg.webp`,
        sm: `${IMG}/inaugurare-fabrica-pavaje-roman-sm.webp`,
        width: 1024,
        height: 768,
        alt: 'Echipa fabricii Petra Pavaje Roman la inaugurarea fabricii, în hala de producție',
        afterSection: 0,
      },
    ],
    products: [PREMIUM, STANDARD, BORDURI, RIGOLE],
    blogSlugs: ['a-patra-fabrica-petra-pavaje', 'au-inceput-constructiile-celei-de-a-patra-fabrici-petra-pavaje'],
    schemaAddress: { streetAddress: 'DJ207B', addressLocality: 'Simionești', addressRegion: 'Neamț' },
  },
]

export const factoryPagePath = (slug: string) => `/fabrici/${slug}`
