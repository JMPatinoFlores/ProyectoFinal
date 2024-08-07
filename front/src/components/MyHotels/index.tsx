"use client";

import { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HotelContext } from "@/context/hotelContext";
import { UserContext } from "@/context/userContext";

function MyHotels() {
  const { fetchHotelsByAdmin, hotels } = useContext(HotelContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.id) {
      fetchHotelsByAdmin(user.id.toString());
    }
  }, [user]);

  return (
    <div className="text-black">
      <div className="flex justify-between items-center mx-4 my-6">
        <div className="flex-1">
          <h1 className="text-4xl font-semibold">Mis hoteles</h1>
        </div>
        <div className="flex justify-end">
          <button className="flex px-4 py-3 text-red-600 hover:text-red-700 focus:text-red-700 hover:bg-red-100 focus:bg-red-100 border border-red-600 rounded-md mr-2">
            <Image
              src={"/edit.png"}
              alt="Editar"
              width={24}
              height={24}
              className="invert mr-2"
            />
            Editar perfil
          </button>
          <Link
            href={"/post-hotel"}
            className="flex px-4 py-3 text-white bg-red-600 hover:bg-red-700 focus:bg-red-700 rounded-md"
          >
            <Image
              src={"/create2.png"}
              alt="Crear"
              width={24}
              height={24}
              className="mr-2"
            />
            Publicar un hotel
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-5">
        <h1 className="text-2xl font-bold">Mis Habitaciones</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Número
              </th>
              <th scope="col" className="px-6 py-3">
                Camas
              </th>
              <th scope="col" className="px-6 py-3">
                Baños
              </th>
              <th scope="col" className="px-6 py-3">
                Ver Habitacion
              </th>
              <th scope="col" className="px-6 py-3">
                Editar Habitacion
              </th>
            </tr>
          </thead>
          <tbody>
            {hotels?.map((hotel) => (
              <tr
                key={hotel.hotelId}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {hotel.name}
                </th>
                <td className="px-6 py-4">{hotel.totalRooms}</td>
                <td className="px-6 py-4">{/* Número de baños */}</td>
                <td className="px-6 py-4">
                  <Link href="#">
                    <button className="p-1 bg-blue-500 rounded text-white hover:bg-blue-600">
                      Ver
                    </button>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link href="#">
                    <button className="p-1 bg-sky-500 rounded text-white hover:bg-sky-600">
                      Editar
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-around">
        <button className="mt-5 px-2 py-1 text-white rounded bg-gray-500 hover:bg-gray-600">
          Editar Hotel
        </button>
        <button className="mt-5 px-2 py-1 text-white rounded bg-red-500 hover:bg-red-600">
          Eliminar Hotel
        </button>
      </div>
    </div>
  );
}

export default MyHotels;
