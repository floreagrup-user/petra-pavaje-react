import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'

const contentMap: Record<string, { title: string; sections: { heading: string; body: string }[]; cta?: boolean }> = {
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
  'cookie-uri': {
    title: 'Politica de Cookie-uri',
    sections: [
      {
        heading: 'Ce sunt cookie-urile',
        body: 'Un cookie este un fișier de mici dimensiuni, trimis împreună cu paginile acestui site și stocat de browserul tău. Informațiile stocate pot fi citite la o vizită ulterioară, de acest site sau de un terț relevant. Site-ul folosește și stocare locală similară (localStorage) pentru a reține alegerea ta privind cookie-urile.',
      },
      {
        heading: 'Cookie-uri necesare',
        body: 'Aceste cookie-uri asigură funcționarea de bază a site-ului — de exemplu, rețin alegerea ta din bannerul de cookie-uri, astfel încât să nu ți-o cerem la fiecare vizită. Le plasăm fără a-ți cere consimțământul, fiind strict necesare pentru funcționare.',
      },
      {
        heading: 'Cookie-uri de analiză și publicitate',
        body: 'La data actualizării acestei politici, site-ul nu plasează cookie-uri de analiză (ex. Google Analytics) sau de publicitate (ex. Google Ads) decât dacă alegi explicit să le accepți din bannerul de cookie-uri sau din „Setări cookie-uri" din subsolul paginii. Dacă vom activa astfel de instrumente în viitor, ele vor porni doar după consimțământul tău, conform Regulamentului General privind Protecția Datelor (GDPR).',
      },
      {
        heading: 'Cum îți administrezi alegerea',
        body: 'Poți accepta, refuza sau ajusta oricând categoriile de cookie-uri din linkul „Setări cookie-uri" aflat în subsolul fiecărei pagini. De asemenea, poți șterge cookie-urile deja stocate din setările browserului tău — la vizita următoare îți vom cere din nou consimțământul.',
      },
      {
        heading: 'Drepturile tale',
        body: 'Conform GDPR, ai dreptul de acces, rectificare, ștergere și portabilitate a datelor tale personale, precum și dreptul de a te opune prelucrării sau de a-ți retrage oricând consimțământul. Pentru exercitarea acestor drepturi sau nelămuriri legate de această politică, ne poți contacta la contact@petrapavaje.ro sau la adresa Petra Pavaje, Str. Pietrari nr. 20, Alba Iulia, România. Ai și dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).',
      },
    ],
    cta: false,
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
