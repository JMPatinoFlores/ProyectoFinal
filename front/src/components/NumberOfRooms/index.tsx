"use client";
import { UserContext } from "@/context/userContext";
import { ICreateNumberOfRoom, IRoomType } from "@/interfaces";
import { getRoomTypesByHotelId, postRoom } from "@/lib/server/fetchHotels";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function RoomNumberForm() {
  const { isAdmin } = useContext(UserContext)
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);
  const [selectedHotelId, setSelectedHotelId] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const hotelId = user.hotels[0]?.id;
      setSelectedHotelId(hotelId || "");
    }
  }, []);

  useEffect(() => {
    if (selectedHotelId) {
      const fetchRoomsTypes = async () => {
        try {
          const data = await getRoomTypesByHotelId(selectedHotelId);
          if (Array.isArray(data)) {
            setRoomTypes(data);
          } else {
            console.error("Error: Expected array but received:", data);
          }
        } catch (error) {
          console.error("Error fetching room types:", error);
        }
      };

      fetchRoomsTypes();
    }
  }, [selectedHotelId]);

  const initialValues: ICreateNumberOfRoom = {
    roomNumber: "",
    roomsTypeId: "",
  };

  const handleSubmit = async (
    values: ICreateNumberOfRoom,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {

    if (!values.roomNumber || !values.roomsTypeId) {
      console.error("roomNumber o roomsTypeId están vacíos");
      return;
    }

     if (values.roomNumber.length > 10) {
       console.error("roomNumber debe tener 10 caracteres o menos");
       return;
     }

    const formData = {
      roomNumber: values.roomNumber,
      roomsTypeId: values.roomsTypeId,
    };

    console.log("Datos del formData:", formData);

    try {
      const response = await postRoom(formData);
      if(!response.error) {
        setSubmitting(false);
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Opps...",
          text: "Tal vez ya tengas una habitación con este número",
          timer: 3000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {isAdmin ? (
        <div className="w-full max-w-md p-8">
          <div className="flex justify-center mb-8">
            <h1 className="text-4xl mb-2 pb-2 text-center font-bold">
              Crear Habitaciones
            </h1>
          </div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting, values }) => (
              <Form className="space-y-4">
                <div className="space-y-4">
                  <div className="formDiv flex-1 mb-4">
                    <label htmlFor={`roomNumber`} className="formLabel">
                      Número de Habitación:
                    </label>
                    <Field
                      type="text"
                      name="roomNumber"
                      className="formInput"
                      placeholder="Número de Habitación...."
                    />
                    <ErrorMessage
                      name="roomNumber"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="formDiv flex-1 mb-4">
                  <label htmlFor={`roomsTypeId`} className="formLabel">
                    Tipo de Habitación:
                  </label>
                  <Field as="select" name="roomsTypeId" className="formInput">
                    <option value="">Seleccione un tipo de habitación</option>
                    {roomTypes.map((roomType) => (
                      <option key={String(roomType.id)} value={roomType.id}>
                        {roomType.name}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="formDiv flex-1 mb-4 text-center">
                  <button
                    type="submit"
                    className="btn-secondary w-full flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <div className="flex items-center">
                        <h1 className="mr-2">Crear Habitaciones</h1>
                      </div>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-gray-100">
          <div className=" max-w-md bg-white shadow-md rounded-md p-4 text-center">
            <h1 className="text-2xl font-semibold mb-2">Acceso Denegado</h1>
            <p className="mb-4">
              No tienes permiso para acceder a esta página.
            </p>
            <Link href="/home" className="btn-secondary">
              Regresar a la página principal
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
