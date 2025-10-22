import LegalPage from '../../components/LegalPage'

const LegalNotice = () => {
  return (
    <LegalPage title="Aviso Legal">
      <div className="space-y-6 text-gray-700">
        <p className="text-sm text-gray-500">
          Última actualización: 8 de agosto de 2024
        </p>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">1. Datos identificativos</h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se informa al usuario de los datos identificativos del prestador de servicios:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Denominación social:</strong> GoGestia</li>
            <li><strong>Email:</strong> contacto@gogestia.com</li>
            <li><strong>Teléfono:</strong> +34 656 852 437</li>
            <li><strong>Sitio web:</strong> www.gogestia.com</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">2. Objeto</h2>
          <p>
            El presente Aviso Legal tiene por objeto regular el uso del sitio web www.gogestia.com (en adelante, "el Sitio Web"), propiedad de GoGestia.
          </p>
          <p className="mt-2">
            El acceso al Sitio Web es gratuito, salvo en lo relativo al coste de la conexión a través de la red de telecomunicaciones suministrada por el proveedor de acceso contratado por el usuario.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">3. Condiciones de uso</h2>
          <p>El usuario se compromete a:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Hacer un uso adecuado y lícito del Sitio Web</li>
            <li>No emplear el Sitio Web para realizar actividades ilícitas o constitutivas de delito</li>
            <li>No introducir virus informáticos o realizar acciones que puedan alterar, dañar o inutilizar los sistemas</li>
            <li>No intentar acceder a áreas restringidas de los sistemas informáticos</li>
            <li>No transmitir contenidos que sean contrarios a la ley, la moral, el orden público o las buenas costumbres</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">4. Contenidos</h2>
          <p>
            GoGestia se reserva el derecho a realizar, en cualquier momento y sin previo aviso, modificaciones y actualizaciones de la información contenida en el Sitio Web, de la configuración y presentación de ésta y de las condiciones de acceso.
          </p>
          <p className="mt-2">
            Los contenidos del Sitio Web tienen carácter meramente informativo y no constituyen asesoramiento profesional de ningún tipo.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">5. Responsabilidad</h2>
          <p>
            GoGestia no se hace responsable de los daños y perjuicios de cualquier naturaleza que puedan deberse a:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>La falta de disponibilidad o continuidad del funcionamiento del Sitio Web</li>
            <li>Los errores en el contenido o la falta de actualización del mismo</li>
            <li>La existencia de virus o elementos lesivos en el Sitio Web</li>
            <li>El uso ilícito o incorrecto del Sitio Web</li>
            <li>La falta de veracidad, exactitud, exhaustividad y actualización de los contenidos</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">6. Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos del Sitio Web, incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos fuente, constituyen una obra cuya propiedad pertenece a GoGestia.
          </p>
          <p className="mt-2">
            Quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de este Sitio Web, sin la autorización expresa de GoGestia.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">7. Enlaces</h2>
          <p>
            El Sitio Web puede contener enlaces a otros sitios web de terceros. GoGestia no se hace responsable del contenido de dichos sitios web ni de las condiciones de uso de los mismos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">8. Protección de datos</h2>
          <p>
            Para el tratamiento de datos personales, GoGestia se acoge a lo establecido en el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales.
          </p>
          <p className="mt-2">
            Para más información, consulte nuestra <a href="/legal/privacidad" className="text-brand-dark-green underline">Política de Privacidad</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">9. Legislación aplicable y jurisdicción</h2>
          <p>
            Las presentes condiciones se regirán por la legislación española. Para la resolución de cualquier controversia que pudiera surgir con ocasión del uso del Sitio Web, las partes se someten a los Juzgados y Tribunales de [Ciudad], renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">10. Modificaciones</h2>
          <p>
            GoGestia se reserva el derecho de realizar modificaciones en el presente Aviso Legal cuando lo estime oportuno, siendo válidas dichas modificaciones desde el momento de su publicación en el Sitio Web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">11. Contacto</h2>
          <p>
            Para cualquier consulta sobre el presente Aviso Legal, puede contactar con nosotros:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Email:</strong> contacto@gogestia.com</li>
            <li><strong>Teléfono:</strong> +34 675 56 75 16</li>
          </ul>
        </section>
      </div>
    </LegalPage>
  )
}

export default LegalNotice
