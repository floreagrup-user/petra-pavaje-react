# Calculator Pavaj — documentație tehnică

Implementare: sesiunea din 2026-09-14. Sursă de date: `Nomenclator produse -
2026_actualizat.xlsx` (546 poziții, analizat pentru a confirma ce câmpuri
sunt disponibile per categorie -- vezi "Sursele datelor" mai jos).

## Unde se află codul

```
src/lib/calculator/          Motor de calcul pur (fără React)
  types.ts                   CalculatorVariant, CalculatorProduct, rezultate
  calculatePaving.ts          Suprafață -> bucăți -> paleți -> comercial
  calculateLinear.ts          Lungime (ml) -> bucăți -> paleți -> comercial
  calculateShapes.ts          Geometrie: dreptunghi, pătrat, triunghi, cerc, semicerc
  formatters.ts               Formatare ro-RO pentru afișare

src/data/calculator/
  catalog.ts                  Adaptor: normalizează products.ts / elements.ts /
                               woodstone.ts într-un CalculatorProduct[] unic

src/components/calculator/
  PavingCalculator.tsx         Orchestrator: zone, produs, pierderi, rezultate
  ProductPicker.tsx            Categorie -> produs -> format, cu căutare
  AreaZoneInput.tsx             O zonă de suprafață (formă + dimensiuni)
  LinearElementsSection.tsx    Borduri / garduri / palisadă / bloc de zid / treaptă
  ResultCard.tsx                Cardul vizual de rezultat (suprafață și liniar)
  CalculatorCTA.tsx             Ofertă / telefon / WhatsApp
  PrintSummary.tsx              Layout ascuns, vizibil doar la print (export PDF)

src/pages/CalculatorPavajPage.tsx   Pagina /calculator-pavaj (SEO, FAQ, breadcrumb)
```

## Cum se face un calcul

Nu se ating direct `products.ts`/`elements.ts`/`woodstone.ts` din componente.
Totul trece prin `catalog.ts`, care produce un `CalculatorVariant` uniform:

```ts
interface CalculatorVariant {
  saleMode: 'area' | 'area-mix' | 'linear' | 'piece'
  piecesPerM2?: number   // doar saleMode === 'area'
  piecesPerMl?: number   // doar saleMode === 'linear'
  piecesPerPallet?: number
  kgPerPallet?: number
  unitPerPallet?: number // m²/palet ('area'/'area-mix') sau ml/palet ('linear')
  hasFullData: boolean   // false => calculatorul afișează mesajul de fallback
}
```

`calculatePavingRequirement()` / `calculateLinearRequirement()` din
`src/lib/calculator/` sunt funcții pure -- pot fi testate independent de UI
(vezi "Teste efectuate" în raportul final).

## Cum se adaugă un produs nou

Nu se adaugă nimic în `src/data/calculator/`. Se adaugă produsul (sau
formatul) direct în sursa lui reală:

- Pavaj Premium/Standard/Borduri -> `src/data/products.ts`, câmpul
  `dimensionsList`
- Garduri/Palisadă/Treaptă/Bloc de zid/Jardiniere -> `src/data/elements.ts`,
  `variantGroups[].variants[]`
- Woodstone -> `src/data/woodstone.ts`, `variantGroups[].variants[]`

`catalog.ts` îl preia automat la următorul build/reload -- nu e nevoie de
nicio modificare a calculatorului.

## Cum se modifică formulele

Modifică direct `src/lib/calculator/calculatePaving.ts` sau
`calculateLinear.ts`. Sunt funcții pure, fără stare, fără React -- orice
schimbare de formulă se verifică izolat.

## Cum se adaugă prețurile mai târziu

Structura de date suportă deja `price`/`priceUnit`/`currency` ca extensie
opțională pe `CalculatorVariant` -- nu există încă pentru că datele oficiale
de preț nu sunt disponibile în proiect (calculatorul afișează în schimb
mesajul "Prețul se calculează în funcție de oferta comercială"). Când
prețurile devin disponibile: se adaugă câmpurile opționale în
`src/lib/calculator/types.ts`, se populează în `catalog.ts` din sursa reală
de preț, apoi se afișează în `ResultCard.tsx`/`PrintSummary.tsx`.

## Cum funcționează preselecția prin URL

`PavingCalculator.tsx` citește `useSearchParams()` o singură dată la montare:

| Parametru | Efect |
|---|---|
| `?product=<slug>` | Preselectează produsul (și primul lui format) în calculatorul de suprafață |
| `?product=<slug>&format=<label sau id>` | Preselectează și formatul exact |
| `?category=<premium\|standard\|woodstone>` | Preselectează tab-ul de categorie din ProductPicker |
| `?linear=<slug>` | Activează secțiunea "Borduri și delimitări" cu acel produs preselectat |

`<slug>` este slug-ul real din `products.ts`/`elements.ts`/`woodstone.ts`
(același folosit în URL-ul paginii de produs).
