import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed w-full z-50 bg-agency-dark/95 backdrop-blur-sm border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img src="/GoGestiaIcon.svg" alt="GoGestia" className="w-10 h-10 rounded-lg" />
              <span className="hidden sm:block text-white font-bold tracking-tight text-xl">GoGestia</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contacto"
              className="border border-primary/30 text-primary hover:bg-primary/10 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
            >
              Solicita tu diagnóstico
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary p-2 transition-colors"
            >
              <span className="sr-only">Abrir menú principal</span>
              <span className="material-symbols-outlined text-2xl">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="px-2 pt-4 pb-6 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary bg-white/5'
                      : 'text-gray-300 hover:text-primary hover:bg-white/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contacto"
                className="block text-center border border-primary/30 text-primary hover:bg-primary/10 px-5 py-3 rounded-lg text-sm font-semibold transition-all mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Solicita tu diagnóstico
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
