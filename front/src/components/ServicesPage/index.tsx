import Image from "next/image";

export default function ServicesPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Nuestros Servicios
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Búsqueda de Hoteles Personalizada
          </h2>
          <p className="text-gray-600">
            Nuestra página te permite filtrar hoteles por ubicación, rango de
            precios y calificación.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Reseñas y Calificaciones
          </h2>
          <p className="text-gray-600">
            Muestra la calificación de los usuarios para cada hotel, incluyendo
            reseñas verificadas de huéspedes anteriores.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Personalización de la Experiencia
          </h2>
          <p className="text-gray-600">
            Permite a los usuarios crear perfiles donde se guarden sus datos y
            reservas pendientes, mejorando la experiencia de uso.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Compatibilidad Móvil
          </h2>
          <p className="text-gray-600">
            Diseño responsive que se adapta a diferentes tamaños de pantalla,
            desde móviles hasta ordenadores de escritorio.
          </p>
        </div>
      </div>
    </div>
  );
}
