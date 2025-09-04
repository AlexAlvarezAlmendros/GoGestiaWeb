import { useSearchParams } from 'react-router-dom'
import { useCallback, useMemo } from 'react'

/**
 * Custom hook para manejar los filtros de URL de forma limpia
 * @returns {Object} Filtros actuales y funciones para actualizarlos
 */
export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Obtener valores actuales de los filtros
  const filters = useMemo(() => ({
    page: parseInt(searchParams.get('page')) || 1,
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    limit: parseInt(searchParams.get('limit')) || 10
  }), [searchParams])

  // Función para actualizar un filtro específico
  const updateFilter = useCallback((key, value) => {
    const newParams = new URLSearchParams(searchParams)
    
    if (value && value !== '') {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    
    // Reset page cuando se cambian filtros (excepto si se está cambiando la página)
    if (key !== 'page') {
      newParams.delete('page')
    }
    
    setSearchParams(newParams)
  }, [searchParams, setSearchParams])

  // Función para actualizar múltiples filtros a la vez
  const updateFilters = useCallback((newFilters) => {
    const newParams = new URLSearchParams(searchParams)
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== '') {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })
    
    // Reset page cuando se cambian filtros múltiples
    if (!Object.prototype.hasOwnProperty.call(newFilters, 'page')) {
      newParams.delete('page')
    }
    
    setSearchParams(newParams)
  }, [searchParams, setSearchParams])

  // Función para limpiar todos los filtros
  const clearAllFilters = useCallback(() => {
    setSearchParams({})
  }, [setSearchParams])

  // Función para limpiar filtros específicos
  const clearFilters = useCallback((filterKeys) => {
    const newParams = new URLSearchParams(searchParams)
    
    filterKeys.forEach(key => {
      newParams.delete(key)
    })
    
    setSearchParams(newParams)
  }, [searchParams, setSearchParams])

  // Funciones específicas para cada tipo de filtro
  const setPage = useCallback((page) => {
    updateFilter('page', page)
  }, [updateFilter])

  const setCategory = useCallback((category) => {
    updateFilter('category', category)
  }, [updateFilter])

  const setSearch = useCallback((search) => {
    updateFilter('search', search)
  }, [updateFilter])

  const setLimit = useCallback((limit) => {
    updateFilter('limit', limit)
  }, [updateFilter])

  // Función para manejar el submit de búsqueda
  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const searchQuery = formData.get('search')
    setSearch(searchQuery)
  }, [setSearch])

  // Navegación de paginación
  const goToNextPage = useCallback((totalPages) => {
    if (filters.page < totalPages) {
      setPage(filters.page + 1)
    }
  }, [filters.page, setPage])

  const goToPreviousPage = useCallback(() => {
    if (filters.page > 1) {
      setPage(filters.page - 1)
    }
  }, [filters.page, setPage])

  const goToFirstPage = useCallback(() => {
    setPage(1)
  }, [setPage])

  const goToLastPage = useCallback((totalPages) => {
    setPage(totalPages)
  }, [setPage])

  // Verificar si hay filtros activos
  const hasActiveFilters = useMemo(() => {
    return filters.search !== '' || filters.category !== ''
  }, [filters.search, filters.category])

  // Obtener filtros activos para mostrar
  const activeFilters = useMemo(() => {
    const active = []
    
    if (filters.search) {
      active.push({
        type: 'search',
        label: `Búsqueda: "${filters.search}"`,
        value: filters.search,
        onRemove: () => setSearch('')
      })
    }
    
    if (filters.category) {
      active.push({
        type: 'category',
        label: `Categoría: ${filters.category}`,
        value: filters.category,
        onRemove: () => setCategory('')
      })
    }
    
    return active
  }, [filters.search, filters.category, setSearch, setCategory])

  return {
    // Filtros actuales
    filters,
    
    // Verificaciones
    hasActiveFilters,
    activeFilters,
    
    // Funciones de actualización
    updateFilter,
    updateFilters,
    clearAllFilters,
    clearFilters,
    
    // Funciones específicas
    setPage,
    setCategory,
    setSearch,
    setLimit,
    
    // Funciones de navegación
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    
    // Handlers
    handleSearchSubmit
  }
}

export default useUrlFilters
