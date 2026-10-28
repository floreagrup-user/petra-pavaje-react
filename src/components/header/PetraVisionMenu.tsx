import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { PETRA_VISION_PATH } from '@/lib/features'
import { cn } from '@/lib/utils'

const ICON = '/images/petra-vision-icon.webp'
const LOGO = '/images/petra-vision-logo.webp'
const SUBMENU_LABEL = 'Simulator inteligent de pavaje'
const SUBMENU_HINT = 'Vezi pavajul Petra în curtea ta, pornind de la o fotografie.'

// Desktop header button that replaces "Solicita Oferta": opens a small panel
// with the simulator link. A disclosure (button + aria-expanded), not an ARIA
// menu, so Tab and Escape behave the way people expect. It opens on hover and
// on click or keyboard, and closes on Escape or a click outside.
export function PetraVisionMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative hidden md:block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="petra-vision-panel"
        className="inline-flex items-center gap-2 rounded-md border border-brand-600/40 bg-white py-1.5 pl-2 pr-3 text-sm font-semibold text-charcoal-900 shadow-sm transition-colors hover:border-brand-600 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <img src={ICON} alt="" width="28" height="28" className="h-7 w-7" />
        <span>
          Petra <span className="font-bold text-brand-600">VISION</span>
        </span>
        <ChevronDown className={cn('h-4 w-4 text-charcoal-500 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="petra-vision-panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full z-10 w-[22rem] pt-2"
          >
            <div className="rounded-xl border border-charcoal-100 bg-white p-2 shadow-premium">
              <Link
                to={PETRA_VISION_PATH}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <img src={LOGO} alt="" width="64" height="65" className="h-16 w-16 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-charcoal-900">{SUBMENU_LABEL}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-charcoal-600">{SUBMENU_HINT}</span>
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Same entry inside the mobile menu, where hover does not exist: the title and
// the submenu label are both visible, in one tappable card.
export function PetraVisionMobileLink({ onClick }: { onClick: () => void }) {
  return (
    <Link
      to={PETRA_VISION_PATH}
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg border border-brand-600/40 bg-white p-3 transition-colors hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <img src={LOGO} alt="" width="56" height="57" className="h-14 w-14 shrink-0" />
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-charcoal-900">
          Petra <span className="font-bold text-brand-600">VISION</span>
        </span>
        <span className="block text-xs leading-snug text-charcoal-600">{SUBMENU_LABEL}</span>
      </span>
    </Link>
  )
}
