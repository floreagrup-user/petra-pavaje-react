export interface Product {
  id: string
  name: string
  slug: string
  category: string
  description: string
  shortDescription: string
  image: string
  gallery: string[]
  specs: ProductSpec[]
  mixModes?: string[]
  colors: ProductColor[]
  dimensions: string
  dimensionsList?: ProductDimension[]
  weight: string
  usage: string[]
  pdfUrl?: string
  featured?: boolean
  heroImages?: string[]
  heroFeatures?: string[]
  patternImages?: string[]
  dimensionImages?: string[]
  technicalFeatures?: string[]
  advantages?: string[]
  faq?: ProductFAQ[]
  documents?: ProductDocument[]
}

export interface ProductFAQ {
  question: string
  answer: string
}

export interface ProductDocument {
  label: string
  productCode?: string
  datasheetUrl?: string
  declarationUrl?: string
}

export interface ProductSpec {
  label: string
  value: string
}

export interface ProductColor {
  name: string
  hex: string
  image?: string
}

export interface MixComposition {
  dimensions: string
  pieces: number
}

export interface ProductDimension {
  label: string
  size: string
  thickness: string
  piecesPerMp: number
  piecesPerPallet: number
  kgPerPallet: number
  mpPerPallet: number
  image?: string
  mixComposition?: MixComposition[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
  parent?: string
}

export interface Factory {
  id: string
  name: string
  address: string
  phone: string
  email: string
  schedule: string
  lat: number
  lng: number
  image: string
}

export interface Testimonial {
  id: string
  name: string
  quote: string
  images: string[]
  location?: string
}

export type BlogCategory = 'inspiratie' | 'studii-de-caz' | 'ghiduri' | 'noutati'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  modifiedDate?: string
  author: string
  categories: BlogCategory[]
  image: string
  readTime: number
  tags?: string[]
  seo?: { title?: string; description?: string; canonical?: string }
  sourceUrl?: string
  toc?: { id: string; heading: string; summary: string }[]
}

export interface CountyRep {
  county: string
  countyCode: string
  name: string
  email: string
  phone: string
}

export interface InstallationPattern {
  id: string
  name: string
  image: string
  products: string[]
}

export interface WoodstoneVariant {
  name: string
  code: string
  dimensions: string
  piecesPerMp?: number | string
  weightKg: number | string
  palletizing?: string
  badge?: string
}

export interface WoodstoneVariantGroup {
  name: string
  note?: string
  variants: WoodstoneVariant[]
}

export interface WoodstoneCategory {
  slug: string
  name: string
  title: string
  shortDescription: string
  description: string
  image: string
  gallery: string[]
  heroFeatures: string[]
  variantGroups: WoodstoneVariantGroup[]
  technicalFeatures: string[]
  advantages: string[]
  usage: string[]
  faq?: ProductFAQ[]
}

export interface ElementVariant {
  name: string
  code: string
  dimensions: string
  piecesPerMl?: number | string
  piecesPerPallet?: number | string
  weightKg: number | string
  mlPerPallet?: number | string
  badge?: string
}

export interface ElementVariantGroup {
  name: string
  note?: string
  variants: ElementVariant[]
}

export interface ElementCategoryData {
  slug: string
  name: string
  title: string
  shortDescription: string
  description: string
  image: string
  gallery: string[]
  heroFeatures: string[]
  variantGroups: ElementVariantGroup[]
  colors: ProductColor[]
  technicalFeatures: string[]
  advantages: string[]
  usage: string[]
  documents?: ProductDocument[]
  faq?: ProductFAQ[]
  parent?: { slug: string; name: string }
}
