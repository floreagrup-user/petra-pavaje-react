import type { Product } from '@/data/types'
import { getThicknessValues } from '@/lib/product-filters'

/** "6 cm" or "4-8 cm" from a product's formats. */
export function thicknessRange(product: Product): string {
  const values = getThicknessValues(product).map(Number).sort((a, b) => a - b)
  if (!values.length) return ''
  return values.length === 1 ? `${values[0]} cm` : `${values[0]}-${values[values.length - 1]} cm`
}
