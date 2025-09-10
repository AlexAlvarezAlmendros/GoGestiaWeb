import { generateSitemap, generateRobotsTxt } from '../services/sitemapService'

/**
 * Hook para generar y descargar sitemaps
 * Útil para administradores que quieran generar sitemaps actualizados
 */
export const useSitemapGenerator = () => {
  const generateAndDownloadSitemap = async (posts = []) => {
    try {
      const sitemapXML = await generateSitemap(posts)
      downloadFile(sitemapXML, 'sitemap.xml', 'application/xml')
      return { success: true, message: 'Sitemap generado exitosamente' }
    } catch (error) {
      console.error('Error generando sitemap:', error)
      return { success: false, message: 'Error generando sitemap' }
    }
  }

  const generateAndDownloadRobots = () => {
    try {
      const robotsTxt = generateRobotsTxt()
      downloadFile(robotsTxt, 'robots.txt', 'text/plain')
      return { success: true, message: 'Robots.txt generado exitosamente' }
    } catch (error) {
      console.error('Error generando robots.txt:', error)
      return { success: false, message: 'Error generando robots.txt' }
    }
  }

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content)
      return { success: true, message: 'Copiado al portapapeles' }
    } catch (error) {
      console.error('Error copiando al portapapeles:', error)
      return { success: false, message: 'Error copiando al portapapeles' }
    }
  }

  return {
    generateAndDownloadSitemap,
    generateAndDownloadRobots,
    copyToClipboard
  }
}

/**
 * Función auxiliar para descargar archivos
 */
const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}
