import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-left w-full pt-4">
      <div className="container mx-auto grid grid-cols-4 justify-items-center">
        <div>
          <h5 className="uppercase text-lg mb-2">¿Necesitas ayuda?</h5>
          <p className="flex items-center p-2">
            <Image
              src="/icons8-location-50.png"
              alt="Location"
              width={24}
              height={24}
              className="w-6 h-6 mr-5"
            />
            <span>
              Mansilla General 2513 2doA, de la Ciudad Autonoma de Buenos Aires
            </span>
          </p>
          <p className="flex items-center p-2">
            <Image
              src="/icons8-phone-50.png"
              alt="Location"
              width={24}
              height={24}
              className="w-6 h-6 mr-5 inline"
            />
            +52 1 5500220022
          </p>
          <p className="flex items-center p-2">
            <Image
              src="/icons8-email-50.png"
              alt="Location"
              width={24}
              height={24}
              className="w-6 h-6 mr-5 inline"
            />
            atc@rutaviajera.com
          </p>
        </div>
        <div className="flex flex-col">
          <h5 className="uppercase text-lg mb-2">Acerca de</h5>

          <Link href="/history">Nuestra historia</Link>

          <Link href="#">Premios</Link>

          <Link href="/team">Nuestro equipo</Link>

          <Link href="#">Trabaja con nosotros</Link>
        </div>
        <div className="flex flex-col">
          <h5 className="uppercase text-lg mb-2">Políticas</h5>

          <Link href="/privacy-policy">Políticas de privacidad</Link>
          <Link href="/terms-conditions">Terminos y condiciones</Link>
        </div>
        <div>
          <h5 className="uppercase text-lg mb-2">Redes sociales</h5>
          <div className="grid grid-cols-2 items-center">
            <Link href="#" className="text-lg">
              <Image
                src="/icons8-instagram-50.png"
                alt="Location"
                width={24}
                height={24}
                className="w-6 h-6 mr-5 inline"
              />
              @RutaViajera
            </Link>
            <Link href="#" className="text-lg">
              <Image
                src="/icons8-linkedin-50.png"
                alt="Location"
                width={24}
                height={24}
                className="w-6 h-6 mr-5 inline"
              />
              RutaViajera
            </Link>
            <Link href="#" className="text-lg">
              <Image
                src="/icons8-youtube-50.png"
                alt="Location"
                width={24}
                height={24}
                className="w-6 h-6 mr-5 inline"
              />
              RutaViajera
            </Link>
            <Link href="#" className="text-lg">
              <Image
                src="/icons8-x-50.png"
                alt="Location"
                width={24}
                height={24}
                className="w-6 h-6 mr-5 inline"
              />
              @RutaViajera
            </Link>
            <Link href="#" className="text-lg">
              <Image
                src="/icons8-facebook-50.png"
                alt="Location"
                width={24}
                height={24}
                className="w-6 h-6 mr-5 inline"
              />
              RutaViajera
            </Link>
            <Link href="#" className="text-lg">
              <Image
                src="/icons8-tiktok-50.png"
                alt="Location"
                width={24}
                height={24}
                className="w-6 h-6 mr-5 inline"
              />
              RutaViajera
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center text-sm mt-4 mb-2">
        Copyright &copy; 2024 Todos los derechos reservados | Hecho con ♥ por
        EquipoDinamita
      </p>
    </footer>
  );
};

export default Footer;
