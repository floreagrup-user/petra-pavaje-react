import { useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, ExternalLink, User } from 'lucide-react'
import { blogPosts } from '@/data/blog'
import { authors } from '@/data/authors'
import type { BlogCategory } from '@/data/types'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

const CATEGORY_LABELS: Record<BlogCategory, string> = {
  inspiratie: 'Inspirație',
  'studii-de-caz': 'Studii de caz',
  ghiduri: 'Ghiduri tehnice',
  noutati: 'Noutăți',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function AuthorPage() {
  const { slug } = useParams<{ slug: string }>()
  const author = authors.find((a) => a.slug === slug)

  const posts = useMemo(
    () =>
      author
        ? [...blogPosts]
            .filter((p) => p.authorSlug === author.slug)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        : [],
    [author]
  )

  useEffect(() => {
    if (!author) return
    const url = `${window.location.origin}/autor/${author.slug}`
    const title = `${author.name}${author.role ? ` – ${author.role}` : ''} | ${SEO_SITE_NAME}`
    const description = author.bio?.[0] || `Articole de blog scrise de ${author.name} pe ${SEO_SITE_NAME}.`

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'profile')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    if (author.photo) upsertMeta('property', 'og:image', author.photo)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)

    upsertJsonLd('author-person-schema', {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      worksFor: author.company ? { '@type': 'Organization', name: author.company } : undefined,
      description: author.bio?.join(' '),
      image: author.photo,
      url,
      sameAs: author.linkedin ? [author.linkedin] : undefined,
    })

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${window.location.origin}/blog` },
        { '@type': 'ListItem', position: 3, name: author.name, item: url },
      ],
    })

    return () => {
      upsertJsonLd('author-person-schema', null)
      resetSEO()
    }
  }, [author])

  if (!author) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="heading-h1 text-charcoal-900 mb-4">Autor negăsit</h1>
        <Link to="/blog" className="btn-primary">Înapoi la blog</Link>
      </div>
    )
  }

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-50 py-8">
        <div className="container-premium">
          <nav className="flex items-center gap-2 text-sm text-charcoal-500 flex-wrap">
            <Link to="/" className="hover:text-charcoal-700 transition-colors">Acasă</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-charcoal-700 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-charcoal-900 font-medium">{author.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-premium max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start gap-6 mb-10"
          >
            {author.photo ? (
              <img
                src={author.photo}
                alt={author.name}
                className="w-28 h-28 rounded-full object-cover shrink-0 bg-stone-100"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-charcoal-100 flex items-center justify-center shrink-0">
                <User className="w-10 h-10 text-charcoal-400" />
              </div>
            )}

            <div className="min-w-0">
              <h1 className="heading-h1 text-charcoal-900 mb-1">{author.name}</h1>
              {author.role && (
                <p className="text-brand-600 font-medium mb-1">
                  {author.role}
                  {author.company ? `, ${author.company}` : ''}
                </p>
              )}
              {author.expertise && <p className="text-sm text-charcoal-500 mb-3">{author.expertise}</p>}
              {author.linkedin && (
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-700 hover:text-brand-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
            </div>
          </motion.div>

          {author.bio && author.bio.length > 0 ? (
            <div className="prose prose-lg max-w-none prose-p:text-charcoal-700 prose-p:leading-relaxed mb-4">
              {author.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : (
            <p className="text-charcoal-500 mb-4">Bio în curs de completare.</p>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-charcoal-50">
        <div className="container-premium">
          <h2 className="heading-h2 text-charcoal-900 mb-8">
            Articole semnate de {author.name}
            <span className="text-charcoal-400 font-normal text-lg ml-2">({posts.length})</span>
          </h2>

          {posts.length === 0 ? (
            <p className="text-charcoal-500">Niciun articol publicat încă.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
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
                  <h3 className="text-lg font-semibold text-charcoal-900 group-hover:text-brand-600 transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-charcoal-500 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center text-brand-600 text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Citește articolul
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
