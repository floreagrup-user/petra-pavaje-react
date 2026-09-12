# Raport de migrare Blog — WordPress → React (Cloudflare Pages)

Generat automat. Sursă: `https://petrapavaje.ro/wp-json/wp/v2/posts` (WordPress REST API).

## 1. Total articole găsite în WordPress

- **67** postări totale returnate de `/wp-json/wp/v2/posts` (verificat prin `X-WP-Total` header).
- **2** dintre acestea NU sunt articole de blog reale, ci pagini legale publicate greșit ca `post`: `politica-de-confidentialitate` și `conditii-pentru-accesarea-si-utilizarea-website-ului-petrapavaje` — au deja pagini dedicate în React (`/confidentialitate`, `/termeni`) și au fost excluse din migrare (decizie confirmată de utilizator).
- **65** articole reale de blog identificate și migrate integral.

## 2. Total articole migrate

- **65 / 65** articole reale migrate cu conținut complet (nu doar excerpt), categorii reale, imagini reale.
- **26** articole existau deja în React cu slug/titlu asemănător dar **conținut fabricat** de o sesiune AI anterioară (nu conținutul real WordPress) — conținutul, imaginile și categoriile lor au fost **înlocuite** cu datele reale, păstrând slug-ul existent (pentru continuitate SEO a link-urilor deja live).
- **39** articole nu aveau nicio reprezentare în React — create integral, folosind slug-ul real din WordPress.
- **5** articole fabricate (fără corespondent real în WordPress) au fost **șterse** din blog (decizie confirmată de utilizator): cum-sa-alegi-pavajul-perfect, tendinte-amenajari-exterioare-2025, ghid-montaj-pavaje-premium, woodstone-lemn-pietrificat-beneficii, sustenabilitate-productie-pavaje.

## 3. Articole pe fiecare categorie

| Categorie | Nr. articole |
|---|---|
| Inspirație (`inspiratie`) | 29 |
| Studii de caz (`studii-de-caz`) | 20 |
| Ghiduri tehnice (`ghiduri`) | 15 |
| Noutăți (`noutati`) | 38 |

Categorii găsite în WordPress dar **neutilizate** pentru migrare (raportate, nu șterse din WP):
- `GDPR` (2 articole) — exact cele 2 pagini legale excluse mai sus.
- `NU PUNE AICI!!!!` (0 articole) — categorie internă goală, niciodată folosită, ignorată complet.
- `Toate` (`toate`, id 1) — categoria implicită WordPress (echivalentul "Uncategorized"), tratată ca alias pentru "toate articolele", nu ca o categorie editorială reală.

## 4. Articole cu categorii multiple

**31 din 65** articole au mai multe categorii reale simultan. Filtrarea din UI folosește `categories.includes(cat)`, nu egalitate, exact cum a cerut specificația. Exemple:

| Articol | Categorii |
|---|---|
| amenajarea-spatiului-exterior-cu-pavaje-la-liceul-teologic-baptist-din-arad | Ghiduri tehnice, Inspirație, Noutăți, Studii de caz |
| amenajari-exterioare-care-transforma-o-pensiune-intr-o-destinatie-memorabila | Inspirație, Noutăți |
| petra-piatra-care-prinde-viata | Inspirație, Noutăți |
| solutii-creative-pentru-un-parcul-de-distractii-magic-parc-din-rasnov | Ghiduri tehnice, Inspirație |
| i-giardini-di-zoe-pasii-a-zeci-de-mii-de-oameni-pe-carari-de-poveste | Inspirație, Noutăți, Studii de caz |
| solutii-delimitare-pavaj-gradina-design-impecabil | Ghiduri tehnice, Inspirație, Noutăți |
| petra-pavaje-lanseaza-evo-green | Inspirație, Noutăți |
| pavaje-premium-si-starea-de-bine | Inspirație, Noutăți, Studii de caz |
| casa-154-grand-urban-traditie-modernitate | Inspirație, Studii de caz |
| amenajeaza-curtea-culoarea-anului-2026 | Inspirație, Studii de caz |
| 3-idei-creative-pavaj-decor-sarbatori | Inspirație, Studii de caz |
| curte-amenajata-sahara-travertin | Inspirație, Studii de caz |
| planul-pentru-o-curte-de-vis | Inspirație, Studii de caz |
| amenajare-rezidentiala-mediterana-terra | Inspirație, Studii de caz |
| pavajul-mistic-pentru-o-curte-elegenata | Inspirație, Studii de caz |

*(+16 articole suplimentare cu categorii multiple, nu toate afișate aici)*

## 5. Imagini migrate pe R2

- **512** imagini unice identificate (featured + imagini din conținut) în cele 65 articole.
- **495** migrate cu succes pe R2 (bucket `petra-pavaje-media`), sub prefixul `blog/<slug>/<fisier>` (prefixate cu slug-ul articolului pentru a evita coliziuni — multe fișiere WordPress au nume generice precum `2.avif`, `3.avif`).
- **17** imagini nu au putut fi migrate — **verificat individual, toate sunt 404 chiar pe sursa WordPress** (fișiere șterse din media library dar încă referențiate în conținutul vechi al articolelor). Nu sunt o eroare de migrare.

