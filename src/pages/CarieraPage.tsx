import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Factory, TrendingUp, Handshake, Wallet, GraduationCap, Car, Clock, ShieldCheck,
  PartyPopper, Mail, Send, Phone,
} from 'lucide-react'
import { factories } from '@/data/site'
import { trackEvent } from '@/lib/analytics'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

const STATS = [
  { value: '700+', label: 'Angajați' },
  { value: '4', label: 'Fabrici în România' },
  { value: '25+', label: 'Ani de experiență' },
]

const HIGHLIGHTS = [
  { icon: Factory, title: 'Fabrici Moderne', body: 'Echipamente de ultimă generație și condiții europene de muncă.' },
  { icon: TrendingUp, title: 'Dezvoltare Continuă', body: 'Programe de training și oportunități de avansare.' },
  { icon: Handshake, title: 'Echipă Unită', body: 'Mediu de lucru prietenos și colaborativ.' },
]

const BENEFITS = [
  { icon: Wallet, title: 'Salariu Competitiv', body: 'Pachet salarial atractiv, cu bonusuri de performanță și prime pentru rezultate excepționale.' },
  { icon: GraduationCap, title: 'Training & Dezvoltare', body: 'Programe de formare profesională, cursuri de specializare și oportunități de avansare.' },
  { icon: Car, title: 'Transport Asigurat', body: 'Transport gratuit de la domiciliu pentru angajații din zonele apropiate fabricilor.' },
  { icon: Clock, title: 'Program Flexibil', body: 'Echilibru între viața profesională și personală, cu program adaptat nevoilor tale.' },
  { icon: ShieldCheck, title: 'Siguranță la Muncă', body: 'Standarde europene de protecție a muncii, echipament de protecție de calitate.' },
  { icon: PartyPopper, title: 'Evenimente & Team Building', body: 'Petreceri de companie, excursii și activități de team building pe tot parcursul anului.' },
]

export function CarieraPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', position: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  useEffect(() => {
    const url = `${window.location.origin}/cariera`
    const title = `Carieră - Construiește-ți Viitorul Alături de Noi | ${SEO_SITE_NAME}`
    const description =
      'Alătură-te unei echipe de peste 700 de profesioniști la Petra Pavaje. Descoperă beneficiile și pozițiile disponibile în cele 4 fabrici din România.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
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
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Carieră', item: url },
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
          message: `Poziție dorită: ${formData.position || 'Nespecificat'}\n\n${formData.message}`,
          type: 'career',
          repEmail: 'cariera@petrapavaje.ro',
          repName: 'Departament HR',
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', position: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">Carieră</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Angajăm în 4 locații</p>
            <h1 className="heading-h1 mb-4 max-w-3xl">Construiește-ți Viitorul Alături de Noi</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl mb-10">
              Alătură-te unei echipe de peste 700 de profesioniști pasionați. La Petra Pavaje, fiecare zi înseamnă o
              nouă oportunitate de a crea ceva durabil.
            </p>

            <div className="flex flex-wrap gap-10">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-charcoal-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-premium">
          <div className="grid sm:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="rounded-xl bg-charcoal-50 p-6"
                >
                  <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-charcoal-900 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-charcoal-600 leading-relaxed">{item.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-charcoal-50">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-2">De ce Petra Pavaje</p>
            <h2 className="heading-h2 text-charcoal-900">Beneficii pentru Angajații Noștri</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-xl bg-white p-6 border border-charcoal-100">
                  <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-charcoal-900 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-charcoal-600 leading-relaxed">{item.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-2">Unde ne găsești</p>
            <h2 className="heading-h2 text-charcoal-900">Fabricile Noastre</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {factories.map((factory, index) => (
              <div key={factory.id} className="rounded-xl bg-charcoal-50 p-6">
                <span className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold mb-4">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-semibold text-charcoal-900 mb-1">{factory.name}</h3>
                <p className="text-sm text-charcoal-500 mb-3">{factory.address}</p>
                <a href={`tel:${factory.phone}`} className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  {factory.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-charcoal-50">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
            <div>
              <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-2">Aplică acum</p>
              <h2 className="heading-h2 text-charcoal-900 mb-4">Fă Primul Pas Spre Cariera Ta</h2>
              <p className="text-charcoal-600 leading-relaxed mb-6">
                Completează formularul alăturat și ne vom întoarce cu un răspuns în cel mai scurt timp. Abia
                așteptăm să te cunoaștem!
              </p>
              <div className="space-y-3">
                <a href="mailto:cariera@petrapavaje.ro" onClick={() => trackEvent('email_click')} className="flex items-center gap-3 text-charcoal-700 hover:text-brand-600 transition-colors">
                  <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                  cariera@petrapavaje.ro
                </a>
                <div className="flex items-center gap-3 text-charcoal-500">
                  <Clock className="w-4 h-4 text-brand-600 shrink-0" />
                  Luni - Vineri, 08:00 - 17:00
                </div>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 bg-white rounded-xl text-center border border-charcoal-100">
                <h3 className="text-xl font-semibold text-charcoal-900 mb-2">Aplicație trimisă cu succes!</h3>
                <p className="text-charcoal-500">Te vom contacta în cel mai scurt timp.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-charcoal-100">
                <input
                  type="text"
                  placeholder="Numele tău *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                />
                <input
                  type="tel"
                  placeholder="Telefon"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  placeholder="Poziția dorită"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                />
                <textarea
                  placeholder="Mesaj *"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all resize-none"
                />
                {submitError && (
                  <p className="text-sm text-red-600">A apărut o eroare. Te rugăm încearcă din nou sau scrie-ne direct pe email.</p>
                )}
                <button type="submit" disabled={submitting} className="btn-primary w-full justify-center group disabled:opacity-60 disabled:cursor-not-allowed">
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  {submitting ? 'Se trimite...' : 'Trimite aplicația'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
