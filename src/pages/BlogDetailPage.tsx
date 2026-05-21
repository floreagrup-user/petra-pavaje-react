import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, User } from 'lucide-react'
import type { BlogPost } from '@/data/types'

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Cum să alegi pavajul perfect pentru curtea ta',
    slug: 'cum-sa-alegi-pavajul-perfect',
    excerpt: 'Ghid complet pentru alegerea pavajului potrivit în funcție de tipul de trafic, designul dorit și bugetul disponibil.',
    content: `Alegerea pavajului perfect pentru curtea ta este o decizie importantă care influențează atât aspectul estetic, cât și funcționalitatea spațiului tău exterior.

## 1. Stabilește scopul amenajării

Înainte de a alege un pavaj, gândește-te la destinația spațiului:

- **Aleea principală** – trafic pietonal intens, necesită pavaj rezistent
- **Terasă** – zonă de relaxare, contează aspectul estetic
- **Parcare** – trafic auto, necesită pavaj de 8cm grosime
- **Gradină** – zonă decorativă, poți alege modele premium

## 2. Alege tipul de pavaj

### Pavaje Premium
Sunt recomandate pentru zone unde aspectul estetic este prioritar. Procesele de splălare, splitare și antichizare le oferă un aspect deosebit.

### Pavaje Standard
Oferă un raport calitate-preț excelent și sunt potrivite pentru zone cu trafic intens sau proiecte mari.

## 3. Considerente practice

- **Grosimea**: 4cm pentru zone pietonale, 6cm pentru trafic ușor, 8cm pentru trafic auto
- **Culoarea**: Alege nuanțe care completează arhitectura casei tale
- **Textura**: Pavajele splitate sau antichizate oferă un aspect natural

## Concluzie

Indiferent de alegerea ta, gama variată de produse Petra Pavaje oferă soluția potrivită pentru orice proiect.`,
    date: '2025-03-15',
    author: 'Petra Pavaje',
    category: 'Ghiduri',
    image: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
    readTime: 5,
  },
  {
    id: '2',
    title: 'Tendințe în amenajările exterioare pentru 2025',
    slug: 'tendinte-amenajari-exterioare-2025',
    excerpt: 'Descoperă cele mai noi tendințe în designul peisagistic și amenajările exterioare pentru acest an.',
    content: `Amenajările exterioare au evoluat semnificativ, iar 2025 aduce tendințe inovatoare care îmbină sustenabilitatea cu designul premium.

## 1. Spații outdoor integrate

Conexiunea între interior și exterior este tot mai importantă. Terasele și curțile devin prelungiri ale casei, cu pavaje premium care creează tranziții vizuale fluide.

## 2. Materiale naturale

Piatra naturală, lemnul și betonul aparent sunt în tendințe. Woodstone de la Petra Pavaje îmbină perfect aspectul lemnului cu durabilitatea betonului.

## 3. Sustenabilitate

Materialele eco-friendly și soluțiile permeabile pentru gestionarea apelor pluviale sunt tot mai căutate.

## 4. Iluminat ambiental

Integrarea iluminatului în amenajările cu pavaje creează atmosfere spectaculoase seara.`,
    date: '2025-02-28',
    author: 'Petra Pavaje',
    category: 'Trenduri',
    image: 'https://petrapavaje.ro/wp-content/uploads/mediterana-homepage.avif',
    readTime: 4,
  },
  {
    id: '3',
    title: 'Ghid de montaj pentru pavaje premium',
    slug: 'ghid-montaj-pavaje-premium',
    excerpt: 'Află pașii esențiali pentru montarea corectă a pavajelor premium.',
    content: `Montarea corectă a pavajelor premium este esențială pentru durabilitate și aspect estetic.

## Pași pentru montaj corect

1. **Pregătirea terenului** – Săpătură la adâncimea corectă
2. **Stratul de fundație** – Piatră spartă compactată
3. **Stratul de nisip** – Nivelare perfectă
4. **Montarea pavajelor** – Așezare după modelul ales
5. **Compactarea** – Cu placa vibratoare
6. **Umidarea** – Pentru fixare
7. **Garnisirea rosturilor** – Cu nisip fin`,
    date: '2025-02-10',
    author: 'Petra Pavaje',
    category: 'Montaj',
    image: 'https://petrapavaje.ro/wp-content/uploads/relief-homepage.avif',
    readTime: 7,
  },
  {
    id: '7',
    title: 'Soluții delimitare cu pavaj: Cum alegi soluția perfectă pentru o grădină cu design impecabil',
    slug: 'solutii-delimitare-pavaj-gradina-design-impecabil',
    excerpt: 'De la borduri clasice la delimitări creative cu pavaj — ghid complet pentru o amenajare coerentă și durabilă.',
        content: `Când vine vorba de amenajări exterioare, diferența dintre un proiect reușit și unul excepțional stă, aproape întotdeauna, în detalii.

Ca specialiști cu mulți ani de experiență în industria prefabricatelor din beton, am observat o tendință clară: proprietarii de case nu mai caută doar un simplu pavaj, ci soluții complete pentru un aspect final coerent. Delimitarea nu este doar o necesitate tehnică pentru stabilizarea montajului, ci un instrument de design care definește zonele de interes, separă gazonul de spațiile de circulație și adaugă personalitate curții.

În acest articol, ne propunem să prezentăm cele mai frecvente soluții pentru delimitare, de la borduri clasice la utilizări creative ale pavajului, pentru a răspunde celor mai frecvente întrebări: *Cum separăm elegant terasa de grădină?* sau *Ce alegem pentru a proteja rădăcinile arborilor?*

## Bordurile: piesele de legătură ale oricărei amenajări

Cu un portofoliu ce depășește 70 de modele, bordurile Petra Pavaje sunt concepute să deservească atât proiectele rezidențiale, cât și cele civile. Iată care sunt cele mai solicitate 5 modele și situațiile în care acestea excelează:

![Gama de borduri Petra Pavaje](https://petrapavaje.ro/wp-content/uploads/Bordura-50x5x20-negru.avif)

### 1. Bordura dreaptă 50×5×20 cm

Etalon pentru o finalitate estetică discretă. Disponibilă în nuanțele gamei Premium, reușește să întregească vizual suprafața pavată fără a atrage atenția strident. Alegerea ideală când vrei ca delimitarea să fie aproape invizibilă.

![Bordura dreaptă 40x15x20 cm](https://petrapavaje.ro/wp-content/uploads/Bordura-40x15x20.avif)

### 2. Bordura dreaptă 40×15×20 cm

Pentru proiecte ce necesită o structură robustă. Mai lată, oferă un plus de stabilitate ansamblului. Avantaj major: lățimea apropiată de a pavajului face tranziția spre marginea amenajării mai lină și mai plăcută ochiului.

![Bordura arcade 100x5x25 cm](https://petrapavaje.ro/wp-content/uploads/Bordura-Arcada.avif)

### 3. Bordura arcade 100×5×25 cm

Utilizată cu precădere pentru delimitarea spațiilor verzi, este un veritabil punct de atracție. Designul curbat sparge liniile rigide, aducând un aer ușor boem. Răspunsul perfect la: „Cum scot în evidență rondourile de flori?"

![Bordura cilindrică 106x9x25 cm](https://petrapavaje.ro/wp-content/uploads/Bordura_Cilindrica.avif)

### 4. Bordura cilindrică 106×9×25 cm

O alegere îndrăzneață pentru cei care vor să iasă din tipare. Aspectul masiv fură privirea și garantează stabilitate. Formată din două elemente de 50 cm și un pilon de 6 cm, permite pivotarea și crearea de arce cu diametru mare sau forme hexagonale.

## Delimitări creative – când pavajul preia rolul de contur

Uneori, cea mai bună delimitare nu este o bordură, ci un alt tip de pavaj. Folosirea culorilor contrastante sau a texturilor diferite poate oferi acel *quel-que-chose* care transformă o curte obișnuită într-una de revistă. Bordura separatoare sau bordura ascunsă este cea care menține pavajul fără să se deplaseze la margine și este necesară dacă alegi această metodă.

![Pavajul Stretto](https://petrapavaje.ro/wp-content/uploads/Stretto-gri-antic-1.avif)

[Pavajul Stretto](https://petrapavaje.ro/pavaje-premium/urbis/) — Un produs nou, de dimensiuni reduse, extrem de versatil. Poate fi montat atât pe orizontală, cât și pe verticală, fiind ideal pentru a crea margini cu modele inedite.

**Pavajul 40×10 cm** — Recomandat pentru spațiile ample. Multitudinea de nuanțe permite crearea de jocuri cromatice care ghidează privirea și delimitează zonele de relaxare de cele pietonale.

![Pavajul CON](https://petrapavaje.ro/wp-content/uploads/1.-Con-10-x-97-cm-alb-si-gri-Large-1.avif)

[Pavajul CON](https://petrapavaje.ro/pavaje-standard/con/) — Versatilitatea este caracteristica principală. Prin alternarea culorilor și a modelului de dispunere, se obțin delimitări dinamice pentru curți moderne. Spre exemplu, în jurul unei guri de canal, pavajul CON arată atenție la detaliile care schimbă aspectul amenajării.

![Pavajul Gemina](https://petrapavaje.ro/wp-content/uploads/web-Gemina-maro-si-galben-Medium.avif)

[Pavajul Gemina](https://petrapavaje.ro/pavaje-premium/gemina/) — Datorită volumetriei și formei sale bombate, Gemina creează o delimitare elegantă, tridimensională. Un produs care invită la creativitate în modalitățile de montaj.

[Pavajul Quatro](https://petrapavaje.ro/pavaje-premium/quatro/quatro-10x10x6/) — Poate fi alternat cu spoturi luminoase, astfel că la lăsarea serii curtea va arăta spectaculos, iar pe timpul zilei poziția spoturilor nu va fi evidentă.

## Texturi și stiluri: contrastul care definește spațiul

Pentru un impact vizual puternic, recomandăm utilizarea texturilor contrastante. Alăturarea unui pavaj neted lângă unul rugos, sau a unuia geometric lângă unul cu aspect natural, creează delimitări care nu necesită alte elemente suplimentare.

![Pavajul Relief](https://petrapavaje.ro/wp-content/uploads/Relief-20x10x6.avif)

[Pavajul Relief](https://petrapavaje.ro/pavaje-premium/relief/) — Cu o textură grunjuroasă, luxuriantă, este ideal pentru delimitări geometrice complexe sau modele care emană eleganță.

![Pavajul Primo antichizat](https://petrapavaje.ro/wp-content/uploads/primo-negru.avif)

[Pavajul Primo antichizat](https://petrapavaje.ro/pavaje-premium/primo/) — Un contrast fascinant se obține prin alăturarea acestuia cu un pavaj cu suprafață fină. Avantaj major: poate fi așezat în cant sau pe muchie, toate fețele fiind finisate în aceeași culoare și textură.

![Pavajul Antic](https://petrapavaje.ro/wp-content/uploads/Roman_Mures-Antic.avif)

[Pavajul Antic](https://petrapavaje.ro/pavaje-premium/antic/) — Dacă vrei aspectul de piatră învechită, acesta este pavajul potrivit. Sfat: folosește culoarea **neagră** lângă un pavaj deschis pentru un contrast cromatic puternic. Pentru design minimalist, alege **Antic gri antic 10×10 cm sau 20×20 cm** lângă un pavaj Roca MIX gri antic — delimitarea se va face prin textură și dimensiune, nu prin culoare: *ordonat vs. aleatoriu*.

![Pavajul Cubic](https://petrapavaje.ro/wp-content/uploads/Cubic-gri-bazaltic-1.avif)

[Pavajul Cubic](https://petrapavaje.ro/pavaje-premium/cubic/) — Redă fidel aspectul pietrei cubice de altădată. Perfect pentru borduri de modă veche într-un context modern, mai ales combinat cu pavaje cu textură fină.

**Sfat de designer:** Dacă preferi un design minimalist, alege Antic gri antic (10×10 cm sau 20×20 cm) alăturat unui pavaj [Roca MIX gri antic](https://petrapavaje.ro/pavaje-premium/roca/). Delimitarea nu se va face prin culoare, ci prin textură și dimensiunea pieselor — ordonat vs. aleatoriu. Un contrast subtil, cu efect vizual remarcabil.

## Explorează portofoliul complet Petra Pavaje

Indiferent dacă ești la începutul proiectului de amenajare sau cauți soluții de finisare pentru grădina ta, alegerea elementelor de delimitare este crucială. Portofoliul Petra Pavaje oferă soluții complete care răspund celor mai riguroase cerințe de durabilitate și design.

O delimitare corect realizată nu doar că protejează investiția în pavaj pe termen lung, dar transformă curtea într-un spațiu organizat, armonios, cu bun gust. Alege bordurile și pavajele care rezonează cu viziunea ta.

Borduri, pavaje Premium și Standard — toate disponibile în numeroase culori și texturi, pentru orice stil de amenajare. [Vezi toate bordurile →](https://petrapavaje.ro/borduri-2/)`,
    date: '2026-05-07',
    author: 'Petra Pavaje',
    category: 'Ghiduri Tehnice',
    image: 'https://petrapavaje.ro/wp-content/uploads/Relief-delimitare-20x10x6.avif',
    readTime: 9,
  },
]

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="heading-h1 text-charcoal-900 mb-4">Articol negăsit</h1>
        <Link to="/blog" className="btn-primary">Înapoi la blog</Link>
      </div>
    )
  }

  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-50 py-8">
        <div className="container-premium">
          <nav className="flex items-center gap-2 text-sm text-charcoal-500">
            <Link to="/" className="hover:text-charcoal-700 transition-colors">Acasă</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-charcoal-700 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-charcoal-900 font-medium">{post.title}</span>
          </nav>
        </div>
      </section>

      <article className="py-12 md:py-16">
        <div className="container-premium max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-charcoal-500 mb-4">
              <span className="px-3 py-1 bg-brand-100 text-brand-700 text-xs font-medium rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} min citire
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
            </div>

            <h1 className="heading-h1 text-charcoal-900 mb-6">{post.title}</h1>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, i) => {
                const imgMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/)
                if (imgMatch) {
                  return (
                    <figure key={i} className="my-6">
                      <img
                        src={imgMatch[2]}
                        alt={imgMatch[1]}
                        className="w-full rounded-xl"
                        loading="lazy"
                      />
                    </figure>
                  )
                }
                if (paragraph.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-bold text-charcoal-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={i} className="text-xl font-semibold text-charcoal-900 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>
                }
                if (paragraph.startsWith('- **')) {
                  return <li key={i} className="text-charcoal-700 ml-4 mb-1">{paragraph.replace('- ', '')}</li>
                }
                if (paragraph.startsWith('1. ')) {
                  return <li key={i} className="text-charcoal-700 ml-4 mb-1">{paragraph}</li>
                }
                if (paragraph.trim()) {
                  return <p key={i} className="text-charcoal-700 mb-4 leading-relaxed">{paragraph}</p>
                }
                return null
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-charcoal-200">
              <Link to="/contact" className="btn-primary group">
                Solicită o ofertă personalizată
              </Link>
            </div>
          </motion.div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-charcoal-50">
          <div className="container-premium">
            <h2 className="heading-h2 text-charcoal-900 mb-8">Articole similare</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} className="group block">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-stone-100 mb-3">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-semibold text-charcoal-900 group-hover:text-brand-600 transition-colors">
                    {rp.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
