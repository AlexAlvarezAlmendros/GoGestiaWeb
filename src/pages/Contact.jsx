import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import { useLoading } from '../hooks/LoadingProvider'

const Contact = () => {
  const navigate = useNavigate()
  const { setLoading } = useLoading()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    message: '',
    acceptPrivacy: false
  })
  
  const [errors, setErrors] = useState({})
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio'
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'El nombre de la empresa es obligatorio'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio'
    }
    
    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = 'Debe aceptar la política de privacidad'
    }
    
    return newErrors
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
    
    setLoading(true)
    
    try {
      // Simular envío (aquí iría la integración real)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        navigate('/gracias')
      } else {
        throw new Error('Error al enviar el formulario')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Solicita tu Diagnóstico Gratuito</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cuéntanos sobre tu empresa y te ayudaremos a identificar oportunidades de mejora. 
            Sin compromiso, sin coste.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    onChange={handleChange}
                    error={errors.name}
                    required
                    placeholder="Tu nombre y apellidos"
                  />
                  
                  <Input
                    label="Cargo/Posición"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Director, Gerente, etc."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    placeholder="tu@empresa.com"
                  />
                  
                  <Input
                    label="Teléfono"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    required
                    placeholder="+34 600 000 000"
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
                  onChange={handleChange}
                  error={errors.company}
                  required
                  placeholder="Nombre de tu empresa"
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
                  onChange={handleChange}
                  error={errors.message}
                  required
                  placeholder="Por ejemplo: Tenemos muchas tareas manuales, problemas con el control de stock, necesitamos automatizar procesos, etc."
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
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-brand-lime focus:ring-brand-lime border-gray-300 rounded"
                  />
                  <label htmlFor="acceptPrivacy" className="ml-3 text-sm text-gray-600">
                    He leído y acepto la{' '}
                    <a href="/legal/privacidad" className="text-brand-dark-green hover:underline">
                      política de privacidad
                    </a>
                    {' '}y el{' '}
                    <a href="/legal/aviso-legal" className="text-brand-dark-green hover:underline">
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
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Enviar solicitud de diagnóstico
                </Button>
              </div>
            </form>
          </div>

          {/* Información adicional */}
          <div className="space-y-6">
            <div className="bg-brand-dark-green text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-white">¿Qué incluye el diagnóstico?</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-brand-lime mr-2">✓</span>
                  Reunión inicial (30-60 min)
                </li>
                <li className="flex items-start">
                  <span className="text-brand-lime mr-2">✓</span>
                  Análisis básico de procesos (máx. 3h)
                </li>
                <li className="flex items-start">
                  <span className="text-brand-lime mr-2">✓</span>
                  Informe personalizado en 7 días
                </li>
                <li className="flex items-start">
                  <span className="text-brand-lime mr-2">✓</span>
                  Propuesta de solución sin compromiso
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-brand-dark-green mb-4">Información de contacto</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Email:</strong><br />
                  <a href="mailto:contacto@gogenaiweb.com" className="text-brand-dark-green hover:underline">
                    contacto@gogenaiweb.com
                  </a>
                </div>
                <div>
                  <strong>Teléfono:</strong><br />
                  <a href="tel:+34900000000" className="text-brand-dark-green hover:underline">
                    +34 900 000 000
                  </a>
                </div>
                <div>
                  <strong>Horario de atención:</strong><br />
                  Lunes a Viernes: 9:00 - 18:00h
                </div>
              </div>
            </div>

            <div className="bg-brand-lime p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-brand-dark-green mb-2">Respuesta rápida</h3>
              <p className="text-sm text-brand-dark-green">
                Nos comprometemos a contactarte en un plazo máximo de 24 horas tras recibir tu solicitud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
