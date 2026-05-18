import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Info, ArrowRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'

interface PavajType {
  id: string
  name: string
  width: number
  height: number
  piecesPerSqm: number
  pricePerSqm: number
}

const pavajTypes: PavajType[] = [
  { id: 'roca', name: 'Roca (Premium)', width: 20, height: 10, piecesPerSqm: 50, pricePerSqm: 85 },
  { id: 'antic', name: 'Antic (Premium)', width: 15, height: 10, piecesPerSqm: 67, pricePerSqm: 92 },
  { id: 'primo', name: 'Primo (Premium)', width: 20, height: 10, piecesPerSqm: 50, pricePerSqm: 78 },
  { id: 'grand-urban', name: 'Grand Urban (Premium)', width: 100, height: 50, piecesPerSqm: 20, pricePerSqm: 120 },
  { id: 'gemina', name: 'Gemina (Premium)', width: 20, height: 10, piecesPerSqm: 50, pricePerSqm: 88 },
  { id: 'holland', name: 'Holland (Standard)', width: 20, height: 10, piecesPerSqm: 50, pricePerSqm: 45 },
  { id: 'autobloc', name: 'Autobloc (Standard)', width: 20, height: 10, piecesPerSqm: 50, pricePerSqm: 42 },
  { id: 'quatro', name: 'Quatro (Standard)', width: 20, height: 20, piecesPerSqm: 25, pricePerSqm: 48 },
]

export function CalculatorPage() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [selectedPavaj, setSelectedPavaj] = useState(pavajTypes[0]?.id || '')
  const [includeBorder, setIncludeBorder] = useState(false)
  const [borderLength, setBorderLength] = useState('')

  const area = parseFloat(length) * parseFloat(width) || 0
  const pavaj = pavajTypes.find(p => p.id === selectedPavaj)
  const totalPieces = Math.ceil(area * (pavaj?.piecesPerSqm || 0) * 1.05) // 5% waste
  const totalPrice = area * (pavaj?.pricePerSqm || 0)
  const borderPrice = includeBorder ? parseFloat(borderLength) * 25 : 0 // 25 RON/ml bordura
  const grandTotal = totalPrice + borderPrice

  return (
    <div className="pt-20 md:pt-24">
      {/* Breadcrumbs */}
      <div className="bg-anthracite-50 border-b border-anthracite-100">
        <div className="container-premium py-4">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-anthracite-500 hover:text-anthracite-700 transition-colors">Acasa</a>
            <span className="text-anthracite-300">/</span>
            <span className="text-anthracite-900 font-medium">Calculator Pavaj</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-h1 text-anthracite-900 mb-4">Calculator Pavaj</h1>
            <p className="text-body-lg text-anthracite-500 max-w-2xl">
              Calculeaza rapid cantitatea si costul estimat pentru proiectul tau.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section ref={ref} className="py-12 md:py-16 bg-anthracite-50">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6 md:p-8"
            >
              <h2 className="heading-h2 text-anthracite-900 mb-6">Dimensiuni suprafata</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="length" className="block text-sm font-medium text-anthracite-700 mb-1">
                      Lungime (m)
                    </label>
                    <input
                      type="number"
                      id="length"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-4 py-3 border border-anthracite-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="10"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label htmlFor="width" className="block text-sm font-medium text-anthracite-700 mb-1">
                      Latime (m)
                    </label>
                    <input
                      type="number"
                      id="width"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-4 py-3 border border-anthracite-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="5"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pavaj" className="block text-sm font-medium text-anthracite-700 mb-1">
                    Tip pavaj
                  </label>
                  <select
                    id="pavaj"
                    value={selectedPavaj}
                    onChange={(e) => setSelectedPavaj(e.target.value)}
                    className="w-full px-4 py-3 border border-anthracite-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {pavajTypes.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - {p.pricePerSqm} RON/mp</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3 p-4 bg-anthracite-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="border"
                    checked={includeBorder}
                    onChange={(e) => setIncludeBorder(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-anthracite-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="border" className="text-sm text-anthracite-700">
                    Adauga bordura
                  </label>
                </div>

                {includeBorder && (
                  <div>
                    <label htmlFor="borderLength" className="block text-sm font-medium text-anthracite-700 mb-1">
                      Lungime bordura (ml)
                    </label>
                    <input
                      type="number"
                      id="borderLength"
                      value={borderLength}
                      onChange={(e) => setBorderLength(e.target.value)}
                      className="w-full px-4 py-3 border border-anthracite-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="30"
                      min="0"
                      step="0.1"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-anthracite-900 text-white rounded-xl shadow-md p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-6 h-6 text-primary-400" />
                <h2 className="heading-h2">Rezultat estimativ</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-warm-300 text-sm mb-1">Suprafata</p>
                    <p className="text-3xl font-bold">{area.toFixed(2)} mp</p>
                  </div>
                  <div>
                    <p className="text-warm-300 text-sm mb-1">Bucati necesare</p>
                    <p className="text-3xl font-bold">{totalPieces.toLocaleString('ro-RO')}</p>
                  </div>
                </div>

                <div className="border-t border-anthracite-700 pt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-warm-300">Pavaj ({pavaj?.name})</span>
                    <span className="font-semibold">{totalPrice.toFixed(2)} RON</span>
                  </div>
                  {includeBorder && (
                    <div className="flex justify-between">
                      <span className="text-warm-300">Bordura ({borderLength} ml)</span>
                      <span className="font-semibold">{borderPrice.toFixed(2)} RON</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t border-anthracite-700 pt-4">
                    <span>Total estimativ</span>
                    <span className="text-primary-400">{grandTotal.toFixed(2)} RON</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-4 bg-anthracite-800 rounded-lg">
                  <Info className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-warm-300">
                    Preturile sunt estimative si nu includ TVA, transport sau manopera.
                    Pentru o oferta personalizata, contacteaza reprezentantul din zona ta.
                  </p>
                </div>

                <a
                  href="/contact"
                  className="btn-primary w-full justify-center bg-primary-600 hover:bg-primary-700 text-white"
                >
                  Solicita oferta personalizata
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
