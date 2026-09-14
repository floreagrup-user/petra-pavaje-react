// Adapter layer for the paving calculator: normalizes the site's existing
// product data (products.ts, elements.ts, woodstone.ts -- each with its own
// shape and its own field-reuse quirks, e.g. "piecesPerMp" doubling as
// "pieces per linear meter" on borduri rows) into one CalculatorProduct[]
// shape the calculator UI can consume uniformly.
//
// This is NOT a second catalog: every number here is read directly from the
// existing source files at module-load time. Editing a product's real data
// automatically updates the calculator -- nothing is duplicated or
// hand-entered.
import { products } from '@/data/products'
import { categories } from '@/data/site'
import { elementCategories } from '@/data/elements'
import { woodstoneCategories } from '@/data/woodstone'
import { categoryUrl, productUrl } from '@/lib/product-urls'
import type { CalculatorCategoryGroup, CalculatorProduct, CalculatorVariant, SaleMode } from '@/lib/calculator/types'

const MIX_PATTERN = /mix/i

export const CATEGORY_GROUP_LABELS: Record<CalculatorCategoryGroup, string> = {
  premium: 'Pavaj Premium',
  standard: 'Pavaj Standard',
  woodstone: 'Woodstone – Lemn Pietrificat',
  borduri: 'Borduri',
  garduri: 'Garduri',
  palisada: 'Palisadă',
  treapta: 'Scări (Treaptă)',
  'bloc-de-zid': 'Bloc de zid',
  jardiniere: 'Jardiniere',
}

function num(v: unknown): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) ? v : undefined
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

// --- Pavaj Premium / Standard / Borduri (src/data/products.ts) -----------

function buildFromProducts(): CalculatorProduct[] {
  const result: CalculatorProduct[] = []

  for (const p of products) {
    if (!p.dimensionsList?.length) continue

    const categoryMeta = categories.find((c) => c.id === p.category)
    const categorySlug = categoryMeta?.slug || p.category
    const group: CalculatorCategoryGroup = p.category === 'borduri' ? 'borduri' : p.category === 'standard' ? 'standard' : 'premium'
    const isLinear = group === 'borduri'

    const variants: CalculatorVariant[] = p.dimensionsList.map((d, idx) => {
      const isMix = MIX_PATTERN.test(d.label) || MIX_PATTERN.test(d.size)
      const saleMode: SaleMode = isLinear ? 'linear' : isMix ? 'area-mix' : 'area'

      const piecesPerM2 = saleMode === 'area' ? num(d.piecesPerMp) : undefined
      const piecesPerMl = saleMode === 'linear' ? num(d.piecesPerMp) : undefined
      const unitPerPallet = num(d.mpPerPallet)
      const piecesPerPallet = num(d.piecesPerPallet)
      const kgPerPallet = num(d.kgPerPallet)

      const hasFullData =
        saleMode === 'linear'
          ? piecesPerMl !== undefined && unitPerPallet !== undefined && piecesPerPallet !== undefined && kgPerPallet !== undefined
          : saleMode === 'area-mix'
            ? unitPerPallet !== undefined && piecesPerPallet !== undefined && kgPerPallet !== undefined
            : piecesPerM2 !== undefined && unitPerPallet !== undefined && piecesPerPallet !== undefined && kgPerPallet !== undefined

      // Most products store a 2D size ("20×10") plus a separate thickness
      // ("6 cm"). Borduri store the full 3D size already ("50×5×20"), so
      // appending thickness there would repeat the middle dimension.
      const alreadyFullDimensions = (d.size.match(/×/g) || []).length >= 2
      const dimensions = !alreadyFullDimensions && d.thickness ? `${d.size} × ${d.thickness}` : d.size

      return {
        id: `${p.slug}__${idx}`,
        label: d.label,
        dimensions,
        saleMode,
        piecesPerM2,
        piecesPerMl,
        piecesPerPallet,
        kgPerPallet,
        unitPerPallet,
        hasFullData,
      }
    })

    result.push({
      id: p.id,
      name: p.name,
      slug: p.slug,
      categoryGroup: group,
      categoryLabel: categoryMeta?.name || CATEGORY_GROUP_LABELS[group],
      url: productUrl(categorySlug, p.slug),
      image: p.image,
      colors: p.colors.map((c) => c.name),
      shortDescription: p.shortDescription,
      variants,
    })
  }

  return result
}

// --- Garduri / Palisadă / Scări / Bloc de zid / Jardiniere (elements.ts) -
//
// Rigole, Boltari and Elemente de canalizare exist in elements.ts too but
// are infrastructure/masonry items outside this calculator's "how much
// paving/edging do I need" scope -- not wired in here. (Flagged in the
// implementation report, not silently dropped.)

