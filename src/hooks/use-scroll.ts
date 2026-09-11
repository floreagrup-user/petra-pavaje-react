import { useState, useEffect } from 'react'

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Already revealed — no need to keep observing (also avoids re-hiding on scroll-away).
    if (!element || isIntersecting) return

    // Force threshold to 0: a ratio-based threshold (e.g. 0.1) can never be reached for a
    // target much taller than the viewport (a long product grid, for instance), since the
    // visible fraction of its own total height stays under that ratio at every scroll
    // position — permanently stuck at isIntersecting:false. We only need "has any part of
    // this element entered the viewport", so ignore a caller-supplied threshold.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsIntersecting(true)
    }, { ...options, threshold: 0 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [element, isIntersecting, options])

  return { ref: setElement, isIntersecting }
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}
