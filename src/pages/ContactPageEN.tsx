import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Navigation, Send, CheckCircle } from 'lucide-react'
import { getRepByCounty, factories } from '@/data/site'
import { trackEvent } from '@/lib/analytics'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'

const counties = [
  { label: 'Alba', code: 'AB' }, { label: 'Arad', code: 'AR' }, { label: 'Argeș', code: 'AG' },
  { label: 'Bacău', code: 'BC' }, { label: 'Bihor', code: 'BH' }, { label: 'Bistrița-Năsăud', code: 'BN' },
  { label: 'Botoșani', code: 'BT' }, { label: 'Brașov', code: 'BV' }, { label: 'Brăila', code: 'BR' },
  { label: 'Bucharest', code: 'B' }, { label: 'Buzău', code: 'BZ' }, { label: 'Caraș-Severin', code: 'CS' },
  { label: 'Călărași', code: 'CL' }, { label: 'Cluj', code: 'CJ' }, { label: 'Constanța', code: 'CT' },
  { label: 'Covasna', code: 'CV' }, { label: 'Dâmbovița', code: 'DB' }, { label: 'Dolj', code: 'DJ' },
  { label: 'Galați', code: 'GL' }, { label: 'Giurgiu', code: 'GR' }, { label: 'Gorj', code: 'GJ' },
  { label: 'Harghita', code: 'HR' }, { label: 'Hunedoara', code: 'HD' }, { label: 'Ialomița', code: 'IL' },
  { label: 'Iași', code: 'IS' }, { label: 'Ilfov', code: 'IF' }, { label: 'Maramureș', code: 'MM' },
  { label: 'Mehedinți', code: 'MH' }, { label: 'Mureș', code: 'MS' }, { label: 'Neamț', code: 'NT' },
  { label: 'Olt', code: 'OT' }, { label: 'Prahova', code: 'PH' }, { label: 'Satu Mare', code: 'SM' },
  { label: 'Sălaj', code: 'SJ' }, { label: 'Sibiu', code: 'SB' }, { label: 'Suceava', code: 'SV' },
  { label: 'Teleorman', code: 'TR' }, { label: 'Timiș', code: 'TM' }, { label: 'Tulcea', code: 'TL' },
  { label: 'Vaslui', code: 'VS' }, { label: 'Vâlcea', code: 'VL' }, { label: 'Vrancea', code: 'VN' },
]

export function ContactPageEN() {
  const [selectedCounty, setSelectedCounty] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', gdpr: false })

  const rep = selectedCounty ? getRepByCounty(selectedCounty) : null

  useEffect(() => {
    const url = `${window.location.origin}/en/contact`
    const title = `Contact - Request a Personalized Quote | ${SEO_SITE_NAME}`
    const description =
      'Contact Petra Pavaje for a personalized quote. Select your county for your local sales representative, or send us a message directly.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/contact', '/en/contact')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/en` },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: url },
      ],
    })

    return resetSEO
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          county: rep?.county || '',
          message: formData.message,
          type: 'contact',
          repEmail: rep?.email,
          repName: rep?.name,
        }),
      })

      if (!res.ok) throw new Error('Request failed')

      trackEvent('generate_lead', { county: rep?.county || '' })
      setFormSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '', gdpr: false })
      setTimeout(() => setFormSubmitted(false), 5000)
    } catch {
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-h1 mb-4">Contact</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Select your county to see your local sales representative, or send us a message directly.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="heading-h2 text-charcoal-900 mb-6">Select Your County</h2>
              <p className="text-charcoal-500 mb-6">Choose your county to see your local sales representative.</p>

              <div className="relative mb-8">
                <select
                  value={selectedCounty}
                  onChange={(e) => setSelectedCounty(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all appearance-none"
                >
                  <option value="">Choose your county…</option>
                  {counties.map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-charcoal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {rep ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-charcoal-50 rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-charcoal-900 mb-4">Your Representative</h3>
                  <div className="space-y-3">
                    <p className="text-charcoal-900 font-medium">{rep.name}</p>
                    <a href={`mailto:${rep.email}`} onClick={() => trackEvent('email_click')} className="flex items-center gap-2 text-charcoal-600 hover:text-brand-600 transition-colors">
                      <Mail className="w-4 h-4" />
                      {rep.email}
                    </a>
                    <a href={`tel:${rep.phone}`} className="flex items-center gap-2 text-charcoal-600 hover:text-brand-600 transition-colors">
                      <Phone className="w-4 h-4" />
                      {rep.phone}
                    </a>
                    <div className="flex gap-3 pt-2">
                      <a href={`tel:${rep.phone}`} className="btn-primary text-sm px-4 py-2">
                        Call Now
                      </a>
                      <a
                        href={`https://wa.me/${rep.phone.replace(/\s/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm px-4 py-2"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <p className="text-charcoal-400 text-sm italic">Select your county to see your local sales representative.</p>
              )}
            </div>

            <div>
              <h2 className="heading-h2 text-charcoal-900 mb-6">Send Us a Message</h2>
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-stone-100 rounded-xl text-center"
                >
                  <CheckCircle className="w-12 h-12 text-brand-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-charcoal-900 mb-2">Message sent successfully!</h3>
                  <p className="text-charcoal-500">We'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your name *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message *"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.gdpr}
                      onChange={(e) => setFormData({ ...formData, gdpr: e.target.checked })}
                      className="mt-1"
                    />
                    <span className="text-sm text-charcoal-500">
                      I agree to have my data processed in accordance with Regulation (EU) 2016/679.
                    </span>
                  </label>
                  {submitError && (
                    <p className="text-sm text-red-600">
                      Something went wrong while sending your message. Please try again or call us directly.
                    </p>
                  )}
                  <button type="submit" disabled={submitting} className="btn-primary w-full justify-center group disabled:opacity-60 disabled:cursor-not-allowed">
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    {submitting ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-charcoal-50">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-h2 text-charcoal-900 mb-4">Our Factories</h2>
            <p className="text-body-lg text-charcoal-500 max-w-2xl mx-auto">
              4 production centers strategically located to always be close to you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {factories.map((factory, index) => (
              <motion.div
                key={factory.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-md"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold text-charcoal-900">{factory.name}</h3>
                </div>
                <div className="space-y-2 text-sm text-charcoal-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                    <span>{factory.address}</span>
                  </div>
                  <a href={`tel:${factory.phone}`} className="flex items-center gap-2 hover:text-brand-600 transition-colors">
                    <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                    {factory.phone}
                  </a>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                    <span>{factory.schedule}</span>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${factory.lat},${factory.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  GPS Directions
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
