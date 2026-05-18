import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Navigation, Send, MessageCircle } from 'lucide-react'
import { countyReps, getRepByCounty, factories } from '@/data/site'

const counties = countyReps.map(r => ({ code: r.countyCode, name: r.county }))

export function ContactPage() {
  const [selectedCounty, setSelectedCounty] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    county: '',
    message: '',
    gdpr: false,
  })

  const rep = selectedCounty ? getRepByCounty(selectedCounty) : null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission via Cloudflare Worker
    console.log('Form submitted:', formData)
  }

  return (
    <div className="pt-20 md:pt-24">
      {/* Breadcrumbs */}
      <div className="bg-charcoal-50 border-b border-charcoal-100">
        <div className="container-premium py-4">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-charcoal-500 hover:text-charcoal-700 transition-colors">Acasa</a>
            <span className="text-charcoal-300">/</span>
            <span className="text-charcoal-900 font-medium">Contact</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-h1 text-charcoal-900 mb-4">Contacteaza-ne</h1>
            <p className="text-body-lg text-charcoal-500 max-w-2xl">
              Selectează județul pentru a vedea reprezentantul tău de vânzări sau completează formularul de mai jos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* County Selector */}
      <section className="py-8 bg-charcoal-50">
        <div className="container-premium">
          <div className="max-w-md">
            <label htmlFor="county" className="block text-sm font-medium text-charcoal-700 mb-2">
              Alege județul...
            </label>
            <select
              id="county"
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
            >
              <option value="">Selectează județul</option>
              {counties.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Rep Info */}
          {rep && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-white rounded-xl shadow-md max-w-md"
            >
              <h3 className="text-lg font-semibold text-charcoal-900 mb-3">Reprezentantul tău</h3>
              <div className="space-y-3">
                <p className="text-charcoal-700 font-medium">{rep.name}</p>
                <a href={`mailto:${rep.email}`} className="flex items-center gap-2 text-brand-600 hover:text-primary-700">
                  <Mail className="w-4 h-4" />
                  {rep.email}
                </a>
                <a href={`tel:${rep.phone}`} className="flex items-center gap-2 text-brand-600 hover:text-primary-700">
                  <Phone className="w-4 h-4" />
                  {rep.phone}
                </a>
                <div className="flex gap-3 pt-2">
                  <a href={`tel:${rep.phone}`} className="btn-primary text-sm px-4 py-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Sună acum
                  </a>
                  <a href={`https://wa.me/${rep.phone.replace(/[^0-9]/g, '')}`} className="btn-secondary text-sm px-4 py-2">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Form & Factories */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="heading-h2 text-charcoal-900 mb-2">Trimite-ne un mesaj</h2>
              <p className="text-charcoal-500 mb-8">Completează formularul și te vom contacta în cel mai scurt timp</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal-700 mb-1">
                    Numele tău
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="Numele complet"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      placeholder="email@exemplu.ro"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-charcoal-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      placeholder="+40 7xx xxx xxx"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="form-county" className="block text-sm font-medium text-charcoal-700 mb-1">
                    Județul tău
                  </label>
                  <select
                    id="form-county"
                    value={formData.county}
                    onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                    className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  >
                    <option value="">--Selectează județul--</option>
                    {counties.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal-700 mb-1">
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
                    placeholder="Descrie proiectul tău..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="gdpr"
                    required
                    checked={formData.gdpr}
                    onChange={(e) => setFormData({ ...formData, gdpr: e.target.checked })}
                    className="mt-1 w-4 h-4 text-brand-600 border-charcoal-300 rounded focus:ring-brand-500"
                  />
                  <label htmlFor="gdpr" className="text-sm text-charcoal-500">
                    Sunt de acord ca datele mele să fie prelucrate conform Regulamentului (UE) 2016/679.
                    Am citit și înțeles Politica de Confidențialitate.
                  </label>
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  <Send className="w-4 h-4 mr-2" />
                  Trimite mesajul
                </button>

                <p className="text-xs text-charcoal-400 text-center">
                  Datele tale sunt în siguranță și nu vor fi partajate cu terți.
                </p>
              </form>
            </div>

            {/* Factories */}
            <div>
              <h2 className="heading-h2 text-charcoal-900 mb-2">Fabricile Noastre</h2>
              <p className="text-charcoal-500 mb-8">4 centre de producție strategic poziționate</p>

              <div className="space-y-4">
                {factories.map((factory, index) => (
                  <motion.div
                    key={factory.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 bg-charcoal-50 rounded-xl"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-charcoal-900">{factory.name}</h3>
                        <p className="text-sm text-charcoal-500">{factory.address}</p>
                      </div>
                    </div>
                    <div className="pl-11 space-y-2">
                      <a href={`tel:${factory.phone}`} className="flex items-center gap-2 text-sm text-brand-600 hover:text-primary-700">
                        <Phone className="w-4 h-4" />
                        {factory.phone}
                      </a>
                      <p className="flex items-center gap-2 text-sm text-charcoal-500">
                        <Clock className="w-4 h-4" />
                        Luni - Vineri: 08:00 - 17:00
                      </p>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${factory.lat},${factory.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-primary-700 font-medium"
                      >
                        <Navigation className="w-4 h-4" />
                        Navigare GPS
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
