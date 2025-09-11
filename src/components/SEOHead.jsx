import { Helmet } from 'react-helmet-async'

/**
 * Componente para gestión completa de SEO y meta tags
 * Optimizado para indexación en Google y redes sociales
 */
const SEOHead = ({ 
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

  // Datos estructurados JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? 'Article' : 'WebPage',
    "headline": title,
    "description": description,
    "image": fullImage,
    "url": fullUrl,
    ...(publishedTime && { "datePublished": publishedTime }),
    ...(modifiedTime && { "dateModified": modifiedTime }),
    "author": {
      "@type": "Person",
      "name": author
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

  // Si es un artículo, agregar datos específicos de artículo
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

  return (
    <Helmet>
      {/* Título de la página */}
      <title>{fullTitle}</title>

      {/* Meta tags básicos */}
      <meta name="description" content={description} />
      {tags.length > 0 && <meta name="keywords" content={tags.join(', ')} />}
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || fullUrl} />

      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph Meta Tags para Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="es_ES" />

      {/* Open Graph para artículos */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Datos estructurados JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Meta tags adicionales para mejor indexación */}
      <meta name="language" content="es" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="web" />
      <meta name="rating" content="general" />

      {/* Preconnect para mejorar velocidad de carga */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  )
}

export default SEOHead
