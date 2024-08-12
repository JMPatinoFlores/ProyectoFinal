import { IHotelAdminDetails, IHotelOfSuperAdmin } from "@/interfaces"

export const getAllCustomers = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error('No estás autorizado.')
    }

    const response = await fetch("http://localhost:3000/customers/allCustomers", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
    if (!response.ok) {
        throw new Error('Error en la solicitud.')
    }
    const data = await response.json();
    return data
}

export const getAllHotelAdmins = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error('No estás autorizado.')
    }

    const response = await fetch("http://localhost:3000/hotel-admins/AllHotelAdmins", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
    if (!response.ok) {
        throw new Error('Error en la solicitud.')
    }
    const data = await response.json();
    console.log('fetchSuperAdmins: ', data);

    return data
}

export const deleteHotelAdmin = async (hotelAdminId: string) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error('No estás autorizado.')
    const response = await fetch(`http://localhost:3000/hotel-admins/${hotelAdminId}`,
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

export const getHotelAdminById = async (hotelAdminId: string): Promise<IHotelAdminDetails> => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error('No estás autorizado.')
    const response = await fetch(`http://localhost:3000/hotel-admins/${hotelAdminId}`,
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
    const response = await fetch(`http://localhost:3000/hotels/${hotelId}`, {
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

export const updateHotelDetails = async (hotelId: string, selectedHotel: Partial<IHotelOfSuperAdmin> | null, hotelAdminId: string) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error('No estás autorizado.')
    const response = await fetch(`http://localhost:3000/hotels/${hotelId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`
        },
        body: JSON.stringify(selectedHotel)
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

export const getAllBookings = async () => {
    const token = localStorage.getItem("token")
    console.log(token);
    if (!token) {
        throw new Error('No estás autorizado.')
    }


    const response = await fetch("http://localhost:3000/bookings", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
    if (!response.ok) {
        throw new Error('Error en la solicitud.')
    }
    const data = await response.json();
    return data
}