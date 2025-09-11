import { } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import SEOHead from '../components/SEOHead'
import useBlogPosts from '../hooks/useBlogPosts'
import useBlogCategories from '../hooks/useBlogCategories'
import useNewsletter from '../hooks/useNewsletter'
import useUrlFilters from '../hooks/useUrlFilters'
import { useAuth } from '../hooks/useAuth'
import { formatDate, formatReadTime } from '../utils/blogUtils'

const Blog = () => {
  const { filters, hasActiveFilters, activeFilters, handleSearchSubmit, setCategory, setPage } = useUrlFilters()
  const { featuredPosts, recentPosts, loading, error, pagination } = useBlogPosts(filters)
  const { categories } = useBlogCategories(true)
  const newsletter = useNewsletter()

  const handleCategoryChange = (categorySlug) => {
    setCategory(categorySlug)
  }

  const handlePageChange = (page) => {
    setPage(page)
  }

  const clearAllFilters = () => {
    activeFilters.forEach(filter => filter.onRemove())
  }

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  return (
    <>
      <SEOHead
        title="Blog y Recursos - GoGestia"
        description="Artículos, guías y casos de éxito sobre automatización, digitalización y optimización de procesos empresariales."
        url="/blog"
        type="website"
      />
      
      <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogHeader />
        
        <SearchAndFilters
          onSearchSubmit={handleSearchSubmit}
          currentSearch={filters.search}
          currentCategory={filters.category}
          categories={categories}
          onCategoryChange={handleCategoryChange}
          hasActiveFilters={hasActiveFilters}
          activeFilters={activeFilters}
          onClearAllFilters={clearAllFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <MainContent
            featuredPosts={featuredPosts}
            recentPosts={recentPosts}
            hasActiveFilters={hasActiveFilters}
            pagination={pagination}
            currentPage={filters.page}
            onPageChange={handlePageChange}
            onClearAllFilters={clearAllFilters}
          />

          <Sidebar
            newsletter={newsletter}
            categories={categories}
            currentCategory={filters.category}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        
      </div>
    </div>
    </>
  )
}

// Componentes separados para mejor organización
const BlogHeader = () => {
  const { isAuthenticated } = useAuth()
  
  return (
    <div className="text-center mb-16">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1"></div>
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog y Recursos</h1>
        </div>
        <div className="flex-1 flex justify-end">
          {isAuthenticated && (
            <Button 
              to="/blog/crear" 
              variant="primary"
              className="hidden md:inline-flex"
            >
              + Crear Post
            </Button>
          )}
        </div>
      </div>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Artículos, guías y casos de éxito sobre automatización, digitalización y 
        optimización de procesos empresariales.
      </p>
      
      {/* Botón móvil */}
      {isAuthenticated && (
        <div className="mt-6 md:hidden">
          <Button 
            to="/blog/crear" 
            variant="primary"
            size="sm"
          >
            + Crear Nuevo Post
          </Button>
        </div>
      )}
    </div>
  )
}

const LoadingState = () => (
  <div className="min-h-screen py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-dark-green"></div>
      <p className="mt-4 text-gray-600">Cargando artículos...</p>
    </div>
  </div>
)

const ErrorState = ({ error }) => (
  <div className="min-h-screen py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar el contenido</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <Button onClick={() => window.location.reload()}>
        Reintentar
      </Button>
    </div>
  </div>
)

const SearchAndFilters = ({
  onSearchSubmit,
  currentSearch,
  currentCategory,
  categories,
  onCategoryChange,
  hasActiveFilters,
  activeFilters,
  onClearAllFilters
}) => (
  <div className="mb-12">
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      {/* Búsqueda */}
      <form onSubmit={onSearchSubmit} className="flex-1">
        <div className="relative">
          <input
            type="text"
            name="search"
            placeholder="Buscar artículos..."
            defaultValue={currentSearch}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-dark-green focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
        </div>
      </form>

      {/* Filtro por categoría */}
      <select
        value={currentCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-dark-green focus:border-transparent min-w-[200px]"
      >
        {categories.map((category) => (
          <option key={category.slug || 'all'} value={category.slug || ''}>
            {category.name} ({category.count})
          </option>
        ))}
      </select>
    </div>

    {/* Filtros activos */}
    {hasActiveFilters && (
      <ActiveFilters 
        activeFilters={activeFilters}
        onClearAll={onClearAllFilters}
      />
    )}
  </div>
)

const ActiveFilters = ({ activeFilters, onClearAll }) => (
  <div className="flex items-center gap-2 mb-6">
    <span className="text-sm text-gray-600">Filtros activos:</span>
    {activeFilters.map((filter) => (
      <span 
        key={filter.type}
        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand-lime text-brand-dark-green"
      >
        {filter.label}
        <button
          onClick={filter.onRemove}
          className="ml-2 text-brand-dark-green hover:text-red-600"
          aria-label="Eliminar filtro"
        >
          ×
        </button>
      </span>
    ))}
    <Button
      onClick={onClearAll}
      variant="ghost"
      size="sm"
      className="text-sm"
    >
      Limpiar todos
    </Button>
  </div>
)

const MainContent = ({
  featuredPosts,
  recentPosts,
  hasActiveFilters,
  pagination,
  currentPage,
  onPageChange,
  onClearAllFilters
}) => (
  <div className="lg:col-span-3">
    {/* Artículos destacados */}
    {featuredPosts.length > 0 && !hasActiveFilters && (
      <FeaturedPostsSection posts={featuredPosts} />
    )}

    {/* Artículos recientes/resultados */}
    <RecentPostsSection
      posts={recentPosts}
      hasActiveFilters={hasActiveFilters}
      onClearAllFilters={onClearAllFilters}
    />

    {/* Paginación */}
    {pagination && pagination.totalPages > 1 && (
      <Pagination
        pagination={pagination}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    )}
  </div>
)

const FeaturedPostsSection = ({ posts }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold text-brand-dark-green mb-8">Artículos Destacados</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
      {posts.map((post) => (
        <FeaturedPostCard key={post.id} post={post} />
      ))}
    </div>
  </section>
)

const FeaturedPostCard = ({ post }) => (
  <Card className="flex flex-col md:flex-row md:items-center">
    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
      {post.featuredImage ? (
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-24 h-24 object-cover rounded-lg"
        />
      ) : (
        <div className="w-24 h-24 bg-brand-lime rounded-lg flex items-center justify-center text-4xl">
          📄
        </div>
      )}
    </div>
    
    <div className="flex-1">
      <PostMeta
        category={post.category?.name || post.category}
        publishedAt={post.publishedAt || post.date}
        readTime={post.readTime}
      />
      
      <h3 className="text-xl font-bold text-brand-dark-green mb-2">
        {post.title}
      </h3>
      
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      
      <div className="flex items-center justify-between">
        <PostTags tags={post.tags} />
        <Button 
          to={`/blog/${post.slug}`} 
          variant="ghost" 
          size="sm"
        >
          Leer más →
        </Button>
      </div>
    </div>
  </Card>
)

const RecentPostsSection = ({ posts, hasActiveFilters, onClearAllFilters }) => (
  <section>
    <h2 className="text-2xl font-bold text-brand-dark-green mb-8">
      {hasActiveFilters ? 'Resultados' : 'Artículos Recientes'}
    </h2>
    
    {posts.length === 0 ? (
      <EmptyState 
        hasActiveFilters={hasActiveFilters}
        onClearAllFilters={onClearAllFilters}
      />
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    )}
  </section>
)

const PostCard = ({ post }) => (
  <Card>
    <Card.Header>
      <PostMeta
        category={post.category?.name || post.category}
        publishedAt={post.publishedAt || post.date}
        className="mb-3"
      />
      <Card.Title className="mb-2">{post.title}</Card.Title>
      <Card.Description>{post.excerpt}</Card.Description>
    </Card.Header>
    
    <Card.Footer>
      <div className="flex items-center justify-between">
        <PostTags tags={post.tags?.slice(0, 2)} />
        <span className="text-sm text-gray-500">{formatReadTime(post.readTime)}</span>
      </div>
      <Button 
        to={`/blog/${post.slug}`} 
        variant="outline" 
        size="sm" 
        className="w-full mt-3"
      >
        Leer artículo
      </Button>
    </Card.Footer>
  </Card>
)

const PostMeta = ({ category, publishedAt, readTime, className = "" }) => (
  <div className={`flex items-center ${className}`}>
    <span className="inline-block bg-brand-lime text-brand-dark-green text-xs font-semibold px-2 py-1 rounded-full mr-2">
      {category}
    </span>
    <span className="text-sm text-gray-500">
      {formatDate(publishedAt)}
      {readTime && ` • ${formatReadTime(readTime)}`}
    </span>
  </div>
)

const PostTags = ({ tags }) => (
  <div className="flex flex-wrap gap-1">
    {tags?.map((tag) => (
      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
        {tag}
      </span>
    ))}
  </div>
)

const EmptyState = ({ hasActiveFilters, onClearAllFilters }) => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">📝</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron artículos</h3>
    <p className="text-gray-600 mb-6">
      {hasActiveFilters 
        ? 'Intenta ajustar tus filtros de búsqueda' 
        : 'Aún no hay artículos disponibles'
      }
    </p>
    {hasActiveFilters && (
      <Button 
        onClick={onClearAllFilters}
        variant="outline"
      >
        Limpiar filtros
      </Button>
    )}
  </div>
)

const Pagination = ({ pagination, currentPage, onPageChange }) => (
  <div className="mt-12 flex justify-center">
    <div className="flex items-center space-x-2">
      <Button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
      >
        ← Anterior
      </Button>
      
      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant={page === currentPage ? 'default' : 'outline'}
          size="sm"
          className="min-w-[40px]"
        >
          {page}
        </Button>
      ))}
      
      <Button
        onClick={() => onPageChange(Math.min(pagination.totalPages, currentPage + 1))}
        disabled={currentPage === pagination.totalPages}
        variant="outline"
        size="sm"
      >
        Siguiente →
      </Button>
    </div>
  </div>
)

