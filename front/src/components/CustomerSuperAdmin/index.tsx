import { SuperAdminContext } from "@/context/superAdminContext";
import { ICustomerDetails } from "@/interfaces";
import Link from "next/link";
import { useContext } from "react";

interface CustomerProps {
    customer: ICustomerDetails;
    handleViewDetails: (customer: ICustomerDetails) => void;
    setFilteredCustomers: React.Dispatch<React.SetStateAction<ICustomerDetails[]>>;
}

const Customer = ({ customer, handleViewDetails, setFilteredCustomers }: CustomerProps) => {
    const { fetchDeleteCustomer, fetchCustomers } = useContext(SuperAdminContext);

    async function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const confirmed = window.confirm("¿Estás seguro que quieres eliminar este cliente?");
        if (!confirmed) return;

        try {
            const response = await fetchDeleteCustomer(customer.id);
            if (response) {
                const customers = await fetchCustomers();
                setFilteredCustomers(customers);
            }
        } catch (error) {
            console.log("Error deleting customer: ", error);
        }
    }

    return (
        <div className="relative p-4 mb-4 bg-gray-100 rounded-lg shadow-md flex flex-col">
            {/* Name and Last Name */}
            <div className="flex-grow mb-2">
                <h3 className="text-lg font-semibold">
                    {customer.name} {customer.lastName}
                </h3>
            </div>
            {/* Links */}
            <div className="flex flex-wrap gap-2 mt-auto">
                <button
                    className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                    onClick={() => handleViewDetails(customer)}
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
                    href={`/bookingsSuperAdmin/${customer.id}`}
                    className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                >
                    Ver Reservas
                </Link>
            </div>
        </div>
    );
};

export default Customer;
