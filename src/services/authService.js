/**
 * Servicio para manejo de autenticación y perfil de usuario
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

class AuthService {
  /**
   * Obtener perfil del usuario actual
   * @returns {Promise<Object>} Perfil del usuario
   */
  async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error obteniendo perfil:', error)
      throw error
    }
  }

  /**
   * Actualizar perfil del usuario
   * @param {Object} profileData - Datos del perfil a actualizar
   * @returns {Promise<Object>} Perfil actualizado
   */
  async updateProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error actualizando perfil:', error)
      throw error
    }
  }

  /**
   * Verificar autenticación actual
   * @returns {Promise<Object>} Información de autenticación
   */
  async checkAuth() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: 'GET',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error verificando autenticación:', error)
      throw error
    }
  }

  /**
   * Enviar email de verificación
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async sendVerificationEmail() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/send-verification-email`, {
        method: 'POST',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error enviando email de verificación:', error)
      throw error
    }
  }
}

// Exportar instancia del servicio
const authService = new AuthService()
export default authService
