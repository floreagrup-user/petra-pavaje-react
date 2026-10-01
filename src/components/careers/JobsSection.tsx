import { motion } from 'framer-motion'
import { MapPin, Users, Clock, ChevronDown, Send } from 'lucide-react'
import { jobs, type JobLocale } from '@/data/jobs'

const COPY = {
  ro: {
    eyebrow: 'Posturi disponibile',
    heading: 'Căutăm colegi noi',
    intro: 'Toate posturile sunt cu normă întreagă și contract de muncă pe perioadă nedeterminată.',
    positions: (n: number) => (n === 1 ? '1 post' : `${n} posturi`),
    requirements: 'Ce ne dorim de la tine',
    responsibilities: 'Responsabilități',
    offers: 'Ce oferim',
    experience: 'Experiență',
    apply: 'Aplică pentru acest post',
  },
  en: {
    eyebrow: 'Open positions',
    heading: "We're looking for new colleagues",
    intro: 'All positions are full-time with a permanent employment contract.',
    positions: (n: number) => (n === 1 ? '1 opening' : `${n} openings`),
    requirements: 'What we are looking for',
    responsibilities: 'Responsibilities',
    offers: 'What we offer',
    experience: 'Experience',
    apply: 'Apply for this position',
  },
} as const

interface JobsSectionProps {
  locale: JobLocale
  onApply: (jobTitle: string) => void
}

export function JobsSection({ locale, onApply }: JobsSectionProps) {
  const copy = COPY[locale]

  return (
    <section id="posturi" className="py-16 md:py-24 scroll-mt-24">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-2">{copy.eyebrow}</p>
          <h2 className="heading-h2 text-charcoal-900 mb-3">{copy.heading}</h2>
          <p className="text-charcoal-600 leading-relaxed">{copy.intro}</p>
        </motion.div>

        <ul className="space-y-3 max-w-4xl">
          {jobs.map((job) => {
            const text = job[locale]
            return (
              <li key={job.id}>
                <details className="group rounded-xl border border-charcoal-100 bg-white open:bg-charcoal-50 transition-colors">
                  <summary className="flex items-center gap-4 cursor-pointer list-none p-5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 [&::-webkit-details-marker]:hidden">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-charcoal-900 text-lg mb-2">{text.title}</h3>
                      <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-charcoal-600">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-brand-600 shrink-0" aria-hidden="true" />
                          {text.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-brand-600 shrink-0" aria-hidden="true" />
                          {copy.positions(job.positions)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-brand-600 shrink-0" aria-hidden="true" />
                          {text.schedule}
                        </span>
                      </p>
                    </div>
                    <ChevronDown
                      className="w-5 h-5 text-charcoal-500 shrink-0 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>

                  <div className="px-5 pb-6 pt-1 space-y-6">
                    <p className="text-charcoal-700 leading-relaxed">{text.summary}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-charcoal-900 mb-2">{copy.requirements}</h4>
                        <ul className="list-disc pl-5 space-y-1.5 text-sm text-charcoal-600 leading-relaxed">
                          {text.requirements.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal-900 mb-2">{copy.offers}</h4>
                        <ul className="list-disc pl-5 space-y-1.5 text-sm text-charcoal-600 leading-relaxed">
                          {text.offers.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        {text.experience && (
                          <p className="mt-4 text-sm text-charcoal-600">
                            <span className="font-semibold text-charcoal-900">{copy.experience}:</span> {text.experience}
                          </p>
                        )}
                      </div>
                    </div>

                    {text.responsibilities && (
                      <div>
                        <h4 className="font-semibold text-charcoal-900 mb-2">{copy.responsibilities}</h4>
                        <ul className="list-disc pl-5 space-y-1.5 text-sm text-charcoal-600 leading-relaxed">
                          {text.responsibilities.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button type="button" onClick={() => onApply(text.title)} className="btn-primary group/apply">
                      <Send className="w-4 h-4 mr-2 group-hover/apply:translate-x-1 transition-transform" aria-hidden="true" />
                      {copy.apply}
                    </button>
                  </div>
                </details>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
