import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { CookieConsentBanner } from '@/components/CookieConsentBanner'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { FloatingCalculator } from '@/components/calculator/FloatingCalculator'
import { FloatingPetraVision } from '@/components/visualizer/FloatingPetraVision'
import { isEnglishPath } from '@/lib/i18n-routes'

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // index.html ships lang="ro"; /en pages must declare English for screen
  // readers, translation prompts and search engines. The prerender saves
  // <html> as rendered, so this also lands in the static files.
  useEffect(() => {
    document.documentElement.lang = isEnglishPath(location.pathname) ? 'en' : 'ro'
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
      <Footer />
      <CookieConsentBanner />
      <WhatsAppButton />
      <FloatingPetraVision />
      <FloatingCalculator />
    </div>
  )
}
