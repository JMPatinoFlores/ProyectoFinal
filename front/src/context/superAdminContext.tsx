"use client";

import { IBookingDetails, IBookingOfSuperAdmin, ICustomerDetails, IDecodedTokenSuperAdmin, IHotelAdminDetails, IHotelAdminsProps, IHotelOfSuperAdmin, ILoginUser, ISuperAdmin, ISuperAdminContextType } from "@/interfaces";
import { deleteHotelAdmin, deleteHotelOfHotelAdmin, getAllBookings, getAllCustomers, getAllHotelAdmins, getHotelAdminById, updateHotelDetails } from "@/lib/server/fetchSuperAdmins";
import { postLogin } from "@/lib/server/fetchUsers";
import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useEffect, useState } from "react";
import { boolean } from "yup";

export const SuperAdminContext = createContext<ISuperAdminContextType>({
    superAdmin: null,
    setSuperAdmin: () => { },
    isLogged: false,
    setIsLogged: () => { },
    isSuperAdmin: false,
    setIsSuperAdmin: () => { },
    signIn: async () => false,
    fetchCustomers: async () => Promise.resolve([] as ICustomerDetails[]),
    fetchBookings: async () => Promise.resolve([] as IBookingOfSuperAdmin[]),
    fetchHotelAdmins: async () => Promise.resolve([] as IHotelAdminDetails[]),
    fetchDeleteHotelAdmin: async (hotelAdminId: string) => Promise.resolve(false),
    fetchHotelAdminById: async (hotelAdminId: string) => Promise.resolve(undefined),
    fetchDeleteHotelOfHotelAdmin: async (hotelId: string) => Promise.resolve(false),
    fetchUpdateHotelDetails: async (hotelId: string, selectedHotel: Partial<IHotelOfSuperAdmin>, hotelAdminId: string) => Promise.resolve(false),
    fetchHotelAdminsBySearch: async (searchQuery: string) => Promise.resolve([] as IHotelAdminDetails[])
});


