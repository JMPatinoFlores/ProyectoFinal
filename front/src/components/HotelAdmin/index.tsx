import { IHotelAdminDetails } from "@/interfaces";
import Link from "next/link";

interface HotelAdminProps {
    hotelAdmin: IHotelAdminDetails;
}

const HotelAdmin = ({ hotelAdmin }: HotelAdminProps) => {
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
                <Link
                    href={`/hotelAdmins/editar/${hotelAdmin.id}`}
                    className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                >
                    Editar
                </Link>
                <Link
                    href={`/hotelAdmins/eliminar/${hotelAdmin.id}`}
                    className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                >
                    Eliminar
                </Link>
                <Link
                    href={`/hotelAdmins/ver-hoteles/${hotelAdmin.id}`}
                    className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                >
                    Ver Hoteles
                </Link>
            </div>
        </div>
    );
};

export default HotelAdmin;
