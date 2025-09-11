import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSitemapGenerator } from '../hooks/useSitemapGenerator'
import useBlogPosts from '../hooks/useBlogPosts'
import SEOHead from '../components/SEOHead'
import Card from '../components/Card'
import Button from '../components/Button'

/**
 * Página de administración SEO
 * Solo accesible para administradores
 */
const AdminSEO = () => {
  const { hasRole } = useAuth()
  const { generateAndDownloadSitemap, generateAndDownloadRobots, copyToClipboard } = useSitemapGenerator()
  const { allPosts, loading: postsLoading } = useBlogPosts({ limit: 1000 }) // Obtener todos los posts
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Solo administradores pueden acceder
  if (!hasRole('Admin')) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Acceso Denegado</h1>
          <p className="text-gray-600">Solo los administradores pueden acceder a esta página.</p>
        </div>
      </div>
    )
  }

  const handleGenerateSitemap = async () => {
    setLoading(true)
    const result = await generateAndDownloadSitemap(allPosts?.recentPosts || [])
    setMessage(result.message)
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleGenerateRobots = () => {
    const result = generateAndDownloadRobots()
    setMessage(result.message)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleCopySitemapURL = async () => {
    const sitemapURL = `${import.meta.env.VITE_SITE_URL}/sitemap.xml`
    const result = await copyToClipboard(sitemapURL)
    setMessage(result.message)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <>
      <SEOHead
        title="Administración SEO - GoGestia"
        description="Panel de administración para gestión de SEO, sitemaps y robots.txt"
        url="/admin/seo"
        noindex={true}
      />

      <div className="min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Administración SEO</h1>
            <p className="text-gray-600">
              Gestiona sitemaps, robots.txt y configuración SEO del sitio
            </p>
            {message && (
              <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-lg text-green-800 max-w-md mx-auto">
                {message}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sitemap Management */}
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Gestión de Sitemap
                </Card.Title>
                <Card.Description>
                  Genera y gestiona el sitemap.xml del sitio
                </Card.Description>
              </Card.Header>
              <Card.Content className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Estado Actual</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Posts en el sitio: {postsLoading ? 'Cargando...' : (allPosts?.recentPosts?.length || 0)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={handleGenerateSitemap}
                      size="sm"
                      disabled={loading || postsLoading}
                    >
                      {loading ? 'Generando...' : 'Descargar Sitemap'}
                    </Button>
                    <Button
                      onClick={handleCopySitemapURL}
                      variant="outline"
                      size="sm"
                    >
                      Copiar URL
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <h4 className="font-medium mb-2">URLs Incluidas:</h4>
                  <ul className="space-y-1">
                    <li>• Página principal</li>
                    <li>• Página del blog</li>
                    <li>• Página de servicios</li>
                    <li>• Página de contacto</li>
                    <li>• Páginas legales</li>
                    <li>• Todos los posts del blog ({allPosts?.recentPosts?.length || 0})</li>
                  </ul>
                </div>
              </Card.Content>
            </Card>

            {/* Robots.txt Management */}
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Gestión de Robots.txt
                </Card.Title>
                <Card.Description>
                  Configura las directrices para bots de búsqueda
                </Card.Description>
              </Card.Header>
              <Card.Content className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Configuración Actual</h4>
                  <div className="text-sm text-gray-600 space-y-1 mb-3">
                    <p>✅ Permite indexación general</p>
                    <p>❌ Bloquea directorios de administración</p>
                    <p>🔗 Incluye referencia al sitemap</p>
                    <p>⏱️ Configurado con crawl-delay optimizado</p>
                  </div>
                  <Button
                    onClick={handleGenerateRobots}
                    size="sm"
                    variant="outline"
                  >
                    Descargar Robots.txt
                  </Button>
                </div>

                <div className="text-sm text-gray-600">
                  <h4 className="font-medium mb-2">Configuración:</h4>
                  <ul className="space-y-1">
                    <li>• <code>Allow: /</code> - Permite todo el sitio</li>
                    <li>• <code>Disallow: /admin/</code> - Bloquea admin</li>
                    <li>• <code>Disallow: /debug/</code> - Bloquea debug</li>
                    <li>• <code>Sitemap: {import.meta.env.VITE_SITE_URL}/sitemap.xml</code></li>
                  </ul>
                </div>
              </Card.Content>
            </Card>

            {/* SEO Status */}
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Estado SEO
                </Card.Title>
                <Card.Description>
                  Resumen del estado de SEO del sitio
                </Card.Description>
              </Card.Header>
              <Card.Content className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">✅</div>
                    <div className="text-sm font-medium">Meta Tags</div>
                    <div className="text-xs text-gray-600">Implementados</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">✅</div>
                    <div className="text-sm font-medium">Open Graph</div>
                    <div className="text-xs text-gray-600">Configurado</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">✅</div>
                    <div className="text-sm font-medium">JSON-LD</div>
                    <div className="text-xs text-gray-600">Estructurado</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">✅</div>
                    <div className="text-sm font-medium">Sitemap</div>
                    <div className="text-xs text-gray-600">Dinámico</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">🎯 Próximos Pasos</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>1. Registrar sitio en Google Search Console</li>
                    <li>2. Enviar sitemap a Google</li>
                    <li>3. Configurar Google Analytics</li>
                    <li>4. Monitorear indexación</li>
                  </ul>
                </div>
              </Card.Content>
            </Card>

            {/* Tools & Links */}
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Herramientas Útiles
                </Card.Title>
                <Card.Description>
                  Enlaces a herramientas de SEO y análisis
                </Card.Description>
              </Card.Header>
              <Card.Content className="space-y-3">
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium">Google Search Console</div>
                  <div className="text-sm text-gray-600">Monitorea la indexación y rendimiento</div>
                </a>
                
                <a
                  href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium">Guía de Sitemaps de Google</div>
                  <div className="text-sm text-gray-600">Documentación oficial</div>
                </a>

                <a
                  href="https://developers.google.com/search/docs/crawling-indexing/robots/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium">Guía de Robots.txt</div>
                  <div className="text-sm text-gray-600">Mejores prácticas</div>
                </a>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSEO
