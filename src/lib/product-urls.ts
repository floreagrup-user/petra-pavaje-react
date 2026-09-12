// Maps a product/category "slug" (as used throughout the data files and
// components) to its real URL segment. Almost every category uses the
// same string for both. "woodstone" is the one legitimate exception --
// its real name is longer than the internal id ("woodstone-lemn-pietrificat").
//
// Note: WordPress's own /borduri-2/, /garduri-2/ and /jardiniere-2/ URLs
// carried a "-2" suffix too, but that was a WordPress duplicate-slug
// artifact (the page title never included it), not a real distinguishing
// name -- so the new site (like the corrected Google Ads destination
// URLs) drops it and uses the clean /borduri/, /garduri/, /jardiniere/.
const CATEGORY_PATH_OVERRIDES: Record<string, string> = {
  woodstone: 'woodstone-lemn-pietrificat',
}

export function categoryPath(slug: string): string {
  return CATEGORY_PATH_OVERRIDES[slug] ?? slug
}

export function categoryUrl(slug: string): string {
  return `/${categoryPath(slug)}`
}

export function productUrl(categorySlug: string, productSlug: string): string {
  // Quatro variants (quatro-10x10x6, quatro-smart-..., etc.) live one
  // level deeper, under pavaje-standard/quatro/, matching both the old
  // WordPress URL and the site's own Quatro hub page.
  if (categorySlug === 'pavaje-standard' && productSlug.startsWith('quatro-')) {
    return `/pavaje-standard/quatro/${productSlug}`
  }
  return `/${categoryPath(categorySlug)}/${productSlug}`
}
