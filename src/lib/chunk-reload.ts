// Every deploy renames the JS chunks (HomePage-<hash>.js) and the server only
// keeps the current ones. A tab opened before a deploy still points at the old
// names, so its next lazy page load gets a 404. Reloading fetches the new
// index.html with the new names. The timestamp guard stops a reload loop if
// the chunk is missing for another reason.

const KEY = 'pp-chunk-reload-at'
const GUARD_MS = 30_000

export function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? '')
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS/i.test(message)
}

// Returns true when a reload was started.
export function reloadForNewVersion(): boolean {
  try {
    const last = Number(sessionStorage.getItem(KEY) || 0)
    if (Date.now() - last < GUARD_MS) return false
    sessionStorage.setItem(KEY, String(Date.now()))
  } catch {
    // storage blocked: no guard against a loop, so leave it to the error page button
    return false
  }
  window.location.reload()
  return true
}

// Vite fires this when a preload of a lazy chunk fails.
export function installChunkReload() {
  window.addEventListener('vite:preloadError', (event) => {
    if (reloadForNewVersion()) event.preventDefault()
  })
}
