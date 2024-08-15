"use client";

import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import HotelDetail from "../../../components/HotelDetails";
import { IHotelDetail, ILocationDetail } from "@/interfaces";
import { HotelContext, HotelProvider } from "@/context/hotelContext";

const Page = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState<IHotelDetail | null>(null);

  const {fetchHotelById} = useContext(HotelContext)

  useEffect(() => {
    if (typeof id === "string") {
      fetchHotelById(id).then((data) => {        
        setHotel(data as IHotelDetail);
      });
    }
  }, [id, fetchHotelById]);

  return (
    <div className="flex justify-center items-center">
      <HotelDetail hotel={hotel} />
    </div>
  );
};

export default Page;