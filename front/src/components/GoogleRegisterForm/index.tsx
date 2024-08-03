"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import loginImage from "../../../public/loginImage2.jpg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function GoogleRegisterForm() {
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/completeProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          ...values,
        }),
      });
      const result = await response.json();
      if (result.success) {
        router.push("/dashboard");
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginImage.src})` }}
      >
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-40">
          <div className="text-white text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Encuentra tu próximo destino
            </h1>
            <p className="text-lg">Hospedaje que Abraza tus Sueños.</p>
          </div>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <div className="w-full max-w-md p-8">
          <div className="flex justify-center mb-8">
            <h1 className="text-3xl md:text-4xl mb-2 pb-2 text-center font-bold">
              Registrarse
            </h1>
          </div>
          <Formik
            initialValues={{
              lastName: "",
              phone: "",
              country: "",
              city: "",
              address: "",
              birthDate: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-2">
                <div className="formDiv flex-1">
                  <label htmlFor="lastName" className="formLabel">
                    Apellido
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    className="formInput"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="birthDate" className="formLabel">
                    Fecha de nacimiento
                  </label>
                  <Field
                    type="date"
                    name="birthDate"
                    // max={today}
                    className="formInput"
                  />
                  <ErrorMessage
                    name="birthDate"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="formLabel">
                    Teléfono
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Teléfono"
                    className="formInput"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="formLabel">
                    País
                  </label>
                  <Field type="text" name="country" className="formInput">
                    {/* <option value="">Selecciona un país</option>
                    {countryOptions.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))} */}
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex-1 mr-2">
                    <label htmlFor="city" className="formLabel">
                      Ciudad
                    </label>
                    <Field
                      type="text"
                      name="city"
                      placeholder="Ciudad"
                      className="formInput"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="address" className="formLabel">
                      Dirección
                    </label>
                    <Field
                      type="text"
                      name="address"
                      placeholder="Dirección"
                      className="formInput"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn-secondary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Listo"}
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
