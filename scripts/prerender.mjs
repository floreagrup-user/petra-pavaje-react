// Build-time prerendering: renders every real route with a headless browser
// and writes the resulting HTML (real <title>/<meta>/<link canonical> and
// real page content, not the generic shell) into dist/<route>/index.html.
// Cloudflare Pages serves a literal file match before it even consults
// _redirects, so this does not touch routing/redirect config at all --
// deliberately, after today's _redirects incident.
//
// Client-side navigation is completely unaffected: React still hydrates and
// takes over exactly as before. This only changes what a fresh HTTP GET (a
// crawler, or a hard reload) sees as the *initial* HTML.
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { join, extname } from 'node:path'
import puppeteer from 'puppeteer'

const DIST = join(process.cwd(), 'dist')
const PORT = 45123
const PROD_ORIGIN = 'https://petrapavaje.ro'
const LOCAL_ORIGIN = `http://localhost:${PORT}`

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
}

function readRoutesFromSitemap() {
  const xml = readFileSync(join(DIST, 'sitemap.xml'), 'utf8')
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  return locs.map((url) => new URL(url).pathname)
}

function startServer() {
  const server = createServer((req, res) => {
    const urlPath = req.url.split('?')[0]
    const filePath = join(DIST, decodeURIComponent(urlPath))
    const hasExt = extname(urlPath) !== ''
    const target = hasExt && existsSync(filePath) && statSync(filePath).isFile() ? filePath : join(DIST, 'index.html')
    const ext = extname(target)
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream')
    res.end(readFileSync(target))
  })
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)))
}

async function main() {
  const routes = readRoutesFromSitemap()
  console.log(`Prerendering ${routes.length} routes...`)

  const server = await startServer()
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })

  let ok = 0
  for (const route of routes) {
    const page = await browser.newPage()
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 })
      await page.waitForFunction(() => !document.body.innerText.includes('Se încarcă'), { timeout: 15000 }).catch(() => {})
      await new Promise((r) => setTimeout(r, 300))
      const rawHtml = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML)
      // useProductSEO/useCategoryListSEO/etc. build canonical/og:url/JSON-LD
      // hrefs from window.location.origin, which is the local preview
      // server during prerendering -- rewrite to the real production
      // origin so non-JS crawlers don't see a localhost canonical.
      const html = rawHtml.split(LOCAL_ORIGIN).join(PROD_ORIGIN)

      const outDir = route === '/' ? DIST : join(DIST, route)
      mkdirSync(outDir, { recursive: true })
      writeFileSync(join(outDir, 'index.html'), html)
      ok++
    } catch (err) {
      console.error(`FAILED ${route}: ${err.message}`)
    } finally {
      await page.close().catch(() => {})
    }
  }

  await browser.close()
  server.close()
  console.log(`Prerendered ${ok}/${routes.length} routes.`)
  if (ok < routes.length) process.exitCode = 1
}

main()
