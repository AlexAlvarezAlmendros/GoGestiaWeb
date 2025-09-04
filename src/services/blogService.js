const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Map para rastrear requests activos y prevenir duplicados
const activeRequests = new Map()

// Función para generar hash simple del contenido
const generateContentHash = (data) => {
  const str = JSON.stringify(data)
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36)
}

class BlogService {
  /**
   * Obtiene la lista de artículos del blog
   * @param {Object} params - Parámetros de consulta
   * @param {number} params.page - Número de página
   * @param {number} params.limit - Artículos por página
   * @param {string} params.category - Filtrar por categoría
   * @param {string} params.search - Buscar en título y contenido
   * @param {boolean} params.featured - Solo artículos destacados
   * @returns {Promise<Object>} Lista de artículos con paginación
   */
  async getPosts(params = {}) {
    try {
      const queryParams = new URLSearchParams()
      
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      if (params.category) queryParams.append('category', params.category)
      if (params.search) queryParams.append('search', params.search)
      if (params.featured !== undefined) queryParams.append('featured', params.featured)

      const response = await fetch(`${API_BASE_URL}/api/blog/posts?${queryParams}`)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      throw error
    }
  }

  /**
   * Obtiene un artículo específico por su slug
   * @param {string} slug - Slug del artículo
   * @returns {Promise<Object>} Datos completos del artículo
   */
  async getPostBySlug(slug) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/posts/${slug}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Artículo no encontrado')
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching blog post:', error)
      
      // Fallback con datos de ejemplo
      const fallbackPost = this.getFallbackPostBySlug(slug)
      if (fallbackPost) {
        return { success: true, data: fallbackPost }
      }
      
