import { useState } from 'react'
import blogService from '../services/blogService'
import Input from './Input'
import Modal from './Modal'

/**
 * Componente para gestionar múltiples imágenes y insertarlas en el contenido
 * Permite subir imágenes y generar markdown para insertar en el editor
 */
const ImageManager = ({
  isOpen,
  onClose,
  onInsertImage,
  className = ''
}) => {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadedImages, setUploadedImages] = useState([])
  const [imageMetadata, setImageMetadata] = useState({
    title: '',
    description: '',
    altText: ''
  })

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

  const handleFileUpload = async (file) => {
    const validationError = validateFile(file)
    if (validationError) {
      setUploadError(validationError)
      return
    }

    setUploading(true)
    setUploadError('')

    try {
      const title = imageMetadata.title || file.name.split('.')[0].replace(/[-_]/g, ' ')
      
      const response = await blogService.uploadImage(
        file, 
        title, 
        imageMetadata.description
      )
      
      if (response.success) {
        const newImage = {
          ...response.data,
          altText: imageMetadata.altText || title
        }
        
        setUploadedImages(prev => [newImage, ...prev])
        setImageMetadata({ title: '', description: '', altText: '' })
      } else {
        setUploadError(response.message || 'Error al subir la imagen')
      }
    } catch (err) {
      setUploadError('Error inesperado al subir la imagen')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const generateMarkdown = (image, size = 'medium') => {
    const sizes = {
      small: '400',
      medium: '800', 
      large: '1200'
    }
    
    const width = sizes[size]
    const markdown = `![${image.altText || image.title}](${image.url}${width ? `?w=${width}` : ''})`
    
    return markdown
  }

  const insertImage = (image, size = 'medium') => {
    const markdown = generateMarkdown(image, size)
    onInsertImage(markdown)
    onClose()
  }

  const copyImageUrl = (url) => {
    navigator.clipboard.writeText(url)
    // Aquí podrías mostrar una notificación
  }

  const resetForm = () => {
    setImageMetadata({ title: '', description: '', altText: '' })
    setUploadError('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Gestionar Imágenes"
      className="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Upload Form */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Subir nueva imagen</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Título"
              value={imageMetadata.title}
              onChange={(e) => setImageMetadata(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Título de la imagen..."
            />
            
            <Input
              label="Texto alternativo (Alt)"
              value={imageMetadata.altText}
              onChange={(e) => setImageMetadata(prev => ({ ...prev, altText: e.target.value }))}
              placeholder="Descripción para accesibilidad..."
            />
          </div>
          
          <Input
            label="Descripción"
            type="textarea"
            value={imageMetadata.description}
            onChange={(e) => setImageMetadata(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Descripción detallada de la imagen..."
            className="mb-4"
          />

          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-lime file:text-brand-dark-green hover:file:opacity-90"
              disabled={uploading}
            />
            
            {uploading && (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-lime"></div>
                <span className="text-sm text-gray-600">Subiendo...</span>
              </div>
            )}
          </div>

          {uploadError && (
            <p className="mt-2 text-sm text-red-600">{uploadError}</p>
          )}
        </div>

        {/* Uploaded Images Gallery */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Imágenes subidas ({uploadedImages.length})
          </h3>
          
          {uploadedImages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No hay imágenes subidas. Sube tu primera imagen arriba.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedImages.map((image) => (
                <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={image.url}
                      alt={image.altText || image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-gray-900 mb-1 truncate">
                      {image.title}
                    </h4>
                    
                    {image.description && (
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                    
                    <div className="text-xs text-gray-500 mb-3">
                      {image.width} × {image.height}px • {Math.round(image.size / 1024)} KB
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        <button
                          onClick={() => insertImage(image, 'small')}
                          className="flex-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        >
                          Pequeña
                        </button>
                        <button
                          onClick={() => insertImage(image, 'medium')}
                          className="flex-1 px-2 py-1 text-xs bg-brand-lime text-brand-dark-green rounded hover:opacity-90"
                        >
                          Mediana
                        </button>
                        <button
                          onClick={() => insertImage(image, 'large')}
                          className="flex-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        >
                          Grande
                        </button>
                      </div>
                      
                      <button
                        onClick={() => copyImageUrl(image.url)}
                        className="w-full px-2 py-1 text-xs text-brand-dark-green hover:text-opacity-80"
                      >
                        Copiar URL
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ImageManager
