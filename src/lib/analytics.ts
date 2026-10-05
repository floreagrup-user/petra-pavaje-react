// Thin wrapper around Zaraz's client-side event tracking (see
// useCookieConsent.ts for the consent plumbing this respects). Each event
// name used here needs a matching Trigger configured in the Zaraz dashboard
// to actually reach GA4 -- see project memory for the full list.
export function trackEvent(name: string, params?: Record<string, unknown>) {
  window.zaraz?.track(name, params)
}

// One delegated listener covers every tel: link on the site -- footer,
// contact, factories, calculator, laboratory, and any inside blog content --
// so a new phone link is tracked without remembering to wire it up.
// Careers pages are skipped: a call there is a job inquiry, and phone_click
// feeds a Google Ads lead conversion.
export function installPhoneClickTracking() {
  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest?.('a[href^="tel:"]')
    if (!link) return
    const path = window.location.pathname
    if (/\/cariera\/?$/.test(path)) return
    trackEvent('phone_click', {
      phone_number: link.getAttribute('href')!.slice(4),
      page_path: path,
    })
  })
}
