import { IHotelRegister } from "@/interfaces";

export const postHotel = async (hotel: IHotelRegister) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/hotels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(hotel),
  });
  const data = await response.json();
  return data;
};

export const postRoomType = async () => {
  const response = await fetch("http://localhost:3000/roomstype", {
    method: "POST",
  });
  const data = await response.json();
  return data;
};

export const postRoom = async () => {
  const response = await fetch("http://localhost:3000/rooms", {
    method: "POST",
  });
  const data = await response.json();
  return data;
};

export const getHotelById = async (hotelId: string) => {
  if (!hotelId) {
    throw new Error("Hotel ID is not available in local storage.");
  }

  const response = await fetch(`http://localhost:3000/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }
  const data = await response.json();  
  return data;
};

export const getHotels = async () => {
  const response = await fetch("http://localhost:3000/hotels");
  const data = await response.json();
  return data;
};

export const getHotelsBySearch = async (searchQuery:string) => {
  const response = await fetch(`http://localhost:3000/api/hotels/search?search=${searchQuery}`);
  const data = await response.json();
  return data;
};

export const getBookingByHotel = async (hotelId: string) => {
  const response = await fetch("#");
  const data = await response.json();
  return data;
};

export const getRoomsByHotel = async (hotelId: string) => {
  const response = await fetch("#");
  const data = await response.json();
  return data;
};
