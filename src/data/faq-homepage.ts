import { FAQ_ITEMS } from '@/data/faq'
import { FAQ_ITEMS as FAQ_ITEMS_EN } from '@/data/faq.en'

// Six real, already-live questions (matching src/data/faq.ts / faq.en.ts,
// same content as the full /faq and /en/faq pages) that best fit a
// first-time homepage visitor -- brand basics plus the two most-asked
// practical questions. Kept as a fixed subset (not a random/algorithmic
// pick) so the homepage's FAQPage JSON-LD always matches what's rendered.
const HOMEPAGE_FAQ_QUESTIONS = [
  'Cine este Petra Pavaje și ce oferă?',
  'De ce să aleg produsele Petra Pavaje? Care sunt avantajele?',
  'Unde sunt fabricate produsele Petra Pavaje?',
  'Ce fel de garanție oferiți pentru produsele Petra Pavaje?',
  'Livrați produse în toată țara? Care sunt costurile și termenele?',
  'Petra Pavaje oferă servicii de montaj pentru produsele achiziționate?',
]
const HOMEPAGE_FAQ_QUESTIONS_EN = [
  'Who is Petra Pavaje and what do you offer?',
  'Why choose Petra Pavaje products? What are the advantages?',
  'Where are Petra Pavaje products made?',
  'What kind of warranty do you offer on Petra Pavaje products?',
  'Do you deliver nationwide? What are the costs and timelines?',
  'Does Petra Pavaje offer installation services for purchased products?',
]

export const HOMEPAGE_FAQ_ITEMS = HOMEPAGE_FAQ_QUESTIONS.map((q) => FAQ_ITEMS.find((item) => item.question === q)!)
export const HOMEPAGE_FAQ_ITEMS_EN = HOMEPAGE_FAQ_QUESTIONS_EN.map(
  (q) => FAQ_ITEMS_EN.find((item) => item.question === q)!
)
