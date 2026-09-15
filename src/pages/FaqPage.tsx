import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, Search, X, MessageCircleQuestion, TriangleAlert } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

type FaqItem = { question: string; answer: string; category: string; warning?: string }

const CATEGORIES = [
  'Toate',
  'Despre Petra Pavaje',
  'Produse',
  'Comandă și Livrare',
  'Montaj și Întreținere',
  'Garanție și Suport',
  'Contact',
]

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Despre Petra Pavaje',
    question: 'Cine este Petra Pavaje și ce oferă?',
    answer:
      'Petra Pavaje este unul dintre cei mai mari producători de pavaje din România, cu peste 20 de ani de experiență în industrie. Oferim o gamă completă de produse pentru amenajări exterioare:\n• Pavaje Premium și Standard pentru alei, curți și terase\n• WoodStone - pavaje cu aspect de lemn pietrificat\n• Borduri și rigole pentru delimitări\n• Bolțari și garduri decorative\n• Jardiniere și bănci pentru grădini\n• Elemente de canalizare',
  },
  {
    category: 'Despre Petra Pavaje',
    question: 'De ce să aleg produsele Petra Pavaje? Care sunt avantajele?',
    answer:
      'Alegând Petra Pavaje, beneficiezi de:\n• Calitate superioară - produse certificate CE, testate pentru rezistență și durabilitate\n• Producție locală - 4 fabrici în România pentru timpi scurți de livrare\n• Varietate - peste 100 de modele, culori și dimensiuni\n• Garanție - 5 ani pentru toate produsele\n• Consultanță gratuită - echipă de specialiști pentru proiectul tău\n• Raport calitate-preț excelent',
  },
  {
    category: 'Despre Petra Pavaje',
    question: 'Unde sunt fabricate produsele Petra Pavaje?',
    answer:
      'Toate produsele Petra Pavaje sunt fabricate în România, în cele 4 fabrici proprii:\n• Fabrica Alba - Alba Iulia (Tel: +40 358 732 246)\n• Fabrica Prahova - Strejnicu (Tel: +40 244 704 342)\n• Fabrica Arad - Sat Horia (Tel: +40 731 190 939)\n• Fabrica Neamț - Simionești (Tel: +40 785 510 445)\nAceastă distribuție ne permite să acoperim eficient întreaga țară cu livrări rapide.',
  },
  {
    category: 'Despre Petra Pavaje',
    question: 'Petra Pavaje are acoperire națională? În ce județe activați?',
    answer:
      'Da, Petra Pavaje are acoperire națională completă. Livrăm produse în toate cele 41 de județe ale României și în București. Prin rețeaua noastră de 4 fabrici și parteneri logistici, asigurăm livrări rapide în orice zonă a țării.',
  },
  {
    category: 'Produse',
    question: 'Ce tipuri de pavaje oferim și care sunt diferențele principale între ele?',
    answer:
      'Oferim trei game principale de pavaje:\n• Premium - grosime 6-8 cm, finisaj superior, rezistență maximă, garanție 5 ani. Ideal pentru curți, terase, alei auto.\n• Standard - grosime 4-6 cm, raport calitate-preț excelent, garanție 5 ani. Perfect pentru alei pietonale și zone cu trafic redus.\n• WoodStone - aspect natural de lemn pietrificat, rezistență la intemperii, garanție 5 ani. Unic pe piață, combină estetica lemnului cu durabilitatea pietrei.',
  },
  {
    category: 'Produse',
    question: 'Din ce materiale sunt fabricate pavajele și cât de durabile sunt?',
    answer:
      'Pavajele Petra Pavaje sunt fabricate din beton vibropresant de înaltă calitate, compus din:\n• Ciment de înaltă rezistență\n• Agregate naturale selecționate (nisip, pietriș)\n• Pigmenți minerali pentru culori durabile\n• Aditivi pentru impermeabilizare și rezistență la îngheț\nDurabilitatea: produsele noastre rezistă la peste 200 de cicluri îngheț-dezgheț, au rezistență la abraziune clasa 4 și pot suporta sarcini de până la 80 tone/mp (gama Premium).',
  },
  {
    category: 'Produse',
    question: 'Ce dimensiuni și culori sunt disponibile pentru produse?',
    answer:
      'Oferim o gamă variată de dimensiuni și culori pentru toate categoriile de produse. Consultă catalogul nostru complet sau contactează un reprezentant pentru detalii specifice. Culorile principale includ: gri, antracit, roșu, galben, maro, negru, alb și diverse nuanțe mixate.',
  },
  {
    category: 'Produse',
    question: 'Produsele WoodStone sunt din lemn natural sau imită lemnul?',
    answer:
      'WoodStone este fabricat din beton special care imită perfect aspectul lemnului pietrificat. Avantajele față de lemnul natural:\n• Nu putrezește și nu necesită tratamente anuale\n• Rezistent la umiditate, îngheț și UV\n• Nu este atacat de insecte sau ciuperci\n• Durabilitate de peste 20 de ani\n• Mentenanță minimă\n• Aspect natural autentic cu textură și nuanțe realiste',
  },
  {
    category: 'Produse',
    question: 'Oferiți și alte produse în afară de pavaje?',
    answer:
      'Da, Petra Pavaje oferă o gamă completă de produse pentru amenajări exterioare:\n• Borduri și rigole - pentru delimitarea zonelor și scurgerea apelor\n• Bolțari și garduri - pentru împrejmuiri și ziduri decorative\n• Jardiniere și bănci - elemente decorative pentru grădini\n• Elemente de canalizare - capace, tuburi și cămine\n• Trepte și dale - pentru scări exterioare',
  },
  {
    category: 'Comandă și Livrare',
    question: 'Cum pot comanda produse Petra Pavaje?',
    answer:
      'Poți comanda produse Petra Pavaje prin mai multe modalități:\n• Online - completează formularul de pe site pentru o ofertă personalizată\n• Telefonic - contactează fabrica din zona ta\n• La sediu - vizitează unul dintre showroom-urile noastre\n• Prin distribuitori - rețeaua noastră de parteneri autorizați\nPentru comenzi mari sau proiecte speciale, recomandăm să soliciți o ofertă personalizată.',
  },
  {
    category: 'Comandă și Livrare',
    question: 'Ce metode de plată acceptați?',
    answer:
      'Acceptăm diverse metode de plată pentru flexibilitate maximă:\n• Transfer bancar\n• Plata în numerar la livrare (pentru comenzi sub o anumită valoare)\n• Card bancar\n• Plata în rate (pentru anumite comenzi, prin parteneri financiari)\nPentru detalii despre termenii de plată și eventuale facilități, contactează reprezentantul din zona ta.',
  },
  {
    category: 'Comandă și Livrare',
    question: 'Livrați produse în toată țara? Care sunt costurile și termenele?',
    answer:
      'Da, livrăm în toată România. Detalii importante:\n• Termene: 3-7 zile lucrătoare în funcție de stoc și locație\n• Costuri: variază în funcție de cantitate, distanță și accesibilitate\n• Transport gratuit: pentru comenzi peste o anumită valoare (solicită detalii)\n• Descărcare: cu macara sau manual, în funcție de locație\nCostul exact al livrării va fi calculat la momentul ofertei, ținând cont de specificul comenzii tale.',
  },
  {
    category: 'Comandă și Livrare',
    question: 'Pot returna paleții cu produse neutilizate?',
    answer:
      'Da. Paleții achiziționați împreună cu produsele și care au rămas complet neutilizați pot fi returnați. Politica se aplică exclusiv paleților originali, cu produsele pe ei, nu paleților goi.',
    warning: 'Returul unui palet cu produse neutilizate presupune un cost de retur de 75 lei/palet.',
  },
  {
    category: 'Comandă și Livrare',
    question: 'Pot solicita o ofertă de preț personalizată?',
    answer:
      'Absolut! Oferim consultanță gratuită și oferte personalizate pentru orice proiect. Pentru a primi o ofertă, poți:\n• Completa formularul de contact de pe site\n• Trimite un email cu detaliile proiectului\n• Suna la fabrica din zona ta\nPentru o ofertă cât mai precisă, pregătește: suprafața de pavat (mp), tipul de produs dorit, adresa de livrare și eventuale cerințe speciale.',
  },
  {
    category: 'Montaj și Întreținere',
    question: 'Petra Pavaje oferă servicii de montaj pentru produsele achiziționate?',
    answer:
      'Petra Pavaje colaborează cu o rețea de montatori profesioniști autorizați în toată țara. La cerere, putem recomanda echipe de montaj verificate și cu experiență în produsele noastre. De asemenea, oferim:\n• Ghiduri detaliate de montaj disponibile pe site\n• Consultanță tehnică gratuită\n• Modele de montaj și inspirație\n• Suport în calculul necesarului de materiale',
  },
  {
    category: 'Montaj și Întreținere',
    question: 'Ce unelte sunt necesare pentru montajul pavajelor?',
    answer:
      'Pentru un montaj corect ai nevoie de: roabă, lopeți, târnăcop și greblă pentru pregătirea solului, placă vibrantă (cu piesă de prelungire din cauciuc), țevi profilate și dreptar din aluminiu pentru nivelarea nisipului, ciocan de cauciuc pentru fixarea pavajelor, polizor sau ghilotină pentru tăierea marginilor și bordurilor, mătură pentru umplerea rosturilor, plus nivelă și teodolit pentru cote și aliniamente. Ghidul complet, pas cu pas, este disponibil pe pagina Montaj.',
  },
  {
    category: 'Montaj și Întreținere',
    question: 'Ce grosime trebuie să aibă stratul suport sub pavaj?',
    answer:
      'Grosimea stratului de balast sau piatră concasată depinde de tipul de trafic: minim 15 cm pentru căi de acces pietonal, minim 20 cm pentru traficul de autoturisme și minim 30 cm în cazul traficului intens și greu (camioane). Suprafața finală trebuie să aibă o înclinație de minim 2-2,5% pentru evacuarea corectă a apei.',
  },
  {
    category: 'Montaj și Întreținere',
    question: 'Există modele vizuale de montaj pentru inspirație?',
    answer:
      'Da, pe pagina Modele de Montaj găsești o galerie cu peste 15 modele de așezare a pavelelor, pentru dimensiuni variate (10x10, 20x10, 20x20, 30x20, 30x30, 40x40, 60x30) și combinații Mix, fiecare cu schema detaliată de montaj și zona repetabilă evidențiată.',
  },
  {
    category: 'Montaj și Întreținere',
    question: 'Cum se întrețin corect pavajele pentru a le menține aspectul?',
    answer:
      'Întreținerea corectă asigură durabilitatea și aspectul estetic al pavajelor:\n• Curățare regulată - măturare și spălare cu apă\n• Îndepărtarea petelor - cu detergent neutru, fără acizi\n• Combaterea mușchiului - produse speciale anti-mușchi\n• Refacerea rosturilor - completare cu nisip după necesitate\n• Sigilare opțională - pentru protecție suplimentară\nConsultă Ghidul de Întreținere pentru instrucțiuni detaliate.',
  },
  {
    category: 'Montaj și Întreținere',
    question: 'Ce produse recomandați pentru curățarea și protecția pavajului?',
    answer:
      'În pagina Ghid Întreținere recomandăm 6 produse profesionale: Anti-Mucegai (elimină mucegai, igrasie, alge, mușchi), Detergent Alcalin Profesional (pete de ulei, smog, cauciuc), Impregnant cu Efect Umed și Impregnant cu Efect Natural (protecție și impermeabilizare), Anti-Eflorescență (pete albe de ciment) și Anti-Rugină (pete de rugină). Fiecare produs are mod de aplicare și acoperire proprii, detaliate pe pagină.',
  },
  {
    category: 'Montaj și Întreținere',
    question: 'Cum se realizează degivrarea pavajelor iarna?',
    answer:
      'Pentru degivrare sigură și eficientă a pavajelor:\n• Recomandăm: nisip, pietriș fin, clorură de calciu în cantități moderate\n• Evitați: sare în cantități mari, care poate deteriora suprafața în timp\n• Îndepărtare zăpadă: lopată de plastic, nu metalică\n• Preventiv: aplicarea de soluții anti-îngheț înainte de ninsoare\nProdusele Petra Pavaje sunt testate pentru rezistență la îngheț-dezgheț, dar întreținerea corectă prelungește durata de viață.',
  },
  {
    category: 'Montaj și Întreținere',
    question: 'Ce este un sistem de degivrare automat și cum funcționează?',
    answer:
      'Un sistem automat de degivrare folosește un termostat inteligent care, prin senzori exteriori de temperatură și umiditate, detectează când suprafața riscă să înghețe sau când se depune zăpadă, și comandă automat încălzirea cablului montat sub pavaj. Este folosit frecvent la rampe de acces auto, platforme de încărcare, trotuare și alte căi de acces, pentru a preveni derapajul și accidentele provocate de polei. Detalii pe pagina Degivrare.',
  },
  {
    category: 'Garanție și Suport',
    question: 'Ce fel de garanție oferiți pentru produsele Petra Pavaje?',
    answer:
      'Oferim garanție 5 ani pentru toate produsele noastre:\n• Pavaje Premium - garanție 5 ani\n• WoodStone - garanție 5 ani\n• Pavaje Standard - garanție 5 ani\n• Borduri și rigole - garanție 5 ani\n• Alte produse - garanție 5 ani\nGaranția acoperă defecte de fabricație și include înlocuirea gratuită a produselor defecte, conform condițiilor din certificatul de garanție.',
  },
  {
    category: 'Garanție și Suport',
    question: 'Cum procedez dacă am o problemă cu un produs achiziționat?',
    answer:
      'În cazul unei probleme cu produsele achiziționate:\n• Pasul 1: Contactează fabrica de unde ai achiziționat produsele\n• Pasul 2: Descrie problema și trimite fotografii relevante\n• Pasul 3: Echipa noastră va analiza situația și va propune o soluție\n• Pasul 4: Implementarea soluției (înlocuire, remediere, compensare)\nNe angajăm să răspundem în maximum 48 de ore lucrătoare și să găsim cea mai bună soluție pentru tine.',
  },
  {
    category: 'Contact',
    question: 'Cum pot contacta Petra Pavaje pentru întrebări sau consultanță?',
    answer:
      'Ne poți contacta prin multiple canale:\n• Fabrica Alba: +40 358 732 246\n• Fabrica Prahova: +40 244 704 342\n• Fabrica Arad: +40 731 190 939\n• Fabrica Neamț: +40 785 510 445\nSau completează formularul de contact de pe pagina de Contact. Program: Luni-Vineri 08:00-17:00.',
  },
  {
    category: 'Contact',
    question: 'Aveți showroom-uri unde pot vedea produsele fizic?',
    answer:
      'Da, la fiecare dintre cele 4 fabrici avem showroom-uri unde poți vedea și atinge produsele noastre. Vizitele sunt binevenite în programul de lucru (Luni-Vineri 08:00-17:00). De asemenea, poți face un tur virtual al fabricilor noastre direct de pe site.',
  },
  {
    category: 'Contact',
    question: 'Există un catalog de produse pe care îl pot descărca sau consulta?',
    answer:
      'Desigur! Catalogul complet Petra Pavaje este disponibil în format digital pe site-ul nostru. Poți:\n• Vizualiza online - catalog interactiv cu zoom și navigare facilă\n• Descărca PDF - pentru consultare offline\n• Solicita catalog tipărit - prin completarea unui formular\nAccesează pagina Catalog pentru toate opțiunile disponibile.',
  },
]

