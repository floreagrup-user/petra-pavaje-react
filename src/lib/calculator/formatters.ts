// ro-RO display formatting for calculator numbers. Kept separate from the
// calculation engine so the pure math never has to think about locale.

const numberFormatter = new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 2 })
const integerFormatter = new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 0 })

export function formatNumber(n: number): string {
  return numberFormatter.format(n)
}

export function formatInteger(n: number): string {
  return integerFormatter.format(Math.round(n))
}

export function formatArea(n: number): string {
  return `${formatNumber(n)} m²`
}

export function formatLength(n: number): string {
  return `${formatNumber(n)} ml`
}

export function formatPieces(n: number): string {
  return `${formatInteger(n)} buc.`
}

export function formatPallets(n: number): string {
  return n === 1 ? '1 palet' : `${formatInteger(n)} paleți`
}

export function formatWeight(kg: number): string {
  if (kg >= 1000) return `${formatNumber(kg / 1000)} t`
  return `${formatInteger(kg)} kg`
}
