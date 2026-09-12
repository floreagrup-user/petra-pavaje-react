import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, X, FileText, Download } from 'lucide-react'
import { technicalDocuments } from '@/data/documents'
import type { DocumentCategory } from '@/data/types'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'
import { useEffect } from 'react'

const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  pavaje: 'Pavaje',
  borduri: 'Borduri',
  garduri: 'Garduri',
  boltari: 'Bolțari',
  rigole: 'Rigole',
  canalizare: 'Elemente de canalizare',
  'alte-elemente': 'Alte elemente',
}
const CATEGORY_ORDER: DocumentCategory[] = ['pavaje', 'borduri', 'garduri', 'boltari', 'rigole', 'canalizare', 'alte-elemente']

const PAGE_SIZE = 30

function DocLink({ href, label }: { href?: string; label: string }) {
  if (!href) {
    return <span className="text-charcoal-300 text-xs">—</span>
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-charcoal-50 hover:bg-brand-50 text-charcoal-700 hover:text-brand-700 text-xs font-medium transition-colors"
    >
      <Download className="w-3.5 h-3.5 shrink-0" />
      {label}
    </a>
  )
}

export function DocumenteTehnicePage() {
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    const url = `${window.location.origin}/documente`
    const title = `Documente Tehnice - Fișe Tehnice și Declarații de Performanță | ${SEO_SITE_NAME}`
    const description =
      'Descarcă fișele tehnice și declarațiile de performanță pentru toate produsele Petra Pavaje: pavaje, borduri, garduri, bolțari, rigole și elemente de canalizare.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Documente Tehnice', item: url },
      ],
    })

    return resetSEO
  }, [])

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return technicalDocuments.filter((doc) => {
      const matchesCategory = !activeCategory || doc.category === activeCategory
      const matchesQuery = !query || doc.name.toLowerCase().includes(query) || doc.code.toLowerCase().includes(query)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, searchQuery])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const setCategory = (cat: DocumentCategory | null) => {
    setActiveCategory(cat)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">Documente Tehnice</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Resurse</p>
            <h1 className="heading-h1 mb-4 max-w-3xl">Documente Tehnice</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Fișe tehnice și declarații de performanță pentru toate produsele Petra Pavaje — {technicalDocuments.length} produse din 7 categorii.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium">
          <div className="relative mb-6 max-w-md">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(PAGE_SIZE) }}
              placeholder="Caută după nume sau cod produs..."
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

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setCategory(null)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                !activeCategory ? 'bg-brand-600 text-white' : 'bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200'
              }`}
            >
              Toate
            </button>
            {CATEGORY_ORDER.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeCategory === cat ? 'bg-brand-600 text-white' : 'bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          <p className="text-sm text-charcoal-500 mb-6">
            Se afișează {visible.length} din {filtered.length} {filtered.length === 1 ? 'produs' : 'produse'}
          </p>

          {visible.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-10 h-10 text-charcoal-300 mx-auto mb-3" />
              <p className="text-charcoal-500">Nu am găsit documente pentru această căutare.</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block rounded-xl border border-charcoal-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-charcoal-50 text-left text-xs font-semibold tracking-wide uppercase text-charcoal-500">
                      <th className="px-4 py-3 w-20">Cod</th>
                      <th className="px-4 py-3">Produs</th>
                      <th className="px-4 py-3 w-44">Declarație Alba</th>
                      <th className="px-4 py-3 w-44">Declarație Prahova</th>
                      <th className="px-4 py-3 w-40">Fișă Tehnică</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-100">
                    {visible.map((doc) => (
                      <tr key={`${doc.category}-${doc.code}-${doc.name}`} className="hover:bg-charcoal-50/50 transition-colors">
                        <td className="px-4 py-3 text-charcoal-400 font-mono text-xs">{doc.code}</td>
                        <td className="px-4 py-3 text-charcoal-900 font-medium">{doc.name}</td>
                        <td className="px-4 py-3"><DocLink href={doc.declaratieAlba} label="Alba" /></td>
                        <td className="px-4 py-3"><DocLink href={doc.declaratiePrahova} label="Prahova" /></td>
                        <td className="px-4 py-3"><DocLink href={doc.fisaTehnica} label="Fișă tehnică" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-3">
                {visible.map((doc) => (
                  <div key={`${doc.category}-${doc.code}-${doc.name}`} className="rounded-xl border border-charcoal-100 p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-medium text-charcoal-900 text-sm">{doc.name}</h3>
                      <span className="text-charcoal-400 font-mono text-xs shrink-0">{doc.code}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <DocLink href={doc.declaratieAlba} label="Declarație Alba" />
                      <DocLink href={doc.declaratiePrahova} label="Declarație Prahova" />
                      <DocLink href={doc.fisaTehnica} label="Fișă tehnică" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {hasMore && (
            <div className="text-center mt-10">
              <button onClick={() => setVisibleCount((c) => c + PAGE_SIZE)} className="btn-secondary">
                Încarcă mai multe produse
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
