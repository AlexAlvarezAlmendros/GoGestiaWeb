import { useState, useCallback } from 'react'
import roleService from '../services/roleService'
import { useAuth } from './useAuth'

/**
 * Hook para gestión de roles y permisos
 * Solo disponible para usuarios con rol Admin
 */
export const useRoleManagement = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [roles, setRoles] = useState([])
  const [users, setUsers] = useState([])
  const [permissions, setPermissions] = useState([])
  
  const { hasRole } = useAuth()

  // Verificar que el usuario tenga permisos de Admin
  const isAdmin = hasRole('Admin')

  /**
   * Obtener todos los roles
   */
  const fetchRoles = useCallback(async () => {
    if (!isAdmin) {
      setError('No tienes permisos para ver los roles')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const rolesData = await roleService.getRoles()
      setRoles(rolesData)
    } catch (err) {
      console.error('Error fetching roles:', err)
      setError(err.message || 'Error al obtener los roles')
    } finally {
      setLoading(false)
    }
  }, [isAdmin])

  /**
   * Crear nuevo rol
   */
  const createRole = useCallback(async (roleData) => {
    if (!isAdmin) {
      setError('No tienes permisos para crear roles')
      return null
    }

    try {
      setLoading(true)
      setError(null)
      
      const newRole = await roleService.createRole(roleData)
      setRoles(prev => [...prev, newRole])
      
      return newRole
    } catch (err) {
      console.error('Error creating role:', err)
      setError(err.message || 'Error al crear el rol')
      return null
    } finally {
      setLoading(false)
    }
  }, [isAdmin])

  /**
   * Actualizar rol existente
   */
  const updateRole = useCallback(async (roleId, roleData) => {
    if (!isAdmin) {
      setError('No tienes permisos para actualizar roles')
      return null
    }

    try {
      setLoading(true)
      setError(null)
      
      const updatedRole = await roleService.updateRole(roleId, roleData)
      setRoles(prev => prev.map(role => 
        role.id === roleId ? updatedRole : role
      ))
      
      return updatedRole
    } catch (err) {
      console.error('Error updating role:', err)
      setError(err.message || 'Error al actualizar el rol')
      return null
    } finally {
      setLoading(false)
    }
  }, [isAdmin])

  /**
   * Eliminar rol
   */
  const deleteRole = useCallback(async (roleId) => {
    if (!isAdmin) {
      setError('No tienes permisos para eliminar roles')
      return false
    }

    try {
      setLoading(true)
      setError(null)
      
      await roleService.deleteRole(roleId)
      setRoles(prev => prev.filter(role => role.id !== roleId))
      
      return true
    } catch (err) {
      console.error('Error deleting role:', err)
      setError(err.message || 'Error al eliminar el rol')
      return false
    } finally {
      setLoading(false)
    }
  }, [isAdmin])

  /**
   * Obtener usuarios con sus roles
   */
  const fetchUsersWithRoles = useCallback(async (params = {}) => {
    if (!isAdmin) {
      setError('No tienes permisos para ver los usuarios')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const usersData = await roleService.getUsersWithRoles(params)
      setUsers(usersData.users || usersData)
      
      return usersData
    } catch (err) {
      console.error('Error fetching users:', err)
      setError(err.message || 'Error al obtener los usuarios')
    } finally {
      setLoading(false)
    }
  }, [isAdmin])

  /**
   * Asignar rol a usuario
   */
  const assignRoleToUser = useCallback(async (userId, roleId) => {
    if (!isAdmin) {
      setError('No tienes permisos para asignar roles')
      return false
    }

    try {
      setLoading(true)
      setError(null)
      
      await roleService.assignRoleToUser(userId, roleId)
      
      // Actualizar la lista de usuarios localmente
      setUsers(prev => prev.map(user => {
        if (user.id === userId) {
          const role = roles.find(r => r.id === roleId)
          return {
            ...user,
            roles: [...(user.roles || []), role].filter(Boolean)
          }
        }
        return user
      }))
      
      return true
    } catch (err) {
      console.error('Error assigning role:', err)
      setError(err.message || 'Error al asignar el rol')
      return false
    } finally {
      setLoading(false)
    }
  }, [isAdmin, roles])

  /**
   * Remover rol de usuario
   */
  const removeRoleFromUser = useCallback(async (userId, roleId) => {
    if (!isAdmin) {
      setError('No tienes permisos para remover roles')
      return false
    }

    try {
      setLoading(true)
      setError(null)
      
      await roleService.removeRoleFromUser(userId, roleId)
      
      // Actualizar la lista de usuarios localmente
      setUsers(prev => prev.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            roles: (user.roles || []).filter(role => role.id !== roleId)
          }
        }
        return user
      }))
      
      return true
    } catch (err) {
      console.error('Error removing role:', err)
      setError(err.message || 'Error al remover el rol')
      return false
    } finally {
      setLoading(false)
    }
  }, [isAdmin])

  /**
   * Obtener todos los permisos disponibles
   */
  const fetchPermissions = useCallback(async () => {
    if (!isAdmin) {
      setError('No tienes permisos para ver los permisos')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const permissionsData = await roleService.getPermissions()
      setPermissions(permissionsData)
    } catch (err) {
      console.error('Error fetching permissions:', err)
      setError(err.message || 'Error al obtener los permisos')
    } finally {
      setLoading(false)
    }
  }, [isAdmin])

  /**
   * Asignar permisos a rol
   */
  const assignPermissionsToRole = useCallback(async (roleId, permissionsList) => {
    if (!isAdmin) {
      setError('No tienes permisos para asignar permisos')
      return false
    }

    try {
      setLoading(true)
      setError(null)
      
      await roleService.assignPermissionsToRole(roleId, permissionsList)
      
      // Actualizar el rol localmente
      setRoles(prev => prev.map(role => {
        if (role.id === roleId) {
          return {
            ...role,
            permissions: permissionsList
          }
        }
        return role
      }))
      
      return true
    } catch (err) {
      console.error('Error assigning permissions:', err)
      setError(err.message || 'Error al asignar permisos')
      return false
    } finally {
      setLoading(false)
    }
  }, [isAdmin])

  /**
   * Resetear estado de error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // Estado
    loading,
    error,
    roles,
    users,
    permissions,
    isAdmin,
    
    // Funciones para roles
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    
    // Funciones para usuarios
    fetchUsersWithRoles,
    assignRoleToUser,
    removeRoleFromUser,
    
    // Funciones para permisos
    fetchPermissions,
    assignPermissionsToRole,
    
    // Utilidades
    clearError
  }
}

export default useRoleManagement
