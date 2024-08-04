"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import HotelDetail from "../../../components/HotelDetails";
import { IHotelDetail, ILocationDetail } from "@/interfaces";

const Page = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState<IHotelDetail | null>(null);
  const [hotelLocation, setHotelLocation] = useState<ILocationDetail | null>(
    null
  );

  useEffect(() => {
    if (typeof id === "string") {
      fetch("/hotels.json")
        .then((response) => response.json())
        .then((data) => {
          const selectedHotel = data.find(
            (hotel: { id: string }) => hotel.id === id.toUpperCase()
          );
          setHotelLocation(selectedHotel);
          setHotel(selectedHotel);
        });
    }
  }, [id]);

  return <HotelDetail hotel={hotel} hotelLocation={hotelLocation} />;
};

export default Page;
