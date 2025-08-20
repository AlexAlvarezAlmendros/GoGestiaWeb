import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

const Thanks = () => {
  // Redirección automática después de 10 segundos (opcional)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Uncomment if you want auto-redirect
      // window.location.href = '/'
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-green mb-6">
          ¡Gracias por tu solicitud!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Hemos recibido tu solicitud de diagnóstico gratuito correctamente. 
          Nuestro equipo la revisará y se pondrá en contacto contigo muy pronto.
        </p>

        {/* Next Steps */}
        <div className="bg-gray-50 rounded-xl p-8 mb-12 text-left max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-dark-green mb-6 text-center">
            Próximos pasos
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-lime rounded-full flex items-center justify-center mr-4">
                <span className="text-brand-dark-green font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark-green mb-1">Revisión de tu solicitud</h3>
                <p className="text-gray-600">Analizaremos la información proporcionada para preparar nuestra reunión.</p>
                <p className="text-sm text-gray-500 mt-1"><strong>Tiempo estimado:</strong> 2-4 horas</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-lime rounded-full flex items-center justify-center mr-4">
                <span className="text-brand-dark-green font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark-green mb-1">Primer contacto</h3>
                <p className="text-gray-600">Te contactaremos para agendar una reunión inicial y conocer mejor tu situación.</p>
                <p className="text-sm text-gray-500 mt-1"><strong>Plazo:</strong> 24-48 horas</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-lime rounded-full flex items-center justify-center mr-4">
                <span className="text-brand-dark-green font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark-green mb-1">Diagnóstico gratuito</h3>
                <p className="text-gray-600">Reunión de diagnóstico y auditoría básica de tus procesos (máximo 3 horas).</p>
                <p className="text-sm text-gray-500 mt-1"><strong>Modalidad:</strong> Presencial u online</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-lime rounded-full flex items-center justify-center mr-4">
                <span className="text-brand-dark-green font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark-green mb-1">Informe personalizado</h3>
                <p className="text-gray-600">Entregaremos un informe detallado con puntos críticos y propuesta de solución.</p>
                <p className="text-sm text-gray-500 mt-1"><strong>Entrega:</strong> 7 días después del diagnóstico</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-brand-dark-green text-white rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">¿Tienes alguna pregunta urgente?</h2>
          <p className="mb-6">
            Si necesitas contactarnos antes de que te llamemos, puedes hacerlo a través de:
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:contacto@gogestia.com" 
              className="flex items-center text-brand-lime hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              contacto@gogestia.com
            </a>
            
            <span className="text-gray-400 hidden sm:block">|</span>
            
            <a 
              href="tel:+34656852437" 
              className="flex items-center text-brand-lime hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +34 656 852 437
            </a>
          </div>
        </div>

        {/* Secondary CTAs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-brand-dark-green mb-6">
            Mientras tanto, puedes:
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/servicios" variant="outline">
              Conocer nuestros servicios
            </Button>
            
            <Button 
              href="https://www.linkedin.com/company/gogestia" 
              target="_blank"
              variant="ghost"
            >
              Síguenos en LinkedIn
            </Button>
          </div>
        </div>

        {/* Auto-redirect notice */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            ¿Quieres volver al inicio?{' '}
            <Link to="/" className="text-brand-dark-green hover:underline font-medium">
              Haz clic aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Thanks
