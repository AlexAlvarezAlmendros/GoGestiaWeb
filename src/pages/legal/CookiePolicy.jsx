import LegalPage from '../../components/LegalPage'

const CookiePolicy = () => {
  return (
    <LegalPage title="Política de Cookies">
      <div className="space-y-6 text-gray-700">
        <p className="text-sm text-gray-500">
          Última actualización: 8 de agosto de 2024
        </p>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">1. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Las cookies se utilizan ampliamente para hacer que los sitios web funcionen, o para que funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">2. ¿Cómo utilizamos las cookies?</h2>
          <p>
            En nuestro sitio web utilizamos cookies para mejorar la experiencia del usuario y garantizar el correcto funcionamiento de la página. A continuación, detallamos los tipos de cookies que utilizamos:
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">3. Tipos de cookies que utilizamos</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-brand-dark-green mb-2">3.1. Cookies técnicas (necesarias)</h3>
              <p>
                Son aquellas que permiten al usuario la navegación a través de una página web y la utilización de las diferentes opciones o servicios que en ella existan. Son esenciales para el funcionamiento del sitio web.
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Finalidad:</strong> Permitir la navegación y funcionamiento básico del sitio</li>
                <li><strong>Duración:</strong> Sesión</li>
                <li><strong>Tipo:</strong> Primera parte (propia)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-brand-dark-green mb-2">3.2. Cookies de preferencias</h3>
              <p>
                Permiten recordar información para que el usuario acceda al servicio con determinadas características que pueden diferenciar su experiencia de la de otros usuarios.
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Finalidad:</strong> Recordar preferencias del usuario</li>
                <li><strong>Duración:</strong> Hasta 1 año</li>
                <li><strong>Tipo:</strong> Primera parte (propia)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">4. Cookies de terceros</h2>
          <p>
            Actualmente no utilizamos cookies de terceros en nuestro sitio web. En caso de implementarlas en el futuro, actualizaremos esta política e informaremos a los usuarios adecuadamente.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">5. ¿Cómo gestionar las cookies?</h2>
          <p>
            Puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador:
          </p>
          
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>
              <strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios
            </li>
            <li>
              <strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio
            </li>
            <li>
              <strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web
            </li>
            <li>
              <strong>Microsoft Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies
            </li>
          </ul>

          <p className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
            <strong>Advertencia:</strong> La desactivación de cookies técnicas puede impedir el correcto funcionamiento del sitio web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">6. Consentimiento</h2>
          <p>
            Al continuar navegando por nuestro sitio web, usted acepta el uso de cookies de acuerdo con los términos descritos en esta política. Para las cookies no técnicas, solicitaremos su consentimiento explícito mediante un banner informativo.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">7. Derechos del usuario</h2>
          <p>
            En relación con las cookies, usted tiene derecho a:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Ser informado sobre el uso de cookies</li>
            <li>Dar su consentimiento para cookies no técnicas</li>
            <li>Retirar su consentimiento en cualquier momento</li>
            <li>Configurar o deshabilitar cookies en su navegador</li>
            <li>Obtener información sobre las cookies utilizadas</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">8. Actualizaciones</h2>
          <p>
            Esta Política de Cookies puede ser actualizada periódicamente para reflejar cambios en nuestras prácticas o por otras razones operativas, legales o reglamentarias. Le recomendamos que revise esta política regularmente.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">9. Enlaces útiles</h2>
          <p>Para obtener más información sobre las cookies, puede consultar:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              <a href="https://www.aepd.es/cookies" target="_blank" rel="noopener noreferrer" className="text-brand-dark-green underline">
                Agencia Española de Protección de Datos - Cookies
              </a>
            </li>
            <li>
              <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-brand-dark-green underline">
                All About Cookies (en inglés)
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">10. Contacto</h2>
          <p>
            Si tiene alguna pregunta sobre nuestra Política de Cookies, puede contactarnos:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Email:</strong> contacto@gogestia.com</li>
            <li><strong>Teléfono:</strong> +34 900 000 000</li>
          </ul>
        </section>
      </div>
    </LegalPage>
  )
}

export default CookiePolicy
