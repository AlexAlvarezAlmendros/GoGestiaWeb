import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'
import { useSEO } from '../hooks/useSEO'

const Services = () => {
  // Configurar SEO para la página de servicios
  useSEO('services')
  
  const [selectedService, setSelectedService] = useState(null)

  const currentServices = [
    {
      id: 'automation',
      icon: '🤖',
      title: 'Automatización con IA',
      description: 'Automatiza procesos repetitivos y mejora la eficiencia operativa',
      examples: [
        'Chatbots internos para atención al cliente',
        'RPA (Automatización Robótica de Procesos) con Python',
        'IA para clasificación automática de correos',
        'Procesamiento automático de documentos',
        'Flujos de trabajo automatizados'
      ],
      benefits: [
        'Reducción del 60% en tareas manuales',
        'Disponibilidad 24/7 para procesos críticos',
        'Menor tasa de errores humanos',
        'Liberación del personal para tareas estratégicas'
      ]
    },
    {
      id: 'internal-apps',
      icon: '📱',
      title: 'Apps Internas',
      description: 'Desarrollamos aplicaciones web para optimizar tus procesos internos',
      examples: [
        'Dashboards personalizados para directivos',
        'Sistemas de gestión de tareas y proyectos',
        'CRM interno adaptado a tu negocio',
        'Control de stock e inventarios',
        'Sistemas de evaluación y reporting'
      ],
      benefits: [
        'Visibilidad total de métricas importantes',
        'Organización centralizada de información',
        'Mejora en la comunicación interna',
        'Toma de decisiones basada en datos'
      ]
    },
    {
      id: 'external-apps',
      icon: '🌐',
      title: 'Apps Externas',
      description: 'Portales y aplicaciones web para mejorar la experiencia de tus clientes',
      examples: [
        'Portal de clientes con área privada',
        'Landing pages de autoservicio',
        'Sistemas de reservas online',
        'Plataformas de e-learning',
        'Apps móviles para clientes'
      ],
      benefits: [
        'Mejora significativa en experiencia del cliente',
        'Reducción de consultas telefónicas',
        'Disponibilidad 24/7 para tus clientes',
        'Diferenciación competitiva'
      ]
    },
    {
      id: 'integrations',
      icon: '🔗',
      title: 'Integraciones',
      description: 'Conectamos tus herramientas existentes para crear flujos eficientes',
      examples: [
        'Conexión entre CRM y herramientas de email marketing',
        'Integración de sistemas de facturación con contabilidad',
        'APIs personalizadas para conectar diferentes plataformas',
        'Sincronización automática de datos entre sistemas',
        'Webhooks para automatizar flujos entre servicios'
      ],
      benefits: [
        'Eliminación de duplicación de datos',
        'Flujos de trabajo más fluidos',
        'Mejor aprovechamiento de herramientas existentes',
        'Reducción de costos operativos'
      ]
    }
  ]

  /*const futureServices = [
    {
      icon: '🏢',
      title: 'ERP a medida',
      description: 'Sistema integral de gestión empresarial personalizado',
      status: 'Próximamente'
    },
    {
      icon: '✍️',
      title: 'Firma digital y trazabilidad',
      description: 'Soluciones para digitalización completa de documentos',
      status: 'En desarrollo'
    },
    {
      icon: '📊',
      title: 'Modelos predictivos con IA',
      description: 'Análisis avanzado y predicciones para tu negocio',
      status: 'Q2 2024'
    }
  ]*/

  const openModal = (service) => {
    setSelectedService(service)
  }

  const closeModal = () => {
    setSelectedService(null)
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestros Servicios</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones tecnológicas personalizadas para automatizar, optimizar y hacer crecer tu negocio. 
            Cada servicio está diseñado para resolver problemas específicos de tu empresa.
          </p>
        </div>

        {/* Servicios actuales */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Servicios Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentServices.map((service) => (
              <Card 
                key={service.id} 
                className="cursor-pointer border-2 border-transparent hover:border-brand-lime"
                onClick={() => openModal(service)}
              >
                <Card.Header>
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{service.icon}</span>
                    <Card.Title>{service.title}</Card.Title>
                  </div>
                  <Card.Description className="text-lg">
                    {service.description}
                  </Card.Description>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-brand-dark-green">Ejemplos de aplicación:</h4>
                    <ul className="space-y-1">
                      {service.examples.slice(0, 3).map((example, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="text-brand-lime mr-2">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card.Content>
                <Card.Footer>
                  <Button variant="outline" size="sm" className="w-full">
                    Ver beneficios para tu empresa
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </div>

        {/* Servicios futuros 
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Próximos Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {futureServices.map((service, index) => (
              <Card key={index} className="opacity-75 border-2 border-dashed border-gray-300">
                <Card.Header>
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3 opacity-60">{service.icon}</span>
                    <div>
                      <Card.Title className="text-gray-600">{service.title}</Card.Title>
                      <span className="inline-block bg-brand-lime text-brand-dark-green text-xs font-semibold px-2 py-1 rounded-full">
                        {service.status}
                      </span>
                    </div>
                  </div>
                  <Card.Description>{service.description}</Card.Description>
                </Card.Header>
              </Card>
            ))}
          </div>
        </div>*/}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-brand-dark-green to-green-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            ¿No estás seguro de qué necesitas?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Solicita tu diagnóstico gratuito y te ayudaremos a identificar 
            las mejores soluciones para tu empresa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contacto" size="lg">
              Diagnóstico Gratuito
            </Button>
          </div>
        </div>
      </div>

      {/* Modal para detalles del servicio */}
      <Modal
        isOpen={!!selectedService}
        onClose={closeModal}
        title={selectedService?.title}
        size="lg"
      >
        {selectedService && (
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{selectedService.icon}</span>
              <p className="text-lg text-gray-600">{selectedService.description}</p>
            </div>

            <div>
              <h4 className="font-bold text-brand-dark-green mb-3">¿Qué incluye este servicio?</h4>
              <ul className="space-y-2">
                {selectedService.examples.map((example, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-brand-lime mr-2 mt-1">✓</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-brand-dark-green mb-3">Beneficios para tu empresa</h4>
              <ul className="space-y-2">
                {selectedService.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">📈</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button to="/contacto" className="flex-1">
                  Solicitar información
                </Button>
                <Button variant="outline" onClick={closeModal} className="flex-1">
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Services
