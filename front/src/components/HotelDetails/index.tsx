"use client";

import useGoogleMapsData from "../../lib/googleMaps/googleMapsData";
import { IHotelDetail, ILocationDetail } from "@/interfaces";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Rate } from "../Rating";
import { PostReview } from "../PostReview";

interface Props {
  hotel: IHotelDetail | null;
  hotelLocation: ILocationDetail | null;
}

const HotelDetail: React.FC<Props> = ({ hotel, hotelLocation }) => {
  const { isLoaded, mapCenter, marker } = useGoogleMapsData(hotelLocation);

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
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="relative w-full max-w-3xl mx-auto mb-6 rounded-lg overflow-hidden shadow-lg">
        <h2 className="text-3xl font-bold mb-4">{hotel.name}</h2>
        <div className="flex flex-col mb-4">
          <Rate />
        </div>
        <img
          src={hotel.image}
          alt="Hotel Image"
          className="object-cover w-full h-full mb-6 rounded-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0 md:mr-6 md:flex-1">
              <h2 className="text-2xl font-semibold mb-2">Descripción</h2>
              <p className="text-gray-700">{hotel.description}</p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Servicios del Hotel</h2>
          <ul className="list-disc list-inside text-gray-700">
            {hotel.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Precio</h2>
          <p className="text-gray-700">
            $
            <span className="text-3xl text-red-600 font-bold">
              {hotel.price}
            </span>{" "}
            USD/noche
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Recomendaciones</h2>
          <p className="text-gray-700">{hotel.recommendations}</p>
        </div>
        <div className="flex justify-center mb-6">
          <button className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
            Reservar
          </button>
        </div>
        <div className="relative w-full h-72 mb-6 rounded-lg overflow-hidden shadow-lg">
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
      <PostReview />
    </div>
  );
};

export default HotelDetail;
