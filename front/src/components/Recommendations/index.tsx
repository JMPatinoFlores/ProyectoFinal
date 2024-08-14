/* eslint-disable react-hooks/exhaustive-deps */

"use client"

import React, { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Image from "next/image";

let map: google.maps.Map;
let center: google.maps.LatLngLiteral;

const RecommendationMap = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    initMap();
  }, []);

  const initMap = async () => {
    const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;

    center = { lat: -34.578614, lng: -58.4167212 };
    map = new Map(document.getElementById('map') as HTMLElement, {
      center: center,
      zoom: 13,
      mapId: 'DEMO_MAP_ID',
    });

    findPlaces(''); // initial search query
  };

  const findPlaces = async (query: string) => {
    const { Place } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;
    const request = {
      textQuery: query,
      fields: ['displayName', 
               'location', 
               'businessStatus',
              ],
      isOpenNow: false,
      language: 'es',
      minRating: 3.2,
      region: 'us',
      useStrictTypeFiltering: false,
    };

    //@ts-ignore
    const { places }  = await Place.searchByText(request) as string[] ;

    if (places.length) {
      console.log(places);

      const { LatLngBounds } = (await google.maps.importLibrary('core')) as google.maps.CoreLibrary;
      const bounds = new LatLngBounds();

      // Loop through and get all the results.
      places.forEach((place: { location: google.maps.LatLng; displayName: any; }) => {
        const markerView = new AdvancedMarkerElement({
          map,
          position: place.location,
          title: place.displayName,
        });

        bounds.extend(place.location as google.maps.LatLng);
        console.log(place);
      });
      
      // map.setZoom(13);
      if (map) {
        map.fitBounds(bounds);
      }


      setSearchResults(places);

    } else {
      console.log('No results');
      setSearchResults([]);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query === '') {
      initMap();
    } else {
      findPlaces(query);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      findPlaces(searchQuery);
    }
  };

  
  return (
    <div className="h-screen w-full p-4">
      <div className="flex justify-center mb-4">
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="flex">
            <input
              type="search"
              value={searchQuery}
              onKeyPress={handleKeyPress}
              onChange={handleInputChange}
              placeholder="Busca actividadas para disfrutar en tu destino ..."
              // className="w-full p-2 pl-10 text-sm text-black-700 rounded-lg focus:outline-none border border-red-600"
              className="w-full flex rounded-l-md bg-white text-black py-2 px-4 focus:outline-none  border border-red-600"
              style={{ borderRight: "none" }}
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-r-md"
            >
              <Image src={"/search.png"} alt="search" width={24} height={24} />
            </button>
          </div>
        </form>
      </div>
      <APIProvider apiKey={apiKey}>
        <div id="map" className="h-4/5 w-full" />
      </APIProvider>
    </div>
  );
};

export default RecommendationMap;
