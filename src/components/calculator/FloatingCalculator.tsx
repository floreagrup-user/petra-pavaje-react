import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'

// Right-edge tab that expands to the left on hover/focus and opens the paving
// calculator in a right-hand panel (same pattern as the product quick view).

// The calculator code is fetched only when the panel is first opened, so the
// button costs almost nothing on every other page.
const PavingCalculator = lazy(() => import('./PavingCalculator').then((m) => ({ default: m.PavingCalculator })))

// Artwork supplied by Petra Pavaje (calculator over pavers), 96px WebP.
const ICON_SRC = '/images/calculator-pavaj.webp'

export function FloatingCalculator() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  // The panel belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const isEnglish = pathname === '/en' || pathname.startsWith('/en/')

  const close = useCallback(() => {
    setOpenOn(null)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])')
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open, close])

  // The calculator page already is the calculator.
  if (/\/calculator-pavaj\/?$/.test(pathname)) return null

  const duration = reduce ? 0 : 0.32
  const label = isEnglish ? 'Calculate what you need' : 'Calculează necesarul'
  const hint = isEnglish ? 'sqm · pallets · kerbs' : 'mp · paleți · borduri'

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpenOn(pathname)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="calculator-panel"
        aria-label={`${isEnglish ? 'Paving calculator' : 'Calculator pavaj'}: ${label.toLowerCase()} (${hint})`}
        className={`group print:hidden fixed right-0 top-1/2 z-40 -translate-y-1/2 flex items-center rounded-l-2xl bg-brand-600 py-3 pl-3 pr-3 text-white shadow-xl transition-[background-color,box-shadow] duration-200 hover:bg-brand-700 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600 active:bg-brand-800 ${open ? 'pointer-events-none opacity-0' : ''}`}
      >
        <img src={ICON_SRC} alt="" width={44} height={43} className="h-11 w-11 shrink-0 rounded-xl shadow-md ring-1 ring-white/50" />
        <span className="ml-0 grid max-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-[max-width,opacity,margin] duration-300 ease-out group-hover:ml-3 group-hover:max-w-[220px] group-hover:opacity-100 group-focus-visible:ml-3 group-focus-visible:max-w-[220px] group-focus-visible:opacity-100 motion-reduce:transition-none">
          <span className="text-sm font-semibold leading-tight">{label}</span>
          <span className="text-xs leading-tight text-white/85">{hint}</span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-charcoal-950/50 print:hidden"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration }}
            />
            <motion.div
              ref={panelRef}
              id="calculator-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="calculator-panel-title"
              className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-[640px] flex-col bg-charcoal-50 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between gap-4 border-b border-charcoal-200 bg-white px-5 py-4 print:hidden">
                <div className="flex items-center gap-3">
                  <img src={ICON_SRC} alt="" width={40} height={39} className="h-10 w-10 shrink-0 rounded-xl" />
                  <div>
                    <h2 id="calculator-panel-title" className="text-lg font-semibold text-charcoal-900">{isEnglish ? 'Paving calculator' : 'Calculator pavaj'}</h2>
                    <p className="text-xs text-charcoal-500">{isEnglish ? 'Pavers, pallets and kerbs for your area' : 'Pavele, paleți și borduri pentru suprafața ta'}</p>
                  </div>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label={isEnglish ? 'Close calculator' : 'Închide calculatorul'}
                  className="grid h-11 w-11 place-items-center rounded-lg text-charcoal-500 hover:bg-charcoal-100 hover:text-charcoal-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                <Suspense fallback={<p className="p-6 text-center text-sm text-charcoal-500" role="status">{isEnglish ? 'Loading the calculator…' : 'Se încarcă calculatorul…'}</p>}>
                  <PavingCalculator compact />
                </Suspense>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
