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
    const { fetchHotelAdminById, fetchDeleteHotelOfHotelAdmin, fetchUpdateHotelDetails } = useContext(SuperAdminContext);

    useEffect(() => {
        if (hotelAdminId) {
            const fetchData = async () => {
                const data = await fetchHotelAdminById(hotelAdminId);
                if (data) {
                    setHotels(data.hotels);
                    setHotelAdminName(`${data.name} ${data.lastName}`)
                } else {
                    console.warn('No data found for the given hotelAdminId');
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedHotel) {
            setSelectedHotel({
                ...selectedHotel,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleUpdateHotel = async () => {
        if (selectedHotel) {
            try {
                console.log(selectedHotel);
                
                const response = await fetchUpdateHotelDetails(selectedHotel.id, selectedHotel, hotelAdminId);
                if (response) {
                    const updatedHotels = hotels.map(hotel =>
                        hotel.id === selectedHotel.id ? selectedHotel : hotel
                    );
                    console.log(updatedHotels);
                    
                    setHotels(updatedHotels);
                    handleCloseModal();
                }
            } catch (error) {
                console.log("Error updating hotel details: ", error);
            }
        }
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
                                Ver Detalles y Editar
                            </button>
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
                            <h2 className="text-xl font-bold mb-4">Editar {selectedHotel.name}</h2>
                            <input
                                type="text"
                                name="name"
                                className="w-full mb-2 p-2 border rounded"
                                value={selectedHotel.name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="email"
                                className="w-full mb-2 p-2 border rounded"
                                value={selectedHotel.email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="country"
                                className="w-full mb-2 p-2 border rounded"
                                value={selectedHotel.country}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="city"
                                className="w-full mb-2 p-2 border rounded"
                                value={selectedHotel.city}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="price"
                                className="w-full mb-2 p-2 border rounded"
                                value={selectedHotel.price}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="address"
                                className="w-full mb-2 p-2 border rounded"
                                value={selectedHotel.address}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="services"
                                className="w-full mb-2 p-2 border rounded"
                                value={selectedHotel.services.join(', ')}
                                onChange={handleInputChange}
                            />
                            <input
                                type="number"
                                name="rating"
                                className="w-full mb-2 p-2 border rounded"
                                value={selectedHotel.rating}
                                onChange={handleInputChange}
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-gray-300 text-black rounded-md p-1 px-2 mr-2 hover:bg-gray-400"
                                    onClick={handleCloseModal}
                                >
                                    Cerrar
                                </button>
                                <button
                                    className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                                    onClick={handleUpdateHotel}
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelsSuperAdmin;
