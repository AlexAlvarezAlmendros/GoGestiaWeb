/**
 * Configuración de metadatos SEO para toda la aplicación
 * Se puede usar para generar metadatos dinámicos por página
 */

export const seoConfig = {
  // Configuración por defecto
  default: {
    title: "GoGestia - Consultoría en Automatización y Gestión Empresarial",
    description: "Transformamos tu empresa con soluciones de automatización, gestión de procesos y herramientas digitales. Consultoría especializada para optimizar tu negocio y aumentar la productividad.",
    keywords: "automatización empresarial, gestión de procesos, consultoría digital, optimización de negocio, herramientas digitales, productividad empresarial, transformación digital",
    image: "/og-image.jpg",
    url: "https://gogestia.com/",
    type: "website"
  },
  
  // Configuración por páginas
  pages: {
    home: {
      title: "GoGestia - Consultoría en Automatización y Gestión Empresarial",
      description: "Transformamos tu empresa con soluciones de automatización, gestión de procesos y herramientas digitales. Diagnóstico gratuito sin compromiso.",
      url: "https://gogestia.com/",
      image: "/logo-og.png"
    },
    
    services: {
      title: "Servicios de Automatización Empresarial | GoGestia",
      description: "Descubre nuestros servicios de automatización de procesos, gestión digital y consultoría empresarial. Soluciones personalizadas para tu negocio.",
      url: "https://gogestia.com/servicios",
      image: "/logo-og.png",
      keywords: "servicios automatización, consultoría procesos, gestión digital, optimización empresarial"
    },
    
    contact: {
      title: "Contacto - Solicita tu Diagnóstico Gratuito | GoGestia",
      description: "Contacta con nosotros para solicitar tu diagnóstico empresarial gratuito. Te ayudamos a identificar oportunidades de mejora sin compromiso.",
      url: "https://gogestia.com/contacto",
      image: "/logo-og.png",
      keywords: "contacto GoGestia, diagnóstico gratuito, consultoría empresarial"
    },
    
    blog: {
      title: "Blog de Automatización Empresarial | GoGestia",
      description: "Artículos y recursos sobre automatización, gestión de procesos y transformación digital para empresas. Consejos prácticos de nuestros expertos.",
      url: "https://gogestia.com/blog",
      image: "/logo-og.png",
      keywords: "blog automatización, artículos gestión empresarial, recursos transformación digital"
    },
    
    thanks: {
      title: "Gracias por tu Solicitud | GoGestia",
      description: "Hemos recibido tu solicitud de diagnóstico. Nos pondremos en contacto contigo en las próximas 24 horas para programar tu consulta.",
      url: "https://gogestia.com/gracias",
      image: "/logo-og.png"
    }
  },
  
  // Configuración de la empresa
  business: {
    name: "GoGestia",
    legalName: "GoGestia Consultoría S.L.",
    phone: "+34 656 852 437",
    email: "contacto@gogestia.com",
    address: {
      country: "ES",
      region: "España"
    },
    social: {
      linkedin: "https://linkedin.com/company/gogestia",
      twitter: "https://twitter.com/gogestia"
    },
    logo: "/GoGestiaLogo.svg",
    colors: {
      primary: "#2d5530",
      secondary: "#8fbc8f"
    }
  },
  
  // Configuración de imágenes para redes sociales
  images: {
    sizes: {
      og: { width: 1200, height: 630 },
      twitter: { width: 1200, height: 600 },
      linkedin: { width: 1200, height: 627 }
    },
    fallback: "/logo-og.png"
  }
}

/**
 * Genera metadatos para una página específica
 */
export const generatePageMeta = (pageKey, customData = {}) => {
  const defaultMeta = seoConfig.default
  const pageMeta = seoConfig.pages[pageKey] || {}
  
  return {
    ...defaultMeta,
    ...pageMeta,
    ...customData
  }
}

/**
 * Genera structured data para una página específica
 */
export const generateStructuredData = (pageKey, customData = {}) => {
  const pageMeta = generatePageMeta(pageKey, customData)
  const business = seoConfig.business
  
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": business.name,
    "description": pageMeta.description,
    "url": pageMeta.url,
    "logo": `https://gogestia.com${business.logo}`,
    "image": `https://gogestia.com${pageMeta.image}`,
    "telephone": business.phone,
    "email": business.email,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": business.address.country,
      "addressRegion": business.address.region
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": business.phone,
      "contactType": "customer service",
      "availableLanguage": "Spanish",
      "email": business.email
    },
    "sameAs": Object.values(business.social)
  }
  
  return {
    ...baseStructure,
    ...customData
  }
}

export default seoConfig
