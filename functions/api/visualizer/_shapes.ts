// Short description of each product's stone shape and laying look, written
// from the product photos. The image model reads it next to the reference
// photo: without it, unusual shapes (Unda waves, Autobloc, Con) were drawn as
// plain rectangles. Server-only; never shown to visitors.

const SHAPES: Record<string, string> = {
  roca: 'rectangular and square concrete pavers and slabs in several sizes (from 20x10 up to 60x30 cm), stone-like multi-tone surface, laid in straight running bond or as a mix of sizes',
  antic: 'small square and rectangular pavers (10x10, 20x10 and 20x20 cm) with tumbled, slightly rounded aged edges, an old cobblestone look, laid in rows',
  primo: 'small rectangular pavers (20x10 cm) with bevelled edges and a smooth surface, laid in herringbone or running bond',
  'grand-urban': 'large rectangular concrete slabs (100x50 and 80x40 cm) with thin joints, laid in a straight stretcher bond',
  gemina: 'small cobble-like pavers (12x9, 12x12 and 18x12 cm) with rounded tumbled edges, laid in rows, arcs or circles',
  cubic: 'small cobblestone-like pavers about 16 cm wide with a rough split-stone top, laid in tight rows',
  mistic: 'large square and rectangular slabs (from 30x20 up to 40x40 and 60x30 cm) with a multi-tone stone-like surface, laid as a random mix of sizes',
  mediterana: 'rectangular and square pavers in several sizes (from 20x10 up to 60x30 cm) with a warm multi-tone surface, laid as a random mix of sizes',
  viena: 'rectangular slabs (60x30 cm) and mixes of rectangular and square sizes with a multi-tone surface, laid in running bond or as a random mix',
  maya: 'rectangular slabs (60x30 cm) and mixes of rectangular and square sizes with a multi-tone surface, laid in running bond or as a random mix',
  roman: 'large rectangular slabs (60x30 cm) with a multi-tone surface, laid in running bond',
  sahara: 'rectangular slabs (30x20 and 60x30 cm) and mixes of sizes with a sand-like multi-tone surface, laid in running bond or as a random mix',
  alpin: 'rectangular slabs (60x30 and 30x20 cm) with a subtle 3D relief surface, laid in running bond',
  pastel: 'rectangular and square pavers in mixed sizes laid as a random mix, each stone in a slightly different shade of the chosen colour range',
  timber: 'long rectangular planks (60x30 cm) with a wood-grain surface, looking like wooden decking, laid in staggered rows',
  terranova: 'rectangular and square pavers in a mix of sizes with a multi-tone surface, laid as a random mix',
  dacic: 'rectangular and square pavers in a mix of sizes with a multi-tone surface, laid as a random mix',
  relief: 'rectangular and square pavers (from 20x10 up to 40x40 cm) with a textured anti-slip relief surface, laid in herringbone or rows',
  stretto: 'narrow elongated pavers (24x6 cm, like parquet strips), laid in long staggered rows',
  holland: 'rectangular pavers (20x10 cm) with a smooth flat surface, laid in herringbone or running bond',
  autobloc: 'interlocking double-T (bone-shaped) pavers (20x16.5 cm), laid in straight rows',
  unda: 'interlocking wavy-edged S-shaped pavers (22.5x11.2 cm), laid in straight rows so the wavy joints run across the surface',
  con: 'tapered fan-shaped pavers (10 cm wide narrowing to 5 cm, 9.7 cm long), laid in overlapping arcs that look like fish scales',
  'pavaje-eco': 'open concrete grass-grid blocks (60x40 and 40x40 cm) whose openings are filled with grass or gravel',
}

export function productShape(slug: string, formats: string): string {
  if (SHAPES[slug]) return SHAPES[slug]
  if (slug.startsWith('quatro-')) return `square concrete pavers (${formats}) with a smooth surface, laid in a straight grid or in offset rows`
  return `concrete pavers in these formats: ${formats}`
}
