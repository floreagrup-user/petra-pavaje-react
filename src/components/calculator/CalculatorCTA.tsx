import { Link } from 'react-router-dom'
import { MessageCircle, Phone, Send } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const MAIN_PHONE = '+40 358 732 246'

export function CalculatorCTA() {
  return (
    <div className="rounded-2xl border border-charcoal-200 bg-charcoal-50 p-6 md:p-8 text-center">
      <h2 className="heading-h3 text-charcoal-900 mb-2">Ai nevoie de o ofertă?</h2>
      <p className="text-sm text-charcoal-500 mb-6 max-w-md mx-auto">
        Un specialist Petra Pavaje te poate ajuta să validezi necesarul și să primești o ofertă personalizată.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/contact"
          onClick={() => trackEvent('calculator_quote_clicked')}
          className="btn-primary"
        >
          <Send className="w-4 h-4 mr-2" />
          Solicită Ofertă
        </Link>
        <a
          href={`tel:${MAIN_PHONE.replace(/\s/g, '')}`}
          onClick={() => trackEvent('calculator_phone_clicked')}
          className="btn-secondary"
        >
          <Phone className="w-4 h-4 mr-2" />
          {MAIN_PHONE}
        </a>
        <a
          href={`https://wa.me/${MAIN_PHONE.replace(/\s/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('calculator_whatsapp_clicked')}
          className="btn-secondary"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
