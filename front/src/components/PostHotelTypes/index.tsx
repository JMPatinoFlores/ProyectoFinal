"use client";

import { IRoomTypeRegister } from "@/interfaces";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import continueImage from "../../../public/continue.png";
import createImage from "../../../public/create.png";
import Image from "next/image";
import { postRoomType } from "@/lib/server/fetchHotels";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function TypesRegister() {
  const router = useRouter();
  const [hotelId, setHotelId] = useState<string>("");

  const [initialValues, setInitialValues] = useState<IRoomTypeRegister>({
    name: "",
    capacity: 0,
    totalBathrooms: 0,
    totalBeds: 0,
    images: [],
    price: 0,
    hotelId: hotelId,
    roomTypeId: "",
    id: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObject = JSON.parse(storedUser);
        if (userObject.hotels && userObject.hotels.length > 0) {
          const fetchedHotelId = userObject.hotels[0].id;
          setHotelId(fetchedHotelId);
          setInitialValues((prevValues) => ({
            ...prevValues,
            hotelId: fetchedHotelId,
          }));
        }
      } catch (error) {
        console.error("Error al parsear el hotelId desde localStorage:", error);
      }
    }
  }, []);

  const uploadImageToCloudinary = async (file: string | File): Promise<string> => {
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
        alert("Error al subir la imagen. Inténtalo de nuevo");
        setSubmitting(false);
        return;
      }
    }

    const formData = {
      ...values,
      images: imageUrls,
      hotelId: hotelId || values.hotelId,
    };

    console.log("Datos enviados: ", formData);

    try {
      const response = await postRoomType(formData);
      console.log("Datos enviados: ", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tipo de habitación registrado exitosamente",
        showConfirmButton: true,
        timer: 4000,
      });
      router.push("/rooms-number")
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error",
        timer: 4000
      });
    } finally {
      setSubmitting(false);
    }
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
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-2">
                <div className="formDiv flex-1 mr-2">
                  <label htmlFor="name" className="formLabel">
                    Tipo de habitación
                  </label>
                  <Field type="text" name="name" className="formInput">
                    
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
                  <input
                    type="file"
                    multiple
                    onChange={(event) => {
                      const files = event.target.files;
                      if (files) {
                        const fileArray = Array.from(files);
                        setFieldValue("images", fileArray);
                      }
                    }}
                    className="formInput"
                  />
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
                <div className="flex mx-4 justify-center">
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
                  {/* <div>
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
                  </div> */}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
