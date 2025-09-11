import useDocumentHead from '../hooks/useDocumentHead'

/**
 * Componente alternativo para SEO sin dependencias externas
 * Compatible con React 19 y todas las versiones
 */
const SEOHeadNative = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'GoGestia',
  tags = [],
  canonical,
  noindex = false
}) => {
  // Usar el hook nativo para gestionar los meta tags
  useDocumentHead({
    title,
    description,
    image,
    url,
    type,
    publishedTime,
    modifiedTime,
    author,
    tags,
    canonical,
    noindex
  })

  // Este componente no renderiza nada visualmente
  return null
}

export default SEOHeadNative
