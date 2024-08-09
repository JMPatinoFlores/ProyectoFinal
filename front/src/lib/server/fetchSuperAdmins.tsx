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
    return data
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