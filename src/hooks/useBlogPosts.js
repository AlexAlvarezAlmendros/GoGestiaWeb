import { useState, useEffect, useCallback } from 'react'
import blogService from '../services/blogService'

/**
 * Custom hook para manejar la obtención y filtrado de artículos del blog
 * @param {Object} filters - Filtros de búsqueda
 * @param {number} filters.page - Página actual
 * @param {string} filters.category - Categoría seleccionada
 * @param {string} filters.search - Término de búsqueda
 * @param {number} filters.limit - Límite de artículos por página
 * @returns {Object} Estado y funciones para manejar los posts
 */
export const useBlogPosts = (filters = {}) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(null)

  const fetchPosts = useCallback(async (searchFilters) => {
    try {
      setLoading(true)
      setError(null)

      const postsParams = {
        page: searchFilters.page || 1,
        limit: searchFilters.limit || 10
      }
      
      if (searchFilters.category) {
        postsParams.category = searchFilters.category
      }
      
      if (searchFilters.search) {
        postsParams.search = searchFilters.search
      }

      const response = await blogService.getPosts(postsParams)
      
      if (response.success) {
        setPosts(response.data.posts)
        setPagination(response.data.pagination)
      } else {
        // Fallback a datos de ejemplo
        const fallbackData = blogService.getFallbackPosts()
        setPosts(fallbackData.data.posts)
        setPagination(fallbackData.data.pagination)
      }

    } catch (err) {
      console.error('Error fetching blog posts:', err)
      setError('Error al cargar los artículos del blog')
      
      // Usar datos de fallback en caso de error
      const fallbackData = blogService.getFallbackPosts()
      setPosts(fallbackData.data.posts)
      setPagination(fallbackData.data.pagination)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts(filters)
  }, [filters, fetchPosts])

  const refetch = useCallback(() => {
    fetchPosts(filters)
  }, [fetchPosts, filters])

  // Separar artículos destacados y recientes
  const featuredPosts = posts.filter(post => post.featured) || posts.slice(0, 3)
  const recentPosts = posts.filter(post => !post.featured) || posts.slice(3)

  return {
    posts,
    featuredPosts,
    recentPosts,
    loading,
    error,
    pagination,
    refetch
  }
}

/**
 * Custom hook para obtener un artículo específico por slug
 * @param {string} slug - Slug del artículo
 * @returns {Object} Estado del artículo y funciones relacionadas
 */
export const useBlogPost = (slug) => {
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPost = useCallback(async () => {
    if (!slug) return

    try {
      setLoading(true)
      setError(null)

      // Obtener el artículo
      const postResponse = await blogService.getPostBySlug(slug)
      
      if (postResponse.success) {
        setPost(postResponse.data)
        
        // Incrementar vistas de forma asíncrona
        blogService.incrementViews(slug).catch(console.warn)

        // Obtener artículos relacionados
        try {
          const relatedResponse = await blogService.getRelatedPosts(slug)
          if (relatedResponse.success) {
            setRelatedPosts(relatedResponse.data)
          }
        } catch (relatedError) {
          console.warn('No se pudieron cargar artículos relacionados:', relatedError)
        }
      } else {
        setError('Artículo no encontrado')
      }
    } catch (err) {
      console.error('Error fetching blog post:', err)
      setError(err.message || 'Error al cargar el artículo')
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  const refetch = useCallback(() => {
    fetchPost()
  }, [fetchPost])

  return {
    post,
    relatedPosts,
    loading,
    error,
    refetch
  }
}

export default useBlogPosts
