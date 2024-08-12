import { IBookingOfSuperAdmin, ICustomerDetails, IHotelAdminDetails, IHotelOfSuperAdmin } from "@/interfaces"

export const getAllCustomers = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No estás autorizado.");
  }

  try {
    const response = await fetch(
      "http://localhost:3000/customers/allCustomers",
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
    const response = await fetch(
      "http://localhost:3000/hotel-admins/AllHotelAdmins",
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
    const response = await fetch(
      `http://localhost:3000/hotel-admins/${hotelAdminId}`,
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
  const response = await fetch(`http://localhost:3000/customers/${customerId}`,
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
    const response = await fetch(
      `http://localhost:3000/hotel-admins/${hotelAdminId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${token}`,
        },
      }
    );
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
  const response = await fetch(`http://localhost:3000/customers/${customerId}`,
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
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No estás autorizado.");

  try {
    const response = await fetch(`http://localhost:3000/hotels/${hotelId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`,
      },
    });
    console.log(response);

    if (!response.ok) throw new Error("Error en la solicitud.");
    return true;
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};

export const updateHotelDetails = async (
  hotelId: string,
  selectedHotel: Partial<IHotelOfSuperAdmin>,
  hotelAdminId: string
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No estás autorizado.");

  try {
    const response = await fetch(`http://localhost:3000/hotels/${hotelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`,
      },
    });
    console.log(response);
    
    if (!response.ok) throw new Error('Error en la solicitud.')
    return true
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
}

export const deleteBookingOfCustomer = async (bookingId: string) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error('No estás autorizado.')
    const response = await fetch(`http://localhost:3000/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`
      }
    })
    console.log(response);

    if (!response.ok) throw new Error('Error en la solicitud.')
    return true
  }

export const updateBookingDetails = async (bookingId: string, selectedBooking: Partial<IBookingOfSuperAdmin> | null, customerId: string) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No estás autorizado.')
  const response = await fetch(`http://localhost:3000/bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${token}`
    },
    body: JSON.stringify(selectedBooking)
  })
  console.log(response);

  if (!response.ok) throw new Error('Error en la solicitud.')
  return true
}

export const updateHotelAdminDetails = async (hotelAdminId: string, selectedHotelAdmin: Partial<IHotelAdminDetails> | null) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error('No estás autorizado.')
  const response = await fetch(`http://localhost:3000/hotel-admins/${hotelAdminId}`, {
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
  const response = await fetch(`http://localhost:3000/customers/${customerId}`, {
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
    const response = await fetch("http://localhost:3000/bookings", {
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
