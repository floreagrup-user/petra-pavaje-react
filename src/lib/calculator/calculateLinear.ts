import type { CalculatorVariant, LinearCalculationResult } from './types'

/**
 * Linear-element calculation (borduri, palisadă, garduri): meters ->
 * pieces -> pallets -> commercial length. Mirrors calculatePavingRequirement
 * but keyed on linear meters instead of m².
 */
export function calculateLinearRequirement(
  lengthMl: number,
  variant: Pick<CalculatorVariant, 'piecesPerMl' | 'piecesPerPallet' | 'kgPerPallet' | 'unitPerPallet'>
): LinearCalculationResult {
  const totalLength = Math.max(0, lengthMl)

  const canCalculatePieces = typeof variant.piecesPerMl === 'number' && variant.piecesPerMl > 0
  const canCalculatePallets = typeof variant.unitPerPallet === 'number' && variant.unitPerPallet > 0

  const estimatedPieces = canCalculatePieces ? Math.ceil(totalLength * variant.piecesPerMl!) : null
  const pallets = canCalculatePallets ? Math.ceil(totalLength / variant.unitPerPallet!) : null

  const commercialLength = pallets !== null ? round2(pallets * variant.unitPerPallet!) : null
  const commercialPieces =
    pallets !== null && typeof variant.piecesPerPallet === 'number' ? pallets * variant.piecesPerPallet : null
  const surplusLength = commercialLength !== null ? round2(commercialLength - totalLength) : null
  const totalWeightKg = pallets !== null && typeof variant.kgPerPallet === 'number' ? pallets * variant.kgPerPallet : null

  return {
    totalLength: round2(totalLength),
    estimatedPieces,
    pallets,
    commercialLength,
    commercialPieces,
    surplusLength,
    totalWeightKg,
    canCalculatePieces,
    canCalculatePallets,
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}
