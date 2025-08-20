import React from 'react'

/**
 * Componente que muestra la información adicional del formulario de contacto
 * Incluye detalles del diagnóstico, información de contacto y tiempo de respuesta
 */
const ContactInfo = () => {
  return (
    <div className="space-y-6">
      {/* Información del diagnóstico */}
      <div className="bg-brand-dark-green text-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-white">
          ¿Qué incluye el diagnóstico?
        </h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start">
            <span className="text-brand-lime mr-2 mt-0.5 flex-shrink-0">✓</span>
            <span>Reunión inicial (30-60 min)</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-lime mr-2 mt-0.5 flex-shrink-0">✓</span>
            <span>Análisis básico de procesos (máx. 3h)</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-lime mr-2 mt-0.5 flex-shrink-0">✓</span>
            <span>Informe personalizado en 7 días</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-lime mr-2 mt-0.5 flex-shrink-0">✓</span>
            <span>Propuesta de solución sin compromiso</span>
          </li>
        </ul>
      </div>

      {/* Información de contacto */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-brand-dark-green mb-4">
          Información de contacto
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <strong className="text-brand-dark-green">Email:</strong>
            <br />
            <a 
              href="mailto:contacto@gogenaiweb.com" 
              className="text-brand-dark-green hover:underline transition-colors duration-200"
            >
              contacto@gogenaiweb.com
            </a>
          </div>
          <div>
            <strong className="text-brand-dark-green">Teléfono:</strong>
            <br />
            <a 
              href="tel:+34900000000" 
              className="text-brand-dark-green hover:underline transition-colors duration-200"
            >
              +34 900 000 000
            </a>
          </div>
          <div>
            <strong className="text-brand-dark-green">Horario de atención:</strong>
            <br />
            <span className="text-gray-600">Lunes a Viernes: 9:00 - 18:00h</span>
          </div>
        </div>
      </div>

      {/* Compromiso de respuesta */}
      <div className="bg-brand-lime p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-brand-dark-green mb-2">
          Respuesta rápida
        </h3>
        <p className="text-sm text-brand-dark-green">
          Nos comprometemos a contactarte en un plazo máximo de 24 horas tras recibir tu solicitud.
        </p>
      </div>
    </div>
  )
}

export default ContactInfo
