"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { SuperAdminContext } from "../../context/superAdminContext";
import { IAvailabilityOfSuperAdmin, IBookingOfSuperAdmin } from "@/interfaces";

interface BookingsSuperAdminProps {
    customerId: string;
}

const BookingsSuperAdmin = ({ customerId }: BookingsSuperAdminProps) => {
    const [customerName, setCustomerName] = useState<string>("");
    const [bookings, setBookings] = useState<IBookingOfSuperAdmin[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<IBookingOfSuperAdmin[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<IBookingOfSuperAdmin | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const { fetchCustomerById, fetchBookingsByCustomerId, fetchDeleteBookingOfCustomer } = useContext(SuperAdminContext);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        if (customerId) {
            const fetchData = async () => {
                const bookings = await fetchBookingsByCustomerId(customerId);
                const customer = await fetchCustomerById(customerId)
                if (bookings && customer) {
                    setBookings(bookings);
                    setCustomerName(`${customer.name} ${customer.lastName}`);
                } else {
                    console.warn('No data found for the given customerId');
                }
            };
            fetchData();
        }
    }, [customerId]);

    useEffect(() => {
        setFilteredBookings(bookings);
    }, [bookings]);

    const handleViewDetails = (booking: IBookingOfSuperAdmin) => {
        const bookingDateArray = new Date(booking.date).toISOString().split('T')[0].split('-')
        let toSumToIndex = 1
        bookingDateArray.forEach((data, index) => {
            bookingDateArray.unshift(bookingDateArray[index + toSumToIndex])
            toSumToIndex += 1
        })
        bookingDateArray.pop()
        bookingDateArray.pop()
        bookingDateArray.shift()
        
        const bookingDate = bookingDateArray.join('/')
        const availabilities: Partial<IAvailabilityOfSuperAdmin>[] = []
        booking.bookingDetails.availabilities.forEach(availability => {
            if (availability.startDate && availability.endDate) {
                const bookingAvailabilityStartDateArray = new Date(availability.startDate).toISOString().split('T')[0].split('-')
                let toSumToIndexStartDate = 1
                bookingAvailabilityStartDateArray.forEach((data, index) => {
                    bookingAvailabilityStartDateArray.unshift(bookingAvailabilityStartDateArray[index + toSumToIndexStartDate])
                    toSumToIndexStartDate += 1
                })
                
                bookingAvailabilityStartDateArray.pop()
                bookingAvailabilityStartDateArray.pop()
                bookingAvailabilityStartDateArray.shift()

                const bookingAvailabilityEndDateArray = new Date(availability.endDate).toISOString().split('T')[0].split('-')
                let toSumToIndexEndDate = 1
                bookingAvailabilityEndDateArray.forEach((data, index) => {
                    bookingAvailabilityEndDateArray.unshift(bookingAvailabilityEndDateArray[index + toSumToIndexEndDate])
                    toSumToIndexEndDate += 1
                })
                bookingAvailabilityEndDateArray.pop()
                bookingAvailabilityEndDateArray.pop()
                bookingAvailabilityEndDateArray.shift()
                const newAvailability = {
                    startDate: bookingAvailabilityStartDateArray.join('/'),
                    endDate: bookingAvailabilityEndDateArray.join('/')
                }
                availabilities.push(newAvailability)
            }
            
        })
        setSelectedBooking({...booking, date: bookingDate, bookingDetails: {...booking.bookingDetails, availabilities}});
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const paginatedBookings = Array.isArray(filteredBookings)
        ? filteredBookings.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
        : [];
    console.log(paginatedBookings);
    

    return (
        <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl text-center md:text-3xl font-bold flex-grow mb-4 md:mb-0">
                    Reservas de {customerName}
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {paginatedBookings.length > 0 ? paginatedBookings.map((booking) => (
                    <div key={booking.id} className="relative p-4 bg-gray-100 rounded-lg shadow-md flex flex-col">
                        <div className="mb-2">
                            <h3 className="text-lg font-semibold">Reserva de {booking.customer.name} {booking.customer.lastName}</h3>
                            <p>Fecha: {booking.date}</p>
                            <p>Hotel: {booking.bookingDetails.hotel.name}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            <button
                                className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                                onClick={() => handleViewDetails(booking)}
                            >
                                Ver Detalles
                            </button>
                            <button
                                className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                                onClick={async () => {
                                    const confirmed = window.confirm("¿Estás seguro que quieres eliminar esta reserva? Se cancelará y eliminará al mismo tiempo.");
                                    if (!confirmed) return;
                                    try {
                                        const response = await fetchDeleteBookingOfCustomer(booking.id, customerId);
                                        if (response) {
                                            const bookings = await fetchBookingsByCustomerId(customerId);
                                            if (bookings) setBookings(bookings);
                                        } else {
                                            alert('Hubo un error al eliminar la reserva.')
                                        }
                                    } catch (error) {
                                        console.log("Error deleting booking: ", error);
                                    }
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                )) : (<p>No hay resultados que coincidan con su búsqueda.</p>)}

                {isModalOpen && selectedBooking && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
                            <h2 className="text-xl text-center font-bold mb-4">Detalles de Reserva</h2>
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10">
                                <div className="w-full md:w-1/2 max-w-[600px]">
                                    <div className="h-6"></div>

                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-semibold">Fecha:</label>
                                        <p className="w-2/3 p-2 border rounded bg-gray-100">{selectedBooking.date}</p>
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-semibold">Precio:</label>
                                        <p className="w-2/3 p-2 border rounded bg-gray-100">{Number(selectedBooking.bookingDetails.total)}</p>
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-semibold">Estado:</label>
                                        <p className="w-2/3 p-2 border rounded bg-gray-100">{selectedBooking.bookingDetails.status}</p>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 max-w-[600px]">
                                    <div className="flex flex-col items-center mb-2">
                                        <label className="font-semibold">Períodos Reservados:</label>
                                        <table className="table-auto border-collapse w-full">
                                            <thead>
                                                <tr>
                                                    <th className="border px-4 py-2">Check In</th>
                                                    <th className="border px-4 py-2">Check Out</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedBooking.bookingDetails.availabilities.map((period, index) => (
                                                    <tr key={index}>
                                                        <td className="border px-4 py-2">{period.startDate}</td>
                                                        <td className="border px-4 py-2">{period.endDate}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-4">
                {currentPage > 1 && (
                    <button
                        className="bg-gray-300 text-black rounded-md p-1 px-2 mr-2 hover:bg-gray-400"
                        onClick={handlePrevPage}
                    >
                        Página Anterior
                    </button>
                )}
                {currentPage * itemsPerPage < filteredBookings.length && (
                    <button
                        className="bg-gray-300 text-black rounded-md p-1 px-2 hover:bg-gray-400"
                        onClick={handleNextPage}
                    >
                        Página Siguiente
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookingsSuperAdmin;
