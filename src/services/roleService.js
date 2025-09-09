/**
 * Servicio para manejo de roles y permisos (solo Admin)
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// Función para obtener headers de autenticación
const getAuthHeaders = () => {
  if (typeof window !== 'undefined' && window.__authToken) {
    return {
      'Authorization': `Bearer ${window.__authToken}`,
      'Content-Type': 'application/json'
    }
  }
  
  return {
    'Content-Type': 'application/json'
  }
}

class RoleService {
  /**
   * Obtener todos los roles disponibles
   * Requiere permisos de Admin
   * @returns {Promise<Array>} Lista de roles
   */
  async getRoles() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/roles`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error obteniendo roles:', error)
      throw error
    }
  }

  /**
   * Crear nuevo rol
   * Requiere permisos de Admin
   * @param {Object} roleData - Datos del rol
   * @returns {Promise<Object>} Rol creado
   */
  async createRole(roleData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/roles`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(roleData)
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }))
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creando rol:', error)
      throw error
    }
  }

  /**
   * Actualizar rol existente
   * Requiere permisos de Admin
   * @param {string} roleId - ID del rol
   * @param {Object} roleData - Datos actualizados del rol
   * @returns {Promise<Object>} Rol actualizado
   */
  async updateRole(roleId, roleData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/roles/${roleId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(roleData)
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }))
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error actualizando rol:', error)
      throw error
    }
  }

  /**
   * Eliminar rol
   * Requiere permisos de Admin
   * @param {string} roleId - ID del rol a eliminar
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async deleteRole(roleId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/roles/${roleId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error eliminando rol:', error)
      throw error
    }
  }

  /**
   * Obtener usuarios con sus roles
   * Requiere permisos de Admin
   * @param {Object} params - Parámetros de consulta
   * @returns {Promise<Object>} Lista paginada de usuarios
   */
  async getUsersWithRoles(params = {}) {
    try {
      const queryParams = new URLSearchParams()
      
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      if (params.search) queryParams.append('search', params.search)
      if (params.role) queryParams.append('role', params.role)

      const response = await fetch(`${API_BASE_URL}/api/users/roles?${queryParams}`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error obteniendo usuarios con roles:', error)
      throw error
    }
  }

  /**
   * Asignar rol a usuario
   * Requiere permisos de Admin
   * @param {string} userId - ID del usuario
   * @param {string} roleId - ID del rol a asignar
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async assignRoleToUser(userId, roleId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}/roles`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ roleId })
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }))
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error asignando rol:', error)
      throw error
    }
  }

  /**
   * Remover rol de usuario
   * Requiere permisos de Admin
   * @param {string} userId - ID del usuario
   * @param {string} roleId - ID del rol a remover
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async removeRoleFromUser(userId, roleId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}/roles/${roleId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error removiendo rol:', error)
      throw error
    }
  }

  /**
   * Obtener permisos disponibles
   * Requiere permisos de Admin
   * @returns {Promise<Array>} Lista de permisos
   */
  async getPermissions() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/permissions`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error obteniendo permisos:', error)
      throw error
    }
  }

  /**
   * Asignar permisos a rol
   * Requiere permisos de Admin
   * @param {string} roleId - ID del rol
   * @param {Array} permissions - Lista de permisos a asignar
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async assignPermissionsToRole(roleId, permissions) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/roles/${roleId}/permissions`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ permissions })
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }))
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error asignando permisos:', error)
      throw error
    }
  }
}

// Exportar instancia del servicio
const roleService = new RoleService()
export default roleService
