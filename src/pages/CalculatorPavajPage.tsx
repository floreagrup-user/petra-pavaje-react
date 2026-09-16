import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'
import { PavingCalculator } from '@/components/calculator/PavingCalculator'

const FAQ_ITEMS = [
  {
    question: 'Cum calculez câți metri pătrați de pavaj îmi trebuie?',
    answer:
      'Măsoară lungimea și lățimea suprafeței (sau al zonelor, dacă sunt mai multe) și înmulțește-le pentru a obține metrii pătrați. Calculatorul face automat acest calcul și adaugă procentul de pierderi ales, apoi rotunjește la un număr întreg de paleți.',
  },
  {
    question: 'Cât pavaj trebuie să comand în plus?',
    answer:
      'Recomandăm 5% pierderi pentru montaj simplu (drept, fără multe tăieturi). Pentru suprafețe cu colțuri, forme neregulate sau montaj în unghi, alege 7-10% pentru a avea suficient material pentru debitări.',
  },
  {
    question: 'Câte bucăți de pavaj sunt necesare pentru un metru pătrat?',
    answer:
      'Depinde de format -- fiecare produs are propriul număr de bucăți/m², afișat automat în calculator odată ce alegi produsul și formatul. Pentru modelele Mix, cantitatea se calculează direct la m², fără un număr fix de bucăți per format.',
  },
  {
    question: 'Cum aflu câți paleți trebuie să comand?',
    answer:
      'Calculatorul împarte necesarul total (cu pierderi incluse) la câți m² (sau ml, pentru borduri) încap pe un palet și rotunjește în sus la un palet întreg, pentru că un palet nu poate fi comandat parțial.',
  },
  {
    question: 'Ce se întâmplă dacă suprafața are o formă neregulată?',
    answer:
      'În modul avansat poți alege forme precum triunghi, cerc sau semicerc, sau poți introduce direct suprafața în m² dacă ai măsurătoarea deja. Poți combina mai multe forme adăugând zone separate, iar calculatorul le însumează.',
  },
  {
    question: 'Pot calcula și bordurile?',
    answer:
      'Da -- secțiunea "Borduri și delimitări" din calculator acoperă borduri, garduri, palisadă și alte elemente liniare. Introduci lungimea totală în metri liniari și calculatorul afișează bucățile și paleții necesari.',
  },
  {
    question: 'Calculatorul include pierderile de tăiere?',
    answer:
      'Da, procentul de pierderi ales (implicit 5%) este aplicat înainte de rotunjirea la paleți întregi, deci acoperă atât riscurile de debitare, cât și rezervele pentru eventuale reparații ulterioare.',
  },
  {
    question: 'Rezultatul calculatorului este o cantitate finală de comandă?',
    answer:
      'Este o estimare orientativă bazată pe datele tehnice reale ale produselor. Pentru comanda finală recomandăm confirmarea împreună cu un specialist Petra Pavaje, mai ales pentru proiecte cu forme complexe sau trafic auto.',
  },
]

export function CalculatorPavajPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const url = `${window.location.origin}/calculator-pavaj`
    const title = `Calculator Pavaj – Calculează Necesarul de Pavaj | ${SEO_SITE_NAME}`
    const description =
      'Calculează rapid necesarul de pavaj pentru proiectul tău. Alege produsul, introdu suprafața, pierderile și află cantitatea estimată și numărul de paleți.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/calculator-pavaj', '/en/calculator-pavaj')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Resurse', item: `${window.location.origin}/catalog` },
        { '@type': 'ListItem', position: 3, name: 'Calculator Pavaj', item: url },
      ],
    })

    upsertJsonLd('faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })

    return resetSEO
  }, [])

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-14 md:py-16">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6" aria-label="breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <Link to="/catalog" className="hover:text-white transition-colors">Resurse</Link>
              <span>/</span>
              <span className="text-white">Calculator Pavaj</span>
            </nav>
            <h1 className="heading-h1 mb-4">Calculator Pavaj</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Alege produsul, introdu suprafața proiectului tău și află imediat cantitatea estimată de pavaj și numărul
              de paleți, calculate din datele tehnice reale ale produselor Petra Pavaje.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-charcoal-50">
        <div className="container-premium">
          <PavingCalculator />
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="container-premium max-w-3xl">
          <h2 className="heading-h2 text-charcoal-900 mb-8">Ghid rapid de utilizare</h2>
          <div className="space-y-8 text-body text-charcoal-600 leading-relaxed">
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-2">Cum se calculează necesarul de pavaj?</h3>
              <p>
                Suprafața proiectului (lungime × lățime, sau suma mai multor zone) se înmulțește cu numărul de bucăți
                sau cu m²/palet ale formatului ales, iar rezultatul se rotunjește la un număr întreg de paleți --
                pentru că un palet nu se poate comanda fracționat.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-2">Ce procent de pierderi trebuie luat în calcul?</h3>
              <p>
                Implicit recomandăm 5%, suficient pentru un montaj drept, cu tăieturi minime. Pentru suprafețe cu
                colțuri multiple, forme neregulate sau montaj în unghi, un procent de 7-10% reduce riscul de a rămâne
                fără material la final.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-2">Cum se calculează numărul de paleți?</h3>
              <p>
                Necesarul total (cu pierderi incluse) se împarte la câți m² sau metri liniari încap pe un palet,
                conform datelor tehnice ale produsului, iar rezultatul se rotunjește întotdeauna în sus.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-2">Cum alegi cantitatea potrivită de pavaj?</h3>
              <p>
                Pornește de la suprafața reală măsurată la fața locului, alege formatul potrivit tipului de trafic
                (pietonal, ușor sau greu) și lasă calculatorul să stabilească atât necesarul teoretic, cât și
                cantitatea comercială rotunjită la paleți întregi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-charcoal-50">
        <div className="container-premium max-w-3xl">
          <h2 className="heading-h2 text-charcoal-900 mb-8">Întrebări frecvente</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <div key={item.question} className="bg-white rounded-xl border border-charcoal-100 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-charcoal-900">{item.question}</span>
                    <ChevronDown className={`w-5 h-5 text-charcoal-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <p className="px-5 pb-5 text-sm text-charcoal-600 leading-relaxed">{item.answer}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
