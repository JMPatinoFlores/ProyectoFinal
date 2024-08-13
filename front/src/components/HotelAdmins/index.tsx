"use client";

import { useContext, useEffect, useState } from "react";
import HotelAdmin from "@/components/HotelAdmin";
import { IHotelAdminDetails, IHotelAdminsProps } from "@/interfaces";
import { SuperAdminContext } from "@/context/superAdminContext";
import Link from "next/link";
import Sidebar from "../SidebarSuperAdmin";

const HotelAdmins = ({ searchQuery }: IHotelAdminsProps) => {
    const [hotelAdmins, setHotelAdmins] = useState<IHotelAdminDetails[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [filteredHotelAdmins, setFilteredHotelAdmins] = useState<IHotelAdminDetails[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHotelAdmin, setSelectedHotelAdmin] = useState<IHotelAdminDetails | null>(null);
    const [selectedHotelAdminToSend, setSelectedHotelAdminToSend] = useState<IHotelAdminDetails | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const { fetchHotelAdmins, fetchHotelAdminsBySearch, fetchUpdateHotelAdminDetails } = useContext(SuperAdminContext);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleViewDetails = (hotelAdmin: IHotelAdminDetails) => {
        setSelectedHotelAdmin(hotelAdmin);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedHotelAdmin(null);
    };

    const handleUpdateHotel = async () => {
        if (selectedHotelAdmin) {
            try {
                if (emailError) {
                    // If there is an email error, do not proceed with the update
                    console.log("Error: Email is invalid.");
                    return;
                }

                const response = await fetchUpdateHotelAdminDetails(selectedHotelAdmin.id, selectedHotelAdminToSend);
                if (response) {
                    const updatedHotelAdmins = hotelAdmins.map(hotelAdmin =>
                        hotelAdmin.id === selectedHotelAdmin.id ? selectedHotelAdmin : hotelAdmin
                    );
                    setHotelAdmins(updatedHotelAdmins);
                    handleCloseModal();
                } else {
                    alert('Hubo un error al actualizar el administrador de hotel.')
                }
            } catch (error) {
                console.log("Error updating hotel admin details: ", error);
            }
        }
    };

    useEffect(() => {
        fetchHotelAdmins().then((data) => {
            if (Array.isArray(data)) {
                setHotelAdmins(data);
            } else {
                console.error("fetchHotelAdmins did not return an array.");
                setHotelAdmins([]);
            }
        });
    }, [fetchHotelAdmins]);

    useEffect(() => {
        if (searchQuery) {
            fetchHotelAdminsBySearch(searchQuery).then((data) => {
                if (Array.isArray(data)) {
                    setFilteredHotelAdmins(data);
                } else {
                    console.error("fetchHotelAdminsBySearch did not return an array.");
                    setFilteredHotelAdmins([]);
                }
            });
        } else {
            setFilteredHotelAdmins(hotelAdmins);
        }
    }, [searchQuery, hotelAdmins, fetchHotelAdminsBySearch]);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (selectedHotelAdmin) {
            const { name, value } = e.target;

            if (name === "email") {
                // Validate email
                if (!validateEmail(value)) {
                    setEmailError("El correo electrónico no es válido.");
                } else {
                    setEmailError(null);
                }
            }

            if (name === "birthDate") {
                const validDate = (Number(value.split('-')[0]) > 1900) && (Number(value.split('-')[0])) < 2025
                if (validDate) {
                    const date = new Date(value).toISOString();
                    setSelectedHotelAdminToSend({
                        ...selectedHotelAdmin,
                        [name]: date
                    });
                }
            } else {
                setSelectedHotelAdminToSend({
                    ...selectedHotelAdmin,
                    [name]: value,
                });
                setSelectedHotelAdmin({
                    ...selectedHotelAdmin,
                    [name]: value,
                });
            }
        }
    };

    const paginatedHotelAdmins = Array.isArray(filteredHotelAdmins)
        ? filteredHotelAdmins.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
        : [];

    return (
        <div className="flex">
            {/* <Sidebar /> */}
            <div className="flex-1 p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-2xl text-center md:text-3xl font-bold flex-grow mb-4 md:mb-0">
                        Administradores de Hoteles
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {paginatedHotelAdmins.length > 0 ? (
                        paginatedHotelAdmins.map((hotelAdmin, index) => (
                            <HotelAdmin key={index} handleViewDetails={handleViewDetails} setFilteredHotelAdmins={setFilteredHotelAdmins} hotelAdmin={hotelAdmin} />
                        ))
                    ) : (
                        <p>No hay resultados que coincidan con su búsqueda.</p>
                    )}
                    {isModalOpen && selectedHotelAdmin && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                                <h2 className="text-xl text-center font-bold mb-4">
                                    Editar Administrador de Hotel
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-semibold">Nombre:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedHotelAdmin.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-semibold">Apellido:</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedHotelAdmin.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col mb-4">
                                        <div className="flex items-center mb-1">
                                            <label className="w-1/3 font-semibold">Email:</label>
                                            <input
                                                type="text"
                                                name="email"
                                                className="w-2/3 p-2 border rounded"
                                                value={selectedHotelAdmin.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        {emailError && <small className="text-end text-base text-red-500">{emailError}</small>}
                                    </div>


                                    <div className="flex items-center">
                                        <label className="w-1/3 font-semibold">Teléfono:</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedHotelAdmin.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-semibold">Fecha de nacimiento:</label>
                                        <input
                                            type="date"
                                            name="birthDate"
                                            className="w-2/3 p-2 border rounded"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-semibold">País:</label>
                                        <input
                                            type="text"
                                            name="country"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedHotelAdmin.country}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-semibold">Ciudad:</label>
                                        <input
                                            type="text"
                                            name="city"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedHotelAdmin.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-semibold">Dirección:</label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedHotelAdmin.address}
                                            onChange={handleInputChange}
                                        />
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
                {filteredHotelAdmins.length > itemsPerPage && (
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
                                currentPage >= Math.ceil(filteredHotelAdmins.length / itemsPerPage)
                            }
                        >
                            Siguiente
                        </button>
                        <span className="ml-4">
                            Página {currentPage} de{" "}
                            {Math.ceil(filteredHotelAdmins.length / itemsPerPage)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelAdmins;
