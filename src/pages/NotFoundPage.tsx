import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { upsertMeta, resetSEO } from '@/hooks/seo-utils'

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Pagina nu a fost găsită | Petra Pavaje'
    upsertMeta('name', 'robots', 'noindex, follow')
    return resetSEO
  }, [])

  return (
    <div className="pt-32 pb-24 text-center">
      <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-4">Eroare 404</p>
      <h1 className="heading-h1 text-charcoal-900 mb-4">Pagina nu a fost găsită</h1>
      <p className="text-charcoal-500 max-w-md mx-auto mb-8">
        Pagina pe care o cauți nu există sau a fost mutată. Poți reveni la pagina principală sau răsfoi produsele
        noastre.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/" className="btn-primary">
          Acasă
        </Link>
        <Link to="/produse" className="btn-secondary">
          Vezi produsele
        </Link>
      </div>
    </div>
  )
}
