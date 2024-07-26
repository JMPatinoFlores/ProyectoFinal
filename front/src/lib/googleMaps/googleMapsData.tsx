import { useState, useEffect } from 'react';
import loader from './googleMapsApiLoader';

interface GoogleMapsDataProps {
  address: string;
  location: google.maps.LatLngLiteral | null;
}

const GoogleMapsData = () => {
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

  return { address, location };
};

export default GoogleMapsData;
