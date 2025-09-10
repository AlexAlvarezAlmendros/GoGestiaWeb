import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import SEOHead from '../components/SEOHead'
import RelatedPosts from '../components/RelatedPosts'
import { useBlogPost } from '../hooks/useBlogPosts'
import useNewsletter from '../hooks/useNewsletter'
import useSEO from '../hooks/useSEO'
import { 
  formatDate, 
  generateTableOfContents, 
  socialShare 
} from '../utils/blogUtils'
import '../styles/blog.css'

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [tableOfContents, setTableOfContents] = useState([])
  const [shareMessage, setShareMessage] = useState('')

  const { post, relatedPosts, loading, error } = useBlogPost(slug)
  const newsletter = useNewsletter()
  const { updateSEO } = useSEO()

  // Configurar SEO cuando se carga el post
  useEffect(() => {
    if (!post) return

    updateSEO({
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      keywords: post.seo?.keywords?.join(', ') || '',
      type: 'article',
      image: post.featuredImage,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      author: post.author?.name,
      section: post.category?.name,
      tags: post.tags
    })
  }, [post, updateSEO])

  // Generar tabla de contenidos
  useEffect(() => {
    if (post?.content) {
      const toc = generateTableOfContents(post.content)
      setTableOfContents(toc)
    }
  }, [post])

  const handleShare = useCallback((platform) => {
    const shareData = {
      title: post.title,
      url: window.location.href
    }

    if (platform === 'copy') {
      socialShare.copyToClipboard(shareData.url).then(success => {
        setShareMessage(success ? 'URL copiada al portapapeles' : 'Error al copiar URL')
        setTimeout(() => setShareMessage(''), 3000)
      })
    } else {
      socialShare[platform](shareData)
    }
  }, [post])

  if (loading) {
    return <LoadingState />
  }

  if (error || !post) {
    return <ErrorState error={error} onRetry={() => navigate('/blog')} />
  }

  return (
    <>
      <SEOHead
        title={post?.seo?.metaTitle || post?.title}
        description={post?.seo?.metaDescription || post?.excerpt}
        image={post?.featuredImage}
        url={`/blog/${post?.slug}`}
        type="article"
        publishedTime={post?.publishedAt}
        modifiedTime={post?.updatedAt}
        author={post?.author?.name}
        tags={post?.tags || []}
      />
      
      <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs post={post} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <MainArticle 
            post={post}
            onShare={handleShare}
            shareMessage={shareMessage}
          />

          <Sidebar
            tableOfContents={tableOfContents}
            newsletter={newsletter}
          />
        </div>

        <RelatedPosts posts={relatedPosts} />

        <ArticleNavigation />
      </div>
    </div>
    </>
  )
}

// Componentes separados para mejor organización
const LoadingState = () => (
  <div className="min-h-screen py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded mb-8 w-3/4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
)

const ErrorState = ({ error, onRetry }) => (
  <div className="min-h-screen py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="text-6xl mb-6">📄</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
      <p className="text-gray-600 mb-8">{error || 'El artículo que buscas no existe'}</p>
      <div className="space-x-4">
        <Button onClick={onRetry}>
          Volver al blog
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reintentar
        </Button>
      </div>
    </div>
  </div>
)

const Breadcrumbs = ({ post }) => (
  <nav className="mb-8" aria-label="Breadcrumb">
    <ol className="flex items-center space-x-2 text-sm text-gray-500">
      <li>
        <Link to="/" className="hover:text-brand-dark-green">Inicio</Link>
      </li>
      <li>→</li>
      <li>
        <Link to="/blog" className="hover:text-brand-dark-green">Blog</Link>
      </li>
      <li>→</li>
      <li>
        <Link to={`/blog?category=${post.category.slug}`} className="hover:text-brand-dark-green">
          {post.category.name}
        </Link>
      </li>
      <li>→</li>
      <li className="text-gray-900 truncate max-w-xs">{post.title}</li>
    </ol>
  </nav>
)

const MainArticle = ({ post, onShare, shareMessage }) => (
  <article className="lg:col-span-3">
    <ArticleHeader post={post} onShare={onShare} shareMessage={shareMessage} />
    
    {post.featuredImage && (
      <FeaturedImage image={post.featuredImage} title={post.title} />
    )}

    <ArticleContent content={post.content} />
    
    <ArticleFooter post={post} onShare={onShare} />
  </article>
)

const ArticleHeader = ({ post, onShare, shareMessage }) => (
  <header className="mb-8">
    <CategoryAndMeta post={post} />
    
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark-green mb-4">
      {post.title}
    </h1>

    <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>

    <AuthorInfo author={post.author} />
    
    <Tags tags={post.tags} />
    
    <ShareButtons onShare={onShare} shareMessage={shareMessage} />
  </header>
)

const CategoryAndMeta = ({ post }) => (
  <div className="flex items-center mb-4">
    <span className="inline-block bg-brand-lime text-brand-dark-green text-sm font-semibold px-3 py-1 rounded-full mr-3">
      {post.category.name}
    </span>
    <span className="text-sm text-gray-500">
      {formatDate(post.publishedAt)} • {post.readTime} min lectura • {post.views} vistas
    </span>
  </div>
)

