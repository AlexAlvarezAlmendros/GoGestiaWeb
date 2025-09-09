import { useState, useRef, useCallback, useEffect } from 'react'
import ImageManager from './ImageManager'

/**
 * Editor de texto enriquecido HTML con interfaz WYSIWYG
 * Muestra formato visual pero genera HTML internamente
 */
const RichTextEditor = ({
  value = '',
  onChange,
  placeholder = 'Escribe tu contenido aquí...',
  error,
  className = '',
  minHeight = '300px'
}) => {
  const [isPreview, setIsPreview] = useState(false)
  const [showImageManager, setShowImageManager] = useState(false)
  const [isHtmlView, setIsHtmlView] = useState(false)
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    h1: false,
    h2: false,
    h3: false,
    ul: false,
    ol: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false
  })
  const editorRef = useRef(null)

  // Sincronizar contenido HTML con el editor contentEditable
  useEffect(() => {
    if (editorRef.current && !isPreview && !isHtmlView) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || ''
      }
    }
  }, [value, isPreview, isHtmlView])

  // Función para detectar formatos activos en la posición del cursor
  const updateActiveFormats = useCallback(() => {
    if (!editorRef.current || isPreview || isHtmlView) return

    const newFormats = {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      h1: document.queryCommandValue('formatBlock') === 'h1',
      h2: document.queryCommandValue('formatBlock') === 'h2',
      h3: document.queryCommandValue('formatBlock') === 'h3',
      ul: document.queryCommandState('insertUnorderedList'),
      ol: document.queryCommandState('insertOrderedList'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight')
    }

    setActiveFormats(newFormats)
  }, [isPreview, isHtmlView])

  // Actualizar formatos activos cuando cambie la selección
  useEffect(() => {
    const handleSelectionChange = () => {
      updateActiveFormats()
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [updateActiveFormats])

  const handleContentChange = useCallback(() => {
    if (editorRef.current && onChange) {
      const htmlContent = editorRef.current.innerHTML
      onChange(htmlContent)
    }
  }, [onChange])

  const handleTextareaChange = useCallback((e) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }, [onChange])

  const executeCommand = useCallback((command, value = null) => {
    document.execCommand(command, false, value)
    handleContentChange()
    if (editorRef.current) {
      editorRef.current.focus()
    }
    // Actualizar formatos activos después del comando
    setTimeout(updateActiveFormats, 10)
  }, [handleContentChange, updateActiveFormats])

  const insertImageHtml = useCallback((imageData) => {
    const img = document.createElement('img')
    img.src = imageData.url
    img.alt = imageData.title || 'Imagen'
    img.className = 'w-full max-w-2xl mx-auto rounded-lg shadow-md my-6'
    img.style.maxWidth = '100%'
    img.style.height = 'auto'
    
    if (editorRef.current) {
      editorRef.current.focus()
      
      // Insertar imagen en la posición del cursor
      const selection = window.getSelection()
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        range.deleteContents()
        range.insertNode(img)
        
        // Mover cursor después de la imagen
        range.setStartAfter(img)
        range.setEndAfter(img)
        selection.removeAllRanges()
        selection.addRange(range)
      } else {
        editorRef.current.appendChild(img)
      }
      
      handleContentChange()
    }
  }, [handleContentChange])

  const toolbarButtons = [
    {
      title: 'Negrita',
      icon: 'B',
      action: () => executeCommand('bold'),
      className: 'font-bold',
      isActive: activeFormats.bold,
      activeKey: 'bold'
    },
    {
      title: 'Cursiva',
      icon: 'I',
      action: () => executeCommand('italic'),
      className: 'italic',
      isActive: activeFormats.italic,
      activeKey: 'italic'
    },
    {
      title: 'Subrayado',
      icon: 'U',
      action: () => executeCommand('underline'),
      className: 'underline',
      isActive: activeFormats.underline,
      activeKey: 'underline'
    },
    {
      title: 'Título 1',
      icon: 'H1',
      action: () => executeCommand('formatBlock', 'h1'),
      className: 'text-lg font-bold',
      isActive: activeFormats.h1,
      activeKey: 'h1'
    },
    {
      title: 'Título 2',
      icon: 'H2',
      action: () => executeCommand('formatBlock', 'h2'),
      className: 'text-base font-bold',
      isActive: activeFormats.h2,
      activeKey: 'h2'
    },
    {
      title: 'Título 3',
      icon: 'H3',
      action: () => executeCommand('formatBlock', 'h3'),
      className: 'text-sm font-bold',
      isActive: activeFormats.h3,
      activeKey: 'h3'
    },
    {
      title: 'Párrafo',
      icon: 'P',
      action: () => executeCommand('formatBlock', 'p'),
      className: 'font-normal',
      isActive: false // Los párrafos no tienen estado "activo" visual
    },
    {
      title: 'Lista con viñetas',
      icon: '•',
      action: () => executeCommand('insertUnorderedList'),
      className: 'font-bold',
      isActive: activeFormats.ul,
      activeKey: 'ul'
    },
    {
      title: 'Lista numerada',
      icon: '1.',
      action: () => executeCommand('insertOrderedList'),
      isActive: activeFormats.ol,
      activeKey: 'ol'
    },
    {
      title: 'Enlace',
      icon: '🔗',
      action: () => {
        const url = prompt('Introduce la URL del enlace:')
        if (url) executeCommand('createLink', url)
      },
      className: 'text-sm',
      isActive: false // Los enlaces no tienen estado persistente
    },
    {
      title: 'Imagen',
      icon: '🖼️',
      action: () => setShowImageManager(true),
      className: 'text-sm',
      isActive: false
    },
    {
      title: 'Alinear izquierda',
      icon: '⬅️',
      action: () => executeCommand('justifyLeft'),
      className: 'text-xs',
      isActive: activeFormats.justifyLeft,
      activeKey: 'justifyLeft'
    },
    {
      title: 'Centrar',
      icon: '↔️',
      action: () => executeCommand('justifyCenter'),
      className: 'text-xs',
      isActive: activeFormats.justifyCenter,
      activeKey: 'justifyCenter'
    },
    {
      title: 'Alinear derecha',
      icon: '➡️',
      action: () => executeCommand('justifyRight'),
      className: 'text-xs',
      isActive: activeFormats.justifyRight,
      activeKey: 'justifyRight'
    },
    {
      title: 'Deshacer',
      icon: '↶',
      action: () => executeCommand('undo'),
      className: 'text-xs',
      isActive: false
    },
    {
      title: 'Rehacer',
      icon: '↷',
      action: () => executeCommand('redo'),
      className: 'text-xs',
      isActive: false
    }
  ]

  const sanitizeHtml = (html) => {
    // Limpiar y validar HTML básico
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remover scripts
      .replace(/on\w+="[^"]*"/g, '') // Remover event handlers
      .replace(/javascript:/gi, '') // Remover javascript: urls
  }

  const cleanHtmlForOutput = (html) => {
    // Limpiar y formatear HTML para salida
    let cleanHtml = sanitizeHtml(html)
    
    // Aplicar clases de Tailwind a elementos generados por contentEditable
    cleanHtml = cleanHtml
      .replace(/<h1>/g, '<h1 class="text-3xl font-bold mb-4">')
      .replace(/<h2>/g, '<h2 class="text-2xl font-bold mb-3">')
      .replace(/<h3>/g, '<h3 class="text-xl font-bold mb-2">')
      .replace(/<p>/g, '<p class="mb-4">')
      .replace(/<ul>/g, '<ul class="list-disc pl-6 mb-4">')
      .replace(/<ol>/g, '<ol class="list-decimal pl-6 mb-4">')
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">')
      .replace(/<a /g, '<a class="text-blue-600 hover:text-blue-800 underline" ')
    
    return cleanHtml
  }

  const renderPreview = () => {
    return cleanHtmlForOutput(value)
  }

  return (
    <div className={`border rounded-lg overflow-hidden ${error ? 'border-red-300' : 'border-gray-300'} ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-3">
        <div className="flex items-center gap-1 flex-wrap">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              title={button.title}
              onClick={button.action}
              className={`
                px-2 py-1 text-xs border rounded transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-brand-lime
                ${button.isActive 
                  ? 'bg-brand-lime border-brand-dark-green text-brand-dark-green shadow-md transform scale-105' 
                  : 'border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                }
                ${button.className || ''}
              `}
            >
              {button.icon}
            </button>
          ))}
          
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={() => {
                setIsPreview(false)
                setIsHtmlView(false)
              }}
              className={`px-3 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-brand-lime transition-colors ${
                !isPreview && !isHtmlView
                  ? 'bg-brand-lime text-brand-dark-green' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPreview(true)
                setIsHtmlView(false)
              }}
              className={`px-3 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-brand-lime transition-colors ${
                isPreview && !isHtmlView
                  ? 'bg-brand-lime text-brand-dark-green' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Vista previa
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPreview(false)
                setIsHtmlView(true)
              }}
              className={`px-2 py-1 text-xs rounded focus:outline-none focus:ring-2 focus:ring-brand-lime transition-colors ${
                isHtmlView
                  ? 'bg-orange-200 text-orange-800' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              title="Vista HTML (para desarrolladores)"
            >
              {'</>'}
            </button>
          </div>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="relative">
        {isPreview ? (
          <div 
            className="p-4 prose prose-gray max-w-none"
            style={{ minHeight }}
            dangerouslySetInnerHTML={{ __html: renderPreview() }}
          />
        ) : isHtmlView ? (
          <textarea
            value={value}
            onChange={handleTextareaChange}
            placeholder="Vista HTML del contenido..."
            className="w-full p-4 border-none outline-none resize-none focus:ring-0 font-mono text-sm bg-gray-50"
            style={{ minHeight }}
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning={true}
            onInput={handleContentChange}
            onBlur={handleContentChange}
            onKeyUp={updateActiveFormats}
            onMouseUp={updateActiveFormats}
            onClick={updateActiveFormats}
            className="w-full p-4 border-none outline-none focus:ring-0 prose prose-gray max-w-none"
            style={{ 
              minHeight,
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
            data-placeholder={placeholder}
          />
        )}
      </div>

      {/* Estilos para el placeholder del editor contentEditable */}
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          font-style: italic;
        }
        [contenteditable] h1 {
          font-size: 1.875rem;
          font-weight: bold;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        [contenteditable] p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        [contenteditable] ul, [contenteditable] ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        [contenteditable] ul {
          list-style-type: disc;
        }
        [contenteditable] ol {
          list-style-type: decimal;
        }
        [contenteditable] li {
          margin-bottom: 0.25rem;
        }
        [contenteditable] a {
          color: #2563eb;
          text-decoration: underline;
        }
        [contenteditable] a:hover {
          color: #1d4ed8;
        }
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          margin: 1.5rem auto;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        [contenteditable] strong {
          font-weight: bold;
        }
        [contenteditable] em {
          font-style: italic;
        }
        [contenteditable] u {
          text-decoration: underline;
        }
      `}</style>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border-t border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Help Text */}
      {!isPreview && !isHtmlView && (
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Editor visual: Usa los botones de la barra de herramientas para formatear tu contenido. 
            El texto se guardará automáticamente como <strong>HTML</strong>.
          </p>
        </div>
      )}

      {isHtmlView && (
        <div className="p-3 bg-orange-50 border-t border-orange-200">
          <p className="text-xs text-orange-700">
            <strong>Vista HTML:</strong> Edición avanzada del código HTML. 
            Cambia a "Editar" para volver al editor visual.
          </p>
        </div>
      )}
      
      {/* Image Manager Modal */}
      <ImageManager
        isOpen={showImageManager}
        onClose={() => setShowImageManager(false)}
        onInsertImage={insertImageHtml}
      />
    </div>
  )
}

export default RichTextEditor
