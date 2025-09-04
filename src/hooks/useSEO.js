import { useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { generatePageMeta, generateStructuredData } from '../config/seo'

/**
 * Hook personalizado para manejar metadatos SEO dinámicos
 * Actualiza los metadatos según la página actual
 */
export const useSEO = (pageKey, customMeta = {}) => {
  const location = useLocation()
  
  // Función para actualizar SEO de forma dinámica
  const updateSEO = useCallback((metaData) => {
    const meta = pageKey ? generatePageMeta(pageKey, { ...customMeta, ...metaData }) : metaData
    
    // Actualizar título
    if (meta.title) {
      document.title = meta.title
    }
    
    // Actualizar meta description
    updateMetaTag('name', 'description', meta.description)
    updateMetaTag('name', 'keywords', meta.keywords)
    
    // Actualizar Open Graph
    updateMetaTag('property', 'og:title', meta.title)
    updateMetaTag('property', 'og:description', meta.description)
    updateMetaTag('property', 'og:url', meta.url || `https://gogestia.com${location.pathname}`)
    updateMetaTag('property', 'og:image', meta.image ? `https://gogestia.com${meta.image}` : 'https://gogestia.com/logo-og.png')
    updateMetaTag('property', 'og:type', meta.type || 'website')
    
    // Meta tags específicos para artículos
    if (meta.type === 'article') {
      updateMetaTag('property', 'article:author', meta.author)
      updateMetaTag('property', 'article:published_time', meta.publishedTime)
      updateMetaTag('property', 'article:modified_time', meta.modifiedTime)
      updateMetaTag('property', 'article:section', meta.section)
      if (meta.tags && Array.isArray(meta.tags)) {
        // Eliminar tags anteriores
        document.querySelectorAll('meta[property="article:tag"]').forEach(tag => tag.remove())
        // Añadir nuevos tags
        meta.tags.forEach(tag => {
          updateMetaTag('property', 'article:tag', tag)
        })
      }
    }
    
    // Actualizar Twitter Card
    updateMetaTag('name', 'twitter:title', meta.title)
    updateMetaTag('name', 'twitter:description', meta.description)
    updateMetaTag('name', 'twitter:image', meta.image ? `https://gogestia.com${meta.image}` : 'https://gogestia.com/logo-og.png')
    updateMetaTag('name', 'twitter:url', meta.url || `https://gogestia.com${location.pathname}`)
    updateMetaTag('name', 'twitter:card', 'summary_large_image')
    
    // Actualizar canonical URL
    updateCanonicalUrl(meta.url || `https://gogestia.com${location.pathname}`)
    
    // Actualizar structured data
    if (meta.structuredData !== false) {
      updateStructuredData(pageKey, meta.structuredData)
    }
    
  }, [pageKey, customMeta, location.pathname])
  
  useEffect(() => {
    if (pageKey) {
      updateSEO(customMeta)
    }
  }, [pageKey, customMeta, location.pathname, updateSEO])
  
  return { updateSEO }
}

/**
 * Actualiza o crea un meta tag
 */
const updateMetaTag = (attribute, attributeValue, content) => {
  if (!content) return
  
  let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`)
  
  if (element) {
    element.setAttribute('content', content)
  } else {
    element = document.createElement('meta')
    element.setAttribute(attribute, attributeValue)
    element.setAttribute('content', content)
    document.getElementsByTagName('head')[0].appendChild(element)
  }
}

/**
 * Actualiza la URL canónica
 */
const updateCanonicalUrl = (url) => {
  let canonical = document.querySelector('link[rel="canonical"]')
  
  if (canonical) {
    canonical.setAttribute('href', url)
  } else {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    canonical.setAttribute('href', url)
    document.getElementsByTagName('head')[0].appendChild(canonical)
  }
}

/**
 * Actualiza el structured data (JSON-LD)
 */
const updateStructuredData = (pageKey, customData) => {
  // Remover structured data anterior
  const existingScript = document.querySelector('script[type="application/ld+json"]:not([data-static])')
  if (existingScript) {
    existingScript.remove()
  }
  
  // Crear nuevo structured data
  let structuredData
  if (customData) {
    structuredData = customData
  } else {
    structuredData = generateStructuredData(pageKey, customData)
  }
  
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(structuredData, null, 2)
  document.getElementsByTagName('head')[0].appendChild(script)
}

/**
 * Hook para configurar metadatos de páginas específicas
 */
export const usePageSEO = (config) => {
  const { page, title, description, image, keywords, structuredData } = config
  
  const { updateSEO } = useSEO(page, {
    title,
    description,
    image,
    keywords,
    structuredData
  })
  
  return { updateSEO }
}

/**
 * Hook simplificado para artículos de blog
 */
export const useBlogPostSEO = (post) => {
  const { updateSEO } = useSEO(null)
  
  useEffect(() => {
    if (!post) return
    
    const meta = {
      title: `${post.title} | Blog GoGestia`,
      description: post.excerpt || post.description,
      image: post.image || '/logo-og.png',
      keywords: post.tags?.join(', '),
      url: `https://gogestia.com/blog/${post.slug}`,
      type: 'article',
      author: post.author?.name || 'GoGestia',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      section: post.category?.name,
      tags: post.tags,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt || post.description,
        "image": post.image ? `https://gogestia.com${post.image}` : "https://gogestia.com/logo-og.png",
        "author": {
          "@type": "Person",
          "name": post.author?.name || "GoGestia Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "GoGestia",
          "logo": {
            "@type": "ImageObject",
            "url": "https://gogestia.com/GoGestiaLogo.svg"
          }
        },
        "datePublished": post.publishedAt,
        "dateModified": post.updatedAt || post.publishedAt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://gogestia.com/blog/${post.slug}`
        },
        "keywords": post.tags?.join(', ')
      }
    }
    
    updateSEO(meta)
  }, [post, updateSEO])
  
  return { updateSEO }
}

export default useSEO
