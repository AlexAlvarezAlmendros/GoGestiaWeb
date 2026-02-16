import { Link } from 'react-router-dom'
import Button from '../components/Button'
import SEOHead from '../components/SEOHead'

const Home = () => {

  const services = [
    {
      icon: 'smart_toy',
      title: 'Automatización con IA',
      description: 'Implementamos agentes de IA que manejan atención al cliente, cualificación de leads y tareas administrativas 24/7.'
    },
    {
      icon: 'dashboard',
      title: 'Aplicaciones Internas',
      description: 'Desarrollamos dashboards y herramientas de gestión a medida para optimizar el flujo de trabajo de tu equipo.'
    },
    {
      icon: 'web',
      title: 'Aplicaciones Externas',
      description: 'Portales de cliente y aplicaciones web robustas para ofrecer una experiencia digital superior a tus usuarios.'
    },
    {
      icon: 'hub',
      title: 'Integraciones',
      description: 'Conectamos tu CRM, ERP y herramientas favoritas para eliminar la duplicidad de datos y errores humanos.'
    }
  ]

  const processSteps = [
    {
      num: '01',
      title: 'Diagnóstico',
      description: 'Analizamos tus flujos de trabajo actuales para identificar cuellos de botella y oportunidades.',
      highlight: false
    },
    {
      num: '02',
      title: 'Informe',
      description: 'Entregamos una propuesta detallada con el ROI estimado y la arquitectura de la solución.',
      highlight: false
    },
    {
      num: '03',
      title: 'Implementación & Cierre',
      description: 'Desarrollamos, probamos y desplegamos la solución. Formamos a tu equipo para el uso.',
      highlight: true
    },
    {
      num: '04',
      title: 'Mantenimiento',
      description: 'Soporte continuo y mejoras iterativas para asegurar que la automatización evoluciona contigo.',
      highlight: false
    }
  ]

  return (
    <>
      <SEOHead
        title="GoGestia - Automatización y Mejora de Procesos con IA"
        description="Transformamos tu empresa eliminando tareas repetitivas y escalando tu eficiencia operativa con inteligencia artificial."
        url="/"
        type="website"
      />

      {/* Hero Section */}
      <header className="relative bg-agency-dark pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
        {/* Abstract Decorations */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-8">
            Automatización de Procesos<br className="hidden md:block" /> y Soluciones con{' '}
            <span className="text-primary relative inline-block">
              IA
              <svg className="absolute -bottom-2 w-full h-3 text-primary/30" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 5 Q 50 10 100 5" fill="transparent" stroke="currentColor" strokeWidth="8" />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300 font-light">
            Transformamos tu empresa eliminando tareas repetitivas y escalando tu eficiencia operativa.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row">
            <Link to="/contacto" className="h-12 px-8 rounded-lg bg-primary text-agency-dark text-base font-bold shadow-[0_4px_14px_rgba(198,244,98,0.5)] hover:shadow-[0_6px_20px_rgba(198,244,98,0.6)] hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 transition-all">
              Solicita tu diagnóstico gratuito
            </Link>
            <Link to="/servicios" className="h-12 px-8 rounded-lg bg-white/10 border border-white/20 text-white text-base font-bold hover:bg-white/15 inline-flex items-center justify-center gap-2 transition-all">
              <span className="material-symbols-outlined text-xl">play_circle</span> Ver servicios
            </Link>
          </div>
        </div>
      </header>

      {/* Value Proposition / Quote Section */}
      <section className="relative bg-background-light py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <span className="absolute -top-10 -left-6 text-9xl text-agency-dark/5 font-serif leading-none">"</span>
            <h2 className="text-3xl md:text-5xl font-bold text-agency-dark leading-snug">
              Detectamos ineficiencias y proponemos soluciones tecnológicas a medida,{' '}
              <span className="bg-primary/30 px-2 rounded-lg inline-block transform -rotate-1">sin compromiso.</span>
            </h2>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-agency-dark/20"></div>
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">Nuestra Promesa</span>
              <div className="h-px w-12 bg-agency-dark/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-agency-dark font-bold tracking-wide uppercase">Qué Ofrecemos</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Tecnología para Escalar
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-background-light p-8 rounded-2xl border border-gray-100 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="absolute top-8 right-8 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-agency-dark text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 pr-16">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <a href="/servicios" className="inline-flex items-center text-agency-dark font-semibold hover:gap-2 transition-all">
                  Saber más <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32 bg-background-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 mb-12 lg:mb-0">
              <h2 className="text-base text-agency-dark font-bold tracking-wide uppercase mb-2">Cómo Trabajamos</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-agency-dark mb-6">
                Un proceso claro,<br /> sin tecnicismos
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Nos encargamos de toda la complejidad técnica. Tú solo ves los resultados en tu cuenta de resultados y en el tiempo libre de tu equipo.
              </p>
              <Button to="/contacto" variant="secondary" size="md">
                Agendar reunión inicial
              </Button>
            </div>

            {/* Right Steps */}
            <div className="lg:col-span-7 relative">
              <div className="space-y-8 relative">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start group">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full border-4 border-background-light flex items-center justify-center relative z-10 shadow-sm group-hover:scale-110 transition-transform duration-300 ${
                      step.highlight ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-white'
                    }`}>
                      {step.highlight ? (
                        <span className="material-symbols-outlined text-agency-dark">handshake</span>
                      ) : (
                        <span className="text-agency-dark font-bold text-xl">{step.num}</span>
                      )}
                    </div>
                    <div className={`ml-6 pt-2 bg-white p-6 rounded-xl flex-grow shadow-sm hover:shadow-md transition-shadow ${
                      step.highlight ? 'border-l-4 border-primary' : ''
                    }`}>
                      <h4 className="text-xl font-bold text-gray-900">{step.title}</h4>
                      <p className="mt-2 text-gray-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-agency-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
            ¿Listo para automatizar tu negocio?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            La primera consulta es gratuita y te llevarás un plan de acción, trabajes con nosotros o no.
          </p>
          <div className="inline-block p-1 bg-white/10 rounded-2xl backdrop-blur-md">
            <Button to="/contacto" size="lg" className="w-full sm:w-auto text-lg font-bold">
              Solicita tu diagnóstico gratuito
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
