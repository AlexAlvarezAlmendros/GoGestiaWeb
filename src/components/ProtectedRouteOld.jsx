import { useAuth } from '../hooks/useAuth'

/**
 * Componente para proteger rutas que requieren autenticación
 */
const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  fallback = null,
  showLoginPrompt = true
}) => {
  const { isAuthenticated, isLoading, canCreatePosts, login, user } = useAuth()

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-lime mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Si no está autenticado, mostrar prompt de login
  if (requireAuth && !isAuthenticated) {
    if (fallback) return fallback

    if (showLoginPrompt) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-brand-lime rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Autenticación Requerida
              </h2>
              
              <p className="text-gray-600 mb-8">
                Necesitas iniciar sesión para acceder a esta página y crear contenido en el blog.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={login}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-brand-dark-green bg-brand-lime hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-lime transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Iniciar Sesión
                </button>
                
                <p className="text-xs text-gray-500">
                  Al iniciar sesión, aceptas nuestros términos de servicio y política de privacidad.
                </p>
              </div>
            </div>
            
            {/* Beneficios de autenticarse */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">¿Por qué iniciar sesión?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Crear y publicar entradas del blog</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Guardar borradores automáticamente</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Gestionar tu contenido publicado</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Perfil personalizado de autor</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  // Si está autenticado pero no puede crear posts (email no verificado)
  if (requireAuth && isAuthenticated && !canCreatePosts()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mx-auto h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Verificación de Email Requerida
            </h3>
            
            <p className="text-gray-600 mb-4">
              Debes verificar tu dirección de email antes de poder crear contenido.
            </p>
            
            <p className="text-sm text-gray-500 mb-6">
              Revisa tu bandeja de entrada y haz clic en el enlace de verificación.
            </p>
            
            <div className="space-y-3">
              <p className="text-xs text-gray-400">
                Usuario: <strong>{user?.email}</strong>
              </p>
              <p className="text-xs text-gray-400">
                Estado: <span className="text-yellow-600">Email pendiente de verificación</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Si todo está bien, renderizar el contenido protegido
  return children
}

export default ProtectedRoute
