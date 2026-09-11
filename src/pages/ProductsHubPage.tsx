import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  ArrowRight,
  Factory,
  ShieldCheck,
  Layers,
  Truck,
  FlaskConical,
  Palette,
  ChevronDown,
  MessageCircle,
  Calculator,
} from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { useCategoryListSEO } from '@/hooks/useCategoryListSEO'
import { categories } from '@/data/site'
import { categoryImages } from '@/components/sections/CategoriesSection'
import { FeaturedProductsSection } from '@/components/sections/FeaturedProductsSection'
import type { ProductFAQ } from '@/data/types'

const PRIMARY_CATEGORY_IDS = ['premium', 'standard', 'woodstone'] as const

const categoryHrefOverrides: Record<string, string> = {
  woodstone: '/produse/woodstone',
}

const primaryCategories = PRIMARY_CATEGORY_IDS.map((id) => {
  const category = categories.find((c) => c.id === id)!
  return {
    ...category,
    href: categoryHrefOverrides[category.id] || `/produse/${category.slug}`,
    seoSlug: category.id === 'woodstone' ? 'woodstone' : category.slug,
  }
})

const elementCategories = ['borduri', 'boltari', 'garduri'].map((id) => categories.find((c) => c.id === id)!)

const statPills = [
  { icon: Factory, label: '4 fabrici în România' },
  { icon: ShieldCheck, label: 'Garanție 5 ani' },
  { icon: Layers, label: 'Peste 800 de produse' },
  { icon: Truck, label: 'Livrare în toată țara' },
]

const trustPoints = [
  { icon: FlaskConical, title: 'Laborator propriu', body: 'Fiecare lot este testat riguros pentru rezistență la compresiune, absorbție de apă și îngheț-dezgheț.' },
  { icon: Palette, title: 'Peste 30 de nuanțe', body: 'De la culorile clasice gri și roșu, la finisaje antichizate, structurate și inspirate din piatră naturală.' },
  { icon: ShieldCheck, title: 'Certificare ISO', body: 'Producție certificată ISO 9001, ISO 14001 și ISO 45001, cu monitorizare permanentă a calității.' },
  { icon: Factory, title: 'Producție 100% românească', body: 'Fabricile Alba, Prahova, Arad și Neamț asigură o capacitate de 24.000 mp/zi și livrare rapidă la nivel național.' },
]

const PRODUCTS_HUB_FAQ: ProductFAQ[] = [
  {
    question: 'Ce game de produse oferă Petra Pavaje?',
    answer:
      'Trei game principale: Pavaje Premium (19 modele, finisaje antichizate și structurate, inspirate din piatră naturală), Pavaje Standard (Holland, Autobloc, Unda, Quatro, Con și Pavaje Eco — raport optim calitate-preț) și Woodstone (elemente din beton cu aspect de lemn pietrificat). Pe lângă acestea, oferim borduri, bolțari și garduri pentru amenajări complete.',
  },
  {
    question: 'Care este diferența dintre gama Premium și gama Standard?',
    answer:
      'Gama Premium are o paletă mult mai largă de culori și finisaje (antichizat, structurat, Color Lock) și este gândită pentru terase și curți rezidențiale de exceptie. Gama Standard mizează pe robustețe, formate potrivite pentru trafic auto greu și un preț mai accesibil.',
  },
  {
    question: 'Toate produsele au garanție?',
    answer:
      'Da. Pavelele, dalele și bordurile beneficiază de o garanție de 5 ani, iar elementele de canalizare, bolțarii și rigolele de 2 ani, conform standardelor de calitate certificate ISO ale companiei.',
  },
  {
    question: 'Pot vedea fizic culorile și texturile înainte să comand?',
    answer:
      'Recomandăm vizualizarea produselor la showroom-urile proprii sau la partenerii din zona ta, deoarece culoarea reală poate varia ușor față de fotografiile din catalog. Contactează reprezentantul zonal pentru cea mai apropiată locație.',
  },
  {
    question: 'Cum aleg cantitatea necesară de pavaj pentru proiectul meu?',
    answer:
      'Poți folosi calculatorul nostru de pavaj pentru o estimare rapidă în funcție de suprafață și model, sau poți cere o ofertă personalizată — echipa noastră te ajută să alegi grosimea potrivită tipului de trafic.',
  },
]

