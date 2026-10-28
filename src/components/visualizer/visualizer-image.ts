// Canvas helpers for the paving visualizer. Everything here runs in the
// browser: the client's photo is resized and marked locally, and only the
// resulting JPEGs are sent to /api/visualizer/generate.

export interface Point {
  x: number // 0..1, share of the photo width
  y: number // 0..1, share of the photo height
}

export interface PreparedPhoto {
  url: string // object URL of the resized JPEG, for display
  base64: string
  width: number
  height: number
}

const PHOTO_MAX_SIDE = 1536
const REF_MAX_SIDE = 768

function drawToCanvas(source: CanvasImageSource, width: number, height: number, maxSide: number) {
  const scale = Math.min(1, maxSide / Math.max(width, height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(width * scale)
  canvas.height = Math.round(height * scale)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('canvas-unavailable')
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height)
  return canvas
}

function toBase64(canvas: HTMLCanvasElement, quality = 0.88): string {
  return canvas.toDataURL('image/jpeg', quality).split(',')[1]
}

function canvasToBlob(canvas: HTMLCanvasElement, quality = 0.88): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode-failed'))), 'image/jpeg', quality),
  )
}

// Phone photos carry their rotation in EXIF; "from-image" applies it so the
// photo is not sent sideways.
export async function preparePhoto(file: File): Promise<PreparedPhoto> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  const canvas = drawToCanvas(bitmap, bitmap.width, bitmap.height, PHOTO_MAX_SIDE)
  bitmap.close()
  const blob = await canvasToBlob(canvas)
  return { url: URL.createObjectURL(blob), base64: toBase64(canvas), width: canvas.width, height: canvas.height }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('image-load-failed'))
    img.src = src
  })
}

// Product photos live on the public R2 bucket, which sends no CORS headers;
// they are read through the same-origin proxy so the canvas stays readable.
// Decoding in the browser also turns AVIF into JPEG, which the model accepts.
// Product photos carry the Petra logo in the top corner and a caption along
// the bottom; with `trimBanners` those bands are cut off, because the model
// otherwise copied the caption text into the client's yard.
const BANNER_SHARE = 0.12

export async function prepareReference(r2Url: string, trimBanners = false): Promise<string> {
  // Keep the folder part: some photos live under paths such as 2020/06/.
  const file = new URL(r2Url).pathname.replace(/^\//, '')
  const res = await fetch(`/api/visualizer/image?src=${encodeURIComponent(file)}`)
  if (!res.ok) throw new Error('reference-failed')
  const blob = await res.blob()
  let bitmap = await createImageBitmap(blob)
  if (trimBanners) {
    const cut = Math.round(bitmap.height * BANNER_SHARE)
    const trimmed = await createImageBitmap(blob, 0, cut, bitmap.width, bitmap.height - 2 * cut)
    bitmap.close()
    bitmap = trimmed
  }
  const canvas = drawToCanvas(bitmap, bitmap.width, bitmap.height, REF_MAX_SIDE)
  bitmap.close()
  return toBase64(canvas, 0.85)
}

function tracePolygon(ctx: CanvasRenderingContext2D, points: Point[], width: number, height: number) {
  ctx.beginPath()
  points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x * width, p.y * height) : ctx.lineTo(p.x * width, p.y * height)))
  ctx.closePath()
}

// The same photo with the chosen zone covered in solid magenta. The model
// sees only this image, never the original ground: when the old paving
// showed through, it kept its pattern (herringbone instead of Unda waves).
export async function markZone(photo: PreparedPhoto, points: Point[]): Promise<string> {
  const img = await loadImage(photo.url)
  const canvas = drawToCanvas(img, photo.width, photo.height, PHOTO_MAX_SIDE)
  const ctx = canvas.getContext('2d')!
  tracePolygon(ctx, points, canvas.width, canvas.height)
  ctx.fillStyle = 'rgb(255, 0, 255)'
  ctx.fill()
  return toBase64(canvas)
}

// Pastes the model's output back onto the original photo inside the zone
// only, with a soft edge, so nothing outside the zone can change.
export async function compositeIntoZone(photo: PreparedPhoto, resultUrl: string, points: Point[]): Promise<string> {
  const [original, result] = await Promise.all([loadImage(photo.url), loadImage(resultUrl)])
  const { width, height } = photo

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(original, 0, 0, width, height)

  const layer = document.createElement('canvas')
  layer.width = width
  layer.height = height
  const lctx = layer.getContext('2d')!
  const feather = Math.max(2, Math.round(width / 400))
  lctx.filter = `blur(${feather}px)`
  tracePolygon(lctx, points, width, height)
  lctx.fillStyle = '#fff'
  lctx.fill()
  lctx.filter = 'none'
  lctx.globalCompositeOperation = 'source-in'
  lctx.drawImage(result, 0, 0, width, height)

  ctx.drawImage(layer, 0, 0)
  labelAsAi(ctx, width, height)
  return canvas.toDataURL('image/jpeg', 0.92)
}

// Visible notice burnt into the image, so it stays recognisable as
// AI-generated wherever it is shared (EU AI Act art. 50(4)).
const AI_LABEL = 'Imagine generată cu AI, orientativă · petrapavaje.ro'

function labelAsAi(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const size = Math.max(12, Math.round(width / 70))
  const pad = Math.round(size * 0.6)
  ctx.font = `600 ${size}px system-ui, -apple-system, 'Segoe UI', sans-serif`
  const textWidth = Math.min(ctx.measureText(AI_LABEL).width, width - 4 * pad)
  const boxH = size + 2 * pad
  const x = pad
  const y = height - pad - boxH
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
  ctx.beginPath()
  ctx.roundRect(x, y, textWidth + 2 * pad, boxH, Math.round(size / 3))
  ctx.fill()
  ctx.fillStyle = '#fff'
  ctx.textBaseline = 'middle'
  ctx.fillText(AI_LABEL, x + pad, y + boxH / 2, textWidth)
}
