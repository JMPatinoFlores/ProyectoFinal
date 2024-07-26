function privacyPolicy () {
    return (
      <div className="bg-background text-foreground p-8 rounded-lg shadow-lg max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Política de Privacidad</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">
              Información que recopilamos
            </h2>
            <p>
              Recopilamos información personal como tu nombre, dirección de
              correo electrónico y cualquier otra información que nos
              proporciones voluntariamente al usar nuestros servicios. También
              podemos recopilar información sobre tu uso de nuestro sitio web,
              como tu dirección IP, el tipo de navegador que utilizas y tus
              patrones de navegación.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">
              Cómo utilizamos tus datos
            </h2>
            <p>
              Utilizamos tu información personal para brindarte un mejor
              servicio, procesar tus solicitudes, mejorar nuestros productos y
              servicios y comunicarnos contigo. No vendemos ni compartimos tu
              información personal con terceros sin tu consentimiento, excepto
              cuando sea necesario para cumplir con la ley o proteger nuestros
              derechos.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Derechos de los usuarios</h2>
            <p>
              Tienes derecho a acceder, rectificar, cancelar u oponerte al
              tratamiento de tus datos personales. También puedes solicitar la
              eliminación de tus datos en cualquier momento. Para ejercer estos
              derechos, por favor contáctanos a través de la información de
              contacto proporcionada a continuación.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Contacto</h2>
            <p>
              Si tienes alguna pregunta o inquietud sobre nuestra Política de
              Privacidad, no dudes en ponerte en contacto con nosotros a través
              de:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Correo electrónico:</strong> atc@rutaviajera.com
              </li>
              <li>
                <strong>Teléfono:</strong> +52 1 5500220022
              </li>
              <li>
                <strong>Dirección:</strong> Mansilla General 2513 2doA, de la
                Ciudad Autonoma de Buenos Aires
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default privacyPolicy