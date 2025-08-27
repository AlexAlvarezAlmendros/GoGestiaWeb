import React from 'react'
import ContactHeader from '../components/ContactHeader'
import ContactForm from '../components/ContactForm'
import ContactInfo from '../components/ContactInfo'
import useContactForm from '../hooks/useContactForm'
import { useSEO } from '../hooks/useSEO'

/**
 * Página de contacto principal
 * Utiliza componentes separados para una mejor organización y reutilización
 */
const Contact = () => {
  // Configurar SEO para la página de contacto
  useSEO('contact')
  
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useContactForm()

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <ContactHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <ContactForm
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onChange={handleChange}
            />
          </div>

          {/* Información adicional */}
          <div>
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
