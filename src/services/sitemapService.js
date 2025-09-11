/**
 * Servicio para generar sitemaps XML dinámicos
 * Incluye páginas estáticas y posts del blog
 */

export class SitemapService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_SITE_URL || 'https://gogestia.com'
  }

  /**
   * Genera el sitemap completo en formato XML
   */
  async generateSitemap(posts = []) {
    const urls = [
      // Páginas estáticas principales
      {
        loc: this.baseUrl,
        priority: 1.0,
        changefreq: 'daily',
        lastmod: new Date().toISOString()
      },
      {
        loc: `${this.baseUrl}/blog`,
        priority: 0.9,
        changefreq: 'daily',
        lastmod: new Date().toISOString()
      },
      {
        loc: `${this.baseUrl}/servicios`,
        priority: 0.8,
        changefreq: 'weekly'
      },
      {
        loc: `${this.baseUrl}/contacto`,
        priority: 0.7,
        changefreq: 'monthly'
      },
      // Páginas legales
      {
        loc: `${this.baseUrl}/legal/privacidad`,
        priority: 0.3,
        changefreq: 'yearly'
      },
      {
        loc: `${this.baseUrl}/legal/aviso-legal`,
        priority: 0.3,
        changefreq: 'yearly'
      },
      {
        loc: `${this.baseUrl}/legal/cookies`,
        priority: 0.3,
        changefreq: 'yearly'
      },
      
      // Posts del blog (dinámicos)
      ...posts.map(post => ({
        loc: `${this.baseUrl}/blog/${post.slug}`,
        lastmod: post.updatedAt || post.createdAt || new Date().toISOString(),
        priority: 0.8,
        changefreq: 'weekly'
      }))
    ]

    return this.generateXML(urls)
  }

  /**
   * Genera el XML del sitemap
   */
  generateXML(urls) {
    const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`
    
    const urlsXML = urls.map(url => {
      return `  <url>
    <loc>${this.escapeXML(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${this.formatDate(url.lastmod)}</lastmod>` : ''}
    <priority>${url.priority}</priority>
    <changefreq>${url.changefreq}</changefreq>
  </url>`
    }).join('\n')

    const footer = `
</urlset>`

    return header + urlsXML + footer
  }

  /**
   * Genera robots.txt
   */
  generateRobotsTxt() {
    return `User-agent: *
Allow: /

# Disallow admin and debug pages
Disallow: /admin/
Disallow: /debug/
Disallow: /api/

# Allow specific admin pages that are public
Allow: /admin/login

# Sitemap location
Sitemap: ${this.baseUrl}/sitemap.xml

# Crawl delay (optional - helps prevent server overload)
Crawl-delay: 1

# Common bot specific rules
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1
`
  }

  /**
   * Escapa caracteres especiales en XML
   */
  escapeXML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  /**
   * Formatea fecha para sitemap
   */
  formatDate(date) {
    const d = new Date(date)
    return d.toISOString().split('T')[0]
  }

  /**
   * Genera un sitemap específico para el blog
   */
  async generateBlogSitemap(posts = []) {
    const urls = posts.map(post => ({
      loc: `${this.baseUrl}/blog/${post.slug}`,
      lastmod: post.updatedAt || post.createdAt || new Date().toISOString(),
      priority: 0.8,
      changefreq: 'weekly',
      images: post.featuredImage ? [{
        loc: post.featuredImage.startsWith('http') ? 
          post.featuredImage : 
          `${this.baseUrl}${post.featuredImage}`,
        title: post.title,
        caption: post.excerpt || post.title
      }] : []
    }))

    return this.generateXMLWithImages(urls)
  }

  /**
   * Genera XML con soporte para imágenes
   */
  generateXMLWithImages(urls) {
    const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`
    
    const urlsXML = urls.map(url => {
      let xml = `  <url>
    <loc>${this.escapeXML(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${this.formatDate(url.lastmod)}</lastmod>` : ''}
    <priority>${url.priority}</priority>
    <changefreq>${url.changefreq}</changefreq>`

      // Agregar imágenes si existen
      if (url.images && url.images.length > 0) {
        url.images.forEach(image => {
          xml += `
    <image:image>
      <image:loc>${this.escapeXML(image.loc)}</image:loc>
      <image:title>${this.escapeXML(image.title)}</image:title>
      <image:caption>${this.escapeXML(image.caption)}</image:caption>
    </image:image>`
        })
      }

      xml += `
  </url>`
      return xml
    }).join('\n')

    const footer = `
</urlset>`

    return header + urlsXML + footer
  }
}

// Instancia única del servicio
export const sitemapService = new SitemapService()

// Funciones de utilidad para usar directamente
export const generateSitemap = (posts) => sitemapService.generateSitemap(posts)
export const generateRobotsTxt = () => sitemapService.generateRobotsTxt()
export const generateBlogSitemap = (posts) => sitemapService.generateBlogSitemap(posts)
