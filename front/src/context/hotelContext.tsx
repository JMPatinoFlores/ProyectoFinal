"use client";

import {
  IHotel,
  IHotelContextType,
  IHotelDetail,
  IHotelRegister,
} from "@/interfaces";
import {
  getBookingByHotel,
  getHotelById,
  getHotels,
  getHotelsByAdminId,
  getRoomsByHotel,
  postHotel,
  getHotelsBySearch,
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
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const fetchHotels = useCallback(async (): Promise<IHotelDetail[]> => {
    try {
      const data = await getHotels();
      setHotels(data);
      typeof window !== "undefined" &&
        localStorage.setItem("hotels", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }, []);

  const fetchBookingsByHotel = async (hotelId: string) => {
    try {
      const data = await getBookingByHotel(hotelId);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchHotelsBySearch = useCallback(
    async (searchQuery: string): Promise<IHotelDetail[]> => {
      try {
        const response = await fetch(
          `http://localhost:3000/hotels/search?search=${searchQuery}`
        );
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
    },
    []
  );

  const fetchHotelsByFilters = useCallback(
    async (queryParams: string): Promise<IHotelDetail[]> => {
      try {
        const response = await fetch(
          `http://localhost:3000/hotels/filters?${queryParams}`
        );
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

  const fetchHotelsByAdmin = useCallback(async (adminId: string) => {
    try {
      const data = await getHotelsByAdminId(adminId);
      setHotels(data);
      if (typeof window !== "undefined")
        localStorage.setItem("adminHotels", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }, []);

  const fetchRoomsByHotel = async (hotelId: string) => {
    try {
      const data = await getRoomsByHotel(hotelId);
      return data;
    } catch (error) {
      console.log(error);
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
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const hotels =
      typeof window !== "undefined" && localStorage.getItem("hotels");
    if (hotels) {
      setHotels(JSON.parse(hotels));
    } else {
      fetchHotels();
    }
  }, []);

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
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};
