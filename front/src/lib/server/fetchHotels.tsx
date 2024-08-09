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
  const response = await fetch(`http://localhost:3000/hotels/${hotelId}`);
  const data = await response.json();
  return data;
};

export const getHotelsByAdminId = async (adminId: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  const response = await fetch(
    `http://localhost:3000/hotels-admin/${adminId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Error en la solicitud: ${response.status} - ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
};

export const getHotels = async () => {
  const response = await fetch("http://localhost:3000/hotels");
  const data = await response.json();
  return data;
};

export const getHotelsBySearch = async (searchQuery: string) => {
  const response = await fetch(
    `http://localhost:3000/api/hotels/search?search=${searchQuery}`
  );
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
