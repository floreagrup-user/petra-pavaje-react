import { Trash2 } from 'lucide-react'
import { rectangleArea, squareArea, triangleArea, circleArea, semicircleArea } from '@/lib/calculator/calculateShapes'
import { formatArea } from '@/lib/calculator/formatters'
import type { AreaShape, ProjectZone } from '@/lib/calculator/types'
import { cn } from '@/lib/utils'

const SHAPE_OPTIONS: { value: AreaShape; label: string }[] = [
  { value: 'dreptunghi', label: 'Dreptunghi' },
  { value: 'patrat', label: 'Pătrat' },
  { value: 'triunghi', label: 'Triunghi' },
  { value: 'cerc', label: 'Cerc' },
  { value: 'semicerc', label: 'Semicerc' },
  { value: 'manual', label: 'Introduc suprafața (m²)' },
]

const PURPOSE_OPTIONS = ['Terasă', 'Curte', 'Alee', 'Trotuar', 'Parcare', 'Acces auto', 'Zonă pietonală', 'Altă suprafață']

export function computeZoneArea(shape: AreaShape, inputs: Record<string, number>): number {
  switch (shape) {
    case 'dreptunghi':
      return rectangleArea(inputs.length || 0, inputs.width || 0)
    case 'patrat':
      return squareArea(inputs.side || 0)
    case 'triunghi':
      return triangleArea(inputs.base || 0, inputs.height || 0)
    case 'cerc':
      return circleArea(inputs.radius || 0)
    case 'semicerc':
      return semicircleArea(inputs.radius || 0)
    case 'manual':
      return inputs.area || 0
    default:
      return 0
  }
}

interface NumberFieldProps {
  label: string
  value: number | undefined
  onChange: (n: number) => void
  suffix?: string
}

function NumberField({ label, value, onChange, suffix = 'm' }: NumberFieldProps) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-charcoal-600 mb-1">{label}</span>
      <div className="relative">
        <input
          type="number"
          min={0}
          step={0.01}
          inputMode="decimal"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
          className="w-full px-3.5 py-3 pr-10 border border-charcoal-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-charcoal-400">{suffix}</span>
      </div>
    </label>
  )
}

interface AreaZoneInputProps {
  zone: ProjectZone
  index: number
  showAdvanced: boolean
  onChange: (zone: ProjectZone) => void
  onRemove?: () => void
}

export function AreaZoneInput({ zone, index, showAdvanced, onChange, onRemove }: AreaZoneInputProps) {
  const setInputs = (inputs: Record<string, number>) => {
    onChange({ ...zone, inputs, areaM2: computeZoneArea(zone.shape, inputs) })
  }
  const setShape = (shape: AreaShape) => {
    onChange({ ...zone, shape, inputs: {}, areaM2: 0 })
  }

  return (
    <div className="rounded-xl border border-charcoal-200 p-4 bg-white">
      <div className="flex items-center justify-between mb-3 gap-2">
        <input
          type="text"
          value={zone.label}
          onChange={(e) => onChange({ ...zone, label: e.target.value })}
          aria-label={`Denumire zonă ${index + 1}`}
          className="font-semibold text-charcoal-900 text-sm bg-transparent border-b border-transparent hover:border-charcoal-200 focus:border-brand-500 focus:outline-none px-0.5 py-0.5 min-w-0"
        />
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Șterge zona ${zone.label}`}
            className="text-charcoal-400 hover:text-red-600 transition-colors shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {showAdvanced && (
        <div className="mb-3">
          <span className="block text-xs font-medium text-charcoal-600 mb-1.5">Ce amenajezi?</span>
          <div className="flex flex-wrap gap-1.5">
            {PURPOSE_OPTIONS.map((purpose) => (
              <button
                key={purpose}
                type="button"
                onClick={() => onChange({ ...zone, purpose })}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs border transition-colors',
                  zone.purpose === purpose
                    ? 'bg-brand-600 border-brand-600 text-white'
                    : 'bg-charcoal-50 border-charcoal-200 text-charcoal-600 hover:border-brand-300'
                )}
              >
                {purpose}
              </button>
            ))}
          </div>
        </div>
      )}

      {showAdvanced && (
        <div className="mb-3">
          <span className="block text-xs font-medium text-charcoal-600 mb-1.5">Forma suprafeței</span>
          <select
            value={zone.shape}
            onChange={(e) => setShape(e.target.value as AreaShape)}
            aria-label="Forma suprafeței"
            className="w-full px-3.5 py-2.5 border border-charcoal-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          >
            {SHAPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-3">
        {zone.shape === 'dreptunghi' && (
          <>
            <NumberField label="Lungime" value={zone.inputs.length} onChange={(n) => setInputs({ ...zone.inputs, length: n })} />
            <NumberField label="Lățime" value={zone.inputs.width} onChange={(n) => setInputs({ ...zone.inputs, width: n })} />
          </>
        )}
        {zone.shape === 'patrat' && <NumberField label="Latură" value={zone.inputs.side} onChange={(n) => setInputs({ ...zone.inputs, side: n })} />}
        {zone.shape === 'triunghi' && (
          <>
            <NumberField label="Bază" value={zone.inputs.base} onChange={(n) => setInputs({ ...zone.inputs, base: n })} />
            <NumberField label="Înălțime" value={zone.inputs.height} onChange={(n) => setInputs({ ...zone.inputs, height: n })} />
          </>
        )}
        {(zone.shape === 'cerc' || zone.shape === 'semicerc') && (
          <NumberField label="Rază" value={zone.inputs.radius} onChange={(n) => setInputs({ ...zone.inputs, radius: n })} />
        )}
        {zone.shape === 'manual' && (
          <NumberField label="Suprafață" value={zone.inputs.area} onChange={(n) => setInputs({ ...zone.inputs, area: n })} suffix="m²" />
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-charcoal-100">
        <span className="text-xs text-charcoal-500">Suprafață zonă</span>
        <span className="font-semibold text-charcoal-900">{formatArea(zone.areaM2)}</span>
      </div>
    </div>
  )
}
