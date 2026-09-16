import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sun, Cloud, TreePine, Cpu, Zap, GraduationCap, Users, Home, Trophy, PartyPopper, Calendar } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

const HERO_STATS = [
  { icon: Sun, value: '10,000 sqm', label: 'Solar Panels' },
  { icon: Cloud, value: '600+ tons', label: 'CO₂ Avoided Yearly' },
  { icon: TreePine, value: '41,000+', label: 'Saplings Planted' },
]

interface Pillar {
  number: string
  icon: typeof Sun
  title: string
  body: string
  highlightValue: string
  highlightLabel: string
  image: string
  alt: string
  reversed?: boolean
}

const PILLARS: Pillar[] = [
  {
    number: '01',
    icon: Sun,
    title: 'Green Energy and Emission Reduction',
    body: 'The transition to a low-carbon economy is the central pillar of our technology investments. We have turned the infrastructure of our four Petra Pavaje factories into green-energy hubs by installing a solar panel system covering roughly 10,000 sqm. With an installed capacity of 1,740 kWp, this infrastructure lets us avoid releasing over 600 tons of CO₂ every year, securing the energy independence of our industrial processes.',
    highlightValue: '1,740 kWp',
    highlightLabel: 'Installed solar panel capacity',
    image: `${R2}/energie-verde-si-emsii-0-web1-1.avif`,
    alt: 'Petra Pavaje solar panels - green energy',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Technological Innovation and Resource Optimization',
    body: "Industrial efficiency is redefined at Petra Pavaje through the use of cutting-edge technologies that prioritize resource conservation. Our production processes are fully automated, ensuring a precision that eliminates raw-material waste and maximizes the durability of the finished product. What's more, our approach to sustainability includes optimizing the logistics chain — by strategically locating our factories, we reduce transport distances to customers, minimizing the emissions impact tied to distribution.",
    highlightValue: '4 Factories',
    highlightLabel: 'Strategically located to reduce transport',
    image: `${R2}/inovatie-tehnologica-web1-1.avif`,
    alt: 'Automated production line at Petra Pavaje',
    reversed: true,
  },
  {
    number: '03',
    icon: Zap,
    title: 'Electric Mobility',
    body: "We are fully committed to adopting zero-emission mobility solutions, integrating a fleet of over 60 electric vehicles into our day-to-day operations. This transition is backed by our own network of fast-charging stations, deployed at our strategic locations.",
    highlightValue: '60+ vehicles',
    highlightLabel: 'Electric vehicles in our operating fleet',
    image: `${R2}/mobilitate-electrica-web1-1.avif`,
    alt: 'Petra Pavaje electric vehicle fleet',
  },
  {
    number: '04',
    icon: TreePine,
    title: 'Reforestation Campaigns',
    body: 'Aware of the vital role forests play in regulating the climate, we run large-scale reforestation campaigns. Our 2025 campaign, which planted over 41,000 beech, spruce, ash and larch saplings, represents a systematic effort to restore more than 8 hectares of forest land in Alba county. These efforts aim not only to offset our carbon footprint, but also to protect local biodiversity.',
    highlightValue: '41,000+ saplings',
    highlightLabel: 'Planted across 8+ hectares in Alba county',
    image: `${R2}/actiune-impadurire-web1-2.avif`,
    alt: 'Petra Pavaje reforestation campaign - 41,000 saplings',
    reversed: true,
  },
]

interface CommunityCard {
  number: string
  icon: typeof Sun
  title: string
  body: string
  tag: string
  image: string
  alt: string
  full?: boolean
}

