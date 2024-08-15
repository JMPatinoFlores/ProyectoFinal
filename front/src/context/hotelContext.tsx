"use client";

import {
  IAdminHotel,
  IHotel,
  IHotelContextType,
  IHotelDetail,
  IHotelRegister,
} from "@/interfaces";
import {
  deleteHotel,
  getBookingByHotel,
  getHotelById,
  getHotels,
  fetchHotelsByAdminId,
  getRoomsByHotel,
  postHotel,
  updateHotel,
} from "@/lib/server/fetchHotels";
import { createContext, useCallback, useEffect, useState } from "react";

export const HotelContext = createContext<IHotelContextType>({
  hotels: null,
  setHotels: () => {},
  addHotel: async () => false,
  fetchHotels: async () => [],
  fetchBookingsByHotel: async () => [],
  fetchRoomsByHotel: async () => [],
  fetchHotelById: async () => null,
  fetchHotelsBySearch: async () => [],
  fetchHotelsByFilters: async () => [],
  fetchHotelsByAdmin: async () => [],
  updateHotelDetails: async () => false,
  deleteHotelById: async () => false,
});

export const HotelProvider = ({ children }: { children: React.ReactNode }) => {
  const [hotels, setHotels] = useState<IHotel[] | null>([]);

  const addHotel = async (hotel: IHotelRegister) => {
    try {
      const data = await postHotel(hotel);
      console.log("data:", data);

      if (data) {
        await fetchHotels();
        return true;
      }
      return true;
    } catch (error) {
      console.error("Error al agregar el hotel:", error);
      return false;
    }
  };

  const fetchHotels = useCallback(async (): Promise<IHotelDetail[]> => {
    try {
      const data = await getHotels();
      setHotels(data);
      if (typeof window !== "undefined") {
        localStorage.setItem("hotels", JSON.stringify(data));
      }
      return data;
    } catch (error) {
      console.error("Error al obtener hoteles:", error);
      return [];
    }
  }, []);

  const fetchBookingsByHotel = async (hotelId: string) => {
    try {
      const data = await getBookingByHotel(hotelId);
      return data;
    } catch (error) {
      console.error("Error al obtener reservas del hotel:", error);
      return [];
    }
  };

  const fetchHotelsBySearch = useCallback(
    async (searchQuery: string): Promise<IHotelDetail[]> => {
      try {
        const response = await fetch(
          `https://back-rutaviajera.onrender.com/hotels/search?search=${searchQuery}`
        );
        console.log(response);
        
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching hotels by search:", error);
        return [];
      }
    },
    []
  );

  const fetchHotelsByFilters = useCallback(
    async (queryParams: string): Promise<IHotelDetail[]> => {
      try {
        const response = await fetch(
          `http://localhost:3000/hotels/filters?${queryParams}`
        );
        console.log(response);
        
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          return data;
        } else {
          console.error("fetchHotelsByFilters did not return an array.");
          return [];
        }
      } catch (error) {
        console.error("Error fetching hotels by filters:", error);
        return [];
      }
    },
    []
  );

  const fetchHotelsByAdmin = useCallback(
    async (id: string): Promise<IHotel[]> => {
      try {
        const data = await fetchHotelsByAdminId(id);

        const filteredData = data.filter((hotel: IHotel) => !hotel.isDeleted);

        setHotels(filteredData);
        console.log(filteredData);
        return filteredData;
      } catch (error) {
        console.error("Error al obtener hoteles por admin:", error);
        setHotels([]);
        return [];
      }
    },
    []
  );

  const fetchRoomsByHotel = async (hotelId: string) => {
    try {
      const data = await getRoomsByHotel(hotelId);
      return data;
    } catch (error) {
      console.error("Error al obtener habitaciones del hotel:", error);
      return [];
    }
  };

  const fetchHotelById = async (
    hotelId: string
  ): Promise<IHotelDetail | null> => {
    try {
      const data = await getHotelById(hotelId);
      return data as IHotelDetail;
    } catch (error) {
      console.error("Error al obtener hotel por ID:", error);
      return null;
    }
  };

  const updateHotelDetails = async (
    hotelId: string,
    hotelData: Partial<IAdminHotel>
  ) => {
    try {
      const updatedHotel = await updateHotel(hotelId, hotelData);
      setHotels((prev) =>
        (prev ?? []).map((hotel) =>
          hotel.id === hotelId ? updatedHotel : hotel
        )
      );
      return true;
    } catch (error) {
      console.error("Error actualizando hotel:", error);
      return false;
    }
  };

  const deleteHotelById = async (hotelId: string): Promise<boolean> => {
    try {
      const success = await deleteHotel(hotelId);
      if (success) {
        setHotels(
          (prevHotels) =>
            prevHotels?.filter((hotel) => hotel.id !== hotelId) ?? []
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error eliminando hotel:", error);
      return false;
    }
  };

  useEffect(() => {
    const storedHotels =
      typeof window !== "undefined" && localStorage.getItem("hotels");
    if (storedHotels) {
      setHotels(JSON.parse(storedHotels));
    } else {
      fetchHotels();
    }
  }, [fetchHotels]);

  return (
    <HotelContext.Provider
      value={{
        hotels,
        setHotels,
        addHotel,
        fetchHotels,
        fetchBookingsByHotel,
        fetchRoomsByHotel,
        fetchHotelById,
        fetchHotelsBySearch,
        fetchHotelsByFilters,
        fetchHotelsByAdmin,
        updateHotelDetails,
        deleteHotelById,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};
