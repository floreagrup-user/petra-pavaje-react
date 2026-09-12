// Maps a product/category "slug" (as used throughout the data files and
// components) to its real URL segment. Most categories use the same
// string for both; a handful keep the original WordPress slug (with its
// "-2"/"-3" suffix) at the URL level so the new site's routes match the
// old WordPress site exactly -- no redirect hop, same link for bookmarks,
// backlinks and Google Ads destination URLs.
const CATEGORY_PATH_OVERRIDES: Record<string, string> = {
  woodstone: 'woodstone-lemn-pietrificat',
  borduri: 'borduri-2',
  garduri: 'garduri-2',
  jardiniere: 'jardiniere-2',
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
