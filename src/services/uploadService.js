/**
 * Servicio para manejo de uploads de archivos con autenticación
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// Función para obtener headers de autenticación
const getAuthHeaders = (includeContentType = false) => {
  const headers = {}
  
  if (typeof window !== 'undefined' && window.__authToken) {
    headers['Authorization'] = `Bearer ${window.__authToken}`
  }
  
  if (includeContentType) {
    headers['Content-Type'] = 'application/json'
  }
  
  return headers
}

class UploadService {
  /**
   * Subir imagen
   * @param {File} file - Archivo de imagen a subir
   * @param {Object} options - Opciones adicionales
   * @returns {Promise<Object>} Respuesta con URL de la imagen
   */
  async uploadImage(file, options = {}) {
    try {
      // Validar que es un archivo de imagen
      if (!file.type.startsWith('image/')) {
        throw new Error('El archivo debe ser una imagen')
      }

      // Validar tamaño (5MB máximo por defecto)
      const maxSize = options.maxSize || 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        throw new Error(`El archivo es muy grande. Máximo ${maxSize / 1024 / 1024}MB`)
      }

      const formData = new FormData()
      formData.append('image', file)
      
      // Agregar metadatos si están presentes
      if (options.alt) {
        formData.append('alt', options.alt)
      }
      
      if (options.folder) {
        formData.append('folder', options.folder)
      }

      const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: 'POST',
        headers: getAuthHeaders(), // No incluir Content-Type para FormData
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }))
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error subiendo imagen:', error)
      throw error
    }
  }

  /**
   * Subir múltiples imágenes
   * @param {FileList|Array} files - Archivos a subir
   * @param {Object} options - Opciones adicionales
   * @returns {Promise<Array>} Array con las respuestas de cada upload
   */
  async uploadMultipleImages(files, options = {}) {
    try {
      const uploadPromises = Array.from(files).map(file => 
        this.uploadImage(file, options)
      )
      
      const results = await Promise.allSettled(uploadPromises)
      
      return results.map((result, index) => ({
        file: files[index],
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason.message : null
      }))
    } catch (error) {
      console.error('Error subiendo múltiples imágenes:', error)
      throw error
    }
  }

  /**
   * Obtener lista de imágenes subidas
   * @param {Object} params - Parámetros de consulta
   * @returns {Promise<Object>} Lista paginada de imágenes
   */
  async getUploadedImages(params = {}) {
    try {
      const queryParams = new URLSearchParams()
      
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      if (params.folder) queryParams.append('folder', params.folder)
      if (params.search) queryParams.append('search', params.search)

      const response = await fetch(`${API_BASE_URL}/api/upload/images?${queryParams}`, {
        method: 'GET',
        headers: getAuthHeaders(true)
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error obteniendo imágenes:', error)
      throw error
    }
  }

  /**
   * Eliminar imagen
   * @param {string} imageId - ID de la imagen a eliminar
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async deleteImage(imageId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/upload/image/${imageId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(true)
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error eliminando imagen:', error)
      throw error
    }
  }

  /**
   * Actualizar metadatos de imagen
   * @param {string} imageId - ID de la imagen
   * @param {Object} metadata - Nuevos metadatos
   * @returns {Promise<Object>} Imagen actualizada
   */
  async updateImageMetadata(imageId, metadata) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/upload/image/${imageId}`, {
        method: 'PUT',
        headers: getAuthHeaders(true),
        body: JSON.stringify(metadata)
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error actualizando metadatos:', error)
      throw error
    }
  }
}

// Exportar instancia del servicio
const uploadService = new UploadService()
export default uploadService
