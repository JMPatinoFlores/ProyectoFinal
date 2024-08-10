import { IHotelAdminDetails } from "@/interfaces";
import Link from "next/link";

interface HotelAdminProps {
    hotelAdmin: IHotelAdminDetails
}

const HotelAdmin = ({ hotelAdmin }: HotelAdminProps) => {
    return (
        <div className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{hotelAdmin.name}</h3>
            <div className="mt-2">
                <Link href={`/hotelAdmins/crear`} className="text-blue-600 hover:underline mr-4">
                    Crear
                </Link>
                <Link href={`/hotelAdmins/editar/${hotelAdmin.id}`} className="text-yellow-600 hover:underline mr-4">
                    Editar
                </Link>
                <Link href={`/hotelAdmins/eliminar/${hotelAdmin.id}`} className="text-red-600 hover:underline mr-4">
                    Eliminar
                </Link>
                <Link href={`/hotelAdmins/ver-hoteles/${hotelAdmin.id}`} className="text-green-600 hover:underline">
                    Ver Hoteles
                </Link>
            </div>
        </div>
    );
};

export default HotelAdmin;
