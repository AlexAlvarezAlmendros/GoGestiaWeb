import { Link } from 'react-router-dom'
import Button from '../components/Button'
import SEOHead from '../components/SEOHead'
import DocumentProcessorDemo from '../components/demos/DocumentProcessorDemo'
import StockControlDemo from '../components/demos/StockControlDemo'
import ClientPortalDemo from '../components/demos/ClientPortalDemo'
import APIIntegrationDemo from '../components/demos/APIIntegrationDemo'
import LocalAIAgentDemo from '../components/demos/LocalAIAgentDemo'

const Services = () => {
  const services = [
    {
      id: 'ai-automation',
      icon: 'smart_toy',
      title: 'Automatización con IA',
      description: 'Automatiza tareas repetitivas con agentes LLM personalizados y flujos inteligentes que aprenden de tus datos.',
      useCaseDot: 'bg-green-500',
      useCase: 'Bot de atención al cliente que reduce un 80% el volumen de tickets.',
      useCaseVisual: (
        <div className="space-y-2 opacity-70">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0" />
            <div className="h-2 bg-slate-200 rounded w-3/4 mt-2" />
          </div>
          <div className="flex items-start gap-2 flex-row-reverse">
            <div className="w-6 h-6 rounded-full bg-primary shrink-0" />
            <div className="h-8 bg-primary/20 rounded w-2/3" />
          </div>
        </div>
      ),
      details: [
        'Chatbots internos para atención al cliente',
        'RPA con Python y flujos automatizados',
        'Clasificación automática de correos con IA',
        'Procesamiento automático de documentos',
      ],
      demoComponent: <DocumentProcessorDemo />,
    },
    {
      id: 'internal-apps',
      icon: 'dashboard_customize',
      title: 'Aplicaciones Internas',
      description: 'Optimiza tu back-office con dashboards personalizados, paneles de administración y herramientas de gestión.',
      useCaseDot: 'bg-blue-500',
      useCase: 'Sistema de gestión de inventario para operaciones logísticas.',
      useCaseVisual: (
        <div className="grid grid-cols-3 gap-1 opacity-70 mb-2">
          <div className="h-8 bg-slate-200 rounded col-span-3" />
          <div className="h-12 bg-slate-200 rounded" />
          <div className="h-12 bg-slate-200 rounded col-span-2" />
        </div>
      ),
      details: [
        'Dashboards personalizados para directivos',
        'CRM interno adaptado a tu negocio',
        'Control de stock e inventarios',
        'Sistemas de evaluación y reporting',
      ],
      demoComponent: <StockControlDemo />,
    },
    {
      id: 'external-apps',
      icon: 'devices',
      title: 'Aplicaciones Externas',
      description: 'Portales de cliente y productos SaaS robustos, diseñados para escalar de forma segura con tu base de usuarios.',
      useCaseDot: 'bg-purple-500',
      useCase: 'Portal B2B para seguimiento de proyectos en tiempo real.',
      useCaseVisual: (
        <div className="relative h-16 w-full bg-slate-200 rounded overflow-hidden opacity-70 flex items-center justify-center">
          <div className="absolute inset-x-4 top-4 h-full bg-white rounded-t-lg shadow-sm" />
        </div>
      ),
      details: [
        'Portal de clientes con área privada',
        'Sistemas de reservas online',
        'Plataformas de e-learning',
        'Landing pages de autoservicio',
      ],
      demoComponent: <ClientPortalDemo />,
    },
    {
      id: 'integrations',
      icon: 'hub',
      title: 'Integraciones',
      description: 'Conecta tus herramientas dispares. Creamos APIs y middleware a medida para sincronizar CRM, ERP y marketing.',
      useCaseDot: 'bg-orange-500',
      useCase: 'Sincronización automática entre HubSpot y NetSuite.',
      useCaseVisual: (
        <div className="flex items-center justify-between opacity-70 px-2 py-3">
          <div className="w-8 h-8 bg-slate-200 rounded-md" />
          <div className="h-0.5 flex-1 bg-slate-300 mx-1 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
          </div>
          <div className="w-8 h-8 bg-slate-200 rounded-md" />
        </div>
      ),
      details: [
        'Conexión CRM con email marketing',
        'Integración facturación-contabilidad',
        'APIs personalizadas multiplataforma',
        'Webhooks para automatizar flujos',
      ],
      demoComponent: <APIIntegrationDemo />,
    },
    {
      id: 'local-ai-agents',
      icon: 'dns',
      title: 'Agentes IA Locales',
      description: 'Instalamos y mantenemos agentes de IA en tus propias máquinas. Datos 100% en local, sin coste por token y sin dependencia del cloud.',
      useCaseDot: 'bg-emerald-500',
      useCase: 'Servidor on-premise con Llama 3 procesando contratos confidenciales sin salir de la red corporativa.',
      useCaseVisual: (
        <div className="flex items-center gap-2 opacity-70 px-1 py-2">
          <div className="flex flex-col gap-1 flex-1">
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-emerald-500/70 rounded-full" />
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-emerald-500/50 rounded-full" />
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-emerald-500/60 rounded-full" />
            </div>
          </div>
          <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-slate-400 text-lg">memory</span>
          </div>
        </div>
      ),
      details: [
        'Asesoramiento y suministro del hardware (servidores, GPUs, NAS)',
        'Instalación y configuración del stack IA (Ollama, vLLM, RAG)',
        'Despliegue de agentes y modelos open-source (Llama, Mistral, Qwen)',
        'Mantenimiento, actualizaciones y monitorización 24/7',
      ],
      demoComponent: <LocalAIAgentDemo />,
    },
  ]

  const features = [
    { icon: 'check_circle', text: 'Estándares de seguridad enterprise' },
    { icon: 'check_circle', text: 'Procesamiento de datos en tiempo real' },
    { icon: 'check_circle', text: 'Integración API sin fisuras' },
  ]

  const stats = [
    { value: '50+', label: 'Aplicaciones Lanzadas' },
    { value: '10M', label: 'Llamadas API / Día' },
    { value: '99.9%', label: 'Disponibilidad Garantizada' },
    { value: '24/7', label: 'Soporte Experto' },
  ]

  return (
    <>
      <SEOHead
        title="Servicios - GoGestia"
        description="Automatización con IA, apps internas y externas, integraciones. Soluciones tecnológicas personalizadas para tu empresa."
        url="/servicios"
      />

      {/* ─── Hero ─── */}
      <section className="relative px-6 md:px-20 py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-agency-dark/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-[1200px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-agency-dark">Servicios Disponibles</span>
          </div>

          <h1 className="text-agency-dark text-5xl md:text-7xl font-black leading-[1.1] tracking-[-0.033em] mb-6">
            Tecnología inteligente que{' '}
            <span className="relative inline-block">
              transforma
              <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/40 -z-10 rotate-1" />
            </span>{' '}
            operaciones.
          </h1>

          <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            Construimos soluciones a medida de automatización con IA y software para optimizar tu negocio, reducir costes y desbloquear nuevos canales de crecimiento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#servicios-detalle" className="h-12 px-8 rounded-lg bg-agency-dark text-white text-base font-bold hover:bg-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 transition-all">
              <span>Explorar Servicios</span>
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
            </a>
            <Link to="/contacto" className="h-12 px-8 rounded-lg bg-white border border-slate-200 text-agency-dark text-base font-bold hover:bg-slate-50 inline-flex items-center justify-center gap-2 transition-all">
              Solicita tu diagnóstico
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Services Grid ─── */}
      <section id="servicios-detalle" className="px-6 md:px-10 pt-16 pb-24 max-w-[1400px] mx-auto w-full scroll-mt-24">
        <div className="mb-12 border-b border-slate-200 pb-4">
          <h2 className="text-agency-dark text-3xl font-bold tracking-tight">Nuestras Soluciones</h2>
          <p className="text-slate-500 mt-2">Tecnología escalable adaptada a empresas modernas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 border border-transparent hover:border-primary/50 relative overflow-hidden flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-5 text-agency-dark group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl">{service.icon}</span>
              </div>

              <h3 className="text-xl font-bold text-agency-dark mb-2">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>

              {/* Visual Use Case */}
              <div className="mt-auto bg-slate-50 rounded-lg p-4 border border-slate-100 group-hover:bg-primary/5 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${service.useCaseDot}`} />
                  <span className="text-xs font-semibold text-slate-400 uppercase">Caso de Uso</span>
                </div>
                {service.useCaseVisual}
                <p className="text-xs text-agency-dark font-medium mt-3 pt-3 border-t border-slate-200/50">
                  {service.useCase}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Feature Detail (Alternating) ─── */}
      <section className="bg-white py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto space-y-24">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Interactive Demo */}
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl transform translate-x-4 translate-y-4 -z-0" />
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg z-10">
                  {service.demoComponent}
                </div>
              </div>

              {/* Text block */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl font-bold text-agency-dark mb-4">{service.title}</h3>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <Button to="/contacto" className="text-agency-dark font-bold border-b-2 border-primary hover:text-primary transition-colors pb-1 inline-flex items-center gap-1 bg-transparent shadow-none rounded-none px-0">
                  Solicitar información <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="bg-agency-dark text-white py-16 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="px-4">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-slate-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-agency-dark mb-6">
            ¿Listo para modernizar tu empresa?
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">
            Deja de luchar con procesos manuales y software obsoleto. Hablemos de cómo GoGestia puede acelerar tu hoja de ruta.
          </p>
          <Button to="/contacto" className="inline-flex h-14 px-10 items-center justify-center rounded-xl bg-primary text-agency-dark text-lg font-bold shadow-[0_4px_14px_rgba(198,244,98,0.5)] hover:shadow-[0_6px_20px_rgba(198,244,98,0.6)] hover:-translate-y-1 transition-all duration-300">
            Solicita tu diagnóstico
          </Button>
        </div>
      </section>
    </>
  )
}

export default Services
