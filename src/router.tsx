import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from '@/layouts/Layout'

const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const ProductsHubPage = lazy(() => import('@/pages/ProductsHubPage').then(m => ({ default: m.ProductsHubPage })))
const ProductCategoryPage = lazy(() => import('@/pages/ProductCategoryPage').then(m => ({ default: m.ProductCategoryPage })))
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })))
const BlogPage = lazy(() => import('@/pages/BlogPage').then(m => ({ default: m.BlogPage })))
const BlogDetailPage = lazy(() => import('@/pages/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })))
const VirtualTourPage = lazy(() => import('@/pages/VirtualTourPage').then(m => ({ default: m.VirtualTourPage })))
const CalculatorPage = lazy(() => import('@/pages/CalculatorPage').then(m => ({ default: m.CalculatorPage })))
const GenericPage = lazy(() => import('@/pages/GenericPage').then(m => ({ default: m.GenericPage })))
const WoodstonePage = lazy(() => import('@/pages/WoodstonePage').then(m => ({ default: m.WoodstonePage })))
const WoodstoneCategoryPage = lazy(() => import('@/pages/WoodstoneCategoryPage').then(m => ({ default: m.WoodstoneCategoryPage })))
const QuatroPage = lazy(() => import('@/pages/QuatroPage').then(m => ({ default: m.QuatroPage })))
const PremiumCategoryPage = lazy(() => import('@/pages/PremiumCategoryPage').then(m => ({ default: m.PremiumCategoryPage })))
const StandardCategoryPage = lazy(() => import('@/pages/StandardCategoryPage').then(m => ({ default: m.StandardCategoryPage })))
const BorduriCategoryPage = lazy(() => import('@/pages/BorduriCategoryPage').then(m => ({ default: m.BorduriCategoryPage })))
const ElementCategoryPage = lazy(() => import('@/pages/ElementCategoryPage').then(m => ({ default: m.ElementCategoryPage })))
const ElementHubPage = lazy(() => import('@/pages/ElementHubPage').then(m => ({ default: m.ElementHubPage })))
const ElementeOverviewPage = lazy(() => import('@/pages/ElementeOverviewPage').then(m => ({ default: m.ElementeOverviewPage })))
const BrosuriPage = lazy(() => import('@/pages/BrosuriPage').then(m => ({ default: m.BrosuriPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })))
const FloreaGrupPage = lazy(() => import('@/pages/FloreaGrupPage').then(m => ({ default: m.FloreaGrupPage })))
const SustainabilityPage = lazy(() => import('@/pages/SustainabilityPage').then(m => ({ default: m.SustainabilityPage })))
const CatalogPage = lazy(() => import('@/pages/CatalogPage').then(m => ({ default: m.CatalogPage })))
const LaboratorPage = lazy(() => import('@/pages/LaboratorPage').then(m => ({ default: m.LaboratorPage })))
const MontajPage = lazy(() => import('@/pages/MontajPage').then(m => ({ default: m.MontajPage })))
const ModeleMontajPage = lazy(() => import('@/pages/ModeleMontajPage').then(m => ({ default: m.ModeleMontajPage })))
const IntretinerePage = lazy(() => import('@/pages/IntretinerePage').then(m => ({ default: m.IntretinerePage })))
const DegivrarePage = lazy(() => import('@/pages/DegivrarePage').then(m => ({ default: m.DegivrarePage })))
const FaqPage = lazy(() => import('@/pages/FaqPage').then(m => ({ default: m.FaqPage })))
const CarieraPage = lazy(() => import('@/pages/CarieraPage').then(m => ({ default: m.CarieraPage })))
const GarantiePage = lazy(() => import('@/pages/GarantiePage').then(m => ({ default: m.GarantiePage })))
const DocumenteTehnicePage = lazy(() => import('@/pages/DocumenteTehnicePage').then(m => ({ default: m.DocumenteTehnicePage })))

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
      { path: 'produse', element: <Suspense><ProductsHubPage /></Suspense> },
      { path: 'produse/elemente', element: <Suspense><ElementeOverviewPage /></Suspense> },
      { path: 'produse/woodstone', element: <Suspense><WoodstonePage /></Suspense> },
      { path: 'produse/woodstone/:category', element: <Suspense><WoodstoneCategoryPage /></Suspense> },
      { path: 'produse/pavaje-standard/quatro', element: <Suspense><QuatroPage /></Suspense> },
      { path: 'produse/pavaje-standard/quatro/:product', element: <Suspense><ProductDetailPage /></Suspense> },
      { path: 'produse/pavaje-premium', element: <Suspense><PremiumCategoryPage /></Suspense> },
      { path: 'produse/pavaje-standard', element: <Suspense><StandardCategoryPage /></Suspense> },
      { path: 'produse/borduri', element: <Suspense><BorduriCategoryPage /></Suspense> },
      { path: 'produse/rigole', element: <Suspense><ElementCategoryPage slug="rigole" /></Suspense> },
      { path: 'produse/boltari', element: <Suspense><ElementCategoryPage slug="boltari" /></Suspense> },
      { path: 'produse/jardiniere', element: <Suspense><ElementCategoryPage slug="jardiniere" /></Suspense> },
      { path: 'produse/palisada', element: <Suspense><ElementCategoryPage slug="palisada" /></Suspense> },
      { path: 'produse/banci', element: <Suspense><ElementCategoryPage slug="banci" /></Suspense> },
      { path: 'produse/treapta', element: <Suspense><ElementCategoryPage slug="treapta" /></Suspense> },
      { path: 'produse/bloc-de-zid', element: <Suspense><ElementCategoryPage slug="bloc-de-zid" /></Suspense> },
      { path: 'produse/garduri', element: <Suspense><ElementHubPage slug="garduri" /></Suspense> },
      { path: 'produse/garduri/:element', element: <Suspense><ElementCategoryPage /></Suspense> },
      { path: 'produse/elemente-de-canalizare', element: <Suspense><ElementHubPage slug="elemente-de-canalizare" /></Suspense> },
      { path: 'produse/elemente-de-canalizare/:element', element: <Suspense><ElementCategoryPage /></Suspense> },
      { path: 'produse/:category', element: <Suspense><ProductCategoryPage /></Suspense> },
      { path: 'produse/:category/:product', element: <Suspense><ProductDetailPage /></Suspense> },
      { path: 'woodstone-lemn-pietrificat', element: <Suspense><WoodstonePage /></Suspense> },
      { path: 'woodstone-lemn-pietrificat/:category', element: <Suspense><WoodstoneCategoryPage /></Suspense> },
      { path: 'contact', element: <Suspense><ContactPage /></Suspense> },
      { path: 'blog', element: <Suspense><BlogPage /></Suspense> },
      { path: 'blog/:slug', element: <Suspense><BlogDetailPage /></Suspense> },
      { path: 'tur-virtual', element: <Suspense><VirtualTourPage /></Suspense> },
      { path: 'calculator', element: <Suspense><CalculatorPage /></Suspense> },
      { path: 'despre-noi', element: <Suspense><AboutPage /></Suspense> },
      { path: 'sustenabilitate', element: <Suspense><SustainabilityPage /></Suspense> },
      { path: 'compania', element: <LazyGenericPage title="Compania" contentKey="company" /> },
      { path: 'florea-grup', element: <Suspense><FloreaGrupPage /></Suspense> },
      { path: 'garantie', element: <Suspense><GarantiePage /></Suspense> },
      { path: 'laborator', element: <Suspense><LaboratorPage /></Suspense> },
      { path: 'cariera', element: <Suspense><CarieraPage /></Suspense> },
      { path: 'catalog', element: <Suspense><CatalogPage /></Suspense> },
      { path: 'montaj', element: <Suspense><MontajPage /></Suspense> },
      { path: 'modele-de-montaj', element: <Suspense><ModeleMontajPage /></Suspense> },
      { path: 'intretinere', element: <Suspense><IntretinerePage /></Suspense> },
      { path: 'degivrare', element: <Suspense><DegivrarePage /></Suspense> },
      { path: 'faq', element: <Suspense><FaqPage /></Suspense> },
      { path: 'documente', element: <Suspense><DocumenteTehnicePage /></Suspense> },
      { path: 'brosuri', element: <Suspense><BrosuriPage /></Suspense> },
      { path: 'confidentialitate', element: <LazyGenericPage title="Politica de Confidențialitate" contentKey="confidentialitate" /> },
      { path: 'cookie-uri', element: <LazyGenericPage title="Politica Cookie-uri" contentKey="cookie-uri" /> },
      { path: 'termeni', element: <LazyGenericPage title="Termeni și Condiții" contentKey="termeni" /> },
    ],
  },
])
