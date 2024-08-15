"use client";

import { UserContext } from "@/context/userContext";
import { IBooking } from "@/interfaces";
import { cancelBooking, fetchCustomerBookings } from "@/lib/server/fetchUsers";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import HotelBookings from "../HotelBookings";

function Bookings() {
  const { isAdmin, user, isLogged, getBookings } = useContext(UserContext);
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const customerId = user?.id;

  const fetchBookings = useCallback(async () => {
    if (!customerId) {
      console.warn("No hay customerId disponible.");
      return;
    }

    try {
      const data = await fetchCustomerBookings(customerId);
      setBookings(data);
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
    }
  }, [customerId]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancelBooking = async (bookingId: string) => {
    const confirmCancel = window.confirm(
      "¿Estás seguro de que deseas cancelar esta reserva?"
    );

    if (!confirmCancel) return;

    try {
      const success = await cancelBooking(bookingId);
      if (success && user?.id) {
        await getBookings(user.id);
        alert("La reserva ha sido cancelada exitosamente.");
      }
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("Hubo un error al cancelar la reserva.");
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-4xl font-semibold m-6 p-2">Mis reservas</h1>
      {isLogged ? (
        <div>
          {!isAdmin ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-red-500 text-white uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">No. de reserva</th>
                  <th className="py-3 px-6 text-left">Fecha</th>
                  <th className="py-3 px-6 text-left">Hotel</th>
                  <th className="py-3 px-6 text-left">Entrada - Salida</th>
                  <th className="py-3 px-6 text-left">Dirección</th>
                  <th className="py-3 px-6 text-left">Contacto</th>
                  <th className="py-3 px-6 text-left">Total</th>
                  <th className="py-3 px-6 text-left">Estado</th>
                  <th className="py-3 px-6 text-center"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-normal break-words">
                      <span className="block">{booking.id.slice(0, 16)}</span>
                      <span className="block">{booking.id.slice(16)}</span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {booking.bookingDetails.hotel.name}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {booking.bookingDetails.availabilities.map(
                        (availability) => (
                          <div key={availability.id}>
                            {new Date(
                              availability.startDate
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              availability.endDate
                            ).toLocaleDateString()}
                          </div>
                        )
                      )}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {booking.bookingDetails.hotel.address},{" "}
                      {booking.bookingDetails.hotel.city},{" "}
                      {booking.bookingDetails.hotel.country}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {booking.bookingDetails.hotel.email}
                    </td>
                    <td className="py-3 px-6 text-left">
                      ${booking.bookingDetails.total} USD
                    </td>
                    <td className="py-3 px-6 text-left">
                      {booking.bookingDetails.status}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      >
                        x
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col justify-center items-center">
              {user?.hotels?.map((hotel) => (
                <div key={hotel.id} className="w-full mb-6">
                  <h2 className="text-2xl font-bold decoration-orange-500 underline underline-offset-8">
                    {hotel.name}
                  </h2>
                  <HotelBookings hotelId={hotel.id} />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>No has iniciado sesión</h1>
          <Link href={"/login"}>Iniciar sesión</Link>
        </div>
      )}
    </div>
  );
}

export default Bookings;