const AuthorInfo = ({ author }) => (
  <div className="flex items-center mb-6">
    {author.avatar ? (
      <img 
        src={author.avatar} 
        alt={author.name}
        className="w-12 h-12 rounded-full mr-4"
      />
    ) : (
      <div className="w-12 h-12 bg-brand-lime rounded-full flex items-center justify-center mr-4">
        <span className="text-brand-dark-green font-bold">
          {author.name.charAt(0)}
        </span>
      </div>
    )}
    <div>
      <p className="font-semibold text-brand-dark-green">{author.name}</p>
      {author.bio && (
        <p className="text-sm text-gray-600">{author.bio}</p>
      )}
    </div>
  </div>
)

const Tags = ({ tags }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {tags?.map((tag) => (
      <span key={tag} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
        #{tag}
      </span>
    ))}
  </div>
)

const ShareButtons = ({ onShare, shareMessage }) => (
  <div className="pb-6 border-b">
    <div className="flex items-center space-x-2 mb-2">
      <span className="text-sm font-medium text-gray-700 mr-2">Compartir:</span>
      <ShareButton 
        onClick={() => onShare('twitter')}
        icon="🐦"
        label="Twitter"
      />
      <ShareButton 
        onClick={() => onShare('linkedin')}
        icon="💼"
        label="LinkedIn"
      />
      <ShareButton 
        onClick={() => onShare('facebook')}
        icon="📘"
        label="Facebook"
      />
      <ShareButton 
        onClick={() => onShare('whatsapp')}
        icon="�"
        label="WhatsApp"
      />
      <ShareButton 
        onClick={() => onShare('copy')}
        icon="🔗"
        label="Copiar enlace"
      />
    </div>
    {shareMessage && (
      <p className="text-sm text-green-600">{shareMessage}</p>
    )}
  </div>
)

const ShareButton = ({ onClick, icon, label }) => (
  <button
    onClick={onClick}
    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
    title={`Compartir en ${label}`}
    aria-label={`Compartir en ${label}`}
  >
    {icon}
  </button>
)

const FeaturedImage = ({ image, title }) => (
  <div className="mb-8">
    <img 
      src={image} 
      alt={title}
      className="w-full h-64 md:h-96 object-cover rounded-lg"
    />
  </div>
)

const ArticleContent = ({ content }) => (
  <div 
    className="article-content prose prose-lg max-w-none prose-headings:text-brand-dark-green prose-headings:font-bold"
    dangerouslySetInnerHTML={{ __html: content }}
  />
)

const ArticleFooter = ({ post, onShare }) => (
  <footer className="mt-12 pt-8 border-t">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="mb-4 sm:mb-0">
        <p className="text-sm text-gray-500">
          Publicado el {formatDate(post.publishedAt)}
          {post.updatedAt !== post.publishedAt && (
            <span> • Actualizado el {formatDate(post.updatedAt)}</span>
          )}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Compartir:</span>
        <button
          onClick={() => onShare('twitter')}
          className="text-sm text-brand-dark-green hover:underline"
        >
          Twitter
        </button>
        <button
          onClick={() => onShare('linkedin')}
          className="text-sm text-brand-dark-green hover:underline"
        >
          LinkedIn
        </button>
      </div>
    </div>
  </footer>
)

const Sidebar = ({ tableOfContents, newsletter }) => (
  <aside className="lg:col-span-1">
    <div className="sticky top-24 space-y-6">
      <TableOfContents items={tableOfContents} />
      <NewsletterCard newsletter={newsletter} />
      <CTACard />
    </div>
  </aside>
)

const TableOfContents = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <Card>
      <Card.Header>
        <Card.Title>📑 Contenido</Card.Title>
      </Card.Header>
      <Card.Content>
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block hover:text-brand-dark-green transition-colors ${
                  item.level === 2 ? 'font-medium' : 
                  item.level === 3 ? 'ml-4' : 'ml-8'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </Card.Content>
    </Card>
  )
}

const NewsletterCard = ({ newsletter }) => (
  <Card>
    <Card.Header>
      <Card.Title>📧 Newsletter</Card.Title>
      <Card.Description>
        Recibe nuestros mejores artículos directamente en tu email
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

const CTACard = () => (
  <div className="bg-gradient-to-br from-brand-dark-green to-green-800 p-6 rounded-xl text-white">
    <h3 className="font-bold mb-2">¿Te gustó este artículo?</h3>
    <p className="text-sm mb-4 text-gray-100">
      Descubre cómo podemos ayudarte a implementar estas soluciones
    </p>
    <Button to="/contacto" size="sm" className="w-full bg-white text-brand-dark-green hover:bg-gray-100">
      Solicitar consulta
    </Button>
  </div>
)

const ArticleNavigation = () => (
  <div className="mt-12 pt-8 border-t">
    <div className="flex flex-col sm:flex-row justify-between">
      <Button variant="ghost" to="/blog" className="mb-4 sm:mb-0">
        ← Volver al blog
      </Button>
      <Button to="/contacto">
        ¿Necesitas ayuda? Contáctanos →
      </Button>
    </div>
  </div>
)

export default BlogPost
