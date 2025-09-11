/**
 * Hook nativo para gestión de meta tags sin dependencias externas
 * Compatible con React 19 y todas las versiones
 */
import { useEffect } from 'react'

export const useDocumentHead = ({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags = [],
  canonical,
  noindex = false
}) => {
  useEffect(() => {
    // Configuración base del sitio
    const siteConfig = {
      name: import.meta.env.VITE_SITE_NAME || 'GoGestia',
      url: import.meta.env.VITE_SITE_URL || 'https://gogestia.com',
      defaultImage: '/logo-og.png',
      twitterHandle: '@gogestia'
    }

    // URLs completas
    const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
    const fullImage = image ? 
      (image.startsWith('http') ? image : `${siteConfig.url}${image}`) 
      : `${siteConfig.url}${siteConfig.defaultImage}`

    // Título completo con nombre del sitio
    const fullTitle = title ? 
      `${title} | ${siteConfig.name}` : 
      siteConfig.name

    // Función para crear o actualizar meta tags
    const setMetaTag = (name, content, property = false) => {
      if (!content) return

      const attribute = property ? 'property' : 'name'
      let tag = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, name)
        document.head.appendChild(tag)
      }
      
      tag.setAttribute('content', content)
    }

    // Función para crear o actualizar link tags
    const setLinkTag = (rel, href) => {
      if (!href) return

      let tag = document.querySelector(`link[rel="${rel}"]`)
      
      if (!tag) {
        tag = document.createElement('link')
        tag.setAttribute('rel', rel)
        document.head.appendChild(tag)
      }
      
      tag.setAttribute('href', href)
    }

    // Actualizar título
    if (title) {
      document.title = fullTitle
    }

    // Meta tags básicos
    setMetaTag('description', description)
    if (tags.length > 0) {
      setMetaTag('keywords', tags.join(', '))
    }
    setMetaTag('author', author)

    // Robots
    setMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMetaTag('googlebot', noindex ? 'noindex, nofollow' : 'index, follow')

    // Open Graph Meta Tags
    setMetaTag('og:title', title, true)
    setMetaTag('og:description', description, true)
    setMetaTag('og:image', fullImage, true)
    setMetaTag('og:url', fullUrl, true)
    setMetaTag('og:type', type, true)
    setMetaTag('og:site_name', siteConfig.name, true)
    setMetaTag('og:locale', 'es_ES', true)

    // Open Graph para artículos
    if (type === 'article') {
      if (publishedTime) {
        setMetaTag('article:published_time', publishedTime, true)
      }
      if (modifiedTime) {
        setMetaTag('article:modified_time', modifiedTime, true)
      }
      if (author) {
        setMetaTag('article:author', author, true)
      }
      
      // Limpiar tags anteriores y agregar nuevos
      document.querySelectorAll('meta[property^="article:tag"]').forEach(tag => tag.remove())
      tags.forEach(tag => {
        const tagMeta = document.createElement('meta')
        tagMeta.setAttribute('property', 'article:tag')
        tagMeta.setAttribute('content', tag)
        document.head.appendChild(tagMeta)
      })
    }

    // Twitter Card Meta Tags
    setMetaTag('twitter:card', 'summary_large_image')
    setMetaTag('twitter:site', siteConfig.twitterHandle)
    setMetaTag('twitter:creator', siteConfig.twitterHandle)
    setMetaTag('twitter:title', title)
    setMetaTag('twitter:description', description)
    setMetaTag('twitter:image', fullImage)

    // Canonical URL
    setLinkTag('canonical', canonical || fullUrl)

    // JSON-LD Structured Data
    const updateStructuredData = () => {
      // Remover script anterior si existe
      const existingScript = document.querySelector('script[type="application/ld+json"]')
      if (existingScript) {
        existingScript.remove()
      }

      // Crear nuevo script con datos estructurados
      const structuredData = {
        "@context": "https://schema.org",
        "@type": type === 'article' ? 'BlogPosting' : 'WebPage',
        "headline": title,
        "description": description,
        "image": fullImage,
        "url": fullUrl,
        ...(publishedTime && { "datePublished": publishedTime }),
        ...(modifiedTime && { "dateModified": modifiedTime }),
        "author": {
          "@type": "Person",
          "name": author || siteConfig.name
        },
        "publisher": {
          "@type": "Organization",
          "name": siteConfig.name,
          "logo": {
            "@type": "ImageObject",
            "url": `${siteConfig.url}/GoGestiaLogo.svg`
          }
        }
      }

      // Si es un artículo, agregar datos específicos
      if (type === 'article') {
        structuredData["@type"] = "BlogPosting"
        structuredData["mainEntityOfPage"] = {
          "@type": "WebPage",
          "@id": fullUrl
        }
        if (tags.length > 0) {
          structuredData["keywords"] = tags.join(', ')
        }
      }

      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }

    updateStructuredData()

    // Meta tags adicionales
    setMetaTag('language', 'es')
    setMetaTag('revisit-after', '7 days')
    setMetaTag('distribution', 'web')
    setMetaTag('rating', 'general')

    // Cleanup function para limpiar cuando el componente se desmonte
    return () => {
      // Limpiar solo los meta tags que agregamos dinámicamente
      // (opcional, ya que React maneja la limpieza automáticamente)
    }

  }, [title, description, image, url, type, publishedTime, modifiedTime, author, tags, canonical, noindex])
}

export default useDocumentHead
