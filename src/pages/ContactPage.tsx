import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Navigation, Send, CheckCircle } from 'lucide-react'
import { countyReps, getRepByCounty, factories } from '@/data/site'

const counties = [
  { label: 'Alba', code: 'AB' }, { label: 'Arad', code: 'AR' }, { label: 'Argeș', code: 'AG' },
  { label: 'Bacău', code: 'BC' }, { label: 'Bihor', code: 'BH' }, { label: 'Bistrița-Năsăud', code: 'BN' },
  { label: 'Botoșani', code: 'BT' }, { label: 'Brașov', code: 'BV' }, { label: 'Brăila', code: 'BR' },
  { label: 'București', code: 'B' }, { label: 'Buzău', code: 'BZ' }, { label: 'Caraș-Severin', code: 'CS' },
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

export function ContactPage() {
  const [selectedCounty, setSelectedCounty] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', county: '', message: '', gdpr: false })

  const rep = selectedCounty ? getRepByCounty(selectedCounty) : null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 5000)
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
              Selectează județul tău pentru a vedea reprezentantul de vânzări din zona ta sau trimite-ne un mesaj direct.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="heading-h2 text-charcoal-900 mb-6">Selectează Județul</h2>
              <p className="text-charcoal-500 mb-6">Alege județul pentru a vedea reprezentantul tău de vânzări.</p>

              <div className="relative mb-8">
                <select
                  value={selectedCounty}
                  onChange={(e) => setSelectedCounty(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all appearance-none"
                >
                  <option value="">Alege județul...</option>
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
                  <h3 className="text-lg font-semibold text-charcoal-900 mb-4">Reprezentantul tău</h3>
                  <div className="space-y-3">
                    <p className="text-charcoal-900 font-medium">{rep.name}</p>
                    <a href={`mailto:${rep.email}`} className="flex items-center gap-2 text-charcoal-600 hover:text-brand-600 transition-colors">
                      <Mail className="w-4 h-4" />
                      {rep.email}
                    </a>
                    <a href={`tel:${rep.phone}`} className="flex items-center gap-2 text-charcoal-600 hover:text-brand-600 transition-colors">
                      <Phone className="w-4 h-4" />
                      {rep.phone}
                    </a>
                    <div className="flex gap-3 pt-2">
                      <a href={`tel:${rep.phone}`} className="btn-primary text-sm px-4 py-2">
                        Sună acum
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
                <p className="text-charcoal-400 text-sm italic">Selectează județul pentru a vedea reprezentantul de vânzări din zona ta.</p>
              )}
            </div>

            <div>
              <h2 className="heading-h2 text-charcoal-900 mb-6">Trimite-ne un mesaj</h2>
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-stone-100 rounded-xl text-center"
                >
                  <CheckCircle className="w-12 h-12 text-brand-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-charcoal-900 mb-2">Mesaj trimis cu succes!</h3>
                  <p className="text-charcoal-500">Te vom contacta în cel mai scurt timp.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Numele tău *"
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
                      placeholder="Telefon"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <select
                      value={formData.county}
                      onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all appearance-none"
                    >
                      <option value="">Județul tău</option>
                      {counties.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <textarea
                      placeholder="Mesaj *"
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
                      Sunt de acord ca datele mele să fie prelucrate conform Regulamentului (UE) 2016/679.
                    </span>
                  </label>
                  <button type="submit" className="btn-primary w-full justify-center group">
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Trimite mesaj
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
            <h2 className="heading-h2 text-charcoal-900 mb-4">Fabricile Noastre</h2>
            <p className="text-body-lg text-charcoal-500 max-w-2xl mx-auto">
              4 centre de producție strategic poziționate pentru a fi mereu aproape de tine.
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
                  Navigare GPS
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
