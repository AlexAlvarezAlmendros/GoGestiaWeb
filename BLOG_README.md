# Configuración del Blog

## Variables de entorno necesarias

Para que el blog funcione correctamente, necesitas configurar estas variables de entorno:

```env
# URL de la API del backend
VITE_API_URL=http://localhost:3000

# URL base del sitio (para SEO)
VITE_SITE_URL=https://gogestia.com

# Email para contacto del blog
VITE_BLOG_EMAIL=blog@gogestia.com
```

## Funcionalidades implementadas

### ✅ Frontend completado
- [x] Servicio de blog (`blogService.js`)
- [x] Página de listado de blog (`Blog.jsx`)
- [x] Página de detalle del artículo (`BlogPost.jsx`)
- [x] Rutas configuradas en `App.jsx`
- [x] SEO dinámico con hook `useSEO`
- [x] Estados de carga y error
- [x] Paginación
- [x] Búsqueda de artículos
- [x] Filtros por categoría
- [x] Compartir en redes sociales
- [x] Newsletter subscription
- [x] Artículos relacionados
- [x] Tabla de contenidos automática
- [x] Breadcrumbs
- [x] Meta tags para artículos
- [x] Structured data (JSON-LD)
- [x] Componente reutilizable `RelatedPosts`

### 📋 API requerida (backend)

El frontend está preparado para consumir estos endpoints:

```
GET /api/blog/posts
GET /api/blog/posts/:slug
GET /api/blog/posts/:slug/related
GET /api/blog/categories
POST /api/blog/posts/:slug/views
POST /api/newsletter
```

## Próximos pasos

1. **Implementar la API del backend** según la especificación definida
2. **Configurar la base de datos** con las tablas necesarias
3. **Añadir panel de administración** para gestionar artículos
4. **Implementar autenticación** para el panel admin
5. **Configurar CDN** para imágenes del blog
6. **Añadir sitemap dinámico** para SEO
7. **Implementar RSS feed**
8. **Configurar analytics** para tracking

## Estructura de archivos creados/modificados

```
src/
├── services/
│   └── blogService.js          # ✅ Servicio para API del blog
├── pages/
│   ├── Blog.jsx                # ✅ Página de listado actualizada
│   └── BlogPost.jsx            # ✅ Nueva página de detalle
├── components/
│   └── RelatedPosts.jsx        # ✅ Componente para artículos relacionados
├── hooks/
│   └── useSEO.js              # ✅ Hook SEO mejorado
└── App.jsx                     # ✅ Rutas actualizadas
```

## Características destacadas

### SEO Optimizado
- Meta tags dinámicos
- Open Graph para redes sociales
- Twitter Cards
- Structured data (JSON-LD)
- URLs canónicas

### UX/UI
- Diseño responsive
- Estados de carga
- Manejo de errores
- Paginación
- Búsqueda en tiempo real
- Filtros por categoría

### Funcionalidades del blog
- Tabla de contenidos automática
- Botones de compartir
- Newsletter integrado
- Artículos relacionados
- Contador de vistas
- Breadcrumbs

### Performance
- Lazy loading de imágenes
- Fallback para cuando la API no está disponible
- Manejo de errores graceful
- Optimización de re-renders