const Sidebar = ({ newsletter, categories, currentCategory, onCategoryChange }) => (
  <div className="lg:col-span-1">
    <div className="space-y-6">
      <NewsletterCard newsletter={newsletter} />
      <CategoriesCard 
        categories={categories}
        currentCategory={currentCategory}
        onCategoryChange={onCategoryChange}
      />
      <UsefulLinksCard />
      <CTACard />
    </div>
  </div>
)

const NewsletterCard = ({ newsletter }) => (
  <Card>
    <Card.Header>
      <Card.Title>📧 Newsletter</Card.Title>
      <Card.Description>
        Recibe nuestros mejores artículos y consejos directamente en tu email
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <form onSubmit={newsletter.handleSubmit} className="space-y-3">
        <input
          type="email"
          value={newsletter.email}
          onChange={newsletter.handleEmailChange}
          placeholder="tu@email.com"
          className="input-field text-sm"
          required
        />
        <Button 
          type="submit" 
          size="sm" 
          className="w-full"
          disabled={newsletter.isLoading}
        >
          {newsletter.isLoading ? 'Suscribiendo...' : 'Suscribirse'}
        </Button>
        {newsletter.isSuccess && (
          <p className="text-sm text-green-600">{newsletter.message}</p>
        )}
        {newsletter.isError && (
          <p className="text-sm text-red-600">{newsletter.message}</p>
        )}
      </form>
    </Card.Content>
  </Card>
)

