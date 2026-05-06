import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background-light pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo y descripción */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/GoGestiaIcon.svg" alt="GoGestia" className="w-8 h-8 rounded-md" />
              <span className="text-agency-dark font-bold text-lg">GoGestia</span>
            </div>
            <p className="text-gray-500 text-sm">
              Expertos en automatización de procesos y soluciones de Inteligencia Artificial para el sector B2B.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-agency-dark font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link to="/servicios" className="hover:text-agency-dark transition-colors">
                  Automatización IA
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="hover:text-agency-dark transition-colors">
                  Desarrollo Web
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="hover:text-agency-dark transition-colors">
                  Agentes IA Locales
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="hover:text-agency-dark transition-colors">
                  Consultoría Técnica
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-agency-dark font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link to="/" className="hover:text-agency-dark transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-agency-dark transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-agency-dark font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link to="/legal/privacidad" className="hover:text-agency-dark transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link to="/legal/aviso-legal" className="hover:text-agency-dark transition-colors">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link to="/legal/cookies" className="hover:text-agency-dark transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} GoGestia. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com/company/gogestia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-agency-dark transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fillRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
