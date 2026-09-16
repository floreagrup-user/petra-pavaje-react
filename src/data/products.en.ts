// English translation overlay for the Premium paver range (19 products).
// Kept separate from products.ts (the source of truth for RO content and
// all structural/regulatory data: images, dimensionsList, mixModes,
// documents) so translating never risks the live Romanian catalog.
// Colors/usage tags reuse small shared dictionaries since the same handful
// of RO terms repeats across every product; everything else (description,
// technicalFeatures, advantages, faq) is translated per product below.
import type { ProductFAQ, ProductSpec } from './types'

export const COLOR_NAME_EN: Record<string, string> = {
  'Gri Antic': 'Antique Grey',
  'Moka': 'Mocha',
  'Roșu Vulcanic': 'Volcanic Red',
  'Negru': 'Black',
  'Gri': 'Grey',
  'Roșu': 'Red',
  'Bej': 'Beige',
  'Gri Bazaltic': 'Basalt Grey',
  'Gri Grafit': 'Graphite Grey',
  'Alb': 'White',
  'Caramel': 'Caramel',
  'Brun': 'Brown',
  'Travertin': 'Travertine',
  'Terra': 'Terra',
  'Rossa': 'Rossa',
  'Negru Violet': 'Violet Black',
  'Brun Antic': 'Antique Brown',
  'Galben Cărămiziu': 'Brick Yellow',
  'Roșu Canion': 'Canyon Red',
  'Autumn': 'Autumn',
  'Winter': 'Winter',
  'Galben Savana': 'Savanna Yellow',
  'Brun Montan': 'Mountain Brown',
  'Maro Acaju': 'Mahogany Brown',
  'Negru Abanos': 'Ebony Black',
  'Brun Castaniu': 'Chestnut Brown',
  'Galben Verzui': 'Yellow-Green',
  'Marmorat': 'Marbled',
  'Gri Onix': 'Onyx Grey',
  'Negru Onix': 'Onyx Black',
  'Gri Calcar': 'Limestone Grey',
  'Bej Limonită': 'Limonite Beige',
  'Rubin': 'Ruby',
  'Verde Smarald': 'Emerald Green',
  'Sepia': 'Sepia',
  'Gri Verzui': 'Green-Grey',
  'Indigo': 'Indigo',
  'Acvatic': 'Aquatic',
  'Gri Gălbui': 'Yellowish Grey',
  'Galben': 'Yellow',
  'Maro': 'Brown',
  'Verde': 'Green',
}

export const USAGE_TAG_EN: Record<string, string> = {
  'Alei': 'Walkways',
  'Terase': 'Terraces',
  'Curți': 'Yards',
  'Spații comerciale': 'Commercial Spaces',
  'Parcuri': 'Parks',
  'Zone Rezidențiale': 'Residential Areas',
  'Grădini': 'Gardens',
  'Piețe și Spații Publice': 'Squares & Public Spaces',
  'Terase Generoase': 'Large Terraces',
  'Alei Largi': 'Wide Walkways',
  'Alei și Spații Publice': 'Walkways & Public Spaces',
  'Poteci': 'Paths',
  'Spații Publice': 'Public Spaces',
  'Rezidențial': 'Residential',
  'Comercial': 'Commercial',
  'Zone Piscină': 'Pool Areas',
  'Acces auto': 'Vehicle Access',
  'Acces auto ușor': 'Light Vehicle Access',
  'Alei ample': 'Wide Walkways',
  'Consolidare pantă': 'Slope Reinforcement',
  'Curți interioare': 'Interior Courtyards',
  'Drumuri de acces': 'Access Roads',
  'Drumuri interioare': 'Interior Roads',
  'Ghidare orientare': 'Wayfinding Guidance',
  'Incinte clădiri': 'Building Grounds',
  'Parcări înierbate': 'Grassed Parking',
  'Parcări': 'Parking Lots',
  'Platforme industriale': 'Industrial Platforms',
  'Platforme': 'Platforms',
  'Rampă acces': 'Access Ramps',
  'Spații publice': 'Public Spaces',
  'Stații carburanți': 'Fuel Stations',
  'Stații edilitare': 'Public Transit Stops',
  'Trafic greu': 'Heavy Traffic',
  'Trecere de pietoni': 'Pedestrian Crossings',
  'Trotuare': 'Sidewalks',
  'Zone de acces': 'Access Areas',
  'Zone pietonale': 'Pedestrian Areas',
  'Zone verzi': 'Green Areas',
}

export interface ProductTranslationEn {
  /** Only set when the RO `name` is a literal descriptive phrase rather than a
   * proper/brand name (e.g. "Pavaje Eco" -> "Eco Pavers"). Names like Holland,
   * Quatro, Roca or Antic are proper nouns and stay identical in both locales,
   * so this is omitted for nearly every product. */
  name?: string
  shortDescription: string
  description: string
  heroFeatures: string[]
  specs: ProductSpec[]
  technicalFeatures?: string[]
  advantages?: string[]
  faq?: ProductFAQ[]
}

