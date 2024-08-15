"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { SuperAdminContext } from "../../context/superAdminContext";
import { IRoomTypeOfSuperAdmin } from "@/interfaces";
import Sidebar from "../SidebarSuperAdmin";

interface RoomTypesHotelProps {
    hotelId: string;
    searchQuery: string;
}

const RoomTypesHotel = ({ hotelId, searchQuery }: RoomTypesHotelProps) => {
    const [hotelName, setHotelName] = useState<string>("")
    const [roomTypes, setRoomTypes] = useState<Partial<IRoomTypeOfSuperAdmin>[]>([]);
    const [filteredRoomTypes, setFilteredRoomTypes] = useState<Partial<IRoomTypeOfSuperAdmin>[]>([])
    const [selectedRoomType, setSelectedRoomType] = useState<Partial<IRoomTypeOfSuperAdmin> | null>(null);
    const [selectedRoomTypeToSend, setSelectedRoomTypeToSend] = useState<Partial<IRoomTypeOfSuperAdmin> | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const { fetchHotelById, fetchDeleteRoomTypeOfHotel, fetchUpdateRoomTypeDetails, fetchRoomTypesBySearch } = useContext(SuperAdminContext);
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        if (hotelId) {
            const fetchData = async () => {
                const data = await fetchHotelById(hotelId);

                if (data) {
                    const roomTypesToSet: Partial<IRoomTypeOfSuperAdmin>[] = []
                    for (const roomType of data.roomstype) {
                        const { rooms, ...roomTypeToSet } = roomType
                        roomTypesToSet.push(roomTypeToSet)
                    }

                    setRoomTypes(roomTypesToSet);
                    setHotelName(data.name)
                } else {
                    console.warn('No data found for the given hotelId');
                }
            };
            fetchData();
        }
    }, [hotelId]);

    useEffect(() => {
        if (!searchQuery) setFilteredRoomTypes(roomTypes)
    }, [roomTypes])

    useEffect(() => {
        if (searchQuery) {
            fetchRoomTypesBySearch(hotelId, searchQuery).then((data) => {
                if (Array.isArray(data)) {
                    setFilteredRoomTypes(data);
                } else {
                    console.error("fetchRoomTypesBySearch did not return an array.");
                    setFilteredRoomTypes([]);
                }
            });
        } else {
            setFilteredRoomTypes(roomTypes);
        }
    }, [searchQuery, roomTypes, fetchRoomTypesBySearch]);

    const handleViewDetails = (roomType: Partial<IRoomTypeOfSuperAdmin>) => {
        setSelectedRoomType(roomType);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRoomType(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (selectedRoomType) {
            setSelectedRoomType({
                ...selectedRoomType,
                [e.target.name]: e.target.value,
            });
            setSelectedRoomTypeToSend({
                ...selectedRoomType,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleUpdateRoomType = async () => {
        if (selectedRoomType) {
            try {
                console.log(selectedRoomTypeToSend);

                const response = await fetchUpdateRoomTypeDetails(selectedRoomType.id as string, selectedRoomTypeToSend);
                if (response) {
                    const updatedRoomTypes = roomTypes.map(roomType =>
                        roomType.id === selectedRoomType.id ? selectedRoomType : roomType
                    );
                    setRoomTypes(updatedRoomTypes);
                    handleCloseModal();
                } else {
                    alert('Hubo un error al actualizar el tipo de habitación.')
                }
            } catch (error) {
                console.log("Error updating room type details: ", error);
            }
        }
    };

    const paginatedRoomTypes = Array.isArray(filteredRoomTypes)
        ? filteredRoomTypes.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
        : [];

    return (
        <div className="flex">
            <Sidebar setSidebarVisible={setSidebarVisible} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />

            <div className="p-8">
                <div className="xs:flex-1  flex-col md:flex-row justify-between items-center">
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden mb-4 inline-flex p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        <div>
                            <div className="w-[35px] h-[5px] bg-black my-[6px]"></div>
                            <div className="w-[35px] h-[5px] bg-black my-[6px]"></div>
                            <div className="w-[35px] h-[5px] bg-black my-[6px]"></div>
                        </div>
                    </button>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-2xl text-center md:text-3xl font-bold flex-grow mb-4 md:mb-0">
                        Tipos de Habitación del Hotel:  {hotelName}
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {paginatedRoomTypes.length > 0 ? paginatedRoomTypes.map((roomType) => (
                        <div key={roomType.id} className="relative p-4 bg-gray-100 rounded-lg shadow-md flex flex-col">
                            <div className="mb-2">
                                <h3 className="text-lg font-semibold">{roomType.name}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                <button
                                    className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                                    onClick={() => handleViewDetails(roomType)}
                                >
                                    Ver Detalles y Editar
                                </button>
                                <button
                                    className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                                    onClick={async () => {
                                        const confirmed = window.confirm("¿Estás seguro que quieres eliminar este tipo de habitación?");
                                        if (!confirmed) return;
                                        try {
                                            const response = await fetchDeleteRoomTypeOfHotel(roomType.id as string);
                                            if (response) {
                                                const hotel = await fetchHotelById(hotelId);
                                                if (hotel) setRoomTypes(hotel?.roomstype);
                                            } else {
                                                alert('Hubo un error al eliminar el tipo de habitación.')
                                            }
                                        } catch (error) {
                                            console.log("Error deleting room type: ", error);
                                        }
                                    }}
                                >
                                    Eliminar
                                </button>
                                <Link href={`/roomsSuperAdminPage/${roomType.id}`} className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]">
                                    Ver Habitaciones
                                </Link>
                            </div>
                        </div>
                    )) : (<p>No hay resultados que coincidan con su búsqueda.</p>)}

                    {isModalOpen && selectedRoomType && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
                                <h2 className="text-xl text-center font-bold mb-4">Editar Tipo de Habitación</h2>
                                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10">
                                    <div className="w-full md:w-1/2 max-w-[600px]">
                                        <div className="mb-2 flex items-center">
                                            <label className="w-1/3 font-semibold">Nombre:</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="w-2/3 p-2 border rounded"
                                                value={selectedRoomType.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-2 flex items-center">
                                            <label className="w-1/3 font-semibold">Capacidad:</label>
                                            <input
                                                type="number"
                                                name="capacity"
                                                className="w-2/3 p-2 border rounded"
                                                value={Number(selectedRoomType.capacity)}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-2 flex items-center">
                                            <label className="w-1/3 font-semibold">Baños Totales:</label>
                                            <input
                                                type="number"
                                                name="totalBathrooms"
                                                className="w-2/3 p-2 border rounded"
                                                value={Number(selectedRoomType.totalBathrooms)}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 max-w-[600px]">
                                        <div className="mb-2 flex items-center">
                                            <label className="w-1/3 font-semibold">Camas Totales:</label>
                                            <input
                                                type="number"
                                                name="totalBeds"
                                                className="w-2/3 p-2 border rounded"
                                                value={Number(selectedRoomType.totalBeds)}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-2 flex items-center">
                                            <label className="w-1/3 font-semibold">Precio:</label>
                                            <input
                                                type="number"
                                                name="price"
                                                className="w-2/3 p-2 border rounded"
                                                value={Number(selectedRoomType.price)}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-6">
                                    <button
                                        className="bg-[#f83f3a] text-white rounded-md p-2 px-4 hover:bg-[#e63946]"
                                        onClick={handleUpdateRoomType}
                                    >
                                        Guardar Cambios
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white rounded-md p-2 px-4 hover:bg-gray-700"
                                        onClick={handleCloseModal}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-center space-x-4 mt-6">
                    {currentPage > 1 && (
                        <button onClick={handlePrevPage} className="bg-[#f83f3a] text-white rounded-md p-2 px-4 hover:bg-[#e63946]">
                            Anterior
                        </button>
                    )}
                    {filteredRoomTypes.length > currentPage * itemsPerPage && (
                        <button onClick={handleNextPage} className="bg-[#f83f3a] text-white rounded-md p-2 px-4 hover:bg-[#e63946]">
                            Siguiente
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomTypesHotel;
