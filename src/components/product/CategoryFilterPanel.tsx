import { useState } from 'react'
import { X } from 'lucide-react'
import type { ProductFacets, ProductFilters } from '@/lib/product-filters'

const COLOR_PREVIEW_LIMIT = 12

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

interface Props {
  facets: ProductFacets
  filters: ProductFilters
  onChange: (next: ProductFilters) => void
  onClear: () => void
  hasActiveFilters: boolean
  lang?: 'ro' | 'en'
}

export function CategoryFilterPanel({ facets, filters, onChange, onClear, hasActiveFilters, lang = 'ro' }: Props) {
  const isEnglish = lang === 'en'
  const [showAllColors, setShowAllColors] = useState(false)
  const visibleColors = showAllColors ? facets.colors : facets.colors.slice(0, COLOR_PREVIEW_LIMIT)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-charcoal-900 uppercase tracking-wide">{isEnglish ? 'Filters' : 'Filtre'}</p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            {isEnglish ? 'Clear all' : 'Șterge toate'}
          </button>
        )}
      </div>

      {facets.colors.length > 0 && (
        <fieldset>
          <legend className="text-sm font-semibold text-charcoal-900 mb-3">{isEnglish ? 'Color' : 'Culoare'}</legend>
          <div className="grid grid-cols-2 gap-2">
            {visibleColors.map((color) => {
              const checked = filters.culoare.includes(color.slug)
              return (
                <label
                  key={color.slug}
                  className="flex items-center gap-2 text-sm text-charcoal-700 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => onChange({ ...filters, culoare: toggle(filters.culoare, color.slug) })}
                  />
                  <span
                    className={`w-5 h-5 rounded-full border-2 shrink-0 transition-all ${
                      checked ? 'border-brand-600 ring-2 ring-brand-100' : 'border-charcoal-200 group-hover:border-charcoal-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="truncate">{color.label}</span>
                </label>
              )
            })}
          </div>
          {facets.colors.length > COLOR_PREVIEW_LIMIT && (
            <button
              type="button"
              onClick={() => setShowAllColors((v) => !v)}
              className="mt-3 text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              {showAllColors
                ? (isEnglish ? 'Show fewer colors' : 'Arată mai puține culori')
                : (isEnglish ? `Show all colors (${facets.colors.length})` : `Arată toate culorile (${facets.colors.length})`)}
            </button>
          )}
        </fieldset>
      )}

      {facets.thicknesses.length > 0 && (
        <fieldset>
          <legend className="text-sm font-semibold text-charcoal-900 mb-3">{isEnglish ? 'Thickness' : 'Grosime'}</legend>
          <div className="flex flex-wrap gap-2">
            {facets.thicknesses.map((t) => {
              const checked = filters.grosime.includes(t.slug)
              return (
                <label key={t.slug}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => onChange({ ...filters, grosime: toggle(filters.grosime, t.slug) })}
                  />
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                      checked ? 'bg-brand-600 text-white' : 'bg-stone-100 text-charcoal-700 hover:bg-stone-200'
                    }`}
                  >
                    {t.label}
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>
      )}

      {facets.usage.length > 0 && (
        <fieldset>
          <legend className="text-sm font-semibold text-charcoal-900 mb-3">{isEnglish ? 'Usage' : 'Utilizare'}</legend>
          <div className="space-y-2">
            {facets.usage.map((u) => {
              const checked = filters.utilizare.includes(u.slug)
              return (
                <label key={u.slug} className="flex items-center gap-2 text-sm text-charcoal-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onChange({ ...filters, utilizare: toggle(filters.utilizare, u.slug) })}
                    className="w-4 h-4 rounded border-charcoal-300 text-brand-600 focus:ring-brand-500"
                  />
                  {u.label}
                </label>
              )
            })}
          </div>
        </fieldset>
      )}

      {facets.mixCount > 0 && (
        <fieldset>
          <legend className="text-sm font-semibold text-charcoal-900 mb-3">Format</legend>
          <label className="flex items-center gap-2 text-sm text-charcoal-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.mix}
              onChange={() => onChange({ ...filters, mix: !filters.mix })}
              className="w-4 h-4 rounded border-charcoal-300 text-brand-600 focus:ring-brand-500"
            />
            {isEnglish ? `Has Mix variants (${facets.mixCount})` : `Are variante Mix (${facets.mixCount})`}
          </label>
        </fieldset>
      )}

      {facets.features.length > 0 && (
        <fieldset>
          <legend className="text-sm font-semibold text-charcoal-900 mb-3">{isEnglish ? 'Features' : 'Caracteristici'}</legend>
          <div className="space-y-2">
            {facets.features.map((f) => {
              const checked = filters.caracteristici.includes(f.slug)
              return (
                <label key={f.slug} className="flex items-center gap-2 text-sm text-charcoal-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onChange({ ...filters, caracteristici: toggle(filters.caracteristici, f.slug) })}
                    className="w-4 h-4 rounded border-charcoal-300 text-brand-600 focus:ring-brand-500"
                  />
                  {f.label}
                </label>
              )
            })}
          </div>
        </fieldset>
      )}

      {facets.finishes.length > 0 && (
        <fieldset>
          <legend className="text-sm font-semibold text-charcoal-900 mb-3">{isEnglish ? 'Finish' : 'Finisaj'}</legend>
          <div className="space-y-2">
            {facets.finishes.map((f) => {
              const checked = filters.finisaj.includes(f.slug)
              return (
                <label key={f.slug} className="flex items-center gap-2 text-sm text-charcoal-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onChange({ ...filters, finisaj: toggle(filters.finisaj, f.slug) })}
                    className="w-4 h-4 rounded border-charcoal-300 text-brand-600 focus:ring-brand-500"
                  />
                  {f.label}
                </label>
              )
            })}
          </div>
        </fieldset>
      )}
    </div>
  )
}

export function ActiveFilterChips({
  facets,
  filters,
  onChange,
  onClear,
  lang = 'ro',
}: {
  facets: ProductFacets
  filters: ProductFilters
  onChange: (next: ProductFilters) => void
  onClear: () => void
  lang?: 'ro' | 'en'
}) {
  const isEnglish = lang === 'en'
  const chips: { key: string; label: string; onRemove: () => void }[] = []

  for (const slug of filters.culoare) {
    const c = facets.colors.find((x) => x.slug === slug)
    if (c) chips.push({ key: `culoare-${slug}`, label: c.label, onRemove: () => onChange({ ...filters, culoare: toggle(filters.culoare, slug) }) })
  }
  for (const slug of filters.grosime) {
    const t = facets.thicknesses.find((x) => x.slug === slug)
    if (t) chips.push({ key: `grosime-${slug}`, label: t.label, onRemove: () => onChange({ ...filters, grosime: toggle(filters.grosime, slug) }) })
  }
  for (const slug of filters.utilizare) {
    const u = facets.usage.find((x) => x.slug === slug)
    if (u) chips.push({ key: `utilizare-${slug}`, label: u.label, onRemove: () => onChange({ ...filters, utilizare: toggle(filters.utilizare, slug) }) })
  }
  if (filters.mix) {
    chips.push({ key: 'mix', label: isEnglish ? 'With Mix variants' : 'Cu variante Mix', onRemove: () => onChange({ ...filters, mix: false }) })
  }
  for (const slug of filters.caracteristici) {
    const f = facets.features.find((x) => x.slug === slug)
    if (f) chips.push({ key: `caracteristici-${slug}`, label: f.label, onRemove: () => onChange({ ...filters, caracteristici: toggle(filters.caracteristici, slug) }) })
  }
  for (const slug of filters.finisaj) {
    const f = facets.finishes.find((x) => x.slug === slug)
    if (f) chips.push({ key: `finisaj-${slug}`, label: f.label, onRemove: () => onChange({ ...filters, finisaj: toggle(filters.finisaj, slug) }) })
  }

  if (!chips.length) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-charcoal-700 text-sm rounded-lg transition-colors"
        >
          {chip.label}
          <X className="w-3.5 h-3.5" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
      >
        {isEnglish ? 'Clear all' : 'Șterge toate'}
      </button>
    </div>
  )
}
