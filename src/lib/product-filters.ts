import type { Product } from '@/data/types'
import { slugify } from './utils'

export type SortKey = 'recomandate' | 'nume-asc' | 'nume-desc' | 'grosime-asc' | 'grosime-desc'

export interface PremiumFilters {
  culoare: string[]
  grosime: string[]
  utilizare: string[]
  mix: boolean
  caracteristici: string[]
  finisaj: string[]
}

export const EMPTY_FILTERS: PremiumFilters = {
  culoare: [],
  grosime: [],
  utilizare: [],
  mix: false,
  caracteristici: [],
  finisaj: [],
}

interface UsageBucket {
  slug: string
  label: string
  match: (raw: string) => boolean
}

const USAGE_BUCKETS: UsageBucket[] = [
  { slug: 'terase', label: 'Terase', match: (r) => /terase/i.test(r) },
  { slug: 'alei', label: 'Alei', match: (r) => /alei|poteci/i.test(r) },
  { slug: 'gradini-curti', label: 'Grădini & Curți', match: (r) => /gr[aă]din|curț/i.test(r) },
  { slug: 'parcuri-spatii-publice', label: 'Parcuri & Spații Publice', match: (r) => /parcuri|spații publice|piețe/i.test(r) },
  { slug: 'zone-rezidentiale-comerciale', label: 'Zone Rezidențiale & Comerciale', match: (r) => /rezident|comercial/i.test(r) },
  { slug: 'zone-piscina', label: 'Zone Piscină', match: (r) => /piscin/i.test(r) },
]

interface TagRule {
  slug: string
  label: string
  test: (features: string[]) => boolean
}

const FEATURE_TAGS: TagRule[] = [
  {
    slug: 'rezistenta-inghet',
    label: 'Rezistență la îngheț',
    test: (features) => features.some((f) => /rezisten[țt]ă la îngheț/i.test(f)),
  },
  {
    slug: 'color-lock',
    label: 'Color Lock',
    test: (features) => features.some((f) => /color lock/i.test(f) && !/fără tratament/i.test(f)),
  },
  {
    slug: 'colturi-rotunjite',
    label: 'Colțuri rotunjite',
    test: (features) => features.some((f) => /colțuri rotunjite/i.test(f)),
  },
]

const FINISH_TAGS: TagRule[] = [
  { slug: 'antichizata', label: 'Suprafață antichizată', test: (features) => features.some((f) => /antichizat/i.test(f)) },
  { slug: 'structurata', label: 'Suprafață structurată', test: (features) => features.some((f) => /structurat/i.test(f)) },
  { slug: 'antiderapanta', label: 'Suprafață antiderapantă', test: (features) => features.some((f) => /antiderapant/i.test(f)) },
]

export function getUsageBuckets(product: Product): string[] {
  const slugs = new Set<string>()
  for (const raw of product.usage || []) {
    for (const bucket of USAGE_BUCKETS) {
      if (bucket.match(raw)) slugs.add(bucket.slug)
    }
  }
  return [...slugs]
}

export function getFeatureTags(product: Product): string[] {
  const features = product.technicalFeatures || []
  return FEATURE_TAGS.filter((tag) => tag.test(features)).map((tag) => tag.slug)
}

export function getFinishTags(product: Product): string[] {
  const features = product.technicalFeatures || []
  return FINISH_TAGS.filter((tag) => tag.test(features)).map((tag) => tag.slug)
}

export function getThicknessValues(product: Product): string[] {
  const set = new Set<string>()
  for (const dim of product.dimensionsList || []) {
    const match = dim.thickness.match(/\d+/)
    if (match) set.add(match[0])
  }
  return [...set]
}

export function getColorSlugs(product: Product): string[] {
  return product.colors.map((c) => slugify(c.name))
}

export interface FacetOption {
  slug: string
  label: string
  count: number
}

export interface PremiumFacets {
  colors: (FacetOption & { hex: string })[]
  thicknesses: FacetOption[]
  usage: FacetOption[]
  features: FacetOption[]
  finishes: FacetOption[]
  mixCount: number
}

