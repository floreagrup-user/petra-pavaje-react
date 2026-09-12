import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, X, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight as ArrowRightIcon } from 'lucide-react'
import { blogPosts } from '@/data/blog'
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

function extractImages(html: string): { src: string; alt: string }[] {
  const images: { src: string; alt: string }[] = []
  const re = /<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    images.push({ src: m[1], alt: m[2] })
  }
  return images
}

function BlogLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: { src: string; alt: string }[]
  currentIndex: number
  onClose: () => void
  onNavigate: (direction: number) => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(-1)
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(1)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onNavigate, currentIndex, images.length])

  const img = images[currentIndex]
  if (!img) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors" aria-label="Închide">
        <X className="w-8 h-8" />
      </button>
      {currentIndex > 0 && (
        <button onClick={(e) => { e.stopPropagation(); onNavigate(-1) }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors p-2"
          aria-label="Imaginea anterioară">
          <ChevronLeft className="w-10 h-10" />
        </button>
      )}
      <img src={img.src} alt={img.alt} className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
      {currentIndex < images.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNavigate(1) }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white transition-colors p-2"
          aria-label="Imaginea următoare">
          <ChevronRight className="w-10 h-10" />
        </button>
      )}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium tracking-wide">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)
  const contentRef = useRef<HTMLDivElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const images = useMemo(() => (post ? extractImages(post.content) : []), [post])

  const sortedPosts = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    []
  )
  const currentPostIndex = post ? sortedPosts.findIndex((p) => p.slug === post.slug) : -1
  const prevPost = currentPostIndex > 0 ? sortedPosts[currentPostIndex - 1] : null
  const nextPost = currentPostIndex >= 0 && currentPostIndex < sortedPosts.length - 1 ? sortedPosts[currentPostIndex + 1] : null

  const relatedPosts = useMemo(() => {
    if (!post) return []
    return [...blogPosts]
      .filter((p) => p.slug !== post.slug)
      .map((p) => ({
        post: p,
        score: p.categories.filter((c) => post.categories.includes(c)).length,
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
      .slice(0, 3)
      .map((x) => x.post)
  }, [post])

  const handleContentClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'IMG') {
      const src = target.getAttribute('src') || ''
      const idx = images.findIndex((img) => img.src === src)
      if (idx >= 0) setLightboxIndex(idx)
    }
  }, [images])

  useEffect(() => {
    if (!post) return
    const url = `${window.location.origin}/blog/${post.slug}`
    const title = post.seo?.title || `${post.title} | ${SEO_SITE_NAME}`
    const description = post.seo?.description || post.excerpt

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'article')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', post.image)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('blogposting-schema', {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      image: post.image ? [post.image] : undefined,
      datePublished: post.date,
      dateModified: post.modifiedDate || post.date,
      author: { '@type': 'Organization', name: post.author },
      publisher: {
        '@type': 'Organization',
        name: SEO_SITE_NAME,
        logo: { '@type': 'ImageObject', url: `${window.location.origin}/images/petra-pavaje-logo-sticky.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      articleSection: post.categories.map((c) => CATEGORY_LABELS[c]).join(', '),
      description,
    })

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${window.location.origin}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    })

    return resetSEO
  }, [post])

  if (!post) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="heading-h1 text-charcoal-900 mb-4">Articol negăsit</h1>
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
            <span className="text-charcoal-900 font-medium">{post.title}</span>
          </nav>
        </div>
      </section>

      <article className="py-12 md:py-16">
        <div className="container-premium max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-wrap items-center gap-3 text-sm text-charcoal-500 mb-4">
              {post.categories.map((cat) => (
                <span key={cat} className="px-3 py-1 bg-brand-100 text-brand-700 text-xs font-medium rounded-full">
                  {CATEGORY_LABELS[cat]}
                </span>
              ))}
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
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

            {post.image && (
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 mb-8">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div
              ref={contentRef}
              onClick={handleContentClick}
              className="prose prose-lg max-w-none prose-headings:text-charcoal-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:scroll-mt-24 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-charcoal-700 prose-p:leading-relaxed prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:cursor-zoom-in prose-strong:text-charcoal-900 prose-blockquote:border-brand-600 prose-blockquote:text-charcoal-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {lightboxIndex !== null && (
              <BlogLightbox
                images={images}
                currentIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onNavigate={(dir) => setLightboxIndex((prev) => (prev === null ? null : prev + dir))}
              />
            )}

            <div className="mt-8 pt-8 border-t border-charcoal-200">
              <Link to="/contact" className="btn-primary group">
                Solicită o ofertă personalizată
              </Link>
            </div>

            {(prevPost || nextPost) && (
              <div className="mt-8 pt-8 border-t border-charcoal-200 grid sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link to={`/blog/${prevPost.slug}`} className="group flex items-center gap-3 p-4 rounded-xl border border-charcoal-100 hover:border-brand-200 hover:bg-charcoal-50 transition-colors">
                    <ArrowLeft className="w-4 h-4 text-charcoal-400 group-hover:text-brand-600 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-charcoal-400 mb-0.5">Articolul anterior</p>
                      <p className="text-sm font-medium text-charcoal-900 truncate">{prevPost.title}</p>
                    </div>
                  </Link>
                ) : <div />}
                {nextPost && (
                  <Link to={`/blog/${nextPost.slug}`} className="group flex items-center justify-end gap-3 p-4 rounded-xl border border-charcoal-100 hover:border-brand-200 hover:bg-charcoal-50 transition-colors text-right">
                    <div className="min-w-0">
                      <p className="text-xs text-charcoal-400 mb-0.5">Articolul următor</p>
                      <p className="text-sm font-medium text-charcoal-900 truncate">{nextPost.title}</p>
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-charcoal-400 group-hover:text-brand-600 shrink-0" />
                  </Link>
                )}
              </div>
            )}
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