export function ProductsHubPage() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useCategoryListSEO(
    [...primaryCategories, ...elementCategories].map((c) => ({
      slug: 'seoSlug' in c ? (c as { seoSlug: string }).seoSlug : c.slug,
      name: c.name,
      image: categoryImages[c.id] || c.image,
    })),
    PRODUCTS_HUB_FAQ,
    {
      path: '/produse',
      title: 'Produse - Pavaje Premium, Standard și Woodstone | Petra Pavaje',
      description:
        'Descoperă gama completă Petra Pavaje: pavaje premium, pavaje standard, Woodstone lemn pietrificat, borduri, bolțari și garduri — producție românească certificată, garanție 5 ani.',
      breadcrumbLabel: 'Produse',
    }
  )

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">Produse</span>
            </nav>
            <h1 className="heading-h1 mb-4">Produsele Petra Pavaje</h1>
            <p className="text-body-lg text-charcoal-400 max-w-3xl mb-8">
              De la pavaje premium inspirate din piatră naturală, la soluții standard pentru trafic intens și elemente
              complete de amenajare exterioară — toate produsele noastre sunt fabricate în România, testate în
              laborator propriu și acoperite de garanție de 5 ani.
            </p>
            <div className="flex flex-wrap gap-3">
              {statPills.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-white"
                >
                  <Icon className="w-4 h-4 text-brand-400" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Alege Gama Potrivită
            </p>
            <h2 className="heading-h1 text-charcoal-900 mb-4">
              Trei game, o singură promisiune de calitate
            </h2>
            <p className="text-body-lg text-charcoal-500 max-w-2xl mx-auto">
              Fiecare gamă este gândită pentru un tip de proiect — alege în funcție de stilul dorit, bugetul
              disponibil și intensitatea traficului pe care trebuie să îl suporte suprafața.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {primaryCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={category.href} className="group block card-premium">
                  <div className="relative aspect-[16/10] overflow-hidden" style={{ aspectRatio: '16/10' }}>
                    <img
                      src={categoryImages[category.id] || category.image}
                      alt={category.name}
                      width="1600"
                      height="1000"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{category.name}</h3>
                      <p className="text-white/60 text-sm">{category.productCount} produse</p>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <p className="text-sm text-charcoal-500 mb-4 line-clamp-2">{category.description}</p>
                    <div className="flex items-center text-brand-600 font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                      Vezi produse
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-charcoal-100">
            <p className="text-sm font-medium text-charcoal-500 mb-4">Elemente pentru amenajare exterioară</p>
            <div className="flex flex-wrap gap-3">
              {elementCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/produse/${category.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-charcoal-200 text-sm font-medium text-charcoal-700 hover:border-brand-400 hover:text-brand-600 transition-colors"
                >
                  {category.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturedProductsSection />

      <section className="section-padding bg-charcoal-50">
        <div className="container-premium">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">
              De ce Petra Pavaje
            </p>
            <h2 className="heading-h1 text-charcoal-900">Calitate verificată, la fiecare etapă</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trustPoints.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-charcoal-100">
                <div className="w-11 h-11 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-charcoal-900 mb-2">{title}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-premium">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-h3 text-charcoal-900 mb-3">Nu știi ce pavaj să alegi?</h2>
            <p className="text-body text-charcoal-600 mb-6">
              Echipa noastră te poate ajuta să alegi modelul și grosimea potrivite pentru tipul de trafic al
              proiectului tău, sau poți estima singur cantitatea necesară cu calculatorul de pavaj.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                <MessageCircle className="w-4 h-4 mr-2" />
                Cere o ofertă
              </Link>
              <Link to="/calculator" className="btn-secondary">
                <Calculator className="w-4 h-4 mr-2" />
                Calculator pavaj
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-charcoal-50">
        <div className="container-premium">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Întrebări Frecvente</p>
            <h2 className="heading-h2 text-charcoal-900">Tot ce trebuie să știi despre gama de produse</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {PRODUCTS_HUB_FAQ.map((item, idx) => (
              <div key={item.question} className="bg-white rounded-xl border border-charcoal-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left"
                  aria-expanded={openFaq === idx}
                >
                  <span className="font-medium text-charcoal-900">{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-charcoal-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <p className="px-4 pb-4 text-sm text-charcoal-600 leading-relaxed">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
