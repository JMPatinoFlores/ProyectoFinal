"use client";

import { IRoomTypeRegister } from "@/interfaces";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import continueImage from "../../../public/continue.png";
import createImage from "../../../public/create.png";
import Image from "next/image";

export default function TypesRegister() {
  const initialValues = {
    name: "",
    capacity: 0,
    totalBathrooms: 0,
    totalBeds: 0,
    price: 0,
  };

  const typesOptions = [
    "Estándar",
    "Deluxe",
    "Suite",
    "Familiar",
    "Accesible(para personas con discapacidad)",
    "Otro",
  ];

  const handleSubmit = async (
    values: IRoomTypeRegister,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    // Simulación de envío de datos
    console.log("Datos enviados", values);
    alert("Datos enviados");
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full justify-center items-center">
        <div className="w-full max-w-md p-8">
          <div className="flex flex-col justify-center mb-8">
            <h1 className="text-4xl mb-2 pb-2 text-center font-bold">
              ¿Qué tipo de habitaciones tiene tu hotel?
            </h1>
            <p className="text-center">
              Asegúrate de seleccionar todos los tipos de habitaciones que tiene
              tu hotel antes de continuar
            </p>
          </div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="space-y-2">
                <div className="formDiv flex-1 mr-2">
                  <label htmlFor="name" className="formLabel">
                    Tipo de habitación
                  </label>
                  <Field as="select" name="name" className="formInput">
                    <option value="">Selecciona un tipo</option>
                    {typesOptions.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="capacity" className="formLabel">
                    ¿Para cuántas personas es?
                  </label>
                  <Field
                    type="number"
                    name="capacity"
                    placeholder="0"
                    className="formInput"
                  />
                  <ErrorMessage
                    name="capacity"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="totalBathrooms" className="formLabel">
                    ¿Cuántos baños tiene?
                  </label>
                  <Field
                    type="number"
                    name="totalBathrooms"
                    placeholder="0"
                    className="formInput"
                  />
                  <ErrorMessage
                    name="totalBathrooms"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="totalBeds" className="formLabel">
                    ¿Cuántas camas tiene?
                  </label>
                  <Field
                    type="number"
                    name="totalBeds"
                    placeholder="0"
                    className="formInput"
                  />
                  <ErrorMessage
                    name="totalBeds"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="formLabel">
                    ¿Cuál es el precio por noche?
                  </label>
                  <Field
                    type="number"
                    name="price"
                    placeholder="0"
                    className="formInput"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div className="flex mx-4 justify-between">
                  <div>
                    <Link href={"#"}>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-black rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f8263a]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Creando..."
                        ) : (
                          <div className="flex items-center">
                            <h1 className="mr-1">Guardar</h1>
                            <Image
                              src={createImage}
                              alt="Crear"
                              width={24}
                              height={24}
                            />
                          </div>
                        )}
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link href={"#"}>
                      <button
                        type="submit"
                        className="btn-secondary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Cargando..."
                        ) : (
                          <div className="flex items-center">
                            <h1 className="mr-1">Continuar</h1>
                            <Image
                              src={continueImage}
                              alt="Continuar"
                              width={24}
                              height={24}
                            />
                          </div>
                        )}
                      </button>
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
