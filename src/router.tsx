import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/layouts/Layout'
import { HomePage } from '@/pages/HomePage'
import { ProductCategoryPage } from '@/pages/ProductCategoryPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { ContactPage } from '@/pages/ContactPage'
import { VirtualTourPage } from '@/pages/VirtualTourPage'
import { BlogPage } from '@/pages/BlogPage'
import { CalculatorPage } from '@/pages/CalculatorPage'

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
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: 'calculator',
        element: <CalculatorPage />,
      },
    ],
  },
])
