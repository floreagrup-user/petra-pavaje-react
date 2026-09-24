import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { isEnglishPath } from '@/lib/i18n-routes'
import { HOMEPAGE_FAQ_ITEMS, HOMEPAGE_FAQ_ITEMS_EN } from '@/data/faq-homepage'

export function FaqSection() {
  const isEnglish = isEnglishPath(useLocation().pathname)
  const items = isEnglish ? HOMEPAGE_FAQ_ITEMS_EN : HOMEPAGE_FAQ_ITEMS
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [openQuestion, setOpenQuestion] = useState<string | null>(items[0]?.question ?? null)

  return (
    <section ref={ref} className="section-padding bg-charcoal-50">
      <div className="container-premium max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">
            {isEnglish ? 'Frequently asked questions' : 'Întrebări frecvente'}
          </p>
          <h2 className="heading-h2 text-charcoal-900 mb-4">
            {isEnglish ? 'What you want to know about Petra Pavaje' : 'Ce vrei să știi despre Petra Pavaje'}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {items.map((item) => {
            const isOpen = openQuestion === item.question
            return (
              <div key={item.question} className="bg-white rounded-xl border border-charcoal-100 overflow-hidden">
                <button
                  onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-charcoal-900">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-charcoal-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-charcoal-600 leading-relaxed whitespace-pre-line">{item.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link to={isEnglish ? '/en/faq' : '/faq'} className="btn-secondary">
            {isEnglish ? 'See all questions' : 'Vezi toate întrebările'}
          </Link>
        </div>
      </div>
    </section>
  )
}
