import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-4 divide-y bg-gray-100 text-gray-800">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <Link
            href={"/"}
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800">
              <Image src={"/logo.png"} alt="logo" width={32} height={32} />
            </div>
            <h2 className="self-center text-2xl font-semibold">RutaViajera</h2>
          </Link>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h5 className="tracking-wide uppercase dark:text-gray-900">
              Acerca de
            </h5>
            <div className="flex flex-col space-y-1">
              <Link href="/history">Nuestra historia</Link>
              <Link href="/team">Nuestro equipo</Link>
              <Link href="#">Integraciones</Link>
              <Link href="#">FAQ</Link>
            </div>
          </div>
          <div className="space-y-3">
            <h5 className="tracking-wide uppercase text-gray-900">Companía</h5>
            <div className="flex flex-col space-y-1">
              <Link href="/privacy-policy">Políticas de privacidad</Link>
              <Link href="/terms-conditions">Terminos y condiciones</Link>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="tracking-wide uppercase text-gray-900">
              Desarrolladores
            </h2>
            <div className="flex flex-col space-y-1">
              <Link href={"#"}>API Pública</Link>
              <Link href={"#"}>Documentación</Link>
              <Link href={"#"}>Guías</Link>
            </div>
          </div>
          <div className="space-y-3">
            <h5 className="uppercase dark:text-gray-900">Redes sociales</h5>
            <div className="flex justify-start space-x-3">
              <Link href="#" className="flex items-center p-1">
                <Image
                  src="/facebook.png"
                  alt="facebook"
                  width={24}
                  height={24}
                  className="w-5 h-5 fill-current"
                />
              </Link>
              <Link href="#" className="flex items-center p-1">
                <Image
                  src="/twitter.png"
                  alt="twitter"
                  width={24}
                  height={24}
                  className="w-5 h-5 fill-current"
                />
              </Link>
              <Link href="#" className="flex items-center p-1">
                <Image
                  src="/instagram.png"
                  alt="Location"
                  width={24}
                  height={24}
                  className="w-5 h-5 fill-current"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="py-6 text-sm text-center text-gray-600">
        Copyright &copy; 2024 Todos los derechos reservados | Hecho con ♥ por
        EquipoDinamita
      </p>
    </footer>
  );
};

export default Footer;
