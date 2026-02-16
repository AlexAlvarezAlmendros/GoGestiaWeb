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
    name: 'GoGestia',
    url: 'https://gogestia.com',
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
    "@type": "WebPage",
    "headline": title,
    "description": description,
    "image": fullImage,
    "url": fullUrl,
    "author": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/GoGestiaLogo.svg`
      }
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

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {tags.length > 0 && <meta name="keywords" content={tags.join(', ')} />}
      <meta name="author" content={author} />
      <link rel="canonical" href={canonical || fullUrl} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Datos estructurados JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <meta name="language" content="es" />
    </Helmet>
  )
}

export default SEOHead
