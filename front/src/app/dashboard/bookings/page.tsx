import GatewayPayment from "@/components/PaymentGateaway";
import Link from "next/link";

function BookingsPage() {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <h1 className="text-2xl font-bold">Mis Reservas</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Hotel
              </th>
              <th scope="col" className="px-6 py-3">
                Habitación
              </th>
              <th scope="col" className="px-6 py-3">
                CheckOut
              </th>
              <th scope="col" className="px-6 py-3">
                CheckIn
              </th>
              <th scope="col" className="px-6 py-3">
                Posponer Reserva
              </th>
              <th scope="col" className="px-6 py-3">
                Cancelar Reserva
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Lago Mar
              </th>
              <td className="px-6 py-4">B1</td>
              <td className="px-6 py-4">15/12/2024</td>
              <td className="px-6 py-4">26/12/2024</td>
              <td className="px-6 py-4">
                <Link href="#">
                  <button className="p-1 bg-blue-500 rounded text-white hover:bg-blue-600">
                    Posponer
                  </button>
                </Link>
              </td>
              <td className="px-6 py-4">
                <Link href="#">
                  <button className="p-1 bg-red-500 rounded text-white hover:bg-red-600">
                    Cancelar
                  </button>
                </Link>
                <GatewayPayment />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingsPage;
