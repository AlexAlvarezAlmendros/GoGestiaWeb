import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

/**
 * Página 404 personalizada
 * Se muestra cuando el usuario accede a una ruta que no existe
 */
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="max-w-md mx-auto text-center px-4">
        {/* Número 404 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-brand-dark-green opacity-20">
            404
          </h1>
        </div>
        
        {/* Mensaje principal */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Página no encontrada
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>
        
        {/* Acciones */}
        <div className="space-y-4">
          <div>
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto">
                Volver al inicio
              </Button>
            </Link>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>¿Necesitas ayuda?</p>
            <Link 
              to="/contacto" 
              className="text-brand-dark-green hover:underline"
            >
              Contáctanos
            </Link>
          </div>
        </div>
        
        {/* Enlaces útiles */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            O visita una de estas páginas:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link 
              to="/servicios" 
              className="text-brand-dark-green hover:underline"
            >
              Servicios
            </Link>
            <Link 
              to="/contacto" 
              className="text-brand-dark-green hover:underline"
            >
              Contacto
            </Link>
            <Link 
              to="/blog" 
              className="text-brand-dark-green hover:underline"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
