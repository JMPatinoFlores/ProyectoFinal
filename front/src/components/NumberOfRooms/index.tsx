"use client";
import { ICreateNumberOfRoom } from "@/interfaces";
import { postRoom } from "@/lib/server/fetchHotels";
import { Field, Form, Formik, ErrorMessage } from "formik";


export default function RoomNumberForm() {
  const initialValues: ICreateNumberOfRoom = {
    roomNumber: "",
    roomsTypeId: "",
  };

  const handleSubmit = async (
    values: ICreateNumberOfRoom,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const formData = {
      roomNumber: values.roomNumber,
      roomsTypeId: values.roomsTypeId,
    };

    console.log("Datos del formData:", formData);

    try {
      const response = postRoom(formData);
      setSubmitting(false);
      console.log(response);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
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
    </div>
  );
}
