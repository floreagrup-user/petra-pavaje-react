import { useCallback, useEffect, useState } from 'react'

declare global {
  interface Window {
    zaraz?: {
      track: (eventName: string, params?: Record<string, unknown>) => void
      consent?: {
        setAll: (status: Record<string, boolean>) => void
      }
    }
  }
}

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

function pushConsentToZaraz(consent: CookieConsent) {
  window.zaraz?.consent?.setAll({
    analytics: consent.analytics,
    marketing: consent.marketing,
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
    pushConsentToZaraz(full)
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
  }, [])

  // Returning visitors already have a decision in localStorage, but Zaraz's
  // own consent cookie only gets set by a saveConsent() call above -- sync
  // the existing decision to Zaraz on mount so tools fire without the
  // banner needing to reappear. Zaraz has no documented "ready" event, so
  // this polls briefly for window.zaraz.consent to exist rather than
  // risking a silent no-op if its loader hasn't run yet on first paint.
  useEffect(() => {
    const existing = readStoredConsent()
    if (!existing) return
    let attempts = 0
    const interval = setInterval(() => {
      attempts += 1
      if (window.zaraz?.consent) {
        pushConsentToZaraz(existing)
        clearInterval(interval)
      } else if (attempts >= 20) {
        clearInterval(interval)
      }
    }, 200)
    return () => clearInterval(interval)
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
