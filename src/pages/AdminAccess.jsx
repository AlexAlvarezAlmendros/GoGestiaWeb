import React from 'react'

/**
 * Página de instrucciones para acceso de administrador
 * Solo accesible desde /admin/access-info
 */
const AdminAccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Acceso de Administrador</h1>
            <p className="text-gray-600">
              Información para usuarios autorizados
            </p>
          </div>

          {/* Instrucciones */}
          <div className="space-y-8">
            {/* Método 1: Combinación de teclas */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3.586l4.293-4.293A6 6 0 0115 7z" />
                </svg>
                Método 1: Combinación de Teclas Secreta
              </h2>
              <div className="space-y-3">
                <p className="text-blue-800">
                  Para activar el botón de login, presiona la siguiente secuencia:
                </p>
                <div className="flex items-center space-x-2 font-mono text-sm">
                  <kbd className="px-2 py-1 bg-white border border-blue-200 rounded shadow-sm">Ctrl</kbd>
                  <span>+</span>
                  <kbd className="px-2 py-1 bg-white border border-blue-200 rounded shadow-sm">Shift</kbd>
                  <span>+</span>
                  <kbd className="px-2 py-1 bg-white border border-blue-200 rounded shadow-sm">L</kbd>
                </div>
                <p className="text-sm text-blue-700">
                  ⏱️ El botón se mostrará durante 30 segundos después de activarlo.
                </p>
              </div>
            </div>

            {/* Método 2: URL directa */}
            <div className="bg-green-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Método 2: URL Directa de Administrador
              </h2>
              <div className="space-y-3">
                <p className="text-green-800">
                  Accede directamente a la página de login usando esta URL:
                </p>
                <div className="bg-white border border-green-200 rounded p-3 font-mono text-sm">
                  <code className="text-green-700">
                    {window.location.origin}/admin/login
                  </code>
                </div>
                <p className="text-sm text-green-700">
                  💡 Guarda esta URL en tus marcadores para acceso rápido.
                </p>
              </div>
            </div>

            {/* Información de seguridad */}
            <div className="bg-amber-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Información de Seguridad
              </h2>
              <div className="space-y-2 text-amber-800">
                <p>🔒 El botón de login está oculto para usuarios comunes</p>
                <p>👥 Solo personal autorizado debe conocer estos métodos</p>
                <p>🚫 No compartas esta información con usuarios no autorizados</p>
                <p>⚡ El acceso es temporal y se auto-desactiva por seguridad</p>
              </div>
            </div>

            {/* Roles y permisos */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-purple-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Roles Disponibles
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    Admin
                  </span>
                  <span className="text-purple-800">Acceso completo al sistema, gestión de usuarios y roles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Editor
                  </span>
                  <span className="text-purple-800">Crear, editar y publicar contenido del blog</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    User
                  </span>
                  <span className="text-purple-800">Acceso de solo lectura al contenido</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              💡 <strong>Sugerencia:</strong> Guarda esta página en tus marcadores para referencia futura
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAccess
