import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, Search, X, MessageCircleQuestion, TriangleAlert } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'

type FaqItem = { question: string; answer: string; category: string; warning?: string }

const CATEGORIES = [
  'All',
  'About Petra Pavaje',
  'Products',
  'Ordering & Delivery',
  'Installation & Maintenance',
  'Warranty & Support',
  'Contact',
]

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'About Petra Pavaje',
    question: 'Who is Petra Pavaje and what do you offer?',
    answer:
      'Petra Pavaje is one of the largest paver manufacturers in Romania, with over 20 years of industry experience. We offer a complete range of outdoor landscaping products:\n• Premium and Standard pavers for pathways, yards and terraces\n• WoodStone - petrified-wood-look pavers\n• Curbs and drainage channels for boundaries\n• Blocks and decorative fences\n• Planters and benches for gardens\n• Drainage elements',
  },
  {
    category: 'About Petra Pavaje',
    question: 'Why choose Petra Pavaje products? What are the advantages?',
    answer:
      'Choosing Petra Pavaje gets you:\n• Superior quality - CE-certified products, tested for strength and durability\n• Local production - 4 factories in Romania for short delivery times\n• Variety - over 100 models, colors and sizes\n• Warranty - 5 years on every product\n• Free consultation - a team of specialists for your project\n• Excellent value for money',
  },
  {
    category: 'About Petra Pavaje',
    question: 'Where are Petra Pavaje products made?',
    answer:
      'All Petra Pavaje products are made in Romania, at our 4 own factories:\n• Alba Factory - Alba Iulia (Tel: +40 358 732 246)\n• Prahova Factory - Strejnicu (Tel: +40 244 704 342)\n• Arad Factory - Sat Horia (Tel: +40 731 190 939)\n• Neamț Factory - Simionești (Tel: +40 785 510 445)\nThis distribution lets us efficiently cover the whole country with fast deliveries.',
  },
  {
    category: 'About Petra Pavaje',
    question: 'Does Petra Pavaje have nationwide coverage? Which counties do you serve?',
    answer:
      'Yes, Petra Pavaje has complete nationwide coverage. We deliver to all 41 counties of Romania and to Bucharest. Through our network of 4 factories and logistics partners, we ensure fast delivery anywhere in the country.',
  },
  {
    category: 'Products',
    question: 'What types of pavers do we offer, and what are the main differences between them?',
    answer:
      'We offer three main paver ranges:\n• Premium - 6-8 cm thick, superior finish, maximum durability, 5-year warranty. Ideal for yards, terraces, driveways.\n• Standard - 4-6 cm thick, excellent value for money, 5-year warranty. Perfect for pedestrian pathways and low-traffic areas.\n• WoodStone - natural petrified-wood look, weather-resistant, 5-year warranty. Unique on the market, combining the look of wood with the durability of stone.',
  },
  {
    category: 'Products',
    question: 'What materials are the pavers made of, and how durable are they?',
    answer:
      'Petra Pavaje pavers are made from high-quality vibro-pressed concrete, composed of:\n• High-strength cement\n• Selected natural aggregates (sand, gravel)\n• Mineral pigments for long-lasting colors\n• Additives for waterproofing and frost resistance\nDurability: our products withstand over 200 freeze-thaw cycles, have class-4 abrasion resistance and can bear loads of up to 80 tons/sqm (Premium range).',
  },
  {
    category: 'Products',
    question: 'What sizes and colors are available?',
    answer:
      'We offer a wide range of sizes and colors across all product categories. Check our full catalog or contact a representative for specific details. Main colors include: gray, anthracite, red, yellow, brown, black, white, and various blended shades.',
  },
  {
    category: 'Products',
    question: 'Are WoodStone products made from natural wood, or do they just mimic it?',
    answer:
      'WoodStone is made from a special concrete that perfectly mimics the look of petrified wood. Advantages over natural wood:\n• Does not rot and needs no yearly treatments\n• Resistant to moisture, frost and UV\n• Not attacked by insects or fungi\n• Durability of over 20 years\n• Minimal maintenance\n• Authentic natural look with realistic texture and shading',
  },
  {
    category: 'Products',
    question: 'Do you offer products besides pavers?',
    answer:
      'Yes, Petra Pavaje offers a full range of outdoor landscaping products:\n• Curbs and drainage channels - for delimiting zones and water drainage\n• Blocks and fences - for boundary walls and decorative walls\n• Planters and benches - decorative garden elements\n• Drainage elements - covers, pipes and manholes\n• Steps and slabs - for outdoor stairs',
  },
  {
    category: 'Ordering & Delivery',
    question: 'How can I order Petra Pavaje products?',
    answer:
      'You can order Petra Pavaje products in several ways:\n• Online - fill in the form on our site for a personalized quote\n• By phone - contact the factory in your area\n• In person - visit one of our showrooms\n• Through distributors - our network of authorized partners\nFor large orders or special projects, we recommend requesting a personalized quote.',
  },
  {
    category: 'Ordering & Delivery',
    question: 'What payment methods do you accept?',
    answer:
      'We accept various payment methods for maximum flexibility:\n• Bank transfer\n• Cash on delivery (for orders under a certain value)\n• Bank card\n• Installments (for certain orders, through financial partners)\nFor details on payment terms and any available facilities, contact your local representative.',
  },
  {
    category: 'Ordering & Delivery',
    question: 'Do you deliver nationwide? What are the costs and timelines?',
    answer:
      'Yes, we deliver throughout Romania. Key details:\n• Timelines: 3-7 business days depending on stock and location\n• Costs: vary based on quantity, distance and accessibility\n• Free shipping: for orders above a certain value (ask for details)\n• Unloading: by crane or by hand, depending on location\nThe exact delivery cost is calculated at the time of the quote, based on your specific order.',
  },
  {
    category: 'Ordering & Delivery',
    question: 'Can I return unused pallets with products still on them?',
    answer:
      'Yes. Pallets purchased along with the products, which remain completely unused, can be returned. This policy applies only to original pallets with the products still on them, not to empty pallets.',
    warning: 'Returning a pallet with unused products carries a return cost of 75 RON per pallet.',
  },
  {
    category: 'Ordering & Delivery',
    question: 'Can I request a personalized price quote?',
    answer:
      'Absolutely! We offer free consultation and personalized quotes for any project. To get a quote, you can:\n• Fill in the contact form on our site\n• Send an email with your project details\n• Call the factory in your area\nFor the most accurate quote, prepare: the surface area to be paved (sqm), the desired product type, the delivery address, and any special requirements.',
  },
  {
    category: 'Installation & Maintenance',
    question: 'Does Petra Pavaje offer installation services for purchased products?',
    answer:
      'Petra Pavaje works with a network of professional, authorized installers across the country. On request, we can recommend vetted installation teams experienced with our products. We also offer:\n• Detailed installation guides available on our site\n• Free technical consultation\n• Installation patterns and inspiration\n• Support calculating the amount of material needed',
  },
  {
    category: 'Installation & Maintenance',
    question: 'What tools are needed to install pavers?',
    answer:
      'For a proper installation you\'ll need: a wheelbarrow, shovels, pickaxe and rake for preparing the soil, a plate compactor (with a rubber extension attachment), profiled pipes and an aluminum screed board for leveling the sand, a rubber mallet for setting the pavers, a grinder or paver splitter for cutting edges and curbs, a broom for filling the joints, plus a level and theodolite for grades and alignments. The full step-by-step guide is available on the Installation page.',
  },
  {
    category: 'Installation & Maintenance',
    question: 'How thick should the base layer under the paving be?',
    answer:
      'The thickness of the gravel or crushed-stone layer depends on the type of traffic: minimum 15 cm for pedestrian pathways, minimum 20 cm for car traffic, and minimum 30 cm for heavy, intense traffic (trucks). The finished surface should have a slope of at least 2-2.5% for proper water drainage.',
  },
  {
    category: 'Installation & Maintenance',
    question: 'Are there visual installation patterns for inspiration?',
    answer:
      'Yes, on the Installation Patterns page you\'ll find a gallery with over 15 paver-laying patterns, for various sizes (10x10, 20x10, 20x20, 30x20, 30x30, 40x40, 60x30) and Mix combinations, each with a detailed installation diagram and its repeatable area highlighted.',
  },
  {
    category: 'Installation & Maintenance',
    question: 'How do I properly maintain pavers to keep them looking good?',
    answer:
      'Proper maintenance ensures the durability and appearance of your pavers:\n• Regular cleaning - sweeping and washing with water\n• Removing stains - with a neutral detergent, no acids\n• Fighting moss - special anti-moss products\n• Refreshing the joints - topping up with sand as needed\n• Optional sealing - for extra protection\nSee the Maintenance Guide for detailed instructions.',
  },
  {
    category: 'Installation & Maintenance',
    question: 'What products do you recommend for cleaning and protecting pavers?',
    answer:
      "On the Maintenance Guide page we recommend 6 professional products: Anti-Mold (removes mold, damp, algae, moss), Professional Alkaline Detergent (oil, smog, rubber stains), Wet-Look and Natural-Look Impregnators (protection and waterproofing), Anti-Efflorescence (white cement stains), and Anti-Rust (rust stains). Each product's application method and coverage are detailed on the page.",
  },
  {
    category: 'Installation & Maintenance',
    question: 'How is winter de-icing of pavers done?',
    answer:
      'For safe, effective de-icing of pavers:\n• Recommended: sand, fine gravel, calcium chloride in moderate amounts\n• Avoid: large amounts of salt, which can damage the surface over time\n• Snow removal: a plastic shovel, not a metal one\n• Preventive: applying anti-freeze solutions before snowfall\nPetra Pavaje products are tested for freeze-thaw resistance, but proper maintenance extends their lifespan.',
  },
  {
    category: 'Installation & Maintenance',
    question: 'What is an automatic de-icing system, and how does it work?',
    answer:
      'An automatic de-icing system uses a smart thermostat that, through outdoor temperature and humidity sensors, detects when a surface is at risk of freezing or when snow is settling, and automatically triggers heating of the cable installed under the paving. It is frequently used on vehicle access ramps, loading docks, sidewalks and other pathways, to prevent skidding and accidents caused by ice. Details on the De-icing page.',
  },
  {
    category: 'Warranty & Support',
    question: 'What kind of warranty do you offer on Petra Pavaje products?',
    answer:
      'We offer a 5-year warranty on all our products:\n• Premium Pavers - 5-year warranty\n• WoodStone - 5-year warranty\n• Standard Pavers - 5-year warranty\n• Curbs and channels - 5-year warranty\n• Other products - 5-year warranty\nThe warranty covers manufacturing defects and includes free replacement of defective products, per the terms in the warranty certificate.',
  },
  {
    category: 'Warranty & Support',
    question: 'What should I do if I have a problem with a purchased product?',
    answer:
      "If you have a problem with a purchased product:\n• Step 1: Contact the factory where you purchased the products\n• Step 2: Describe the problem and send relevant photos\n• Step 3: Our team will review the situation and propose a solution\n• Step 4: Solution implementation (replacement, repair, compensation)\nWe commit to responding within 48 business hours and finding the best solution for you.",
  },
  {
    category: 'Contact',
    question: 'How can I contact Petra Pavaje with questions or for advice?',
    answer:
      'You can reach us through multiple channels:\n• Alba Factory: +40 358 732 246\n• Prahova Factory: +40 244 704 342\n• Arad Factory: +40 731 190 939\n• Neamț Factory: +40 785 510 445\nOr fill in the contact form on our Contact page. Hours: Monday-Friday 08:00-17:00.',
  },
  {
    category: 'Contact',
    question: 'Do you have showrooms where I can see the products in person?',
    answer:
      'Yes, each of our 4 factories has a showroom where you can see and touch our products. Visits are welcome during business hours (Monday-Friday 08:00-17:00). You can also take a virtual tour of our factories directly on our site.',
  },
  {
    category: 'Contact',
    question: 'Is there a product catalog I can download or browse?',
    answer:
      'Of course! The full Petra Pavaje catalog is available digitally on our site. You can:\n• View it online - an interactive catalog with zoom and easy navigation\n• Download the PDF - for offline reference\n• Request a printed catalog - by filling in a form\nVisit the Catalog page for all available options.',
  },
]

