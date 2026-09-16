import { useLocation } from 'react-router-dom'
import { trackEvent } from '@/lib/analytics'
import { isEnglishPath } from '@/lib/i18n-routes'

const WHATSAPP_NUMBER = '40784223426'

export function WhatsAppButton() {
  const isEnglish = isEnglishPath(useLocation().pathname)

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { source: 'floating_button' })}
      aria-label={isEnglish ? 'Message us on WhatsApp' : 'Scrie-ne pe WhatsApp'}
      className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.82c0 4.55-3.7 8.25-8.25 8.25a8.26 8.26 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.19-.31a8.202 8.202 0 0 1-1.26-4.39c0-4.55 3.7-8.24 8.26-8.24Zm-4.53 4.6c-.16 0-.42.06-.64.31-.22.24-.85.83-.85 2.03 0 1.2.87 2.35.99 2.51.12.16 1.69 2.7 4.19 3.73.58.25 1.04.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.96-.14.16-.29.18-.53.06-.24-.12-1.03-.38-1.96-1.2-.72-.65-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.35-.76-1.85-.2-.48-.4-.42-.55-.42Z" />
      </svg>
    </a>
  )
}
