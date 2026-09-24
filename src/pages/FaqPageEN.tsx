import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, Search, X, MessageCircleQuestion, TriangleAlert } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'
import { FAQ_ITEMS } from '@/data/faq.en'

const CATEGORIES = [
  'All',
  'About Petra Pavaje',
  'Products',
  'Ordering & Delivery',
  'Installation & Maintenance',
  'Warranty & Support',
  'Contact',
]

export function FaqPageEN() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
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
    const url = `${window.location.origin}/en/faq`
    const title = `Frequently Asked Questions (FAQ) | ${SEO_SITE_NAME}`
    const description =
      'Find quick answers to the most common questions about Petra Pavaje products, installation, maintenance, ordering and warranty.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/faq', '/en/faq')
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/en` },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: url },
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
              <Link to="/en" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">FAQ</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Help Center</p>
            <h1 className="heading-h1 mb-4 max-w-3xl">Frequently Asked Questions</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Find quick answers to the most common questions about Petra Pavaje products, services and processes.
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
                placeholder="Search a question…"
                className="w-full pl-11 pr-10 py-3 rounded-xl border border-charcoal-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-charcoal-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
                  aria-label="Clear search"
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
                Showing {filtered.length} {filtered.length === 1 ? 'question' : 'questions'}
              </p>
              <div className="flex gap-3">
                <button onClick={openAll} className="text-sm font-medium text-brand-600 hover:underline">
                  Expand all
                </button>
                <button onClick={closeAll} className="text-sm font-medium text-charcoal-500 hover:underline">
                  Collapse all
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
              <p className="text-charcoal-500 mb-2">No results found.</p>
              <p className="text-charcoal-400 text-sm">Try different search terms or contact us directly.</p>
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
            <h2 className="text-xl font-semibold text-charcoal-900 mb-2">Didn't find your answer?</h2>
            <p className="text-charcoal-500 mb-6">Our team of specialists is ready to help you with any question.</p>
            <Link to="/en/contact" className="btn-primary">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
