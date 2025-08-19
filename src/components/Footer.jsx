import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
               <img 
                src="/GoGestiaLogo.svg" 
                alt="GoGestia Logo" 
                className="w-10 h-10 filter brightness-0 invert"
              />
              <span className="text-white font-bold text-xl">GoGestia</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Detectamos ineficiencias en tus procesos y te proponemos soluciones personalizadas 
              que aumentan tu rentabilidad y productividad.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-lime transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-brand-lime transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-brand-lime transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-brand-lime transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-brand-lime transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="mailto:contacto@gogestia.com" className="hover:text-brand-lime transition-colors">
                  contacto@gogestia.com
                </a>
              </li>
              <li>
                <a href="tel:+34679248683" className="hover:text-brand-lime transition-colors">
                  +34 679 248 683
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador y enlaces legales */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} GoGestia. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/legal/aviso-legal" className="text-gray-400 hover:text-brand-lime text-sm transition-colors">
                Aviso Legal
              </Link>
              <Link to="/legal/privacidad" className="text-gray-400 hover:text-brand-lime text-sm transition-colors">
                Privacidad
              </Link>
              <Link to="/legal/cookies" className="text-gray-400 hover:text-brand-lime text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
