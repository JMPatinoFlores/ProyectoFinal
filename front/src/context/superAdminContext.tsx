"use client";

import {
  IBookingDetails,
  IBookingOfSuperAdmin,
  ICustomerDetails,
  IDecodedTokenSuperAdmin,
  IHotelAdminDetails,
  IHotelOfSuperAdmin,
  ILoginUser,
  IReviewOfSuperAdmin,
  IRoomOfSuperAdmin,
  IRoomTypeOfSuperAdmin,
  ISuperAdmin,
  ISuperAdminContextType,
} from "@/interfaces";
import {
  deleteBookingOfCustomer,
  deleteCustomer,
  deleteHotelAdmin,
  deleteHotelOfHotelAdmin,
  deleteReviewOfHotel,
  deleteRoomById,
  deleteRoomTypeOfHotel,
  getAllBookings,
  getAllCustomers,
  getAllHotelAdmins,
  getBookingsByCustomerId,
  getCustomerById,
  getHotelAdminById,
  getHotelById,
  getRoomsByRoomTypeId,
  updateCustomerDetails,
  updateHotelAdminDetails,
  updateHotelDetails,
  updateRoomDetails,
  updateRoomTypeDetails,
} from "@/lib/server/fetchSuperAdmins";
import { postLogin } from "@/lib/server/fetchUsers";
import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useEffect, useState } from "react";

// Create SuperAdmin context
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
  fetchBookingsByCustomerId: async (customerId: string) =>
    Promise.resolve([] as IBookingOfSuperAdmin[]),
  fetchHotelAdmins: async () => Promise.resolve([] as IHotelAdminDetails[]),
  fetchDeleteHotelAdmin: async (hotelAdminId: string) =>
    Promise.resolve(false),
  fetchDeleteReviewOfHotel: async (reviewId: string) => Promise.resolve(false),
  fetchDeleteCustomer: async (customerId: string) => Promise.resolve(false),
  fetchHotelAdminById: async (hotelAdminId: string) =>
    Promise.resolve(undefined),
  fetchCustomerById: async (customerId: string) =>
    Promise.resolve(undefined),
  fetchHotelById: async (hotelId: string) => Promise.resolve(undefined),
  fetchDeleteHotelOfHotelAdmin: async (hotelId: string) =>
    Promise.resolve(false),
  fetchDeleteBookingOfCustomer: async (bookingId: string) =>
    Promise.resolve(false),
  fetchUpdateHotelDetails: async (
    hotelId: string,
    selectedHotel: Partial<IHotelOfSuperAdmin> | null,
    hotelAdminId: string
  ) => Promise.resolve(false),
  fetchUpdateHotelAdminDetails: async (
    hotelAdminId: string,
    selectedHotelAdmin: Partial<IHotelAdminDetails> | null
  ) => Promise.resolve(false),
  fetchUpdateCustomerDetails: async (
    customerId: string,
    selectedCustomer: Partial<ICustomerDetails> | null
  ) => Promise.resolve(false),
  fetchHotelAdminsBySearch: async (searchQuery: string) =>
    Promise.resolve([] as IHotelAdminDetails[]),
  fetchHotelsBySearch: async (hotelAdminId: string, searchQuery: string) => Promise.resolve([] as IHotelOfSuperAdmin[]),
  fetchCustomersBySearch: async (searchQuery: string) =>
    Promise.resolve([] as ICustomerDetails[]),
  fetchReviewsBySearch: async (hotelId: string, searchQuery: string) => Promise.resolve([] as IReviewOfSuperAdmin[]),
  fetchDeleteRoomTypeOfHotel: async (roomtypeId: string) => Promise.resolve(false),
  fetchUpdateRoomTypeDetails: async (roomtypeId: string, selectedRoomType: Partial<IRoomTypeOfSuperAdmin> | null) => Promise.resolve(false),
  fetchRoomTypesBySearch: async (hotelId: string, searchQuery: string) => Promise.resolve([] as IRoomTypeOfSuperAdmin[]),
  fetchRoomsByRoomTypeId: async (roomTypeId: string) => Promise.resolve([] as IRoomOfSuperAdmin[]),
  fetchDeleteRoom: async (roomId: string) => Promise.resolve(false),
  fetchUpdateRoom: async (roomId: string, selectedRoom: Partial<IRoomOfSuperAdmin>) => Promise.resolve(false),
  fetchRoomsBySearch: async (roomTypeId: string, searchQuery: string) => Promise.resolve([] as IRoomOfSuperAdmin[])
});

