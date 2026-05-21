import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import type { BlogPost } from '@/data/types'

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Cum să alegi pavajul perfect pentru curtea ta',
    slug: 'cum-sa-alegi-pavajul-perfect',
    excerpt: 'Ghid complet pentru alegerea pavajului potrivit în funcție de tipul de trafic, designul dorit și bugetul disponibil.',
    content: 'Alegerea pavajului perfect pentru curtea ta poate părea o sarcină dificilă, dar cu informațiile potrivite, poți lua cea mai bună decizie...',
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
    content: 'Amenajările exterioare au evoluat semnificativ în ultimii ani, iar 2025 aduce o serie de tendințe inovatoare...',
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
    excerpt: 'Află pașii esențiali pentru montarea corectă a pavajelor premium și asigură-te că rezultatul final este perfect.',
    content: 'Montarea corectă a pavajelor premium este esențială pentru a te bucura de durabilitate și aspect estetic...',
    date: '2025-02-10',
    author: 'Petra Pavaje',
    category: 'Montaj',
    image: 'https://petrapavaje.ro/wp-content/uploads/relief-homepage.avif',
    readTime: 7,
  },
  {
    id: '4',
    title: 'Woodstone – Frumusețea lemnului în beton premium',
    slug: 'woodstone-lemn-pietrificat-beneficii',
    excerpt: 'Descoperă gama Woodstone de la Petra Pavaje, care îmbină estetica lemnului natural cu durabilitatea betonului.',
    content: 'Woodstone reprezintă inovația în domeniul prefabricatelor din beton, oferind aspectul cald al lemnului...',
    date: '2025-01-20',
    author: 'Petra Pavaje',
    category: 'Produse',
    image: 'https://petrapavaje.ro/wp-content/uploads/woodstoone-Medium.avif',
    readTime: 6,
  },
  {
    id: '5',
    title: 'Cum să întreții pavajele pe timp de iarnă',
    slug: 'intretinere-pavaje-iarna',
    excerpt: 'Sfaturi utile pentru protejarea și întreținerea pavajelor în sezonul rece, împotriva înghețului și a sării.',
    content: 'Iarna poate fi o provocare pentru pavaje, dar cu îngrijirea potrivită, le poți menține aspectul impecabil...',
    date: '2025-01-05',
    author: 'Petra Pavaje',
    category: 'Întreținere',
    image: 'https://petrapavaje.ro/wp-content/uploads/holland-Medium.avif',
    readTime: 4,
  },
  {
    id: '6',
    title: 'Sustenabilitatea în producția de pavaje',
    slug: 'sustenabilitate-productie-pavaje',
    excerpt: 'Află cum producem pavaje premium cu un impact redus asupra mediului, folosind energie solară și tehnologii verzi.',
    content: 'La Petra Pavaje, sustenabilitatea este o prioritate. Am implementat tehnologii moderne pentru a reduce amprenta de carbon...',
    date: '2024-12-15',
    author: 'Petra Pavaje',
    category: 'Sustenabilitate',
    image: 'https://petrapavaje.ro/wp-content/uploads/energie-verde-si-emsii-0-web1-1.avif',
    readTime: 5,
  },
  {
    id: '7',
    title: 'Soluții delimitare cu pavaj: Cum alegi soluția perfectă pentru o grădină cu design impecabil',
    slug: 'solutii-delimitare-pavaj-gradina-design-impecabil',
    excerpt: 'De la borduri clasice la delimitări creative cu pavaj — ghid complet pentru o amenajare coerentă și durabilă.',
    content: 'Când vine vorba de amenajări exterioare, diferența dintre un proiect reușit și unul excepțional stă, aproape întotdeauna, în detalii.',
    date: '2026-05-07',
    author: 'Petra Pavaje',
    category: 'Ghiduri Tehnice',
    image: 'https://petrapavaje.ro/wp-content/uploads/Relief-delimitare-20x10x6.avif',
    readTime: 9,
  },
  {
    id: '8',
    title: 'Petra Pavaje lansează Evo Green',
    slug: 'petra-pavaje-lanseaza-evo-green',
    excerpt: 'Prima gamă de pavaje din România fabricată din ciment cu emisii aproape zero — certificat digital, cu trasabilitate completă a reducerilor de carbon.',
    content: 'Florea Grup anunță o inovație absolută în domeniul materialelor de construcții. Petra Pavaje lansează Evo Green, un produs dezvoltat de hubul de inovare al companiei ca răspuns direct la nevoia tot mai mare de soluții de construcții sustenabile.',
    date: '2026-04-22',
    author: 'Petra Pavaje',
    category: 'Inovație & Sustenabilitate',
    image: 'https://petrapavaje.ro/wp-content/uploads/Untitled-scaled.avif',
    readTime: 8,
  },
  {
    id: '9',
    title: 'Pavaje premium și starea de bine',
    slug: 'pavaje-premium-si-starea-de-bine',
    excerpt: 'Cele mai noi cercetări demonstrează că vegetația bogată și amenajările de calitate influențează direct sănătatea, nivelul de stres și calitatea vieții.',
    content: 'Cele mai noi cercetări demonstrează că vegetația bogată și amenajările stradale de calitate nu sunt simple detalii estetice — ele influențează direct sănătatea, nivelul de stres și calitatea vieții comunităților urbane.',
    date: '2026-03-24',
    author: 'Petra Pavaje',
    category: 'Inspirație',
    image: 'https://petrapavaje.ro/wp-content/uploads/curte_petra_pavaje.avif',
    readTime: 8,
  },
  {
    id: '10',
    title: 'Casa 154 – pavajul Grand Urban, punte între tradiție și modernitate',
    slug: 'casa-154-grand-urban-traditie-modernitate',
    excerpt: 'Cum o curte cu amintiri de peste un secol a prins viață nouă prin liniile curate ale dalelor de mari dimensiuni Grand Urban.',
    content: 'Cristian Prack, prin intermediul Casei 154, reușește să redea experiența redescoperirii satului copilăriei, transformând o ruină într-un spațiu util cu pavaj Grand Urban.',
    date: '2026-03-05',
    author: 'Petra Pavaje',
    category: 'Proiecte',
    image: 'https://petrapavaje.ro/wp-content/uploads/2_Dale-Grand-Urban-80x40_Petra-Pavaje.jpg',
    readTime: 7,
  },
  {
    id: '11',
    title: 'Amenajează-ți curtea în culoarea anului 2026 cu Petra Pavaje',
    slug: 'amenajeaza-curtea-culoarea-anului-2026',
    excerpt: 'Cloud Dancer este culoarea anului 2026 — un alb rafinat care inspiră liniște și echilibru. Descoperă pavajele Petra Pavaje în această nuanță.',
    content: 'Institutul Pantone a desemnat Cloud Dancer drept culoarea anului 2026. Descoperă pavajele Petra Pavaje disponibile în această nuanță pentru o amenajare luminoasă și elegantă.',
    date: '2026-01-22',
    author: 'Petra Pavaje',
    category: 'Trenduri',
    image: 'https://petrapavaje.ro/wp-content/uploads/cloud-dancer-idei-de-amenajare-cu-pavaje-in-culoarea-alb-de-la-Petra-Pavaje-web.avif',
    readTime: 8,
  },
  {
    id: '12',
    title: '3 idei creative pentru utilizarea pavajului ca decor de sărbători',
    slug: '3-idei-creative-pavaj-decor-sarbatori',
    excerpt: 'Transformă bucățile rămase de pavaj în decorațiuni ingenioase care aduc spiritul sărbătorilor în curtea și în casa ta.',
    content: 'Cine spune că elementele de construcții nu pot deveni piese de artă? La Petra Pavaje, transformăm bucățile rămase de pavaj în decorațiuni de sărbători.',
    date: '2025-12-15',
    author: 'Petra Pavaje',
    category: 'Inspirație',
    image: 'https://petrapavaje.ro/wp-content/uploads/Petra-Pavaje-scaled.avif',
    readTime: 5,
  },
]

const categories = ['Toate', 'Ghiduri', 'Ghiduri Tehnice', 'Inovație & Sustenabilitate', 'Inspirație', 'Proiecte', 'Trenduri', 'Montaj', 'Produse', 'Întreținere', 'Sustenabilitate']

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Toate')
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  const filtered = activeCategory === 'Toate'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory)

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-h1 mb-4">Blog</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Inspirație, ghiduri și noutăți despre amenajări exterioare, pavaje și design peisagistic.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="py-16 md:py-24">
        <div className="container-premium">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-600 text-white'
                    : 'bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-100 mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-charcoal-900 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-charcoal-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-charcoal-900 group-hover:text-brand-600 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-charcoal-500 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center text-brand-600 text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Citește mai mult
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
