import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoading } from './LoadingProvider'
import contactService from '../services/contactService'

/**
 * Hook personalizado para manejar la lógica del formulario de contacto
 * Maneja el estado del formulario, validaciones y envío
 */
export const useContactForm = () => {
  const navigate = useNavigate()
  const { setLoading } = useLoading()
  
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
    } else if (!contactService.validateEmail(formData.email)) {
      newErrors.email = 'El formato del email no es válido'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio'
    } else if (!contactService.validatePhone(formData.phone)) {
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
   * Maneja el envío del formulario
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
    setLoading(true)
    
    try {
      await contactService.submitContact(formData)
      
      // Resetear formulario
      setFormData(initialFormState)
      setErrors({})
      
      // Redirigir a página de agradecimiento
      navigate('/gracias')
      
    } catch (error) {
      console.error('Error al enviar formulario:', error)
      
      // Determinar el mensaje de error apropiado
      let errorMessage = 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.'
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        // Error de conexión
        errorMessage = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet e inténtalo de nuevo.'
      } else if (error.message) {
        // Error específico del servidor
        errorMessage = error.message
      }
      
      setErrors({
        submit: errorMessage
      })
      
    } finally {
      setIsSubmitting(false)
      setLoading(false)
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
  
  /**
   * Valida un campo específico
   */
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        return !value.trim() 
          ? 'El nombre es obligatorio' 
          : value.trim().length < 2 
            ? 'El nombre debe tener al menos 2 caracteres' 
            : ''
            
      case 'email':
        return !value.trim() 
          ? 'El email es obligatorio' 
          : !contactService.validateEmail(value) 
            ? 'El formato del email no es válido' 
            : ''
            
      case 'phone':
        return !value.trim() 
          ? 'El teléfono es obligatorio' 
          : !contactService.validatePhone(value) 
            ? 'El formato del teléfono no es válido' 
            : ''
            
      case 'company':
        return !value.trim() 
          ? 'El nombre de la empresa es obligatorio' 
          : value.trim().length < 2 
            ? 'El nombre de la empresa debe tener al menos 2 caracteres' 
            : ''
            
      case 'message':
        return !value.trim() 
          ? 'El mensaje es obligatorio' 
          : value.trim().length < 10 
            ? 'El mensaje debe tener al menos 10 caracteres' 
            : ''
            
      case 'acceptPrivacy':
        return !value ? 'Debe aceptar la política de privacidad' : ''
        
      default:
        return ''
    }
  }
  
  return {
    // Estado
    formData,
    errors,
    isSubmitting,
    
    // Acciones
    handleChange,
    handleSubmit,
    resetForm,
    validateField,
    
    // Utilidades
    isFormValid: Object.keys(validateForm()).length === 0,
    hasChanges: JSON.stringify(formData) !== JSON.stringify(initialFormState)
  }
}

export default useContactForm
