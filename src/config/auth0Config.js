/**
 * Configuración de Auth0 para el frontend
 */

const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || 'tu-dominio.auth0.com',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || 'tu-client-id',
  audience: import.meta.env.VITE_AUTH0_AUDIENCE || undefined, // undefined si no está configurado
  redirectUri: import.meta.env.VITE_AUTH0_REDIRECT_URI || window.location.origin,
}

// Validar configuración requerida
const requiredConfig = ['domain', 'clientId']
const missingConfig = requiredConfig.filter(key => !auth0Config[key] || auth0Config[key].startsWith('tu-'))

if (missingConfig.length > 0) {
  console.error('❌ Configuración de Auth0 incompleta. Faltan las siguientes variables de entorno:')
  missingConfig.forEach(key => {
    console.error(`   VITE_AUTH0_${key.toUpperCase()}`)
  })
  console.error('📖 Consulta el archivo .env.example para más información')
}

export default auth0Config
