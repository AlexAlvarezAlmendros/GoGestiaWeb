import LegalPage from '../../components/LegalPage'

const PrivacyPolicy = () => {
  return (
    <LegalPage title="Política de Privacidad">
      <div className="space-y-6 text-gray-700">
        <p className="text-sm text-gray-500">
          Última actualización: 8 de agosto de 2024
        </p>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">1. Información sobre el responsable del tratamiento</h2>
          <p>
            <strong>GoGestia</strong> (en adelante, "nosotros", "nuestro" o la "Empresa") es el responsable del tratamiento de los datos personales que nos facilite a través de este sitio web.
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Denominación social:</strong> GoGestia</li>
            <li><strong>Email de contacto:</strong> contacto@gogestia.com</li>
            <li><strong>Teléfono:</strong> +34 656 852 437</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">2. Finalidades del tratamiento</h2>
          <p>Los datos personales que recabamos a través de los formularios de contacto serán tratados con las siguientes finalidades:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Responder a sus consultas y solicitudes de información</li>
            <li>Realizar el diagnóstico gratuito solicitado</li>
            <li>Elaborar propuestas comerciales personalizadas</li>
            <li>Mantener comunicación comercial con fines informativos (con su consentimiento)</li>
            <li>Cumplir con las obligaciones legales que nos sean aplicables</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">3. Base jurídica del tratamiento</h2>
          <p>El tratamiento de sus datos se basa en:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Consentimiento:</strong> Para el envío de comunicaciones comerciales</li>
            <li><strong>Interés legítimo:</strong> Para responder a sus consultas y realizar el seguimiento comercial</li>
            <li><strong>Ejecución de contrato:</strong> Para la prestación de los servicios solicitados</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">4. Conservación de los datos</h2>
          <p>
            Sus datos personales se conservarán durante el tiempo necesario para cumplir con las finalidades para las que fueron recabados y, en todo caso, durante los plazos previstos legalmente.
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Datos de contacto:</strong> Hasta que retire el consentimiento o solicite la supresión</li>
            <li><strong>Datos comerciales:</strong> Durante la relación comercial y hasta 6 años después de su finalización</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">5. Destinatarios de los datos</h2>
          <p>
            Sus datos personales no serán comunicados a terceros, salvo obligación legal. Podrán ser tratados por proveedores de servicios que actúen como encargados del tratamiento, siempre bajo nuestras instrucciones y con las debidas garantías.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">6. Derechos del usuario</h2>
          <p>Como titular de los datos, usted tiene derecho a:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Acceso:</strong> Conocer qué datos tenemos sobre usted</li>
            <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
            <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos</li>
            <li><strong>Limitación:</strong> Restringir el tratamiento de sus datos</li>
            <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
            <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos</li>
            <li><strong>Retirada del consentimiento:</strong> En cualquier momento, sin efectos retroactivos</li>
          </ul>
          <p className="mt-4">
            Para ejercer estos derechos, puede contactarnos en: <strong>contacto@gogestia.com</strong>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">7. Seguridad</h2>
          <p>
            Hemos implementado las medidas técnicas y organizativas apropiadas para proteger sus datos personales contra el acceso no autorizado, la alteración, divulgación o destrucción.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">8. Cookies</h2>
          <p>
            Este sitio web utiliza cookies técnicas necesarias para su funcionamiento. Para más información, consulte nuestra <a href="/legal/cookies" className="text-brand-dark-green underline">Política de Cookies</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">9. Cambios en la política de privacidad</h2>
          <p>
            Nos reservamos el derecho a modificar esta Política de Privacidad. Cualquier cambio será publicado en esta página con la fecha de última actualización.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-dark-green mb-4">10. Contacto</h2>
          <p>
            Si tiene cualquier duda sobre esta Política de Privacidad, puede contactarnos:
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

export default PrivacyPolicy
