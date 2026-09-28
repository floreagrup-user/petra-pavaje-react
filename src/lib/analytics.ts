// Thin wrapper around Zaraz's client-side event tracking (see
// useCookieConsent.ts for the consent plumbing this respects). Each event
// name used here needs a matching Trigger configured in the Zaraz dashboard
// to actually reach GA4 -- see project memory for the full list.
export function trackEvent(name: string, params?: Record<string, unknown>) {
  window.zaraz?.track(name, params)
}
