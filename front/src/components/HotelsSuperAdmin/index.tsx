"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { SuperAdminContext } from "../../context/superAdminContext";
import { IHotelOfSuperAdmin } from "@/interfaces";

interface HotelsSuperAdminProps {
    hotelAdminId: string;
}

const HotelsSuperAdmin = ({ hotelAdminId }: HotelsSuperAdminProps) => {
    const [hotelAdminName, setHotelAdminName] = useState<string>("")
    const [hotels, setHotels] = useState<IHotelOfSuperAdmin[]>([]);
    const [filteredHotels, setFilteredHotels] = useState<IHotelOfSuperAdmin[]>([])
    const [selectedHotel, setSelectedHotel] = useState<IHotelOfSuperAdmin | null>(null);
    const [selectedHotelToSend, setSelectedHotelToSend] = useState<IHotelOfSuperAdmin | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const { fetchHotelAdminById, fetchDeleteHotelOfHotelAdmin, fetchUpdateHotelDetails } = useContext(SuperAdminContext);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

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

    useEffect(() => {
        setFilteredHotels(hotels)
    }, [hotels])

    const handleViewDetails = (hotel: IHotelOfSuperAdmin) => {
        setSelectedHotel(hotel);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedHotel(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (selectedHotel) {
            setSelectedHotel({
                ...selectedHotel,
                [e.target.name]: e.target.value,
            });
            if (e.target.name === "services") {
                const newServices = e.target.value.replace(/,(?=\S)/g, ', ')
                setSelectedHotel({
                    ...selectedHotel,
                    [e.target.name]: newServices
                })
            }
            setSelectedHotelToSend({
                ...selectedHotel,
                [e.target.name]: e.target.value
            })
            if (e.target.name === "services") {
                if (e.target.value.includes(',')) {
                    const array = e.target.value.split(/\s*,\s*/);
                    setSelectedHotelToSend({
                        ...selectedHotel,
                        [e.target.name]: array
                    })
                }
            }
        }
    };

    const handleUpdateHotel = async () => {
        if (selectedHotel) {
            try {
                console.log(selectedHotel);

                const response = await fetchUpdateHotelDetails(selectedHotel.id, selectedHotelToSend, hotelAdminId);
                if (response) {
                    const updatedHotels = hotels.map(hotel =>
                        hotel.id === selectedHotel.id ? selectedHotel : hotel
                    );
                    setHotels(updatedHotels);
                    handleCloseModal();
                }
            } catch (error) {
                console.log("Error updating hotel details: ", error);
            }
        }
    };

    const services = selectedHotel?.services && Array.isArray(selectedHotel.services)
        ? selectedHotel.services.join(', ')
        : '';
    
    const paginatedHotels = Array.isArray(filteredHotels)
        ? filteredHotels.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
        : [];

    return (
        <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl text-center md:text-3xl font-bold flex-grow mb-4 md:mb-0">
                    Hoteles de {hotelAdminName}
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {paginatedHotels.length > 0 ? paginatedHotels.map((hotel) => (
                    <div key={hotel.id} className="relative p-4 bg-gray-100 rounded-lg shadow-md flex flex-col">
                        <div className="mb-2">
                            <h3 className="text-lg font-semibold">{hotel.name}</h3>
                            <p>{hotel.address}, {hotel.city}</p>
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
                )) : (<p>No hay resultados que coincidan con su búsqueda.</p>)}

                {isModalOpen && selectedHotel && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
                            <h2 className="text-xl text-center font-bold mb-4">Editar Hotel</h2>
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10">
                                <div className="w-full md:w-1/2 max-w-[600px]">
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-semibold">Nombre:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedHotel.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-semibold">Email:</label>
                                        <input
                                            type="text"
                                            name="email"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedHotel.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-semibold">Dirección:</label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedHotel.address}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="font-semibold">Descripción:</label>
                                        <textarea
                                            name="description"
                                            className="w-full p-2 border rounded"
                                            maxLength={500}
                                            value={selectedHotel.description}
                                            onChange={handleInputChange}
                                        />
                                        <small className="text-gray-500">Máximo 500 caracteres</small>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 max-w-[600px]">
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-semibold">País:</label>
                                        <input
                                            type="text"
                                            name="country"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedHotel.country}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-semibold">Ciudad:</label>
                                        <input
                                            type="text"
                                            name="city"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedHotel.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-semibold">Precio promedio:</label>
                                        <input
                                            type="number"
                                            name="price"
                                            className="w-2/3 p-2 border rounded"
                                            value={Number(selectedHotel.price)}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-semibold">Servicios (separados por comas):</label>
                                        <input
                                            type="text"
                                            name="services"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedHotel.services}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-semibold">Rating:</label>
                                        <input
                                            type="number"
                                            name="rating"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedHotel.rating}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
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
            {filteredHotels.length > itemsPerPage && (
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-[#f83f3a] text-white rounded-md p-1 px-2 ml-3 hover:bg-[#e63946]"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <button
                        className="bg-[#f83f3a] text-white rounded-md p-1 px-2 ml-3 hover:bg-[#e63946]"
                        onClick={handleNextPage}
                        disabled={
                            currentPage >= Math.ceil(filteredHotels.length / itemsPerPage)
                        }
                    >
                        Siguiente
                    </button>
                    <span className="ml-4">
                        Página {currentPage} de{" "}
                        {Math.ceil(filteredHotels.length / itemsPerPage)}
                    </span>
                </div>
            )}
        </div>
    );
};

export default HotelsSuperAdmin;
