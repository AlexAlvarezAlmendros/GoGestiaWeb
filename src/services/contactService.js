const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

/**
 * Servicio para enviar el formulario de contacto a la API
 */
const contactService = {
  async submitContact(formData) {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Error al enviar el formulario')
    }

    return response.json()
  }
}

export default contactService
