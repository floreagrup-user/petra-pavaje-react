import { formatArea, formatInteger, formatPallets, formatPieces } from '@/lib/calculator/formatters'
import type { AreaCalculationResult, CalculatorProduct, CalculatorVariant, ProjectZone } from '@/lib/calculator/types'

interface PrintSummaryProps {
  product: CalculatorProduct
  variant: CalculatorVariant
  zones: ProjectZone[]
  wastePercent: number
  result: AreaCalculationResult
}

/** Hidden on screen (`print:block`), shown only when window.print() runs --
 * see section 20: "print-friendly layout" as the PDF-export fallback. */
export function PrintSummary({ product, variant, zones, wastePercent, result }: PrintSummaryProps) {
  const today = new Intl.DateTimeFormat('ro-RO', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date())

  return (
    <div className="print-summary hidden fixed inset-0 bg-white text-charcoal-900 p-10">
      <div className="flex items-center justify-between border-b border-charcoal-300 pb-4 mb-6">
        <div>
          <p className="text-xl font-bold">Petra Pavaje</p>
          <p className="text-sm text-charcoal-500">Estimare necesar de pavaj</p>
        </div>
        <p className="text-sm text-charcoal-500">{today}</p>
      </div>

      <h1 className="text-lg font-bold mb-1">
        {product.name} — {variant.label}
      </h1>
      <p className="text-sm text-charcoal-600 mb-6">
        {product.categoryLabel}
        {variant.code ? ` · Cod produs: ${variant.code}` : ''}
        {variant.dimensions ? ` · ${variant.dimensions}` : ''}
      </p>

      <table className="w-full text-sm mb-6 border-collapse">
        <tbody>
          {zones.map((z, i) => (
            <tr key={z.id} className="border-b border-charcoal-200">
              <td className="py-2 text-charcoal-500">{z.label || `Zona ${i + 1}`}</td>
              <td className="py-2 text-right font-medium">{formatArea(z.areaM2)}</td>
            </tr>
          ))}
          <tr className="border-b border-charcoal-200">
            <td className="py-2 text-charcoal-500">Suprafață totală</td>
            <td className="py-2 text-right font-medium">{formatArea(result.baseArea)}</td>
          </tr>
          <tr className="border-b border-charcoal-200">
            <td className="py-2 text-charcoal-500">Pierderi ({wastePercent}%)</td>
            <td className="py-2 text-right font-medium">{formatArea(result.wasteArea)}</td>
          </tr>
          <tr className="border-b border-charcoal-300">
            <td className="py-2 font-semibold">Necesar total</td>
            <td className="py-2 text-right font-bold">{formatArea(result.totalArea)}</td>
          </tr>
          {result.canCalculatePieces && result.estimatedPieces !== null && (
            <tr className="border-b border-charcoal-200">
              <td className="py-2 text-charcoal-500">Bucăți necesare</td>
              <td className="py-2 text-right font-medium">{formatPieces(result.estimatedPieces)}</td>
            </tr>
          )}
          {result.canCalculatePallets && result.pallets !== null && (
            <>
              <tr className="border-b border-charcoal-200">
                <td className="py-2 text-charcoal-500">Paleți recomandați</td>
                <td className="py-2 text-right font-medium">{formatPallets(result.pallets)}</td>
              </tr>
              {result.commercialArea !== null && (
                <tr className="border-b border-charcoal-200">
                  <td className="py-2 text-charcoal-500">Cantitate livrată</td>
                  <td className="py-2 text-right font-medium">{formatArea(result.commercialArea)}</td>
                </tr>
              )}
              {result.surplusArea !== null && result.surplusArea > 0 && (
                <tr className="border-b border-charcoal-200">
                  <td className="py-2 text-charcoal-500">Rezervă din rotunjire</td>
                  <td className="py-2 text-right font-medium">{formatArea(result.surplusArea)}</td>
                </tr>
              )}
              {result.totalWeightKg !== null && (
                <tr>
                  <td className="py-2 text-charcoal-500">Greutate totală estimată</td>
                  <td className="py-2 text-right font-medium">{formatInteger(result.totalWeightKg)} kg</td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>

      <p className="text-xs text-charcoal-500 leading-relaxed border-t border-charcoal-200 pt-4">
        Calculul este orientativ și poate varia în funcție de modul de montaj, configurația suprafeței, debitare și
        pierderi. Pentru necesarul final recomandăm validarea de către un specialist Petra Pavaje. Contact:{' '}
        +40 358 732 246 · contact@petrapavaje.ro
      </p>
    </div>
  )
}
