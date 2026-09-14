// Calculation-engine types for the paving calculator. Deliberately free of
// React and free of the raw product-data shapes (ProductDimension /
// ElementVariant / WoodstoneVariant) -- see src/data/calculator/catalog.ts
// for the adapter that normalizes those into CalculatorVariant.

/** How a variant's real-world quantity is sold, driving which formula applies. */
export type SaleMode = 'area' | 'area-mix' | 'linear' | 'piece'

/** One purchasable format/variant of a product, normalized from whichever
 * source file it came from (products.ts, elements.ts, woodstone.ts). */
export interface CalculatorVariant {
  id: string
  label: string
  dimensions: string
  saleMode: SaleMode
  code?: string
  /** Pieces per m² -- only meaningful when saleMode is 'area'. */
  piecesPerM2?: number
  /** Pieces per linear meter -- only meaningful when saleMode is 'linear'. */
  piecesPerMl?: number
  piecesPerPallet?: number
  kgPerPallet?: number
  /** m² per pallet ('area'/'area-mix') or ml per pallet ('linear'). */
  unitPerPallet?: number
  palletsPerTruck?: number
  /** True when this variant is missing data needed for full pallet math. */
  hasFullData: boolean
}

export interface CalculatorProduct {
  id: string
  name: string
  slug: string
  categoryGroup: CalculatorCategoryGroup
  categoryLabel: string
  url: string
  image: string
  colors: string[]
  shortDescription: string
  variants: CalculatorVariant[]
}

export type CalculatorCategoryGroup =
  | 'premium'
  | 'standard'
  | 'woodstone'
  | 'borduri'
  | 'garduri'
  | 'palisada'
  | 'treapta'
  | 'bloc-de-zid'
  | 'jardiniere'

export interface WasteOption {
  value: number
  label: string
}

export const WASTE_OPTIONS: WasteOption[] = [
  { value: 0, label: '0%' },
  { value: 3, label: '3%' },
  { value: 5, label: '5% (recomandat)' },
  { value: 7, label: '7%' },
  { value: 10, label: '10%' },
]

export const DEFAULT_WASTE_PERCENT = 5

export interface AreaCalculationResult {
  baseArea: number
  wasteArea: number
  totalArea: number
  estimatedPieces: number | null
  pallets: number | null
  commercialArea: number | null
  commercialPieces: number | null
  surplusArea: number | null
  totalWeightKg: number | null
  canCalculatePieces: boolean
  canCalculatePallets: boolean
}

export interface LinearCalculationResult {
  totalLength: number
  estimatedPieces: number | null
  pallets: number | null
  commercialLength: number | null
  commercialPieces: number | null
  surplusLength: number | null
  totalWeightKg: number | null
  canCalculatePieces: boolean
  canCalculatePallets: boolean
}

export type AreaShape = 'dreptunghi' | 'patrat' | 'triunghi' | 'cerc' | 'semicerc' | 'manual'

export interface ProjectZone {
  id: string
  label: string
  purpose?: string
  shape: AreaShape
  /** Raw inputs, in meters (or the manual m² value for shape 'manual'). */
  inputs: Record<string, number>
  areaM2: number
}
