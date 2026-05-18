import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/layouts/Layout'
import { HomePage } from '@/pages/HomePage'
import { ProductCategoryPage } from '@/pages/ProductCategoryPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { ContactPage } from '@/pages/ContactPage'
import { VirtualTourPage } from '@/pages/VirtualTourPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'produse/:category',
        element: <ProductCategoryPage />,
      },
      {
        path: 'produse/:category/:product',
        element: <ProductDetailPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'tur-virtual',
        element: <VirtualTourPage />,
      },
    ],
  },
])
