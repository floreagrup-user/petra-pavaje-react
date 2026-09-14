import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Search, X } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { blogPosts } from '@/data/blog'
import type { BlogCategory } from '@/data/types'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

const CATEGORY_LABELS: Record<BlogCategory, string> = {
  inspiratie: 'Inspirație',
  'studii-de-caz': 'Studii de caz',
  ghiduri: 'Ghiduri tehnice',
  noutati: 'Noutăți',
}
const CATEGORY_ORDER: BlogCategory[] = ['inspiratie', 'studii-de-caz', 'ghiduri', 'noutati']

const PAGE_SIZE = 12

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = (searchParams.get('category') as BlogCategory | null) || null
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'recent' | 'oldest'>('recent')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    const url = `${window.location.origin}/blog`
    const title = `Blog Petra Pavaje – Inspirație, Ghiduri și Studii de Caz | ${SEO_SITE_NAME}`
    const description = 'Descoperă idei, sfaturi, proiecte și informații utile pentru amenajarea spațiilor exterioare cu Petra Pavaje.'

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

    upsertJsonLd('blog-collection-schema', {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${url}#collection`,
      name: title,
      description,
      url,
      mainEntity: {
        '@type': 'Blog',
        name: `Blog ${SEO_SITE_NAME}`,
        blogPost: blogPosts.slice(0, 20).map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${window.location.origin}/blog/${p.slug}`,
          datePublished: p.date,
        })),
      },
    })

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: url },
      ],
    })

    return resetSEO
  }, [])

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    let list = blogPosts.filter((post) => {
      const matchesCategory = !activeCategory || post.categories.includes(activeCategory)
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.categories.some((c) => CATEGORY_LABELS[c].toLowerCase().includes(query))
      return matchesCategory && matchesQuery
    })
    list = [...list].sort((a, b) => {
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime()
      return sortOrder === 'recent' ? diff : -diff
    })
    return list
  }, [activeCategory, searchQuery, sortOrder])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const setCategory = (cat: BlogCategory | null) => {
    setVisibleCount(PAGE_SIZE)
    if (cat) setSearchParams({ category: cat })
    else setSearchParams({})
  }

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="heading-h1 mb-4">Blog &amp; Inspirație</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Descoperă idei, sfaturi, proiecte și informații utile pentru amenajarea spațiilor exterioare cu Petra
              Pavaje.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="py-16 md:py-24">
        <div className="container-premium">
          <div className="relative mb-6 max-w-md">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(PAGE_SIZE) }}
              placeholder="Caută în articole..."
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

          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex gap-2 overflow-x-auto pb-1 -mb-1 sm:flex-wrap sm:overflow-visible">
              <button
                onClick={() => setCategory(null)}
                className={`shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  !activeCategory ? 'bg-brand-600 text-white' : 'bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200'
                }`}
              >
                Toate
              </button>
              {CATEGORY_ORDER.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeCategory === cat ? 'bg-brand-600 text-white' : 'bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200'
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm shrink-0">
              <span className="text-charcoal-400">Sortează:</span>
              <button
                onClick={() => setSortOrder('recent')}
                className={sortOrder === 'recent' ? 'text-brand-600 font-medium' : 'text-charcoal-500 hover:text-charcoal-700'}
              >
                Recente
              </button>
              <span className="text-charcoal-300">·</span>
              <button
                onClick={() => setSortOrder('oldest')}
                className={sortOrder === 'oldest' ? 'text-brand-600 font-medium' : 'text-charcoal-500 hover:text-charcoal-700'}
              >
                Vechi
              </button>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-charcoal-500">Nu am găsit articole pentru această căutare.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visible.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: (index % PAGE_SIZE) * 0.05 }}
                >
                  <Link to={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-100 mb-4">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {post.categories.slice(0, 2).map((cat) => (
                          <span key={cat} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-charcoal-900 text-xs font-medium rounded-full">
                            {CATEGORY_LABELS[cat]}
                          </span>
                        ))}
                        {post.categories.length > 2 && (
                          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-charcoal-500 text-xs font-medium rounded-full">
                            +{post.categories.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-charcoal-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.date)}
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
                      Citește articolul
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {hasMore && (
            <div className="text-center mt-12">
              <button onClick={() => setVisibleCount((c) => c + PAGE_SIZE)} className="btn-secondary">
                Încarcă mai multe articole
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
