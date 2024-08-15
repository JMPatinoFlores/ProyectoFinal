import { IBookingOfSuperAdmin, ICustomerDetails, IHotelAdminDetails, IHotelOfSuperAdmin, IRoomOfSuperAdmin, IRoomTypeOfSuperAdmin } from "@/interfaces"

export const getAllCustomers = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No estás autorizado.");
  }

  try {
    console.log('Ejecutando getAllCustomers');

    const response = await fetch(
      "https://back-rutaviajera.onrender.com/customers/allCustomers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error en la solicitud.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};

export const getAllHotelAdmins = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No estás autorizado.");
  }

  try {
    console.log('Ejecutando getAllHotelAdmins');

    const response = await fetch(
      "https://back-rutaviajera.onrender.com/hotel-admins/AllHotelAdmins",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error en la solicitud.");
    }
    const data = await response.json();
    console.log("fetchSuperAdmins: ", data);
    return data;
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};

export const deleteHotelAdmin = async (hotelAdminId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No estás autorizado.");

  try {
    console.log('Ejecutando deleteHotelAdmin');

    const response = await fetch(
      `https://back-rutaviajera.onrender.com/hotel-admins/${hotelAdminId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Error en la solicitud.");
    return true;
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};

export const deleteCustomer = async (customerId: string) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No estás autorizado.')
  console.log('Ejecutando deleteCustomer');

  const response = await fetch(`https://back-rutaviajera.onrender.com/customers/${customerId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`
      }
    }
  )
  if (!response.ok) throw new Error('Error en la solicitud.')
  return true
}

export const getHotelAdminById = async (
  hotelAdminId: string
): Promise<IHotelAdminDetails> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No estás autorizado.");

  try {
    console.log('Ejecutando getHotelAdminById');

    const response = await fetch(
      `https://back-rutaviajera.onrender.com/hotel-admins/${hotelAdminId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${token}`,
        },
      }
    );
    console.log(response);
    
    if (!response.ok) throw new Error("Error en la solicitud.");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};

export const getCustomerById = async (customerId: string): Promise<ICustomerDetails> => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No estás autorizado.')
  console.log('Ejecutando getCustomerById');

  const response = await fetch(`https://back-rutaviajera.onrender.com/customers/${customerId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`
      }
    })
  if (!response.ok) throw new Error('Error en la solicitud.')
  const data = await response.json()
  return data
}

export const deleteHotelOfHotelAdmin = async (hotelId: string) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No estás autorizado.')
  console.log('Ejecutando deleteHotelOfHotelAdmin');

  const response = await fetch(`https://back-rutaviajera.onrender.com/hotels/${hotelId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${token}`
    }
  })
  console.log(response);

  if (!response.ok) throw new Error("Error en la solicitud.");
  return true;
};

export const updateHotelDetails = async (
  hotelId: string,
  selectedHotel: Partial<IHotelOfSuperAdmin> | null
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No estás autorizado.");

  try {
    console.log('Ejecutando updateHotelDetails');

    const response = await fetch(`https://back-rutaviajera.onrender.com/hotels/${hotelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`,
      },
      body: JSON.stringify(selectedHotel)
    });
    console.log(response);

    if (!response.ok) throw new Error("Error en la solicitud.");
    return true;
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};

export const updateHotelAdminDetails = async (hotelAdminId: string, selectedHotelAdmin: Partial<IHotelAdminDetails> | null) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No estás autorizado.')
  console.log('Ejecutando updateHotelAdminDetails');

  const response = await fetch(`https://back-rutaviajera.onrender.com/hotel-admins/${hotelAdminId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${token}`
    },
    body: JSON.stringify(selectedHotelAdmin)
  })
  console.log(response);

  if (!response.ok) throw new Error('Error en la solicitud.')
  return true
}

export const updateCustomerDetails = async (customerId: string, selectedCustomer: Partial<ICustomerDetails> | null) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No estás autorizado.')
  console.log('Ejecutando updateCustomerDetails');

  const response = await fetch(`https://back-rutaviajera.onrender.com/customers/${customerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${token}`
    },
    body: JSON.stringify(selectedCustomer)
  })
  console.log(response);

  if (!response.ok) throw new Error('Error en la solicitud.')
  return true
}

