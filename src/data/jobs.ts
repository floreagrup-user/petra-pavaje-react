// Open positions shown on /cariera and /en/cariera.
// Source: the FLOREA GRUP job ads on OLX.ro. Salary is shown only where the
// ad says so ("Salariu atractiv"); no amounts are published anywhere.

export type JobLocale = 'ro' | 'en'

interface JobText {
  title: string
  location: string
  summary: string
  requirements: string[]
  responsibilities?: string[]
  offers: string[]
  schedule: string
  experience?: string
}

export interface Job {
  id: string
  positions: number
  /** ISO date the ad was posted on OLX. */
  datePosted: string
  locality: string
  region: string
  streetAddress?: string
  ro: JobText
  en: JobText
}

const OFFERS_RO = ['Salariu atractiv', 'Contract de muncă pe perioadă nedeterminată', 'Mediu de lucru plăcut']
const OFFERS_EN = ['Attractive salary', 'Permanent employment contract', 'Pleasant work environment']

export const jobs: Job[] = [
  {
    id: 'sofer-deservent-pompa-cluj-napoca',
    positions: 1,
    datePosted: '2026-09-29',
    locality: 'Cluj-Napoca',
    region: 'Cluj',
    ro: {
      title: 'Șofer și deservent pompă staționară',
      location: 'Cluj-Napoca (Someșeni)',
      summary: 'FLOREA GRUP angajează șofer și deservent pompă staționară pentru punctul de lucru din Cluj-Napoca.',
      requirements: [
        'Permis de conducere cat. C/CE',
        'Atestat profesional pentru transport marfă',
        'Menținerea autovehiculelor în stare normală de funcționare',
        'Respectarea programului de lucru stabilit, a orelor și pauzelor de conducere conform legislației în vigoare',
        'Seriozitate, onestitate și profesionalism',
      ],
      offers: OFFERS_RO,
      schedule: 'Normă întreagă, program normal',
      experience: 'Sub 2 ani',
    },
    en: {
      title: 'Driver and stationary pump operator',
      location: 'Cluj-Napoca (Someșeni)',
      summary: 'FLOREA GRUP is hiring a driver and stationary pump operator for the Cluj-Napoca site.',
      requirements: [
        'Category C/CE driving licence',
        'Professional certificate for freight transport',
        'Keep the vehicles in normal working order',
        'Follow the set work schedule and the driving and rest times required by law',
        'Seriousness, honesty and professionalism',
      ],
      offers: OFFERS_EN,
      schedule: 'Full-time, regular schedule',
      experience: 'Under 2 years',
    },
  },
  {
    id: 'mecanic-intretinere-fabrica-strejnicu',
    positions: 2,
    datePosted: '2026-09-30',
    locality: 'Strejnicu',
    region: 'Prahova',
    ro: {
      title: 'Mecanic întreținere fabrică',
      location: 'Strejnicu, jud. Prahova',
      summary: 'Angajăm mecanici de întreținere pentru fabrica Petra Pavaje din Strejnicu, jud. Prahova.',
      requirements: [
        'Minimum 2 ani de experiență în mentenanță și întreținere într-un mediu industrial, de preferat într-o fabrică cu linii de producție automatizate',
        'Studii tehnice în domeniul mecanic, electric sau automatizări',
        'Experiență în identificarea și diagnosticarea defecțiunilor la echipamente și sisteme automatizate',
        'Experiența cu benzi transportoare și sisteme automate de sortare constituie un avantaj',
        'Autorizațiile ANRE și/sau ISCIR constituie un avantaj, dar nu sunt obligatorii',
      ],
      responsibilities: [
        'Asiguri mentenanța preventivă și intervențiile necesare pentru benzile transportoare și sistemele automate de sortare',
        'Identifici și remediezi defecțiunile mecanice apărute la utilaje, instalații și echipamente tehnice',
        'Intervii pentru remedierea defecțiunilor la stivuitoare și alte echipamente de manipulare a materialelor',
        'Asiguri întreținerea sistemelor electrice din depozit, precum tablouri electrice, cablaje și iluminat industrial, în colaborare cu reprezentanții firmei care a realizat instalațiile',
        'Participi la instalarea, montarea, punerea în funcțiune și configurarea echipamentelor și sistemelor tehnice noi, împreună cu echipa tehnică',
        'Te asiguri că lucrările și intervențiile sunt realizate conform documentației tehnice și normelor de siguranță',
        'Participi la lucrările de întreținere curentă și la intervențiile operative asupra echipamentelor',
        'Urmărești permanent starea tehnică a utilajelor și identifici din timp eventualele probleme',
        'Gestionezi și întreții sculele, echipamentele și piesele de schimb aflate în dotarea fabricii',
        'Raportezi superiorului direct defecțiunile care depășesc nivelul tău de competență și necesită intervenția unui specialist',
      ],
      offers: ['Contract de muncă pe perioadă nedeterminată'],
      schedule: 'Normă întreagă, program de lucru în ture',
    },
    en: {
      title: 'Factory maintenance mechanic',
      location: 'Strejnicu, Prahova County',
      summary: 'We are hiring maintenance mechanics for the Petra Pavaje factory in Strejnicu, Prahova County.',
      requirements: [
        'At least 2 years of maintenance experience in an industrial setting, preferably a factory with automated production lines',
        'Technical studies in mechanical, electrical or automation fields',
        'Experience in finding and diagnosing faults in equipment and automated systems',
        'Experience with conveyor belts and automated sorting systems is an advantage',
        'ANRE and/or ISCIR authorisations are an advantage, but not mandatory',
      ],
      responsibilities: [
        'Carry out preventive maintenance and the interventions needed for conveyor belts and automated sorting systems',
        'Find and fix mechanical faults in machinery, installations and technical equipment',
        'Step in to repair forklifts and other material-handling equipment',
        'Maintain the warehouse electrical systems, such as electrical panels, cabling and industrial lighting, together with the representatives of the company that built the installations',
        'Take part in installing, assembling, commissioning and configuring new technical equipment and systems, together with the technical team',
        'Make sure the work and interventions follow the technical documentation and safety rules',
        'Take part in routine maintenance and operational interventions on equipment',
        'Keep track of the technical condition of the machinery and spot problems early',
        'Manage and maintain the tools, equipment and spare parts held by the factory',
        'Report to your direct superior any fault beyond your competence that needs a specialist',
      ],
      offers: ['Permanent employment contract'],
      schedule: 'Full-time, shift work',
    },
  },
  {
    id: 'sofer-cisterna-adr-alba-iulia',
    positions: 2,
    datePosted: '2026-09-22',
    locality: 'Alba Iulia',
    region: 'Alba',
    streetAddress: 'Bdul Horea, nr. 2',
    ro: {
      title: 'Șofer cisternă cu atestat ADR',
      location: 'Alba Iulia, Bdul Horea nr. 2, jud. Alba',
      summary: 'FLOREA GRUP angajează șofer cisternă cu atestat ADR pentru transport combustibil la punctul de lucru din Alba Iulia.',
      requirements: [
        'Atestat transport combustibil ADR',
        'Permis de conducere cat. C/CE',
        'Atestat profesional pentru transport marfă',
        'Menținerea autovehiculelor în stare normală de funcționare',
        'Respectarea programului de lucru stabilit, a orelor și pauzelor de conducere conform legislației în vigoare',
        'Seriozitate, onestitate și profesionalism',
      ],
      offers: OFFERS_RO,
      schedule: 'Normă întreagă, program normal',
      experience: '2-5 ani',
    },
    en: {
      title: 'Tanker driver with ADR certificate',
      location: 'Alba Iulia, Bdul Horea no. 2, Alba County',
      summary: 'FLOREA GRUP is hiring a tanker driver with an ADR certificate for fuel transport at the Alba Iulia site.',
      requirements: [
        'ADR certificate for fuel transport',
        'Category C/CE driving licence',
        'Professional certificate for freight transport',
        'Keep the vehicles in normal working order',
        'Follow the set work schedule and the driving and rest times required by law',
        'Seriousness, honesty and professionalism',
      ],
      offers: OFFERS_EN,
      schedule: 'Full-time, regular schedule',
      experience: '2-5 years',
    },
  },
  {
    id: 'sofer-profesionist-c-ce-cluj-napoca',
    positions: 2,
    datePosted: '2026-09-16',
    locality: 'Cluj-Napoca',
    region: 'Cluj',
    ro: {
      title: 'Șofer profesionist C+CE',
      location: 'Cluj-Napoca (Someșeni)',
      summary: 'FLOREA GRUP angajează șofer profesionist pentru brandul Petra Pavaje la punctul de lucru din Cluj-Napoca.',
      requirements: [
        'Permis de conducere cat. C/CE',
        'Atestat profesional pentru transport marfă',
        'Menținerea autovehiculelor în stare normală de funcționare',
        'Respectarea programului de lucru stabilit, a orelor și pauzelor de conducere conform legislației în vigoare',
        'Seriozitate, onestitate și profesionalism',
      ],
      offers: OFFERS_RO,
      schedule: 'Normă întreagă, program normal',
      experience: 'Sub 2 ani',
    },
    en: {
      title: 'Professional driver C+CE',
      location: 'Cluj-Napoca (Someșeni)',
      summary: 'FLOREA GRUP is hiring a professional driver for the Petra Pavaje brand at the Cluj-Napoca site.',
      requirements: [
        'Category C/CE driving licence',
        'Professional certificate for freight transport',
        'Keep the vehicles in normal working order',
        'Follow the set work schedule and the driving and rest times required by law',
        'Seriousness, honesty and professionalism',
      ],
      offers: OFFERS_EN,
      schedule: 'Full-time, regular schedule',
      experience: 'Under 2 years',
    },
  },
  {
    id: 'sofer-profesionist-c-ce-strejnicu',
    positions: 2,
    datePosted: '2026-09-16',
    locality: 'Strejnicu',
    region: 'Prahova',
    ro: {
      title: 'Șofer profesionist C+CE',
      location: 'Strejnicu, jud. Prahova',
      summary: 'FLOREA GRUP angajează șofer profesionist pentru brandul Petra Pavaje la punctul de lucru din Strejnicu, jud. Prahova.',
      requirements: [
        'Permis de conducere cat. C/CE',
        'Atestat profesional pentru transport marfă',
        'Menținerea autovehiculelor în stare normală de funcționare',
        'Respectarea programului de lucru stabilit, a orelor și pauzelor de conducere conform legislației în vigoare',
        'Seriozitate, onestitate și profesionalism',
      ],
      offers: OFFERS_RO,
      schedule: 'Normă întreagă, program normal',
      experience: 'Sub 2 ani',
    },
    en: {
      title: 'Professional driver C+CE',
      location: 'Strejnicu, Prahova County',
      summary: 'FLOREA GRUP is hiring a professional driver for the Petra Pavaje brand at the Strejnicu site, Prahova County.',
      requirements: [
        'Category C/CE driving licence',
        'Professional certificate for freight transport',
        'Keep the vehicles in normal working order',
        'Follow the set work schedule and the driving and rest times required by law',
        'Seriousness, honesty and professionalism',
      ],
      offers: OFFERS_EN,
      schedule: 'Full-time, regular schedule',
      experience: 'Under 2 years',
    },
  },
]

export function jobPostingSchema(locale: JobLocale) {
  return jobs.map((job) => {
    const text = job[locale]
    return {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: text.title,
      description: [text.summary, ...text.requirements].join('. '),
      datePosted: job.datePosted,
      employmentType: 'FULL_TIME',
      directApply: false,
      hiringOrganization: {
        '@type': 'Organization',
        name: 'FLOREA GRUP',
        sameAs: 'https://floreagrup.ro/',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          ...(job.streetAddress ? { streetAddress: job.streetAddress } : {}),
          addressLocality: job.locality,
          addressRegion: job.region,
          addressCountry: 'RO',
        },
      },
    }
  })
}
