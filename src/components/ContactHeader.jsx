import React from 'react'
import PropTypes from 'prop-types'

/**
 * Componente de cabecera para la página de contacto
 * Muestra el título y descripción principal
 */
const ContactHeader = ({ 
  title = "Solicita tu Diagnóstico Gratuito",
  description = "Cuéntanos sobre tu empresa y te ayudaremos a identificar oportunidades de mejora. Sin compromiso, sin coste.",
  className = ""
}) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
        {title}
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  )
}

ContactHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string
}

export default ContactHeader
