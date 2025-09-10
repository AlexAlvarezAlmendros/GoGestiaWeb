import { useState, useCallback } from 'react'

/**
 * Componente para gestionar tags de forma interactiva
 * Permite agregar, eliminar y validar tags
 */
const TagManager = ({
  tags = [],
  onTagsChange,
  maxTags = 10,
  maxTagLength = 30,
  placeholder = 'Agregar tag...',
  error,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')

  const addTag = useCallback((tagText) => {
    const newTag = tagText.trim()

    // Validaciones
    if (!newTag) {
      setInputError('El tag no puede estar vacío')
      return false
    }

    if (newTag.length > maxTagLength) {
      setInputError(`El tag no puede tener más de ${maxTagLength} caracteres`)
      return false
    }

    if (tags.length >= maxTags) {
      setInputError(`No puedes agregar más de ${maxTags} tags`)
      return false
    }

    if (tags.some(tag => tag.toLowerCase() === newTag.toLowerCase())) {
      setInputError('Este tag ya existe')
      return false
    }

    // Agregar el tag
    onTagsChange([...tags, newTag])
    setInputValue('')
    setInputError('')
    return true
  }, [tags, onTagsChange, maxTags, maxTagLength])

  const removeTag = useCallback((indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove)
    onTagsChange(newTags)
  }, [tags, onTagsChange])

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Eliminar el último tag si el input está vacío
      removeTag(tags.length - 1)
    } else if (e.key === ',' || e.key === ';') {
      e.preventDefault()
      addTag(inputValue)
    }
  }

  const handleInputPaste = (e) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')
    const newTags = pastedText
      .split(/[,;]/)
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    newTags.forEach(tag => addTag(tag))
  }

  const suggestedTags = [
    'Digitalización',
    'Automatización',
    'IA',
    'Procesos',
    'Tecnología',
    'Empresas',
    'Innovación',
    'Eficiencia',
    'ROI',
    'Transformación Digital'
  ]

  const availableSuggestions = suggestedTags.filter(
    suggestion => !tags.some(tag => tag.toLowerCase() === suggestion.toLowerCase())
  )

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tags
        <span className="text-gray-500 font-normal ml-1">
          ({tags.length}/{maxTags})
        </span>
      </label>

      {/* Tags Display */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 bg-brand-lime text-brand-dark-green rounded-full text-sm font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-2 text-brand-dark-green hover:text-red-600 font-bold"
              title="Eliminar tag"
            >
              ×
            </button>
          </span>
        ))}
        
        {/* Input for new tags */}
        {tags.length < maxTags && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            onPaste={handleInputPaste}
            placeholder={placeholder}
            className="flex-1 min-w-32 px-3 py-1 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-brand-lime"
          />
        )}
      </div>

      {/* Error Messages */}
      {(error || inputError) && (
        <p className="text-sm text-red-600 mb-3">
          {error || inputError}
        </p>
      )}

      {/* Suggested Tags */}
      {availableSuggestions.length > 0 && tags.length < maxTags && (
        <div>
          <p className="text-sm text-gray-600 mb-2">Tags sugeridos:</p>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 5).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addTag(suggestion)}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Helper Text */}
      <p className="text-xs text-gray-500 mt-2">
        Presiona Enter, coma o punto y coma para agregar un tag. 
        Usa Backspace para eliminar el último tag.
      </p>
    </div>
  )
}

export default TagManager
