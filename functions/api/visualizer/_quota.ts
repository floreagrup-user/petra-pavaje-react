// Daily allowance for the paving visualizer, kept in the existing D1
// database. Rules (all reset at midnight Romanian time):
//   - no account and no email: 2 images per IP address;
//   - at most 140 images for the whole site, counted from 00:00 to 23:59.
// Only a salted SHA-256 hash of the IP is stored, never the address itself,
// and counters older than two days are removed.

import { DAILY_LIMIT, GLOBAL_DAILY_CAP } from '../../../src/components/visualizer/consent-texts'

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS visualizer_quota (
    day TEXT NOT NULL,
    subject TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (day, subject)
  )`,
  `CREATE TABLE IF NOT EXISTS visualizer_consents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    subject TEXT NOT NULL,
    purpose TEXT NOT NULL,
    version TEXT NOT NULL,
    text_sha256 TEXT NOT NULL,
    withdrawn_at TEXT
  )`,
]

export interface VisualizerEnv {
  NEWSLETTER_DB?: any
  VISUALIZER_SALT?: string
  VISUALIZER_DAILY_LIMIT?: string
  VISUALIZER_GLOBAL_DAILY_CAP?: string
}

function positive(value: string | undefined, fallback: number): number {
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback
}

export function limits(env: VisualizerEnv) {
  return {
    daily: positive(env.VISUALIZER_DAILY_LIMIT, DAILY_LIMIT),
    global: positive(env.VISUALIZER_GLOBAL_DAILY_CAP, GLOBAL_DAILY_CAP),
  }
}

// The allowance resets at midnight Romanian time, not UTC.
export function bucharestDay(offsetDays = 0): string {
  const d = new Date(Date.now() + offsetDays * 86_400_000)
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Bucharest' }).format(d)
}

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

// Salted hash of an IP address or email. The salt is a Worker secret, so the
// hashes cannot be reversed by trying every IP or a list of addresses.
export function hashValue(env: VisualizerEnv, kind: 'ip' | 'email', value: string): Promise<string> {
  return sha256Hex(`${env.VISUALIZER_SALT || 'petra-visualizer'}:${kind}:${value}`)
}

export function clientIp(request: Request): string {
  return request.headers.get('CF-Connecting-IP') || '127.0.0.1'
}

const ready = new WeakSet<object>()
export async function ensureSchema(db: any) {
  if (ready.has(db)) return
  await db.batch(SCHEMA.map((sql) => db.prepare(sql)))
  ready.add(db)
}

async function count(db: any, day: string, subject: string): Promise<number> {
  const row = await db.prepare('SELECT count FROM visualizer_quota WHERE day = ? AND subject = ?').bind(day, subject).first()
  return (row?.count as number | undefined) ?? 0
}

// Adds one to a counter only while it is below `limit`, in one statement, so
// two parallel requests cannot both take the last image.
export async function take(db: any, day: string, subject: string, limit: number): Promise<boolean> {
  if (limit <= 0) return false
  const row = await db
    .prepare(
      `INSERT INTO visualizer_quota (day, subject, count) VALUES (?, ?, 1)
       ON CONFLICT(day, subject) DO UPDATE SET count = count + 1 WHERE count < ?
       RETURNING count`,
    )
    .bind(day, subject, limit)
    .first()
  return Boolean(row)
}

async function give(db: any, day: string, subject: string) {
  await db.prepare('UPDATE visualizer_quota SET count = MAX(count - 1, 0) WHERE day = ? AND subject = ?').bind(day, subject).run()
}

// Housekeeping, run now and then from a request: day counters after two
// days, consent records three years after they were given (the general
// limitation period in Romanian civil law, art. 2517 Cod civil).
export async function cleanup(db: any) {
  const now = Date.now()
  const threeYearsAgo = new Date(now - 3 * 365 * 86_400_000).toISOString()
  await db.batch([
    db.prepare('DELETE FROM visualizer_quota WHERE day < ?').bind(bucharestDay(-2)),
    db.prepare('DELETE FROM visualizer_consents WHERE COALESCE(withdrawn_at, created_at) < ?').bind(threeYearsAgo),
  ])
}

export interface Identity {
  ipHash: string
}

export interface QuotaStatus {
  limit: number
  remaining: number
}

export async function quotaStatus(env: VisualizerEnv, who: Identity): Promise<QuotaStatus> {
  const db = env.NEWSLETTER_DB
  await ensureSchema(db)
  const limit = limits(env).daily
  const used = await count(db, bucharestDay(), `ip:${who.ipHash}`)
  return { limit, remaining: Math.max(limit - used, 0) }
}

export type Reservation =
  | { ok: true; release: () => Promise<void> }
  | { ok: false; reason: 'global-cap' | 'daily-limit' }

// Takes one image from today's allowance before the (paid) model call.
// release() gives it back when the call fails, so errors never cost a try.
export async function reserve(env: VisualizerEnv, who: Identity): Promise<Reservation> {
  const db = env.NEWSLETTER_DB
  await ensureSchema(db)
  if (Math.random() < 0.1) await cleanup(db)

  const day = bucharestDay()
  const l = limits(env)
  if (!(await take(db, day, 'global', l.global))) return { ok: false, reason: 'global-cap' }
  const subject = `ip:${who.ipHash}`
  if (!(await take(db, day, subject, l.daily))) {
    await give(db, day, 'global')
    return { ok: false, reason: 'daily-limit' }
  }
  return {
    ok: true,
    release: async () => {
      await give(db, day, subject)
      await give(db, day, 'global')
    },
  }
}
