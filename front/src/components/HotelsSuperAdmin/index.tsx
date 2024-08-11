"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { SuperAdminContext } from "../../context/superAdminContext";
import { IHotelAdminDetails, IHotelOfSuperAdmin } from "@/interfaces";

interface HotelsSuperAdminProps {
    hotelAdminId: string;
}

const HotelsSuperAdmin = ({ hotelAdminId }: HotelsSuperAdminProps) => {
    const [hotelAdminName, setHotelAdminName] = useState<string>("")
    const [hotels, setHotels] = useState<IHotelOfSuperAdmin[]>([]);
    const [selectedHotel, setSelectedHotel] = useState<IHotelOfSuperAdmin | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { fetchHotelAdminById, fetchDeleteHotelOfHotelAdmin } = useContext(SuperAdminContext);

    useEffect(() => {
        if (hotelAdminId) {
            const fetchData = async () => {
                const data = await fetchHotelAdminById(hotelAdminId);
                if (data) {
                    setHotels(data.hotels);
                    setHotelAdminName(`${data.name} ${data.lastName}`)
                } else {
                    console.warn('No data found for the given hotelAdminId');
                    // Handle the case where no data is returned if needed
                }
            };
            fetchData();
        }
    }, [hotelAdminId]);


    const handleViewDetails = (hotel: IHotelOfSuperAdmin) => {
        setSelectedHotel(hotel);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedHotel(null);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Hoteles de {hotelAdminName}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="relative p-4 bg-gray-100 rounded-lg shadow-md flex flex-col">
                        <div className="mb-2">
                            <h3 className="text-lg font-semibold">{hotel.name}</h3>
                            <p>{hotel.city}, {hotel.country}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            <button
                                className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                                onClick={() => handleViewDetails(hotel)}
                            >
                                Ver Detalles
                            </button>
                            <Link href={`/editHotel/${hotel.id}`} className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]">
                                Editar
                            </Link>
                            <button
                                className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                                onClick={async () => {
                                    const confirmed = window.confirm("¿Estás seguro que quieres eliminar este administrador de hotel?");
                                    if (!confirmed) return;
                                    try {
                                        const response = await fetchDeleteHotelOfHotelAdmin(hotel.id, hotelAdminId);
                                        if (response) {
                                            const hotelAdmin = await fetchHotelAdminById(hotelAdminId);
                                            if (hotelAdmin) setHotels(hotelAdmin?.hotels);
                                        }
                                    } catch (error) {
                                        console.log("Error deleting hotel admin: ", error);
                                    }
                                }}
                            >
                                Eliminar
                            </button>
                            <Link href={`/reviews/${hotel.id}`} className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]">
                                Ver Reseñas
                            </Link>
                        </div>
                    </div>
                ))}

                {isModalOpen && selectedHotel && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4">{selectedHotel.name}</h2>
                            <p><strong>Email:</strong> {selectedHotel.email}</p>
                            <p><strong>País:</strong> {selectedHotel.country}</p>
                            <p><strong>Ciudad:</strong> {selectedHotel.city}</p>
                            <p><strong>Precio promedio:</strong> ${selectedHotel.price.toFixed(2)}</p>
                            <p><strong>Dirección:</strong> {selectedHotel.address}</p>
                            <p><strong>Servicios:</strong> {selectedHotel.services.join(', ')}</p>
                            <p><strong>Calificación:</strong> {selectedHotel.rating} / 5</p>
                            <button
                                className="bg-gray-300 text-black rounded-md p-1 px-2 mt-4 hover:bg-gray-400"
                                onClick={handleCloseModal}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelsSuperAdmin;
