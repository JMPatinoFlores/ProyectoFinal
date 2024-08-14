"use client";

import { validateFormBooking } from "@/helpers/validateData";
import { ICreateBooking, IRoomType } from "@/interfaces";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRoomTypesByHotelId, postBooking } from "@/lib/server/fetchHotels";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const extendedValidateFormBooking = (values: ICreateBooking) => {
  const errors: Partial<ICreateBooking> = validateFormBooking(values);

  const today = getTodayDate();

  // Validation for the roomTypesIdsAndDates array
  if (values.roomTypesIdsAndDates.length === 0) {
    errors.roomTypesIdsAndDates = [
      { roomTypeId: "", checkInDate: "", checkOutDate: "" },
    ];
  } else {
    values.roomTypesIdsAndDates.forEach((item, index) => {
      if (item.checkInDate && item.checkInDate < today) {
        if (!errors.roomTypesIdsAndDates) errors.roomTypesIdsAndDates = [];
        errors.roomTypesIdsAndDates[index] = {
          ...(errors.roomTypesIdsAndDates[index] || {}),
          checkInDate: "La fecha de entrada no puede ser anterior a hoy",
        };
      }

      if (item.checkOutDate && item.checkOutDate < item.checkInDate) {
        if (!errors.roomTypesIdsAndDates) errors.roomTypesIdsAndDates = [];
        errors.roomTypesIdsAndDates[index] = {
          ...(errors.roomTypesIdsAndDates[index] || {}),
          checkOutDate:
            "La fecha de salida no puede ser anterior a la fecha de entrada",
        };
      }
    });
  }

  return errors;
};

interface TokenPayload {
  id: string;
}

export default function BookingForm() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
    const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);
    const [selectedHotelId, setSelectedHotelId] = useState<string>("");

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      const decodedToken: TokenPayload = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.id);
    }
  }, []);

  const initialValues: ICreateBooking = {
    customerId: userId || "",
    hotelId: "",
    roomTypesIdsAndDates: [
      { roomTypeId: "", checkInDate: "", checkOutDate: "" },
    ],
  };

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

  const handleSubmit = async (values: ICreateBooking) => {
    try {
      const response = await postBooking(values);
      console.log("Datos de la reserva realizada:", response);
      if(response){
        alert("Reserva hecha exitosamente")
      }
    } catch (error) {
      console.log("Error al realizar la reserva: ", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl mb-2 pb-2 text-center font-bold">
            ¡Reserva Ahora!
          </h1>
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={extendedValidateFormBooking}
          >
            {({ isSubmitting, values }) => (
              <Form className="space-y-4">
                {values.roomTypesIdsAndDates.map((item, index) => (
                  <div key={index} className="space-y-4">
                    <div className="formDiv flex-1 mb-2">
                      <label htmlFor="roomType" className="formLabel">
                        Tipo de Habitación
                      </label>
                      <Field
                        as="select"
                        name="roomsTypeId"
                        className="formInput"
                      >
                        <option value="">
                          Seleccione un tipo de habitación
                        </option>
                        {/* {roomTypes.map((roomType) => (
                          <option key={String(roomType.id)} value={roomType.id}>
                            {roomType.name}
                          </option>
                        ))} */}
                      </Field>
                    </div>
                    <div className="formDiv flex-1 mb-2">
                      <label
                        htmlFor={`roomTypesIdsAndDates[${index}].checkInDate`}
                        className="formLabel"
                      >
                        Fecha de entrada:
                      </label>
                      <Field
                        type="date"
                        name={`roomTypesIdsAndDates[${index}].checkInDate`}
                        className="formInput"
                      />
                      <ErrorMessage
                        name={`roomTypesIdsAndDates[${index}].checkInDate`}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="formDiv flex-1 mb-4">
                      <label
                        htmlFor={`roomTypesIdsAndDates[${index}].checkOutDate`}
                        className="formLabel"
                      >
                        Fecha de salida:
                      </label>
                      <Field
                        type="date"
                        name={`roomTypesIdsAndDates[${index}].checkOutDate`}
                        className="formInput"
                      />
                      <ErrorMessage
                        name={`roomTypesIdsAndDates[${index}].checkOutDate`}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                ))}

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
                        <h1 className="mr-2">Continuar</h1>
                        <Image
                          src={"/continue.png"}
                          alt="Continue"
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
