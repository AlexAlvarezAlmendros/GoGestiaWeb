import { useState, useRef, useCallback } from 'react'
import blogService from '../services/blogService'

/**
 * Componente para subir y gestionar la imagen destacada del post
 * Versión simplificada sin edición de metadatos
 */
const ImageUploader = ({
  image,
  onImageChange,
  error,
  className = ''
}) => {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(file.type)) {
      return 'Solo se permiten archivos JPG, PNG o WebP'
    }

    if (file.size > maxSize) {
      return 'El archivo no puede ser mayor a 5MB'
    }

    return null
  }

  const handleFileUpload = useCallback(async (file) => {
    const validationError = validateFile(file)
    if (validationError) {
      setUploadError(validationError)
      return
    }

    setUploading(true)
    setUploadError('')

    try {
      // Auto-generar título basado en el nombre del archivo
      const title = file.name.split('.')[0].replace(/[-_]/g, ' ')
      
      const response = await blogService.uploadImage(file, title, '')
      
      if (response.success) {
        // Pasar toda la información de la imagen
        onImageChange({
          url: response.data.url,
          id: response.data.id,
          deleteHash: response.data.deleteHash,
          title: response.data.title,
          description: response.data.description,
          width: response.data.width,
          height: response.data.height,
          size: response.data.size,
          type: response.data.type
        })
      } else {
        setUploadError(response.message || 'Error al subir la imagen')
      }
    } catch (err) {
      setUploadError('Error inesperado al subir la imagen')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }, [onImageChange])

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const removeImage = () => {
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Imagen destacada
      </label>

      {!image ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver
              ? 'border-brand-lime bg-brand-lime bg-opacity-10'
              : 'border-gray-300 hover:border-gray-400'
          } ${error ? 'border-red-300' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {uploading ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-lime mx-auto"></div>
              <p className="text-sm text-gray-600">Subiendo imagen...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Arrastra una imagen aquí o 
                  <button
                    type="button"
                    onClick={openFileDialog}
                    className="text-brand-dark-green hover:text-opacity-80 font-medium ml-1"
                  >
                    selecciona un archivo
                  </button>
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG o WebP hasta 5MB
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Image Preview */}
          <div className="relative rounded-lg overflow-hidden bg-gray-100">
            <img
              src={typeof image === 'string' ? image : image.url}
              alt={typeof image === 'object' && image.title ? image.title : "Imagen destacada"}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={removeImage}
                className="opacity-0 hover:opacity-100 bg-red-600 text-white rounded-full p-2 transition-opacity"
                title="Eliminar imagen"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={openFileDialog}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Cambiar imagen
            </button>
            <button
              type="button"
              onClick={removeImage}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Error Messages */}
      {(error || uploadError) && (
        <p className="mt-2 text-sm text-red-600">
          {error || uploadError}
        </p>
      )}
    </div>
  )
}

export default ImageUploader
