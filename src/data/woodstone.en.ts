// English translation overlay for the Woodstone -- Petrified Wood range (7
// categories). Kept separate from woodstone.ts (the source of truth for RO
// content and all structural/regulatory data: images, codes, weights,
// palletizing) so translating never risks the live Romanian catalog.
// Variant names ARE translated here (unlike dimensionsList labels in the
// main product catalog) because they double as the primary "Denumire" /
// Name column shown to visitors, not just a raw dimension string.
import type { ProductFAQ } from './types'

export interface WoodstoneVariantGroupTranslationEn {
  name: string
  note?: string
  variantNames: string[]
}

export interface WoodstoneCategoryTranslationEn {
  name: string
  title: string
  shortDescription: string
  description: string
  heroFeatures: string[]
  variantGroups: WoodstoneVariantGroupTranslationEn[]
  technicalFeatures: string[]
  advantages: string[]
  usage: string[]
  faq?: ProductFAQ[]
}

export const woodstoneTranslationsEn: Record<string, WoodstoneCategoryTranslationEn> = {
  pavaj: {
    name: 'Pavers',
    title: 'Pavers',
    shortDescription: 'Natural wood look, stone durability',
    description:
      'The paver system from the Petrified Wood range includes a varied collection of elements that reproduce the natural look of wood. The shapes and sizes of the slabs and pavers allow for numerous combinations, suited for walkways, sidewalks, relaxation areas around homes and gardens, and public spaces. The distinctive design blends harmoniously with the natural character of any landscaped outdoor space.',
    heroFeatures: ['17 variants (slabs, blocks, planks, maxi planks)', 'Multiple colors and finishes', 'Frost and weather resistant'],
    variantGroups: [
      { name: 'Slabs', variantNames: ['Slab 100', 'Slab 75', 'Slab 50'] },
      { name: 'Blocks', variantNames: ['Block 50', 'Block 50×25', 'Block 25', 'Round Block 45'] },
      { name: 'Planks', variantNames: ['Plank 100', 'Plank 75', 'Plank 50', 'Plank – Block 25'] },
      { name: 'Maxi Plank', variantNames: ['Maxi Plank 200×40', 'Maxi Plank 150×40', 'Maxi Plank 100×40', 'Maxi Plank 200×75', 'Maxi Plank 150×75', 'Maxi Plank 100×75'] },
    ],
    technicalFeatures: [
      'Made entirely of concrete',
      'Distinctive finishes with natural knots and grain',
      'Resistant to frost and freeze-thaw cycles',
      'Factory-impregnated with a protective coating',
      'Slots open outward for drainage',
    ],
    advantages: [
      'Natural wood look with concrete-grade durability',
      'Superior durability to concrete',
      'No maintenance required',
      'Over 100 possible combinations',
      'Ideal for terraces and relaxation areas',
    ],
    usage: ['Walkways and Sidewalks', 'Terraces and Relaxation Areas', 'Residential Gardens', 'Public Spaces'],
    faq: [
      { question: 'What is the Woodstone Pavaj system and what is it made of?', answer: 'It is a vibro-pressed concrete paver system that reproduces the authentic look of wood — knots, grain and worn edges — combining the natural texture of wood with the durability of concrete.' },
      { question: 'How many format variants are available?', answer: 'The range includes 17 variants, split into 4 groups: slabs (3 variants), blocks (4 variants), planks (4 variants) and maxi planks (6 variants), allowing for over 100 landscaping combinations.' },
      { question: 'Is it frost resistant?', answer: 'Yes. The product is factory-impregnated with a protective coating, and the slots are open outward to allow for water expansion during freeze-thaw cycles without damaging the surface.' },
      { question: 'Where can the Woodstone paver be used?', answer: 'It is recommended for walkways and sidewalks, terraces and relaxation areas, residential gardens and public spaces.' },
      { question: 'Is there a datasheet for the Woodstone Pavaj range?', answer: 'Technical documentation can be requested directly from Petra Pavaje representatives for each format in the range.' },
    ],
  },
  'palisade-si-borduri': {
    name: 'Palisades and Curbs',
    title: 'Palisades and Curbs',
    shortDescription: 'Elegant, durable edging for your garden',
    description:
      'The Woodstone palisade and curb range offers complete solutions for edging walkways, lawns and planted areas. Beam and plate palisades are installed vertically, in various heights, for low fences and decorative retaining walls, while curbs and lawn-edging elements clearly mark the boundaries of walkways and lawns. All pieces keep the authentic look of petrified wood.',
    heroFeatures: ['21 variants (18 palisades + lawn edging + 2 curbs)', 'Solid petrified wood', 'Frost and weather resistant'],
    variantGroups: [
      { name: 'Beam Palisade', variantNames: ['Beam Palisade 250', 'Beam Palisade 150', 'Beam Palisade 125', 'Beam Palisade 100', 'Beam Palisade 75', 'Beam Palisade 50', 'Beam Palisade 25'] },
      { name: 'Plate Palisade', variantNames: ['Plate Palisade 75', 'Plate Palisade 50', 'Plate Palisade 25'] },
      { name: 'Plank Palisade', variantNames: ['Plank Palisade 200×40', 'Plank Palisade 150×40', 'Plank Palisade 100×40', 'Plank Palisade 50×40', 'Plank Palisade 200×75', 'Plank Palisade 150×75', 'Plank Palisade 100×75', 'Plank Palisade 50×75'] },
      { name: 'Lawn Edging', variantNames: ['Lawn Edging'] },
      { name: 'Curbs', variantNames: ['Irregular Curb', 'Regular Curb'] },
    ],
    technicalFeatures: [
      'Natural wood look with concrete-grade durability',
      'Finishes with a natural weathered-wood texture',
      'Resistant to frost and freeze-thaw cycles',
      'Factory-impregnated with a protective coating',
      'Vertical installation (palisades) or ground-level (curbs)',
    ],
    advantages: [
      'Natural wood look, stone-like durability',
      'No periodic maintenance required',
      'Easy to install and handle',
      'Matches Woodstone pavers and fences',
      'A wide range of sizes, from 25 cm to 250 cm',
    ],
    usage: ['Walkway and Sidewalk Edging', 'Decorative Retaining Walls', 'Flower Bed Marking', 'Lawn Edging'],
    faq: [
      { question: 'What is the difference between the beam palisade and the plate palisade?', answer: 'The beam palisade (24×15 cm cross-section) is solid, designed for low fences and retaining walls, while the plate palisade (25×5 cm) is thinner, suited for light edging of walkways and flower beds.' },
      { question: 'How many variants are available in the Palisades and Curbs range?', answer: 'The range includes 21 variants: 18 palisades (beam, plate and plank, in lengths from 25 to 250 cm), 1 lawn-edging element and 2 types of curbs (irregular and regular).' },
      { question: 'How are the palisades installed?', answer: 'Beam and plate palisades are installed vertically, partially buried in the ground, for low fences or decorative retaining walls; curbs are installed at ground level, along walkways or lawns.' },
      { question: 'Where are Woodstone palisades and curbs typically used?', answer: 'They are recommended for edging walkways and sidewalks, decorative retaining walls, marking flower beds, and edging lawns.' },
    ],
  },
  scari: {
    name: 'Steps',
    title: 'Steps',
    shortDescription: "Elegance and safety for your home's exterior",
    description:
      "Steps from the Woodstone range are the perfect solution for entrances, terraces and gardens with level changes. Steps and step-plates with a petrified-wood look, available in several lengths and thicknesses, provide an elegant, safe transition between different levels of your yard, keeping the natural look of wood and the strength of concrete.",
    heroFeatures: ['12 variants (6 steps + 6 step-plates)', 'Solid petrified wood', 'Anti-slip surface'],
    variantGroups: [
      { name: 'Steps', variantNames: ['Step 250', 'Step 150', 'Step 125', 'Step 100', 'Step 75', 'Step 50'] },
      { name: 'Step Plates', variantNames: ['Step Plate 200 (7cm thick)', 'Step Plate 150 (7cm thick)', 'Step Plate 100 (7cm thick)', 'Step Plate 200 (8cm thick)', 'Step Plate 150 (8cm thick)', 'Step Plate 100 (8cm thick)'] },
    ],
    technicalFeatures: [
      'Made entirely of concrete',
      'Resistant to frost and weather',
      'Naturally textured anti-slip surface',
      'Factory-impregnated with a protective coating',
      'High long-term durability',
    ],
    advantages: [
      'Natural wood look with concrete-grade durability',
      'No periodic maintenance required',
      'Anti-slip surface for safety',
      'Easy to install and handle',
      'Matches Woodstone palisades and pavers',
    ],
    usage: ['Home Entrances', 'Terraces and Platforms', 'Gardens and Yards', 'Commercial Spaces'],
    faq: [
      { question: 'What is the difference between steps and step-plates?', answer: 'Steps (250×24×15 cm and smaller) have a solid cross-section dedicated exclusively to stairs; step-plates (7 or 8 cm thick) are thinner and can be used both as steps and as paving elements for platforms.' },
      { question: 'How many step variants are available?', answer: 'The range includes 12 variants: 6 steps (from 50 to 250 cm in length) and 6 step-plates (7 and 8 cm thick).' },
      { question: 'Is the surface of the steps anti-slip?', answer: 'Yes. The surface has natural wood textures that provide extra grip, recommended for entrances, terraces and platforms where foot-traffic safety matters.' },
      { question: 'Where are Woodstone steps used?', answer: 'They are suited for home entrances, terraces and platforms, gardens and yards with level changes, as well as commercial spaces.' },
    ],
  },
  garduri: {
    name: 'Fences',
    title: 'Fences',
    shortDescription: 'Modular system: fence panels + support posts',
    description:
      'The Petrified Wood fence system allows for building fences of different heights, with a beautifully natural look. Fence panels are available in ten different designs, each with an original combination of shades and distinctive black accents, making every fence unmistakable and extremely durable. The whole system is completed and finished off with fence caps. In addition to its visible height (1.6 / 2 / 2.4 m), each post has an extra 78 cm section meant to be buried in the foundation for stability — for example, the "2.4 m" post has a total physical length of 318 cm.',
    heroFeatures: ['13 variants (1 panel + 9 posts + 3 accessories)', '10 panel designs, shades with black accents', 'Frost and weather resistant'],
    variantGroups: [
      { name: 'Fence Panels', variantNames: ['Fence Panel'] },
      {
        name: 'Support Posts',
        note: '9 variants — 3 positions × 3 heights (each post has an extra 78 cm of physical length for burying in the foundation)',
        variantNames: [
          'Intermediate Post 1.6 m', 'Corner Post 1.6 m', 'End Post 1.6 m',
          'Intermediate Post 2 m', 'Corner Post 2 m', 'End Post 2 m',
          'Intermediate Post 2.4 m', 'Corner Post 2.4 m', 'End Post 2.4 m',
        ],
      },
      { name: 'Accessories', variantNames: ['Post Insert', 'Fence Cap', 'Post Cap'] },
    ],
    technicalFeatures: [
      'Made entirely of concrete',
      'Finishes with naturally reproduced knots, worn edges, fissures and cracks',
      'Factory-impregnated with a protective coating',
      'Frost resistant — cracks open outward to allow for water expansion',
      'Posts with an extra 78 cm in length for burial/foundation',
    ],
    advantages: [
      'Natural wood look with concrete-grade durability, unmistakable (10 panel designs)',
      'Superior durability to natural wood',
      'No periodic maintenance required',
      'Modular system — 3 post heights and 3 positions (intermediate/corner/end)',
      'Over 100 possible combinations across the Petrified Wood range',
    ],
    usage: ['Property Fencing', 'Garden Edging', 'Sloped Terrain', 'Residential Areas'],
    faq: [
      { question: "Why is the post's physical length greater than the fence's height?", answer: 'In addition to its visible height (1.6 / 2 / 2.4 m), each post has an extra 78 cm section meant to be buried in the foundation for stability — for example, the "2.4 m" post has a total physical length of 318 cm.' },
      { question: 'How many fence panel designs are available?', answer: 'Fence panels are available in 10 different designs, each with an original combination of shades and black accents, making every fence unmistakable.' },
      { question: 'What types of posts are there and in what heights?', answer: 'The system has 3 post positions (intermediate, corner, end) available in 3 nominal heights (1.6 m, 2 m and 2.4 m) — 9 post variants in total.' },
      { question: 'What accessories complete the fence system?', answer: 'The system is completed with a post insert, fence cap and post cap, for an aesthetic finish and protection of the top edges.' },
    ],
  },
  'banci-si-mese': {
    name: 'Benches and Tables',
    title: 'Benches and Tables',
    shortDescription: 'Comfort and sturdiness from solid petrified wood',
    description:
      'The Woodstone benches and tables range is made of solid petrified wood, in two construction styles: plank benches, with a top set on solid legs, and beam benches, made from a single compact piece. Matching tables complete the setting, keeping the same natural, grain- and knot-filled texture characteristic of petrified wood.',
    heroFeatures: ['10 variants (3 plank benches + 4 beam benches + 3 tables)', 'Solid petrified wood', 'Frost and weather resistant'],
    variantGroups: [
      { name: 'Plank Benches', variantNames: ['Plank Bench 200', 'Plank Bench 150', 'Plank Bench 100'] },
      { name: 'Beam Benches', variantNames: ['Beam Bench 250', 'Beam Bench 150', 'Beam Bench 125', 'Beam Bench 100'] },
      { name: 'Tables', variantNames: ['Table 200', 'Table 150', 'Table 100'] },
    ],
    technicalFeatures: [
      'Solid petrified wood, industrially treated',
      'Finishes with a natural weathered-wood texture',
      'Resistant to frost and freeze-thaw cycles',
      'Factory-impregnated with a protective coating',
      'Stable construction, with no visible metal parts',
    ],
    advantages: [
      'Natural wood look, stone-like durability',
      'No periodic maintenance required',
      'Comfortable for extended outdoor use',
      'Matches Woodstone pavers and fences',
      'Available in matching bench and table sets',
    ],
    usage: ['Private Gardens', 'Terraces and Yards', 'Parks and Green Spaces', 'Relaxation Areas'],
    faq: [
      { question: 'What is the difference between plank benches and beam benches?', answer: 'Plank benches have a top set on separate solid legs, while beam benches are made from a single compact piece, sturdier and heavier.' },
      { question: 'How many bench and table variants are available?', answer: 'The range includes 10 variants: 3 plank benches, 4 beam benches and 3 tables, in lengths from 100 to 250 cm.' },
      { question: 'Are the tables matched with the benches?', answer: 'Yes. The tables keep the same natural petrified-wood texture and the same lengths (100, 150 and 200/250 cm), for a unified visual set.' },
      { question: 'Do they need periodic maintenance?', answer: 'No. The petrified wood is industrially treated and factory-impregnated with a protective coating, requiring no painting or further treatments.' },
    ],
  },
  'jardiniere-inaltate': {
    name: 'Raised Planters',
    title: 'Raised Planters',
    shortDescription: 'Elegance and function for your garden',
    description:
      'Raised planters from the Woodstone range are the perfect solution for gardens, terraces and balconies. With the natural look of petrified wood and the strength of concrete, these planters provide an ideal space for growing flowers, herbs and vegetables, adding extra greenery to any outdoor space. Extension sets allow you to expand existing planters, while the Kompakt range, new in 2026, offers a more compact format.',
    heroFeatures: ['10 variants (4 planters + 2 extension sets + 4 Kompakt)', 'Solid petrified wood', 'Frost and weather resistant'],
    variantGroups: [
      { name: 'Raised Planter', variantNames: ['Raised Planter 206×112×40', 'Raised Planter 206×112×80', 'Raised Planter 112×112×40', 'Raised Planter 112×112×80'] },
      { name: 'Extension Set', variantNames: ['Extension Set 40', 'Extension Set 80'] },
      { name: 'Raised Planter Kompakt', note: 'NEW 2026', variantNames: ['Raised Planter Kompakt 200×100×45', 'Raised Planter Kompakt 200×100×90', 'Raised Planter Kompakt 100×100×45', 'Raised Planter Kompakt 100×100×90'] },
    ],
    technicalFeatures: [
      'Made entirely of concrete',
      'Resistant to frost and weather',
      'Naturally textured surface',
      'Factory-impregnated with a protective coating',
      'High long-term durability',
    ],
    advantages: [
      'Natural wood look with concrete-grade durability',
      'No periodic maintenance required',
      'Ideal for growing plants',
      'Ergonomic working height',
      'Expandable with extension sets',
    ],
    usage: ['Gardens and Yards', 'Terraces and Balconies', 'Accent Areas', 'Vegetable Gardens'],
    faq: [
      { question: 'What is the Kompakt range and how is it different?', answer: 'Kompakt is a range new in 2026, with 4 variants in a more compact format (200×100 or 100×100 cm) compared to the standard planters, ideal for smaller spaces — terraces and balconies.' },
      { question: 'Can existing planters be extended?', answer: 'Yes. The extension sets (40 and 80 cm in height) let you enlarge an existing planter without buying a whole new unit.' },
      { question: 'How many planter variants are available?', answer: 'The range includes 10 variants: 4 standard raised planters, 2 extension sets and 4 Kompakt variants (new in 2026).' },
      { question: 'Is the height suited for effortless gardening?', answer: 'Yes. The available heights (40, 80 and 90 cm) are ergonomically designed to avoid bending over while tending to plants.' },
    ],
  },
  'elemente-lemn-pietrificat': {
    name: 'Other Elements',
    title: 'Other Elements',
    shortDescription: 'Decorative and functional pieces for complete landscaping',
    description:
      'The Woodstone Other Elements range completes outdoor landscaping with practical and decorative petrified-wood pieces: sturdy planter pots, pool edging for elegantly bordering pools, slabs and drainage channels for water runoff, and weather-resistant trash bins. All of them keep the authentic look of wood with the durability of concrete.',
    heroFeatures: ['9 variants (3 planter pots + 3 pool edges + 3 miscellaneous)', 'Solid petrified wood', 'Frost and weather resistant'],
    variantGroups: [
      { name: 'Planter Pots', variantNames: ['Planter Pot I', 'Planter Pot II', 'Planter Pot'] },
      { name: 'Pool Edges', variantNames: ['Straight Pool Edge (L-type)', 'Pool Edge Inner Corner', 'Pool Edge Outer Corner'] },
      { name: 'Miscellaneous Elements', variantNames: ['Slab', 'Drainage Channel', 'Trash Bin (galvanized insert)'] },
    ],
    technicalFeatures: [
      'Made entirely of concrete',
      'Resistant to frost and weather',
      'Authentic natural-texture surface',
      'Factory-impregnated with a protective coating',
      'High long-term durability',
    ],
    advantages: [
      'Natural wood look, stone-like durability',
      'No periodic maintenance required',
      'Functional pieces for complete landscaping',
      'Matches the rest of the Woodstone range',
      'Resistant to constant moisture (pool edges)',
    ],
    usage: ['Gardens and Yards', 'Pools and Recreation Areas', 'Public Spaces', 'Complete Landscaping'],
    faq: [
      { question: 'What products does the Other Elements range include?', answer: 'The range includes 9 variants: 3 planter pot designs, 3 types of pool edges (straight, inner corner, outer corner) and 3 miscellaneous elements — slab, drainage channel and trash bin with galvanized insert.' },
      { question: 'Do the pool edges resist constant moisture?', answer: 'Yes. They are made of concrete impregnated with a protective coating, resistant to continuous contact with water and to the freeze-thaw cycles typical of pool areas.' },
      { question: 'What is the drainage channel in the range used for?', answer: 'The drainage channel (80×24×8 cm) is designed for water runoff, completing Woodstone paving projects in areas where surface drainage is needed.' },
      { question: 'Do these elements match the rest of the Woodstone range?', answer: 'Yes. All pieces keep the same petrified-wood texture as Woodstone pavers, palisades and fences, for a unified overall look.' },
    ],
  },
}
