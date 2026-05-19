import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/layouts/Layout'
import { HomePage } from '@/pages/HomePage'
import { ProductCategoryPage } from '@/pages/ProductCategoryPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { ContactPage } from '@/pages/ContactPage'
import { BlogPage } from '@/pages/BlogPage'
import { BlogDetailPage } from '@/pages/BlogDetailPage'
import { VirtualTourPage } from '@/pages/VirtualTourPage'
import { CalculatorPage } from '@/pages/CalculatorPage'
import { GenericPage } from '@/pages/GenericPage'
import { WoodstonePage } from '@/pages/WoodstonePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'produse/woodstone', element: <WoodstonePage /> },
      { path: 'produse/:category', element: <ProductCategoryPage /> },
      { path: 'produse/:category/:product', element: <ProductDetailPage /> },
      { path: 'woodstone-lemn-pietrificat', element: <WoodstonePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <BlogDetailPage /> },
      { path: 'tur-virtual', element: <VirtualTourPage /> },
      { path: 'calculator', element: <CalculatorPage /> },
      { path: 'despre-noi', element: <GenericPage title="Despre Noi" contentKey="about" /> },
      { path: 'sustenabilitate', element: <GenericPage title="Sustenabilitate" contentKey="sustainability" /> },
      { path: 'compania', element: <GenericPage title="Compania" contentKey="company" /> },
      { path: 'florea-grup', element: <GenericPage title="Florea Grup – 30 de ani" contentKey="florea-grup" /> },
      { path: 'garantie', element: <GenericPage title="Garanție" contentKey="garantie" /> },
      { path: 'laborator', element: <GenericPage title="Laborator" contentKey="laborator" /> },
      { path: 'cariera', element: <GenericPage title="Carieră" contentKey="cariera" /> },
      { path: 'catalog', element: <GenericPage title="Catalog" contentKey="catalog" /> },
      { path: 'modele-montaj', element: <GenericPage title="Modele de Montaj" contentKey="modele-montaj" /> },
      { path: 'intretinere', element: <GenericPage title="Întreținere Pavaje" contentKey="intretinere" /> },
      { path: 'faq', element: <GenericPage title="Întrebări Frecvente" contentKey="faq" /> },
      { path: 'documente', element: <GenericPage title="Documente Tehnice" contentKey="documente" /> },
      { path: 'brosuri', element: <GenericPage title="Broșuri" contentKey="brosuri" /> },
      { path: 'confidentialitate', element: <GenericPage title="Politica de Confidențialitate" contentKey="confidentialitate" /> },
      { path: 'cookie-uri', element: <GenericPage title="Politica Cookie-uri" contentKey="cookie-uri" /> },
      { path: 'termeni', element: <GenericPage title="Termeni și Condiții" contentKey="termeni" /> },
    ],
  },
])