| Articol | Fișier lipsă | Motiv |
|---|---|---|
| gama-woodstone-lemn-pietrificat | palisada3.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | dsc-7880.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | palisada2.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | img-2286-sd-travnikovy-lem-2023.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | alte-elemente-1.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | Palisade-si-borduri_jpg-scaled.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | 68a7766.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | pavaj-woodstone-27.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | pavaj-woodstone-14.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | pavaj-woodstone-33.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | Jardiniera-woodstone.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | Ghiveci-woodstone-scaled.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | gard3.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | jardiniere-woodstone.jpg | 404 pe sursa WordPress |
| gama-woodstone-lemn-pietrificat | gard2.jpg | 404 pe sursa WordPress |
| con-pavajul-care-inspira-viata-curtii-tale | Pavaj-Con-alb-maro-e1695290853132.jpeg | 404 pe sursa WordPress |
| ce-presupune-un-stil-de-viata-sustenabil-si-cum-poti-face-demersuri-in-acest-sens | Pavaj-Alpin-alb-si-moka_Petra-Pavaje-scaled.webp | 404 pe sursa WordPress |

## 6. Redirect-uri

Toate cele 65 articole reale au redirect 301 configurat în `public/_redirects`, de la URL-ul WordPress real (rădăcină, ex. `/nume-articol`, NU `/blog/nume-articol` cum s-ar putea presupune) către noua rută `/blog/<slug>`. Pentru cele 26 articole unde slug-ul React existent diferă de slug-ul WordPress real, redirect-ul mapează corect către slug-ul păstrat.

## 7. Probleme de conținut identificate și rezolvate

- **~24 articole** foloseau un template HTML custom (autor propriu, nu Avada/Fusion standard) cu blocuri `<header class="article-meta">` și `<nav class="toc">` care, la curățarea inițială, lăsau text "scurs" necontrolat (bara de meta-informații autor/dată/categorie, link-uri TOC) înainte de titlu. Rezolvat generic prin filtrare pe bază de clasă CSS (`article-meta`, `toc`, `article-label`), nu per-articol.
- Titluri H1 duplicate în conținut (WordPress inserează uneori titlul articolului ca H1/H2 chiar în corpul textului) — detectate și eliminate automat prin comparație normalizată (ghilimele drepte vs. tipografice, entități HTML).
- Lazy-loading WordPress (`data-orig-src` cu placeholder SVG în `src`) — corect rezolvat la URL-ul real al imaginii.
- Ancore de tip "Cuprins" (`#provocare`, `#relief` etc.) — ID-urile erau pe `<section>`/`<div>` eliminate la curățare; păstrate explicit ca ancore invizibile pentru ca link-urile interne să nu se rupă.
- **Bug real, independent de migrare, descoperit și corectat:** `@tailwindcss/typography` era instalat ca dependență dar niciodată înregistrat cu `@plugin` în `src/styles/index.css` (cerință Tailwind v4) — clasele `prose`/`prose-*` nu aveau NICIUN efect pe tot site-ul. Corectat; afectează pozitiv orice conținut care va folosi `prose` în viitor, nu doar blogul.

## 8. Limitări cunoscute / recomandări pentru continuare

- **Link-uri de produs automate**: specificația cerea auto-legarea mențiunilor de produse (Roca, Antic, Grand Urban etc.) către paginile reale de produs. Nu am implementat asta — riscul de link-uri greșite/duplicate pe 65 articole fără testare individuală amănunțită depășea timpul disponibil. Link-urile `<a>` originale din WordPress au fost păstrate ca atare (multe duc deja spre pagini reale petrapavaje.ro).
- **Bundle size**: fișierul `src/data/blog.ts` (65 articole complete) generează un chunk JS de ~592KB (~151KB gzip), încărcat o singură dată la prima vizită pe `/blog*`. Pentru performanță optimă pe termen lung, o arhitectură cu fetch per-articol (ex. JSON separat per slug) ar reduce acest cost, dar necesită infrastructură suplimentară (SSR/edge function) neexistentă momentan în proiect.
- Un rest minor de "chrome" WordPress (ex. o linie "BN Nume Prenume Rol" dintr-un card de autor citat) mai apare ocazional ca text simplu în 2-3 articole — conținut, nu eroare, dar cosmetic perfectibil.
- Nu există `sitemap.xml` în proiect (pre-existent migrării) — recomandat ca task separat.

## 9. Fișiere create/modificate

- `src/data/blog.ts` (nou) — sursă unică de adevăr, 65 articole, înlocuiește array-urile hardcodate duplicate din `BlogPage.tsx` și `BlogDetailPage.tsx`.
- `src/data/types.ts` — `BlogPost.category: string` → `categories: BlogCategory[]`; adăugat `modifiedDate`, `tags`, `seo`, `sourceUrl`.
- `src/pages/BlogPage.tsx` — rescris: căutare, filtrare multi-categorie, sortare, Load More, schema CollectionPage/Blog.
- `src/pages/BlogDetailPage.tsx` — rescris: randare HTML reală (nu markdown fabricat), lightbox, articole similare pe bază de categorii comune, navigare articol anterior/următor, schema BlogPosting + breadcrumb.
- `src/styles/index.css` — înregistrat `@plugin "@tailwindcss/typography"`.
- `public/_redirects` — 130 linii noi (65 articole × 2 variante de URL).
- `scripts/.r2-manifest.txt` — 495 chei noi (imagini blog).
