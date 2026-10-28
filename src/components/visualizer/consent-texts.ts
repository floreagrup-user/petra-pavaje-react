// The exact wording a client agrees to in the paving visualizer. The page
// shows these strings and the server stores the version plus a SHA-256 of
// the text with every consent, so what was agreed can be proven later
// (GDPR art. 7(1)). Change any text -> bump CONSENT_VERSION.

export const CONSENT_VERSION = '2026-10-27'

// Images per IP address and day, with no account or email needed.
export const DAILY_LIMIT = 2
// Whole site, per calendar day in Romanian time (00:00 to 23:59).
export const GLOBAL_DAILY_CAP = 140

export const CONSENT_TEXTS = {
  photo:
    'Sunt de acord ca fotografia încărcată de mine să fie transmisă unui furnizor extern de servicii de inteligență artificială, posibil în afara Spațiului Economic European, cu garanțiile prevăzute de GDPR, doar pentru generarea imaginii, conform informării de mai sus.',
  age: 'Confirm că am cel puțin 16 ani și că am dreptul să folosesc fotografia încărcată.',
  // Optional and separate from the service: the visualizer works the same
  // whether or not this is ticked (GDPR art. 7(4)).
  newsletter:
    'Vreau să primesc newsletterul Petra Pavaje pe email, cu idei de amenajări, proiecte realizate și oferte la pavaje. Mă pot dezabona oricând, cu un click.',
} as const

export type ConsentPurpose = keyof typeof CONSENT_TEXTS
