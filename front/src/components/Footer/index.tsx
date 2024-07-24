import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-[#ffffff] max-h-[12cm] p-4 flex flex-wrap justify-center">
      <div className="w-full md:w-1/4 xl:w-1/4 p-4">
        <h5 className="uppercase text-lg mb-2">¿Necesitas ayuda?</h5>
        <p style={{ display: 'flex', alignItems: 'rigth' }}>
          <Image src="/icons8-location-50.png" alt="Location" width={24} height={24} className="w-6 h-6 mr-5"/>
          <span>Mansilla General 2513 2doA, de la Ciudad Autonoma de Buenos Aires</span>
        </p>
        <p>
          <Image src="/icons8-phone-50.png" alt="Location" width={24} height={24} className="w-6 h-6 mr-5 inline" />
          +52 1 5500220022
        </p>
        <p>
        <Image src="/icons8-email-50.png" alt="Location" width={24} height={24} className="w-6 h-6 mr-5 inline" />
          atc@rutaviajera.com
        </p>
      </div>
      <div className="w-full md:w-1/4 xl:w-1/4 p-4">
        <h5 className="uppercase text-lg mb-2">Acerca de</h5>
        <ul>
          <li><a href="#">Nuestra historia</a></li>
          <li><a href="#">Premios</a></li>
          <li><a href="#">Nuestro equipo</a></li>
          <li><a href="#">Trabaja con nosotros</a></li>
        </ul>
      </div>
      <div className="w-full md:w-1/4 xl:w-1/4 p-4">
        <h5 className="uppercase text-lg mb-2">Políticas</h5>
        <ul>
          <li><a href="#">Políticas de privacidad</a></li>
          <li><a href="#">Terminos y condiciones</a></li>
        </ul>
      </div>
      <div className="w-full md:w-1/4 xl:w-1/4 p-4">
        <h5 className="uppercase text-lg mb-2">Redes sociales</h5>
        <ul>
          <li>
            <a href="#" className="text-lg">
              <Image src="/icons8-instagram-50.png" alt="Location" width={24} height={24} className="w-6 h-6 mr-5 inline" />
              @RutaViajera
            </a>
          </li>
          <li>
            <a href="#" className="text-lg">
              <Image src="/icons8-linkedin-50.png" alt="Location" width={24} height={24} className="w-6 h-6 mr-5 inline" />            
              RutaViajera
            </a>
          </li>
          <li>
            <a href="#" className="text-lg">
              <Image src="/icons8-youtube-50.png" alt="Location" width={24} height={24} className="w-6 h-6 mr-5 inline" />                                          
              RutaViajera
            </a>
          </li>
          <li>
            <a href="#" className="text-lg">
              <Image src="/icons8-x-50.png" alt="Location" width={24} height={24} className="w-6 h-6 mr-5 inline" />                                                        
              @RutaViajera
            </a>
          </li>
          <li>
            <a href="#" className="text-lg">
              <Image src="/icons8-facebook-50.png" alt="Location" width={24} height={24} className="w-6 h-6 mr-5 inline" />                                                                        
              RutaViajera
            </a>
          </li>
          <li>
            <a href="#" className="text-lg">
              <Image src="/icons8-tiktok-50.png" alt="Location" width={24} height={24} className="w-6 h-6 mr-5 inline" />                                                        
              RutaViajera
            </a>
          </li>
        </ul>
      </div>
      <p className="text-center text-sm mt-4">
        Copyright &copy; 2024 Todos los derechos reservados | Hecho con &#128147; por EquipoDinamita
      </p>
    </footer>
  );
};

export default Footer;