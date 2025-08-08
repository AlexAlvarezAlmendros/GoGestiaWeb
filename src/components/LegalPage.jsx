const LegalPage = ({ title, children }) => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-brand-dark-green mb-8">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  )
}

export default LegalPage
