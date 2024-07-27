import { useState, useEffect } from 'react';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { IHotelDetail } from '@/interfaces';

const DEFAULT_MAP_CENTER: google.maps.LatLngLiteral = {
  lat: 53.4058343,
  lng: -2.9919333,
};

const useGoogleMapsData = (hotel: IHotelDetail | null) => {
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(DEFAULT_MAP_CENTER);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  useEffect(() => {
    if (hotel && isLoaded && !loadError) {
      const address = `${hotel.address}, ${hotel.city}, ${hotel.country}`;
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results) {
            const location = results[0].geometry.location;
            const latLngLiteral: google.maps.LatLngLiteral = {
              lat: location.lat(),
              lng: location.lng(),
            };
            setMapCenter(latLngLiteral);
          } else {
            console.error('No results found');
          }
        } else {
          console.error(`Geocode error: ${status}`);
        }
      });
    }
  }, [hotel, isLoaded, loadError]);

  useEffect(() => {
    if (mapCenter && isLoaded && !loadError) {
      const markerOptions: google.maps.MarkerOptions = {
        position: mapCenter,
        map: null,
      };
      setMarker(new google.maps.Marker(markerOptions));
    } else {
      setMarker(null);
    }
  }, [mapCenter, isLoaded, loadError]);

  return { isLoaded, mapCenter, marker };
};

export default useGoogleMapsData;
