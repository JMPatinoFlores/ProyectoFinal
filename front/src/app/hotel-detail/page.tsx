'use client';

import loader from '@/utils/google-maps-api-loader';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function HotelDetail() {
  const [mapElement, setMapElement] = useState<HTMLElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [address, setAddress] = useState<string>('');
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    const element = document.getElementById('map');
    setMapElement(element);
  }, []);

  useEffect(() => {
    if (!mapElement) return;

    loader.importLibrary('places').then(() => {
      const mapInstance = new google.maps.Map(mapElement ?? document.createElement('div'), {
        center: { lat: -33.0456, lng: -71.5515 },
        zoom: 12,
      });
      setMap(mapInstance);

      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: 'Avenida Borgono 12925, Renaca, Vina del Mar 2540407 Chile' }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const location = results[0].geometry.location;
          const latLngLiteral: google.maps.LatLngLiteral = {
            lat: location.lat(),
            lng: location.lng(),
          };
          setLocation(latLngLiteral);
          setAddress(results[0].formatted_address);
          mapInstance.setCenter(location);
          const marker = new google.maps.Marker({
            position: location,
            map: mapInstance,
            title: results[0].formatted_address,
          });
        } else {
          console.error('Geocode failed:', status);
        }
      });
    });
  }, [mapElement]);

  return (
    <div className="flex flex-wrap">
      <div className="w-1/2 px-4">
        <div className="relative w-full h-64 mb-4">
          <Image
            src="/francesca-saraco-_dS27XGgRyQ-unsplash.jpg"
            alt="Hotel Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative w-full h-64 mb-4" id="map">
          {address && <p>Address: {address}</p>}
          {location && <p>Location: {location.lat}, {location.lng}</p>}
        </div>
      </div>
      <div className="w-1/2 px-4">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Descripción</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit inceptos, volutpat sem lobortis sed platea interdum suspendisse, varius eget eu fringilla auctor urna bibendum. Mus diam enim ullamcorper litora ultrices neque senectus risus blandit habitasse, ac luctus natoque himenaeos massa scelerisque libero nascetur vestibulum primis vulputate, class parturient curae torquent lobortis sollicitudin augue nunc bibendum.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Servicios del Hotel</h2>
          <ul>
            <li>Buffette</li>
            <li>Bar</li>
            <li>Restaurante</li>
            <li>Eventos</li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Precio</h2>
          <p>
            <span className="text-red-600 font-bold">100</span> USD/noche
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Recomendaciones</h2>
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
