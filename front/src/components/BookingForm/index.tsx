import { IBooking, IBookingForm } from "@/interfaces";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";

export default function BookingForm() {
  const initialValues: IBookingForm = {
    checkInDate: "",
    checkOutDate: "",
  };

  const handleSubmit = (
    values: IBookingForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    // funcion dependiendo del contexto
    console.log("Datos enviados", values);
    alert("Datos enviados");
    setSubmitting(false);
  };

  return (
    <div>
      <h1>Reserva ahora!</h1>
      <div>
        <Formik values={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="checkInDate">Fecha de entrada:</label>
                <Field type="date" name="checkInDate" />
                <ErrorMessage name="checkInDate" />
              </div>
              <div>
                <label htmlFor="checkOutDate">Fecha de salida:</label>
                <Field type="date" name="checkOutDate" />
                <ErrorMessage name="checkOutDate" />
              </div>
              <div>
                <Link href={"/post-hotel-image"} passHref>
                  <button
                    type="submit"
                    className="btn-secondary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <div className="flex items-center">
                        <h1 className="mr-1">Continuar</h1>
                        <Image
                          src={"/continue.png"}
                          alt="Continue"
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                  </button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
