import { Link } from 'react-router-dom'
import { ArrowRight, Star, Layers } from 'lucide-react'
import type { Product } from '@/data/types'
import { productImages } from '@/data/images'
import { getThicknessValues } from '@/lib/product-filters'

const SWATCH_LIMIT = 5

function thicknessLabel(product: Product): string {
  const values = getThicknessValues(product).map(Number).sort((a, b) => a - b)
  if (!values.length) return ''
  return values.length === 1 ? `${values[0]} cm` : `${values[0]}-${values[values.length - 1]} cm`
}

interface Props {
  product: Product
  basePath: string
  badgeLabel?: string
  extraBadge?: string
  lang?: 'ro' | 'en'
}

export function ProductGridCard({ product, basePath, badgeLabel = 'Premium', extraBadge, lang = 'ro' }: Props) {
  const isEnglish = lang === 'en'
  const hasMix = Boolean(product.mixModes && product.mixModes.length > 0)
  const topRightBadge = hasMix ? 'Mix' : extraBadge
  const formatCount = product.dimensionsList?.length || 0
  const thickness = thicknessLabel(product)
  const visibleColors = product.colors.slice(0, SWATCH_LIMIT)
  const extraColors = product.colors.length - visibleColors.length

  return (
    <Link to={`${basePath}/${product.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-100 mb-4">
        <img
          src={productImages[product.slug] || product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-brand-600 text-white text-xs font-medium rounded-md">
            <Star className="w-3 h-3" />
            {badgeLabel}
          </div>
        )}
        {topRightBadge && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 text-charcoal-900 text-xs font-medium rounded-md">
            <Layers className="w-3 h-3" />
            {topRightBadge}
          </div>
        )}
        <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/10 transition-colors duration-500" />
      </div>

      <h3 className="text-lg font-semibold text-charcoal-900 group-hover:text-brand-600 transition-colors mb-1">
        {product.name}
      </h3>
      <p className="text-sm text-charcoal-500 mb-3 line-clamp-2">{product.shortDescription}</p>

      {visibleColors.length > 0 && (
        <div className="flex items-center gap-1.5 mb-3">
          {visibleColors.map((color) => (
            <span
              key={color.name}
              title={color.name}
              className="w-4 h-4 rounded-full border border-charcoal-200 shrink-0"
              style={{ backgroundColor: color.hex }}
            />
          ))}
          {extraColors > 0 && <span className="text-xs text-charcoal-500 ml-0.5">+{extraColors}</span>}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-charcoal-500">
          {thickness && <span>{isEnglish ? `Thickness ${thickness}` : `Grosime ${thickness}`}</span>}
          {thickness && formatCount > 0 && <span> · </span>}
          {formatCount > 0 && (
            <span>
              {formatCount} {isEnglish ? (formatCount === 1 ? 'format' : 'formats') : (formatCount === 1 ? 'format' : 'formate')}
            </span>
          )}
        </p>
        <div className="flex items-center text-brand-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
          {isEnglish ? 'View product' : 'Vezi produsul'}
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
