import { IAdminHotel } from "@/interfaces";
import { useState } from "react";

interface IEditHotelModalProps {
  hotel: IAdminHotel | null;
  onClose: () => void;
  onSave: (updatedHotel: Partial<IAdminHotel>) => void;
  onDelete: (hotelId: string) => Promise<void>;
}

function EditHotelModal({
  hotel,
  onClose,
  onSave,
  onDelete,
}: IEditHotelModalProps) {
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

  const handleDelete = async () => {
    if (hotel?.id) {
      const confirmed = confirm(
        "¿Estás seguro de que deseas eliminar este hotel?"
      );
      if (confirmed) {
        try {
          await onDelete(hotel.id);
          onClose();
        } catch (error) {
          console.error("Error eliminando hotel:", error);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-full sm:max-w-lg md:max-w-md lg:max-w-lg xl:max-w-xl w-full relative">
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
        <div className="flex justify-between mt-4 space-x-2">
          <button
            className="bg-gray-900 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
        <button
          onClick={handleDelete}
          className="text-sm text-red-600 p-2 flex justify-center items-center w-full"
        >
          Eliminar este hotel
        </button>
      </div>
    </div>
  );
}

export default EditHotelModal;