const CategoriesCard = ({ categories, currentCategory, onCategoryChange }) => (
  <Card>
    <Card.Header>
      <Card.Title>Categorías</Card.Title>
    </Card.Header>
    <Card.Content>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.slug || 'all'}>
            <button 
              onClick={() => onCategoryChange(category.slug || '')}
              className={`flex items-center justify-between w-full text-left hover:text-brand-dark-green transition-colors ${
                currentCategory === (category.slug || '') ? 'text-brand-dark-green font-medium' : ''
              }`}
            >
              <span>{category.name}</span>
              <span className="text-sm text-gray-400">({category.count})</span>
            </button>
          </li>
        ))}
      </ul>
    </Card.Content>
  </Card>
)

const UsefulLinksCard = () => (
  <Card>
    <Card.Header>
      <Card.Title>Enlaces Útiles</Card.Title>
    </Card.Header>
    <Card.Content>
      <ul className="space-y-3">
        <li>
          <a href="/servicios" className="text-brand-dark-green hover:underline">
            → Ver nuestros servicios
          </a>
        </li>
        <li>
          <a href="/contacto" className="text-brand-dark-green hover:underline">
            → Solicitar diagnóstico
          </a>
        </li>
        <li>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-brand-dark-green hover:underline">
            → Síguenos en LinkedIn
          </a>
        </li>
      </ul>
    </Card.Content>
  </Card>
)

const CTACard = () => (
  <div className="bg-gradient-to-br from-brand-dark-green to-green-800 p-6 rounded-xl text-white">
    <h3 className="font-bold mb-2 text-white">¿Necesitas ayuda personalizada?</h3>
    <p className="text-sm mb-4 text-gray-100">
      Solicita tu diagnóstico gratuito y descubre cómo podemos ayudarte
    </p>
    <Button to="/contacto" size="sm" className="w-full">
      Solicitar diagnóstico
    </Button>
  </div>
)

const BlogCTA = () => (
  <section className="mt-16 text-center">
    <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
      <Card.Header>
        <Card.Title className="text-2xl">¿Te gustaría que escribiéramos sobre algo específico?</Card.Title>
        <Card.Description className="text-lg">
          Envíanos tus preguntas o temas de interés y crearemos contenido personalizado
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button to="/contacto">
            Enviar sugerencia
          </Button>
          <Button variant="outline" href="mailto:contacto@gogenaiweb.com">
            Contactar por email
          </Button>
        </div>
      </Card.Content>
    </Card>
  </section>
)

export default Blog
