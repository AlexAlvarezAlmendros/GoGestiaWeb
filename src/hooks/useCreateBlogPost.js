import { useState, useCallback, useRef } from 'react'
import blogService from '../services/blogService'

/**
 * Hook personalizado para manejar la creación de nuevas entradas del blog
 * Siguiendo principios de Single Responsibility y código limpio
 */
export const useCreateBlogPost = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  
  // Ref para evitar múltiples llamadas sin depender del estado
  const isLoadingRef = useRef(false)

  /**
   * Crea un nuevo post del blog
   * @param {Object} postData - Datos del post a crear
   * @returns {Promise<Object|null>} - Post creado o null si hay error
   */
  const createPost = useCallback(async (postData) => {
    // Generar ID único para esta operación
    const operationId = `create-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    console.log(`[${operationId}] Iniciando creación de post`)

    // Prevenir múltiples llamadas simultáneas usando ref
    if (isLoadingRef.current) {
      console.warn(`[${operationId}] Creación de post ya en progreso, ignorando solicitud duplicada`)
      return null
    }

    try {
      console.log(`[${operationId}] Estableciendo estado de carga`)
      isLoadingRef.current = true
      setLoading(true)
      setError(null)
      setSuccess(false)

      // Validar datos antes del envío
      const validationError = validatePostData(postData)
      if (validationError) {
        throw new Error(validationError)
      }

      // Procesar y formatear los datos del post
      const processedData = processPostData(postData)

      console.log(`[${operationId}] Enviando datos del post:`, processedData)

      // Crear el post
      const response = await blogService.createPost(processedData)

      console.log(`[${operationId}] Respuesta recibida:`, response)

      if (response.success) {
        setSuccess(true)
        console.log(`[${operationId}] Post creado exitosamente:`, response.data)
        return response.data
      } else {
        throw new Error(response.message || 'Error al crear el post')
      }
    } catch (err) {
      console.error(`[${operationId}] Error creating blog post:`, err)
      setError(err.message || 'Error inesperado al crear el post')
      return null
    } finally {
      console.log(`[${operationId}] Limpiando estado de carga`)
      isLoadingRef.current = false
      setLoading(false)
    }
  }, []) // Sin dependencias para evitar recreación

  /**
   * Guarda un post como borrador
   * @param {Object} postData - Datos del post
   * @returns {Promise<Object|null>} - Borrador guardado o null si hay error
   */
  const saveDraft = useCallback(async (postData) => {
    // Prevenir múltiples llamadas simultáneas usando ref
    if (isLoadingRef.current) {
      console.warn('Guardado de borrador ya en progreso, ignorando solicitud duplicada')
      return null
    }

    try {
      isLoadingRef.current = true
      setLoading(true)
      setError(null)

      const draftData = {
        ...processPostData(postData),
        status: 'draft'
      }

      console.log('Guardando borrador:', draftData) // Debug log

      const response = await blogService.saveDraft(draftData)

      if (response.success) {
        console.log('Borrador guardado exitosamente:', response.data) // Debug log
        return response.data
      } else {
        throw new Error(response.message || 'Error al guardar el borrador')
      }
    } catch (err) {
      console.error('Error saving draft:', err)
      setError(err.message || 'Error inesperado al guardar el borrador')
      return null
    } finally {
      isLoadingRef.current = false
      setLoading(false)
    }
  }, []) // Sin dependencias para evitar recreación

  /**
   * Resetea el estado del hook
   */
  const resetState = useCallback(() => {
    setError(null)
    setSuccess(false)
  }, [])

  return {
    createPost,
    saveDraft,
    loading,
    error,
    success,
    resetState
  }
}

/**
 * Valida los datos del post antes de enviarlos
 * @param {Object} postData - Datos a validar
 * @returns {string|null} - Mensaje de error o null si es válido
 */
const validatePostData = (postData) => {
  const { title, content, excerpt, category } = postData

  if (!title?.trim()) {
    return 'El título es obligatorio'
  }

  if (title.trim().length < 5) {
    return 'El título debe tener al menos 5 caracteres'
  }

  if (title.trim().length > 200) {
    return 'El título no puede exceder 200 caracteres'
  }

  if (!content?.trim()) {
    return 'El contenido es obligatorio'
  }

  if (content.trim().length < 100) {
    return 'El contenido debe tener al menos 100 caracteres'
  }

  if (!excerpt?.trim()) {
    return 'El resumen es obligatorio'
  }

  if (excerpt.trim().length < 20) {
    return 'El resumen debe tener al menos 20 caracteres'
  }

  if (excerpt.trim().length > 300) {
    return 'El resumen no puede exceder 300 caracteres'
  }

  if (!category) {
    return 'Debe seleccionar una categoría'
  }

  return null
}

/**
 * Procesa y formatea los datos del post para el envío según la especificación API
 * @param {Object} postData - Datos sin procesar
 * @returns {Object} - Datos procesados según especificación
 */
const processPostData = (postData) => {
  const {
    title,
    content,
    excerpt,
    tags = [],
    featuredImage,
    seo = {},
    status = 'published'
  } = postData

  // Generar slug a partir del título (opcional en la API)
  const slug = generateSlug(title)

  // Procesar tags como array de strings
  const processedTags = Array.isArray(tags) 
    ? tags.filter(tag => tag && typeof tag === 'string' && tag.trim()).map(tag => tag.trim())
    : []

  // Procesar imagen destacada para obtener solo la URL
  let featuredImageUrl = ''
  if (featuredImage) {
    if (typeof featuredImage === 'string') {
      featuredImageUrl = featuredImage
    } else if (featuredImage.url) {
      featuredImageUrl = featuredImage.url
    }
  }

  // Formatear según la especificación exacta de la API
  return {
    title: title.trim(), // string (REQUERIDO)
    content: content.trim(), // string (REQUERIDO)
    excerpt: excerpt?.trim() || '', // string (opcional)
    tags: processedTags, // array de strings
    author: 'GoGestia Team', // string (REQUERIDO)
    published: status === 'published', // boolean
    featuredImage: featuredImageUrl, // string (URL - opcional)
    metaTitle: seo.metaTitle || `${title} | GoGestia`, // string (opcional)
    metaDescription: seo.metaDescription || excerpt?.trim() || '', // string (opcional)
    slug: slug // string (opcional - se genera automáticamente si no se proporciona)
  }
}

/**
 * Genera un slug SEO-friendly a partir del título
 * @param {string} title - Título del post
 * @returns {string} - Slug generado
 */
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    // Reemplazar caracteres especiales españoles
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/ç/g, 'c')
    // Reemplazar espacios y caracteres especiales con guiones
    .replace(/[^a-z0-9]+/g, '-')
    // Remover guiones múltiples
    .replace(/-+/g, '-')
    // Remover guiones al inicio y final
    .replace(/^-|-$/g, '')
}

export default useCreateBlogPost
