import Card from './Card'
import Button from './Button'

const RelatedPosts = ({ posts, title = "Artículos relacionados" }) => {
  if (!posts || posts.length === 0) {
    return null
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-brand-dark-green mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id}>
            {post.featuredImage && (
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            
            <Card.Header>
              <div className="flex items-center mb-3">
                <span className="inline-block bg-brand-lime text-brand-dark-green text-xs font-semibold px-2 py-1 rounded-full">
                  {post.category?.name || post.category}
                </span>
              </div>
              <Card.Title className="text-lg line-clamp-2">{post.title}</Card.Title>
              <Card.Description className="line-clamp-3">{post.excerpt}</Card.Description>
            </Card.Header>
            
            <Card.Footer>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">
                  {formatDate(post.publishedAt || post.date)}
                </span>
                <span className="text-sm text-gray-500">{post.readTime} min</span>
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <Button 
                to={`/blog/${post.slug}`} 
                variant="outline" 
                size="sm" 
                className="w-full"
              >
                Leer artículo
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default RelatedPosts
