import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'

const contentMap: Record<string, { title: string; sections: { heading: string; body: string }[]; cta?: boolean }> = {
  'about': {
    title: 'Despre Noi',
    sections: [
      {
        heading: 'Petra Pavaje – Partea a Florea Grup',
        body: 'Petra Pavaje este parte a companiei Florea Grup, fondată de Marcel și David Florea în anul 1996. Cu o experiență de peste 25 de ani în construcții, Florea Grup a lansat brandul Petra Pavaje în iunie 2017, dedicat producției de prefabricate din beton de cea mai înaltă calitate.',
      },
      {
        heading: 'Misiunea Noastră',
        body: 'Prin Petra, produsul prinde viață. Pavajele, bolțarii și bordurile ne sunt alături mai mult decât prin prezența fizică. Ele ne ajută să amenajăm spațiul așa cum am visat. Este piatra transformată în ceva viu. Ne dorim ca oricine face cunoștință cu Petra Pavaje să fie inspirat să creeze grădini sau alei unice, care transformă o casă în ACASĂ.',
      },
      {
        heading: 'Tehnologie Modernă',
        body: 'Tehnologia modernă ne ajută să oferim produse deosebite: splitarea controlată a betonului pentru texturi unice, antichizarea pentru aspectul pietrei naturale și impregnarea suprafețelor pentru culori vii și rezistență în timp.',
      },
      {
        heading: 'Prezență Națională',
        body: 'Cu 4 fabrici în România (Alba, Prahova, Arad, Neamț) și o capacitate de producție de 24.000 mp/zi, Petra Pavaje este unul dintre cei mai importanți producători de prefabricate din beton din țară. Peste 800 de produse și 600 de angajați.',
      },
    ],
    cta: true,
  },
  'company': {
    title: 'Compania',
    sections: [
      {
        heading: 'Florea Grup',
        body: 'Florea Grup este o companie antreprenorială românească, fondată în anul 1996. De la o afacere mică, compania a crescut continuu, devenind unul dintre cei mai importanți jucători din industria construcțiilor din Transilvania. Cu peste 600 de angajați și activități în construcții, materiale de construcții, distribuție carburanți, servicii de taxi și turism, Florea Grup reprezintă un exemplu de succes antreprenorial românesc.',
      },
      {
        heading: 'Valorile Noastre',
        body: 'Respectul față de clienți și angajați, profesionalismul și responsabilitatea sunt pilonii pe care compania s-a dezvoltat. Echipa noastră este formată din oameni implicați, harnici și ghidați de valori comune.',
      },
    ],
    cta: true,
  },
  'sustainability': {
    title: 'Sustenabilitate',
    sections: [
      {
        heading: 'În Armonie cu Natura',
        body: 'La fabricile Petra Pavaje, fiecare produs este creat cu responsabilitate față de mediu. Am implementat practici concrete care reduc semnificativ amprenta de carbon.',
      },
      {
        heading: 'Parc Fotovoltaic Propriu',
        body: 'Cu o capacitate de 469 MW/h pe an, parcul fotovoltaic de la fabrica Roman alimentează o parte semnificativă din necesarul energetic al producției.',
      },
      {
        heading: 'Reducerea Emisiilor',
        body: 'Economisim 148 de tone de emisii de CO₂ certificate anual prin utilizarea energiei solare și a tehnologiilor eficiente.',
      },
      {
        heading: 'Flotă Electrică',
        body: 'Toate fabricile noastre beneficiază de stații de încărcare gratuite pentru vehicule electrice, încurajând mobilitatea verde.',
      },
    ],
    cta: false,
  },
  'garantie': {
    title: 'Garanție',
    sections: [
      {
        heading: '5 Ani de Garanție',
        body: 'Toate produsele Petra Pavaje beneficiază de o garanție de 5 ani, conform standardelor europene de calitate. Garanția acoperă defectele de fabricație și asigură durabilitatea produselor noastre în timp.',
      },
      {
        heading: 'Certificări',
        body: 'Produsele noastre sunt însoțite de certificări CE și ISO, confirmând conformitatea cu standardele europene de calitate.',
      },
    ],
    cta: true,
  },
  'laborator': {
    title: 'Laborator',
    sections: [
      {
        heading: 'Laborator Propriu de Cercetare',
        body: 'Deținem la fiecare unitate de producție laboratoare proprii unde testăm constant materiile prime și produsele finite, pentru a asigura o calitate superioară constantă.',
      },
      {
        heading: 'Control al Calității',
        body: 'Fiecare lot de producție este testat riguros în laboratoarele noastre, de la rezistența la compresiune până la absorbtia de apă și rezistența la îngheț-dezgheț.',
      },
    ],
    cta: false,
  },
  'cariera': {
    title: 'Carieră',
    sections: [
      {
        heading: 'Alătură-te Echipei Noastre',
        body: 'Florea Grup este o poveste despre antreprenoriat, curaj și perseverență. Cu peste 600 de angajați, suntem mereu în căutarea oamenilor talentați care doresc să crească alături de noi.',
      },
      {
        heading: 'De ce să alegi Petra Pavaje?',
        body: 'Oferim un mediu de lucru profesionist, oportunități de dezvoltare, stabilitate și beneficii competitive. Fiecare angajat contează și contribuie la succesul companiei.',
      },
    ],
    cta: true,
  },
  'catalog': {
    title: 'Catalog',
    sections: [
      {
        heading: 'Catalogul Petra Pavaje',
        body: 'Descarcă catalogul nostru complet pentru a descoperi întreaga gamă de produse disponibile. Catalogul include specificații tehnice, dimensiuni, culori și modele de montaj pentru fiecare produs.',
      },
    ],
    cta: false,
  },
  'faq': {
    title: 'Întrebări Frecvente',
    sections: [
      {
        heading: 'Ce tipuri de pavaje oferă Petra Pavaje?',
        body: 'Oferim pavaje premium și standard, în multiple dimensiuni, culori și texturi. De la pavele decorative premium la soluții robuste pentru trafic intens.',
      },
      {
        heading: 'Care este termenul de livrare?',
        body: 'Termenul de livrare variază în funcție de produs și cantitate. Contactează reprezentantul din zona ta pentru o estimare exactă.',
      },
      {
        heading: 'Oferiți servicii de montaj?',
        body: 'Da, colaborăm cu montatori autorizați în toată țara. Te putem pune în legătură cu parteneri din zona ta.',
      },
      {
        heading: 'Care este garanția produselor?',
        body: 'Toate produsele Petra Pavaje beneficiază de o garanție de 5 ani.',
      },
    ],
    cta: true,
  },
  'intretinere': {
    title: 'Ghid de Întreținere',
    sections: [
      {
        heading: 'Curățare Periodică',
        body: 'Pentru a menține aspectul pavajelor, recomandăm curățarea periodică cu apă și detergent neutru. Evitați utilizarea acizilor sau a produselor abrazive.',
      },
      {
        heading: 'Protecție în Sezonul Rece',
        body: 'Pentru curățarea zăpezii, utilizați unelte cu margini de cauciuc. Evitați sarea în exces, care poate afecta culoarea pavajelor.',
      },
      {
        heading: 'Tratamente Periodice',
        body: 'Aplicarea unui tratament hidrofob la 2-3 ani poate prelungi semnificativ viața și aspectul pavajelor.',
      },
    ],
    cta: false,
  },
}

export function GenericPage({ title, contentKey }: { title: string; contentKey: string }) {
  const content = contentMap[contentKey]

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">{title}</span>
            </nav>
            <h1 className="heading-h1 mb-4">{title}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium max-w-4xl">
          {content ? (
            <div className="space-y-12">
              {content.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h2 className="text-2xl md:text-3xl font-semibold text-charcoal-900 mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-body-lg text-charcoal-600 leading-relaxed whitespace-pre-line">
                    {section.body}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">Conținut în curs de actualizare</h2>
              <p className="text-charcoal-500">Această pagină va fi disponibilă în curând.</p>
            </div>
          )}

          {content?.cta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-8 bg-charcoal-50 rounded-xl text-center"
            >
              <h3 className="text-xl font-semibold text-charcoal-900 mb-4">Ai nevoie de mai multe informații?</h3>
              <p className="text-charcoal-500 mb-6">Contactează-ne pentru o ofertă personalizată.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn-primary">
                  Solicită Ofertă
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/catalog" className="btn-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Descarcă Catalog
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
