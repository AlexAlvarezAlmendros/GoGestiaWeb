/**
 * Configuración de información de contacto
 * Utiliza variables de entorno cuando están disponibles
 */

export const contactConfig = {
  email: import.meta.env.VITE_CONTACT_EMAIL || 'contacto@gogestia.com',
  phone: import.meta.env.VITE_CONTACT_PHONE || '+34 656 852 437',
  phoneDisplay: import.meta.env.VITE_CONTACT_PHONE_DISPLAY || '+34 656 852 437',
  companyName: import.meta.env.VITE_SITE_NAME || 'GoGestia',
  
  // Horarios de atención
  businessHours: {
    weekdays: 'Lunes a Viernes: 9:00 - 18:00h',
    timezone: 'CET (Madrid)'
  },
  
  // Compromisos de servicio
  responseTime: {
    contact: '24 horas',
    diagnosis: '7 días'
  },
  
  // URLs de políticas legales
  legal: {
    privacy: '/legal/privacidad',
    terms: '/legal/aviso-legal',
    cookies: '/legal/cookies'
  }
}

export default contactConfig
