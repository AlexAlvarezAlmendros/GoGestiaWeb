import { NavLink } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import { useSEO } from '../hooks/useSEO'

const Home = () => {
  // Configurar SEO para la página de inicio
  useSEO('home')
  
  const services = [
    {
      icon: '🤖',
      title: 'Automatización con IA',
      description: 'Chatbots internos, RPA con Python, IA para clasificación de correos y procesos repetitivos.'
    },
    {
      icon: '📱',
      title: 'Apps Internas',
      description: 'Dashboards, gestión de tareas, CRM interno, control de stock para organizar flujos.'
    },
    {
      icon: '🌐',
      title: 'Apps Externas',
      description: 'Portal de clientes, landing de autoservicio para mejorar la experiencia del cliente.'
    },
    {
      icon: '🔗',
      title: 'Integraciones',
      description: 'Conexión entre apps existentes, APIs y flujos entre diferentes herramientas SaaS.'
    }
  ]

  const companyTypes = [
    {
      type: 'PyMEs Industriales',
      problems: 'Control de stock, trazabilidad, tareas manuales',
      solution: 'App interna + automatización de partes'
    },
    {
      type: 'Sector Salud',
      problems: 'Formularios, procesos lentos, muchos documentos',
      solution: 'Digitalización y RPA con IA'
    },
    {
      type: 'Consultoras',
      problems: 'Muchos Excel, informes, tareas repetitivas',
      solution: 'Dashboards + IA + flujos automatizados'
    },
    {
      type: 'Inmobiliarias',
      problems: 'Seguimiento de leads, visitas, documentos',
      solution: 'CRM ligero + automatización de firmas'
    }
  ]

  const processSteps = [
    {
      step: '1',
      title: 'Diagnóstico Gratuito',
      description: 'Reunión inicial y auditoría básica de tus procesos (máximo 3h)'
    },
    {
      step: '2',
      title: 'Informe Personalizado',
      description: 'Entregamos informe con puntos críticos y propuesta de solución en 7 días'
    },
    {
      step: '3',
      title: 'Implementación',
      description: 'Desarrollo e implementación de la solución acordada'
    },
    {
      step: '4',
      title: 'Mantenimiento',
      description: 'Soporte continuo y escalado según tus necesidades'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-dark-green to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Automatiza tus procesos,
            <br />
            <span className="text-brand-lime">multiplica tu eficiencia</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            Detectamos ineficiencias en tus procesos y te proponemos soluciones personalizadas 
            que aumentan tu rentabilidad y productividad, sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contacto" size="lg" className="text-lg">
              Solicita tu diagnóstico gratuito
            </Button>
            <Button to="/servicios" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-dark-green">
              Ver servicios
            </Button>
          </div>
        </div>
      </section>

      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-semibold text-brand-dark-green italic">
            "Detectamos ineficiencias en tus procesos y te proponemos soluciones personalizadas 
            que aumentan tu rentabilidad y productividad, sin compromiso."
          </blockquote>
        </div>
      </section> */}
      

      {/* Servicios */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Qué ofrecemos?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Soluciones tecnológicas adaptadas a las necesidades específicas de tu empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index}>
                <div className="text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <Card.Title className="mb-3 text-center">{service.title}</Card.Title>
                  <Card.Description className="text-center">{service.description}</Card.Description>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Casos por tipo de empresa */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo funciona?</h2>
            <p className="text-xl text-gray-600">
              Nuestro proceso paso a paso para transformar tu empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-lime rounded-full text-brand-dark-green font-bold text-xl mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-brand-dark-green">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {/* Flecha conectora - solo visible en pantallas grandes y no en el último elemento */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-8 left-full transform -translate-y-1/2 w-8 items-center justify-center">
                    <svg className="w-6 h-6 text-brand-lime" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Casos comunes por sector</h2>
            <p className="text-xl text-gray-600">
              Cada empresa tiene necesidades únicas. Aquí algunos ejemplos de cómo ayudamos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyTypes.map((company, index) => (
              <Card key={index} className="border-l-4 border-brand-lime">
                <Card.Header>
                  <Card.Title>{company.type}</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="mb-4">
                    <h4 className="font-semibold text-red-600 mb-2">Problemas comunes:</h4>
                    <p className="text-gray-600">{company.problems}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Nuestra solución:</h4>
                    <p className="text-gray-600">{company.solution}</p>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resultados estimados */}
      <section className="py-16 bg-brand-dark-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Resultados que puedes esperar</h2>
            <p className="text-xl text-gray-200">
              Beneficios reales que nuestros clientes experimentan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-lime mb-2">60%</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Ahorro de tiempo</h3>
              <p className="text-gray-200">Automatización de tareas repetitivas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-lime mb-2">90%</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Reducción de errores</h3>
              <p className="text-gray-200">Procesos digitalizados y validados</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-lime mb-2">3x</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Mayor productividad</h3>
              <p className="text-gray-200">Equipos más eficientes y organizados</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para transformar tu empresa?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Obtén tu diagnóstico gratuito y descubre cómo podemos ayudarte a crecer
          </p>
          <Button to="/contacto" size="lg" className="text-lg">
            Quiero mi diagnóstico gratuito
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Home
