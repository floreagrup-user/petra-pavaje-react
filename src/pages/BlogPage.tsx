import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  author: string
  category: string
  image: string
  readTime: number
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Ghid complet: Cum sa alegi pavajul perfect pentru curtea ta',
    slug: 'ghid-alegere-pavaj-curte',
    excerpt: 'Descopera factorii esentiali de care trebuie sa tii cont atunci cand alegi pavajul pentru curtea ta: de la tipul de trafic la estetica generala a spatiului.',
    date: '2025-05-10',
    author: 'Echipa Petra Pavaje',
    category: 'Ghiduri',
    image: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
    readTime: 8,
  },
  {
    id: '2',
    title: 'Trenduri 2025 in amenajarile exterioare',
    slug: 'trenduri-2025-amenajari-exterioare',
    excerpt: 'De la pavajele de mari dimensiuni la combinatiile de texturi, descopera cele mai noi trenduri in designul exterior pentru anul 2025.',
    date: '2025-04-22',
    author: 'Echipa Petra Pavaje',
    category: 'Trenduri',
    image: 'https://petrapavaje.ro/wp-content/uploads/mediterana-homepage.avif',
    readTime: 6,
  },
  {
    id: '3',
    title: 'Cum se monteaza corect pavajul - Pas cu pas',
    slug: 'montaj-pavaj-pas-cu-pas',
    excerpt: 'Un ghid detaliat despre procesul de montaj al pavajului, de la pregatirea terenului pana la finisare si intretinere.',
    date: '2025-04-05',
    author: 'Echipa Tehnica',
    category: 'Montaj',
    image: 'https://petrapavaje.ro/wp-content/uploads/relief-homepage.avif',
    readTime: 12,
  },
  {
    id: '4',
    title: 'Woodstone - Lemnul pietrificat care transforma orice spatiu',
    slug: 'woodstone-lemn-pietrificat',
    excerpt: 'Descopera gama Woodstone de la Petra Pavaje: frumusetea lemnului combinata cu durabilitatea betonului premium.',
    date: '2025-03-18',
    author: 'Echipa Petra Pavaje',
    category: 'Produse',
    image: 'https://petrapavaje.ro/wp-content/uploads/woodstoone-Medium.avif',
    readTime: 5,
  },
  {
    id: '5',
    title: 'Intretinerea pavajului: Sfaturi pentru fiecare anotimp',
    slug: 'intretinere-pavaj-anotimpuri',
    excerpt: 'Cum sa iti mentii pavajul in conditii optime pe tot parcursul anului. Sfaturi practice pentru primavara, vara, toamna si iarna.',
    date: '2025-03-01',
    author: 'Echipa Tehnica',
    category: 'Intretinere',
    image: 'https://petrapavaje.ro/wp-content/uploads/gemina-homepage.avif',
    readTime: 7,
  },
  {
    id: '6',
    title: 'De ce sa alegi pavajul permeabil pentru gradina ta',
    slug: 'pavaj-permeabil-gradina',
    excerpt: 'Pavajul permeabil este solutia ideala pentru gestionarea durabila a apelor pluviale. Afla beneficiile si optiunile disponibile.',
    date: '2025-02-15',
    author: 'Echipa Petra Pavaje',
    category: 'Sustenabilitate',
    image: 'https://petrapavaje.ro/wp-content/uploads/energie-verde-si-emsii-0-web1-1.avif',
    readTime: 6,
  },
]

const categories = ['Toate', 'Ghiduri', 'Trenduri', 'Montaj', 'Produse', 'Intretinere', 'Sustenabilitate']

export function BlogPage() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <div className="pt-20 md:pt-24">
      {/* Breadcrumbs */}
      <div className="bg-anthracite-50 border-b border-anthracite-100">
        <div className="container-premium py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-anthracite-500 hover:text-anthracite-700 transition-colors">Acasa</Link>
            <span className="text-anthracite-300">/</span>
            <span className="text-anthracite-900 font-medium">Blog</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-h1 text-anthracite-900 mb-4">Blog Petra Pavaje</h1>
            <p className="text-body-lg text-anthracite-500 max-w-2xl">
              Articole, ghiduri si inspiratie pentru amenajarile tale exterioare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 bg-anthracite-50 border-b border-anthracite-100">
        <div className="container-premium">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 text-sm rounded-full bg-white text-anthracite-700 hover:bg-primary-600 hover:text-white transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section ref={ref} className="py-12 md:py-16 bg-white">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-premium group"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 text-anthracite-900 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-xs text-anthracite-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-anthracite-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-anthracite-500 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-primary-600 text-sm font-medium">
                      Citeste articolul
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
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
