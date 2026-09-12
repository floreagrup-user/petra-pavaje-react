import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

const TECH_ITEMS = [
  {
    title: 'Splitarea',
    body: 'Este cea mai nouă instalație din linia de fabricație a produselor Petra Pavaje. Odată ce elementul de beton a fost uscat, la minim o săptămână după turnare, urmează despicarea controlată a acestuia, prin aplicarea unei presiuni. Produsele rezultate sunt bine compactate, au durabilitate ridicată și una sau mai multe fețe cu o textură deosebită. Blocul din beton își păstrează forma regulată, putând fi astfel ușor de montat. Elementele de treaptă, palisadele și blocurile de zid sunt doar câteva dintre produsele realizate prin această tehnică.',
  },
  {
    title: 'Antichizarea',
    body: 'Prin procesul de antichizare, produsele capătă aspectul pietrei naturale, cu textură învechită și culoare care imită foarte bine nuanțele întâlnite într-o carieră de piatră. Acest proces de îmbătrânire a suprafeței nu afectează rezistența produsului. Pavajele astfel obținute se aseamănă pietrei cubice, având lungimi de 10 sau 20 cm — combinând frumusețea și naturalețea pietrei cu rezistența betonului vibropresat.',
  },
  {
    title: 'Impregnarea suprafețelor',
    body: 'Suprafața colorată a pavajelor se obține prin impregnarea stratului superior cu substanțe speciale care asigură culori vii și rezistență în timp. Procesul este rezultatul coroborat al inginerilor din producție și a echipei din laboratorul de cercetare și dezvoltare, imitând coloritul neuniform al pietrei naturale.',
  },
]

const BUSINESS_CARDS = [
  {
    title: 'Materiale de construcții',
    body: 'Activitatea de bază a companiei Florea Grup rămâne extracția și prelucrarea agregatelor minerale, fabricarea mixturilor asfaltice și, recent, fabricarea prefabricatelor din beton. Compania operează 5 stații de betoane, la Cluj-Napoca, Sibiu, Deva și două în Alba Iulia. Deținerea integrală a unităților de producție și testare permite furnizarea materialelor de construcții la o calitate constant ridicată și la un preț competitiv.',
  },
  {
    title: 'Lucrări de construcții',
    body: 'Florea Grup este partenerul unora dintre cele mai mari proiecte de infrastructură din Transilvania: autostrada Sebeș-Turda, execuția liniei ferate Coșlariu–Vințu de Jos, drumul național DN1 sau tunelul de la Turdaș. Construcțiile civile și industriale fac parte din portofoliu: blocuri de locuințe în Alba, Sibiu, Deva și Cluj, hale industriale, proiecte turistice și platformele industriale Bosch Blaj și Daimler Sebeș.',
  },
  {
    title: 'Distribuție carburanți',
    body: 'De la stația de carburanți care a însemnat primul pas în antreprenoriat pentru Florea Grup, compania a ajuns astăzi la 10 stații de distribuție a carburanților în județul Alba: Alba Iulia, Șard, Zlatna, Câmpeni, Sântimbru, Aiud, Ocna Mureș, Mihalț, Blaj.',
  },
  {
    title: 'Servicii de taxi',
    body: 'Parcul auto Florea Taxi numără în prezent 25 de autoturisme proprii, care asigură transportul de persoane în Alba Iulia, dar și transferuri spre și dinspre aeroport sau destinații îndepărtate, prin aplicația Florea Taxi pe iOS și Android.',
  },
]