      throw error
    }
  }

  /**
   * Obtiene las categorías disponibles
   * @returns {Promise<Object>} Lista de categorías
   */
  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/categories`)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }

  /**
   * Crea una nueva categoría
   * @param {string} categoryName - Nombre de la categoría
   * @returns {Promise<Object>} Categoría creada
   */
  async createCategory(categoryName) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: categoryName })
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error creating category:', error)
      
      // Simulación para desarrollo local
      if (error.message.includes('fetch')) {
        return this.createCategoryFallback(categoryName)
      }
      
      throw error
    }
  }

  /**
   * Obtiene artículos relacionados a uno específico
   * @param {string} slug - Slug del artículo
   * @returns {Promise<Object>} Lista de artículos relacionados
   */
  async getRelatedPosts(slug) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/posts/${slug}/related`)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching related posts:', error)
      throw error
    }
  }

  /**
   * Incrementa el contador de vistas de un artículo
   * @param {string} slug - Slug del artículo
   * @returns {Promise<Object>} Respuesta de la API
   */
  async incrementViews(slug) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/posts/${slug}/views`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error incrementing views:', error)
      // No lanzamos el error aquí porque las vistas no son críticas
      return null
    }
  }

  /**
   * Suscribe un email al newsletter
   * @param {string} email - Email para suscribir
   * @returns {Promise<Object>} Respuesta de la API
   */
  async subscribeNewsletter(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      throw error
    }
  }

  /**
   * Crea un nuevo post del blog
   * @param {Object} postData - Datos del post a crear
   * @returns {Promise<Object>} Respuesta de la API
   */
  async createPost(postData) {
    const requestId = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    console.log(`[${requestId}] BlogService.createPost iniciado con datos:`, postData)
    
    // Generar hash del contenido para detectar duplicados
    const contentHash = generateContentHash(postData)
    console.log(`[${requestId}] Hash del contenido: ${contentHash}`)
    
    // Verificar si ya hay un request activo con el mismo contenido
    if (activeRequests.has(contentHash)) {
      console.warn(`[${requestId}] Request duplicado detectado para hash ${contentHash}, rechazando`)
      throw new Error('Ya existe una petición en progreso con el mismo contenido')
    }
    
    // Marcar este request como activo
    activeRequests.set(contentHash, requestId)
    console.log(`[${requestId}] Request marcado como activo`)
    
    try {
      // Formatear los datos según la especificación de la API
      const formattedData = {
        title: postData.title, // REQUERIDO
        content: postData.content, // REQUERIDO
        excerpt: postData.excerpt || '', // opcional
        tags: postData.tags || [], // array de strings
        author: postData.author || 'GoGestia Team', // REQUERIDO
        published: postData.published !== undefined ? postData.published : false, // boolean
        featuredImage: postData.featuredImage || '', // URL opcional
        metaTitle: postData.metaTitle || '', // opcional
        metaDescription: postData.metaDescription || '', // opcional
      }

      console.log(`[${requestId}] Datos formateados:`, formattedData)
      console.log(`[${requestId}] Enviando POST request a: ${API_BASE_URL}/api/blog/posts`)

      const response = await fetch(`${API_BASE_URL}/api/blog/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      })
      
      console.log(`[${requestId}] Respuesta recibida - Status: ${response.status}, StatusText: ${response.statusText}`)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log(`[${requestId}] Datos de respuesta:`, data)
      return data
    } catch (error) {
      console.error(`[${requestId}] Error creating blog post:`, error)
      
      // Simulación para desarrollo local
      if (error.message.includes('fetch')) {
        console.log(`[${requestId}] Usando fallback para desarrollo local`)
        return this.createPostFallback(postData)
      }
      
      throw error
    } finally {
      // Limpiar el request activo
      activeRequests.delete(contentHash)
      console.log(`[${requestId}] Request limpiado del mapa de activos`)
    }
  }

  /**
   * Guarda un post como borrador
   * @param {Object} postData - Datos del borrador
   * @returns {Promise<Object>} Respuesta de la API
   */
  async saveDraft(postData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/drafts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error saving draft:', error)
      
      // Simulación para desarrollo local
      if (error.message.includes('fetch')) {
        return this.saveDraftFallback(postData)
      }
      
      throw error
    }
  }

  /**
   * Actualiza un post existente
   * @param {string} id - ID del post
   * @param {Object} postData - Datos actualizados
   * @returns {Promise<Object>} Respuesta de la API
   */
  async updatePost(id, postData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error updating blog post:', error)
      throw error
    }
  }

  /**
   * Elimina un post del blog
   * @param {string} id - ID del post
   * @returns {Promise<Object>} Respuesta de la API
   */
  async deletePost(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/posts/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error deleting blog post:', error)
      throw error
    }
  }

  /**
   * Sube una imagen para el blog
   * @param {File} file - Archivo de imagen
   * @param {string} title - Título opcional de la imagen
   * @param {string} description - Descripción opcional de la imagen
   * @returns {Promise<Object>} Datos de la imagen subida
   */
  async uploadImage(file, title = '', description = '') {
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      if (title) {
        formData.append('title', title)
      }
      
      if (description) {
        formData.append('description', description)
      }

      const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error uploading image:', error)
      
      // Simulación para desarrollo local
      if (error.message.includes('fetch')) {
        return this.uploadImageFallback(file, title, description)
      }
      
      throw error
    }
  }

  // Métodos auxiliares para el fallback con datos de ejemplo
  getFallbackPostBySlug(slug) {
    const posts = {
      "5-errores-digitalizacion-procesos": {
        id: 1,
        slug: "5-errores-digitalizacion-procesos",
        title: "5 Errores Comunes en la Digitalización de Procesos Empresariales",
        excerpt: "Descubre los errores más frecuentes que cometen las empresas al digitalizar sus procesos y cómo evitarlos.",
        featuredImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        content: `
          <h2>Introducción</h2>
          <p>La digitalización de procesos empresariales se ha convertido en una <strong>necesidad fundamental</strong> para mantener la competitividad en el mercado actual. Sin embargo, muchas organizaciones cometen errores que pueden ser costosos y contraproducentes.</p>
          
          <blockquote>
            <p>La transformación digital no es solo sobre tecnología, es sobre reimaginar completamente cómo operamos como organización.</p>
            <cite>- Experto en Transformación Digital</cite>
          </blockquote>

          <h2>Los 5 Errores Más Comunes</h2>
          
          <h3>1. Falta de Planificación Estratégica</h3>
          <p>Uno de los errores más graves es comenzar la digitalización sin una <em>estrategia clara</em>. Las empresas necesitan:</p>
          
          <ul>
            <li>Definir objetivos específicos y medibles</li>
            <li>Identificar los procesos críticos para el negocio</li>
            <li>Establecer un cronograma realista</li>
            <li>Asignar recursos adecuados</li>
          </ul>

          <h3>2. Resistencia al Cambio</h3>
          <p>La resistencia del personal es un obstáculo significativo. Para superarla, es esencial:</p>
          
          <ol>
            <li>Comunicar claramente los beneficios del cambio</li>
            <li>Involucrar a los empleados en el proceso de toma de decisiones</li>
            <li>Proporcionar capacitación adecuada</li>
            <li>Reconocer y recompensar la adopción temprana</li>
          </ol>

          <h3>3. Selección Inadecuada de Tecnología</h3>
          <p>Elegir la tecnología incorrecta puede ser devastador. Considera estos factores:</p>
          
          <table>
            <thead>
              <tr>
                <th>Factor</th>
                <th>Importancia</th>
                <th>Impacto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Escalabilidad</td>
                <td>Alta</td>
                <td>Crecimiento futuro</td>
              </tr>
              <tr>
                <td>Integración</td>
                <td>Alta</td>
                <td>Sistemas existentes</td>
              </tr>
              <tr>
                <td>Facilidad de uso</td>
                <td>Media</td>
                <td>Adopción del usuario</td>
              </tr>
              <tr>
                <td>Costo total</td>
                <td>Alta</td>
                <td>ROI a largo plazo</td>
              </tr>
            </tbody>
          </table>

          <h3>4. Negligencia en la Seguridad</h3>
          <p>La seguridad debe ser una prioridad desde el inicio. Implementa estas medidas:</p>
          
          <div class="callout-warning">
            <p><strong>⚠️ Advertencia:</strong> La falta de seguridad adecuada puede exponer datos sensibles y comprometer la confianza del cliente.</p>
          </div>

          <ul>
            <li>Auditorías regulares de seguridad</li>
            <li>Cifrado de datos sensibles</li>
            <li>Control de acceso basado en roles</li>
            <li>Copias de seguridad automáticas</li>
          </ul>

          <h3>5. Falta de Medición y Seguimiento</h3>
          <p>Sin métricas claras, es imposible evaluar el éxito. Establece <code>KPIs</code> específicos:</p>

          <pre><code>// Ejemplo de métricas clave
const kpis = {
  eficiencia: "Tiempo de procesamiento reducido en 40%",
  calidad: "Errores disminuidos en 60%",
  satisfaccion: "Net Promoter Score > 70",
  roi: "Retorno de inversión en 18 meses"
};</code></pre>

          <div class="callout-success">
            <p><strong>✅ Consejo:</strong> Revisa tus métricas mensualmente y ajusta la estrategia según sea necesario.</p>
          </div>

          <h2>Mejores Prácticas para Evitar Estos Errores</h2>
          
          <h3>Enfoque Gradual</h3>
          <p>Implementa la digitalización de manera <mark>gradual y sistemática</mark>:</p>
          
          <ol>
            <li><strong>Fase 1:</strong> Procesos simples y de bajo riesgo</li>
            <li><strong>Fase 2:</strong> Procesos de importancia media</li>
            <li><strong>Fase 3:</strong> Procesos críticos y complejos</li>
          </ol>

          <h3>Colaboración Interdisciplinaria</h3>
          <p>Forma equipos multidisciplinarios que incluyan:</p>
          <ul>
            <li>Expertos en tecnología</li>
            <li>Especialistas en procesos</li>
            <li>Representantes de usuarios finales</li>
            <li>Gestores de cambio</li>
          </ul>

          <hr>

          <h2>Conclusión</h2>
          <p>La digitalización exitosa requiere planificación cuidadosa, selección tecnológica adecuada y gestión efectiva del cambio. Evitar estos errores comunes puede marcar la diferencia entre el éxito y el fracaso en tu proyecto de transformación digital.</p>

          <div class="callout-info">
            <p><strong>💡 ¿Necesitas ayuda?</strong> En GoGestia, ayudamos a las empresas a navegar exitosamente su proceso de digitalización. <a href="/contacto">Contáctanos</a> para una consulta personalizada.</p>
          </div>
        `,
        category: {
          id: 1,
          name: "Digitalización",
          slug: "digitalizacion"
        },
        tags: ["Procesos", "Digitalización", "Errores", "Estrategia"],
        author: {
          name: "Equipo GoGestia",
          bio: "Especialistas en transformación digital y automatización de procesos empresariales",
          avatar: null
        },
        publishedAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
        readTime: 8,
        views: 245,
        seo: {
          metaTitle: "5 Errores Comunes en la Digitalización de Procesos | GoGestia",
          metaDescription: "Descubre los errores más frecuentes que cometen las empresas al digitalizar sus procesos y cómo evitarlos. Guía completa con mejores prácticas.",
          keywords: ["digitalización", "procesos empresariales", "transformación digital", "errores comunes", "automatización"]
        }
      },
      "automatizacion-ia-guia": {
        id: 2,
        slug: "automatizacion-ia-guia",
        title: "Automatización con IA: ¿Por Dónde Empezar?",
        excerpt: "Una guía práctica para empresas que quieren dar sus primeros pasos en la automatización con inteligencia artificial.",
        featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        content: `
          <h2>¿Qué es la Automatización con IA?</h2>
          <p>La automatización con inteligencia artificial representa el siguiente nivel en la evolución de los procesos empresariales...</p>
          
          <h3>Beneficios Principales</h3>
          <ul>
            <li>Reducción de errores humanos</li>
            <li>Aumento de la eficiencia operativa</li>
            <li>Disponibilidad 24/7</li>
            <li>Análisis predictivo avanzado</li>
          </ul>
        `,
        category: {
          id: 2,
          name: "Automatización",
          slug: "automatizacion"
        },
        tags: ["IA", "Automatización", "Guía", "Tecnología"],
        author: {
          name: "Equipo GoGestia",
          bio: "Especialistas en transformación digital y automatización de procesos empresariales",
          avatar: null
        },
        publishedAt: "2024-01-08T10:00:00Z",
        updatedAt: "2024-01-08T10:00:00Z",
        readTime: 12,
        views: 189,
        seo: {
          metaTitle: "Automatización con IA: Guía para Principiantes | GoGestia",
          metaDescription: "Aprende cómo empezar con la automatización usando inteligencia artificial. Guía práctica para empresas.",
          keywords: ["automatización", "inteligencia artificial", "IA", "procesos", "tecnología"]
        }
      }
    }

    return posts[slug] || null
  }
  getFallbackPosts() {
    return {
      success: true,
      data: {
        posts: [
          {
            id: 1,
            slug: "5-errores-digitalizacion-procesos",
            title: "5 Errores Comunes en la Digitalización de Procesos Empresariales",
            excerpt: "Descubre los errores más frecuentes que cometen las empresas al digitalizar sus procesos y cómo evitarlos.",
            featuredImage: null,
            category: {
              id: 1,
              name: "Digitalización",
              slug: "digitalizacion"
            },
            tags: ["Procesos", "Digitalización", "Errores"],
            author: {
              name: "GoGestia Team",
              avatar: null
            },
            publishedAt: "2024-01-15T10:00:00Z",
            readTime: 8,
            views: 245
          },
          {
            id: 2,
            slug: "automatizacion-ia-guia",
            title: "Automatización con IA: ¿Por Dónde Empezar?",
            excerpt: "Una guía práctica para empresas que quieren dar sus primeros pasos en la automatización con inteligencia artificial.",
            featuredImage: null,
            category: {
              id: 2,
              name: "Automatización",
              slug: "automatizacion"
            },
            tags: ["IA", "Automatización", "Guía"],
            author: {
              name: "GoGestia Team",
              avatar: null
            },
            publishedAt: "2024-01-08T10:00:00Z",
            readTime: 12,
            views: 189
          },
          {
            id: 3,
            slug: "roi-automatizacion-casos-exito",
            title: "ROI de la Automatización: Casos de Éxito Reales",
            excerpt: "Análisis de casos reales donde la automatización ha generado un retorno de inversión significativo.",
            featuredImage: null,
            category: {
              id: 3,
              name: "Casos de Éxito",
              slug: "casos-exito"
            },
            tags: ["ROI", "Casos", "Resultados"],
            author: {
              name: "GoGestia Team",
              avatar: null
            },
            publishedAt: "2024-01-01T10:00:00Z",
            readTime: 10,
            views: 312
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 3,
          totalPages: 1
        }
      }
    }
  }

  getFallbackCategories() {
    return {
      success: true,
      data: [
        { id: 1, name: "Digitalización", slug: "digitalizacion", count: 2 },
        { id: 2, name: "Automatización", slug: "automatizacion", count: 2 },
        { id: 3, name: "Casos de Éxito", slug: "casos-exito", count: 1 },
        { id: 4, name: "Integración", slug: "integracion", count: 1 }
      ]
    }
  }

  // Métodos fallback para desarrollo local
  createPostFallback(postData) {
    // Simular la creación exitosa de un post
    const newPost = {
      id: Date.now(),
      ...postData,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    console.log('Post creado localmente (fallback):', newPost)
    
    return {
      success: true,
      data: newPost,
      message: 'Post creado exitosamente (modo desarrollo)'
    }
  }

  saveDraftFallback(postData) {
    // Simular el guardado exitoso de un borrador
    const draft = {
      id: Date.now(),
      ...postData,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    console.log('Borrador guardado localmente (fallback):', draft)
    
    return {
      success: true,
      data: draft,
      message: 'Borrador guardado exitosamente (modo desarrollo)'
    }
  }

  uploadImageFallback(file, title = '', description = '') {
    // Simular la subida exitosa de una imagen con la nueva estructura
    const imageData = {
      id: `fallback_${Date.now()}`,
      url: `https://images.unsplash.com/photo-${Date.now()}?w=1200&h=800&fit=crop`,
      deleteHash: `delete_${Date.now()}`,
      title: title || file.name.split('.')[0],
      description: description || `Imagen subida: ${file.name}`,
      width: 1200,
      height: 800,
      size: file.size,
      type: file.type,
      views: 0,
      bandwidth: 0
    }
    
    console.log('Imagen subida localmente (fallback):', {
      filename: file.name,
      size: file.size,
      data: imageData
    })
    
    return {
      success: true,
      data: imageData,
      message: 'Imagen subida exitosamente (modo desarrollo)'
    }
  }

  createCategoryFallback(categoryName) {
    // Simular la creación exitosa de una categoría
    const newCategory = {
      id: Date.now(),
      name: categoryName,
      slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
      count: 0
    }

    console.log('Categoría creada localmente (fallback):', newCategory)
    
    return {
      success: true,
      data: newCategory,
      message: 'Categoría creada exitosamente (modo desarrollo)'
    }
  }
}

export default new BlogService()
