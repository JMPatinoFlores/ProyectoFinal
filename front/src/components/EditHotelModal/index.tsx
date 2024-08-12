"use client";

import { IAdminHotel } from "@/interfaces";
import { useState } from "react";

interface IEditHotelModalProps {
  hotel: IAdminHotel | null;
  onClose: () => void;
  onSave: (updatedHotel: Partial<IAdminHotel>) => void;
}

function EditHotelModal({ hotel, onClose, onSave }: IEditHotelModalProps) {
  const [name, setName] = useState(hotel?.name);
  const [description, setDescription] = useState(hotel?.description);
  const [email, setEmail] = useState(hotel?.email);
  const [address, setAddress] = useState(hotel?.address);
  const [city, setCity] = useState(hotel?.city);
  const [country, setCountry] = useState(hotel?.country);
  const [services, setServices] = useState(hotel?.services.join(", "));

  if (!hotel) return null;

  const handleSave = () => {
    const updatedHotel = {
      ...hotel,
      name,
      description,
      email,
      address,
      city,
      country,
      services: services?.split(",").map((service) => service.trim()),
    };
    onSave(updatedHotel);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Editar Hotel</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Dirección</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Ciudad</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">País</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Servicios</label>
            <input
              type="text"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              className="w-full border-gray-300 rounded-md"
            />
          </div>
        </form>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditHotelModal;
