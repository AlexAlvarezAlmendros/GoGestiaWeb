import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import contactService from '../services/contactService'

/**
 * Hook personalizado para manejar la lógica del formulario de contacto
 * Valida localmente y envía los datos a la API
 */
export const useContactForm = () => {
  const navigate = useNavigate()
  
  // Estado inicial del formulario
  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    message: '',
    acceptPrivacy: false
  }
  
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  /**
   * Maneja los cambios en los campos del formulario
   */
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

  // Validaciones locales
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[0-9\s-()]{9,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }
  
  /**
   * Valida el formulario completo
   */
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El formato del email no es válido'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'El formato del teléfono no es válido'
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'El nombre de la empresa es obligatorio'
    } else if (formData.company.trim().length < 2) {
      newErrors.company = 'El nombre de la empresa debe tener al menos 2 caracteres'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres'
    }
    
    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = 'Debe aceptar la política de privacidad'
    }
    
    return newErrors
  }
  
  /**
   * Maneja el envío del formulario a la API
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validar formulario
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      await contactService.submitContact(formData)
      
      // Resetear formulario y redirigir
      setFormData(initialFormState)
      setErrors({})
      navigate('/gracias')
      
    } catch (error) {
      console.error('Error al enviar formulario:', error)
      
      let errorMessage = 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.'
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet e inténtalo de nuevo.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setErrors({ submit: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  /**
   * Resetea el formulario a su estado inicial
   */
  const resetForm = () => {
    setFormData(initialFormState)
    setErrors({})
    setIsSubmitting(false)
  }
  
  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    isFormValid: Object.keys(validateForm()).length === 0,
    hasChanges: JSON.stringify(formData) !== JSON.stringify(initialFormState)
  }
}

export default useContactForm
