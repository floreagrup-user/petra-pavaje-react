import { PackageCheck, TriangleAlert } from 'lucide-react'
import { formatArea, formatInteger, formatLength, formatPallets, formatPieces } from '@/lib/calculator/formatters'
import type { AreaCalculationResult, LinearCalculationResult } from '@/lib/calculator/types'

interface AreaResultCardProps {
  kind: 'area'
  result: AreaCalculationResult
  wastePercent: number
}
interface LinearResultCardProps {
  kind: 'linear'
  result: LinearCalculationResult
}

type ResultCardProps = (AreaResultCardProps | LinearResultCardProps) & { title: string; subtitle?: string }

export function ResultCard(props: ResultCardProps) {
  const { title, subtitle } = props
  const primaryValue = props.kind === 'area' ? formatArea(props.result.totalArea) : formatLength(props.result.totalLength)
  const pallets = props.result.pallets
  const commercialValue =
    props.kind === 'area'
      ? props.result.commercialArea !== null
        ? formatArea(props.result.commercialArea)
        : null
      : props.result.commercialLength !== null
        ? formatLength(props.result.commercialLength)
        : null
  const surplus = props.kind === 'area' ? props.result.surplusArea : props.result.surplusLength

  return (
    <div className="rounded-2xl bg-charcoal-950 text-white p-6 md:p-7">
      <p className="text-xs font-medium uppercase tracking-widest text-brand-400 mb-1">{title}</p>
      {subtitle && <p className="text-sm text-charcoal-400 mb-4">{subtitle}</p>}

      <div className="mb-5">
        <p className="text-xs text-charcoal-400 mb-1">
          {props.kind === 'area' ? `Necesar (cu ${props.wastePercent}% pierderi)` : 'Lungime totală'}
        </p>
        <p className="text-4xl font-bold tabular-nums">{primaryValue}</p>
      </div>

      {props.result.canCalculatePallets && pallets !== null ? (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl bg-white/5 p-3.5">
            <p className="text-xs text-charcoal-400 mb-1">Recomandare comandă</p>
            <p className="text-xl font-bold text-brand-400">{formatPallets(pallets)}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3.5">
            <p className="text-xs text-charcoal-400 mb-1">Cantitate livrată</p>
            <p className="text-xl font-bold">{commercialValue}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2 rounded-xl bg-amber-950/40 border border-amber-800/50 p-3.5 mb-4 text-amber-200 text-sm">
          <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <span>Numărul de paleți nu poate fi calculat automat pentru acest format -- datele de paletizare lipsesc.</span>
        </div>
      )}

      {props.result.canCalculatePieces && props.result.estimatedPieces !== null ? (
        <div className="flex items-center justify-between py-2.5 border-t border-white/10 text-sm">
          <span className="text-charcoal-400">Bucăți necesare</span>
          <span className="font-semibold">
            {formatPieces(props.result.estimatedPieces)}
            {props.result.commercialPieces !== null && ` (${formatInteger(props.result.commercialPieces)} comandate)`}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 py-2.5 border-t border-white/10 text-sm text-charcoal-400">
          <PackageCheck className="w-4 h-4 shrink-0" />
          <span>Produs comercializat la {props.kind === 'area' ? 'm²' : 'ml'} -- fără preț per bucată.</span>
        </div>
      )}

      {surplus !== null && surplus > 0 && (
        <div className="flex items-center justify-between py-2.5 border-t border-white/10 text-sm">
          <span className="text-charcoal-400">Rezervă din rotunjire</span>
          <span className="font-medium">{props.kind === 'area' ? formatArea(surplus) : formatLength(surplus)}</span>
        </div>
      )}
    </div>
  )
}
