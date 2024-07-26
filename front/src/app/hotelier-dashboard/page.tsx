function HotelierDashboard() {
  return (
    <div className="max-w-md mx-auto my-6">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h1 className="text-2xl font-bold">Perfil de Hotelero</h1>
          <h2 className="text-muted-foreground">Información del Hotel y Reservas Hechas</h2>
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
    </div>
  );
}

export default HotelierDashboard;
