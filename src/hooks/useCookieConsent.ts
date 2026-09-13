import { useCallback, useEffect, useState } from 'react'

export interface CookieConsent {
  necessary: true
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'pp-cookie-consent'
const OPEN_SETTINGS_EVENT = 'pp-open-cookie-settings'
const CONSENT_CHANGE_EVENT = 'pp-cookie-consent-change'

function readStoredConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed?.analytics === 'boolean' && typeof parsed?.marketing === 'boolean') {
      return { necessary: true, analytics: parsed.analytics, marketing: parsed.marketing }
    }
    return null
  } catch {
    return null
  }
}

function pushConsentToGtag(consent: CookieConsent) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  gtag?.('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
  })
}

export function useCookieConsent() {
  const [consent, setConsentState] = useState<CookieConsent | null>(() => readStoredConsent())
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const onOpenSettings = () => setSettingsOpen(true)
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpenSettings)
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpenSettings)
  }, [])

  useEffect(() => {
    const onExternalChange = () => setConsentState(readStoredConsent())
    window.addEventListener(CONSENT_CHANGE_EVENT, onExternalChange)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onExternalChange)
  }, [])

  const saveConsent = useCallback((next: Omit<CookieConsent, 'necessary'>) => {
    const full: CookieConsent = { necessary: true, ...next }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...full, decidedAt: new Date().toISOString() }))
    setConsentState(full)
    setSettingsOpen(false)
    pushConsentToGtag(full)
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
  }, [])

  const acceptAll = useCallback(() => saveConsent({ analytics: true, marketing: true }), [saveConsent])
  const rejectNonEssential = useCallback(() => saveConsent({ analytics: false, marketing: false }), [saveConsent])
  const openSettings = useCallback(() => setSettingsOpen(true), [])
  const closeSettings = useCallback(() => setSettingsOpen(false), [])

  return {
    consent,
    hasDecided: consent !== null,
    settingsOpen,
    acceptAll,
    rejectNonEssential,
    saveConsent,
    openSettings,
    closeSettings,
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
}