export const SuperAdminProvider = ({ children }: { children: React.ReactNode }) => {
    const [customers, setCustomers] = useState<ICustomerDetails[]>([])
    const [hotelAdmins, setHotelAdmins] = useState<IHotelAdminDetails[]>([])
    const [hotels, setHotels] = useState<IHotelOfSuperAdmin[]>([])
    const [bookings, setBookings] = useState<IBookingOfSuperAdmin[]>([])
    const [superAdmin, setSuperAdmin] = useState<ISuperAdmin | null>(null)
    const [isLogged, setIsLogged] = useState(false)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)

    const signIn = async (credentials: ILoginUser) => {
        try {
            const data = await postLogin(credentials)
            console.log(data);
            if (data.token) {
                const decodedToken = jwtDecode<IDecodedTokenSuperAdmin>(data.token)
                console.log(decodedToken);
                console.log(data.user);
                const superAdmin: ISuperAdmin = {
                    id: decodedToken.id,
                    name: decodedToken.name,
                    email: decodedToken.email,
                    superAdmin: decodedToken.superAdmin,
                }
                setSuperAdmin(superAdmin)
                console.log(superAdmin);
                localStorage.setItem("superAdmin", JSON.stringify(superAdmin))
                setIsLogged(true)
                setIsSuperAdmin(decodedToken.superAdmin)
                localStorage.setItem("token", data.token)
                return true
            }
            return false
        } catch (error) {
            console.error('Error en el inicio de sesión: ', error)
            return false
        }
    }

    const fetchCustomers = useCallback(async (): Promise<ICustomerDetails[]> => {
        try {
            console.log('fetchCustomers');

            const data = await getAllCustomers();
            setCustomers(data);
            typeof window !== "undefined" &&
                localStorage.setItem("customers", JSON.stringify(data));
            return data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }, []);

    const fetchHotelAdmins = useCallback(async (): Promise<IHotelAdminDetails[]> => {
        try {
            const data = await getAllHotelAdmins();
            setHotelAdmins(data);
            typeof window !== "undefined" &&
                localStorage.setItem("hotelAdminsSuperAdmin", JSON.stringify(data));
            return data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }, []);

    const fetchDeleteHotelAdmin = useCallback(async (hotelAdminId: string): Promise<boolean> => {
        try {
            const deleted = await deleteHotelAdmin(hotelAdminId)
            if (deleted) {
                const data = await getAllHotelAdmins()
                setHotelAdmins(data)
                typeof window !== "undefined" && localStorage.setItem("hotelAdminsSuperAdmin", JSON.stringify(data))
                return true
            }
            return false
        } catch (error) {
            console.log("Error en fetchDeleteHotelAdmin: ", error);
            return false
        }
    }, [])

    const fetchHotelAdminById = useCallback(async (hotelAdminId: string): Promise<IHotelAdminDetails | undefined> => {
        try {
            const hotelAdmin = await getHotelAdminById(hotelAdminId);
            if (hotelAdmin) {
                // Assuming you need to map or transform IHotelDetail to IHotelOfSuperAdmin
                return hotelAdmin
            }
            return undefined;
        } catch (error) {
            console.log("Error en el fetchHotelAdminById: ", error);
            return undefined;
        }
    }, []);

    const fetchDeleteHotelOfHotelAdmin = useCallback(async (hotelId: string, hotelAdminId: string): Promise<boolean> => {
        try {
            const deleted = await deleteHotelOfHotelAdmin(hotelId)
            if (deleted) {
                const data = await getHotelAdminById(hotelAdminId)
                setHotels(data.hotels)
                typeof window !== "undefined" && localStorage.setItem("hotelsHotelAdminSuperAdmin", JSON.stringify(data.hotels))
                return true
            }
            return false
        } catch (error) {
            console.log("Error en fetchDeleteHotelOfHotelAdmin: ", error);
            return false
        }
    }, [])

    const fetchUpdateHotelDetails = useCallback(async (hotelId: string, selectedHotel: Partial<IHotelOfSuperAdmin>, hotelAdminId: string): Promise<boolean> => {
        try {
            const updated = await updateHotelDetails(hotelId, selectedHotel, hotelAdminId)
            if (updated) {
                const data = await getHotelAdminById(hotelAdminId)
                if (data) {
                    typeof window !== "undefined" && localStorage.setItem("hotelsHotelAdminSuperAdmin", JSON.stringify(data.hotels))
                    return true
                }
                return false
            }
            return false
        } catch (error) {
            console.log('Error en fetchUpdateHotelDetails: ', error);
            return false
        }
    }, [])


    const fetchBookings = useCallback(async (): Promise<IBookingOfSuperAdmin[]> => {
        try {
            const data = await getAllBookings();
            setBookings(data);
            typeof window !== "undefined" &&
                localStorage.setItem("bookings", JSON.stringify(data));
            return data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }, []);

    const fetchHotelAdminsBySearch = useCallback(
        async (searchQuery: string): Promise<IHotelAdminDetails[]> => {
            try {
                const response = await fetch(
                    `http://localhost:3000/hotel-admins/search?search=${searchQuery}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    return data;
                } else {
                    console.error("fetchHotelAdminsBySearch did not return an array.");
                    return [];
                }
            } catch (error) {
                console.error("Error fetching hotel admins by search:", error);
                return [];
            }
        },
        []
    );

    useEffect(() => {
        const customers =
            typeof window !== "undefined" && localStorage.getItem("customers");
        if (customers) {
            setCustomers(JSON.parse(customers));
        } else {
            fetchCustomers();
        }
    }, []);

    useEffect(() => {
        const hotelAdmins =
            typeof window !== "undefined" && localStorage.getItem("hotelAdmins");
        if (hotelAdmins) {
            setHotelAdmins(JSON.parse(hotelAdmins));
        } else {
            fetchHotelAdmins();
        }
    }, []);

    useEffect(() => {
        const bookings =
            typeof window !== "undefined" && localStorage.getItem("bookings");
        if (bookings) {
            setBookings(JSON.parse(bookings));
        } else {
            fetchBookings();
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token")
            if (token) {
                setIsLogged(true)
                const decodedToken = jwtDecode<IDecodedTokenSuperAdmin>(token)
                setIsSuperAdmin(decodedToken.superAdmin)
            } else {
                setIsLogged(false)
            }
            const superAdmin = localStorage.getItem("superAdmin")
            if (superAdmin) {
                setSuperAdmin(JSON.parse(superAdmin) as ISuperAdmin)
            } else {
                setSuperAdmin(null)
            }
        }
    }, [])
    return (
        <SuperAdminContext.Provider value={{
            superAdmin,
            setSuperAdmin,
            isLogged,
            setIsLogged,
            isSuperAdmin,
            setIsSuperAdmin,
            signIn,
            fetchBookings,
            fetchCustomers,
            fetchHotelAdmins,
            fetchDeleteHotelAdmin,
            fetchHotelAdminById,
            fetchDeleteHotelOfHotelAdmin,
            fetchUpdateHotelDetails,
            fetchHotelAdminsBySearch,
        }} >{children}</SuperAdminContext.Provider>
    )
}