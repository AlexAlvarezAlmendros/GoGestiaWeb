import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

const Thanks = () => {
  return (
    <>
      <SEOHead
        title="Solicitud Recibida - GoGestia"
        description="Hemos recibido tu solicitud. Nuestro equipo se pondrá en contacto contigo en 24-48 horas."
        url="/gracias"
      />

      <main className="flex-grow flex items-center justify-center px-4 relative overflow-hidden min-h-screen pt-20">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(198,244,98,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(198,244,98,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Background blurs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

        {/* Success Card */}
        <div className="max-w-2xl w-full text-center relative z-10">
          {/* Animated icon */}
          <div className="mx-auto mb-8 relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75" />
            <div className="relative bg-primary text-agency-dark w-24 h-24 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-5xl">check</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Solicitud{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              Recibida
            </span>
          </h1>

          <p className="text-xl md:text-2xl font-medium text-gray-700 mb-4">
            Gracias por confiar en GoGestia.
          </p>

          {/* Info box */}
          <div className="max-w-lg mx-auto bg-white/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 mb-10 shadow-sm">
            <p className="text-gray-600 leading-relaxed text-lg">
              Hemos recibido tu solicitud de diagnóstico. Nuestros especialistas revisarán tu caso y te contactarán en un plazo de{' '}
              <span className="font-bold text-emerald-800">24-48 horas</span> para comentar los próximos pasos.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/servicios"
              className="w-full sm:w-auto px-8 py-3.5 bg-agency-dark text-white font-bold rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">grid_view</span>
              Ver nuestros servicios
            </Link>
            <a
              href="https://www.linkedin.com/company/gogestia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-lg hover:border-primary hover:text-emerald-800 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Síguenos en LinkedIn
            </a>
          </div>

          {/* Help link */}
          <div className="mt-8 text-sm text-gray-500">
            ¿Necesitas ayuda inmediata?{' '}
            <a href="mailto:contacto@gogestia.com" className="text-emerald-700 underline decoration-primary/50 hover:decoration-primary decoration-2 underline-offset-2 transition-all">
              Escríbenos directamente
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

export default Thanks
