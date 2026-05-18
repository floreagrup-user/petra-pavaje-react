import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import { mainMenu, type MenuItem } from '@/data/menu'
import { useScrollPosition } from '@/hooks/use-scroll'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const scrollY = useScrollPosition()
  const location = useLocation()
  const isScrolled = scrollY > 50

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* Top bar */}
      <motion.div
        initial={{ height: 'auto', opacity: 1 }}
        animate={{
          height: isScrolled ? 0 : 'auto',
          opacity: isScrolled ? 0 : 1,
        }}
        className="bg-anthracite-950 text-warm-200 text-sm overflow-hidden"
      >
        <div className="container-premium py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="tel:+40358732246" className="hover:text-white transition-colors">
              +40 358 732 246
            </a>
            <span className="text-anthracite-700">|</span>
            <span>4 Fabrici Naționale</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/catalog" className="hover:text-white transition-colors">
              Descarcă Catalog
            </Link>
            <span className="text-anthracite-700">|</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Solicită Ofertă
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Main header */}
      <div
        className={cn(
          'transition-all duration-500',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="container-premium">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className={cn(
                'text-xl md:text-2xl font-bold tracking-tight transition-colors',
                isScrolled ? 'text-anthracite-900' : 'text-white'
              )}>
                PETRA<span className="text-primary-600">PAVAJE</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainMenu.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                      location.pathname === item.href
                        ? isScrolled
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-white bg-white/10'
                        : isScrolled
                          ? 'text-anthracite-700 hover:text-anthracite-900 hover:bg-anthracite-50'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className={cn(
                        'w-4 h-4 transition-transform',
                        activeDropdown === item.label && 'rotate-180'
                      )} />
                    )}
                    {item.badge && (
                      <span className="ml-1 px-2 py-0.5 text-xs bg-primary-600 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-screen max-w-4xl bg-white rounded-xl shadow-premium border border-anthracite-100 p-6"
                      >
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {item.children.map((child) => (
                            <div key={child.label}>
                              <Link
                                to={child.href}
                                className="block text-sm font-semibold text-anthracite-900 hover:text-primary-600 transition-colors mb-2"
                              >
                                {child.label}
                              </Link>
                              {child.children && (
                                <ul className="space-y-1">
                                  {child.children.slice(0, 6).map((sub) => (
                                    <li key={sub.label}>
                                      <Link
                                        to={sub.href}
                                        className="block text-xs text-anthracite-500 hover:text-anthracite-700 transition-colors py-0.5"
                                      >
                                        {sub.label}
                                      </Link>
                                    </li>
                                  ))}
                                  {child.children.length > 6 && (
                                    <li>
                                      <Link
                                        to={child.href}
                                        className="text-xs text-primary-600 hover:text-primary-700 transition-colors"
                                      >
                                        +{child.children.length - 6} mai multe
                                      </Link>
                                    </li>
                                  )}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  isScrolled
                    ? 'text-anthracite-600 hover:bg-anthracite-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  'lg:hidden p-2 rounded-lg transition-colors',
                  isScrolled
                    ? 'text-anthracite-600 hover:bg-anthracite-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-anthracite-100 overflow-hidden"
          >
            <div className="container-premium py-4 space-y-1">
              {mainMenu.map((item) => (
                <MobileMenuItem key={item.label} item={item} />
              ))}
              <div className="pt-4 border-t border-anthracite-100 space-y-2">
                <Link to="/contact" className="btn-primary w-full justify-center">
                  Solicită Ofertă
                </Link>
                <Link to="/catalog" className="btn-secondary w-full justify-center">
                  Descarcă Catalog
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function MobileMenuItem({ item, depth = 0 }: { item: MenuItem; depth?: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          to={item.href}
          className={cn(
            'py-2 text-sm font-medium transition-colors',
            depth === 0 ? 'text-anthracite-900' : 'text-anthracite-600'
          )}
        >
          {item.label}
        </Link>
        {item.children && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 text-anthracite-400"
          >
            <ChevronDown className={cn('w-4 h-4 transition-transform', expanded && 'rotate-180')} />
          </button>
        )}
      </div>
      <AnimatePresence>
        {expanded && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-4"
          >
            {item.children.map((child) => (
              <MobileMenuItem key={child.label} item={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
