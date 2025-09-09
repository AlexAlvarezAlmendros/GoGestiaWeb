import { createContext, useEffect, useState, useRef, useCallback } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

/**
 * Contexto de autenticación global con token JWT y roles
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
  
  // Ref para controlar si ya hemos obtenido el token
  const tokenObtained = useRef(false)
  const tokenPromise = useRef(null)

  // Obtener token y perfil cuando el usuario esté autenticado
  useEffect(() => {
    const getTokenAndProfile = async () => {
      if (isAuthenticated && !tokenLoading && !tokenObtained.current) {
        // Evitar múltiples llamadas simultáneas
        if (tokenPromise.current) {
          return tokenPromise.current
        }

        console.log('🔄 Iniciando obtención de token...')
        tokenObtained.current = true
        setTokenLoading(true)

        tokenPromise.current = (async () => {
          try {
            // Obtener token con permisos
            const accessToken = await getAccessTokenSilently({
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
              scope: "openid profile email read:posts create:posts edit:posts delete:posts"
            })
            
            setToken(accessToken)
            
            // Configurar token global para los servicios
            if (accessToken) {
              window.__authToken = accessToken
            }
            
            // Decodificar token para obtener permisos
            if (accessToken) {
              try {
                const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]))
                
                // Debug: Imprimir todo el payload del token
                console.log('🔐 Token payload completo:', tokenPayload)
                
                const userPermissions = tokenPayload.permissions || []
                const userRoles = tokenPayload['https://app.claims/roles'] || 
                                 tokenPayload['app_metadata']?.roles || 
                                 tokenPayload.roles || 
                                 []
                
                console.log('📋 Permisos encontrados:', userPermissions)
                console.log('👤 Roles encontrados:', userRoles)
                console.log('🔍 Todas las propiedades del token:', Object.keys(tokenPayload))
                
                setPermissions(userPermissions)
                setRoles(userRoles)
                
                // Obtener perfil del usuario desde la API
                await fetchUserProfile(accessToken)
              } catch (err) {
                console.error('Error decodificando token:', err)
              }
            }
          } catch (err) {
            console.error('Error obteniendo token:', err)
            setToken(null)
            delete window.__authToken
            tokenObtained.current = false
          } finally {
            setTokenLoading(false)
            tokenPromise.current = null
          }
        })()

        return tokenPromise.current
      } else if (!isAuthenticated && tokenObtained.current) {
        // Limpiar estado cuando no está autenticado
        console.log('🔄 Limpiando estado de autenticación...')
        tokenObtained.current = false
        setToken(null)
        setUserProfile(null)
        setPermissions([])
        setRoles([])
        delete window.__authToken
        setTokenLoading(false)
        tokenPromise.current = null
      }
    }

    getTokenAndProfile()
  }, [isAuthenticated, getAccessTokenSilently, tokenLoading, fetchUserProfile])

  // Obtener perfil del usuario desde la API (memoizado)
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

  // Función de login (memoizada)
  const login = useCallback(async () => {
    await loginWithRedirect()
  }, [loginWithRedirect])

  // Función de logout (memoizada)
  const logout = useCallback(() => {
    tokenObtained.current = false
    setToken(null)
    setUserProfile(null)
    setPermissions([])
    setRoles([])
    delete window.__authToken
    tokenPromise.current = null
    auth0Logout({ logoutParams: { returnTo: window.location.origin } })
  }, [auth0Logout])

  // Verificar si el usuario tiene un permiso específico (memoizada)
  const hasPermission = useCallback((permission) => {
    const hasIt = permissions.includes(permission)
    console.log(`🔍 Verificando permiso "${permission}":`, {
      permissions,
      tienePermiso: hasIt
    })
    return hasIt
  }, [permissions])

  // Verificar si el usuario tiene un rol específico (memoizada)
  const hasRole = useCallback((role) => {
    const hasIt = roles.includes(role)
    console.log(`🔍 Verificando rol "${role}":`, {
      roles,
      tieneRol: hasIt,
      rolesCompletos: roles
    })
    return hasIt
  }, [roles])

  // Verificar si puede crear posts (Admin o Editor) (memoizada)
  const canCreatePosts = useCallback(() => {
    const canCreate = hasRole('Admin') || hasRole('Editor') || hasPermission('create:posts')
    console.log('✏️ Puede crear posts:', {
      canCreate,
      isAdmin: hasRole('Admin'),
      isEditor: hasRole('Editor'),
      hasCreatePermission: hasPermission('create:posts'),
      roles,
      permissions
    })
    return canCreate
  }, [hasRole, hasPermission, roles, permissions])

  // Verificar si puede editar posts (memoizada)
  const canEditPosts = useCallback(() => {
    return hasRole('Admin') || hasRole('Editor') || hasPermission('edit:posts')
  }, [hasRole, hasPermission])

  // Verificar si puede eliminar posts (memoizada)
  const canDeletePosts = useCallback(() => {
    return hasRole('Admin') || hasPermission('delete:posts')
  }, [hasRole, hasPermission])

  // Verificar si es admin (memoizada)
  const isAdmin = useCallback(() => {
    return hasRole('Admin')
  }, [hasRole])

  // Obtener headers de autorización (memoizada)
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

  // Información del usuario procesada
  const userInfo = user ? {
    id: user.sub,
    name: user.name,
    email: user.email,
    picture: user.picture,
    emailVerified: user.email_verified,
    nickname: user.nickname,
    metadata: user.user_metadata || {},
    profile: userProfile
  } : null

  const value = {
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
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
