function TermsAndConditions () {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Términos y Condiciones</h1>
          <p className="text-muted-foreground">
            Bienvenido a nuestro hotel. Antes de reservar su estancia, por favor
            lea cuidadosamente los siguientes términos y condiciones que rigen
            el uso de nuestras instalaciones y servicios.
          </p>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Tarifas y Pagos</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  Todas las tarifas publicadas están sujetas a cambios sin
                  previo aviso.
                </li>
                <li>
                  Se requiere un depósito del 100% al momento de la reserva. 
                </li>
                <li>
                  Aceptamos las siguientes formas de pago: tarjeta de crédito,
                  tarjeta de débito.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Políticas de Cancelación
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  Las cancelaciones realizadas con más de 30 días de
                  anticipación recibirán un reembolso completo.
                </li>
                <li>
                  Las cancelaciones realizadas entre 15 y 30 días antes de la
                  fecha de llegada tendrán un cargo del 50% de la tarifa total.
                </li>
                <li>
                  Las cancelaciones realizadas con menos de 15 días de
                  anticipación no serán reembolsables.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Responsabilidades del Huésped
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  Los huéspedes son responsables de cualquier daño o pérdida
                  causada a las instalaciones o propiedades del hotel durante su
                  estancia.
                </li>
                <li>
                  Se prohíbe fumar en todas las habitaciones y áreas públicas
                  del hotel.
                </li>
                <li>
                  El hotel se reserva el derecho de negar el acceso o solicitar
                  el retiro de cualquier huésped que se comporte de manera
                  inapropiada o que viole estas políticas.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Otras Regulaciones</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  El check-in se realiza a partir de las 3:00 p.m. y el
                  check-out debe realizarse antes de las 11:00 a.m.
                </li>
                <li>
                  No se permiten mascotas en el hotel, a menos que se hayan
                  hecho arreglos previos.
                </li>
                <li>
                  El hotel no se hace responsable por la pérdida o daño de
                  artículos personales de los huéspedes.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TermsAndConditions;