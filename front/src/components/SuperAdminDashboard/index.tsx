"use client";

import { SuperAdminContext } from "@/context/superAdminContext";
import { IBookingDetails, IBookingOfSuperAdmin, ICustomerDetails, ICustomerOfSuperAdmin, IHotelAdminDetails, ISuperAdminDashboardProps } from "@/interfaces";
import Link from "next/link";
import { SetStateAction, useContext, useEffect, useState } from "react";

export default function SuperAdmin() {
    const { fetchBookings } = useContext(SuperAdminContext);

    const [totalCustomers, setTotalCustomers] = useState<number>(0)
    const [totalBookings, setTotalBookings] = useState<number>(0)
    const [totalEarnings, setTotalEarnings] = useState<number>(0)

    useEffect(() => {
        fetchBookings().then((data) => {
            if (Array.isArray(data)) {
                setTotalBookings(data.length)
                
            } else {
                console.error("fetchBookings did not return an array.")
                setTotalBookings(0)
            }
        })
    }, [fetchBookings])

    useEffect(() => {
        fetchBookings().then((data) => {
            if (Array.isArray(data)) {
                let total: number = 0
                for (const booking of data) {
                    total = total + booking.bookingDetails.total
                }
                total = (total * 20) / 100
                setTotalEarnings(total)
            } else {
                console.error("fetchBookings did not return an array.")
                setTotalEarnings(0)
            }
        })
    }, [fetchBookings])

    useEffect(() => {
        fetchBookings().then((data) => {
            if (Array.isArray(data)) {
                const customers: ICustomerOfSuperAdmin[] = []
                for (const booking of data) {
                    customers.push(booking.customer)
                }
                const uniqueCustomers = Array.from(new Set(customers));
                setTotalCustomers(uniqueCustomers.length)
            } else {
                console.error("fetchCustomers did not return an array.")
                setTotalCustomers(0)
            }
        })
    }, [fetchBookings])

    return (
        <div className="p-6 border border-gray-300 rounded-lg">
            {/* Title for the statistics section */}
            <h2 className="text-xl text-center font-bold mb-4">Estadísticas</h2>

            {/* Statistics Section */}
            <div className="p-6 border border-gray-300 rounded-lg mb-8">
                <div className="flex justify-between">
                    <div className="flex-1 text-center">
                        <h3 className="text-lg font-semibold">Cantidad de Clientes</h3>
                        <p className="text-2xl">{totalCustomers}</p>
                    </div>
                    <div className="flex-1 text-center">
                        <h3 className="text-lg font-semibold">Cantidad de Reservas</h3>
                        <p className="text-2xl">{totalBookings}</p>
                    </div>
                    <div className="flex-1 text-center">
                        <h3 className="text-lg font-semibold">Ingresos</h3>
                        <p className="text-2xl">USD {totalEarnings}</p>
                    </div>
                </div>
            </div>

            {/* Title for the functions section */}
            <h2 className="text-xl text-center font-bold mb-4">Funciones</h2>

            {/* Functions Section */}
            <div className="p-6 border border-gray-300 rounded-lg">
                <div className="flex justify-between">
                    <div className="flex-1 mx-2 text-center">
                        <Link href="/clientesSuperAdmin" className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
                            <h4 className="text-md font-semibold">Clientes</h4>
                            <p className="text-sm text-gray-600">
                                Haz click para crear, editar y eliminar clientes, y mirar los datos de sus reservas.
                            </p>
                        </Link>
                    </div>
                    <div className="flex-1 mx-2 text-center">
                        <Link href="/hotelAdminsSuperAdmin" className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
                            <h4 className="text-md font-semibold">Administradores de Hoteles</h4>
                            <p className="text-sm text-gray-600">
                                Haz click para ver, crear, editar y eliminar administradores de hoteles, junto con sus hoteles y las reseñas de estos.
                            </p>
                        </Link>
                    </div>
                    <div className="flex-1 mx-2 text-center">
                        <Link href="/superAdminsSuperAdmin" className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
                            <h4 className="text-md font-semibold">Super Admins</h4>
                            <p className="text-sm text-gray-600">Haz click para crear super admins.</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}