export function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('Toate')
  const [searchQuery, setSearchQuery] = useState('')
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'Toate' || item.category === activeCategory
      const matchesQuery =
        !query || item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, searchQuery])

  const toggleQuestion = (question: string) => {
    setOpenQuestions((prev) => {
      const next = new Set(prev)
      if (next.has(question)) next.delete(question)
      else next.add(question)
      return next
    })
  }

  const openAll = () => setOpenQuestions(new Set(filtered.map((f) => f.question)))
  const closeAll = () => setOpenQuestions(new Set())

  useEffect(() => {
    const url = `${window.location.origin}/faq`
    const title = `Întrebări Frecvente (FAQ) | ${SEO_SITE_NAME}`
    const description =
      'Găsește rapid răspunsuri la cele mai comune întrebări despre produsele, montajul, întreținerea, comenzile și garanția Petra Pavaje.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: (f.warning ? `${f.answer} ${f.warning}` : f.answer).replace(/\n/g, ' '),
        },
      })),
    })

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Întrebări frecvente', item: url },
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
              <span className="text-white">Întrebări frecvente</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Centru de ajutor</p>
            <h1 className="heading-h1 mb-4 max-w-3xl">Întrebări Frecvente</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Găsește rapid răspunsuri la cele mai comune întrebări despre produsele, serviciile și procesele Petra
              Pavaje.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative mb-6">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Caută o întrebare..."
                className="w-full pl-11 pr-10 py-3 rounded-xl border border-charcoal-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-charcoal-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
                  aria-label="Șterge căutarea"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-brand-600 text-white'
                      : 'bg-charcoal-50 text-charcoal-600 hover:bg-charcoal-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-charcoal-500">
                Se afișează {filtered.length} {filtered.length === 1 ? 'întrebare' : 'întrebări'}
              </p>
              <div className="flex gap-3">
                <button onClick={openAll} className="text-sm font-medium text-brand-600 hover:underline">
                  Deschide toate
                </button>
                <button onClick={closeAll} className="text-sm font-medium text-charcoal-500 hover:underline">
                  Închide toate
                </button>
              </div>
            </div>
          </motion.div>

          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((item) => {
                const isOpen = openQuestions.has(item.question)
                return (
                  <div key={item.question} className="bg-white rounded-xl border border-charcoal-100 overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(item.question)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <div>
                        <span className="text-xs font-semibold tracking-[0.1em] uppercase text-brand-600 block mb-1">
                          {item.category}
                        </span>
                        <span className="font-semibold text-charcoal-900">{item.question}</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-charcoal-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5">
                        <p className="text-sm text-charcoal-600 leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </p>
                        {item.warning && (
                          <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
                            <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{item.warning}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-charcoal-500 mb-2">Nu am găsit rezultate.</p>
              <p className="text-charcoal-400 text-sm">Încearcă alți termeni de căutare sau contactează-ne direct.</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 rounded-xl bg-charcoal-50 p-8 md:p-10 text-center"
          >
            <MessageCircleQuestion className="w-8 h-8 text-brand-600 mx-auto mb-3" />
            <h2 className="text-xl font-semibold text-charcoal-900 mb-2">Nu ai găsit răspunsul?</h2>
            <p className="text-charcoal-500 mb-6">Echipa noastră de specialiști este pregătită să te ajute cu orice întrebare.</p>
            <Link to="/contact" className="btn-primary">
              Contactează-ne
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
