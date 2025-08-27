import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { generatePageMeta, generateStructuredData } from '../config/seo'

/**
 * Hook personalizado para manejar metadatos SEO dinámicos
 * Actualiza los metadatos según la página actual
 */
export const useSEO = (pageKey, customMeta = {}) => {
  const location = useLocation()
  
  useEffect(() => {
    const meta = generatePageMeta(pageKey, customMeta)
    
    // Actualizar título
    document.title = meta.title
    
    // Actualizar meta description
    updateMetaTag('name', 'description', meta.description)
    updateMetaTag('name', 'keywords', meta.keywords)
    
    // Actualizar Open Graph
    updateMetaTag('property', 'og:title', meta.title)
    updateMetaTag('property', 'og:description', meta.description)
    updateMetaTag('property', 'og:url', meta.url)
    updateMetaTag('property', 'og:image', `https://gogestia.com${meta.image}`)
    updateMetaTag('property', 'og:type', meta.type || 'website')
    
    // Actualizar Twitter Card
    updateMetaTag('name', 'twitter:title', meta.title)
    updateMetaTag('name', 'twitter:description', meta.description)
    updateMetaTag('name', 'twitter:image', `https://gogestia.com${meta.image}`)
    updateMetaTag('name', 'twitter:url', meta.url)
    
    // Actualizar canonical URL
    updateCanonicalUrl(meta.url)
    
    // Actualizar structured data
    if (customMeta.structuredData !== false) {
      updateStructuredData(pageKey, customMeta.structuredData)
    }
    
  }, [pageKey, customMeta, location.pathname])
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
  const structuredData = generateStructuredData(pageKey, customData)
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
  
  useSEO(page, {
    title,
    description,
    image,
    keywords,
    structuredData
  })
}

/**
 * Hook simplificado para artículos de blog
 */
export const useBlogPostSEO = (post) => {
  const meta = {
    title: `${post.title} | Blog GoGestia`,
    description: post.excerpt || post.description,
    image: post.image || '/logo-og.png',
    keywords: post.tags?.join(', '),
    url: `https://gogestia.com/blog/${post.slug}`,
    type: 'article',
    structuredData: {
      "@type": "Article",
      "headline": post.title,
      "author": {
        "@type": "Organization",
        "name": "GoGestia"
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
      }
    }
  }
  
  useSEO('blog', meta)
}

export default useSEO
