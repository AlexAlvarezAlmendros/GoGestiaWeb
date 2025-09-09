import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import RichTextEditor from '../components/RichTextEditor'
import CategorySelector from '../components/CategorySelector'
import TagManager from '../components/TagManager'
import ImageUploader from '../components/ImageUploader'
import Modal from '../components/Modal'
import { useCreateBlogPost } from '../hooks/useCreateBlogPost'
import { useSEO } from '../hooks/useSEO'

/**
 * Página para crear nuevas entradas del blog
 * Implementa principios de código limpio y mantenibilidad
 */
const CreateBlogPost = () => {
  const navigate = useNavigate()
  const { createPost, saveDraft, loading, error, success } = useCreateBlogPost()
  
  // Configurar SEO
  useSEO({
    title: 'Crear Nueva Entrada - Blog GoGestia',
    description: 'Crea una nueva entrada para el blog de GoGestia',
    robots: 'noindex, nofollow'
  })

  // Estado del formulario
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: null,
    tags: [],
    featuredImage: null,
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    },
    publishedAt: '',
    status: 'published'
  })

  // Estado de validación
  const [validationErrors, setValidationErrors] = useState({})
  
  // Estado de la interfaz
  const [showExitModal, setShowExitModal] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false) // Prevenir múltiples operaciones

  // Manejadores de cambios en el formulario
  const updateField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setHasUnsavedChanges(true)
    
    // Limpiar error de validación si existe
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }, [validationErrors])

  const updateSEOField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value
      }
    }))
    setHasUnsavedChanges(true)
  }, [])

  // Validación del formulario
  const validateForm = useCallback(() => {
    const errors = {}

    if (!formData.title.trim()) {
      errors.title = 'El título es obligatorio'
    } else if (formData.title.trim().length < 5) {
      errors.title = 'El título debe tener al menos 5 caracteres'
    }

    if (!formData.excerpt.trim()) {
      errors.excerpt = 'El resumen es obligatorio'
    } else if (formData.excerpt.trim().length < 20) {
      errors.excerpt = 'El resumen debe tener al menos 20 caracteres'
    }

    if (!formData.content.trim()) {
      errors.content = 'El contenido es obligatorio'
    } else if (formData.content.trim().length < 100) {
      errors.content = 'El contenido debe tener al menos 100 caracteres'
    }

    if (!formData.category) {
      errors.category = 'Debe seleccionar una categoría'
    }

    // Validaciones SEO
    if (formData.seo.metaTitle) {
      const metaTitleLength = formData.seo.metaTitle.trim().length
      if (metaTitleLength < 30) {
        errors.metaTitle = 'El meta título debe tener al menos 30 caracteres'
      } else if (metaTitleLength > 60) {
        errors.metaTitle = 'El meta título no puede exceder 60 caracteres (Google lo truncará)'
      } else if (metaTitleLength < 50 || metaTitleLength > 55) {
        errors.metaTitle = `${metaTitleLength} caracteres. Óptimo: 50-55 caracteres`
      }
    }

    if (formData.seo.metaDescription) {
      const metaDescriptionLength = formData.seo.metaDescription.trim().length
      if (metaDescriptionLength < 120) {
        errors.metaDescription = 'La meta descripción debe tener al menos 120 caracteres'
      } else if (metaDescriptionLength > 160) {
        errors.metaDescription = 'La meta descripción no puede exceder 160 caracteres (Google la truncará)'
      } else if (metaDescriptionLength < 150 || metaDescriptionLength > 155) {
        errors.metaDescription = `${metaDescriptionLength} caracteres. Óptimo: 150-155 caracteres`
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }, [formData])

  // Manejadores de acciones
  const handleSaveDraft = async () => {
    // Prevenir múltiples clics mientras se está procesando
    if (loading || isProcessing) {
      console.warn('Operación ya en progreso, ignorando clic adicional')
      return
    }

    setIsProcessing(true)
    
    // Timeout de seguridad para resetear el estado
    const safetyTimeout = setTimeout(() => {
      console.warn('Timeout de seguridad activado, reseteando estado')
      setIsProcessing(false)
    }, 30000) // 30 segundos

    try {
      const draft = await saveDraft(formData)
      if (draft) {
        setHasUnsavedChanges(false)
        // Mostrar notificación de éxito
        alert('Borrador guardado exitosamente')
      }
    } catch (err) {
      console.error('Error saving draft:', err)
    } finally {
      clearTimeout(safetyTimeout)
      setIsProcessing(false)
    }
  }

  const handlePublish = async () => {
    const clickId = `click-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    console.log(`[${clickId}] Botón publicar clickeado`)
    
    // Prevenir múltiples clics mientras se está procesando
    if (loading || isProcessing) {
      console.warn(`[${clickId}] Operación ya en progreso (loading: ${loading}, isProcessing: ${isProcessing}), ignorando clic adicional`)
      return
    }

    if (!validateForm()) {
      console.log(`[${clickId}] Validación del formulario falló`)
      return
    }

    console.log(`[${clickId}] Iniciando proceso de publicación`)
    setIsProcessing(true)
    
    // Timeout de seguridad para resetear el estado
    const safetyTimeout = setTimeout(() => {
      console.warn(`[${clickId}] Timeout de seguridad activado, reseteando estado`)
      setIsProcessing(false)
    }, 30000) // 30 segundos

    try {
      console.log(`[${clickId}] Llamando a createPost con datos:`, formData)
      const publishedPost = await createPost(formData)
      console.log(`[${clickId}] createPost completado, resultado:`, publishedPost)
      
      if (publishedPost) {
        setHasUnsavedChanges(false)
        console.log(`[${clickId}] Redirigiendo a /blog/${publishedPost.slug}`)
        // Redirigir al post publicado
        navigate(`/blog/${publishedPost.slug}`)
      } else {
        console.warn(`[${clickId}] publishedPost es null, no se redirige`)
      }
    } catch (err) {
      console.error(`[${clickId}] Error publishing post:`, err)
    } finally {
      console.log(`[${clickId}] Limpiando estado`)
      clearTimeout(safetyTimeout)
      setIsProcessing(false)
    }
  }

  const handleExit = () => {
    if (hasUnsavedChanges) {
      setShowExitModal(true)
    } else {
      navigate('/blog')
    }
  }

  const confirmExit = () => {
    setShowExitModal(false)
    navigate('/blog')
  }

  const cancelExit = () => {
    setShowExitModal(false)
  }

  // Auto-generar meta título si está vacío
  const handleTitleChange = (value) => {
    updateField('title', value)
    
    if (!formData.seo.metaTitle || formData.seo.metaTitle === `${formData.title} | GoGestia`) {
      updateSEOField('metaTitle', `${value} | GoGestia`)
    }
  }

  // Auto-generar meta descripción si está vacía
  const handleExcerptChange = (value) => {
    updateField('excerpt', value)
    
    if (!formData.seo.metaDescription || formData.seo.metaDescription === formData.excerpt) {
      updateSEOField('metaDescription', value)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crear Nueva Entrada</h1>
              <p className="text-gray-600 mt-1">Comparte tu conocimiento con la comunidad</p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleExit}
                disabled={loading}
              >
                Cancelar
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={handleSaveDraft}
                disabled={loading || isProcessing}
              >
                {loading || isProcessing ? 'Guardando...' : 'Guardar Borrador'}
              </Button>
              
              <Button 
                variant="primary" 
                onClick={handlePublish}
                disabled={loading || isProcessing}
              >
                {loading || isProcessing ? 'Publicando...' : 'Publicar'}
              </Button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Información Básica</h2>
              
              <div className="space-y-4">
                <Input
                  label="Título"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Escribe un título atractivo..."
                  error={validationErrors.title}
                  required
                />

                <Input
                  label="Resumen"
                  name="excerpt"
                  type="textarea"
                  value={formData.excerpt}
                  onChange={(e) => handleExcerptChange(e.target.value)}
                  placeholder="Breve descripción que aparecerá en la lista de posts..."
                  error={validationErrors.excerpt}
                  required
                />
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contenido</h2>
              
              <RichTextEditor
                value={formData.content}
                onChange={(value) => updateField('content', value)}
                placeholder="Escribe el contenido de tu post aquí..."
                error={validationErrors.content}
                minHeight="400px"
              />
            </div>

            {/* SEO Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuración SEO</h2>
              
              <div className="space-y-4">
                <div>
                  <Input
                    label="Meta Título"
                    name="metaTitle"
                    value={formData.seo.metaTitle}
                    onChange={(e) => updateSEOField('metaTitle', e.target.value)}
                    placeholder="Título para motores de búsqueda..."
                    error={validationErrors.metaTitle}
                    helperText={`${formData.seo.metaTitle.length}/60 caracteres. Óptimo: 50-55`}
                  />
                  {formData.seo.metaTitle && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          formData.seo.metaTitle.length >= 50 && formData.seo.metaTitle.length <= 55 
                            ? 'bg-green-500' 
                            : formData.seo.metaTitle.length >= 30 && formData.seo.metaTitle.length <= 60
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}></div>
                        <span className="text-xs text-gray-600">
                          {formData.seo.metaTitle.length >= 50 && formData.seo.metaTitle.length <= 55 
                            ? 'Longitud óptima' 
                            : formData.seo.metaTitle.length >= 30 && formData.seo.metaTitle.length <= 60
                              ? 'Longitud aceptable'
                              : 'Necesita optimización'
                          }
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Input
                    label="Meta Descripción"
                    name="metaDescription"
                    type="textarea"
                    value={formData.seo.metaDescription}
                    onChange={(e) => updateSEOField('metaDescription', e.target.value)}
                    placeholder="Descripción para motores de búsqueda..."
                    error={validationErrors.metaDescription}
                    helperText={`${formData.seo.metaDescription.length}/160 caracteres. Óptimo: 150-155`}
                  />
                  {formData.seo.metaDescription && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          formData.seo.metaDescription.length >= 150 && formData.seo.metaDescription.length <= 155 
                            ? 'bg-green-500' 
                            : formData.seo.metaDescription.length >= 120 && formData.seo.metaDescription.length <= 160
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}></div>
                        <span className="text-xs text-gray-600">
                          {formData.seo.metaDescription.length >= 150 && formData.seo.metaDescription.length <= 155 
                            ? 'Longitud óptima' 
                            : formData.seo.metaDescription.length >= 120 && formData.seo.metaDescription.length <= 160
                              ? 'Longitud aceptable'
                              : 'Necesita optimización'
                          }
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => updateField('status', e.target.value)}
                    className="input-field"
                  >
                    <option value="published">Publicado</option>
                    <option value="draft">Borrador</option>
                    <option value="scheduled">Programado</option>
                  </select>
                </div>

                {formData.status === 'scheduled' && (
                  <Input
                    label="Fecha de Publicación"
                    name="publishedAt"
                    type="datetime-local"
                    value={formData.publishedAt}
                    onChange={(e) => updateField('publishedAt', e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <CategorySelector
                selectedCategory={formData.category}
                onCategoryChange={(category) => updateField('category', category)}
                error={validationErrors.category}
                required
              />
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <TagManager
                tags={formData.tags}
                onTagsChange={(tags) => updateField('tags', tags)}
              />
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ImageUploader
                image={formData.featuredImage}
                onImageChange={(image) => updateField('featuredImage', image)}
              />
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error al publicar</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Display */}
        {success && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">¡Publicado exitosamente!</h3>
                <p className="text-sm text-green-700 mt-1">Tu entrada ha sido publicada correctamente.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exit Confirmation Modal */}
      <Modal
        isOpen={showExitModal}
        onClose={cancelExit}
        title="¿Descartar cambios?"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Tienes cambios sin guardar. ¿Estás seguro de que quieres salir sin guardar?
          </p>
          
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={cancelExit}>
              Cancelar
            </Button>
            <Button variant="secondary" onClick={handleSaveDraft}>
              Guardar Borrador
            </Button>
            <Button variant="primary" onClick={confirmExit}>
              Salir sin Guardar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CreateBlogPost
