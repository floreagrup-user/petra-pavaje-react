import { useEffect, useRef } from 'react'

// Public site key from the Cloudflare Turnstile widget "petrapavaje.ro forms"
// (site keys are not secret, safe to ship in client code). The matching
// secret key lives only as the Pages env var TURNSTILE_SECRET_KEY, used
// server-side in functions/api/contact.ts and functions/api/newsletter.ts.
export const TURNSTILE_SITE_KEY = '0x4AAAAAAFJCBXPRZiZ_GoZW'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      execute: (widgetId: string) => void
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

function ensureScriptLoaded() {
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return
  const script = document.createElement('script')
  script.src = SCRIPT_SRC
  script.async = true
  script.defer = true
  document.head.appendChild(script)
}

// Renders an invisible Turnstile widget (appearance: interaction-only —
// stays hidden unless Cloudflare decides an interactive challenge is
// needed) and exposes getToken() to run it on demand at form-submit time.
export function useTurnstile() {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const resolverRef = useRef<((token: string) => void) | null>(null)

  useEffect(() => {
    let cancelled = false
    let pollId: ReturnType<typeof setInterval> | undefined

    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile || widgetIdRef.current) return
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: 'interaction-only',
        execution: 'execute',
        callback: (token: string) => {
          resolverRef.current?.(token)
          resolverRef.current = null
        },
        'error-callback': () => {
          resolverRef.current?.('')
          resolverRef.current = null
        },
      })
    }

    if (window.turnstile) {
      renderWidget()
    } else {
      ensureScriptLoaded()
      pollId = setInterval(() => {
        if (window.turnstile) {
          if (pollId) clearInterval(pollId)
          renderWidget()
        }
      }, 100)
    }

    return () => {
      cancelled = true
      if (pollId) clearInterval(pollId)
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [])

  const getToken = (): Promise<string> => {
    return new Promise((resolve) => {
      if (!widgetIdRef.current || !window.turnstile) {
        resolve('')
        return
      }
      resolverRef.current = resolve
      window.turnstile.reset(widgetIdRef.current)
      window.turnstile.execute(widgetIdRef.current)
    })
  }

  return { containerRef, getToken }
}
