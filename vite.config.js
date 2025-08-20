import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configuración para el servidor de desarrollo
  server: {
    port: 5173,
    host: true,
    // Fallback para rutas SPA en desarrollo
    historyApiFallback: true
  },
  
  // Configuración para el build de producción
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Optimizaciones para producción
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  },
  
  // Base URL para el deployment
  base: '/'
})
