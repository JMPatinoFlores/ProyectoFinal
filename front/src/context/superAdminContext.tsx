"use client";

import { IBookingDetails, IBookingOfSuperAdmin, ICustomerDetails, IDecodedTokenSuperAdmin, IHotelAdminDetails, IHotelAdminsProps, IHotelOfSuperAdmin, ILoginUser, ISuperAdmin, ISuperAdminContextType } from "@/interfaces";
import { deleteBookingOfCustomer, deleteCustomer, deleteHotelAdmin, deleteHotelOfHotelAdmin, getAllBookings, getAllCustomers, getAllHotelAdmins, getCustomerById, getHotelAdminById, updateBookingDetails, updateCustomerDetails, updateHotelAdminDetails, updateHotelDetails } from "@/lib/server/fetchSuperAdmins";
import { postLogin } from "@/lib/server/fetchUsers";
import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useEffect, useState } from "react";

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
    fetchDeleteCustomer: async (customerId: string) => Promise.resolve(false),
    fetchHotelAdminById: async (hotelAdminId: string) => Promise.resolve(undefined),
    fetchCustomerById: async (customerId: string) => Promise.resolve(undefined),
    fetchDeleteHotelOfHotelAdmin: async (hotelId: string) => Promise.resolve(false),
    fetchDeleteBookingOfCustomer: async (bookingId: string) => Promise.resolve(false),
    fetchUpdateHotelDetails: async (hotelId: string, selectedHotel: Partial<IHotelOfSuperAdmin> | null, hotelAdminId: string) => Promise.resolve(false),
    fetchUpdateBookingDetails: async (bookingId: string, selectedBooking: Partial<IBookingOfSuperAdmin> | null, customerId: string) => Promise.resolve(false),
    fetchUpdateHotelAdminDetails: async (hotelAdminId: string, selectedHotelAdmin: Partial<IHotelAdminDetails> | null) => Promise.resolve(false),
    fetchUpdateCustomerDetails: async (customerId: string, selectedCustomer: Partial<ICustomerDetails> | null) => Promise.resolve(false),
    fetchHotelAdminsBySearch: async (searchQuery: string) => Promise.resolve([] as IHotelAdminDetails[]),
    fetchCustomersBySearch: async (searchQuery: string) => Promise.resolve([] as ICustomerDetails[])
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
  };

  const fetchCustomers = useCallback(async (): Promise<ICustomerDetails[]> => {
    try {
      const data = await getAllCustomers();
      setCustomers(data);
      localStorage.setItem("customers", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      return [];
    }
  }, []);

  const fetchBookings = useCallback(async (): Promise<
    IBookingOfSuperAdmin[]
  > => {
    try {
      const data = await getAllBookings();
      setBookings(data);
      localStorage.setItem("bookings", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return [];
    }
  }, []);

const fetchCustomersBySearch = useCallback(async (searchQuery: string): Promise<ICustomerDetails[]> => {
  try {
    const response = await fetch(
      `http://localhost:3000/customers/search?search=${searchQuery}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("fetchCustomersBySearch did not return an array.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching customers by search:", error);
    return [];
  }
}, [])

  const fetchHotelAdmins = useCallback(async (): Promise<
    IHotelAdminDetails[]
  > => {
    try {
      const data = await getAllHotelAdmins();
      setHotelAdmins(data);
      localStorage.setItem("hotelAdmins", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error fetching hotel admins:", error);
      return [];
    }
  }, []);

  const fetchDeleteHotelAdmin = async (
    hotelAdminId: string
  ): Promise<boolean> => {
    try {
      const success = await deleteHotelAdmin(hotelAdminId);
      if (success) {
        setHotelAdmins((prev) =>
          prev.filter((admin) => admin.id !== hotelAdminId)
        );
      }
      return success;
    } catch (error) {
      console.error("Error deleting hotel admin:", error);
      return false;
    }
  };

const fetchDeleteCustomer = useCallback(async (customerId: string): Promise<boolean> => {
  try {
    const deleted = await deleteCustomer(customerId)
    if (deleted) {
      const data = await getAllCustomers()
      setCustomers(data)
      typeof window !== "undefined" && localStorage.setItem("customersSuperAdmin", JSON.stringify(data))
      return true
    }
    return false
  } catch (error) {
    console.log("Error en fetchDeleteCustomer: ", error);
    return false
  }
}, [])

  const fetchHotelAdminById = async (
    hotelAdminId: string
  ): Promise<IHotelAdminDetails | undefined> => {
    try {
      const data = await getHotelAdminById(hotelAdminId);
      return data;
    } catch (error) {
      console.error("Error fetching hotel admin by ID:", error);
      return undefined;
    }
  };

const fetchCustomerById = useCallback(async (customerId: string): Promise<ICustomerDetails | undefined> => {
  try {
    const customer = await getCustomerById(customerId);
    if (customer) {
      // Assuming you need to map or transform IHotelDetail to IHotelOfSuperAdmin
      return customer
    }
    return undefined;
  } catch (error) {
    console.log("Error en el fetchCustomerById: ", error);
    return undefined;
  }
}, []);

  const fetchDeleteHotelOfHotelAdmin = async (
    hotelId: string
  ): Promise<boolean> => {
    try {
      const success = await deleteHotelOfHotelAdmin(hotelId);
      if (success) {
        setHotels((prev) => prev.filter((hotel) => hotel.id !== hotelId));
      }
      return success;
    } catch (error) {
      console.error("Error deleting hotel:", error);
      return false;
    }
  };

  const fetchUpdateHotelDetails = async (
    hotelId: string,
    selectedHotel: Partial<IHotelOfSuperAdmin>,
    hotelAdminId: string
  ): Promise<boolean> => {
    try {
      const success = await updateHotelDetails(
        hotelId,
        selectedHotel,
        hotelAdminId
      );
      if (success) {
        setHotels((prev) =>
          prev.map((hotel) =>
            hotel.id === hotelId ? { ...hotel, ...selectedHotel } : hotel
          )
        );
      }
      return success;
    } catch (error) {
      console.error("Error updating hotel details:", error);
      return false;
    }
  };

const fetchDeleteBookingOfCustomer = useCallback(async (bookingId: string, customerId: string): Promise<boolean> => {
  try {
    const deleted = await deleteBookingOfCustomer(bookingId)
    if (deleted) {
      const data = await getCustomerById(customerId)
      setBookings(data.bookings)
      typeof window !== "undefined" && localStorage.setItem("bookingsCustomerSuperAdmin", JSON.stringify(data.bookings))
      return true
    }
    return false
  } catch (error) {
    console.log("Error en fetchDeleteBookingCustomer: ", error);
    return false
  }
}, [])

const fetchUpdateBookingDetails = useCallback(async (bookingId: string, selectedBooking: Partial<IBookingOfSuperAdmin> | null, customerId: string): Promise<boolean> => {
  try {
    const updated = await updateBookingDetails(bookingId, selectedBooking, customerId)
    if (updated) {
      const data = await getCustomerById(customerId)
      if (data) {
        typeof window !== "undefined" && localStorage.setItem("bookingsCustomerSuperAdmin", JSON.stringify(data.bookings))
        return true
      }
      return false
    }
    return false
  } catch (error) {
    console.log('Error en fetchUpdateBookingDetails: ', error);
    return false
  }
}, [])

const fetchUpdateBookingDetails = useCallback(async (bookingId: string, selectedBooking: Partial<IBookingOfSuperAdmin> | null, customerId: string): Promise<boolean> => {
  try {
    const updated = await updateBookingDetails(bookingId, selectedBooking, customerId)
    if (updated) {
      const data = await getCustomerById(customerId)
      if (data) {
        typeof window !== "undefined" && localStorage.setItem("bookingsCustomerSuperAdmin", JSON.stringify(data.bookings))
        return true
      }
      return false
    }
    return false
  } catch (error) {
    console.log('Error en fetchUpdateBookingDetails: ', error);
    return false
  }
}, [])

const fetchUpdateCustomerDetails = useCallback(async (customerId: string, selectedCustomer: Partial<ICustomerDetails> | null): Promise<boolean> => {
  try {
    const updated = await updateCustomerDetails(customerId, selectedCustomer)
    if (updated) {
      const data = await getAllCustomers()
      if (data) {
        typeof window !== "undefined" && localStorage.setItem("customerOfSuperAdmin", JSON.stringify(data))
        return true
      }
      return false
    }
    return false
  } catch (error) {
    console.log('Error en fetchUpdateCustomerDetails: ', error);
    return false
  }
}, [])


  const fetchHotelAdminsBySearch = async (
    searchQuery: string
  ): Promise<IHotelAdminDetails[]> => {
    try {
      const response = await fetch(
        `http://localhost:3000/hotel-admins/search?search=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching hotel admins by search:", error);
      return [];
    }
};
  
const fetchUpdateBookingDetails = useCallback(async (bookingId: string, selectedBooking: Partial<IBookingOfSuperAdmin> | null, customerId: string): Promise<boolean> => {
  try {
    const updated = await updateBookingDetails(bookingId, selectedBooking, customerId)
    if (updated) {
      const data = await getCustomerById(customerId)
      if (data) {
        typeof window !== "undefined" && localStorage.setItem("bookingsCustomerSuperAdmin", JSON.stringify(data.bookings))
        return true
      }
      return false
    }
    return false
  } catch (error) {
    console.log('Error en fetchUpdateBookingDetails: ', error);
    return false
  }
}, [])

const fetchUpdateCustomerDetails = useCallback(async (customerId: string, selectedCustomer: Partial<ICustomerDetails> | null): Promise<boolean> => {
  try {
    const updated = await updateCustomerDetails(customerId, selectedCustomer)
    if (updated) {
      const data = await getAllCustomers()
      if (data) {
        typeof window !== "undefined" && localStorage.setItem("customerOfSuperAdmin", JSON.stringify(data))
        return true
      }
      return false
    }
    return false
  } catch (error) {
    console.log('Error en fetchUpdateCustomerDetails: ', error);
    return false
  }
}, [])

  useEffect(() => {
    if (isSuperAdmin) {
      const customers =
        typeof window !== "undefined" && localStorage.getItem("customers");
      if (customers) {
        setCustomers(JSON.parse(customers));
      } else {
        fetchCustomers();
      }
    }
  }, [fetchCustomers, isSuperAdmin]);

  useEffect(() => {
    if (isSuperAdmin) {
      const hotelAdmins =
        typeof window !== "undefined" && localStorage.getItem("hotelAdmins");
      if (hotelAdmins) {
        setHotelAdmins(JSON.parse(hotelAdmins));
      } else {
        fetchHotelAdmins();
      }
    }
  }, [fetchHotelAdmins, isSuperAdmin]);

  useEffect(() => {
    if (isSuperAdmin) {
      const bookings =
        typeof window !== "undefined" && localStorage.getItem("bookings");
      if (bookings) {
        setBookings(JSON.parse(bookings));
      } else {
        fetchBookings();
      }
    }
  }, [fetchBookings, isSuperAdmin]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLogged(true);
        const decodedToken = jwtDecode<IDecodedTokenSuperAdmin>(token);
        setIsSuperAdmin(decodedToken.superAdmin);
      } else {
        setIsLogged(false);
      }
      const superAdmin = localStorage.getItem("superAdmin");
      if (superAdmin) {
        setSuperAdmin(JSON.parse(superAdmin) as ISuperAdmin);
      } else {
        setSuperAdmin(null);
      }
    }
  }, []);

  return (
    <SuperAdminContext.Provider
      value={{
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
      }}
    >
      {children}
    </SuperAdminContext.Provider>
  );
};
