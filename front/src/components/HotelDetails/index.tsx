"use client"

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
import useGoogleMapsData from "../../lib/googleMaps/googleMapsData";
import { IHotelDetail, ILocationDetail } from "@/interfaces";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface Props {
  hotel: IHotelDetail | null;
  hotelLocation: ILocationDetail | null;
}

const HotelDetail: React.FC<Props> = ({ hotel, hotelLocation }) => {
  const { isLoaded, mapCenter, marker } = useGoogleMapsData(hotelLocation);

  if (!hotel) return <div>Loading...</div>;

  if (!isLoaded) return <p>Loading...</p>;

  if (!mapCenter) return <p>Loading map...</p>;

  return (
    <div className="flex flex-wrap">
      <div className="w-full mb-4 px-4">
        <h2 className="text-2xl font-bold">{hotel.name}</h2>
      </div>
      <div className="w-1/2 px-4">
        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
          <img src={hotel.image} alt="Hotel Image" />
        </div>
        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
          <GoogleMap
            options={{
              disableDefaultUI: true,
              clickableIcons: true,
              scrollwheel: false,
            }}
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            {marker && <Marker position={mapCenter} />}
          </GoogleMap>
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
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Precio</h2>
          <p>
            $
            <span className="text-3xl text-red-600 font-bold">
              {hotel.price}
            </span>{" "}
            USD/noche
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Recomendaciones</h2>
          <p>{hotel.recommendations}</p>
        </div>
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