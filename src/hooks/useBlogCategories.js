import { useState, useEffect, useCallback } from 'react'
import blogService from '../services/blogService'

/**
 * Custom hook para manejar las categorías del blog
 * @param {boolean} includeAll - Si incluir la opción "Todos"
 * @returns {Object} Estado y funciones para manejar las categorías
 */
export const useBlogCategories = (includeAll = true) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await blogService.getCategories()
      
      if (response.success) {
        const categoriesData = response.data
        
        const processedCategories = includeAll
          ? [
              { 
                id: 0,
                name: "Todos", 
                slug: "", 
                count: categoriesData.reduce((acc, cat) => acc + cat.count, 0) 
              },
              ...categoriesData
            ]
          : categoriesData

        setCategories(processedCategories)
      } else {
        // Fallback a categorías de ejemplo
        const fallbackData = blogService.getFallbackCategories()
        const categoriesData = fallbackData.data
        
        const processedCategories = includeAll
          ? [
              { 
                id: 0,
                name: "Todos", 
                slug: "", 
                count: categoriesData.reduce((acc, cat) => acc + cat.count, 0) 
              },
              ...categoriesData
            ]
          : categoriesData

        setCategories(processedCategories)
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
      setError('Error al cargar las categorías')
      
      // Usar datos de fallback en caso de error
      const fallbackData = blogService.getFallbackCategories()
      const categoriesData = fallbackData.data
      
      const processedCategories = includeAll
        ? [
            { 
              id: 0,
              name: "Todos", 
              slug: "", 
              count: categoriesData.reduce((acc, cat) => acc + cat.count, 0) 
            },
            ...categoriesData
          ]
        : categoriesData

      setCategories(processedCategories)
    } finally {
      setLoading(false)
    }
  }, [includeAll])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const refetch = useCallback(() => {
    fetchCategories()
  }, [fetchCategories])

  const createCategory = useCallback(async (categoryName) => {
    try {
      const response = await blogService.createCategory(categoryName)
      
      if (response.success) {
        const newCategory = response.data
        setCategories(prev => [...prev, newCategory])
        return newCategory
      } else {
        // Simulación para desarrollo local
        const newCategory = {
          id: Date.now(),
          name: categoryName,
          slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
          count: 0
        }
        setCategories(prev => [...prev, newCategory])
        return newCategory
      }
    } catch (err) {
      console.error('Error creating category:', err)
      
      // Simulación para desarrollo local
      const newCategory = {
        id: Date.now(),
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
        count: 0
      }
      setCategories(prev => [...prev, newCategory])
      return newCategory
    }
  }, [])

  // Función utilitaria para encontrar una categoría por slug
  const findCategoryBySlug = useCallback((slug) => {
    return categories.find(category => category.slug === slug)
  }, [categories])

  // Función utilitaria para obtener el nombre de una categoría por slug
  const getCategoryName = useCallback((slug) => {
    const category = findCategoryBySlug(slug)
    return category?.name || 'Categoría no encontrada'
  }, [findCategoryBySlug])

  return {
    categories,
    loading,
    error,
    refetch,
    createCategory,
    findCategoryBySlug,
    getCategoryName
  }
}

export default useBlogCategories
