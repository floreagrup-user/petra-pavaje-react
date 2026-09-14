import type { AreaCalculationResult, CalculatorVariant } from './types'

/**
 * Core area-based calculation: total need with waste, rounded up to whole
 * pallets, plus the resulting commercial (purchasable) quantity.
 *
 * Deliberately tolerant of missing variant data (MIX products have no
 * per-piece count; some variants are missing pallet data entirely) --
 * per spec, the calculator must keep computing whatever it can rather
 * than fail outright. `canCalculatePieces` / `canCalculatePallets` tell
 * the UI which numbers are safe to render.
 */
export function calculatePavingRequirement(
  areaM2: number,
  wastePercent: number,
  variant: Pick<CalculatorVariant, 'piecesPerM2' | 'piecesPerPallet' | 'kgPerPallet' | 'unitPerPallet' | 'saleMode'>
): AreaCalculationResult {
  const baseArea = Math.max(0, areaM2)
  const waste = Math.min(100, Math.max(0, wastePercent))
  const wasteArea = baseArea * (waste / 100)
  const totalArea = baseArea + wasteArea

  const canCalculatePieces = variant.saleMode === 'area' && typeof variant.piecesPerM2 === 'number' && variant.piecesPerM2 > 0
  const canCalculatePallets = typeof variant.unitPerPallet === 'number' && variant.unitPerPallet > 0

  const estimatedPieces = canCalculatePieces ? Math.ceil(totalArea * variant.piecesPerM2!) : null

  const pallets = canCalculatePallets ? Math.ceil(totalArea / variant.unitPerPallet!) : null

  const commercialArea = pallets !== null ? round2(pallets * variant.unitPerPallet!) : null
  const commercialPieces =
    pallets !== null && typeof variant.piecesPerPallet === 'number' ? pallets * variant.piecesPerPallet : null
  const surplusArea = commercialArea !== null ? round2(commercialArea - totalArea) : null
  const totalWeightKg = pallets !== null && typeof variant.kgPerPallet === 'number' ? pallets * variant.kgPerPallet : null

  return {
    baseArea: round2(baseArea),
    wasteArea: round2(wasteArea),
    totalArea: round2(totalArea),
    estimatedPieces,
    pallets,
    commercialArea,
    commercialPieces,
    surplusArea,
    totalWeightKg,
    canCalculatePieces,
    canCalculatePallets,
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}
