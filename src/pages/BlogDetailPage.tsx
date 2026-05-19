import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
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