export function AboutPage() {
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
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">Despre Noi</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Despre Noi</p>
            <h1 className="heading-h1 mb-2">Florea Grup</h1>
            <p className="text-brand-500 text-lg font-semibold tracking-wide mb-4">30 de ani</p>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Petra Pavaje este parte a companiei Florea Grup.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="rounded-xl overflow-hidden mb-8">
              <img
                src={`${R2}/Cover-sustenabilitate.jpg`}
                alt="Fabrică Petra Pavaje"
                className="w-full h-auto"
                width="1960"
                height="980"
                loading="eager"
              />
            </div>

            <p className="font-semibold text-charcoal-900 mb-6">Marcel și David Florea, Fondatori Florea Grup</p>

            <blockquote className="border-l-4 border-brand-600 pl-6 py-2 mb-8 text-body-lg text-charcoal-700 italic leading-relaxed">
              „Pentru a crea un produs de calitate este nevoie de trei ingrediente: materie primă de calitate,
              tehnologie de top și know-how în domeniu. Toate aceste trei aspecte au fost luate în considerare
              atunci când am lansat Florea Pavaje și avem încredere că vom putea oferi clienților produse cu un
              raport preț-calitate atractiv."
            </blockquote>

            <div className="space-y-6 text-body-lg text-charcoal-600 leading-relaxed">
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
                Aceasta este povestea Petra: drumul de la materie primă, la element de bucurie în viața de zi cu zi.
              </p>
              <p>
                Petra Pavaje are în portofoliu peste 600 de produse, împărțite în mai multe game: pavaje premium,
                pavaje standard, borduri, rigole, bolțari și produse pentru grădină. Produsele premium trec printr-o
                serie de prelucrări care le înnobilează — spălarea, splitarea și antichizarea sunt doar o parte
                dintre aceste procese. Pentru a răspunde proiectelor de infrastructură, la fabrici există și linii
                de producție pentru elemente de canalizare, tuburi de beton și alte prefabricate destinate lucrărilor
                de infrastructură.
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mt-12 mb-6">
              Tehnologia modernă ne ajută să oferim produse deosebite
            </h2>
            <div className="space-y-6 mb-12">
              {TECH_ITEMS.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="w-2 h-2 rounded-full bg-brand-600 mt-2.5 shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal-900 mb-1.5">{item.title}</h3>
                    <p className="text-charcoal-600 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-6">Extinderea la nivel național</h2>
            <div className="space-y-6 text-body-lg text-charcoal-600 leading-relaxed mb-8">
              <p>
                În toamna anului 2019, compania Florea Grup a demarat lucrările la fabrica din Ploiești –
                Strejnicu. După ce în vara anului 2017 s-a lansat brandul Florea Pavaje, prin inaugurarea celei mai
                moderne fabrici de prefabricate din Transilvania, compania albaiuliană și-a extins activitatea și
                în zona de sud a țării, devenind un jucător important la nivel național.
              </p>
              <p>
                Investiția în acest proiect depășește 10 milioane Euro. Capacitatea fabricii este de 6.000 mp
                zilnic — această investiție dublează producția companiei, care, împreună cu fabrica din Alba Iulia,
                însumează o capacitate totală de 12.000 mp zilnic. Tehnologia folosită este de ultimă generație,
                dezvoltată în colaborare cu producători de top din Germania, iar fluxul tehnologic este integral
                automatizat pentru a asigura o calitate sporită a produselor.
              </p>
              <p>
                Unitatea de producție din Strejnicu are un Show Room de peste 5.500 mp, cel mai mare de acest gen
                din țară — oferind soluții estetice și practice pentru amenajările exterioare, clienților
                fiindu-le mult mai ușor să interacționeze vizual și tactil cu produsele.
              </p>
              <p>
                Cererea de pe piață este tot mai mare, iar noile fabrici răspund atât cerințelor persoanelor
                fizice, cât și ale dezvoltatorilor imobiliari și constructorilor de infrastructură rutieră. Toate
                produsele au garanție 5 ani și sunt însoțite de certificări CE și ISO.
              </p>
            </div>

            <blockquote className="border-l-4 border-brand-600 pl-6 py-2 mb-4 text-body-lg text-charcoal-700 italic leading-relaxed">
              „În cei aproape 25 de ani de activitate, am învățat că dezvoltarea unei afaceri trebuie să fie
              treptată, iar deciziile trebuie să fie calculate. Extinderea la nivel național vine într-o etapă de
              maturitate a companiei, când suntem convinși că experiența și know-how-ul în domeniu ne pot asigura
              competitivitate în această industrie. Fabrica va servi ca un hub deschis de inovație, unde vom lucra
              strâns cu colaboratorii și clienții noștri pentru a găsi cele mai bune soluții pentru proiectele lor."
            </blockquote>
            <p className="text-sm font-semibold text-charcoal-500 mb-12">– declară Marcel Florea, Director General.</p>

            <div className="rounded-xl overflow-hidden mb-12">
              <img
                src={`${R2}/2020-Extindere-la-nivel-national-printr-o-noua-unitate-de-productie-de-prefabricate-web.jpg`}
                alt="Extindere la nivel național"
                className="w-full h-auto"
                width="1000"
                height="730"
                loading="lazy"
              />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-6">Florea Grup</h2>
            <div className="space-y-6 text-body-lg text-charcoal-600 leading-relaxed mb-8">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {BUSINESS_CARDS.map((card) => (
                <div key={card.title} className="rounded-xl border border-charcoal-100 p-5 bg-white">
                  <h3 className="font-semibold text-charcoal-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-charcoal-600 leading-relaxed">{card.body}</p>
                </div>
              ))}
              <div className="sm:col-span-2 rounded-xl border border-brand-100 bg-brand-50/40 p-5">
                <h3 className="font-semibold text-brand-700 mb-2">Servicii turistice</h3>
                <p className="text-sm text-charcoal-600 leading-relaxed mb-3">
                  Prima investiție în turism a fost în anul 2008. Complexul turistic Astoria include 30 de camere
                  clasificate la 3*, o sală de evenimente cu peste 350 de locuri și un restaurant cu preparate
                  tradiționale, dar și cu specialități din bucătăria internațională. La 10 ani de la deschidere,
                  Astoria inaugurează un proiect unic pentru județul Alba: Astoria Pool Park — un complex acvatic
                  de agrement.
                </p>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  În anul 2015, Florea Grup a redeschis Hotel Transilvania, premiat un an mai târziu ca unul dintre
                  cele mai bune hoteluri independente de 4* din România. Situat în centrul orașului Alba Iulia,
                  hotelul include 80 de camere, un restaurant cu specific internațional, o terasă sezonieră, un
                  English Bar și două săli pentru conferințe.
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-6">Investițiile perioadei următoare</h2>
            <p className="text-body-lg text-charcoal-600 leading-relaxed mb-10">
              Investițiile perioadei următoare pentru Florea Grup se vor concentra pe dezvoltarea segmentului de
              prefabricate de beton. Fabricile Petra Pavaje funcționează ca huburi deschise de inovație în această
              industrie. Sprijiniți de partenerii noștri internaționali, căutăm mereu soluții pentru a răspunde cât
              mai bine cerințelor pieței — splitarea, antichizarea sau impermeabilizarea suprafețelor sunt doar
              câteva dintre îmbunătățirile aduse liniilor noastre de producție. Deținem la fiecare unitate de
              producție laboratoare proprii unde testăm constant materiile prime și produsele, pentru a le asigura
              o calitate sporită.
            </p>

            <p className="text-sm text-charcoal-500 pt-6 border-t border-charcoal-100">
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
