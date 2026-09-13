import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { CookieConsentBanner } from '@/components/CookieConsentBanner'

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  )
}