// SuperAdmin Provider
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

  const fetchCustomersBySearch = useCallback(
    async (searchQuery: string): Promise<ICustomerDetails[]> => {
      try {
        const response = await fetch(
          `https://back-rutaviajera.onrender.com/customers/search?search=${searchQuery}`
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
    },
    []
  );

  const fetchHotelAdmins = useCallback(async (): Promise<IHotelAdminDetails[]> => {
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

  const fetchDeleteCustomer = useCallback(
    async (customerId: string): Promise<boolean> => {
      try {
        const deleted = await deleteCustomer(customerId);
        if (deleted) {
          const data = await getAllCustomers();
          setCustomers(data);
          localStorage.setItem("customersSuperAdmin", JSON.stringify(data));
          return true;
        }
        return false;
      } catch (error) {
        console.log("Error en fetchDeleteCustomer: ", error);
        return false;
      }
    },
    []
  );

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

  const fetchCustomerById = useCallback(
    async (customerId: string): Promise<ICustomerDetails | undefined> => {
      try {
        const customer = await getCustomerById(customerId);
        return customer;
      } catch (error) {
        console.log("Error en el fetchCustomerById: ", error);
        return undefined;
      }
    },
    []
  );

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
    selectedHotel: Partial<IHotelOfSuperAdmin> | null,
    hotelAdminId: string
  ): Promise<boolean> => {
    try {
      const success = await updateHotelDetails(hotelId, selectedHotel);
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

  const fetchDeleteBookingOfCustomer = useCallback(
    async (bookingId: string, customerId: string): Promise<boolean> => {
      try {
        const deleted = await deleteBookingOfCustomer(bookingId);
        if (deleted) {
          const data = await getCustomerById(customerId);
          if (data) {
            setCustomers((prev) =>
              prev.map((customer) =>
                customer.id === customerId ? { ...customer, ...data } : customer
              )
            );
          }
          return true;
        }
        return false;
      } catch (error) {
        console.log("Error en fetchDeleteBookingOfCustomer: ", error);
        return false;
      }
    },
    []
  );

  const fetchUpdateHotelAdminDetails = async (
    hotelAdminId: string,
    selectedHotelAdmin: Partial<IHotelAdminDetails> | null
  ): Promise<boolean> => {
    try {
      const success = await updateHotelAdminDetails(
        hotelAdminId,
        selectedHotelAdmin
      );
      if (success) {
        setHotelAdmins((prev) =>
          prev.map((admin) =>
            admin.id === hotelAdminId ? { ...admin, ...selectedHotelAdmin } : admin
          )
        );
      }
      return success;
    } catch (error) {
      console.error("Error updating hotel admin details:", error);
      return false;
    }
  };

  const fetchUpdateCustomerDetails = useCallback(
    async (
      customerId: string,
      selectedCustomer: Partial<ICustomerDetails> | null
    ): Promise<boolean> => {
      try {
        const updated = await updateCustomerDetails(
          customerId,
          selectedCustomer
        );
        if (updated) {
          const data = await getAllCustomers();
          setCustomers(data);
          localStorage.setItem("customersSuperAdmin", JSON.stringify(data));
          return true;
        }
        return false;
      } catch (error) {
        console.log("Error en el fetchUpdateCustomerDetails: ", error);
        return false;
      }
    },
    []
  );

  const fetchBookingsByCustomerId = useCallback(async (customerId: string): Promise<IBookingOfSuperAdmin[]> => {
    try {
      const data = await getBookingsByCustomerId(customerId);
      setBookings(data);
      localStorage.setItem("bookingsSuperAdmin", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error fetching hotel admins:", error);
      return [];
    }
  }, []);

  const fetchHotelAdminsBySearch = useCallback(
    async (searchQuery: string): Promise<IHotelAdminDetails[]> => {
      try {
        const response = await fetch(
          `https://back-rutaviajera.onrender.com/hotel-admins/search?search=${searchQuery}`
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
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<IDecodedTokenSuperAdmin>(token);
      setIsLogged(true);
      setIsSuperAdmin(decodedToken.superAdmin);
      setSuperAdmin(decodedToken);
    }
  }, []);
  
  const fetchHotelById = useCallback(
    async (hotelId: string): Promise<IHotelOfSuperAdmin | undefined> => {
      try {
        const hotel = await getHotelById(hotelId);
        return hotel;
      } catch (error) {
        console.log("Error en el fetchHotelById: ", error);
        return undefined;
      }
    },
    []
  );

  const fetchDeleteReviewOfHotel = useCallback(
    async (reviewId: string): Promise<boolean> => {
        const updated = await deleteReviewOfHotel(reviewId);
        return updated;
    },
    []
  );

  const fetchHotelsBySearch = useCallback(
    async (hotelAdminId: string, searchQuery: string): Promise<IHotelOfSuperAdmin[]> => {
      try {
        const response = await fetch(
          `https://back-rutaviajera.onrender.com/hotels/search?hotelAdminId=${hotelAdminId}&search=${searchQuery}`
        );
        console.log(response);
        
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          return data;
        } else {
          console.error("fetchHotelsBySearch did not return an array.");
          return [];
        }
      } catch (error) {
        console.error("Error fetching hotels by search:", error);
        return [];
      }
    }, []
  )

  const fetchReviewsBySearch = useCallback(
    async (hotelId: string, searchQuery: string): Promise<IReviewOfSuperAdmin[]> => {
      try {
        const response = await fetch(
          `https://back-rutaviajera.onrender.com/reviews/search?search=${searchQuery}&hotelId=${hotelId}`
        );
        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          return data;
        } else {
          console.error("fetchReviewsBySearch did not return an array.");
          return [];
        }
      } catch (error) {
        console.error("Error fetching reviews by search:", error);
        return [];
      }
    }, []
  )

  const fetchDeleteRoomTypeOfHotel = useCallback(
    async (roomtypeId: string): Promise<boolean> => {
      const deleted = await deleteRoomTypeOfHotel(roomtypeId);
      return deleted;
    },
    []
  );

  const fetchUpdateRoomTypeDetails = useCallback(
    async (
      roomtypeId: string,
      selectedRoomType: Partial<IRoomTypeOfSuperAdmin> | null
    ): Promise<boolean> => {
      try {
        const updated = await updateRoomTypeDetails(
          roomtypeId,
          selectedRoomType
        );
        if (updated) {
          return true;
        }
        return false;
      } catch (error) {
        console.log("Error en el fetchUpdateRoomTypeDetails: ", error);
        return false;
      }
    },
    []
  );

  const fetchRoomTypesBySearch = useCallback(
    async (hotelId: string, searchQuery: string): Promise<IRoomTypeOfSuperAdmin[]> => {
      try {
        const response = await fetch(
          `https://back-rutaviajera.onrender.com/roomstype/search?search=${searchQuery}&hotelId=${hotelId}`
        );
        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          return data;
        } else {
          console.error("fetchRroomTypesBySearch did not return an array.");
          return [];
        }
      } catch (error) {
        console.error("Error fetching room types by search:", error);
        return [];
      }
    }, []
  )

  const fetchRoomsByRoomTypeId = useCallback(async (roomTypeId: string): Promise<IRoomOfSuperAdmin[]> => {
    try {
      const data = await getRoomsByRoomTypeId(roomTypeId);
      return data;
    } catch (error) {
      console.error("Error fetching rooms of room type:", error);
      return [];
    }
  }, []);

  const fetchDeleteRoom = useCallback(
    async (roomId: string): Promise<boolean> => {
      const deleted = await deleteRoomById(roomId);
      return deleted;
    },
    []
  );

  const fetchUpdateRoom = useCallback(
    async (
      roomId: string,
      selectedRoom: Partial<IRoomOfSuperAdmin>
    ): Promise<boolean> => {
      try {
        const updated = await updateRoomDetails(
          roomId,
          selectedRoom
        );
        if (updated) {
          return true;
        }
        return false;
      } catch (error) {
        console.log("Error en el fetchUpdateRoom: ", error);
        return false;
      }
    },
    []
  );

  const fetchRoomsBySearch = useCallback(
    async (roomTypeId: string, searchQuery: string): Promise<IRoomOfSuperAdmin[]> => {
      try {
        const response = await fetch(
          `https://back-rutaviajera.onrender.com/rooms/search?search=${searchQuery}&roomTypeId=${roomTypeId}`
        );
        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          return data;
        } else {
          console.error("fetchRoomsBySearch did not return an array.");
          return [];
        }
      } catch (error) {
        console.error("Error fetching reviews by search:", error);
        return [];
      }
    }, []
  )

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
        fetchHotelById,
        fetchDeleteHotelOfHotelAdmin,
        fetchDeleteBookingOfCustomer,
        fetchUpdateHotelDetails,
        fetchUpdateHotelAdminDetails,
        fetchUpdateCustomerDetails,
        fetchHotelAdminsBySearch,
        fetchCustomersBySearch,
        fetchDeleteReviewOfHotel,
        fetchHotelsBySearch,
        fetchReviewsBySearch,
        fetchDeleteRoomTypeOfHotel,
        fetchUpdateRoomTypeDetails,
        fetchRoomTypesBySearch,
        fetchRoomsByRoomTypeId,
        fetchDeleteRoom,
        fetchUpdateRoom,
        fetchRoomsBySearch
      }}
    >
      {children}
    </SuperAdminContext.Provider>
  );
};
