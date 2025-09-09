import { createContext, useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

/**
 * Contexto de autenticación global con token JWT y roles
 * Versión optimizada para evitar re-renders innecesarios
 */
const AuthContext = createContext()

/**
 * Provider del contexto de autenticación
 */
export const AuthProvider = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
    error
  } = useAuth0()

  const [token, setToken] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [permissions, setPermissions] = useState([])
  const [roles, setRoles] = useState([])
  const [tokenLoading, setTokenLoading] = useState(false)
  
  // Ref para controlar si ya hemos iniciado la obtención del token
  const tokenInitialized = useRef(false)

  // Obtener perfil del usuario desde la API
  const fetchUserProfile = useCallback(async (accessToken) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      
      if (response.ok) {
        const profile = await response.json()
        setUserProfile(profile)
      }
    } catch (err) {
      console.error('Error obteniendo perfil:', err)
    }
  }, [])

  // Efecto para obtener token cuando se autentica
  useEffect(() => {
    let isMounted = true
    
    const initializeAuth = async () => {
      if (isAuthenticated && !tokenInitialized.current && !isLoading) {
        tokenInitialized.current = true
        setTokenLoading(true)
        
        try {
          console.log('🔄 Iniciando obtención de token...')
          
          const accessToken = await getAccessTokenSilently({
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: "openid profile email read:posts create:posts edit:posts delete:posts"
          })
          
          if (!isMounted) return
          
          console.log('✅ Token obtenido exitosamente')
          setToken(accessToken)
          
          // Configurar token global
          window.__authToken = accessToken
          
          // Decodificar token
          if (accessToken) {
            try {
              const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]))
              
              console.log('🔐 Token payload completo:', tokenPayload)
              
              const userPermissions = tokenPayload.permissions || []
              const userRoles = tokenPayload['https://app.claims/roles'] || 
                               tokenPayload['app_metadata']?.roles || 
                               tokenPayload.roles || 
                               []
              
              console.log('📋 Permisos encontrados:', userPermissions)
              console.log('👤 Roles encontrados:', userRoles)
              
              if (isMounted) {
                setPermissions(userPermissions)
                setRoles(userRoles)
              }
              
              // Obtener perfil
              await fetchUserProfile(accessToken)
            } catch (err) {
              console.error('Error decodificando token:', err)
            }
          }
        } catch (err) {
          console.error('Error obteniendo token:', err)
          if (isMounted) {
            setToken(null)
            delete window.__authToken
            tokenInitialized.current = false
          }
        } finally {
          if (isMounted) {
            setTokenLoading(false)
          }
        }
      } else if (!isAuthenticated && tokenInitialized.current) {
        // Limpiar estado
        console.log('🔄 Limpiando estado de autenticación...')
        tokenInitialized.current = false
        setToken(null)
        setUserProfile(null)
        setPermissions([])
        setRoles([])
        delete window.__authToken
        setTokenLoading(false)
      }
    }

    initializeAuth()
    
    return () => {
      isMounted = false
    }
  }, [isAuthenticated, isLoading, getAccessTokenSilently, fetchUserProfile])

  // Funciones memoizadas para evitar re-renders
  const login = useCallback(async () => {
    await loginWithRedirect()
  }, [loginWithRedirect])

  const logout = useCallback(() => {
    tokenInitialized.current = false
    setToken(null)
    setUserProfile(null)
    setPermissions([])
    setRoles([])
    delete window.__authToken
    auth0Logout({ logoutParams: { returnTo: window.location.origin } })
  }, [auth0Logout])

  const hasPermission = useCallback((permission) => {
    return permissions.includes(permission)
  }, [permissions])

  const hasRole = useCallback((role) => {
    return roles.includes(role)
  }, [roles])

  const canCreatePosts = useCallback(() => {
    return hasRole('Admin') || hasRole('Editor') || hasPermission('create:posts')
  }, [hasRole, hasPermission])

  const canEditPosts = useCallback(() => {
    return hasRole('Admin') || hasRole('Editor') || hasPermission('edit:posts')
  }, [hasRole, hasPermission])

  const canDeletePosts = useCallback(() => {
    return hasRole('Admin') || hasPermission('delete:posts')
  }, [hasRole, hasPermission])

  const isAdmin = useCallback(() => {
    return hasRole('Admin')
  }, [hasRole])

  const getAuthHeaders = useCallback(() => {
    if (token) {
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return {
      'Content-Type': 'application/json'
    }
  }, [token])

  // Información del usuario memoizada
  const userInfo = useMemo(() => {
    if (!user) return null
    
    return {
      id: user.sub,
      name: user.name,
      email: user.email,
      picture: user.picture,
      emailVerified: user.email_verified,
      nickname: user.nickname,
      metadata: user.user_metadata || {},
      profile: userProfile
    }
  }, [user, userProfile])

  // Valor del contexto memoizado
  const contextValue = useMemo(() => ({
    // Estados de autenticación
    isAuthenticated,
    isLoading: isLoading || tokenLoading,
    user: userInfo,
    token,
    permissions,
    roles,
    error,
    
    // Funciones de autenticación
    login,
    logout,
    
    // Verificación de permisos
    hasPermission,
    hasRole,
    canCreatePosts,
    canEditPosts,
    canDeletePosts,
    isAdmin,
    
    // Utilidades
    getAuthHeaders,
    fetchUserProfile
  }), [
    isAuthenticated,
    isLoading,
    tokenLoading,
    userInfo,
    token,
    permissions,
    roles,
    error,
    login,
    logout,
    hasPermission,
    hasRole,
    canCreatePosts,
    canEditPosts,
    canDeletePosts,
    isAdmin,
    getAuthHeaders,
    fetchUserProfile
  ])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
