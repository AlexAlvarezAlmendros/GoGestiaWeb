// Servicio para manejar el envío de formularios de contacto
class ContactService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
  }

  async submitContact(formData) {
    try {
      const response = await fetch(`${this.baseURL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          position: formData.position || '',
          message: formData.message,
          acceptPrivacy: formData.acceptPrivacy,
          timestamp: new Date().toISOString(),
          source: 'website'
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al enviar el formulario')
      }

      return await response.json()
    } catch (error) {
      console.error('Error en ContactService.submitContact:', error)
      
      // Solo simular envío exitoso en desarrollo, no en producción
      if (import.meta.env.DEV && error.name === 'TypeError' && error.message.includes('fetch')) {
        console.warn('Modo desarrollo: No se pudo conectar con el servidor. Simulando envío exitoso.')
        return { 
          success: true, 
          message: 'Formulario enviado correctamente (modo desarrollo)' 
        }
      }
      
      // En producción, siempre lanzar el error real
      throw error
    }
  }

  async subscribeNewsletter(email) {
    try {
      const response = await fetch(`${this.baseURL}/api/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          timestamp: new Date().toISOString(),
          source: 'website'
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al suscribirse al newsletter')
      }

      return await response.json()
    } catch (error) {
      console.error('Error en ContactService.subscribeNewsletter:', error)
      
      // Solo simular suscripción exitosa en desarrollo, no en producción
      if (import.meta.env.DEV && error.name === 'TypeError' && error.message.includes('fetch')) {
        console.warn('Modo desarrollo: No se pudo conectar con el servidor. Simulando suscripción exitosa.')
        return { 
          success: true, 
          message: 'Suscripción exitosa (modo desarrollo)' 
        }
      }
      
      // En producción, siempre lanzar el error real
      throw error
    }
  }

  // Validaciones del lado del cliente
  validateContactForm(formData) {
    const errors = {}

    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres'
    }

    if (!formData.email || !this.validateEmail(formData.email)) {
      errors.email = 'Por favor, introduce un email válido'
    }

    if (!formData.phone || formData.phone.trim().length < 9) {
      errors.phone = 'Por favor, introduce un teléfono válido'
    }

    if (!formData.company || formData.company.trim().length < 2) {
      errors.company = 'El nombre de la empresa es obligatorio'
    }

    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres'
    }

    if (!formData.acceptPrivacy) {
      errors.acceptPrivacy = 'Debe aceptar la política de privacidad para continuar'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  validatePhone(phone) {
    // Validación básica para números de teléfono españoles e internacionales
    const phoneRegex = /^[+]?[0-9\s-()]{9,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }
}

// Exportar una instancia singleton
const contactService = new ContactService()
export default contactService