export function FaqPageEN() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesQuery =
        !query || item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, searchQuery])

  const toggleQuestion = (question: string) => {
    setOpenQuestions((prev) => {
      const next = new Set(prev)
      if (next.has(question)) next.delete(question)
      else next.add(question)
      return next
    })
  }

  const openAll = () => setOpenQuestions(new Set(filtered.map((f) => f.question)))
  const closeAll = () => setOpenQuestions(new Set())

  useEffect(() => {
    const url = `${window.location.origin}/en/faq`
    const title = `Frequently Asked Questions (FAQ) | ${SEO_SITE_NAME}`
    const description =
      'Find quick answers to the most common questions about Petra Pavaje products, installation, maintenance, ordering and warranty.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/faq', '/en/faq')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: (f.warning ? `${f.answer} ${f.warning}` : f.answer).replace(/\n/g, ' '),
        },
      })),
    })

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/en` },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: url },
      ],
    })

    return resetSEO
  }, [])

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
              <Link to="/en" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">FAQ</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Help Center</p>
            <h1 className="heading-h1 mb-4 max-w-3xl">Frequently Asked Questions</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Find quick answers to the most common questions about Petra Pavaje products, services and processes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative mb-6">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search a question…"
                className="w-full pl-11 pr-10 py-3 rounded-xl border border-charcoal-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-charcoal-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-brand-600 text-white'
                      : 'bg-charcoal-50 text-charcoal-600 hover:bg-charcoal-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-charcoal-500">
                Showing {filtered.length} {filtered.length === 1 ? 'question' : 'questions'}
              </p>
              <div className="flex gap-3">
                <button onClick={openAll} className="text-sm font-medium text-brand-600 hover:underline">
                  Expand all
                </button>
                <button onClick={closeAll} className="text-sm font-medium text-charcoal-500 hover:underline">
                  Collapse all
                </button>
              </div>
            </div>
          </motion.div>

          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((item) => {
                const isOpen = openQuestions.has(item.question)
                return (
                  <div key={item.question} className="bg-white rounded-xl border border-charcoal-100 overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(item.question)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <div>
                        <span className="text-xs font-semibold tracking-[0.1em] uppercase text-brand-600 block mb-1">
                          {item.category}
                        </span>
                        <span className="font-semibold text-charcoal-900">{item.question}</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-charcoal-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5">
                        <p className="text-sm text-charcoal-600 leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </p>
                        {item.warning && (
                          <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
                            <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{item.warning}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-charcoal-500 mb-2">No results found.</p>
              <p className="text-charcoal-400 text-sm">Try different search terms or contact us directly.</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 rounded-xl bg-charcoal-50 p-8 md:p-10 text-center"
          >
            <MessageCircleQuestion className="w-8 h-8 text-brand-600 mx-auto mb-3" />
            <h2 className="text-xl font-semibold text-charcoal-900 mb-2">Didn't find your answer?</h2>
            <p className="text-charcoal-500 mb-6">Our team of specialists is ready to help you with any question.</p>
            <Link to="/en/contact" className="btn-primary">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
