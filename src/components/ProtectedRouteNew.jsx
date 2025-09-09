import { useAuth } from '../hooks/useAuth'

/**
 * Componente para proteger rutas que requieren autenticación y permisos específicos
 */
const ProtectedRoute = ({ children, requiredPermission = null, requiredRole = null }) => {
  const { isAuthenticated, isLoading, user, hasPermission, hasRole, canCreatePosts } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-lime"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">Acceso Restringido</h2>
            <p className="mt-1 text-sm text-gray-500">
              Necesitas iniciar sesión para acceder a esta página.
            </p>
            <div className="mt-6">
              <button
                onClick={() => window.location.href = '/'}
                className="btn-primary"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Verificar email verificado
  if (!user?.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">Email no verificado</h2>
            <p className="mt-1 text-sm text-gray-500">
              Necesitas verificar tu email antes de poder crear contenido.
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Revisa tu bandeja de entrada y haz click en el enlace de verificación.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Verificar permiso específico
  if (requiredPermission && !hasPermission(requiredPermission)) {
    // Verificar si es permiso de crear posts y usar lógica de roles
    if (requiredPermission === 'create:posts' && !canCreatePosts()) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
              </svg>
              <h2 className="mt-2 text-lg font-medium text-gray-900">Permisos Insuficientes</h2>
              <p className="mt-1 text-sm text-gray-500">
                Solo los usuarios con rol <strong>Admin</strong> o <strong>Editor</strong> pueden crear posts.
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Contacta con un administrador para obtener los permisos necesarios.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => window.location.href = '/blog'}
                  className="btn-secondary mr-3"
                >
                  Ver Blog
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="btn-primary"
                >
                  Volver al Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">Acceso Denegado</h2>
            <p className="mt-1 text-sm text-gray-500">
              No tienes el permiso <code className="bg-gray-100 px-1 rounded">{requiredPermission}</code> requerido.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Verificar rol específico
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">Rol Insuficiente</h2>
            <p className="mt-1 text-sm text-gray-500">
              Necesitas el rol <strong>{requiredRole}</strong> para acceder a esta página.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
