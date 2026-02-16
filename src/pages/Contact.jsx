import React from 'react'
import { Link } from 'react-router-dom'
import useContactForm from '../hooks/useContactForm'
import contactConfig from '../config/contact'
import SEOHead from '../components/SEOHead'

/**
 * Página de contacto — split layout
 */
const Contact = () => {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useContactForm()

  return (
    <>
      <SEOHead
        title="Contacto - GoGestia"
        description="Solicita tu diagnóstico gratuito. Analizamos tus procesos y te proponemos soluciones personalizadas."
        url="/contacto"
      />

      <main className="min-h-screen pt-20 flex items-stretch">
        {/* ─── Left Panel ─── */}
        <div className="hidden lg:flex lg:w-5/12 bg-agency-dark relative overflow-hidden flex-col justify-between p-12 xl:p-20 text-white">
          {/* Decorative blurs */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-primary/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="relative z-10 space-y-8 mt-10">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold tracking-wider uppercase">
              Expertos en Automatización
            </span>

            <h1 className="text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
              ¿Listo para escalar<br /> con <span className="text-primary">IA?</span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Deja de perder tiempo en tareas manuales. Rellena el formulario para un diagnóstico gratuito de tus flujos de trabajo. Ayudamos a empresas a ahorrar más de 20 horas semanales con automatización a medida.
            </p>

            {/* Contact details */}
            <div className="pt-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
                Contacto directo
              </h3>
              <div className="space-y-6">
                <a href={`mailto:${contactConfig.email}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-primary group-hover:text-agency-dark transition-colors duration-300">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Escríbenos</p>
                    <p className="font-semibold text-lg group-hover:text-primary transition-colors">{contactConfig.email}</p>
                  </div>
                </a>

                <a href={`tel:${contactConfig.phone}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-primary group-hover:text-agency-dark transition-colors duration-300">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Llámanos</p>
                    <p className="font-semibold text-lg group-hover:text-primary transition-colors">{contactConfig.phoneDisplay}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Trusted by */}
          {/*
          <div className="relative z-10 pt-12">
            <p className="text-sm text-gray-500 mb-4">Empresas que confían en nosotros</p>
            <div className="flex gap-6 opacity-60 grayscale">
              <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-xs font-bold tracking-widest">NEXUS</div>
              <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-xs font-bold tracking-widest">ORBIT</div>
              <div className="h-8 w-24 bg-white/20 rounded flex items-center justify-center text-xs font-bold tracking-widest">LAYER</div>
            </div>
          </div>
          */}
        </div>

        {/* ─── Right Panel: Form ─── */}
        <div className="w-full lg:w-7/12 bg-background-light flex flex-col justify-center p-6 sm:p-12 lg:p-20 overflow-y-auto">
          <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-gray-200/50 border border-gray-100">

            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Solicita tu Diagnóstico</h2>
              <p className="text-gray-500">Cuéntanos tus retos. Te preparamos una hoja de ruta en 24 horas.</p>
            </div>

            {/* Error general */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Position */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1" htmlFor="name">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-3.5 text-gray-400 text-xl group-focus-within:text-primary transition-colors">person</span>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="Tu nombre y apellidos"
                      className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-800 placeholder-gray-400 ${errors.name ? 'border-red-300' : 'border-gray-200'}`}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-600 ml-1">{errors.name}</p>}
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1" htmlFor="position">
                    Cargo / Empresa
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-3.5 text-gray-400 text-xl group-focus-within:text-primary transition-colors">work</span>
                    <input
                      id="position"
                      name="position"
                      type="text"
                      value={formData.position}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="Director en TuEmpresa"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1" htmlFor="email">
                    Email profesional <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-3.5 text-gray-400 text-xl group-focus-within:text-primary transition-colors">mail</span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="tu@empresa.com"
                      className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-800 placeholder-gray-400 ${errors.email ? 'border-red-300' : 'border-gray-200'}`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600 ml-1">{errors.email}</p>}
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1" htmlFor="phone">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-3.5 text-gray-400 text-xl group-focus-within:text-primary transition-colors">call</span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="+34 600 000 000"
                      className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-800 placeholder-gray-400 ${errors.phone ? 'border-red-300' : 'border-gray-200'}`}
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600 ml-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Company */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1" htmlFor="company">
                  Nombre de la empresa <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-3.5 text-gray-400 text-xl group-focus-within:text-primary transition-colors">apartment</span>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Nombre de tu empresa"
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-800 placeholder-gray-400 ${errors.company ? 'border-red-300' : 'border-gray-200'}`}
                  />
                </div>
                {errors.company && <p className="mt-1 text-sm text-red-600 ml-1">{errors.company}</p>}
              </div>

              {/* Message */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1" htmlFor="message">
                  ¿Cómo podemos ayudarte? <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-4 text-gray-400 text-xl group-focus-within:text-primary transition-colors">edit_note</span>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Describe tus procesos manuales o tus objetivos de automatización..."
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-800 placeholder-gray-400 resize-none ${errors.message ? 'border-red-300' : 'border-gray-200'}`}
                  />
                </div>
                {errors.message && <p className="mt-1 text-sm text-red-600 ml-1">{errors.message}</p>}
              </div>

              {/* Privacy */}
              <div className="flex items-start pt-2">
                <div className="flex items-center h-5">
                  <input
                    id="acceptPrivacy"
                    name="acceptPrivacy"
                    type="checkbox"
                    checked={formData.acceptPrivacy}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary bg-gray-50"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-medium text-gray-700" htmlFor="acceptPrivacy">
                    He leído y acepto la{' '}
                    <Link to={contactConfig.legal.privacy} className="text-agency-dark hover:text-agency-dark/70 underline decoration-agency-dark/30 underline-offset-2">
                      política de privacidad
                    </Link>
                    {' '}y el{' '}
                    <Link to={contactConfig.legal.terms} className="text-agency-dark hover:text-agency-dark/70 underline decoration-agency-dark/30 underline-offset-2">
                      aviso legal
                    </Link>
                  </label>
                </div>
              </div>
              {errors.acceptPrivacy && <p className="text-sm text-red-600 ml-1">{errors.acceptPrivacy}</p>}

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-agency-dark bg-primary hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span>{isSubmitting ? 'Enviando...' : 'Solicitar Diagnóstico'}</span>
                  {!isSubmitting && <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>}
                </button>
              </div>
            </form>
          </div>

          {/* Mobile footer info */}
          <div className="mt-12 text-center lg:hidden space-y-2">
            <p className="text-gray-500 text-sm">
              O escríbenos directamente a{' '}
              <a href={`mailto:${contactConfig.email}`} className="text-primary font-semibold">{contactConfig.email}</a>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default Contact
