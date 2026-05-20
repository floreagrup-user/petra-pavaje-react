import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { testimonials } from '@/data/site'

const testimonialImages: Record<string, string[]> = {
  florina: [
    'https://petrapavaje.ro/wp-content/uploads/testimonial-Florina-Tanase-1.jpg',
    'https://petrapavaje.ro/wp-content/uploads/testimonial-Florina-Tanase-2.jpg',
    'https://petrapavaje.ro/wp-content/uploads/testimonial-Florina-Tanase-3.jpg',
  ],
  marius: [
    'https://petrapavaje.ro/wp-content/uploads/testimonial-Marius-Simbotin-1.jpg',
    'https://petrapavaje.ro/wp-content/uploads/testimonial-Marius-Simbotin-2.jpg',
    'https://petrapavaje.ro/wp-content/uploads/testimonial-Marius-Simbotin-3.jpg',
  ],
  cristian: [
    'https://petrapavaje.ro/wp-content/uploads/testimonial-Cristian-Prack-1.jpg',
    'https://petrapavaje.ro/wp-content/uploads/testimonial-Cristian-Prack-2.jpg',
    'https://petrapavaje.ro/wp-content/uploads/testimonial-Cristian-Prack-3.jpg',
  ],
}

export function TestimonialsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonial = testimonials[currentIndex]
  const images = testimonialImages[testimonial.id] || []

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Testimoniale
          </p>
          <h2 className="heading-h1 text-charcoal-900 mb-4">
            Ce spun clienții noștri
          </h2>
          <p className="text-body-lg text-charcoal-500 max-w-2xl mx-auto">
            Proiecte finalizate cu succes în toată România
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="aspect-[3/4] rounded-xl overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`Proiect ${testimonial.name} - imagine ${idx + 1}`}
                    width="900"
                    height="1200"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>

            <div className="relative">
              <Quote className="w-12 h-12 text-brand-200 mb-4" />
              <blockquote className="text-xl md:text-2xl text-charcoal-700 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="text-lg font-semibold text-charcoal-900">{testimonial.name}</p>
                {testimonial.location && (
                  <p className="text-sm text-charcoal-500">{testimonial.location}</p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-charcoal-200 hover:border-charcoal-400 hover:bg-charcoal-50 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-charcoal-600" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-8 bg-brand-600' : 'w-2 bg-charcoal-300'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full border border-charcoal-200 hover:border-charcoal-400 hover:bg-charcoal-50 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-charcoal-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
