"use client";

import { useContext, useEffect, useState } from "react";
import Customer from "@/components/CustomerSuperAdmin";
import { ICustomerDetails, ICustomersProps } from "@/interfaces";
import { SuperAdminContext } from "@/context/superAdminContext";
import Link from "next/link";
import Sidebar from "../SidebarSuperAdmin";

const Customers = ({ searchQuery }: ICustomersProps) => {
    const [customers, setCustomers] = useState<ICustomerDetails[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [filteredCustomers, setFilteredCustomers] = useState<ICustomerDetails[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomerDetails | null>(null);
    const [selectedCustomerToSend, setSelectedCustomerToSend] = useState<ICustomerDetails | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const { fetchCustomers, fetchCustomersBySearch, fetchUpdateCustomerDetails } = useContext(SuperAdminContext);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleViewDetails = (customer: ICustomerDetails) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCustomer(null);
    };

    const handleUpdateCustomer = async () => {
        if (selectedCustomer) {
            try {
                if (emailError) {
                    console.log("Error: Email is invalid.");
                    return;
                }

                const response = await fetchUpdateCustomerDetails(selectedCustomer.id, selectedCustomerToSend);
                if (response) {
                    const updatedCustomers = customers.map(customer =>
                        customer.id === selectedCustomer.id ? selectedCustomer : customer
                    );
                    setCustomers(updatedCustomers);
                    handleCloseModal();
                } else {
                    alert('Hubo un error al actualizar el cliente.')
                }
            } catch (error) {
                console.log("Error updating customer details: ", error);
            }
        }
    };

    useEffect(() => {
        fetchCustomers().then((data) => {
            if (Array.isArray(data)) {
                setCustomers(data);
            } else {
                console.error("fetchCustomers did not return an array.");
                setCustomers([]);
            }
        });
    }, [fetchCustomers]);

    useEffect(() => {
        if (searchQuery) {
            fetchCustomersBySearch(searchQuery).then((data) => {
                if (Array.isArray(data)) {
                    setFilteredCustomers(data);
                } else {
                    console.error("fetchCustomersBySearch did not return an array.");
                    setFilteredCustomers([]);
                }
            });
        } else {
            setFilteredCustomers(customers);
        }
    }, [searchQuery, customers, fetchCustomersBySearch]);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (selectedCustomer) {
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
                    setSelectedCustomerToSend({
                        ...selectedCustomer,
                        [name]: date
                    });
                }
            } else {
                setSelectedCustomerToSend({
                    ...selectedCustomer,
                    [name]: value,
                });
                setSelectedCustomer({
                    ...selectedCustomer,
                    [name]: value,
                });
            }
        }
    };

    const paginatedCustomers = Array.isArray(filteredCustomers)
        ? filteredCustomers.slice(
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
                        Clientes
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {paginatedCustomers.length > 0 ? (
                        paginatedCustomers.map((customer, index) => (
                            <Customer key={index} handleViewDetails={handleViewDetails} setFilteredCustomers={setFilteredCustomers} customer={customer} />
                        ))
                    ) : (
                        <p>No hay resultados que coincidan con su búsqueda.</p>
                    )}
                    {isModalOpen && selectedCustomer && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                                <h2 className="text-xl text-center font-bold mb-4">
                                    Editar Cliente
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-semibold">Nombre:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedCustomer.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-semibold">Apellido:</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedCustomer.lastName}
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
                                                value={selectedCustomer.email}
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
                                            value={selectedCustomer.phone}
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
                                            value={selectedCustomer.country}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-semibold">Ciudad:</label>
                                        <input
                                            type="text"
                                            name="city"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedCustomer.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-semibold">Dirección:</label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="w-2/3 p-2 border rounded"
                                            value={selectedCustomer.address}
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
                                        onClick={handleUpdateCustomer}
                                    >
                                        Guardar Cambios
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {filteredCustomers.length > itemsPerPage && (
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-[#f83f3a] text-white rounded-md p-1 px-2 mr-2 hover:bg-[#e63946]"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                        <button
                            className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                            onClick={handleNextPage}
                            disabled={currentPage * itemsPerPage >= filteredCustomers.length}
                        >
                            Siguiente
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Customers;
