"use client";

import {
  IBookingOfSuperAdmin,
  ICustomerDetails,
  IDecodedTokenSuperAdmin,
  IHotelAdminDetails,
  IHotelOfSuperAdmin,
  ILoginUser,
  ISuperAdmin,
  ISuperAdminContextType,
} from "@/interfaces";
import {
  deleteHotelAdmin,
  deleteHotelOfHotelAdmin,
  getAllBookings,
  getAllCustomers,
  getAllHotelAdmins,
  getHotelAdminById,
  updateHotelDetails,
} from "@/lib/server/fetchSuperAdmins";
import { postLogin } from "@/lib/server/fetchUsers";
import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useEffect, useState } from "react";

export const SuperAdminContext = createContext<ISuperAdminContextType>({
  superAdmin: null,
  setSuperAdmin: () => {},
  isLogged: false,
  setIsLogged: () => {},
  isSuperAdmin: false,
  setIsSuperAdmin: () => {},
  signIn: async () => false,
  fetchCustomers: async () => [],
  fetchBookings: async () => [],
  fetchHotelAdmins: async () => [],
  fetchDeleteHotelAdmin: async () => false,
  fetchHotelAdminById: async () => undefined,
  fetchDeleteHotelOfHotelAdmin: async () => false,
  fetchUpdateHotelDetails: async () => false,
  fetchHotelAdminsBySearch: async () => [],
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
