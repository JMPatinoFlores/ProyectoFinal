import Image from "next/image";

export default function ServicesPage() {
  return (
    <div>
      <div>
        <h1>Nuestros servicios</h1>
      </div>
      <div>
        <div>
          <div>
            <div>
              <Image src={"/contact.png"} alt="" width={50} height={50} />
            </div>
            <p>Poner en contacto a los anfitriones con los huéspedes.</p>
          </div>
          <div>
            <div>
              <Image src={"/2starshotel.png"} alt="" width={50} height={50} />
            </div>
            <p>Mostrar opciones disponibles para rentar en un lugar.</p>
          </div>
          <div>
            <div>
              <Image src={"/cardpayment.png"} alt="" width={50} height={50} />
            </div>
            <p>Realizar el cobro del servicio de alquiler</p>
          </div>
          <div>
            <div>
              <Image
                src={"/personalprofile.png"}
                alt=""
                width={50}
                height={50}
              />
            </div>
            <p>Perfil personal.</p>
          </div>
          <div>
            <div>
              <Image src={"/communication.png"} alt="" width={50} height={50} />
            </div>
            <p>
              Mensajes inteligentes para una comunicación segura entre
              anfitriones y huéspedes.
            </p>
          </div>
          <div>
            <div>
              <Image src={"/securepayment.png"} alt="" width={50} height={50} />
            </div>
            <p>Plataforma confiable para cobrar y transferir pagos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
