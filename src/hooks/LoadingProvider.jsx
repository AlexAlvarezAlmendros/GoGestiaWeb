import { createContext, useContext, useState } from 'react'

const LoadingContext = createContext()

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = (loading) => {
    setIsLoading(loading)
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-dark-green"></div>
            <span className="text-brand-dark-green font-semibold">Cargando...</span>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
