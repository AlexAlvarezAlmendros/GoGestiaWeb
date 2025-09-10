import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

// Secuencia secreta para activar el login: Ctrl + Shift + L
const SECRET_SEQUENCE = ['ControlLeft', 'ShiftLeft', 'KeyL']

/**
 * Componente para mostrar información del usuario y opciones de autenticación
 * El botón de login está oculto por defecto y se activa con una combinación de teclas
 */
const UserMenu = ({ isMobile = false, onClose }) => {
  const { isAuthenticated, user, login, logout, isLoading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [showLoginButton, setShowLoginButton] = useState(false)
  const [keySequence, setKeySequence] = useState([])
  
  // Listener para detectar la combinación de teclas secreta
  useEffect(() => {
    let timeoutId
    
    const handleKeyDown = (event) => {
      // Agregar la tecla presionada a la secuencia
      const newSequence = [...keySequence, event.code]
      
      // Mantener solo los últimos elementos necesarios
      const trimmedSequence = newSequence.slice(-SECRET_SEQUENCE.length)
      setKeySequence(trimmedSequence)
      
      // Verificar si la secuencia coincide
      const sequenceMatches = trimmedSequence.every((key, index) => 
        key === SECRET_SEQUENCE[index]
      )
      
      if (sequenceMatches && trimmedSequence.length === SECRET_SEQUENCE.length) {
        setShowLoginButton(true)
        console.log('🔓 Acceso de administrador activado')
        
        // Auto-ocultar después de 30 segundos
        timeoutId = setTimeout(() => {
          setShowLoginButton(false)
          console.log('🔒 Acceso de administrador desactivado por timeout')
        }, 30000)
      }
    }
    
    // Listener global para detectar teclas
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [keySequence])

  const handleClose = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className={`h-8 w-8 bg-gray-200 rounded-full ${isMobile ? 'mx-auto' : ''}`}></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Solo mostrar botón de login si se ha activado con la combinación secreta
    if (!showLoginButton) {
      return (
        <div className={`text-gray-500 text-sm ${isMobile ? 'text-center' : ''}`}>
        </div>
      )
    }
    
    return (
      <div className="relative">
        <button
          onClick={login}
          className={`bg-brand-lime text-brand-dark-green px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors ${
            isMobile ? 'w-full' : ''
          }`}
        >
          Iniciar Sesión
        </button>
        {/* Indicador de acceso temporal */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>
    )
  }

  // Renderizado para móvil
  if (isMobile) {
    return (
      <div className="space-y-2">
        {/* Información del usuario */}
        <div className="px-3 py-2 border border-gray-200 rounded-md">
          <div className="flex items-center space-x-3">
            <img
              src={user?.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email)}&background=84cc16&color=365314&bold=true`}
              alt={user?.name || user?.email}
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user?.name || user?.nickname || 'Usuario'}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Enlaces de navegación */}
        <Link
          to="/blog/crear"
          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={handleClose}
        >
          Crear Post
        </Link>

        <button
          onClick={() => {
            logout()
            handleClose()
          }}
          className="block w-full text-left px-3 py-2 text-sm text-red-700 hover:bg-red-50 rounded-md"
        >
          Cerrar Sesión
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        <img
          src={user?.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email)}&background=84cc16&color=365314&bold=true`}
          alt={user?.name || user?.email}
          className="h-8 w-8 rounded-full"
        />
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900">
            {user?.name || user?.nickname || 'Usuario'}
          </div>
          <div className="text-xs text-gray-500">
            {user?.email}
          </div>
        </div>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay para cerrar el menú */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menú desplegable */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
            <div className="py-1">
              {/* Información del usuario */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <img
                    src={user?.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email)}&background=84cc16&color=365314&bold=true`}
                    alt={user?.name || user?.email}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {user?.name || user?.nickname || 'Usuario'}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </div>
                    <div className="text-xs mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        user?.emailVerified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user?.emailVerified ? 'Verificado' : 'Pendiente verificación'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opciones del menú */}
              <div className="py-1">
                <Link
                  to="/blog/crear"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Crear Post
                  </div>
                </Link>
              </div>

              <div className="border-t border-gray-100 py-1">
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                >
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar Sesión
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default UserMenu
