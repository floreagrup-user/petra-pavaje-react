import { useEffect } from 'react'
import { SEO_SITE_NAME, truncateDescription, upsertCanonical, upsertMeta, resetSEO } from '@/hooks/seo-utils'
import { PETRA_VISION_PATH } from '@/lib/features'
import { PavingVisualizer } from '@/components/visualizer/PavingVisualizer'

const TITLE = `Petra VISION: simulator inteligent de pavaje | ${SEO_SITE_NAME}`
const DESCRIPTION = truncateDescription(
  'Încarcă o fotografie cu curtea ta, marchează zona și vezi în câteva secunde cum arată cu pavaje Petra Pavaje. Petra VISION, simulator inteligent de pavaje.',
)

export function VisualizerPage() {
  useEffect(() => {
    const url = `${window.location.origin}${PETRA_VISION_PATH}`
    document.title = TITLE
    upsertMeta('name', 'description', DESCRIPTION)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', TITLE)
    upsertMeta('property', 'og:description', DESCRIPTION)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', TITLE)
    upsertMeta('name', 'twitter:description', DESCRIPTION)
    return resetSEO
  }, [])

  return (
    <section className="pt-32 pb-10 md:pt-44 md:pb-16 bg-white">
      <div className="container-premium">
        <div className="max-w-3xl mb-8 md:mb-10">
          <p className="mb-3 flex items-center gap-3 text-brand-600 text-sm font-medium tracking-[0.2em] uppercase">
            <img src="/images/petra-vision-icon.webp" alt="" width="40" height="40" className="h-10 w-10" />
            Petra VISION · Simulator inteligent de pavaje
          </p>
          <h1 className="heading-h1 text-charcoal-900 mb-4">Vezi pavajul în curtea ta</h1>
          <p className="text-body-lg text-charcoal-600">
            Încarcă o fotografie, marchează zona și alege pavajul. În câteva secunde vezi cum ar arăta curtea ta cu un produs Petra
            Pavaje.
          </p>
        </div>
        <PavingVisualizer />
      </div>
    </section>
  )
}
