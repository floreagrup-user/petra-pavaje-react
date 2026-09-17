import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Calculator, FileText } from 'lucide-react'
import { mainMenu, enMenu, type MenuItem } from '@/data/menu'
import { useScrollPosition } from '@/hooks/use-scroll'
import { cn } from '@/lib/utils'
import { isEnglishPath, toEnglishPath, toRomanianPath } from '@/lib/i18n-routes'

function hasNestedChildren(item: MenuItem): boolean {
  return Boolean(item.children?.some((child) => child.children && child.children.length > 0))
}

function UKFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 36" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="60" height="36" fill="#00247d" />
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L26,16 M60,0 L34,16 M0,36 L26,20 M60,36 L34,20" stroke="#cf142b" strokeWidth="4" />
      <path d="M30,0 V36 M0,18 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V36 M0,18 H60" stroke="#cf142b" strokeWidth="6" />
    </svg>
  )
}

function RoFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="1" height="2" x="0" fill="#002B7F" />
      <rect width="1" height="2" x="1" fill="#FCD116" />
      <rect width="1" height="2" x="2" fill="#CE1126" />
    </svg>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const scrollY = useScrollPosition()
  const location = useLocation()
  const isScrolled = scrollY > 50
  const isEnglish = isEnglishPath(location.pathname)
  const isHome = location.pathname === '/' || location.pathname === '/en'
  const menu = isEnglish ? enMenu : mainMenu
  const langSwitchHref = isEnglish ? toRomanianPath(location.pathname) : toEnglishPath(location.pathname)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        initial={{ height: 'auto', opacity: 1 }}
        animate={{
          height: isScrolled ? 0 : 'auto',
          opacity: isScrolled ? 0 : 1,
        }}
        className="bg-charcoal-900 text-white/70 text-xs overflow-hidden"
      >
        <div className="container-premium py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to={isEnglish ? '/en/calculator-pavaj' : '/calculator-pavaj'}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Calculator className="w-3 h-3" />
              {isEnglish ? 'Paving Calculator' : 'Calculator pavaj'}
            </Link>
            <span className="text-white/20">|</span>
            <span>{isEnglish ? '4 National Factories' : '4 Fabrici Naționale'}</span>
            <span className="text-white/20">|</span>
            <span className="text-brand-300">{isEnglish ? '24,000 sqm/day' : '24.000 mp/zi'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={isEnglish ? toRomanianPath(location.pathname) : toEnglishPath(location.pathname)}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              {isEnglish ? (
                <RoFlag className="w-4 h-3 rounded-[2px] shrink-0" />
              ) : (
                <UKFlag className="w-4 h-3 rounded-[2px] shrink-0" />
              )}
              {isEnglish ? 'RO' : 'EN'}
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/catalog" className="hover:text-white transition-colors flex items-center gap-1">
              <FileText className="w-3 h-3" />
              Catalog
            </Link>
            <span className="text-white/20">|</span>
            <Link to={isEnglish ? '/en/contact' : '/contact'} className="hover:text-white transition-colors">
              {isEnglish ? 'Request a Quote' : 'Solicita Ofertă'}
            </Link>
          </div>
        </div>
      </motion.div>

      <div
        className={cn(
          'transition-all duration-500',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : isHome ? 'bg-gradient-to-b from-black/40 to-transparent' : 'bg-white'
        )}
      >
        <div className="container-premium">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to={isEnglish ? '/en' : '/'} className="flex items-center gap-2 group shrink-0">
              <span className={cn(
                'inline-flex items-center justify-center px-3 py-1.5 rounded-xl transition-all duration-500',
                isHome && !isScrolled ? 'bg-white/70 backdrop-blur-sm' : ''
              )}>
                <img
                  src={isScrolled || !isHome ? '/images/petra-pavaje-logo-sticky.png' : '/images/petra-pavaje-logo.png'}
                  alt="Petra Pavaje"
                  width="160"
                  height="40"
                  className="h-8 md:h-10 w-auto transition-all duration-300"
                />
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {menu.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
                      location.pathname === item.href
                        ? isScrolled || !isHome
                          ? 'text-brand-600 bg-brand-50'
                          : 'text-white bg-white/10'
                        : isScrolled || !isHome
                          ? 'text-charcoal-500 hover:text-charcoal-900 hover:bg-warm-gray-50'
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
                      <span className="ml-1 px-2 py-0.5 text-xs bg-brand-600 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      hasNestedChildren(item) ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-screen max-w-4xl bg-white rounded-xl shadow-premium border border-charcoal-100 p-6"
                        >
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {item.children.map((child) => (
                              <div key={child.label}>
                                <Link
                                  to={child.href}
                                  className="block text-sm font-semibold text-charcoal-900 hover:text-brand-600 transition-colors mb-2"
                                >
                                  {child.label}
                                </Link>
                                {child.children && (
                                  <ul className="space-y-1">
                                    {child.children.slice(0, 8).map((sub) => (
                                      <li key={sub.label}>
                                        <Link
                                          to={sub.href}
                                          className="block text-xs text-charcoal-400 hover:text-charcoal-700 transition-colors py-0.5"
                                        >
                                          {sub.label}
                                        </Link>
                                      </li>
                                    ))}
                                    {child.children.length > 8 && (
                                      <li>
                                        <Link
                                          to={child.href}
                                          className="text-xs text-brand-600 hover:text-brand-700 transition-colors font-medium"
                                        >
                                          +{child.children.length - 8} {isEnglish ? 'more' : 'mai multe'}
                                        </Link>
                                      </li>
                                    )}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-premium border border-charcoal-100 py-2"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="block px-4 py-2.5 text-sm text-charcoal-700 hover:bg-[#B51F24]/10 hover:text-[#B51F24] transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to={isEnglish ? '/en/contact' : '/contact'}
                className={cn(
                  'hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-300',
                  isScrolled || !isHome
                    ? 'bg-brand-600 text-white hover:bg-brand-700'
                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                )}
              >
                {isEnglish ? 'Request a Quote' : 'Solicita Ofertă'}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={
                  isEnglish
                    ? mobileMenuOpen ? 'Close menu' : 'Open menu'
                    : mobileMenuOpen ? 'Închide meniul' : 'Deschide meniul'
                }
                aria-expanded={mobileMenuOpen}
                className={cn(
                  'lg:hidden p-2 rounded-md transition-colors',
                  isScrolled || !isHome
                    ? 'text-charcoal-500 hover:bg-charcoal-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-charcoal-100 overflow-hidden shadow-xl"
          >
            <div className="container-premium py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {menu.map((item) => (
                <MobileMenuItem key={item.label} item={item} onClick={() => setMobileMenuOpen(false)} />
              ))}
              <div className="pt-4 border-t border-charcoal-100 space-y-2">
                <Link
                  to={langSwitchHref}
                  className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-charcoal-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isEnglish ? (
                    <RoFlag className="w-5 h-3.5 rounded-[2px] shrink-0" />
                  ) : (
                    <UKFlag className="w-5 h-3.5 rounded-[2px] shrink-0" />
                  )}
                  {isEnglish ? 'Română' : 'English'}
                </Link>
                <Link
                  to={isEnglish ? '/en/contact' : '/contact'}
                  className="btn-primary w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isEnglish ? 'Request a Quote' : 'Solicita Ofertă'}
                </Link>
                <Link to="/catalog" className="btn-secondary w-full justify-center" onClick={() => setMobileMenuOpen(false)}>
                  {isEnglish ? 'Download Catalog' : 'Descarcă Catalog'}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function MobileMenuItem({ item, depth = 0, onClick }: { item: MenuItem; depth?: number; onClick: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          to={item.href}
          onClick={hasChildren ? undefined : onClick}
          className={cn(
            'py-2 text-sm font-medium transition-colors flex-1',
            depth === 0 ? 'text-charcoal-900 font-semibold' : 'text-charcoal-500'
          )}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 text-charcoal-400 hover:text-charcoal-600"
          >
            <ChevronDown className={cn('w-4 h-4 transition-transform', expanded && 'rotate-180')} />
          </button>
        )}
      </div>
      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-4 border-l-2 border-charcoal-100 ml-1"
          >
            {item.children!.map((child) => (
              <MobileMenuItem key={child.label} item={child} depth={depth + 1} onClick={onClick} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
