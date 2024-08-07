"use client"

import { IRoomTypeRegister } from "@/interfaces";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import continueImage from "../../../public/continue.png";
import createImage from "../../../public/create.png";
import Image from "next/image";
import { postRoomType } from "@/lib/server/fetchHotels";

export default function TypesRegister() {
  const initialValues = {
    name: "",
    capacity: 0,
    totalBathrooms: 0,
    totalBeds: 0,
    images: [],
    price: 0,
    hotelId: "",
  };

  const typesOptions = [
    "Estándar",
    "Deluxe",
    "Suite",
    "Familiar",
    "Accesible(para personas con discapacidad)",
  ];

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error("No se recibió el enlace de la imagen");
      }
    } catch (error) {
      console.error("Error al subir la imagen a Cloudinary:", error);
      throw new Error("Error al subir la imagen");
    }
  };

  const handleSubmit = async (
    values: IRoomTypeRegister,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {

    let imageUrls: string[] = [];
    if (values.images && values.images.length > 0) {
      try {
        for (const file of values.images) {
          const imageUrl = await uploadImageToCloudinary(file);
          imageUrls.push(imageUrl);
        }
      } catch (error) {
        console.log("Error al subir la imagen: ", error);
        alert("Error al subir la imagen. Intentalo de nuevo");
        setSubmitting(false);
        return;
      }
    }

    const formData = {
      ... values,
      images: imageUrls,
    }

    console.log("Datos enviados: ", formData);
    
    try {
      const response = await postRoomType(formData);
      console.log("Datos enviados: ", response);
      alert("Tipo de habitación registrado exitosamente");
    } catch (error) {
      console.error("Error al registrar el tipo de habitación: ", error);
      alert("Error al registrar el tipo de habitación. Inténtalo de nuevo");
    } finally {
      setSubmitting(false);
    }

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
                <div className="formDiv flex-1 mr-2">
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
                <div className="formDiv flex-1 mr-2">
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
                <div className="formDiv flex-1 mr-2">
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
                <div className="formDiv flex-1 mr-2">
                  <label htmlFor="images" className="formLabel">
                    Imagen de la habitación
                  </label>
                  <Field name="images">
                    {({ field }: any) => (
                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const files = Array.from(e.target.files);
                          }
                        }}
                        className="formInput"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="formDiv flex-1 mr-2">
                  <label htmlFor="price" className="formLabel">
                    ¿Cuál es el precio por noche? (USD)
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
function uploadImageToCloudinary(file: string) {
  throw new Error("Function not implemented.");
}

