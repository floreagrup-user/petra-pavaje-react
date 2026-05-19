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

export interface ProductDimension {
  label: string
  size: string
  thickness: string
  piecesPerMp: number
  piecesPerPallet: number
  kgPerPallet: number
  mpPerPallet: number
  image?: string
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

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  author: string
  category: string
  image: string
  readTime: number
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
