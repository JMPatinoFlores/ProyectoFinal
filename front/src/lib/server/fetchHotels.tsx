import { ICreateBooking, IHotelRegister, IRoomType } from "@/interfaces";

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

export const postRoomType = async (roomType: IRoomType) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/roomstype", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(roomType),
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

// export const getHotelById = async () => {
//   const { hotelId } =
//     typeof window !== "undefined" && localStorage.getItem("id");
//   const response = await fetch(`http://localhost:3000/hotels/${hotelId}`);
//   const data = await response.json();
//   return data;
// };

export const getHotels = async () => {
  const response = await fetch("http://localhost:3000/hotels");
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

export const postBooking = async (booking: ICreateBooking) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(booking),
  });
  const data = await response.json();
  return data;
};