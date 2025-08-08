import Card from '../components/Card'
import Button from '../components/Button'

const Blog = () => {
  // Datos de ejemplo para artículos de blog
  const featuredArticles = [
    {
      id: 1,
      title: "5 Errores Comunes en la Digitalización de Procesos Empresariales",
      excerpt: "Descubre los errores más frecuentes que cometen las empresas al digitalizar sus procesos y cómo evitarlos.",
      date: "2024-01-15",
      readTime: "8 min",
      category: "Digitalización",
      image: "📊",
      tags: ["Procesos", "Digitalización", "Errores"]
    },
    {
      id: 2,
      title: "Automatización con IA: ¿Por Dónde Empezar?",
      excerpt: "Una guía práctica para empresas que quieren dar sus primeros pasos en la automatización con inteligencia artificial.",
      date: "2024-01-08",
      readTime: "12 min",
      category: "Automatización",
      image: "🤖",
      tags: ["IA", "Automatización", "Guía"]
    },
    {
      id: 3,
      title: "ROI de la Automatización: Casos de Éxito Reales",
      excerpt: "Análisis de casos reales donde la automatización ha generado un retorno de inversión significativo.",
      date: "2024-01-01",
      readTime: "10 min",
      category: "Casos de Éxito",
      image: "💰",
      tags: ["ROI", "Casos", "Resultados"]
    }
  ]

  const recentArticles = [
    {
      id: 4,
      title: "Chatbots Internos: Mejorando la Comunicación Empresarial",
      excerpt: "Cómo los chatbots pueden transformar la comunicación interna de tu empresa.",
      date: "2024-01-22",
      readTime: "6 min",
      category: "Comunicación",
      tags: ["Chatbots", "Comunicación"]
    },
    {
      id: 5,
      title: "Integración de Sistemas: Conectando Tu Ecosistema Tecnológico",
      excerpt: "La importancia de conectar todas tus herramientas para maximizar la eficiencia.",
      date: "2024-01-18",
      readTime: "9 min",
      category: "Integraciones",
      tags: ["APIs", "Integración", "Eficiencia"]
    },
    {
      id: 6,
      title: "Análisis Predictivo: El Futuro de la Toma de Decisiones",
      excerpt: "Descubre cómo el análisis predictivo puede revolucionar tu estrategia empresarial.",
      date: "2024-01-12",
      readTime: "11 min",
      category: "Análisis",
      tags: ["Predictivo", "Datos", "Estrategia"]
    }
  ]

  const categories = [
    { name: "Todos", count: 6 },
    { name: "Automatización", count: 2 },
    { name: "Digitalización", count: 2 },
    { name: "Casos de Éxito", count: 1 },
    { name: "Integración", count: 1 }
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog y Recursos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Artículos, guías y casos de éxito sobre automatización, digitalización y 
            optimización de procesos empresariales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {/* Artículos destacados */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-dark-green mb-8">Artículos Destacados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                {featuredArticles.map((article) => (
                  <Card key={article.id} className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div className="w-24 h-24 bg-brand-lime rounded-lg flex items-center justify-center text-4xl">
                        {article.image}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="inline-block bg-brand-lime text-brand-dark-green text-xs font-semibold px-2 py-1 rounded-full mr-2">
                          {article.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(article.date)} • {article.readTime} lectura
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-brand-dark-green mb-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm">
                          Leer más →
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Artículos recientes */}
            <section>
              <h2 className="text-2xl font-bold text-brand-dark-green mb-8">Artículos Recientes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentArticles.map((article) => (
                  <Card key={article.id}>
                    <Card.Header>
                      <div className="flex items-center mb-3">
                        <span className="inline-block bg-brand-lime text-brand-dark-green text-xs font-semibold px-2 py-1 rounded-full mr-2">
                          {article.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(article.date)}
                        </span>
                      </div>
                      <Card.Title className="mb-2">{article.title}</Card.Title>
                      <Card.Description>{article.excerpt}</Card.Description>
                    </Card.Header>
                    
                    <Card.Footer>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        Leer artículo
                      </Button>
                    </Card.Footer>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Newsletter */}
              <Card>
                <Card.Header>
                  <Card.Title>📧 Newsletter</Card.Title>
                  <Card.Description>
                    Recibe nuestros mejores artículos y consejos directamente en tu email
                  </Card.Description>
                </Card.Header>
                <Card.Content>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      className="input-field text-sm"
                    />
                    <Button size="sm" className="w-full">
                      Suscribirse
                    </Button>
                  </form>
                </Card.Content>
              </Card>

              {/* Categorías */}
              <Card>
                <Card.Header>
                  <Card.Title>Categorías</Card.Title>
                </Card.Header>
                <Card.Content>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <button className="flex items-center justify-between w-full text-left hover:text-brand-dark-green transition-colors">
                          <span>{category.name}</span>
                          <span className="text-sm text-gray-400">({category.count})</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </Card.Content>
              </Card>

              {/* Enlaces útiles */}
              <Card>
                <Card.Header>
                  <Card.Title>Enlaces Útiles</Card.Title>
                </Card.Header>
                <Card.Content>
                  <ul className="space-y-3">
                    <li>
                      <a href="/servicios" className="text-brand-dark-green hover:underline">
                        → Ver nuestros servicios
                      </a>
                    </li>
                    <li>
                      <a href="/contacto" className="text-brand-dark-green hover:underline">
                        → Solicitar diagnóstico
                      </a>
                    </li>
                    <li>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-brand-dark-green hover:underline">
                        → Síguenos en LinkedIn
                      </a>
                    </li>
                  </ul>
                </Card.Content>
              </Card>

              {/* CTA */}
              <div className="bg-gradient-to-br from-brand-dark-green to-green-800 p-6 rounded-xl text-white">
                <h3 className="font-bold mb-2">¿Necesitas ayuda personalizada?</h3>
                <p className="text-sm mb-4 text-gray-100">
                  Solicita tu diagnóstico gratuito y descubre cómo podemos ayudarte
                </p>
                <Button to="/contacto" size="sm" className="w-full">
                  Solicitar diagnóstico
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
            <Card.Header>
              <Card.Title className="text-2xl">¿Te gustaría que escribiéramos sobre algo específico?</Card.Title>
              <Card.Description className="text-lg">
                Envíanos tus preguntas o temas de interés y crearemos contenido personalizado
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/contacto">
                  Enviar sugerencia
                </Button>
                <Button variant="outline" href="mailto:blog@gogenaiweb.com">
                  Contactar por email
                </Button>
              </div>
            </Card.Content>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default Blog
