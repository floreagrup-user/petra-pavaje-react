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
const AuthorPage = lazy(() => import('@/pages/AuthorPage').then(m => ({ default: m.AuthorPage })))
const VirtualTourPage = lazy(() => import('@/pages/VirtualTourPage').then(m => ({ default: m.VirtualTourPage })))
const CalculatorPavajPage = lazy(() => import('@/pages/CalculatorPavajPage').then(m => ({ default: m.CalculatorPavajPage })))
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

// English (/en) — scoped translation: static/info pages only, no catalog/blog/docs.
// See src/lib/i18n-routes.ts for the RO<->EN path map.
const HomePageEN = lazy(() => import('@/pages/HomePageEN').then(m => ({ default: m.HomePageEN })))
const AboutPageEN = lazy(() => import('@/pages/AboutPageEN').then(m => ({ default: m.AboutPageEN })))
const FloreaGrupPageEN = lazy(() => import('@/pages/FloreaGrupPageEN').then(m => ({ default: m.FloreaGrupPageEN })))
const ContactPageEN = lazy(() => import('@/pages/ContactPageEN').then(m => ({ default: m.ContactPageEN })))
const SustainabilityPageEN = lazy(() => import('@/pages/SustainabilityPageEN').then(m => ({ default: m.SustainabilityPageEN })))
const GarantiePageEN = lazy(() => import('@/pages/GarantiePageEN').then(m => ({ default: m.GarantiePageEN })))
const LaboratorPageEN = lazy(() => import('@/pages/LaboratorPageEN').then(m => ({ default: m.LaboratorPageEN })))
const CarieraPageEN = lazy(() => import('@/pages/CarieraPageEN').then(m => ({ default: m.CarieraPageEN })))
const CalculatorPavajPageEN = lazy(() => import('@/pages/CalculatorPavajPageEN').then(m => ({ default: m.CalculatorPavajPageEN })))
const MontajPageEN = lazy(() => import('@/pages/MontajPageEN').then(m => ({ default: m.MontajPageEN })))
const ModeleMontajPageEN = lazy(() => import('@/pages/ModeleMontajPageEN').then(m => ({ default: m.ModeleMontajPageEN })))
const IntretinerePageEN = lazy(() => import('@/pages/IntretinerePageEN').then(m => ({ default: m.IntretinerePageEN })))
const DegivrarePageEN = lazy(() => import('@/pages/DegivrarePageEN').then(m => ({ default: m.DegivrarePageEN })))
const FaqPageEN = lazy(() => import('@/pages/FaqPageEN').then(m => ({ default: m.FaqPageEN })))
const GenericPageEN = lazy(() => import('@/pages/GenericPageEN').then(m => ({ default: m.GenericPageEN })))
const QuatroPageEN = lazy(() => import('@/pages/QuatroPageEN').then(m => ({ default: m.QuatroPageEN })))

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
      // Product/category routes live at root level, matching the old
      // WordPress URL structure exactly (no /produse/ prefix, no redirect
      // hop) so old links, bookmarks and Google Ads destination URLs keep
      // working unchanged.
      { path: 'elemente', element: <Suspense><ElementeOverviewPage /></Suspense> },
      { path: 'woodstone-lemn-pietrificat', element: <Suspense><WoodstonePage /></Suspense> },
      { path: 'woodstone-lemn-pietrificat/:category', element: <Suspense><WoodstoneCategoryPage /></Suspense> },
      { path: 'pavaje-standard/quatro', element: <Suspense><QuatroPage /></Suspense> },
      { path: 'pavaje-standard/quatro/:product', element: <Suspense><ProductDetailPage /></Suspense> },
      { path: 'pavaje-premium', element: <Suspense><PremiumCategoryPage /></Suspense> },
      { path: 'pavaje-premium/:product', element: <Suspense><ProductDetailPage /></Suspense> },
      { path: 'pavaje-standard', element: <Suspense><StandardCategoryPage /></Suspense> },
      { path: 'pavaje-standard/:product', element: <Suspense><ProductDetailPage /></Suspense> },
      { path: 'borduri', element: <Suspense><BorduriCategoryPage /></Suspense> },
      { path: 'borduri/:product', element: <Suspense><ProductDetailPage /></Suspense> },
      { path: 'rigole', element: <Suspense><ElementCategoryPage slug="rigole" /></Suspense> },
      { path: 'boltari', element: <Suspense><ElementCategoryPage slug="boltari" /></Suspense> },
      { path: 'jardiniere', element: <Suspense><ElementCategoryPage slug="jardiniere" /></Suspense> },
      { path: 'palisada', element: <Suspense><ElementCategoryPage slug="palisada" /></Suspense> },
      { path: 'treapta', element: <Suspense><ElementCategoryPage slug="treapta" /></Suspense> },
      { path: 'bloc-de-zid', element: <Suspense><ElementCategoryPage slug="bloc-de-zid" /></Suspense> },
      { path: 'garduri', element: <Suspense><ElementHubPage slug="garduri" /></Suspense> },
      { path: 'garduri/:element', element: <Suspense><ElementCategoryPage /></Suspense> },
      { path: 'elemente-de-canalizare', element: <Suspense><ElementHubPage slug="elemente-de-canalizare" /></Suspense> },
      { path: 'elemente-de-canalizare/:element', element: <Suspense><ElementCategoryPage /></Suspense> },
      { path: 'produse/:category', element: <Suspense><ProductCategoryPage /></Suspense> },
      { path: 'produse/:category/:product', element: <Suspense><ProductDetailPage /></Suspense> },
      { path: 'contact', element: <Suspense><ContactPage /></Suspense> },
      { path: 'blog', element: <Suspense><BlogPage /></Suspense> },
      { path: 'blog/:slug', element: <Suspense><BlogDetailPage /></Suspense> },
      { path: 'autor/:slug', element: <Suspense><AuthorPage /></Suspense> },
      { path: 'tur-virtual', element: <Suspense><VirtualTourPage /></Suspense> },
      { path: 'calculator-pavaj', element: <Suspense><CalculatorPavajPage /></Suspense> },
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

      // English (/en) — scoped translation, see note above the lazy imports.
      { path: 'en', element: <Suspense><HomePageEN /></Suspense> },
      { path: 'en/despre-noi', element: <Suspense><AboutPageEN /></Suspense> },
      { path: 'en/florea-grup', element: <Suspense><FloreaGrupPageEN /></Suspense> },
      { path: 'en/contact', element: <Suspense><ContactPageEN /></Suspense> },
      { path: 'en/sustenabilitate', element: <Suspense><SustainabilityPageEN /></Suspense> },
      { path: 'en/garantie', element: <Suspense><GarantiePageEN /></Suspense> },
      { path: 'en/laborator', element: <Suspense><LaboratorPageEN /></Suspense> },
      { path: 'en/cariera', element: <Suspense><CarieraPageEN /></Suspense> },
      { path: 'en/calculator-pavaj', element: <Suspense><CalculatorPavajPageEN /></Suspense> },
      { path: 'en/montaj', element: <Suspense><MontajPageEN /></Suspense> },
      { path: 'en/modele-de-montaj', element: <Suspense><ModeleMontajPageEN /></Suspense> },
      { path: 'en/intretinere', element: <Suspense><IntretinerePageEN /></Suspense> },
      { path: 'en/degivrare', element: <Suspense><DegivrarePageEN /></Suspense> },
      { path: 'en/faq', element: <Suspense><FaqPageEN /></Suspense> },
      {
        path: 'en/compania',
        element: (
          <Suspense>
            <GenericPageEN title="The Company" contentKey="company" />
          </Suspense>
        ),
      },
      {
        path: 'en/cookie-uri',
        element: (
          <Suspense>
            <GenericPageEN title="Cookie Policy" contentKey="cookie-uri" />
          </Suspense>
        ),
      },
      // English Premium and Standard paver catalogs -- reuse the same
      // generic, data-driven components as the RO routes (they detect /en
      // via useLocation and pull translated text from src/data/products.en.ts).
      // See localizeProduct() in src/data/products.ts. Quatro is bespoke
      // (not data-driven) on the RO side too, so it gets its own EN page.
      { path: 'en/pavaje-premium', element: <Suspense><PremiumCategoryPage /></Suspense> },
      { path: 'en/pavaje-premium/:product', element: <Suspense><ProductDetailPage /></Suspense> },
      { path: 'en/pavaje-standard', element: <Suspense><StandardCategoryPage /></Suspense> },
      { path: 'en/pavaje-standard/quatro', element: <Suspense><QuatroPageEN /></Suspense> },
      { path: 'en/pavaje-standard/quatro/:product', element: <Suspense><ProductDetailPage /></Suspense> },
      { path: 'en/pavaje-standard/:product', element: <Suspense><ProductDetailPage /></Suspense> },
      // English Woodstone -- Petrified Wood range: same locale-aware
      // components as the RO routes, translated via src/data/woodstone.en.ts.
      { path: 'en/woodstone-lemn-pietrificat', element: <Suspense><WoodstonePage /></Suspense> },
      { path: 'en/woodstone-lemn-pietrificat/:category', element: <Suspense><WoodstoneCategoryPage /></Suspense> },
    ],
  },
])
