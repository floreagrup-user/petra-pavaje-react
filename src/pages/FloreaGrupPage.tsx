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
    title: 'Înființare Florea Grup',
    body: 'Spiritul antreprenorial al celor doi frați, Marcel și David, a fost moștenit din familie. Era așadar o chestiune de timp până când a fost rândul lor să pună bazele unei mici afaceri, iar asta s-a întâmplat în anul 1996, în Alba Iulia. Pentru doi tineri de sub 25 de ani, a părut o idee ambițioasă, dar munca și perseverența i-au adus unde sunt astăzi.',
    image: `${R2}/1996-Infiintare-Florea-Grup-web.jpg`,
    alt: 'Înființare Florea Grup 1996',
  },
  {
    year: '1997',
    title: 'Prima stație de carburanți Florea Oil',
    body: 'La ieșirea din Alba Iulia, în localitatea Sântimbru, a fost locația primei stații de carburanți Florea Oil. Astăzi, rețeaua Florea Oil numără 10 stații de carburanți, pe tot teritoriul județului Alba, mai exact în Alba Iulia, Blaj, Ocna Mureș, Aiud, Câmpeni, Sântimbru, Mihalț, Zlatna și Șard. Stațiile sunt prezente inclusiv în zone rurale, ceea ce aduce un ajutor important agriculturii și turismului din zonă.',
    image: `${R2}/1997-Prima-statie-de-carburanti-Florea-Oil-web.jpg`,
    alt: 'Prima stație de carburanți Florea Oil 1997',
  },
  {
    year: '1998',
    title: 'Cifra de afaceri atinge 1 milion Euro',
    body: 'Cu un trend ascendent încă de la înființare, Florea Grup atinge cifra de afaceri de 1 milion de Euro în doar doi ani de la debut. Pe lângă activitatea de distribuție a carburanților, compania desfășoară și proiecte în domeniul construcțiilor, acesta ajungând să fie domeniul de bază pentru anii care vor urma.',
    image: `${R2}/1998-Cifra-de-afaceri-atinge-1-milion-Euro-web.jpg`,
    alt: 'Cifra de afaceri atinge 1 milion Euro',
  },
  {
    year: '2003',
    title: 'Înființare Florea Taxi',
    body: 'Anul 2003 înseamnă o nouă etapă în dezvoltarea companiei, care începe să opereze și în domeniul transportului de persoane. Florea Taxi urmează să fie una dintre cele mai inovative companii de taxi din Alba Iulia, fiind prima care lansează o aplicație pentru mobil, iar mai târziu adăugând în flota sa mașini hibride, care reduc amprenta de dioxid de carbon cu până la 90% față de un autoturism care funcționează cu combustibili fosili.',
    image: `${R2}/2003-Infiintare-Florea-Taxi-web.jpg`,
    alt: 'Înființare Florea Taxi 2003',
  },
  {
    year: '2006',
    title: 'Prima stație de betoane în Alba Iulia',
    body: 'Stația de betoane de la Alba Iulia este integrată într-un complex de producție a materialelor de construcții de unde se pot livra, pe lângă toate sortimentele standardizate de betoane, șape și mortare, mixturi asfaltice și agregate minerale naturale și concasate, sortate și spălate. Anii care au urmat au adus cu ei inaugurarea unor noi stații în județele învecinate: Cluj, Sibiu și Hunedoara.',
    image: `${R2}/2006-Prima-statie-de-betoane-in-Alba-Iulia-web.jpg`,
    alt: 'Prima stație de betoane în Alba Iulia 2006',
  },
  {
    year: '2008',
    title: 'Inaugurare Hotel Astoria Alba Iulia',
    body: 'Stil, rafinament, lux, eleganță, servicii prompte, discrete și de calitate – așa se poate descrie în câteva cuvinte hotelul Astoria Alba Iulia. Așezat într-o zonă liniștită, locația a devenit cunoscută pentru spațiile verzi generoase care înconjoară clădirea, pentru terasa liniștită și, nu în ultimul rând, pentru restaurantul și ballroom-ul care poate găzdui evenimente de până la 350 de persoane.',
    image: `${R2}/2008-Inaugurare-Hotel-Astoria-Alba-Iulia-web.jpg`,
    alt: 'Inaugurare Hotel Astoria Alba Iulia 2008',
  },
  {
    year: '2011',
    title: 'Inaugurare fabrică de asfalt',
    body: 'Activitatea în construcții a fost susținută de investiția într-o fabrică modernă pentru prepararea și producția de mixturi asfaltice. Calitatea acestor materiale respectă normele naționale și europene, fiind folosite ca materii prime atât pentru lucrările proprii ale companiei, cât și pentru terți.',
    image: `${R2}/2011-Inaugurare-fabrica-de-asfalt-web.jpg`,
    alt: 'Inaugurare fabrică de asfalt 2011',
  },
  {
    year: '2013',
    title: 'Compania ajunge la 500 angajați',
    body: 'Odată cu dezvoltarea domeniilor de activitate, compania a crescut și numeric. Pragul de 500 de angajați a fost atins în 2013. De la casieri și agenți de curățenie, la directori și manageri de top, fiecare și-a adus aportul în a face din Florea Grup compania care este astăzi.',
    image: `${R2}/2013-Compania-ajunge-la-500-angajati-web.jpg`,
    alt: 'Compania ajunge la 500 angajați 2013',
  },
  {
    year: '2014',
    title: 'Cariera de piatră Almaș',
    body: 'Cariera de piatră din Munții Apuseni asigură controlul integral al fluxului de producție, începând cu etapa de extragere a pietrei. Acest lucru dă oportunitatea unui proces de fabricație controlat, cu produse finite de cea mai bună calitate.',
    image: `${R2}/2014-Cariera-de-piatra-Almas-web.jpg`,
    alt: 'Cariera de piatră Almaș 2014',
  },
  {
    year: '2015',
    title: 'Deschidere Hotel Transilvania',
    body: 'După un proces de reabilitare care a durat 2 ani, Hotel Transilvania și-a redeschis porțile ca o locație de lux în centrul municipiului Alba Iulia. Hotel Transilvania a fost laureat la Gala Top Hotel Awards din 2016 și 2018 ca unul dintre cele mai bune hoteluri independente de 4* din România și a ocupat prima poziție în cadrul ETravel Awards din 2017.',
    image: `${R2}/2015-Deschidere-Hotel-Transilvania-web.jpg`,
    alt: 'Deschidere Hotel Transilvania 2015',
  },
  {
    year: '2017',
    title: 'Inaugurare Florea Pavaje',
    body: 'Pe data de 5 iunie 2017, compania lansează divizia de prefabricate de beton, sub numele de Florea Pavaje, în urma unei investiții de 10 milioane de Euro. Acest lucru a transformat Florea Grup într-una dintre puținele firme de construcții din România care își produce principalele materii prime ce intră în componența drumurilor.',
    image: `${R2}/2017-Inaugurare-Florea-Pavaje-web.jpg`,
    alt: 'Inaugurare Florea Pavaje 2017',
  },
  {
    year: '2018',
    title: 'Deschidere Astoria Pool Park',
    body: 'La aniversarea a 10 ani de la inaugurarea Hotelului Astoria, complexul devine și mai atractiv prin cel mai nou și modern parc acvatic din Alba Iulia. Piscina, cu suprafață de 336 mp, are apa încălzită. Cea mai așteptată surpriză au fost cele două tobogane, unul de viteză, de 20 metri, iar altul care șerpuiește pe o lungime de 60 metri.',
    image: `${R2}/2018-Deschidere-Astoria-Pool-Park-web.jpg`,
    alt: 'Deschidere Astoria Pool Park 2018',
  },
  {
    year: '2020',
    title: 'Extindere la nivel național printr-o nouă unitate de producție de prefabricate',
    body: 'Inaugurarea fabricii Petra Pavaje de la Ploiești a însemnat extinderea la nivel național a companiei, cu un Show Room de peste 5.500 mp, cel mai mare de acest gen din țară. Compania a alocat resurse și campaniei de rebranding, produsele fiind comercializate acum sub numele de „Petra Pavaje".',
    image: `${R2}/2020-Extindere-la-nivel-national-printr-o-noua-unitate-de-productie-de-prefabricate-web.jpg`,
    alt: 'Extindere la nivel național 2020',
  },
  {
    year: '2021',
    title: 'Inaugurare Petra Pavaje Arad',
    body: 'La 23 septembrie 2021 a fost inaugurată a treia fabrică Petra Pavaje, situată în comuna Vladimirescu, județul Arad, în urma unei investiții de peste 10 milioane de euro. Unitatea are o capacitate de 6.000 mp/zi și produce pavaje, borduri și elemente pentru grădină, certificate CE și ISO, asigurând 70 de locuri de muncă.',
    image: `${R2}/petra-pavaje-arad-1.avif`,
    alt: 'Petra Pavaje Arad 2021',
  },
  {
    year: '2022',
    title: 'Inaugurare Petra Pavaje Roman',
    body: 'În 2022 a fost inaugurată la Roman cea de-a patra fabrică de prefabricate din beton Petra Pavaje, o investiție de peste 10 milioane de euro care a consolidat poziția Florea Grup ca fiind compania cu cea mai rapidă expansiune din domeniul materialelor de construcții, ridicând investițiile totale la peste 40 de milioane de euro.',
    image: `${R2}/fabrica-neamt-petra-pavaje.avif`,
    alt: 'Fabrica Petra Pavaje Roman Neamț 2022',
  },
]

