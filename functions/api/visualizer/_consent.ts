// The consent log for the paving visualizer. The email address itself is
// never stored here: a newsletter consent is filed under a salted hash.

import { CONSENT_TEXTS, CONSENT_VERSION, type ConsentPurpose } from '../../../src/components/visualizer/consent-texts'
import { ensureSchema, sha256Hex, type VisualizerEnv } from './_quota'

// Stores one row per consent: who (hash), what (purpose), which wording
// (version + SHA-256 of the exact text shown) and when.
export async function recordConsents(env: VisualizerEnv, subject: string, purposes: ConsentPurpose[]) {
  const db = env.NEWSLETTER_DB
  await ensureSchema(db)
  const now = new Date().toISOString()
  const rows = await Promise.all(
    purposes.map(async (purpose) =>
      db
        .prepare('INSERT INTO visualizer_consents (created_at, subject, purpose, version, text_sha256) VALUES (?, ?, ?, ?, ?)')
        .bind(now, subject, purpose, CONSENT_VERSION, await sha256Hex(CONSENT_TEXTS[purpose])),
    ),
  )
  await db.batch(rows)
}
