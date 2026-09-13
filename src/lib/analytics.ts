// Thin wrapper around the GA4 gtag already wired up in index.html (see
// useCookieConsent.ts for the consent-mode plumbing this respects).
export function trackEvent(name: string, params?: Record<string, unknown>) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  gtag?.('event', name, params)
}
