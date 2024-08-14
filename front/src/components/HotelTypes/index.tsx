import React from "react";

function CardsHotelTypes() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      <div className="w-64 bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src="/room-suite.jpg"
          alt="Habitación Suite"
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-2">* Imagen de referencia</p>
          <h2 className="text-lg font-semibold">Habitación Suite</h2>
        </div>
      </div>

      <div className="w-64 bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src="/room-deluxe.jpg"
          alt="Habitación Deluxe"
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-2">* Imagen de referencia</p>
          <h2 className="text-lg font-semibold">Habitación Deluxe</h2>
        </div>
      </div>

      <div className="w-64 bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src="/room-estandar.jpg"
          alt="Habitación Estándar"
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-2">* Imagen de referencia</p>
          <h2 className="text-lg font-semibold">Habitación Estándar</h2>
        </div>
      </div>

      <div className="w-64 bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src="/room-familiar.jpg"
          alt="Habitación Familiar"
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-2">* Imagen de referencia</p>
          <h2 className="text-lg font-semibold">Habitación Familiar</h2>
        </div>
      </div>

      <div className="w-64 bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src="/room-accesible.jpg"
          alt="Habitación Accesible"
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-2">* Imagen de referencia</p>
          <h2 className="text-lg font-semibold">Habitación Accesible</h2>
        </div>
      </div>

      <div className="w-64 bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src="/room-otro.jpg"
          alt="Otro tipo"
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-2">* Imagen de referencia</p>
          <h2 className="text-lg font-semibold">Otro Tipo</h2>
        </div>
      </div>
    </div>
  );
}

export default CardsHotelTypes;
