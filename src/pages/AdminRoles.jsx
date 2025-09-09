import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import useRoleManagement from '../hooks/useRoleManagement'
import Modal from '../components/Modal'
import Button from '../components/Button'

/**
 * Página de administración de roles - Solo Admin
 */
const AdminRoles = () => {
  const { isAdmin } = useAuth()
  const {
    loading,
    error,
    roles,
    users,
    permissions,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    fetchUsersWithRoles,
    assignRoleToUser,
    removeRoleFromUser,
    fetchPermissions,
    clearError
  } = useRoleManagement()

  const [activeTab, setActiveTab] = useState('roles')
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Estados para formularios
  const [roleForm, setRoleForm] = useState({
    name: '',
    description: '',
    permissions: []
  })

  // Cargar datos iniciales
  useEffect(() => {
    if (isAdmin) {
      fetchRoles()
      fetchUsersWithRoles()
      fetchPermissions()
    }
  }, [isAdmin, fetchRoles, fetchUsersWithRoles, fetchPermissions])

  // Verificar permisos de acceso
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h1>
          <p className="text-gray-600 mb-6">
            No tienes permisos para acceder a la administración de roles.
            Solo los usuarios con rol de Admin pueden gestionar roles y permisos.
          </p>
          <Button 
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Volver
          </Button>
        </div>
      </div>
    )
  }

  // Filtrar usuarios por búsqueda
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Manejar creación/edición de rol
  const handleRoleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (selectedRole) {
        await updateRole(selectedRole.id, roleForm)
      } else {
        await createRole(roleForm)
      }
      
      setShowRoleModal(false)
      setSelectedRole(null)
      setRoleForm({ name: '', description: '', permissions: [] })
    } catch (err) {
      console.error('Error saving role:', err)
    }
  }

  // Manejar eliminación de rol
  const handleDeleteRole = async (roleId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este rol?')) {
      await deleteRole(roleId)
    }
  }

  // Abrir modal para editar rol
  const openRoleModal = (role = null) => {
    setSelectedRole(role)
    setRoleForm(role ? {
      name: role.name,
      description: role.description || '',
      permissions: role.permissions || []
    } : { name: '', description: '', permissions: [] })
    setShowRoleModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Administración de Roles
          </h1>
          <p className="text-gray-600">
            Gestiona roles, permisos y asignaciones de usuarios
          </p>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={clearError}
                    className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('roles')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'roles'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Roles
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Usuarios
              </button>
              <button
                onClick={() => setActiveTab('permissions')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'permissions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Permisos
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            {/* Roles header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Roles del Sistema</h2>
              <Button
                onClick={() => openRoleModal()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Crear Rol
              </Button>
            </div>

            {/* Roles grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <div key={role.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openRoleModal(role)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Permisos:</h4>
                    <div className="flex flex-wrap gap-2">
                      {(role.permissions || []).map((permission, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Users header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Gestión de Usuarios</h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Users table */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roles
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=3B82F6&color=fff`}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name || 'Sin nombre'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-2">
                          {(user.roles || []).map((role, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                              {role.name || role}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedUser(user)
                            setShowUserModal(true)
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Gestionar Roles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Permisos del Sistema</h2>
            
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-900">
                      {permission.name || permission}
                    </span>
                    <span className="text-xs text-gray-500">
                      {permission.description || 'Sin descripción'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-900">Procesando...</span>
              </div>
            </div>
          </div>
        )}

        {/* Role Modal */}
        {showRoleModal && (
          <Modal
            isOpen={showRoleModal}
            onClose={() => setShowRoleModal(false)}
            title={selectedRole ? 'Editar Rol' : 'Crear Nuevo Rol'}
          >
            <form onSubmit={handleRoleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Rol
                </label>
                <input
                  type="text"
                  value={roleForm.name}
                  onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={roleForm.description}
                  onChange={(e) => setRoleForm({ ...roleForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permisos
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {permissions.map((permission, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={roleForm.permissions.includes(permission.name || permission)}
                        onChange={(e) => {
                          const permissionName = permission.name || permission
                          if (e.target.checked) {
                            setRoleForm({
                              ...roleForm,
                              permissions: [...roleForm.permissions, permissionName]
                            })
                          } else {
                            setRoleForm({
                              ...roleForm,
                              permissions: roleForm.permissions.filter(p => p !== permissionName)
                            })
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-900">
                        {permission.name || permission}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  onClick={() => setShowRoleModal(false)}
                  variant="outline"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {selectedRole ? 'Actualizar' : 'Crear'} Rol
                </Button>
              </div>
            </form>
          </Modal>
        )}

        {/* User Role Assignment Modal */}
        {showUserModal && selectedUser && (
          <Modal
            isOpen={showUserModal}
            onClose={() => setShowUserModal(false)}
            title={`Gestionar Roles - ${selectedUser.name || selectedUser.email}`}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Roles Actuales</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(selectedUser.roles || []).map((role, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {role.name || role}
                      <button
                        onClick={() => removeRoleFromUser(selectedUser.id, role.id || role)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Asignar Nuevo Rol</h3>
                <div className="grid grid-cols-1 gap-2">
                  {roles.filter(role => 
                    !(selectedUser.roles || []).some(userRole => 
                      (userRole.id || userRole) === role.id
                    )
                  ).map((role) => (
                    <button
                      key={role.id}
                      onClick={() => assignRoleToUser(selectedUser.id, role.id)}
                      className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="font-medium text-gray-900">{role.name}</div>
                      <div className="text-sm text-gray-500">{role.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setShowUserModal(false)}
                  variant="outline"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default AdminRoles
