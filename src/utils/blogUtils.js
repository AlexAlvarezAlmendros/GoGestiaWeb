/**
 * Utilitarios para el blog
 */

/**
 * Formatea una fecha para mostrar en el blog
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} Fecha formateada en español
 */
export const formatDate = (dateString) => {
  if (!dateString) return ''
  
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Valida si un email tiene formato correcto
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Genera el texto de tiempo de lectura
 * @param {number} readTime - Tiempo en minutos
 * @returns {string} Texto formateado
 */
export const formatReadTime = (readTime) => {
  if (!readTime) return ''
  return `${readTime} min lectura`
}

/**
 * Genera una tabla de contenidos a partir del contenido HTML
 * @param {string} htmlContent - Contenido HTML del artículo
 * @returns {Array} Array de elementos de la tabla de contenidos
 */
export const generateTableOfContents = (htmlContent) => {
  if (!htmlContent) return []
  
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, 'text/html')
    const headings = doc.querySelectorAll('h2, h3, h4')
    
    return Array.from(headings).map((heading, index) => ({
      id: `heading-${index}`,
      text: heading.textContent,
      level: parseInt(heading.tagName.charAt(1))
    }))
  } catch (error) {
    console.warn('Error generating table of contents:', error)
    return []
  }
}

/**
 * Funciones para compartir en redes sociales
 */
export const socialShare = {
  /**
   * Comparte en Twitter
   * @param {Object} params - Parámetros del post
   */
  twitter: ({ title, url }) => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  },

  /**
   * Comparte en LinkedIn
   * @param {Object} params - Parámetros del post
   */
  linkedin: ({ url }) => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  },

  /**
   * Comparte en Facebook
   * @param {Object} params - Parámetros del post
   */
  facebook: ({ url }) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  },

  /**
   * Comparte en WhatsApp
   * @param {Object} params - Parámetros del post
   */
  whatsapp: ({ title, url }) => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  },

  /**
   * Copia el enlace al portapapeles
   * @param {string} url - URL a copiar
   * @returns {Promise<boolean>} True si se copió exitosamente
   */
  copyToClipboard: async (url) => {
    try {
      await navigator.clipboard.writeText(url)
      return true
    } catch (err) {
      console.error('Error al copiar URL:', err)
      return false
    }
  }
}

/**
 * Constantes del blog
 */
export const BLOG_CONSTANTS = {
  DEFAULT_POSTS_PER_PAGE: 10,
  MAX_EXCERPT_LENGTH: 160,
  MAX_TITLE_LENGTH: 60,
  MAX_RELATED_POSTS: 3,
  DEFAULT_READ_TIME: 5
}

/**
 * Funciones de validación
 */
export const validation = {
  /**
   * Valida un slug
   * @param {string} slug - Slug a validar
   * @returns {boolean} True si es válido
   */
  isValidSlug: (slug) => {
    if (!slug || typeof slug !== 'string') return false
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    return slugRegex.test(slug)
  },

  /**
   * Valida el número de página
   * @param {number} page - Página a validar
   * @returns {boolean} True si es válido
   */
  isValidPage: (page) => {
    return Number.isInteger(page) && page > 0
  }
}

/**
 * Funciones de transformación de datos
 */
export const dataTransformers = {
  /**
   * Normaliza un post del API
   * @param {Object} post - Post desde la API
   * @returns {Object} Post normalizado
   */
  normalizePost: (post) => {
    return {
      ...post,
      publishedAt: post.publishedAt || post.date,
      readTime: post.readTime || BLOG_CONSTANTS.DEFAULT_READ_TIME,
      excerpt: post.excerpt || '',
      tags: post.tags || [],
      category: typeof post.category === 'string' 
        ? { name: post.category, slug: post.category.toLowerCase() }
        : post.category
    }
  },

  /**
   * Normaliza una categoría del API
   * @param {Object} category - Categoría desde la API
   * @returns {Object} Categoría normalizada
   */
  normalizeCategory: (category) => {
    return {
      ...category,
      count: category.count || 0,
      slug: category.slug || category.name?.toLowerCase()
    }
  }
}

export default {
  formatDate,
  isValidEmail,
  formatReadTime,
  generateTableOfContents,
  socialShare,
  BLOG_CONSTANTS,
  validation,
  dataTransformers
}