const COMMUNITY_CARDS: CommunityCard[] = [
  {
    number: '01',
    icon: Home,
    title: 'Supporting the Local Economy',
    body: "Petra Pavaje's success is inseparable from the prosperity of the community we operate in. We take pride in a procurement strategy that prioritizes Romanian suppliers for over 90% of our purchases, strengthening the national economy. By shortening supply chains, we reduce the logistics impact on the environment and ensure capital circulates efficiently within the community.",
    tag: '90%+ Romanian suppliers',
    image: `${R2}/economia-locala-web2.avif`,
    alt: 'Supporting the local economy - Petra Pavaje',
  },
  {
    number: '02',
    icon: Users,
    title: 'Respect for People',
    body: 'A sustainable company is built on motivated, protected people. Petra Pavaje offers stable jobs, in an environment governed by the highest standards of professional ethics and safety. We invest constantly in skills-development programs and in modernizing working conditions, because we believe our employees\' wellbeing is the best indicator of our success.',
    tag: 'Ethics and safety',
    image: `${R2}/respectul-fata-de-oameni-web2.avif`,
    alt: 'Respect for people - Petra Pavaje',
  },
  {
    number: '03',
    icon: GraduationCap,
    title: 'Supporting Education',
    body: 'Investing in education is, for us, an investment in the future of innovation. Through strategic partnerships with "1 Decembrie 1918" University in Alba Iulia and the Technical University of Cluj-Napoca, we facilitate the exchange of knowledge between academia and industry, offering students internships and mentorship. In parallel, we are actively involved in modernizing schools and building safe playgrounds for children, and we support social projects dedicated to people in need.',
    tag: 'University partnerships',
    image: `${R2}/sprijin-pt-educatie-web2.avif`,
    alt: 'Supporting education - Petra Pavaje',
    full: true,
  },
  {
    number: '04',
    icon: Trophy,
    title: 'Supporting Competitive Sport',
    body: 'Performance under pressure and technical rigor are values we find both in business and in elite sport. Petra Pavaje supports excellence by sponsoring the National Rally Championship and rugby and football teams. By backing top athletes, we promote role models of success and determination for the whole community.',
    tag: 'Rally · Rugby · Football',
    image: `${R2}/sustinerea-sportului-de-performanta-web2.avif`,
    alt: 'Supporting competitive sport - Petra Pavaje',
  },
  {
    number: '05',
    icon: PartyPopper,
    title: 'Organizing Sports Events',
    body: 'Beyond performance, we believe in the power of sport to bring a community together and promote a balanced lifestyle. We hold annual volleyball and tennis competitions and sponsor cycling and running events open to every age group. These initiatives are our way of giving back to the community and investing in the vitality of younger generations.',
    tag: 'Volleyball · Tennis · Cycling · Running',
    image: `${R2}/organizarea-evenimentelor-sportive-web2.avif`,
    alt: 'Organizing sports events - Petra Pavaje',
  },
]

