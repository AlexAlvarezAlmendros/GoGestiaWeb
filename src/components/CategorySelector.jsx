import { useState } from 'react'
import { useBlogCategories } from '../hooks/useBlogCategories'

/**
 * Selector de categorías con funcionalidad para crear nuevas categorías
 * Componente reutilizable y accesible
 */
const CategorySelector = ({
  selectedCategory,
  onCategoryChange,
  error,
  required = false,
  className = ''
}) => {
  const { categories, loading, createCategory } = useBlogCategories()
  const [isCreating, setIsCreating] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [createError, setCreateError] = useState('')

  const handleCategorySelect = (categoryId) => {
    const category = categories.find(cat => cat.id === parseInt(categoryId))
    onCategoryChange(category)
  }

  const handleCreateCategory = async (e) => {
    e.preventDefault()
    
    if (!newCategoryName.trim()) {
      setCreateError('El nombre de la categoría es obligatorio')
      return
    }

    if (newCategoryName.trim().length < 2) {
      setCreateError('El nombre debe tener al menos 2 caracteres')
      return
    }

    // Verificar si ya existe
    const exists = categories.some(cat => 
      cat.name.toLowerCase() === newCategoryName.trim().toLowerCase()
    )

    if (exists) {
      setCreateError('Esta categoría ya existe')
      return
    }

    try {
      const newCategory = await createCategory(newCategoryName.trim())
      if (newCategory) {
        onCategoryChange(newCategory)
        setNewCategoryName('')
        setIsCreating(false)
        setCreateError('')
      }
    } catch {
      setCreateError('Error al crear la categoría')
    }
  }

  const cancelCreate = () => {
    setIsCreating(false)
    setNewCategoryName('')
    setCreateError('')
  }

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoría
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="animate-pulse">
          <div className="h-11 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Categoría
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {!isCreating ? (
        <div className="space-y-3">
          <select
            value={selectedCategory?.id || ''}
            onChange={(e) => handleCategorySelect(e.target.value)}
            className={`input-field ${
              error 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-brand-lime focus:border-brand-lime'
            }`}
            required={required}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count || 0} posts)
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="text-sm text-brand-dark-green hover:text-opacity-80 font-medium"
          >
            + Crear nueva categoría
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <form onSubmit={handleCreateCategory} className="space-y-3">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nombre de la nueva categoría"
              className={`input-field ${
                createError 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-brand-lime focus:border-brand-lime'
              }`}
              autoFocus
            />
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-brand-lime text-brand-dark-green rounded hover:opacity-90 font-medium"
              >
                Crear
              </button>
              <button
                type="button"
                onClick={cancelCreate}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Error Messages */}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      {createError && (
        <p className="mt-2 text-sm text-red-600">{createError}</p>
      )}

      {/* Selected Category Display */}
      {selectedCategory && !isCreating && (
        <div className="mt-2 p-2 bg-brand-lime bg-opacity-20 rounded-md">
          <p className="text-sm text-brand-dark-green">
            <strong>Seleccionada:</strong> {selectedCategory.name}
          </p>
        </div>
      )}
    </div>
  )
}

export default CategorySelector