const ELEMENT_GROUPS: Partial<Record<string, CalculatorCategoryGroup>> = {
  garduri: 'garduri',
  palisada: 'palisada',
  treapta: 'treapta',
  'bloc-de-zid': 'bloc-de-zid',
  jardiniere: 'jardiniere',
}

function buildFromElements(): CalculatorProduct[] {
  const result: CalculatorProduct[] = []

  for (const el of elementCategories) {
    const topSlug = el.parent?.slug || el.slug
    const group = ELEMENT_GROUPS[topSlug]
    if (!group) continue

    const variants: CalculatorVariant[] = []
    for (const g of el.variantGroups) {
      for (const v of g.variants) {
        const piecesPerMl = num(v.piecesPerMl)
        const unitPerPallet = num(v.mlPerPallet)
        const piecesPerPallet = num(v.piecesPerPallet)
        const kgPerPallet = num(v.weightKg)
        const saleMode: SaleMode = piecesPerMl !== undefined ? 'linear' : 'piece'
        const hasFullData =
          piecesPerMl !== undefined && unitPerPallet !== undefined && piecesPerPallet !== undefined && kgPerPallet !== undefined

        variants.push({
          id: `${el.slug}__${v.code}__${v.name}`,
          label: v.name,
          dimensions: v.dimensions,
          saleMode,
          code: v.code !== '—' ? v.code : undefined,
          piecesPerMl,
          piecesPerPallet,
          kgPerPallet,
          unitPerPallet,
          hasFullData,
        })
      }
    }

    result.push({
      id: el.slug,
      name: el.name,
      slug: el.slug,
      categoryGroup: group,
      categoryLabel: el.parent?.name || CATEGORY_GROUP_LABELS[group],
      url: el.parent ? `${categoryUrl(topSlug)}/${el.slug}` : categoryUrl(el.slug),
      image: el.image,
      colors: el.colors.map((c) => c.name),
      shortDescription: el.shortDescription,
      variants,
    })
  }

  return result
}

// --- Woodstone (src/data/woodstone.ts) ------------------------------------
//
// Not present in the 2026 nomenclature at all (it's a separate product
// line), so this leans entirely on woodstone.ts's own piecesPerMp/weightKg/
// "palletizing" ("<pieces>/<kg>") fields -- the only source available.

function parsePalletizing(raw: string | undefined): { pieces: number; kg: number } | undefined {
  if (!raw) return undefined
  const match = /^(\d+(?:[.,]\d+)?)\s*\/\s*(\d+(?:[.,]\d+)?)$/.exec(raw.trim())
  if (!match) return undefined
  return { pieces: Number(match[1].replace(',', '.')), kg: Number(match[2].replace(',', '.')) }
}

function buildFromWoodstone(): CalculatorProduct[] {
  const result: CalculatorProduct[] = []

  for (const cat of woodstoneCategories) {
    const variants: CalculatorVariant[] = []
    for (const g of cat.variantGroups) {
      for (const v of g.variants) {
        const piecesPerM2 = num(v.piecesPerMp)
        const kgPerPallet = num(v.weightKg)
        const parsed = parsePalletizing(v.palletizing)
        const piecesPerPallet = parsed?.pieces
        const unitPerPallet = piecesPerM2 && piecesPerPallet ? round2(piecesPerPallet / piecesPerM2) : undefined
        const hasFullData =
          piecesPerM2 !== undefined && unitPerPallet !== undefined && piecesPerPallet !== undefined && kgPerPallet !== undefined

        variants.push({
          id: `${cat.slug}__${v.code}`,
          label: v.name,
          dimensions: v.dimensions,
          saleMode: 'area',
          code: v.code,
          piecesPerM2,
          piecesPerPallet,
          kgPerPallet,
          unitPerPallet,
          hasFullData,
        })
      }
    }

    result.push({
      id: cat.slug,
      name: cat.title,
      slug: cat.slug,
      categoryGroup: 'woodstone',
      categoryLabel: CATEGORY_GROUP_LABELS.woodstone,
      url: `/woodstone-lemn-pietrificat/${cat.slug}`,
      image: cat.image,
      colors: [],
      shortDescription: cat.shortDescription,
      variants,
    })
  }

  return result
}

export const calculatorCatalog: CalculatorProduct[] = [
  ...buildFromProducts(),
  ...buildFromElements(),
  ...buildFromWoodstone(),
]

export function getCalculatorProductBySlug(slug: string): CalculatorProduct | undefined {
  return calculatorCatalog.find((p) => p.slug === slug)
}

export function getCalculatorProductsByGroup(group: CalculatorCategoryGroup): CalculatorProduct[] {
  return calculatorCatalog.filter((p) => p.categoryGroup === group)
}
