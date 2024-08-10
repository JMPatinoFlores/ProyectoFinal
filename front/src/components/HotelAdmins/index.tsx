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
    const { fetchHotelAdmins, fetchHotelAdminsBySearch } = useContext(SuperAdminContext);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
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
                    console.error("fetchHotelsBySearch did not return an array.");
                    setFilteredHotelAdmins([]);
                }
            });
        } else {
            setFilteredHotelAdmins(hotelAdmins);
        }
    }, [searchQuery, hotelAdmins, fetchHotelAdminsBySearch]);

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
                    <h1 className="text-2xl md:text-3xl font-bold flex-grow mb-4 md:mb-0">
                        Administradores de Hoteles
                    </h1>
                    <Link
                        href={`/hotelAdmins/crear`}
                        className="bg-[#f83f3a] text-white rounded-md p-2 px-4 hover:bg-[#e63946] text-lg"
                    >
                        Crear Administrador de Hotel
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {paginatedHotelAdmins.length > 0 ? (
                        paginatedHotelAdmins.map((hotelAdmin, index) => (
                            <HotelAdmin key={index} hotelAdmin={hotelAdmin} />
                        ))
                    ) : (
                        <p>No hay resultados que coincidan con su búsqueda.</p>
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
