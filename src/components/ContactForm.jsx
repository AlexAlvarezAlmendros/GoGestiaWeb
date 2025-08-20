import React from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import Button from './Button'

/**
 * Componente de formulario de contacto reutilizable
 * Maneja la presentación del formulario y delega la lógica al hook useContactForm
 */
const ContactForm = ({
  formData,
  errors,
  isSubmitting,
  onSubmit,
  onChange,
  className = ''
}) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`}>
      {/* Error general de envío */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{errors.submit}</p>
        </div>
      )}

      {/* Información personal */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-brand-dark-green mb-4">
          Información de contacto
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre completo"
            name="name"
            value={formData.name}
            onChange={onChange}
            error={errors.name}
            required
            placeholder="Tu nombre y apellidos"
            disabled={isSubmitting}
          />
          
          <Input
            label="Cargo/Posición"
            name="position"
            value={formData.position}
            onChange={onChange}
            error={errors.position}
            placeholder="Director, Gerente, etc."
            disabled={isSubmitting}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            error={errors.email}
            required
            placeholder="tu@empresa.com"
            disabled={isSubmitting}
          />
          
          <Input
            label="Teléfono"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            error={errors.phone}
            required
            placeholder="+34 600 000 000"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Información de la empresa */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-brand-dark-green mb-4">
          Información de la empresa
        </h3>
        
        <Input
          label="Nombre de la empresa"
          name="company"
          value={formData.company}
          onChange={onChange}
          error={errors.company}
          required
          placeholder="Nombre de tu empresa"
          disabled={isSubmitting}
        />
      </div>

      {/* Mensaje */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-brand-dark-green mb-4">
          Cuéntanos sobre tu situación
        </h3>
        
        <Input
          label="Describe los principales desafíos de tu empresa"
          type="textarea"
          name="message"
          value={formData.message}
          onChange={onChange}
          error={errors.message}
          required
          placeholder="Por ejemplo: Tenemos muchas tareas manuales, problemas con el control de stock, necesitamos automatizar procesos, etc."
          disabled={isSubmitting}
        />
      </div>

      {/* Política de privacidad */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-start">
          <input
            id="acceptPrivacy"
            name="acceptPrivacy"
            type="checkbox"
            checked={formData.acceptPrivacy}
            onChange={onChange}
            disabled={isSubmitting}
            className="mt-1 h-4 w-4 text-brand-lime focus:ring-brand-lime border-gray-300 rounded disabled:opacity-50"
          />
          <label htmlFor="acceptPrivacy" className="ml-3 text-sm text-gray-600">
            He leído y acepto la{' '}
            <a 
              href="/legal/privacidad" 
              className="text-brand-dark-green hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              política de privacidad
            </a>
            {' '}y el{' '}
            <a 
              href="/legal/aviso-legal" 
              className="text-brand-dark-green hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              aviso legal
            </a>
            <span className="text-red-500 ml-1">*</span>
          </label>
        </div>
        {errors.acceptPrivacy && (
          <p className="mt-2 text-sm text-red-600">{errors.acceptPrivacy}</p>
        )}
      </div>

      {/* Botón de envío */}
      <div className="text-center">
        <Button 
          type="submit" 
          size="lg" 
          className="w-full md:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar solicitud de diagnóstico'}
        </Button>
      </div>
    </form>
  )
}

ContactForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    acceptPrivacy: PropTypes.bool.isRequired
  }).isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default ContactForm
