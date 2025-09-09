import { useState, useCallback } from 'react'
import blogService from '../services/blogService'

/**
 * Estados posibles del newsletter
 */
export const NEWSLETTER_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
}

/**
 * Custom hook para manejar la suscripción al newsletter
 * @returns {Object} Estado y funciones para manejar el newsletter
 */
export const useNewsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(NEWSLETTER_STATUS.IDLE)
  const [message, setMessage] = useState('')

  const subscribe = useCallback(async (emailToSubscribe) => {
    const emailAddress = emailToSubscribe || email

    if (!emailAddress) {
      setStatus(NEWSLETTER_STATUS.ERROR)
      setMessage('Por favor, introduce un email válido')
      return false
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailAddress)) {
      setStatus(NEWSLETTER_STATUS.ERROR)
      setMessage('Por favor, introduce un email válido')
      return false
    }

    try {
      setStatus(NEWSLETTER_STATUS.LOADING)
      setMessage('')

      await blogService.subscribeNewsletter(emailAddress)
      
      setStatus(NEWSLETTER_STATUS.SUCCESS)
      setMessage('¡Suscripción exitosa! Revisa tu email para confirmar.')
      setEmail('')
      
      return true
    } catch (err) {
      console.error('Newsletter subscription error:', err)
      setStatus(NEWSLETTER_STATUS.ERROR)
      setMessage(err.message || 'Error al suscribirse. Inténtalo de nuevo.')
      
      return false
    }
  }, [email])

  const reset = useCallback(() => {
    setStatus(NEWSLETTER_STATUS.IDLE)
    setMessage('')
    setEmail('')
  }, [])

  const clearMessage = useCallback(() => {
    setMessage('')
  }, [])

  // Función para manejar el submit del formulario
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    return await subscribe()
  }, [subscribe])

  // Función para manejar el cambio de email
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value)
    // Limpiar errores cuando el usuario empiece a escribir
    if (status === NEWSLETTER_STATUS.ERROR) {
      setStatus(NEWSLETTER_STATUS.IDLE)
      setMessage('')
    }
  }, [status])

  const isLoading = status === NEWSLETTER_STATUS.LOADING
  const isSuccess = status === NEWSLETTER_STATUS.SUCCESS
  const isError = status === NEWSLETTER_STATUS.ERROR
  const isIdle = status === NEWSLETTER_STATUS.IDLE

  return {
    // Estado
    email,
    status,
    message,
    isLoading,
    isSuccess,
    isError,
    isIdle,
    
    // Acciones
    setEmail,
    subscribe,
    reset,
    clearMessage,
    handleSubmit,
    handleEmailChange
  }
}

export default useNewsletter
