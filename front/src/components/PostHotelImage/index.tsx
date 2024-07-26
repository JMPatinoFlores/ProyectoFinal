"use client";

import { IHotelImage } from "@/interfaces";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import uploadImage from "../../../public/upload.png";

export default function PostHotelImage() {
  const initialValues: IHotelImage = {
    image: [],
  };

  const handleSubmit = async (
    values: IHotelImage,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log("Datos enviados", values);
    alert("Datos enviados");
    setSubmitting(false);
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl mb-2 pb-2 text-center font-bold">
            Sube una o varias imágenes de tu hotel
          </h1>
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue, isSubmitting, values }) => (
            <Form className="space-y-2">
              <div className="formDiv mb-4">
                <label htmlFor="image" className="formLabel">
                  Seleccionar imagen
                </label>
                <input
                  type="file"
                  name="image"
                  className="formInput"
                  multiple
                  onChange={(event) => {
                    const files = event.currentTarget.files;
                    if (files) {
                      const fileArray = Array.from(files);
                      setFieldValue("image", fileArray);
                    }
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              {values.image && values.image.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Imágenes seleccionadas:
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {values.image.map((file, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>{file.name}</span>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            const newFiles = values.image.filter(
                              (_, i) => i !== index
                            );
                            setFieldValue("image", newFiles);
                          }}
                        >
                          Borrar
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-6">
                <button
                  type="submit"
                  className="btn-secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Cargando imágenes..."
                  ) : (
                    <div className="flex items-center">
                      <h1>Cargar</h1>
                      <Image
                        src={uploadImage}
                        alt="Cargar"
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
  );
}