export function FloreaGrupPage() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05 })

  useEffect(() => {
    const url = `${window.location.origin}/florea-grup`
    const title = `Florea Grup - 30 de ani | ${SEO_SITE_NAME}`
    const description =
      'Florea Grup împlinește 30 de ani. Descoperă povestea companiei, momentele importante din istoria firmei și planurile pentru viitor.'

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
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Compania', item: `${window.location.origin}/compania` },
        { '@type': 'ListItem', position: 3, name: 'Florea Grup – 30 de ani', item: url },
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
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <Link to="/compania" className="hover:text-white transition-colors">Compania</Link>
              <span>/</span>
              <span className="text-white">Florea Grup – 30 de ani</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Aniversare</p>
            <h1 className="heading-h1 mb-2">Florea Grup</h1>
            <p className="text-brand-500 text-2xl font-bold tracking-wide">30 de ani</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden"
          >
            <img
              src={`${R2}/timeline-petra.avif`}
              alt="30 de ani Florea Grup"
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
              Anul acesta, Florea Grup, sub umbrela căreia brandul Petra Pavaje operează, împlinește 30 de ani. Trei
              decenii de când s-au pus bazele afacerii care a ajuns astăzi una dintre cele mai importante companii
              din România.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">
              O evoluție bazată pe integrare verticală și inovații
            </h2>
            <div className="space-y-5 text-body-lg text-charcoal-600 leading-relaxed mb-10">
              <p>
                Povestea Florea Grup a început odată cu deschiderea primei stații de carburanți auto. De aici,
                compania și-a extins treptat activitatea în domeniul construcțiilor. În 2005 a intrat în producția
                de betoane, iar ulterior a devenit antreprenor în construcții civile și industriale. De-a lungul
                anilor, Florea Grup s-a implicat în reabilitarea unor drumuri naționale și județene, dar și în
                dezvoltarea unor proiecte de anvergură: autostrăzi, platforme industriale sau centre comerciale.
              </p>
              <p>
                Sub umbrela Florea Grup funcționează astăzi și brandul <em>Petra Pavaje</em>, specializat în
                producția de pavaje și prefabricate din beton, cu patru fabrici situate strategic la nivel național
                — în Alba Iulia, Ploiești, Arad și Roman (județul Neamț), precum și depozite în Cluj Napoca, Sibiu
                și Deva. Această dezvoltare a fost recunoscută ca cea mai rapidă expansiune a unei companii în
                domeniul materialelor de construcții, Florea Grup devenind rapid unul dintre cei mai importanți
                producători de pe piață.
              </p>
              <p>
                Strategia de integrare pe verticală pe care compania a adoptat-o implică investiții în întreg fluxul
                de producție: de la cariera proprie care asigură extracția materiei prime, la stații de sortare și
                cele patru linii de producție a prefabricatelor de beton. În plus, Florea Grup asigură, prin flota
                de autoutilitare proprii, serviciile logistice aferente acestei industrii.
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">Turism și servicii integrate</h2>
            <div className="space-y-5 text-body-lg text-charcoal-600 leading-relaxed mb-10">
              <p>
                Pe lângă activitățile industriale și de construcții, Florea Grup a dezvoltat și un portofoliu în
                sectorul ospitalității, deținând Hotel Transilvania, Hotel Astoria și Hotel Cetate din Alba Iulia.
                Pe lângă spațiile de cazare, aceste hoteluri oferă și facilități complementare pentru turiști,
                asigurând un pachet complet de servicii: restaurante, terase, săli de conferință și un centru de
                agrement cu terenuri de sport și parc acvatic.
              </p>
              <p>
                Hotelurile din portofoliul Florea Grup au fost prima alegere pentru mulți turiști, dar sunt totodată
                etalon pentru calitate și ospitalitate, obținând prestigioase trofee la competiții precum „Top Hotel
                Awards" sau „eTravel Awards".
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">Florea Grup pentru comunitate</h2>
            <div className="space-y-5 text-body-lg text-charcoal-600 leading-relaxed mb-10">
              <p>
                De peste trei decenii, compania susține inițiative de responsabilitate socială și mediu. Florea Grup
                deține una dintre cele mai numeroase flote de autoturisme integral electrice din România, stații de
                încărcare electrice, precum și 7 parcuri fotovoltaice proprii care asigură până la 45% din
                autonomia energetică a respectivelor puncte de lucru. „În armonie cu natura" este o marcă
                înregistrată a companiei, iar un proiect de referință a fost campania de plantare a 42.000 de
                puieți pe o suprafață de 9 hectare în județul Alba.
              </p>
              <p>
                Implicarea în comunitate înseamnă însă mai mult decât reducerea amprentei de carbon. Florea Grup
                este un partener de practică important pentru instituțiile de învățământ liceal și universitar,
                oferind stagii de practică și workshopuri interactive. Mai mult, compania susține activități
                sportive, organizând sau susținând competiții de ciclism, alergare, tenis de câmp sau volei.
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">O companie despre oameni</h2>
            <p className="text-body-lg text-charcoal-600 leading-relaxed mb-6">
              Florea Grup și companiile din grupul său înseamnă asigurarea a peste 800 de locuri de muncă,
              parteneriate etice și condiții de lucru corecte.
            </p>

            <blockquote className="border-l-4 border-brand-600 pl-6 py-2 mb-4 text-body-lg text-charcoal-700 italic leading-relaxed">
              „Acești 30 de ani reprezintă pentru noi confirmarea unei viziuni îndrăznețe și a muncii susținute de
              către o echipă extraordinară. Florea Grup este o poveste scrisă de către fiecare angajat, prin
              cunoștințele pe care le-a adus, ideile și implicarea sa. Privim spre viitor cu optimism și continuăm
              să susținem valorile care ne definesc: inovație, calitate și responsabilitate față de clienți,
              parteneri și comunitate."
            </blockquote>
            <p className="text-sm font-semibold text-charcoal-500">– a declarat Marcel Florea, CEO Florea Grup</p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="py-16 md:py-24 bg-charcoal-50">
        <div className="container-premium max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Istoric</p>
            <h2 className="heading-h2 text-charcoal-900 mb-4">Momente importante din istoria firmei</h2>
            <p className="text-body-lg text-charcoal-500 max-w-2xl mx-auto">
              Cei 30 de ani au strâns multe momente care merită menționate. Unele au impact din punct de vedere
              economic, altele au fost evenimente care au întărit echipa sau au consolidat procesele de lucru.
              Cele mai importante dintre ele sunt rezumate mai jos.
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
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-6">Planuri pentru viitor</h2>
            <div className="space-y-5 text-body-lg text-charcoal-600 leading-relaxed mb-8">
              <p>
                Dezvoltarea companiei a fost una organică, în care fiecare etapă a venit să completeze o afacere
                deja consolidată. Chiar dacă planurile de dezvoltare au fost intens analizate, de cele mai multe ori
                au existat factori neașteptați. Deciziile de dezvoltare au fost chibzuite și îndrăznețe în același
                timp.
              </p>
              <p>
                Stabilitatea companiei a fost întotdeauna un factor important în momentul unei noi investiții. Dar
                poate și mai important a fost know-how-ul, adică expertiza în domeniu — un avantaj competitiv
                incontestabil, dată fiind experiența de 30 de ani pe care Florea Grup a dobândit-o. Dar cel mai
                important factor care asigură dezvoltarea este echipa care stă în spatele unui brand: pasiunea pe
                care ei o pun în muncă și sinergia care se creează între membrii ei.
              </p>
              <p>
                Toate acestea creează premisele unei creșteri durabile, pe care Florea Grup și-a propus-o pentru
                următorii ani. Principala direcție de dezvoltare va rămâne sectorul construcțiilor, atât prin
                lucrările de infrastructură, cât și prin divizia de prefabricate de beton — obiectivul fiind
                întărirea poziției de jucător național în piața construcțiilor.
              </p>
              <p>
                Investițiile perioadei următoare se vor concentra pe dezvoltarea segmentului de prefabricate de
                beton. Fabricile Petra Pavaje funcționează ca huburi deschise de inovație în această industrie.
                Splitarea, antichizarea sau impermeabilizarea suprafețelor sunt doar câteva dintre îmbunătățirile
                aduse liniilor noastre de producție. Deținem la fiecare unitate de producție laboratoare proprii
                unde testăm constant materiile prime și produsele, pentru a le asigura calitate sporită.
              </p>
            </div>

            <blockquote className="border-l-4 border-brand-600 pl-6 py-2 text-body-lg text-charcoal-700 italic leading-relaxed">
              Florea Grup mulțumește tuturor angajaților, clienților și partenerilor care au fost alături în acest
              sfert de secol și pentru că ați oferit oportunitatea de a demonstra că împreună se pot face proiecte
              de succes! Fie ca anii ce vor urma să aducă în continuare o colaborare cât mai prosperă!
            </blockquote>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