export function buildPremiumFacets(products: Product[]): PremiumFacets {
  const colorMap = new Map<string, { label: string; hex: string; count: number }>()
  const thicknessMap = new Map<string, number>()
  const usageMap = new Map<string, number>()
  const featureMap = new Map<string, number>()
  const finishMap = new Map<string, number>()
  let mixCount = 0

  for (const product of products) {
    for (const color of product.colors) {
      const slug = slugify(color.name)
      const entry = colorMap.get(slug)
      if (entry) entry.count += 1
      else colorMap.set(slug, { label: color.name, hex: color.hex, count: 1 })
    }
    for (const thickness of getThicknessValues(product)) {
      thicknessMap.set(thickness, (thicknessMap.get(thickness) || 0) + 1)
    }
    for (const bucketSlug of getUsageBuckets(product)) {
      usageMap.set(bucketSlug, (usageMap.get(bucketSlug) || 0) + 1)
    }
    for (const featureSlug of getFeatureTags(product)) {
      featureMap.set(featureSlug, (featureMap.get(featureSlug) || 0) + 1)
    }
    for (const finishSlug of getFinishTags(product)) {
      finishMap.set(finishSlug, (finishMap.get(finishSlug) || 0) + 1)
    }
    if (product.mixModes && product.mixModes.length > 0) mixCount += 1
  }

  return {
    colors: [...colorMap.entries()]
      .map(([slug, v]) => ({ slug, label: v.label, hex: v.hex, count: v.count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'ro')),
    thicknesses: [...thicknessMap.entries()]
      .map(([slug, count]) => ({ slug, label: `${slug} cm`, count }))
      .sort((a, b) => Number(a.slug) - Number(b.slug)),
    usage: USAGE_BUCKETS.filter((b) => usageMap.has(b.slug)).map((b) => ({ slug: b.slug, label: b.label, count: usageMap.get(b.slug)! })),
    features: FEATURE_TAGS.filter((t) => featureMap.has(t.slug)).map((t) => ({ slug: t.slug, label: t.label, count: featureMap.get(t.slug)! })),
    finishes: FINISH_TAGS.filter((t) => finishMap.has(t.slug)).map((t) => ({ slug: t.slug, label: t.label, count: finishMap.get(t.slug)! })),
    mixCount,
  }
}

export function matchesFilters(product: Product, filters: PremiumFilters): boolean {
  if (filters.culoare.length && !getColorSlugs(product).some((s) => filters.culoare.includes(s))) return false
  if (filters.grosime.length && !getThicknessValues(product).some((t) => filters.grosime.includes(t))) return false
  if (filters.utilizare.length && !getUsageBuckets(product).some((u) => filters.utilizare.includes(u))) return false
  if (filters.mix && !(product.mixModes && product.mixModes.length > 0)) return false
  if (filters.caracteristici.length) {
    const tags = getFeatureTags(product)
    if (!filters.caracteristici.every((c) => tags.includes(c))) return false
  }
  if (filters.finisaj.length) {
    const tags = getFinishTags(product)
    if (!filters.finisaj.every((f) => tags.includes(f))) return false
  }
  return true
}

function minThickness(product: Product): number {
  const values = getThicknessValues(product).map(Number)
  return values.length ? Math.min(...values) : 0
}

const VALID_SORT_KEYS: SortKey[] = ['recomandate', 'nume-asc', 'nume-desc', 'grosime-asc', 'grosime-desc']

export function parseFiltersFromSearchParams(params: URLSearchParams): PremiumFilters {
  const list = (key: string) => (params.get(key) || '').split(',').filter(Boolean)
  return {
    culoare: list('culoare'),
    grosime: list('grosime'),
    utilizare: list('utilizare'),
    mix: params.get('mix') === '1',
    caracteristici: list('caracteristici'),
    finisaj: list('finisaj'),
  }
}

export function parseSortFromSearchParams(params: URLSearchParams): SortKey {
  const value = params.get('sortare')
  return (VALID_SORT_KEYS as string[]).includes(value || '') ? (value as SortKey) : 'recomandate'
}

export function filtersToSearchParams(filters: PremiumFilters, sort: SortKey): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.culoare.length) params.set('culoare', filters.culoare.join(','))
  if (filters.grosime.length) params.set('grosime', filters.grosime.join(','))
  if (filters.utilizare.length) params.set('utilizare', filters.utilizare.join(','))
  if (filters.mix) params.set('mix', '1')
  if (filters.caracteristici.length) params.set('caracteristici', filters.caracteristici.join(','))
  if (filters.finisaj.length) params.set('finisaj', filters.finisaj.join(','))
  if (sort !== 'recomandate') params.set('sortare', sort)
  return params
}

export function hasAnyFilters(filters: PremiumFilters): boolean {
  return (
    filters.culoare.length > 0 ||
    filters.grosime.length > 0 ||
    filters.utilizare.length > 0 ||
    filters.mix ||
    filters.caracteristici.length > 0 ||
    filters.finisaj.length > 0
  )
}

export function sortProducts(products: Product[], sortKey: SortKey): Product[] {
  const list = [...products]
  switch (sortKey) {
    case 'nume-asc':
      return list.sort((a, b) => a.name.localeCompare(b.name, 'ro'))
    case 'nume-desc':
      return list.sort((a, b) => b.name.localeCompare(a.name, 'ro'))
    case 'grosime-asc':
      return list.sort((a, b) => minThickness(a) - minThickness(b))
    case 'grosime-desc':
      return list.sort((a, b) => minThickness(b) - minThickness(a))
    case 'recomandate':
    default:
      return list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  }
}
