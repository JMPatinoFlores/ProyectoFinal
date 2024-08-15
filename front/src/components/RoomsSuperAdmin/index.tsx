"use client";

import { useEffect, useState } from "react";
import { useContext } from "react";
import { SuperAdminContext } from "../../context/superAdminContext";
import { IRoomOfSuperAdmin } from "@/interfaces";
import Modal from "../ModalRooms"; // Import the Modal component
import Sidebar from "../SidebarSuperAdmin";

interface RoomsOfRoomTypeProps {
    roomTypeId: string;
    searchQuery: string;
}

const RoomsOfRoomType = ({ roomTypeId, searchQuery }: RoomsOfRoomTypeProps) => {
    const [rooms, setRooms] = useState<IRoomOfSuperAdmin[]>([]);
    const [filteredRooms, setFilteredRooms] = useState<IRoomOfSuperAdmin[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(18); // 10 rooms per column, 3 columns, 2 sets = 30 rooms per page
    const { fetchRoomsByRoomTypeId, fetchDeleteRoom, fetchUpdateRoom, fetchRoomsBySearch } = useContext(SuperAdminContext);
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
    const [newRoomNumber, setNewRoomNumber] = useState<string>("");

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        if (roomTypeId) {
            const fetchData = async () => {
                const data = await fetchRoomsByRoomTypeId(roomTypeId);
                if (data) {
                    setRooms(data);
                    setFilteredRooms(data);
                } else {
                    console.warn('No data found for the given roomTypeId');
                }
            };
            fetchData();
        }
    }, [roomTypeId]);

    useEffect(() => {
        if (searchQuery) {
            fetchRoomsBySearch(roomTypeId, searchQuery).then((data) => {
                if (Array.isArray(data)) {
                    console.log(data);

                    setFilteredRooms(data);
                } else {
                    console.error("fetchRoomsBySearch did not return an array.");
                    setFilteredRooms([]);
                }
            });
        } else {
            setFilteredRooms(rooms);
        }
    }, [searchQuery, rooms, fetchRoomsBySearch]);

    const handleDeleteRoom = async (roomId: string) => {
        const confirmed = window.confirm("¿Estás seguro que quieres eliminar esta habitación?");
        if (!confirmed) return;
        try {
            const response = await fetchDeleteRoom(roomId);
            if (response) {
                const updatedRooms = rooms.filter(room => room.id !== roomId);
                setRooms(updatedRooms);
                setFilteredRooms(updatedRooms);
            } else {
                alert('Hubo un error al eliminar la habitación.')
            }
        } catch (error) {
            console.log("Error deleting room: ", error);
        }
    };

    const handleUpdateRoom = async (roomId: string, newRoomNumber: string) => {
        try {
            const response = await fetchUpdateRoom(roomId, { roomNumber: newRoomNumber });
            if (response) {
                const updatedRooms = rooms.map(room =>
                    room.id === roomId ? { ...room, roomNumber: newRoomNumber } : room
                );
                setRooms(updatedRooms);
                setFilteredRooms(updatedRooms);
            } else {
                alert('Hubo un error al actualizar la habitación.')
            }
        } catch (error) {
            console.log("Error updating room: ", error);
        }
    };

    const openModal = (roomId: string, currentRoomNumber: string) => {
        setSelectedRoomId(roomId);
        setNewRoomNumber(currentRoomNumber);
        setIsModalOpen(true);
    };

    const handleModalConfirm = (newRoomNumber: string) => {
        if (selectedRoomId) {
            handleUpdateRoom(selectedRoomId, newRoomNumber);
        }
        setIsModalOpen(false);
    };

    const paginatedRooms = Array.isArray(filteredRooms)
        ? filteredRooms.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
        : [];

    return (
        <div className="flex">
            <Sidebar setSidebarVisible={setSidebarVisible} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />

            <div className="p-8 w-full">
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
                        Habitaciones
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Responsive columns */}
                    {paginatedRooms.map((room) => (
                        <div key={room.id} className="border-b border-r border-l border-t border-gray-350 flex flex-col md:grid md:grid-cols-3 gap-2"> {/* Responsive layout for room items */}
                            <span className="font-semibold w-full p-2 text-center bg-gray-200 rounded-md">Número: {room.roomNumber}</span>
                            <button
                                className="bg-[#f83f3a] text-white rounded-md p-2 w-full hover:bg-[#e63946]"
                                onClick={() => handleDeleteRoom(room.id)}
                            >
                                Eliminar
                            </button>
                            <button
                                className="bg-[#f83f3a] text-white rounded-md p-2 w-full hover:bg-[#e63946]"
                                onClick={() => openModal(room.id, room.roomNumber)}
                            >
                                Actualizar
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center space-x-4 mt-6">
                    {currentPage > 1 && (
                        <button onClick={handlePrevPage} className="bg-[#f83f3a] text-white rounded-md p-2 px-4 hover:bg-[#e63946]">
                            Anterior
                        </button>
                    )}
                    {filteredRooms.length > currentPage * itemsPerPage && (
                        <button onClick={handleNextPage} className="bg-[#f83f3a] text-white rounded-md p-2 px-4 hover:bg-[#e63946]">
                            Siguiente
                        </button>
                    )}
                </div>
            </div>
            {/* Render the modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleModalConfirm}
                defaultValue={newRoomNumber}
            />
        </div>
    );
};

export default RoomsOfRoomType;