export const productTranslationsEn: Record<string, ProductTranslationEn> = {
  roca: {
    shortDescription: 'Antique Look, Modern Style',
    description:
      'The Roca collection offers the richest range of formats in the Premium line: 7 individual sizes (from 20×10 up to 60×30 cm, plus the 50×50×8 cm format for heavy traffic) and 9 Mix models, all in a single color — Antique Grey — with Color Lock technology for a uniform look over time.',
    heroFeatures: ['16 Formats', '1 Color: Antique Grey', 'Color Lock Technology', '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: '7 individual + 9 Mix (16 formats)' },
      { label: 'Colors', value: 'Antique Grey (single color)' },
      { label: 'Thickness', value: '4-8 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic (4-5 cm thickness)',
      'Light traffic (6-7 cm thickness)',
      'Heavy traffic (8-10 cm thickness) — 50×50×8 format',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Color Lock technology',
    ],
    advantages: [
      'The richest range of formats in the Premium collection (16)',
      'A single, uniform color — Antique Grey — across every format',
      '9 Mix models for waste-free material compositions',
      'The only format in the range ready for heavy traffic (50×50×8)',
      'Stable appearance over time thanks to Color Lock technology',
    ],
    faq: [
      { question: 'What sizes does the Roca paver come in?', answer: 'Roca is available in 16 formats: 7 individual sizes (20×10×6, 40×10×6 — a new format, 20×20×6, 30×20×6, 40×40×6, 60×30×6 and 50×50×8 cm) and 9 Mix models made up of several sizes packaged together.' },
      { question: 'What colors is the Roca paver available in?', answer: 'Roca is produced in a single color — Antique Grey — across all 16 formats.' },
      { question: 'What is Color Lock technology on Roca?', answer: 'Color Lock is a treatment that locks the color pigment into the concrete mass, keeping the Antique Grey paver looking uniform over time, even under heavy traffic and prolonged sun exposure.' },
      { question: 'Can Roca be used for vehicle (heavy) traffic?', answer: 'Yes. Besides pedestrian traffic (4-5 cm thickness) and light traffic (6-7 cm), the 50×50×8 cm format has the 8 cm thickness needed for heavy traffic (8-10 cm), making it suitable for parking areas and vehicle access as well.' },
      { question: 'What is a Mix model on Roca?', answer: 'A Mix model is a composition of several sizes packaged together (for example Mix 6.30 contains 20×10, 20×20 and 30×20 cm slabs), for a natural-stone paving look with no material waste during installation.' },
      { question: 'What documents come with the Roca product?', answer: '9 of the 16 Roca formats have their own datasheet and EU Declaration of Performance under the EN 1338 standard, available for download in the Product Documents section below. For the other formats (newer or less frequently requested), documents can be requested directly.' },
    ],
  },
  antic: {
    shortDescription: 'Elegance and Durability',
    description:
      'The Antic collection reproduces the natural, weathered look of old quarry stone through an antiquing surface finish applied to every slab. Available in 3 individual sizes plus the Mix 6.72 format, in 4 colors, the system is suited to pedestrian and light traffic — walkways, terraces, parks and residential areas — with guaranteed frost resistance.',
    heroFeatures: ['3 Sizes + Mix 6.72', '4 Colors', '5-Year Warranty', 'Frost Resistant'],
    specs: [
      { label: 'Dimensions', value: '3 individual + Mix 6.72' },
      { label: 'Colors', value: '4 colors' },
      { label: 'Thickness', value: '6 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Antiqued surface',
      'No Color Lock treatment',
      'Not recommended for heavy traffic',
    ],
    advantages: [
      'A natural, weathered look reminiscent of old quarry stone',
      '4 colors available across all 4 formats',
      'Mix 6.72 format for waste-free material compositions',
      '5-year warranty',
      'Suited to walkways, terraces and residential areas',
    ],
    faq: [
      { question: 'What sizes does the Antic paver come in?', answer: 'The Antic paver is available in 4 formats: 10×10×6 cm, 20×10×6 cm, 20×20×6 cm and the combined Mix 6.72 format (18×12×6 cm, 12×12×6 cm and 12×9×6 cm).' },
      { question: 'What colors is the Antic paver available in?', answer: 'Antic is produced in 4 colors: Antique Grey, Mocha, Volcanic Red and Black, available across all 4 formats.' },
      { question: 'Is the Antic paver frost resistant?', answer: 'Yes. The Antic paver has guaranteed freeze-thaw resistance and comes with a 5-year warranty.' },
      { question: "What is the Antic paver's antiqued finish?", answer: 'It is a surface treatment applied to each individual slab, reproducing the natural, weathered look of old quarry stone.' },
      { question: 'Where can the Antic paver be used?', answer: 'Antic is recommended for pedestrian and light traffic — walkways, terraces, parks and residential areas. It is not recommended for heavy (intense vehicle) traffic.' },
      { question: 'What documents come with the Antic product?', answer: 'Each Antic format has its own datasheet and EU Declaration of Performance under the EN 1338 standard, available for download in the Product Documents section below.' },
    ],
  },
  primo: {
    shortDescription: 'Authenticity and Refinement',
    description:
      "The Primo paver brings a breath of authenticity and refinement to any outdoor space. As an antiqued paver, it is not just a walking surface but a style statement — a piece that tells a story of time and craftsmanship. Available in 2 sizes and 4 colors, suited to pedestrian and light traffic — walkways, terraces and residential areas — with guaranteed frost resistance.",
    heroFeatures: ['2 Sizes', '4 Colors', '5-Year Warranty', 'Frost Resistant'],
    specs: [
      { label: 'Dimensions', value: '2 sizes' },
      { label: 'Colors', value: '4 colors' },
      { label: 'Thickness', value: '4-6 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for terraces',
      'Recommended for walkways',
      'Frost resistant',
      'Antiqued surface',
      'No Color Lock treatment',
      'Not recommended for heavy traffic',
    ],
    advantages: [
      'A natural, weathered look reminiscent of old quarry stone',
      '4 colors available across both formats',
      '5-year warranty',
      'Suited to walkways, terraces and residential areas',
    ],
    faq: [
      { question: 'What sizes does the Primo paver come in?', answer: 'The Primo paver is available in 2 formats: 20×10×4 cm and 21×14×6 cm.' },
      { question: 'What colors is the Primo paver available in?', answer: 'Primo is produced in 4 colors: Grey, Red, Beige and Black, available across both formats.' },
      { question: 'Is the Primo paver frost resistant?', answer: 'Yes. The Primo paver has guaranteed freeze-thaw resistance and comes with a 5-year warranty.' },
      { question: "What is the Primo paver's antiqued finish?", answer: 'It is a surface treatment applied to each individual slab, reproducing the natural, weathered look of old quarry stone — a fitting choice for landscaping with character.' },
      { question: 'Where can the Primo paver be used?', answer: 'Primo is recommended for pedestrian and light traffic — walkways, terraces and residential areas. It is not recommended for heavy (intense vehicle) traffic.' },
      { question: 'Is there a datasheet and Declaration of Performance for Primo?', answer: "Official technical documentation for the Primo range is being finalized for publication. For the current datasheet or EU Declaration of Performance, please contact the Petra Pavaje team." },
    ],
  },
  'grand-urban': {
    shortDescription: 'Large-Format Slabs',
    description:
      'For a large-scale project — a square, a park or a generous terrace — Petra Pavaje offers a distinctive solution: the Grand Urban large-format slabs. Available in 3 formats — 100×50×8 cm, 80×40×6 cm and Mix 4.4 — and 4 colors, they create a space with fewer joints, a uniform and elegant surface even across very large areas.',
    heroFeatures: ['2 Sizes + Mix 4.4', '4 Colors', '5-Year Warranty', 'Color Lock Technology'],
    specs: [
      { label: 'Dimensions', value: '2 individual + Mix 4.4' },
      { label: 'Colors', value: '4 colors' },
      { label: 'Thickness', value: '4-8 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Color Lock technology',
      'Not recommended for heavy traffic',
    ],
    advantages: [
      'Large format — a uniform surface with fewer joints',
      '3 formats available — 100×50×8, 80×40×6 and Mix 4.4',
      '4 colors, suited to expansive landscaping',
      '5-year warranty',
    ],
    faq: [
      { question: 'What sizes does the Grand Urban paver come in?', answer: 'Grand Urban is available in 2 individual formats — 100×50×8 cm and 80×40×6 cm — plus the Mix 4.4 model, a composition of 60×60×4 cm (2 pieces) and 60×30×4 cm (2 pieces) slabs.' },
      { question: 'What colors is the Grand Urban paver available in?', answer: 'The Grand Urban family is produced in 4 colors: Antique Grey, Mocha, Basalt Grey and Graphite Grey. Graphite Grey is available exclusively for the 80×40×6 cm format; the other 3 colors are available across all formats, including Mix 4.4.' },
      { question: 'What is the Mix 4.4 model?', answer: 'Mix 4.4 is a composition of large-format slabs — 60×60×4 cm and 60×30×4 cm — that creates a more dynamic laying pattern than a single format, while keeping the same uniform, few-joints surface aesthetic.' },
      { question: 'Is the Grand Urban paver frost resistant?', answer: 'Yes. Grand Urban has guaranteed freeze-thaw resistance and benefits from Color Lock technology to keep its color over time, plus a 5-year warranty.' },
      { question: 'Where can the Grand Urban paver be used?', answer: 'Thanks to its large format, Grand Urban is recommended for large-scale projects — squares, parks, generous terraces and wide walkways — for pedestrian and light traffic. It is not recommended for heavy vehicle traffic.' },
      { question: 'Is there a datasheet and Declaration of Performance for Grand Urban?', answer: 'Yes, for the 100×50×8 cm and Mix 4.4 formats — a datasheet and EU Declaration of Performance for each color, available in the Product Documents section below. For the more recently introduced 80×40×6 cm format, documentation is being finalized for publication.' },
    ],
  },
  gemina: {
    shortDescription: 'Natural Elegance',
    description:
      'With its natural look and combination of three sizes, Gemina lets you blend the beauty of the material with volumetric versatility for a distinctive effect. The coordination between sizes provides aesthetic continuity for projects that demand the highest design standards. The Gemina mix fits perfectly into classic or rustic architectural styles.',
    heroFeatures: ['3 Sizes (Mix 6.72)', '4 Colors', '5-Year Warranty', 'Rounded Corners'],
    specs: [
      { label: 'Dimensions', value: '3 sizes + 1 Mix' },
      { label: 'Colors', value: '4 colors' },
      { label: 'Thickness', value: '6 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Rounded corners',
      'Not recommended for heavy traffic',
    ],
    advantages: [
      'A 3-size composition for a distinctive visual effect',
      'Aesthetic continuity for large-scale projects',
      '4 colors, suited to classic or rustic style',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Gemina paver and how is it sold?', answer: 'Gemina is a premium paver sold exclusively as the Mix 6.72 model — a pack of 3 piece sizes (18×12×6 cm, 12×12×6 cm and 12×9×6 cm) combined in a single package of 72 pieces. The 3 sizes are not sold separately, only together as part of Mix 6.72.' },
      { question: 'What colors is the Gemina paver available in?', answer: 'Gemina is available in 4 colors: White, Black, Caramel and Brown, all on the Mix 6.72 model.' },
      { question: 'Does the Gemina paver have rounded corners?', answer: 'Yes. Rounded corners are a distinctive feature of the Gemina range, alongside guaranteed freeze-thaw resistance and the 5-year warranty.' },
      { question: 'Where can the Gemina paver be used?', answer: "Gemina is recommended for pedestrian and light traffic — gardens, walkways, terraces and park-type public spaces. Its natural look, combining 3 sizes, suits classic or rustic architectural styles." },
      { question: 'Is there a datasheet and Declaration of Performance for Gemina?', answer: 'Yes, a shared datasheet for Mix 6.72 and an EU Declaration of Performance for each of the 4 colors — all available in the Product Documents section below.' },
    ],
  },
  cubic: {
    shortDescription: 'Classic Elegance and Durability',
    description:
      'With a classic, refined look, the Cubic paver evokes the charm of the cobblestone the Romans used to pave their roads. Perfect for rustic landscaping, it adds a touch of elegance and durability, suited to both residential projects and public space design. The two-size composition allows for quick installation across large surfaces, with a unified visual effect.',
    heroFeatures: ['2 Sizes (Mix 7.25)', '3 Colors', '5-Year Warranty', 'Color Lock Technology'],
    specs: [
      { label: 'Dimensions', value: '2 sizes (Mix 7.25 only)' },
      { label: 'Colors', value: '3 colors' },
      { label: 'Thickness', value: '7 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Color Lock technology',
    ],
    advantages: [
      'A 2-size composition for a distinctive visual effect',
      'Quick installation across large surfaces',
      '3 colors, suited to classic or rustic style',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Cubic paver and how is it sold?', answer: 'Cubic is a premium paver sold exclusively as the Mix 7.25 model — a pack of 2 piece sizes (26/22×16×7 cm and 20/16×16×7 cm) combined in a single package. The 2 sizes are not sold separately, only together as part of Mix 7.25.' },
      { question: 'What colors is the Cubic paver available in?', answer: 'Cubic is available in 3 colors: Antique Grey, Basalt Grey and Graphite Grey, all on the Mix 7.25 model.' },
      { question: 'What type of traffic is the Cubic paver recommended for?', answer: 'The Cubic paver is recommended for pedestrian and light traffic, suited to parks, terraces and residential areas. It is not recommended for heavy (intense vehicle) traffic.' },
      { question: 'Does the Cubic paver have Color Lock technology and frost resistance?', answer: 'Yes. The Cubic paver benefits from Color Lock technology, which keeps the color uniform over time, and guaranteed frost resistance.' },
      { question: 'What warranty does Petra Pavaje offer for the Cubic paver?', answer: 'Petra Pavaje offers a 5-year warranty for the Cubic paver.' },
    ],
  },
  mistic: {
    shortDescription: 'Inspired by the Heart of Transylvania',
    description:
      "Mistic is one of Petra Pavaje's newest and most popular products. It stands out for the large surface of its slabs (60 cm long!), which creates a modern layout with few joints. The variety of cool shades — greys and hints of blue — lets us use this paver for both residential landscaping and public spaces.",
    heroFeatures: ['4 Sizes + 9 Mix', '6 Colors', '5-Year Warranty', 'Color Lock Technology'],
    specs: [
      { label: 'Dimensions', value: '4 individual + 9 Mix' },
      { label: 'Colors', value: '6 colors' },
      { label: 'Thickness', value: '4-8 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Color Lock technology',
    ],
    advantages: [
      'Large slab surface (60 cm) — fewer joints',
      '6 colors, suited to homes and public spaces alike',
      '9 Mix models for waste-free compositions',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Mistic paver and why is it popular?', answer: "Mistic is one of Petra Pavaje's newest and most popular products, notable for the large surface of its slabs (60 cm long), which creates a modern layout with few joints. The variety of cool shades, greys and hints of blue, suits both homes and public spaces." },
      { question: 'What sizes does the Mistic paver come in?', answer: 'Mistic is available in 4 individual sizes (40×10×6, 30×20×6, 40×40×6, 60×30×6) and 9 Mix models (4.30, 5.28, 6.14, 6.30, 6.30 Wavy, 6.6, 7.9, 8.20, 8.30).' },
      { question: 'What colors is the Mistic paver available in?', answer: 'Mistic is available in 6 colors: Basalt Grey, Graphite Grey, Green-Grey, Indigo, Aquatic and Yellowish Grey.' },
      { question: 'What type of traffic is the Mistic paver recommended for?', answer: 'The Mistic paver is recommended for pedestrian and light traffic, suited to parks, terraces and residential areas. It is not recommended for heavy (intense vehicle) traffic.' },
      { question: 'Does the Mistic paver have Color Lock technology and frost resistance?', answer: 'Yes. The Mistic paver benefits from Color Lock technology, which keeps the color uniform over time, and guaranteed frost resistance.' },
      { question: 'What warranty does Petra Pavaje offer for the Mistic paver?', answer: 'Petra Pavaje offers a 5-year warranty for the Mistic paver.' },
    ],
  },
  mediterana: {
    shortDescription: 'A Tuscan Atmosphere in Your Garden',
    description:
      'For an atmosphere that feels like a permanent holiday, Mediterana is the ideal choice. Through its natural texture and mix of terracotta shades, the finished surface will transport you to Tuscan lanes, instilling the relaxation of a holiday and leaving you humming "La vita è bella…"',
    heroFeatures: ['5 Sizes + 7 Mix', '2 Colors', '5-Year Warranty', 'Frost Resistant'],
    specs: [
      { label: 'Dimensions', value: '5 individual + 7 Mix' },
      { label: 'Colors', value: '2 colors' },
      { label: 'Thickness', value: '4-8 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Color Lock technology',
    ],
    advantages: [
      'Natural texture with terracotta shades',
      'A Tuscan atmosphere in your garden',
      '7 Mix models for waste-free compositions',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Mediterana paver?', answer: 'Mediterana is a premium paver with a Tuscan atmosphere, which through its natural texture and mix of terracotta shades brings holiday-time relaxation into your outdoor landscaping.' },
      { question: 'What sizes does the Mediterana paver come in?', answer: 'Mediterana is available in 5 individual sizes (20×10×6, 40×10×6, 20×20×6, 30×20×6, 60×30×6) and 7 Mix models (4.30, 5.28, 6.14, 6.30, 7.9, 8.20, 8.30).' },
      { question: 'What colors is the Mediterana paver available in?', answer: 'Mediterana is available in 2 colors: Terra and Rossa.' },
      { question: 'What type of traffic is the Mediterana paver recommended for?', answer: 'The Mediterana paver is recommended for pedestrian and light traffic, suited to terraces, gardens and residential areas. It is not recommended for heavy (intense vehicle) traffic.' },
      { question: 'What warranty does Petra Pavaje offer for the Mediterana paver?', answer: 'Petra Pavaje offers a 5-year warranty for the Mediterana paver.' },
    ],
  },
  viena: {
    shortDescription: 'Aristocratic Elegance',
    description:
      'A sumptuous model that impresses with its bold color and creates spectacular effects on any finished surface. Violet reflections blend attractively, bringing new refinement to the design, closer to an aristocratic style, offering the finished space the fantasy of a modern kingdom.',
    heroFeatures: ['1 Size + 4 Mix', '1 Color', '5-Year Warranty', 'Frost Resistant'],
    specs: [
      { label: 'Dimensions', value: '1 individual + 4 Mix' },
      { label: 'Colors', value: '1 color' },
      { label: 'Thickness', value: '4-8 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Color Lock technology',
    ],
    advantages: [
      'A bold color with violet reflections',
      'Refinement inspired by aristocratic style',
      '4 Mix models for waste-free compositions',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Viena paver?', answer: 'Viena is a sumptuous premium paver that impresses with its bold color and creates spectacular effects on finished surfaces. Violet reflections blend attractively, bringing new refinement to the design, closer to an aristocratic style.' },
      { question: 'What sizes does the Viena paver come in?', answer: 'Viena is available in 1 individual size (60×30×6) and 4 Mix models (4.30, 6.30, 7.9, 8.30).' },
      { question: 'What color is the Viena paver available in?', answer: 'Viena is available in a single distinctive color: Violet Black.' },
      { question: 'What type of traffic is the Viena paver recommended for?', answer: 'The Viena paver is recommended for pedestrian and light traffic, suited to terraces, walkways and residential areas. It is not recommended for heavy (intense vehicle) traffic.' },
      { question: 'What warranty does Petra Pavaje offer for the Viena paver?', answer: 'Petra Pavaje offers a 5-year warranty for the Viena paver.' },
    ],
  },
  maya: {
    shortDescription: 'Quality and Versatility for the Outdoors',
    description:
      "We all look for a paver that meets three conditions: good value for money, and the right shape and color! Petra Pavaje answers that need with the Maya paver — a durable, versatile solution. It comes in a variety of sizes, so you can find the best fit for spaces of any size. Perfect for yards, terraces, gardens and walkways.",
    heroFeatures: ['1 Size + 4 Mix', '1 Color', '5-Year Warranty', 'Frost Resistant'],
    specs: [
      { label: 'Dimensions', value: '1 individual + 4 Mix' },
      { label: 'Colors', value: '1 color' },
      { label: 'Thickness', value: '4-8 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Color Lock technology',
    ],
    advantages: [
      'Good value for money',
      'Durable and versatile',
      '4 Mix models for waste-free compositions',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Maya paver?', answer: 'Maya is a durable, versatile premium paver with good value for money and the right shape and color. It suits yards, terraces, gardens and walkways.' },
      { question: 'What sizes does the Maya paver come in?', answer: 'Maya is available in 1 individual size (60×30×6) and 4 Mix models (4.30, 6.30, 7.9, 8.30).' },
      { question: 'What color is the Maya paver available in?', answer: 'Maya is available in a single color: Antique Brown.' },
      { question: 'What type of traffic is the Maya paver recommended for?', answer: 'The Maya paver is recommended for pedestrian and light traffic, suited to yards, terraces, gardens and walkways. It is not recommended for heavy (intense vehicle) traffic.' },
      { question: 'What warranty does Petra Pavaje offer for the Maya paver?', answer: 'Petra Pavaje offers a 5-year warranty for the Maya paver.' },
    ],
  },
  roman: {
    shortDescription: 'Inspired by Romania',
    description:
      'The Roman paver combines elegance and sturdiness to create distinctive outdoor landscaping. With warm brick-yellow and canyon-red shades, this paver adds character and style to any outdoor space. Ideal for terraces, walkways and gardens.',
    heroFeatures: ['1 Size + 1 Mix', '2 Colors', '5-Year Warranty', 'Frost Resistant'],
    specs: [
      { label: 'Dimensions', value: '1 individual + 1 Mix' },
      { label: 'Colors', value: '2 colors' },
      { label: 'Thickness', value: '6-7 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Color Lock technology',
    ],
    advantages: [
      'Elegance and sturdiness',
      'Warm brick-yellow and canyon-red shades',
      'Ideal for terraces, walkways and gardens',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Roman paver?', answer: 'Roman is a premium paver inspired by Romania, combining elegance and sturdiness to create distinctive outdoor landscaping, with warm brick-yellow and canyon-red shades.' },
      { question: 'What sizes does the Roman paver come in?', answer: 'Roman is available in 1 individual size (60×30×6) and 1 Mix model (7.9).' },
      { question: 'What colors is the Roman paver available in?', answer: 'Roman is available in 2 colors: Brick Yellow and Canyon Red.' },
      { question: 'What type of traffic is the Roman paver recommended for?', answer: 'The Roman paver is recommended for pedestrian and light traffic, suited to terraces, walkways and gardens. It is not recommended for heavy (intense vehicle) traffic.' },
      { question: 'What warranty does Petra Pavaje offer for the Roman paver?', answer: 'Petra Pavaje offers a 5-year warranty for the Roman paver.' },
    ],
  },
  sahara: {
    shortDescription: 'Elegance Inspired by Sand Dunes',
    description:
      'Whether your design is rustic or elegant, whether you are after large-format slabs or a paver mix, the Sahara range has products that will elevate any path or yard. Inspired by the shades of sand dunes, they range from light ochre and yellow tones to deeper shades from the brown palette.',
    heroFeatures: ['2 Sizes + 5 Mix', '2 Colors', '5-Year Warranty', 'Frost Resistant'],
    specs: [
      { label: 'Dimensions', value: '2 individual + 5 Mix' },
      { label: 'Colors', value: '2 colors' },
      { label: 'Thickness', value: '4-8 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Color Lock technology',
    ],
    advantages: [
      'Shades inspired by sand dunes',
      'Suited to both rustic and elegant design',
      '5 Mix models for waste-free compositions',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Sahara paver?', answer: 'Sahara is a premium paver inspired by the shades of sand dunes, ranging from light ochre and yellow tones to deeper shades from the brown palette. Suited to both rustic and elegant design.' },
      { question: 'What sizes does the Sahara paver come in?', answer: 'Sahara is available in 2 individual sizes (30×20×6, 60×30×6) and 5 Mix models (4.30, 6.30, 6.6, 7.9, 8.30).' },
      { question: 'What colors is the Sahara paver available in?', answer: 'Sahara is available in 2 colors: Travertine and Mocha.' },
      { question: 'What type of traffic is the Sahara paver recommended for?', answer: 'The Sahara paver is recommended for pedestrian and light traffic, suited to yards, terraces, gardens and walkways. It is not recommended for heavy (intense vehicle) traffic.' },
      { question: 'What warranty does Petra Pavaje offer for the Sahara paver?', answer: 'Petra Pavaje offers a 5-year warranty for the Sahara paver.' },
    ],
  },
  alpin: {
    shortDescription: 'Discreet Elegance with a 3D Effect',
    description:
      'Alpin has a discreet, elegant look. A blend of warm beige shades, paired with wavy, 3D-effect surfaces, evokes the charm of an age-old tradition living again with new energy in the present. Each slab tells its own story and personality, giving the finished surface a distinctive charm. Its contemporary versatility makes this paver suited to both residential and commercial locations.',
    heroFeatures: ['2 Sizes', '2 Colors', '5-Year Warranty', '3D Effect'],
    specs: [
      { label: 'Dimensions', value: '2 sizes' },
      { label: 'Colors', value: '2 colors' },
      { label: 'Thickness', value: '6 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Color Lock technology',
      'Structured surface (3D effect)',
    ],
    advantages: [
      'Discreet, elegant look',
      'Wavy surfaces with a 3D effect',
      'Suited to both residential and commercial locations',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Alpin paver?', answer: 'Alpin is a premium paver with a discreet, elegant look — a blend of warm beige shades with wavy, 3D-effect surfaces that evoke the charm of an age-old tradition. Each slab tells its own story and personality.' },
      { question: 'What sizes does the Alpin paver come in?', answer: 'Alpin is available in 2 individual sizes: 30×20×6 and 60×30×6.' },
      { question: 'What colors is the Alpin paver available in?', answer: 'Alpin is available in 2 colors: White and Mocha.' },
      { question: 'What type of traffic is the Alpin paver recommended for?', answer: 'The Alpin paver is recommended for pedestrian and light traffic, suited to residential and commercial locations. It is not recommended for heavy (intense vehicle) traffic.' },
      { question: 'What warranty does Petra Pavaje offer for the Alpin paver?', answer: 'Petra Pavaje offers a 5-year warranty for the Alpin paver.' },
    ],
  },
  pastel: {
    shortDescription: 'Distinctive Coloring in Two Registers',
    description:
      'Petra Pavaje\'s "Pastel" product delights with a distinctive coloring, in two registers: Autumn and Winter. The paver\'s name comes from fine art, where "pastel" denotes a soft drawing crayon. The finished landscaping resembles a work of art, as the shades unfold in warm or cool gradients that catch every viewer\'s eye.',
    heroFeatures: ['2 Sizes + 2 Mix', '2 Colors', '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: 'Mix 4.30 and Mix 6.30 only' },
      { label: 'Colors', value: '2 colors' },
      { label: 'Thickness', value: '4-6 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Not recommended for heavy traffic',
    ],
    advantages: [
      'Gradient coloring, unique in the Petra Pavaje range',
      '2 colors inspired by the seasons',
      'Available in two thicknesses (Mix 4.30 and Mix 6.30)',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Pastel paver and how is it sold?', answer: 'Pastel is a premium paver sold as the Mix 4.30 model (4 cm thickness) or Mix 6.30 model (6 cm thickness) — each a combination of 3 piece sizes (20×10, 20×20 and 30×20 cm) in the same package. The 20×10 cm pieces shown as a "dimension" on the page are components of these Mix models, not products sold separately.' },
      { question: 'What colors is the Pastel paver available in?', answer: 'Pastel is available in 2 shades: Autumn and Winter, inspired by the seasons, with warm or cool gradients specific to each color register.' },
      { question: 'What sizes does the Pastel Mix paver come in?', answer: 'Mix 4.30 combines 20×10×4, 20×20×4 and 30×20×4 cm pieces. Mix 6.30 combines 20×10×6, 20×20×6 and 30×20×6 cm pieces.' },
      { question: 'Where can the Pastel paver be used?', answer: 'Pastel is recommended for pedestrian and light traffic — gardens, walkways, terraces and park-type public spaces, where its gradient coloring can create a work-of-art visual effect.' },
      { question: 'Is there a datasheet and Declaration of Performance for Pastel?', answer: 'Yes — a datasheet for Mix 6.30 and EU Declarations of Performance for the Autumn and Winter colors, all available in the Product Documents section below.' },
    ],
  },
  timber: {
    shortDescription: "The Illusion of Wood, the Strength of Concrete",
    description:
      "Timber is the perfect choice for those who love the look of wood but want the strength and durability of concrete. With fine wood-grain texture details, the paver creates the illusion of a natural tree-bark floor, with authentic shades and patterns. Thanks to its 3D texture, it is also suited to pool areas, helping prevent slipping.",
    heroFeatures: ['1 Size', '4 Colors', '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: '1 size' },
      { label: 'Colors', value: '4 colors' },
      { label: 'Thickness', value: '6 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Color Lock',
      'Structured, anti-slip surface',
      'Not recommended for heavy traffic',
    ],
    advantages: [
      'A natural wood look, with fine 3D texture details',
      'Also suited to pool areas (anti-slip)',
      'The strength and durability of vibro-pressed concrete',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Timber paver and what sets it apart?', answer: 'Timber is a premium paver that recreates, in vibro-pressed concrete, the authentic look of tree bark — with natural wood shades and patterns. Its 3D texture provides extra grip, suited even to pool areas.' },
      { question: 'What size does the Timber paver come in?', answer: 'Timber is available in a single size: 60×30 cm, 6 cm thick — a unique format, with no Mix variants.' },
      { question: 'What colors is the Timber paver available in?', answer: 'Timber is available in 4 shades inspired by natural wood: Savanna Yellow, Mountain Brown, Mahogany Brown and Ebony Black.' },
      { question: 'Where can the Timber paver be used?', answer: 'Timber is recommended for pedestrian and light traffic — gardens, walkways, terraces, parks and pool areas, thanks to its structured, anti-slip texture. It is not recommended for heavy traffic.' },
      { question: 'What installation patterns are recommended for Timber?', answer: 'There are 4 recommended installation patterns for the 60×30×6 cm format, available in the Installation Patterns section below.' },
      { question: 'Is there a datasheet and Declaration of Performance for Timber?', answer: 'Official technical documentation (datasheet and EU Declarations of Performance) for the Timber range is being finalized for publication.' },
    ],
  },
  terranova: {
    shortDescription: "Nature's Rebirth, Strength and Transformation",
    description:
      "Terranova — the paver that conveys nature's rebirth, strength and transformation. Following volcanic eruptions, lava turns surrounding areas into fertile soil. This paver stands out with a design inspired by nature's transformative strength and beauty, in an intense, vibrant color palette.",
    heroFeatures: ['2 Mix Variants', '2 Colors', '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: '2 Mix variants' },
      { label: 'Colors', value: '2 colors' },
      { label: 'Thickness', value: '6-8 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for parks',
      'Recommended for terraces',
      'Frost resistant',
      'Color Lock',
      'Not recommended for heavy traffic',
    ],
    advantages: [
      "A design inspired by nature's volcanic strength, with an authentic textured look",
      '2 Mix formats for varied landscaping compositions',
      'The strength and durability of vibro-pressed concrete',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Terranova paver and what sets it apart?', answer: "Terranova is the paver that conveys nature's rebirth, strength and transformation — a design inspired by volcanic eruptions and the fertile soils created by lava, in an intense, vibrant color palette with an authentic textured look." },
      { question: 'What formats is the Terranova paver available in?', answer: 'Terranova is sold exclusively in two Mix formats: Mix 6.14, 6 cm thick, and Mix 8.20, 8 cm thick. There is no single-size format.' },
      { question: 'Can Terranova pieces be bought individually, separate from the Mix?', answer: 'No. Mix models are made up of pieces of different sizes and are sold only as a complete pack (row) — buying a single size separately is not possible.' },
      { question: 'What colors is the Terranova paver available in?', answer: 'Terranova is available in 2 shades: Volcanic Red and Chestnut Brown, both available for Mix 6.14 and Mix 8.20.' },
      { question: 'What installation pattern is recommended for Terranova?', answer: 'Each Mix format has its own recommended installation pattern, available in the Installation Patterns section below — separately for Mix 6.14 and Mix 8.20.' },
      { question: 'Is there a datasheet and Declaration of Performance for Terranova?', answer: 'Official technical documentation (datasheet and EU Declarations of Performance) for the Terranova range is being finalized for publication.' },
    ],
  },
  dacic: {
    shortDescription: 'Dacian Spirit and Vibrant Nature',
    description:
      "The Dacic paver, through vibrant colors that echo lush green fields, evokes the grandeur and richness of the Dacian plains. Blending past and present, every stone carries a historical weight, telling the story of a courageous people who lived in harmony with nature. The yellow-green color brings a note of naturalness to the urban landscape.",
    heroFeatures: ['2 Mix Variants', '1 Color', '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: '2 Mix variants' },
      { label: 'Colors', value: '1 color' },
      { label: 'Thickness', value: '6-8 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for terraces',
      'Recommended for parks',
      'Frost resistant',
      'Color Lock',
      'Not recommended for heavy traffic',
    ],
    advantages: [
      'Vibrant colors inspired by the Dacian plains',
      '2 Mix formats for varied landscaping compositions',
      'The strength and durability of vibro-pressed concrete',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Dacic paver and what sets it apart?', answer: 'The Dacic paver, through vibrant colors echoing lush green fields, evokes the grandeur and richness of the Dacian plains. Blending past and present, every stone carries a historical weight, telling the story of a courageous people who lived in harmony with nature.' },
      { question: 'What formats is the Dacic paver available in?', answer: 'Dacic is sold exclusively in two Mix formats: Mix 6.14, 6 cm thick, and Mix 8.20, 8 cm thick. There is no single-size format.' },
      { question: 'Can Dacic pieces be bought individually, separate from the Mix?', answer: 'No. Mix models are made up of pieces of different sizes and are sold only as a complete pack (row) — buying a single size separately is not possible.' },
      { question: 'What colors is the Dacic paver available in?', answer: 'Dacic is available in a single shade: Yellow-Green, available for both Mix 6.14 and Mix 8.20.' },
      { question: 'What installation pattern is recommended for Dacic?', answer: 'Each Mix format has its own recommended installation pattern, available in the Installation Patterns section — separately for Mix 6.14 and Mix 8.20.' },
      { question: 'Is there a datasheet and Declaration of Performance for Dacic?', answer: 'Official technical documentation (datasheet and EU Declarations of Performance) for the Dacic range is being finalized for publication.' },
    ],
  },
  relief: {
    shortDescription: 'Spectacular, Anti-Slip Design',
    description:
      'Thanks to its exposed-aggregate look and mix of shades, Relief brings a spectacular, refined design to any finished space. What\'s more, thanks to its slip-resistant surface, it manages to be the perfect combination of ornamental quality and practicality. Even areas with high humidity can enjoy a chic look.',
    heroFeatures: ['5 Sizes + 1 Mix', '7 Colors', '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: '5 sizes + 1 Mix' },
      { label: 'Colors', value: '7 colors' },
      { label: 'Thickness', value: '5-6 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for terraces',
      'Recommended for parks',
      'Frost resistant',
      'Anti-slip surface',
      'Color Lock',
      'Not recommended for heavy traffic',
    ],
    advantages: [
      'A spectacular design with an exposed-aggregate look and mixed shades',
      'Anti-slip surface — safety and practicality',
      '5 sizes + the Mix 6.30 format for varied compositions',
      '7 vibrant colors, from neutral tones to intense shades',
      'The strength and durability of vibro-pressed concrete',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Relief paver and what sets it apart?', answer: 'Thanks to its exposed-aggregate look and mix of shades, Relief brings a spectacular, refined design to any finished space. Its slip-resistant surface makes it the perfect combination of ornamental quality and practicality.' },
      { question: 'What sizes does the Relief paver come in?', answer: 'Relief is available in 5 individual sizes — 20×10×6 cm, 40×10×6 cm, 20×20×6 cm, 30×20×6 cm, 40×40×5 cm — and in the Mix 6.30 format, a mix of 20×10, 20×20 and 30×20 cm.' },
      { question: 'What colors is the Relief paver available in?', answer: 'Relief is available in 7 shades: Marbled, Onyx Grey, Onyx Black, Limestone Grey, Limonite Beige, Ruby and Emerald Green.' },
      { question: 'What is the Mix 6.30 format on Relief?', answer: 'Mix 6.30 is a special format combining three sizes — 20×10×6 cm (12 pcs), 20×20×6 cm (12 pcs) and 30×20×6 cm (6 pcs) — in a 1.08 sqm package, ideal for generous spaces.' },
      { question: 'What uses is the Relief paver recommended for?', answer: 'Relief is recommended for pedestrian traffic, light traffic, terraces, parks and walkways. Its anti-slip surface makes it ideal for damp or slip-prone areas.' },
      { question: 'Is there a datasheet and Declaration of Performance for Relief?', answer: 'Official technical documentation (datasheet and EU Declarations of Performance) for the Relief range is being finalized for publication.' },
    ],
  },
  urbis: {
    shortDescription: 'A Parquet Look for Modern Landscaping',
    description:
      'The Stretto paver is a modern, versatile product, designed in response to growing demand for a paver that mimics the look of parquet flooring. The narrow 24×6 cm pavers suit modern, minimalist landscaping, and the rectangular shape allows for distinctive laying patterns.',
    heroFeatures: ['Single Size 24×6 cm', '3 Colors', '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: 'Single size' },
      { label: 'Colors', value: '3 colors' },
      { label: 'Thickness', value: '7 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Pedestrian traffic',
      'Light traffic',
      'Recommended for terraces',
      'Recommended for parks',
      'Frost resistant',
      'Fade-resistant color — natural streaking',
      'Not recommended for heavy traffic',
    ],
    advantages: [
      'A modern, versatile parquet look',
      'A narrow rectangular shape, ideal for distinctive laying patterns',
      '3 elegant colors for minimalist landscaping',
      'The strength and durability of vibro-pressed concrete',
      '5-year warranty',
    ],
    faq: [
      { question: 'What is the Stretto paver and what sets it apart?', answer: 'The Stretto paver is a modern, versatile product, designed in response to growing demand for a paver that mimics the look of parquet flooring. The narrow 24×6 cm pavers suit modern, minimalist landscaping.' },
      { question: 'What size does the Stretto paver come in?', answer: 'Stretto is available in a single size of 24×6×7 cm, specially designed to mimic the look of parquet and enable distinctive laying patterns.' },
      { question: 'What colors is the Stretto paver available in?', answer: 'Stretto is available in 3 elegant shades: Sepia, Graphite Grey and Antique Grey.' },
      { question: 'What kinds of projects is the Stretto paver recommended for?', answer: 'The rectangular, parquet-like shape suits modern, minimalist landscaping, terraces and pedestrian areas perfectly, enabling distinctive laying patterns.' },
      { question: 'Is there a datasheet and Declaration of Performance for Stretto?', answer: 'Official technical documentation (datasheet and EU Declarations of Performance) for the Stretto range is being finalized for publication.' },
    ],
  },
  holland: {
    shortDescription: 'Classic Model, Versatile Laying Patterns',
    description:
      "Holland is a classic model used worldwide. It can be laid in a variety of patterns. Thanks to its universal applicability, it's used for both pedestrian surfaces and areas subject to vehicle traffic, including heavy loads. It can be installed in a multitude of patterns.",
    heroFeatures: ['10 Sizes', '7 Colors', '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: '10 sizes' },
      { label: 'Colors', value: '7 colors' },
      { label: 'Thickness', value: '4-8 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: ['Pedestrian traffic', 'Vehicle traffic including heavy loads', 'Sidewalks', 'Yards and terraces', 'Frost resistant', 'Color Lock'],
    advantages: [
      '10 sizes for any type of landscaping project',
      '7 colors, including caramel',
      'Suitable for vehicle traffic, including heavy loads',
      'The strength and durability of vibro-pressed concrete',
      '5-Year Warranty',
    ],
    faq: [
      { question: 'What projects is the Holland paver recommended for?', answer: 'Holland is a classic model used worldwide, suited to both pedestrian surfaces — walkways, terraces, yards, sidewalks — and areas subject to vehicle traffic, including heavy loads.' },
      { question: 'What sizes is the Holland paver available in?', answer: 'Holland is available in 10 sizes, with thicknesses of 4, 5, 6 and 8 cm: 20×10, 25×20, 40×10, 21×14, 30×20 and 60×30 cm. The 30×20×8 format is also available in a SMART variant.' },
      { question: 'What colors are available for Holland?', answer: 'The range includes 7 colors: grey, red, black, yellow, brown, white and caramel. The caramel color is available exclusively for the 20×10×6 cm size.' },
      { question: 'Is Holland suitable for vehicle traffic?', answer: 'Yes. Thanks to its universal applicability, Holland is also used for vehicle traffic, including heavy loads — the 6 and 8 cm thicknesses are preferred, laid appropriately.' },
      { question: 'What does the SMART variant mean for Holland 30×20×8?', answer: 'The SMART variant is produced with added fiber and a special binder for extra strength under stress, and is recommended for heavy vehicle traffic without changing the look of the format.' },
      { question: 'Is there a datasheet and Declaration of Performance for Holland?', answer: 'Yes. Official technical documentation (datasheet and EU Declarations of Performance) is available on the product page and on request, including for the 6 and 8 cm thicknesses used in vehicle traffic.' },
    ],
  },
  autobloc: {
    shortDescription: 'Strength for Heavy Traffic',
    description:
      'Autobloc is the ideal solution for paving large, heavily used public surfaces subject to vehicle traffic (including heavy loads). Its strength makes it suitable for parking lots, access roads, fuel stations and more.',
    heroFeatures: ['7 Sizes', '5 Colors', '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: '7 sizes' },
      { label: 'Colors', value: '5 colors' },
      { label: 'Thickness', value: '6-10 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: ['Heavy vehicle traffic', 'Heavy loads', 'Parking lots', 'Access roads', 'Frost resistant', 'Color Lock', 'Fuel stations', 'Industrial platforms'],
    advantages: [
      'Rugged enough for heavily used surfaces',
      'Available beveled or square-edged',
      'Half piece for flexible fill-ins',
      'Green color available exclusively at 10 cm thickness',
      'Resistant to frost and abrasion',
      '5-Year Warranty',
    ],
    faq: [
      { question: 'What is the Autobloc paver recommended for?', answer: 'Autobloc is designed for surfaces subject to heavy traffic and heavy loads: parking lots, access roads, fuel stations, industrial platforms, bus stations and walkways with heavy foot traffic.' },
      { question: 'What thicknesses is Autobloc available in?', answer: 'Autobloc is available in 6 cm, 8 cm, 10 cm thicknesses and a special half piece (10×16.5×8 cm). For heavy vehicle traffic, the 8 and 10 cm thicknesses are recommended.' },
      { question: 'What does beveled or square-edged Autobloc mean?', answer: 'The beveled variant has slightly rounded edges, giving a softer look and a continuous curb-like laying style; the square-edged variant has straight edges, for more compact installations and a strict geometric look.' },
      { question: 'What colors are available for Autobloc?', answer: 'Autobloc is available in grey, red, black and white, plus green, available exclusively for the 10 cm thickness.' },
      { question: 'What is the packaging difference between thicknesses?', answer: 'Although the piece size is the same (20×16.5 cm), the number of pieces per pallet and the pallet weight differ: 330 pcs/1,263 kg for 6 cm, 297 pcs/1,465 kg for 8 cm and 264 pcs/1,635 kg for 10 cm.' },
      { question: 'Is there a datasheet and Declaration of Performance for Autobloc?', answer: 'Yes. Official technical documentation is available on the product page and on request.' },
    ],
  },
  unda: {
    shortDescription: 'Wave Design, Easy Installation',
    description:
      "Unda offers a delightful combination of strength and appealing design through its wave-like shape. Together with easy installation, this makes it suitable for both residential projects and public spaces. The paver's name was inspired by the Mureș River, on whose bank the Petra Pavaje factory is built.",
    heroFeatures: ['2 Sizes', '4 Colors', '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: '2 sizes' },
      { label: 'Colors', value: '4 colors' },
      { label: 'Thickness', value: '6-8 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: ['Pedestrian traffic', 'Light vehicle traffic', 'Terraces', 'Walkways and yards', 'Frost resistant', 'Color Lock'],
    advantages: [
      'Simple installation with naturally interlocking tiles',
      'A dynamic, appealing wave-like look',
      'Available in 6 and 8 cm thicknesses',
      'Strength and durability of vibro-pressed concrete',
      '5-Year Warranty',
    ],
    faq: [
      { question: 'What is the Unda paver?', answer: "Unda offers a delightful combination of strength and appealing design, with shapes that interlock naturally and give the surface a dynamic, wave-like look. It's a favorite for walkways and terraces thanks to its easy installation." },
      { question: 'What sizes is Unda available in?', answer: 'Unda is available in a 22.5×11.2 cm format, in two thicknesses: 6 cm (for light vehicle traffic) and 8 cm (recommended for higher stress). Packaging values differ by thickness.' },
      { question: 'What colors are available for Unda?', answer: 'Each thickness is available in 4 colors: grey, red, black and white.' },
      { question: 'How is the Unda paver installed?', answer: "The tiles are laid in parallel rows or a winding pattern, with the natural interlocking of the shapes enabling quick, stable installation on a bed of compacted sand or gravel." },
      { question: 'Is there a datasheet and Declaration of Performance for Unda?', answer: 'Yes. Official technical documentation is available on the product page and on request.' },
    ],
  },
  con: {
    shortDescription: 'Cone-Shaped Paver for Unique Patterns',
    description:
      'The Con paver is made from strong, durable materials, providing a stable, safe surface suitable for both pedestrian traffic and light vehicles. Thanks to its distinctive shape, it allows for multiple arrangement and combination options, making it ideal for creating unique patterns and designs.',
    heroFeatures: ['4 Colors', '5-Year Warranty'],
    specs: [
      { label: 'Colors', value: '4 colors' },
      { label: 'Thickness', value: '6 cm' },
      { label: 'Format', value: 'Cone-shaped 10/5×9.7' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: ['Pedestrian traffic', 'Light vehicles', 'Walkways and pedestrian areas', 'Decorative edging', 'Frost resistant', 'Color Lock'],
    advantages: [
      'Cone shape for flexible, curved layouts',
      'Enables unique patterns and compositions',
      'Stable, safe surface',
      'Strength and durability of vibro-pressed concrete',
      '5-Year Warranty',
    ],
    faq: [
      { question: 'What is the Con paver?', answer: 'Con is a cone-shaped paver (wider at one end, narrower at the other), which allows flexible layouts, curved edging and natural interlocking, successfully used for walkways and pedestrian areas.' },
      { question: 'What size and thickness does Con have?', answer: 'Con measures 10/5×9.7 cm, with a thickness of 6 cm. It ships on a pallet of 540 pcs, weighing 538 kg, covering 4.45 m² per pallet.' },
      { question: 'What colors is Con available in?', answer: 'Con is available in 4 colors: grey, red, black and white.' },
      { question: 'Where is the Con paver typically used?', answer: 'It is suited to walkways, pedestrian areas, yards, building grounds and decorative edging, where the cone shape allows for curved, flexible compositions.' },
      { question: 'Is there a datasheet and Declaration of Performance for Con?', answer: 'Yes. Official technical documentation is available on the product page and on request.' },
    ],
  },
  'pavaje-eco': {
    name: 'Eco Pavers',
    shortDescription: 'Eco-Friendly Landscaping Solution',
    description:
      "The grid offers an eco-friendly landscaping solution, often used for reinforcing sloped terrain and paving parking lots or access roads. Its open-space structure allows grass to grow through, giving a more natural, appealing look.",
    heroFeatures: ['3 Products', '2 Colors', 'Permeable', '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: '3 variants' },
      { label: 'Colors', value: '2 colors' },
      { label: 'Thickness', value: '8-10 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: [
      'Permeability',
      'Allows grass to grow through',
      'Reinforces sloped terrain',
      'Parking lots and access roads',
      'Frost resistant',
      'Color Lock',
      'Not recommended for heavy vehicle traffic',
    ],
    advantages: [
      'An eco-friendly, nature-inspired solution',
      'A natural look through grass growth',
      'Effective slope reinforcement',
      'Natural rainwater management',
      '5-Year Warranty',
    ],
    faq: [
      { question: 'What are Petra Pavaje ECO pavers?', answer: 'They are permeable solutions designed to allow vegetation (grass) to grow through the openings in the tile or grid, helping slow rainwater runoff and giving a natural look to the landscaping.' },
      { question: 'What products does the ECO range include?', answer: 'The ECO range includes the 40×40×8 cm eco-grid, the 60×40×10 cm eco-grid and the Quatro ECO 20×20×8 cm eco-paver.' },
      { question: 'Where is the eco-paver used?', answer: 'It is recommended for grassed parking, occasional-use access roads, slope reinforcement, green areas and any project where keeping a green surface matters without giving up the ability to drive or walk on it.' },
      { question: 'What colors are the ECO pavers available in?', answer: 'The grids and Quatro ECO are available in grey and black.' },
      { question: 'Is there a datasheet for the ECO pavers?', answer: 'Yes. Official technical documentation is available on the product page and on request.' },
    ],
  },
}

// The 19 Quatro variants (src/data/products.ts ids 'quatro-*') are dimensional
// or color-marking variants of the same square paver, and their RO source
// copy is itself templated (only the size/color/subtype changes). Generating
// their translations from small template functions avoids hand-duplicating
// 19 near-identical blocks and the drift that would invite.

interface QuatroClassicSpec {
  slug: string
  dim: string
  shortDescription: string
  colorsRo: string[]
  hasDatasheet: boolean
}

const QUATRO_CLASSIC_SPECS: QuatroClassicSpec[] = [
  { slug: 'quatro-10x10x6', dim: '10×10×6', shortDescription: 'Square Shape, Symmetric Compositions', colorsRo: ['Gri', 'Roșu', 'Negru', 'Galben', 'Maro', 'Alb'], hasDatasheet: true },
  { slug: 'quatro-20x20x6', dim: '20×20×6', shortDescription: 'The Most Popular Format, Versatile', colorsRo: ['Gri', 'Roșu', 'Negru', 'Galben', 'Maro', 'Alb'], hasDatasheet: true },
  { slug: 'quatro-20x20x8', dim: '20×20×8', shortDescription: 'Extra Thickness, Light Vehicle Traffic', colorsRo: ['Gri', 'Roșu', 'Negru', 'Alb'], hasDatasheet: true },
  { slug: 'quatro-30x30x6', dim: '30×30×6', shortDescription: 'Generous Format for Large Spaces', colorsRo: ['Gri', 'Roșu', 'Negru', 'Galben', 'Maro', 'Alb'], hasDatasheet: true },
  { slug: 'quatro-40x40x5', dim: '40×40×5', shortDescription: 'Large Format for Terraces and Walkways', colorsRo: ['Gri', 'Roșu', 'Negru', 'Galben', 'Maro', 'Alb'], hasDatasheet: false },
  { slug: 'quatro-40x40x6', dim: '40×40×6', shortDescription: 'Large Format, 6 cm Thickness', colorsRo: ['Gri', 'Roșu', 'Negru', 'Galben', 'Maro', 'Alb'], hasDatasheet: true },
  { slug: 'quatro-50x50x8', dim: '50×50×8', shortDescription: 'XL Format for Visual Impact', colorsRo: ['Gri', 'Negru'], hasDatasheet: true },
]

function buildQuatroClassicEntry(spec: QuatroClassicSpec): ProductTranslationEn {
  const colorsEn = spec.colorsRo.map(translateColorName)
  const colorCount = colorsEn.length
  const thickness = spec.dim.split('×').pop()
  return {
    shortDescription: spec.shortDescription,
    description: `The Quatro ${spec.dim} paver from the standard Quatro range brings balance and symmetry to any landscaping project. The square shape allows for orderly, checkerboard-style compositions, suited for sidewalks, yards, terraces and pedestrian areas.`,
    heroFeatures: ['1 Size', `${colorCount} Color${colorCount === 1 ? '' : 's'}`, '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: '1 size' },
      { label: 'Colors', value: `${colorCount} color${colorCount === 1 ? '' : 's'}` },
      { label: 'Thickness', value: `${thickness} cm` },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: ['Pedestrian traffic', 'Light vehicle traffic', 'Terraces', 'Walkways and yards', 'Frost resistant', 'Color Lock'],
    advantages: ['Symmetric checkerboard-style compositions', 'Strength and durability of vibro-pressed concrete', '5-Year Warranty'],
    faq: [
      { question: `What colors is the QUATRO ${spec.dim} available in?`, answer: `${colorsEn.join(', ')}, with Color Lock texture to keep the color over time.` },
      { question: `What type of traffic is the QUATRO ${spec.dim} recommended for?`, answer: 'Recommended for pedestrian traffic and light vehicle traffic: sidewalks, yards, terraces, walkways and residential areas. For heavy vehicle traffic, the SMART variants are recommended.' },
      { question: 'How is it installed?', answer: 'It is installed on a bed of compacted sand or gravel, in aligned rows (checkerboard style) or offset rows, depending on the desired effect.' },
      { question: 'Is it frost resistant?', answer: 'Yes, it is made of vibro-pressed concrete with guaranteed frost resistance and comes with a 5-year warranty.' },
      {
        question: `Is there a datasheet and Declaration of Performance for QUATRO ${spec.dim}?`,
        answer: spec.hasDatasheet
          ? 'Yes, official technical documentation is available on the product page and on request.'
          : 'Official technical documentation for this format is being finalized for publication; available on request.',
      },
    ],
  }
}

interface QuatroSmartSpec {
  slug: string
  dim: string
  shortDescription: string
  colorsRo: string[]
}

const QUATRO_SMART_SPECS: QuatroSmartSpec[] = [
  { slug: 'quatro-smart-20x20x8', dim: '20×20×8', shortDescription: 'Extra Strength, Heavy Vehicle Traffic', colorsRo: ['Gri', 'Roșu', 'Negru', 'Alb'] },
  { slug: 'quatro-smart-20x20x10', dim: '20×20×10', shortDescription: 'The Toughest Quatro Variant', colorsRo: ['Gri', 'Negru'] },
]

function buildQuatroSmartEntry(spec: QuatroSmartSpec): ProductTranslationEn {
  const colorsEn = spec.colorsRo.map(translateColorName)
  const colorCount = colorsEn.length
  const thickness = spec.dim.split('×').pop()
  return {
    shortDescription: spec.shortDescription,
    description: `Quatro Smart ${spec.dim} is produced with added fiber and a special binder for extra strength under stress. It keeps the same look as the classic version, but its performance allows use in heavy vehicle traffic areas: parking lots, access ramps and interior roads.`,
    heroFeatures: ['1 Size', `${colorCount} Color${colorCount === 1 ? '' : 's'}`, '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: '1 size' },
      { label: 'Colors', value: `${colorCount} color${colorCount === 1 ? '' : 's'}` },
      { label: 'Thickness', value: `${thickness} cm` },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: ['Heavy vehicle traffic', 'Parking lots', 'Extra strength', 'Terraces', 'Walkways and yards', 'Frost resistant', 'Color Lock'],
    advantages: ['Added fiber and special binder', 'Extra strength under stress', 'Identical look to classic Quatro', '5-Year Warranty'],
    faq: [
      { question: `What does the SMART variant mean for QUATRO SMART ${spec.dim}?`, answer: 'The SMART variant is produced with added fiber and a special binder for extra strength under stress. It keeps the same look as the classic version, but its performance allows use in heavy vehicle traffic areas.' },
      { question: `What colors is the QUATRO SMART ${spec.dim} available in?`, answer: `${colorsEn.join(', ')}, with Color Lock texture to keep the color over time.` },
      { question: 'What type of traffic is it recommended for?', answer: 'Recommended for heavy vehicle traffic: parking lots, access ramps, circulation areas and interior roads. It has extra resistance to frost and abrasion.' },
      { question: 'How is it installed?', answer: 'It is installed on a bed of compacted sand or gravel, in aligned rows (checkerboard style) or offset rows, depending on the desired effect.' },
      { question: `Is there a datasheet and Declaration of Performance for QUATRO SMART ${spec.dim}?`, answer: 'Yes, official technical documentation is available on the product page and on request.' },
    ],
  }
}

const QUATRO_TACTIL_FAQ: ProductFAQ[] = [
  { question: 'What is the purpose of the Quatro Tactil tiles?', answer: 'The tactile tiles are designed to guide and inform visually impaired pedestrians. The raised texture applied on sidewalks, transit stops and pedestrian crossings signals a change of direction or the presence of hazardous areas.' },
  { question: 'What is the difference between the dot tile and the line tile?', answer: 'The dot tile signals attention or danger (placed at crossings, platform edges), while the line tile indicates the safe direction of travel. Both combine to form complete wayfinding routes.' },
  { question: 'What colors is the Tactil tile available in?', answer: 'The Tactil tiles are available in white, in the 20×20×6 cm and 30×30×6 cm sizes.' },
  { question: 'Where are tactile tiles usually installed?', answer: 'They are installed along pedestrian routes, at crossings, public transit stops, entrances to public buildings and other areas with high foot traffic, both outdoors and indoors.' },
  { question: 'Is it frost resistant?', answer: 'Yes, the tactile tile is made of vibro-pressed concrete with guaranteed frost resistance and comes with a 5-year warranty.' },
]

interface QuatroTactilSpec {
  slug: string
  dim: string
  variant: 'Dots' | 'Lines'
}

const QUATRO_TACTIL_SPECS: QuatroTactilSpec[] = [
  { slug: 'quatro-tactil-puncte-20x20x6', dim: '20×20×6', variant: 'Dots' },
  { slug: 'quatro-tactil-puncte-30x30x6', dim: '30×30×6', variant: 'Dots' },
  { slug: 'quatro-tactil-linii-20x20x6', dim: '20×20×6', variant: 'Lines' },
  { slug: 'quatro-tactil-linii-30x30x6', dim: '30×30×6', variant: 'Lines' },
]

function buildQuatroTactilEntry(spec: QuatroTactilSpec): ProductTranslationEn {
  const description =
    spec.variant === 'Dots'
      ? `The Quatro Tactil · Dots ${spec.dim} white tactile paver from the Quatro range is designed to guide and inform visually impaired pedestrians. The raised dot texture signals areas requiring attention or caution, and is used at pedestrian crossings, platform edges and intersections.`
      : `The Quatro Tactil · Lines ${spec.dim} white tactile paver from the Quatro range is designed to guide and inform visually impaired pedestrians. The raised line texture indicates the safe direction of travel, and is used along pedestrian routes, at public transit stops and in public spaces.`
  return {
    shortDescription: 'Tactile Guidance, Accessibility',
    description,
    heroFeatures: ['1 Size', 'White Color', 'Tactile Guidance'],
    specs: [
      { label: 'Dimensions', value: '1 size' },
      { label: 'Colors', value: '1 color' },
      { label: 'Thickness', value: '6 cm' },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: ['Guidance for visually impaired pedestrians', 'Standardized raised texture', 'Pedestrian traffic', 'Frost resistant', 'Color Lock'],
    advantages: ['Dot/line texture per standards', 'Installs flush with regular paving', 'Strength and durability of vibro-pressed concrete', '5-Year Warranty'],
    faq: QUATRO_TACTIL_FAQ,
  }
}

interface QuatroMarkingSpec {
  slug: string
  dim: string
  label: string
  marks: string
}

const QUATRO_MARKING_SPECS: QuatroMarkingSpec[] = [
  { slug: 'quatro-parcare-20x20x6', dim: '20×20×6', label: 'Parking', marks: 'the parking space' },
  { slug: 'quatro-parcare-20x20x8', dim: '20×20×8', label: 'Parking', marks: 'the parking space' },
  { slug: 'quatro-parcare-dizabilitati-20x20x6', dim: '20×20×6', label: 'Disability Parking', marks: 'the parking space reserved for people with disabilities' },
  { slug: 'quatro-parcare-dizabilitati-20x20x8', dim: '20×20×8', label: 'Disability Parking', marks: 'the parking space reserved for people with disabilities' },
  { slug: 'quatro-acces-biciclete-20x20x6', dim: '20×20×6', label: 'Bike Access', marks: 'the bike access route' },
  { slug: 'quatro-acces-biciclete-20x20x8', dim: '20×20×8', label: 'Bike Access', marks: 'the bike access route' },
]

const QUATRO_MARKING_DESCRIPTIONS: Record<string, string> = {
  Parking:
    'The Parking marking tile integrates the raised "P" symbol directly into the paved surface, permanently marking parking spaces. It\'s a perfect replacement for paint, keeping the same format and thickness as the Quatro paver.',
  'Disability Parking':
    'The Disability Parking marking tile integrates the raised international disability symbol, permanently reserving parking spaces for people with disabilities. It installs directly within the paving, without any extra work.',
  'Bike Access':
    'The Bike Access marking tile integrates the raised bicycle symbol, permanently indicating bike access routes. It replaces paint and temporary signage, keeping the paved surface looking neat and orderly.',
}

function buildQuatroMarkingEntry(spec: QuatroMarkingSpec): ProductTranslationEn {
  const thickness = spec.dim.split('×').pop()
  return {
    shortDescription: 'Durable Marking, Clean Look',
    description: QUATRO_MARKING_DESCRIPTIONS[spec.label],
    heroFeatures: ['1 Size', 'Black Color', '5-Year Warranty'],
    specs: [
      { label: 'Dimensions', value: '1 size' },
      { label: 'Colors', value: '1 color' },
      { label: 'Thickness', value: `${thickness} cm` },
      { label: 'Warranty', value: '5 years' },
    ],
    technicalFeatures: ['Durable marking within the paved surface', 'Raised, easily recognizable symbol', 'Pedestrian traffic', 'Frost resistant', 'Color Lock'],
    advantages: ['A durable alternative to paint', 'Blends seamlessly into standard paving', 'Requires no special maintenance', '5-Year Warranty'],
    faq: [
      { question: `What does the ${spec.label} marking tile represent?`, answer: `It's a 20×20 cm Quatro paver tile with a raised symbol that marks ${spec.marks}. It blends perfectly into the paved surface, keeping the same format and thickness.` },
      { question: `What colors is the ${spec.label} marking tile available in?`, answer: `The ${spec.label} marking tile is available in black, which provides clear contrast against lighter paving.` },
      { question: 'Where is it usually installed?', answer: 'It is installed in parks, parking lots, public spaces and building grounds, in place of a regular paving tile, for durable, permanent marking.' },
      { question: 'How is it installed?', answer: 'It installs exactly like the classic paver, on a bed of compacted sand or gravel, integrated into the row of paving.' },
      { question: 'Is it frost resistant?', answer: 'Yes, the marking tile is made of vibro-pressed concrete with guaranteed frost resistance and comes with a 5-year warranty.' },
    ],
  }
}

for (const spec of QUATRO_CLASSIC_SPECS) productTranslationsEn[spec.slug] = buildQuatroClassicEntry(spec)
for (const spec of QUATRO_SMART_SPECS) productTranslationsEn[spec.slug] = buildQuatroSmartEntry(spec)
for (const spec of QUATRO_TACTIL_SPECS) productTranslationsEn[spec.slug] = buildQuatroTactilEntry(spec)
for (const spec of QUATRO_MARKING_SPECS) productTranslationsEn[spec.slug] = buildQuatroMarkingEntry(spec)

export function translateColorName(name: string): string {
  return COLOR_NAME_EN[name] || name
}

export function translateUsageTag(tag: string): string {
  return USAGE_TAG_EN[tag] || tag
}
