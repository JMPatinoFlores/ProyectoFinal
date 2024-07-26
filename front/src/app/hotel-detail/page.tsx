'use client';

import GoogleMapsData from '../../lib/googlemaps/googleMapsData';
import Image from 'next/image';

function HotelDetail() {
  const { address, location } = GoogleMapsData();

  return (
    <div className="flex flex-wrap">
      <div className="w-1/2 px-4">
        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
          <Image
            src="/francesca-saraco-_dS27XGgRyQ-unsplash.jpg"
            alt="Hotel Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden" id="map">
          {address && <p>Address: {address}</p>}
          {location && <p>Location: {location.lat}, {location.lng}</p>}
        </div>
      </div>
      <div className="w-1/2 px-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Descripción</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur elit inceptos, volutpat sem lobortis sed platea interdum suspendisse, varius eget eu fringilla auctor urna bibendum. Mus diam enim ullamcorper litora ultrices neque senectus risus blandit habitasse, ac luctus natoque himenaeos massa scelerisque libero nascetur vestibulum primis vulputate, class parturient curae torquent lobortis sollicitudin augue nunc bibendum.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Servicios del Hotel</h2>
          <ul>
            <li>Buffette</li>
            <li>Bar</li>
            <li>Restaurante</li>
            <li>Eventos</li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Precio</h2>
          <p>
            <span className="text-3xl text-red-600 font-bold">100</span> USD/noche
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Recomendaciones</h2>
          <ul>
            <li>Discotecas</li>
            <li>Restaurantes</li>
            <li>Cines</li>
          </ul>
        </div>
        <div className="flex justify-center mb-4">
          <button className="bg-[#f83f3a] text-white rounded-md p-1 px-2 ml-3 hover:bg-[#e63946]">Reservar</button>
        </div>
      </div>
    </div>
  );
}

export default HotelDetail;

// Borrar esta linea