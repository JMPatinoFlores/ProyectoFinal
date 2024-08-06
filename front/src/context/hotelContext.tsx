"use client"

import { IHotel, IHotelContextType, IHotelDetail, IHotelRegister } from "@/interfaces"
import { getBookingByHotel, getHotelById, getHotels, getRoomsByHotel, postHotel, getHotelsBySearch } from "@/lib/server/fetchHotels"
import { createContext, useEffect, useState } from "react"

export const HotelContext = createContext<IHotelContextType>({
    hotels: null,
    setHotels: () => {},
    addHotel: async () => false,
    fetchHotels: async () => [],
    fetchBookingsByHotel: async () => [],
    fetchRoomsByHotel: async () => [],
    fetchHotelById: async () => null,
    fetchHotelsBySearch: async() =>[],
})

export const HotelProvider = ({ children }: { children: React.ReactNode }) => {
    const [hotels, setHotels] = useState<IHotel[] | null>(null)

    const addHotel = async (hotel: IHotelRegister) => {
        try {
            const data = await postHotel(hotel);
            console.log("data:", data);
            
            if(data) {
                await fetchHotels();
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    };


    const fetchHotels = async (): Promise<IHotelDetail[]> => {
        try {
          const data = await getHotels();
          typeof window !== "undefined" && localStorage.setItem("hotels", JSON.stringify(data))
          return data;
        } catch (error) {
          console.log(error);
          return []; // Return an empty array if there's an error
        }
      };

    const fetchBookingsByHotel = async (hotelId: string) => {
        try {
            const data = await getBookingByHotel(hotelId)
            return data;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const  fetchHotelsBySearch = async (searchQuery:string)=>{
        try{
            const data = await getHotelsBySearch(searchQuery)
            typeof window !== "undefined" && localStorage.setItem("hotels", JSON.stringify(data))
            return data;
        }catch(error){
            console.log(error);
            return [];            
        }
    }

    const fetchRoomsByHotel = async (hotelId: string) => {
        try {
            const data = await getRoomsByHotel(hotelId);
            return data;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const fetchHotelById = async (hotelId: string): Promise<IHotelDetail | null>=> {
        try {
            const data = await getHotelById(hotelId)
            return data as IHotelDetail;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    useEffect(() => {
        const hotels = typeof window !== "undefined" && localStorage.getItem("hotels");
        if (hotels) {
            setHotels(JSON.parse(hotels));
        } else {
            fetchHotels();
        }
    }, []) 

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
            }}
        >
            {children}
        </HotelContext.Provider>
    )
}