export function SustainabilityPageEN() {
  const { ref: pillarsRef, isIntersecting: pillarsIn } = useIntersectionObserver({ threshold: 0.05 })
  const { ref: cardsRef, isIntersecting: cardsIn } = useIntersectionObserver({ threshold: 0.05 })

  useEffect(() => {
    const url = `${window.location.origin}/en/sustenabilitate`
    const title = `Sustainability - In Harmony with Nature | ${SEO_SITE_NAME}`
    const description =
      'Concrete investments in green energy, electric mobility and reforestation campaigns, plus social responsibility for community, education and sport.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/sustenabilitate', '/en/sustenabilitate')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${R2}/Cover-web1.avif`)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/en` },
        { '@type': 'ListItem', position: 2, name: 'Sustainability', item: url },
      ],
    })

    return resetSEO
  }, [])

  return (
    <div className="pt-20 md:pt-24">
      <section className="relative bg-charcoal-950 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${R2}/Cover-web1.avif`}
            alt="Petra Pavaje - Sustainability"
            className="w-full h-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-charcoal-950/40" />
        </div>
        <div className="container-premium relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-300 mb-6">
              <Link to="/en" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Sustainability</span>
            </nav>
            <p className="inline-flex items-center gap-2 text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Sustainability
            </p>
            <h1 className="heading-h1 mb-6 max-w-2xl">In Harmony with Nature<sup className="text-lg align-super">®</sup></h1>
            <p className="text-body-lg text-charcoal-200 max-w-2xl mb-10">
              For us, sustainability isn't a one-off project, but a natural evolution of the way we run our
              business. Whether we're talking about investments in green energy, modernizing our production lines,
              or reducing resource consumption, every decision aims at the same goal: a more responsible impact on
              the environment.
            </p>
            <div className="flex flex-wrap gap-8 md:gap-12 pt-8 border-t border-white/10">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <stat.icon className="w-6 h-6 text-brand-500 shrink-0" />
                  <div>
                    <div className="text-xl md:text-2xl font-bold leading-none">{stat.value}</div>
                    <div className="text-xs text-charcoal-300 uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={pillarsRef} className="py-16 md:py-24 bg-white">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-emerald-700 text-sm font-medium tracking-[0.2em] uppercase mb-3">Our Commitment</p>
            <h2 className="heading-h2 text-charcoal-900 mb-4">Care for the Environment</h2>
            <p className="text-body-lg text-charcoal-500">Concrete, measurable investments for a greener future</p>
          </motion.div>

          <div className="space-y-16 md:space-y-20">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                animate={pillarsIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.08 }}
                className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${pillar.reversed ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <div className="relative rounded-xl overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 text-5xl font-bold text-white/70" style={{ fontFamily: 'inherit' }}>
                    {pillar.number}
                  </span>
                  <img src={pillar.image} alt={pillar.alt} className="w-full h-auto object-cover" loading={index === 0 ? 'eager' : 'lazy'} />
                </div>
                <div>
                  <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                    <pillar.icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal-900 mb-3">{pillar.title}</h3>
                  <p className="text-charcoal-600 leading-relaxed mb-5">{pillar.body}</p>
                  <div className="inline-flex flex-col gap-0.5 border-l-4 border-emerald-600 pl-4 py-1">
                    <span className="text-xl font-bold text-emerald-700">{pillar.highlightValue}</span>
                    <span className="text-xs text-charcoal-500 uppercase tracking-wide">{pillar.highlightLabel}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-16 md:mt-20 max-w-2xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-medium text-charcoal-800 italic leading-snug">
              "Every investment in green technology and every tree planted is a{' '}
              <strong className="text-emerald-700 not-italic">concrete promise</strong> to future generations."
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={cardsRef} className="py-16 md:py-24 bg-charcoal-50">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Social Responsibility</p>
            <h2 className="heading-h2 text-charcoal-900 mb-4">Care for the Community</h2>
            <p className="text-body-lg text-charcoal-500">Building value beyond products — for people, education and community</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMMUNITY_CARDS.map((card, index) => (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, y: 30 }}
                animate={cardsIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06 }}
                className={`rounded-xl overflow-hidden bg-white border border-charcoal-100 ${card.full ? 'md:col-span-2' : ''}`}
              >
                <div className={`relative overflow-hidden ${card.full ? 'aspect-[21/9]' : 'aspect-[3/2]'}`}>
                  <img src={card.image} alt={card.alt} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent" />
                  <span className="absolute top-3 left-4 text-3xl font-bold text-white/80">{card.number}</span>
                </div>
                <div className="p-6">
                  <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center mb-3">
                    <card.icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-charcoal-600 leading-relaxed mb-4">{card.body}</p>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-charcoal-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600" aria-hidden="true" />
                    {card.tag}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 rounded-2xl bg-emerald-900 text-white p-10 md:p-14 text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6">
              <TreePine className="w-3.5 h-3.5" />
              World Environment Day
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">"In Harmony with Nature"</h3>
            <p className="text-emerald-100 leading-relaxed mb-6">
              Under the motto "In harmony with nature", Petra Pavaje's anniversary is celebrated every year on June
              5 — World Environment Day itself — reaffirming our commitment to protecting natural resources.
            </p>
            <div className="inline-flex items-center gap-2 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <strong>June 5</strong> — World Environment Day
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
