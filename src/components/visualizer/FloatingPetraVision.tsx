import { Link, useLocation } from 'react-router-dom'
import { PETRA_VISION_ENABLED, PETRA_VISION_PATH } from '@/lib/features'

// Edge tab for Petra VISION, stacked just above the paving-calculator tab
// (FloatingCalculator) with a gap between them. Same pattern: it sits on the
// right edge and expands to the left on hover and keyboard focus. It is a link
// to the simulator page, so there is no panel; the page itself is Romanian only
// and already is the simulator, so the tab hides on the English site and there.

const ICON_SRC = '/images/petra-vision-icon.webp'

export function FloatingPetraVision() {
  const { pathname } = useLocation()
  const isEnglish = pathname === '/en' || pathname.startsWith('/en/')
  const onSimulator = pathname.replace(/\/$/, '') === PETRA_VISION_PATH
  if (!PETRA_VISION_ENABLED || isEnglish || onSimulator) return null

  return (
    <Link
      to={PETRA_VISION_PATH}
      aria-label="Petra VISION: simulator inteligent de pavaje"
      className="group print:hidden fixed right-0 top-[calc(50%-5.5rem)] z-40 -translate-y-1/2 flex items-center rounded-l-2xl border-y border-l border-brand-600/40 bg-white py-3 pl-3 pr-3 text-charcoal-900 shadow-xl transition-[background-color,box-shadow] duration-200 hover:bg-brand-50 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 active:bg-brand-100"
    >
      <img src={ICON_SRC} alt="" width={44} height={44} className="h-11 w-11 shrink-0" />
      <span className="ml-0 grid max-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-[max-width,opacity,margin] duration-300 ease-out group-hover:ml-3 group-hover:max-w-[220px] group-hover:opacity-100 group-focus-visible:ml-3 group-focus-visible:max-w-[220px] group-focus-visible:opacity-100 motion-reduce:transition-none">
        <span className="text-sm font-semibold leading-tight">
          Petra <span className="font-bold text-brand-600">VISION</span>
        </span>
        <span className="text-xs leading-tight text-charcoal-600">Simulator inteligent de pavaje</span>
      </span>
    </Link>
  )
}
