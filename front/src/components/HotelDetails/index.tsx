"use client";

import useGoogleMapsDataLocation from "../../lib/googleMaps/googleMapsData";
import { IHotelDetail } from "@/interfaces";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Rating from "../Rating";
import PostReview from "../PostReview";
import Image from "next/image";

interface Props {
  hotel: IHotelDetail | null;
}

const HotelDetail: React.FC<Props> = ({ hotel }) => {
  const { isLoaded, mapCenter, marker } = useGoogleMapsDataLocation(hotel);

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
    <div className="flex flex-col items-center mx-auto w-4/5">
      <div className="w-full mb-4">
        <div className="flex w-full h-96 mb-4">
          <Image
            unoptimized
            src={hotel.images[0]}
            alt={hotel.name}
            width={400}
            height={300}
            className="object-cover rounded-lg flex-1 m-2"
          />
          <div className="w-full mb-4 flex-1 m-4">
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold text-center pb-4">
                {hotel.name}
              </h2>
              <Rating rating={hotel.rating} />
            </div>
            <hr className="hr-text mb-3" data-content="" />
            <h2 className="text-2xl font-semibold">Descripción</h2>
            <p className="pb-4">{hotel.description}</p>
            <h2 className="text-2xl font-semibold">Servicios del Hotel</h2>
            <ul className="list-disc pl-5">
              {hotel.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
            <button className="bg-[#f83f3a] text-white rounded-md px-4 py-2 hover:bg-[#e63946]">
              Reservar
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden m-2 flex-1">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{ height: "400px", width: "100%" }}
                center={mapCenter}
                zoom={12}
              >
                {marker && <Marker position={marker.getPosition()} />}
              </GoogleMap>
            )}
          </div>
          <div className="flex-1 m-4">
            <h2 className="font-semibold text-2xl">Recomendaciones</h2>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 m-2">
            <h2 className="font-semibold text-2xl">Reseñas</h2>
            {hotel?.reviews && hotel.reviews.length > 0 ? (
              <ul>
                {hotel.reviews.map((review, index) => (
                  <li key={index} className="mb-4">
                    <p className="text-lg font-medium">
                      {review.customer.name} {review.customer.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{review.date}</p>
                    <p>{"⭐".repeat(review.rating)}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay reseñas disponibles.</p>
            )}
          </div>
          <div className="flex-1 m-4">
            <PostReview />
          </div>
        </div>
      </div>

      <div className="w-full mb-4"></div>
      {/* <div className="w-full mb-4">
        <h2 className="text-2xl font-bold">Precio</h2>
        <p>
          $
          <span className="text-3xl text-red-600 font-bold">
            {hotel.price}
          </span>{" "}
          USD/noche
        </p>
      </div> */}
      {/* <div className="w-full mb-4">
        <h2 className="text-2xl font-bold">Recomendaciones</h2>
        <p>{hotel.recommendations}</p>
      </div> */}
    </div>
  );
};

export default HotelDetail;
