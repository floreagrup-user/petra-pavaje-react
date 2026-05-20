import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from '@/layouts/Layout'

const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const ProductCategoryPage = lazy(() => import('@/pages/ProductCategoryPage').then(m => ({ default: m.ProductCategoryPage })))
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })))
const BlogPage = lazy(() => import('@/pages/BlogPage').then(m => ({ default: m.BlogPage })))
const BlogDetailPage = lazy(() => import('@/pages/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })))
const VirtualTourPage = lazy(() => import('@/pages/VirtualTourPage').then(m => ({ default: m.VirtualTourPage })))
const CalculatorPage = lazy(() => import('@/pages/CalculatorPage').then(m => ({ default: m.CalculatorPage })))
const GenericPage = lazy(() => import('@/pages/GenericPage').then(m => ({ default: m.GenericPage })))
const WoodstonePage = lazy(() => import('@/pages/WoodstonePage').then(m => ({ default: m.WoodstonePage })))

const LazyGenericPage = ({ title, contentKey }: { title: string; contentKey: string }) => (
  <Suspense fallback={<div className="pt-32 pb-16 text-center text-charcoal-500">Se încarcă...</div>}>
    <GenericPage title={title} contentKey={contentKey} />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Suspense><HomePage /></Suspense> },
      { path: 'produse/woodstone', element: <Suspense><WoodstonePage /></Suspense> },
      { path: 'produse/:category', element: <Suspense><ProductCategoryPage /></Suspense> },
      { path: 'produse/:category/:product', element: <Suspense><ProductDetailPage /></Suspense> },
      { path: 'woodstone-lemn-pietrificat', element: <Suspense><WoodstonePage /></Suspense> },
      { path: 'contact', element: <Suspense><ContactPage /></Suspense> },
      { path: 'blog', element: <Suspense><BlogPage /></Suspense> },
      { path: 'blog/:slug', element: <Suspense><BlogDetailPage /></Suspense> },
      { path: 'tur-virtual', element: <Suspense><VirtualTourPage /></Suspense> },
      { path: 'calculator', element: <Suspense><CalculatorPage /></Suspense> },
      { path: 'despre-noi', element: <LazyGenericPage title="Despre Noi" contentKey="about" /> },
      { path: 'sustenabilitate', element: <LazyGenericPage title="Sustenabilitate" contentKey="sustainability" /> },
      { path: 'compania', element: <LazyGenericPage title="Compania" contentKey="company" /> },
      { path: 'florea-grup', element: <LazyGenericPage title="Florea Grup – 30 de ani" contentKey="florea-grup" /> },
      { path: 'garantie', element: <LazyGenericPage title="Garanție" contentKey="garantie" /> },
      { path: 'laborator', element: <LazyGenericPage title="Laborator" contentKey="laborator" /> },
      { path: 'cariera', element: <LazyGenericPage title="Carieră" contentKey="cariera" /> },
      { path: 'catalog', element: <LazyGenericPage title="Catalog" contentKey="catalog" /> },
      { path: 'modele-montaj', element: <LazyGenericPage title="Modele de Montaj" contentKey="modele-montaj" /> },
      { path: 'intretinere', element: <LazyGenericPage title="Întreținere Pavaje" contentKey="intretinere" /> },
      { path: 'faq', element: <LazyGenericPage title="Întrebări Frecvente" contentKey="faq" /> },
      { path: 'documente', element: <LazyGenericPage title="Documente Tehnice" contentKey="documente" /> },
      { path: 'brosuri', element: <LazyGenericPage title="Broșuri" contentKey="brosuri" /> },
      { path: 'confidentialitate', element: <LazyGenericPage title="Politica de Confidențialitate" contentKey="confidentialitate" /> },
      { path: 'cookie-uri', element: <LazyGenericPage title="Politica Cookie-uri" contentKey="cookie-uri" /> },
      { path: 'termeni', element: <LazyGenericPage title="Termeni și Condiții" contentKey="termeni" /> },
    ],
  },
])
