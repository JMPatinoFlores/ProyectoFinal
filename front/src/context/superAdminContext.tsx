"use client";

import {
  IBookingDetails,
  IBookingOfSuperAdmin,
  ICustomerDetails,
  IDecodedTokenSuperAdmin,
  IHotelAdminDetails,
  IHotelOfSuperAdmin,
  ILoginUser,
  ISuperAdmin,
  ISuperAdminContextType
} from "@/interfaces";
import {
  deleteBookingOfCustomer,
  deleteCustomer,
  deleteHotelAdmin,
  deleteHotelOfHotelAdmin,
  getAllBookings,
  getAllCustomers,
  getAllHotelAdmins,
  getBookingsByCustomerId,
  getCustomerById,
  getHotelAdminById,
  updateBookingDetails,
  updateCustomerDetails,
  updateHotelAdminDetails,
  updateHotelDetails
} from "@/lib/server/fetchSuperAdmins";
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
  fetchBookingsByCustomerId: async (customerId: string) => Promise.resolve([] as IBookingOfSuperAdmin[]),
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

export const SuperAdminProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [customers, setCustomers] = useState<ICustomerDetails[]>([]);
  const [hotelAdmins, setHotelAdmins] = useState<IHotelAdminDetails[]>([]);
  const [hotels, setHotels] = useState<IHotelOfSuperAdmin[]>([]);
  const [bookings, setBookings] = useState<IBookingOfSuperAdmin[]>([]);
  const [superAdmin, setSuperAdmin] = useState<ISuperAdmin | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const signIn = async (credentials: ILoginUser): Promise<boolean> => {
    try {
      const data = await postLogin(credentials);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLogged(true);
        const decodedToken = jwtDecode<IDecodedTokenSuperAdmin>(data.token);
        setIsSuperAdmin(decodedToken.superAdmin);
        localStorage.setItem("superAdmin", JSON.stringify(decodedToken));
        setSuperAdmin(decodedToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error during sign in:", error);
      return false;
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

  const fetchBookings = useCallback(async (): Promise<IBookingOfSuperAdmin[]> => {
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
      const response = await fetch(`http://localhost:3000/customers/search?search=${searchQuery}`);
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
  }, []);

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

  const fetchDeleteHotelAdmin = async (hotelAdminId: string): Promise<boolean> => {
    try {
      const success = await deleteHotelAdmin(hotelAdminId);
      if (success) {
        setHotelAdmins(prev => prev.filter(admin => admin.id !== hotelAdminId));
      }
      return success;
    } catch (error) {
      console.error("Error deleting hotel admin:", error);
      return false;
    }
  };

  const fetchDeleteCustomer = useCallback(async (customerId: string): Promise<boolean> => {
    try {
      const deleted = await deleteCustomer(customerId);
      if (deleted) {
        const data = await getAllCustomers();
        setCustomers(data);
        typeof window !== "undefined" && localStorage.setItem("customersSuperAdmin", JSON.stringify(data));
        return true;
      }
      return false;
    } catch (error) {
      console.log("Error en fetchDeleteCustomer: ", error);
      return false;
    }
  }, []);

  const fetchHotelAdminById = async (hotelAdminId: string): Promise<IHotelAdminDetails | undefined> => {
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
      return customer;
    } catch (error) {
      console.log("Error en el fetchCustomerById: ", error);
      return undefined;
    }
  }, []);

  const fetchDeleteHotelOfHotelAdmin = async (hotelId: string): Promise<boolean> => {
    try {
      const success = await deleteHotelOfHotelAdmin(hotelId);
      if (success) {
        setHotels(prev => prev.filter(hotel => hotel.id !== hotelId));
      }
      return success;
    } catch (error) {
      console.error("Error deleting hotel:", error);
      return false;
    }
  };

  const fetchUpdateHotelDetails = async (hotelId: string, selectedHotel: Partial<IHotelOfSuperAdmin> | null, hotelAdminId: string): Promise<boolean> => {
    try {
      const success = await updateHotelDetails(hotelId, selectedHotel);
      if (success) {
        setHotels(prev => prev.map(hotel => hotel.id === hotelId ? { ...hotel, ...selectedHotel } : hotel));
      }
      return success;
    } catch (error) {
      console.error("Error updating hotel details:", error);
      return false;
    }
  };

  const fetchDeleteBookingOfCustomer = useCallback(async (bookingId: string, customerId: string): Promise<boolean> => {
    try {
      const deleted = await deleteBookingOfCustomer(bookingId);
      console.log(deleted);
      
      if (deleted) {
        const data = await getCustomerById(customerId);
        setBookings(data.bookings);
        typeof window !== "undefined" && localStorage.setItem("bookingsCustomerSuperAdmin", JSON.stringify(data?.bookings ?? []));
        return true;
      }
      return false;
    } catch (error) {
      console.log("Error en fetchDeleteBookingCustomer: ", error);
      return false;
    }
  }, []);

  const fetchUpdateBookingDetails = useCallback(async (bookingId: string, selectedBooking: Partial<IBookingOfSuperAdmin> | null, customerId: string): Promise<boolean> => {
    try {
      const success = await updateBookingDetails(bookingId, selectedBooking, customerId);
      if (success) {
        setBookings(prev => prev.map(booking => booking.id === bookingId ? { ...booking, ...selectedBooking } : booking));
      }
      return success;
    } catch (error) {
      console.error("Error updating booking details:", error);
      return false;
    }
  }, []);

  const fetchUpdateHotelAdminDetails = useCallback(async (hotelAdminId: string, selectedHotelAdmin: Partial<IHotelAdminDetails> | null): Promise<boolean> => {
    try {
      const success = await updateHotelAdminDetails(hotelAdminId, selectedHotelAdmin);
      console.log(success);
      
      if (success) {
        setHotelAdmins(prev => prev.map(admin => admin.id === hotelAdminId ? { ...admin, ...selectedHotelAdmin } : admin));
      }
      return success;
    } catch (error) {
      console.error("Error updating hotel admin details:", error);
      return false;
    }
  }, []);

  const fetchUpdateCustomerDetails = useCallback(async (customerId: string, selectedCustomer: Partial<ICustomerDetails> | null): Promise<boolean> => {
    try {
      const success = await updateCustomerDetails(customerId, selectedCustomer);
      if (success) {
        setCustomers(prev => prev.map(customer => customer.id === customerId ? { ...customer, ...selectedCustomer } : customer));
      }
      return success;
    } catch (error) {
      console.error("Error updating customer details:", error);
      return false;
    }
  }, []);

  const fetchHotelAdminsBySearch = useCallback(async (searchQuery: string): Promise<IHotelAdminDetails[]> => {
    try {
      const response = await fetch(`http://localhost:3000/hotel-admins/search?search=${searchQuery}`);
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      
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
  }, []);

  const fetchBookingsByCustomerId = useCallback(async (customerId: string): Promise<IBookingOfSuperAdmin[]> => {
    try {
      const data = await getBookingsByCustomerId(customerId);
      setBookings(data);
      localStorage.setItem("bookings", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error fetching bookings of customer:", error);
      return [];
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
        fetchCustomers,
        fetchBookings,
        fetchBookingsByCustomerId,
        fetchHotelAdmins,
        fetchDeleteHotelAdmin,
        fetchDeleteCustomer,
        fetchHotelAdminById,
        fetchCustomerById,
        fetchDeleteHotelOfHotelAdmin,
        fetchDeleteBookingOfCustomer,
        fetchUpdateHotelDetails,
        fetchUpdateBookingDetails,
        fetchUpdateHotelAdminDetails,
        fetchUpdateCustomerDetails,
        fetchHotelAdminsBySearch,
        fetchCustomersBySearch
      }}
    >
      {children}
    </SuperAdminContext.Provider>
  );
};