export const getAllBookings = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    throw new Error("No estás autorizado.");
  }

  try {
    console.log('Ejecutando getAllBookings');

    const response = await fetch("https://back-rutaviajera.onrender.com/bookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};

export const getBookingsByCustomerId = async (customerId: string) => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    throw new Error("No estás autorizado.");
  }

  try {
    console.log('Ejecutando getBookingsByCustomerId');

    const response = await fetch(`https://back-rutaviajera.onrender.com/bookings/customer/${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
}

export const deleteBookingOfCustomer = async (bookingId: string) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No estás autorizado.')
  console.log('Ejecutando deleteBookingOfCustomer');

  const response = await fetch(`https://back-rutaviajera.onrender.com/bookings/softDelete/${bookingId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${token}`
    }
  })
  console.log(response);

  if (!response.ok) throw new Error("Error en la solicitud.");
  return true;
};

export const getHotelById = async (hotelId: string) => {
  try {
    console.log(hotelId);
    
    const token = localStorage.getItem("token")
    if (!token) throw new Error('No estás autorizado.')
    console.log('Ejecutando getHotelById');


    const response = await fetch(`https://back-rutaviajera.onrender.com/hotels/${hotelId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`
      }
    })

    if (!response.ok) throw new Error('Error al hacer la petición.')
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error en el getHotelById: ', error);
    
  }
}

export const deleteReviewOfHotel = async (reviewId: string) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) throw new Error('No estás autorizado.') 
    const response = await fetch(`https://back-rutaviajera.onrender.com/reviews/softDelete/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`
      }
    })
    if (!response.ok) throw new Error('Error al hacer la petición.')
    return true
  } catch (error) {
    console.log('Error en el deleteReviewOfHotel: ', error);
    return false
  }
}

export const deleteRoomTypeOfHotel = async (reviewId: string) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) throw new Error('No estás autorizado.')
    const response = await fetch(`https://back-rutaviajera.onrender.com/roomstype/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`
      }
    })
    if (!response.ok) throw new Error('Error al hacer la petición.')
    return true
  } catch (error) {
    console.log('Error en el deleteRoomTypeOfHotel: ', error);
    return false
  }
}

export const updateRoomTypeDetails = async (roomtypeId: string, selectedRoomType: Partial<IRoomTypeOfSuperAdmin> | null) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No estás autorizado.')
  console.log('Ejecutando updateCustomerDetails');

  const response = await fetch(`https://back-rutaviajera.onrender.com/roomstype/${roomtypeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${token}`
    },
    body: JSON.stringify(selectedRoomType)
  })
  console.log(response);

  if (!response.ok) throw new Error('Error en la solicitud.')
  return true
}

export const getRoomsByRoomTypeId = async (roomTypeId: string) => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    throw new Error("No estás autorizado.");
  }

  try {
    console.log('Ejecutando getRoomsByRoomTypeId');

    const response = await fetch(`https://back-rutaviajera.onrender.com/rooms/roomtype/${roomTypeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
}

export const deleteRoomById = async (roomId: string) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) throw new Error('No estás autorizado.')
    const response = await fetch(`https://back-rutaviajera.onrender.com/rooms/${roomId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`
      }
    })
    if (!response.ok) throw new Error('Error al hacer la petición.')
    return true
  } catch (error) {
    console.log('Error en el deleteRoomById: ', error);
    return false
  }
}

export const updateRoomDetails = async (roomId: string, selectedRoom: Partial<IRoomOfSuperAdmin>) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No estás autorizado.')
  console.log('Ejecutando updateRoomDetails');

  const response = await fetch(`https://back-rutaviajera.onrender.com/rooms/${roomId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${token}`
    },
    body: JSON.stringify(selectedRoom)
  })
  console.log(response);

  if (!response.ok) throw new Error('Error en la solicitud.')
  return true
}