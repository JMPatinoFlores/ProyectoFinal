import Link from "next/link";

function HotelierDashboard() {
  return (
    <div className="max-w-md mx-auto my-6">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h1 className="text-2xl font-bold">Perfil de Hotelero</h1>
          <h2 className="text-muted-foreground">
            Información del Hotel y Reservas Hechas
          </h2>
        </div>
        <div className="grid gap-2">
          <h2 className="text-sm font-bold">Nombre</h2>
          <p className="text-muted-foreground">Esteban Romero</p>
        </div>
        <div className="grid gap-2">
          <h2 className="text-sm font-bold">Nombre del Hotel</h2>
          <p className="text-muted-foreground">Lago Mar</p>
        </div>
        <div className="grid gap-2">
          <h2 className="text-sm font-bold">Correo electrónico</h2>
          <p className="text-muted-foreground">esteban@example.com</p>
        </div>
        <div className="grid gap-2">
          <h2 className="text-sm font-bold">Número de teléfono</h2>
          <p className="text-muted-foreground">+1 (123) 456-7890</p>
        </div>
        <div className="grid gap-2 mb-5">
          <h2 className="text-sm font-bold">Dirección</h2>
          <p className="text-muted-foreground" style={{ color: "#588157" }}>
            Mansilla General 2513 2doA, de la Ciudad Autonoma de Buenos Aires
          </p>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <h1 className="text-2xl font-bold">Reservas</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Habitación
              </th>
              <th scope="col" className="px-6 py-3">
                Personas
              </th>
              <th scope="col" className="px-6 py-3">
                CheckIn
              </th>
              <th scope="col" className="px-6 py-3">
                CheckOut
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Mateo Gomez
              </th>
              <td className="px-6 py-4">B1</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">25/08/2024</td>
              <td className="px-6 py-4">28/08/2024</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="relative overflow-x-auto mt-5">
        <h1 className="text-2xl font-bold">Mis Habitaciones</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Número
              </th>
              <th scope="col" className="px-6 py-3">
                Camas
              </th>
              <th scope="col" className="px-6 py-3">
                Baños
              </th>
              <th scope="col" className="px-6 py-3">
                Ver Habitacion
              </th>
              <th scope="col" className="px-6 py-3">
                Editar Habitacion
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                A101
              </th>
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">
                <Link href="#">
                  <button className="p-1 bg-blue-500 rounded text-white hover:bg-blue-600">
                    Ver
                  </button>
                </Link>
              </td>
              <td className="px-6 py-4">
                <Link href="#">
                  <button className="p-1 bg-sky-500 rounded text-white hover:bg-sky-600">
                    Editar
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-around">
        <button className="mt-5 px-2 py-1 text-white rounded bg-gray-500 hover:bg-gray-600">
          Editar Hotel
        </button>
        <button className="mt-5 px-2 py-1 text-white rounded bg-red-500 hover:bg-red-600">
          Eliminar Hotel
        </button>
      </div>
    </div>
  );
}

export default HotelierDashboard;
