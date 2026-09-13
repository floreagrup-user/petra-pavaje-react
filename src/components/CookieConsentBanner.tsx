import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, Settings2, X } from 'lucide-react'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export function CookieConsentBanner() {
  const { consent, hasDecided, settingsOpen, acceptAll, rejectNonEssential, saveConsent, openSettings, closeSettings } =
    useCookieConsent()
  const [analyticsChoice, setAnalyticsChoice] = useState(consent?.analytics ?? false)
  const [marketingChoice, setMarketingChoice] = useState(consent?.marketing ?? false)

  if (hasDecided && !settingsOpen) return null

  if (settingsOpen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-charcoal-950/50 p-0 sm:p-4">
        <div className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal-100">
            <h2 className="text-lg font-semibold text-charcoal-900">Setări cookie-uri</h2>
            {hasDecided && (
              <button
                onClick={closeSettings}
                aria-label="Închide"
                className="p-1.5 rounded-lg text-charcoal-400 hover:text-charcoal-900 hover:bg-charcoal-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="px-6 py-5 space-y-5">
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Alege ce categorii de cookie-uri accepți. Poți schimba oricând alegerea din
              linkul „Setări cookie-uri" din subsolul paginii. Detalii complete în{' '}
              <Link to="/cookie-uri" className="text-brand-600 hover:underline">Politica de Cookie-uri</Link>.
            </p>

            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-charcoal-50">
              <div>
                <p className="font-medium text-charcoal-900 text-sm">Necesare</p>
                <p className="text-xs text-charcoal-500 mt-1">
                  Indispensabile pentru funcționarea site-ului (ex. reținerea alegerii tale de cookie-uri). Nu pot fi dezactivate.
                </p>
              </div>
              <div className="shrink-0 w-11 h-6 rounded-full bg-brand-600 relative mt-0.5">
                <div className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white" />
              </div>
            </div>

            <label className="flex items-start justify-between gap-4 p-4 rounded-xl border border-charcoal-100 cursor-pointer">
              <div>
                <p className="font-medium text-charcoal-900 text-sm">Analiză</p>
                <p className="text-xs text-charcoal-500 mt-1">
                  Ne ajută să înțelegem cum este folosit site-ul, pentru a-l îmbunătăți (ex. Google Analytics).
                </p>
              </div>
              <input
                type="checkbox"
                checked={analyticsChoice}
                onChange={(e) => setAnalyticsChoice(e.target.checked)}
                className="sr-only peer"
              />
              <div className="shrink-0 w-11 h-6 rounded-full bg-charcoal-200 peer-checked:bg-brand-600 relative mt-0.5 transition-colors">
                <div className="absolute top-0.5 left-0.5 peer-checked:left-5 w-5 h-5 rounded-full bg-white transition-all" />
              </div>
            </label>

            <label className="flex items-start justify-between gap-4 p-4 rounded-xl border border-charcoal-100 cursor-pointer">
              <div>
                <p className="font-medium text-charcoal-900 text-sm">Publicitate</p>
                <p className="text-xs text-charcoal-500 mt-1">
                  Folosite pentru a măsura eficiența campaniilor noastre (ex. Google Ads) și a afișa oferte relevante.
                </p>
              </div>
              <input
                type="checkbox"
                checked={marketingChoice}
                onChange={(e) => setMarketingChoice(e.target.checked)}
                className="sr-only peer"
              />
              <div className="shrink-0 w-11 h-6 rounded-full bg-charcoal-200 peer-checked:bg-brand-600 relative mt-0.5 transition-colors">
                <div className="absolute top-0.5 left-0.5 peer-checked:left-5 w-5 h-5 rounded-full bg-white transition-all" />
              </div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 px-6 py-5 border-t border-charcoal-100">
            <button
              onClick={rejectNonEssential}
              className="btn-secondary flex-1 justify-center"
            >
              Doar necesare
            </button>
            <button
              onClick={() => saveConsent({ analytics: analyticsChoice, marketing: marketingChoice })}
              className="btn-secondary flex-1 justify-center"
            >
              Salvează alegerea
            </button>
            <button
              onClick={acceptAll}
              className="btn-primary flex-1 justify-center"
            >
              Acceptă toate
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white border border-charcoal-100 rounded-2xl shadow-2xl p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-brand-50 items-center justify-center">
            <Cookie className="w-5 h-5 text-brand-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-charcoal-700 leading-relaxed">
              Folosim cookie-uri necesare pentru funcționarea site-ului și, doar cu acordul tău,
              cookie-uri de analiză și publicitate. Poți alege ce accepți sau afla mai multe în{' '}
              <Link to="/cookie-uri" className="text-brand-600 font-medium hover:underline">
                Politica de Cookie-uri
              </Link>.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <button onClick={acceptAll} className="btn-primary">
                Acceptă toate
              </button>
              <button onClick={rejectNonEssential} className="btn-secondary">
                Doar necesare
              </button>
              <button
                onClick={openSettings}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-charcoal-600 hover:text-charcoal-900 transition-colors"
              >
                <Settings2 className="w-4 h-4" />
                Setări
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
