import { SuperAdminContext } from "@/context/superAdminContext";
import { IHotelAdminDetails } from "@/interfaces";
import Link from "next/link";
import { useContext } from "react";

interface HotelAdminProps {
    hotelAdmin: IHotelAdminDetails;
    handleViewDetails: (hotelAdmin: IHotelAdminDetails) => void;
    setFilteredHotelAdmins: React.Dispatch<React.SetStateAction<IHotelAdminDetails[]>>;
}

const HotelAdmin = ({ hotelAdmin, handleViewDetails, setFilteredHotelAdmins }: HotelAdminProps) => {
    const { fetchDeleteHotelAdmin, fetchHotelAdmins } = useContext(SuperAdminContext);

    async function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const confirmed = window.confirm("¿Estás seguro que quieres eliminar este administrador de hotel?");
        if (!confirmed) return;

        try {
            const response = await fetchDeleteHotelAdmin(hotelAdmin.id);
            if (response) {
                const hotelAdmins = await fetchHotelAdmins();
                setFilteredHotelAdmins(hotelAdmins);
            }
        } catch (error) {
            console.log("Error deleting hotel admin: ", error);
        }
    }

    return (
        <div className="relative p-4 mb-4 bg-gray-100 rounded-lg shadow-md flex flex-col">
            {/* Name and Last Name */}
            <div className="flex-grow mb-2">
                <h3 className="text-lg font-semibold">
                    {hotelAdmin.name} {hotelAdmin.lastName}
                </h3>
            </div>
            {/* Links */}
            <div className="flex flex-wrap gap-2 mt-auto">
                <button
                    className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                    onClick={() => handleViewDetails(hotelAdmin)}
                >
                    Ver Detalles y Editar
                </button>
                <button
                    className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                    onClick={handleDelete}
                >
                    Eliminar
                </button>
                <Link
                    href={`/hotelsSuperAdmin/${hotelAdmin.id}`}
                    className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                >
                    Ver Hoteles
                </Link>
            </div>
        </div>
    );
};

export default HotelAdmin;
