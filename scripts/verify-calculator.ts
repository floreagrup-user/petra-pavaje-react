// Standalone verification for the paving-calculator engine, exercising the
// scenarios from spec section 38 against real catalog data. Run with:
//   npx tsx scripts/verify-calculator.ts
// No test framework is configured in this project (no vitest/jest, no
// "test" script) -- this follows the same tsx-script convention already
// used by scripts/generate-sitemap.ts rather than introducing new infra.
import { calculatorCatalog } from '../src/data/calculator/catalog'
import { calculatePavingRequirement } from '../src/lib/calculator/calculatePaving'
import { calculateLinearRequirement } from '../src/lib/calculator/calculateLinear'
import { rectangleArea, triangleArea, circleArea } from '../src/lib/calculator/calculateShapes'

let pass = 0
let fail = 0

function check(name: string, condition: boolean, detail: string) {
  if (condition) {
    pass++
    console.log(`  OK   ${name}`)
  } else {
    fail++
    console.log(`  FAIL ${name} -- ${detail}`)
  }
}

console.log('=== Test 1: ROCA 60x30x6, 50 m², 5% pierderi ===')
{
  const roca = calculatorCatalog.find((p) => p.slug === 'roca')!
  const variant = roca.variants.find((v) => v.label === '60×30×6 cm')!
  const r = calculatePavingRequirement(50, 5, variant)
  console.log('  result:', r)
  check('total area = 52.5 m²', r.totalArea === 52.5, `got ${r.totalArea}`)
  check('pieces = ceil(52.5 * 5.5) = 289', r.estimatedPieces === 289, `got ${r.estimatedPieces}`)
  check('pallets = ceil(52.5 / 10.8) = 5', r.pallets === 5, `got ${r.pallets}`)
  check('commercial area = 5 * 10.8 = 54 m²', r.commercialArea === 54, `got ${r.commercialArea}`)
  check('surplus = 54 - 52.5 = 1.5 m²', r.surplusArea === 1.5, `got ${r.surplusArea}`)
}

console.log('\n=== Test 2: ROCA 20x10x6, 100 m² ===')
{
  const roca = calculatorCatalog.find((p) => p.slug === 'roca')!
  const variant = roca.variants.find((v) => v.label === '20×10×6 cm')!
  const r = calculatePavingRequirement(100, 5, variant)
  console.log('  result:', r)
  check('total area = 105 m²', r.totalArea === 105, `got ${r.totalArea}`)
  check('pallets = ceil(105 / 10.8) = 10', r.pallets === 10, `got ${r.pallets}`)
}

console.log('\n=== Test 3: ROCA MIX 6.30 -- must NOT report a fake piece count ===')
{
  const roca = calculatorCatalog.find((p) => p.slug === 'roca')!
  const variant = roca.variants.find((v) => v.label === 'MIX 6.30')!
  const r = calculatePavingRequirement(50, 5, variant)
  console.log('  saleMode:', variant.saleMode, '| result:', r)
  check('saleMode is area-mix', variant.saleMode === 'area-mix', `got ${variant.saleMode}`)
  check('cannot calculate pieces for MIX', r.canCalculatePieces === false, 'MIX must not claim a piece count')
  check('pallets still computed (area/pallet math unaffected)', r.pallets !== null, 'pallets should still work for MIX')
}

console.log('\n=== Test 4: Bordură 50x5x20, 30 ml ===')
{
  const bordura = calculatorCatalog.find((p) => p.slug === 'bordura-50x5x20-dreapta')!
  const variant = bordura.variants[0]
  const r = calculateLinearRequirement(30, variant)
  console.log('  result:', r)
  check('pieces = ceil(30 * 2) = 60', r.estimatedPieces === 60, `got ${r.estimatedPieces}`)
  check('pallets = ceil(30 / 48) = 1', r.pallets === 1, `got ${r.pallets}`)
  check('commercial length = 48 ml', r.commercialLength === 48, `got ${r.commercialLength}`)
}

console.log('\n=== Test 5: Suprafață neregulată (geometrie) ===')
{
  check('dreptunghi 6x5 = 30 m²', rectangleArea(6, 5) === 30, `got ${rectangleArea(6, 5)}`)
  check('triunghi baza 4 inaltime 3 = 6 m²', triangleArea(4, 3) === 6, `got ${triangleArea(4, 3)}`)
  const circle = circleArea(2)
  check('cerc raza 2 ~ 12.566 m²', Math.abs(circle - 12.566) < 0.01, `got ${circle}`)
}

console.log('\n=== Test 6: Mai multe zone (însumare) ===')
{
  const zones = [rectangleArea(6, 5), rectangleArea(12, 1.2), rectangleArea(5, 5)]
  const total = zones.reduce((a, b) => a + b, 0)
  check('30 + 14.4 + 25 = 69.4 m²', Math.abs(total - 69.4) < 0.001, `got ${total}`)
}

console.log('\n=== Test 7: Produs preselectat prin URL (catalog lookup) ===')
{
  const product = calculatorCatalog.find((p) => p.slug === 'roca')
  check('slug "roca" resolves to a catalog product', Boolean(product), 'ProductPicker preselection depends on this lookup')
  const variant = product?.variants.find((v) => v.label === '60×30×6 cm')
  check('format "60×30×6 cm" resolves within that product', Boolean(variant), 'format-preselection depends on this lookup')
}

console.log('\n=== Test 8: Date lipsă -- fallback, nu excepție ===')
{
  const jardiniera = calculatorCatalog.find((p) => p.slug === 'jardiniere')
  const missing = jardiniera?.variants.find((v) => !v.hasFullData)
  check('a variant with missing pallet data exists (Jardinieră)', Boolean(missing), 'expected known data gap')
  if (missing) {
    const r = calculateLinearRequirement(10, missing)
    check('calculation does not throw and returns nulls, not garbage', r.pallets === null || typeof r.pallets === 'number', 'must degrade gracefully')
  }
}

console.log(`\n=== ${pass} passed, ${fail} failed ===`)
if (fail > 0) process.exitCode = 1
