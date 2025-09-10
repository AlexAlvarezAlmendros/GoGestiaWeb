import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useAuth } from '../hooks/useAuth'

/**
 * Página de debug para verificar autenticación y roles
 */
const AuthDebug = () => {
  const auth0 = useAuth0()
  const authContext = useAuth()

  const {
    isAuthenticated: auth0IsAuthenticated,
    isLoading: auth0IsLoading,
    user: auth0User,
    getAccessTokenSilently
  } = auth0

  const {
    isAuthenticated,
    isLoading,
    user,
    token,
    permissions,
    roles,
    hasRole,
    hasPermission,
    canCreatePosts
  } = authContext

  const [tokenDetails, setTokenDetails] = React.useState(null)

  React.useEffect(() => {
    const getTokenDetails = async () => {
      if (auth0IsAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: "openid profile email read:posts create:posts edit:posts delete:posts"
          })
          
          if (accessToken) {
            const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]))
            setTokenDetails({
              raw: accessToken,
              payload: tokenPayload,
              header: JSON.parse(atob(accessToken.split('.')[0]))
            })
          }
        } catch (error) {
          console.error('Error getting token:', error)
        }
      }
    }

    getTokenDetails()
  }, [auth0IsAuthenticated, getAccessTokenSilently])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Debug de Autenticación</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4">No autenticado</h2>
            <p className="text-red-700">Necesitas iniciar sesión para ver la información de debug.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Debug de Autenticación y Roles</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Auth0 Direct */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📱 Auth0 Directo</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Estado:</label>
                <div className="mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    auth0IsAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {auth0IsAuthenticated ? 'Autenticado' : 'No autenticado'}
                  </span>
                  <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    auth0IsLoading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {auth0IsLoading ? 'Cargando...' : 'Listo'}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Usuario Auth0:</label>
                <pre className="mt-1 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40">
                  {JSON.stringify(auth0User, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* AuthContext */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🔐 AuthContext</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Estado:</label>
                <div className="mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isAuthenticated ? 'Autenticado' : 'No autenticado'}
                  </span>
                  <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    isLoading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {isLoading ? 'Cargando...' : 'Listo'}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Usuario Procesado:</label>
                <pre className="mt-1 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* Token JWT */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🎫 Token JWT</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Token disponible:</label>
                <div className="mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    token ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {token ? 'Sí' : 'No'}
                  </span>
                </div>
              </div>
              
              {tokenDetails && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Header:</label>
                    <pre className="mt-1 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-32">
                      {JSON.stringify(tokenDetails.header, null, 2)}
                    </pre>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Payload:</label>
                    <pre className="mt-1 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-64">
                      {JSON.stringify(tokenDetails.payload, null, 2)}
                    </pre>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Roles y Permisos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">👤 Roles y Permisos</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Roles:</label>
                <div className="mt-1">
                  {roles.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {roles.map((role, index) => (
                        <span key={index} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {role}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Sin roles asignados</span>
                  )}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Permisos:</label>
                <div className="mt-1">
                  {permissions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {permissions.map((permission, index) => (
                        <span key={index} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                          {permission}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Sin permisos asignados</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Verificaciones */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">✅ Verificaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="text-center">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                  hasRole('Admin') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {hasRole('Admin') ? '✓' : '✗'}
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Es Admin</p>
                <p className="text-xs text-gray-500">{hasRole('Admin') ? 'Sí' : 'No'}</p>
              </div>

              <div className="text-center">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                  hasRole('Editor') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {hasRole('Editor') ? '✓' : '✗'}
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Es Editor</p>
                <p className="text-xs text-gray-500">{hasRole('Editor') ? 'Sí' : 'No'}</p>
              </div>

              <div className="text-center">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                  hasPermission('create:posts') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {hasPermission('create:posts') ? '✓' : '✗'}
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Crear Posts</p>
                <p className="text-xs text-gray-500">{hasPermission('create:posts') ? 'Sí' : 'No'}</p>
              </div>

              <div className="text-center">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                  canCreatePosts() ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {canCreatePosts() ? '✓' : '✗'}
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Puede Crear</p>
                <p className="text-xs text-gray-500">{canCreatePosts() ? 'Sí' : 'No'}</p>
              </div>
            </div>
          </div>

          {/* Variables de entorno */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🔧 Configuración</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">VITE_AUTH0_DOMAIN:</label>
                <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-100 p-2 rounded">
                  {import.meta.env.VITE_AUTH0_DOMAIN || 'No configurado'}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">VITE_AUTH0_CLIENT_ID:</label>
                <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-100 p-2 rounded">
                  {import.meta.env.VITE_AUTH0_CLIENT_ID ? '••••••••••••' : 'No configurado'}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">VITE_AUTH0_AUDIENCE:</label>
                <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-100 p-2 rounded">
                  {import.meta.env.VITE_AUTH0_AUDIENCE || 'No configurado'}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">VITE_API_BASE_URL:</label>
                <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-100 p-2 rounded">
                  {import.meta.env.VITE_API_BASE_URL || 'No configurado'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthDebug
