import { IHotelRegister } from "@/interfaces";

export const postHotel = async (hotel: Omit<IHotelRegister, "hotelId">) => {
    const response = await fetch("http://localhost:3000/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotel),
    });
    const data = await response.json();
    return data;
}

export const getHotelById = async (hotelId: string) => {
    const response = await fetch("http://localhost:3000/hotels/27ba17fe-c872-4729-b82e-8501a0137c41")
    const data = await response.json();
    return data;
}

export const getHotels = async () => {
    const response = await fetch("http://localhost:3000/hotels");
    const data = await response.json();
    return data;
}

export const getBookingByHotel = async (hotelId: string) => {
    const response = await fetch("#");
    const data = await response.json();
    return data;
}

export const getRoomsByHotel = async (hotelId: string) => {
    const response = await fetch("#");
    const data = await response.json()
    return data;
}