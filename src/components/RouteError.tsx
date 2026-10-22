import { useEffect, useState } from 'react'
import { Link, useLocation, useRouteError } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'
import { isChunkLoadError, reloadForNewVersion } from '@/lib/chunk-reload'
import { isEnglishPath } from '@/lib/i18n-routes'

// Root errorElement. A missing chunk after a deploy reloads the page on its
// own; any other error gets a plain page with a way out instead of the React
// Router developer screen.
export function RouteError() {
  const error = useRouteError()
  const isEnglish = isEnglishPath(useLocation().pathname)
  const staleVersion = isChunkLoadError(error)
  const [reloading, setReloading] = useState(false)

  useEffect(() => {
    if (staleVersion && reloadForNewVersion()) setReloading(true)
  }, [staleVersion])

  if (reloading) return null

  return (
    <main className="min-h-dvh flex items-center justify-center bg-white px-4 py-16 text-center">
      <div className="max-w-md">
        <img src="/favicon.png" alt="Petra Pavaje" width={484} height={512} className="mx-auto mb-6 h-12 w-auto" />
        <h1 className="heading-h2 text-charcoal-900 mb-3">
          {staleVersion
            ? isEnglish ? 'The site has been updated' : 'Site-ul a fost actualizat'
            : isEnglish ? 'This page could not be loaded' : 'Pagina nu a putut fi încărcată'}
        </h1>
        <p className="text-charcoal-600 mb-8">
          {staleVersion
            ? isEnglish
              ? 'Reload the page to get the latest version.'
              : 'Reîncarcă pagina ca să primești versiunea nouă.'
            : isEnglish
              ? 'Try again in a moment. If it keeps happening, write to us at contact@petrapavaje.ro.'
              : 'Încearcă din nou peste câteva momente. Dacă problema se repetă, scrie-ne la contact@petrapavaje.ro.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button type="button" onClick={() => window.location.reload()} className="btn-primary gap-2">
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            {isEnglish ? 'Reload the page' : 'Reîncarcă pagina'}
          </button>
          <Link to={isEnglish ? '/en' : '/'} reloadDocument className="btn-secondary">
            {isEnglish ? 'Go to the home page' : 'Mergi la prima pagină'}
          </Link>
        </div>
      </div>
    </main>
  )
}
