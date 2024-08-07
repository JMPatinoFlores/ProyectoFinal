"use client";

import useGoogleMapsData from "../../lib/googleMaps/googleMapsData";
import React from "react";
import useGoogleMapsDataLocation from "../../lib/googleMaps/googleMapsData";
import { IHotelDetail, ILocationDetail } from "@/interfaces";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Rating from "../rating";
import { PostReview } from "../PostReview";

interface Props {
  hotel: IHotelDetail | null;
}

interface MapProps {
  lat: number;
  lng: number;
}

const HotelDetail: React.FC<Props> = ({ hotel }) => {
  const { isLoaded, mapCenter, marker } = useGoogleMapsDataLocation(hotel);
  const lat = hotel?.location[0];
  const lng = hotel?.location[1];

  const rating = [1, 2, 3, 4, 5];

  if (!hotel)
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading...</p>
      </div>
    );

  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading...</p>
      </div>
    );

  if (!mapCenter)
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading map...</p>
      </div>
    );

  return (
    <div className="flex flex-wrap">
      <div className="w-full mb-4 px-4">
        <h2 className="text-2xl font-bold">{hotel.name}</h2>
        <Rating rating={hotel.rating} />
      </div>
      <div className="w-1/2 px-4">
        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
          <img src={hotel.images[0]} alt="Hotel Image" />
        </div>
        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
          <div>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{ height: "400px", width: "1000px" }}
                center={mapCenter}
                zoom={12}
              >
                {marker && <Marker position={marker.getPosition()} />}
              </GoogleMap>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/2 px-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Descripción</h2>
          <p>{hotel.description}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Servicios del Hotel</h2>
          <ul>
            {hotel.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        {/* <div className="mb-4">
          <h2 className="text-2xl font-bold">Precio</h2>
          <p>
            $
            <span className="text-3xl text-red-600 font-bold">
              {hotel.price}
            </span>{" "}
            USD/noche
          </p>
        </div> */}
        {/* <div className="mb-4">
          <h2 className="text-2xl font-bold">Recomendaciones</h2>
          <p>{hotel.recommendations}</p>
        </div> */}
        <div className="flex justify-center mb-4">
          <button className="bg-[#f83f3a] text-white rounded-md p-1 px-2 ml-3 hover:bg-[#e63946]">
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
