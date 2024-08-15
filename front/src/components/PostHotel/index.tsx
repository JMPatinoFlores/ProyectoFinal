"use client";

import { validatePostHotel } from "@/helpers/validateData";
import { IHotelRegister, ILocationDetail } from "@/interfaces";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import continueImage from "../../../public/continue.png";
import { useContext, useState } from "react";
import useGoogleMapsData from "@/lib/googleMaps/googleMapsData";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { postHotel } from "@/lib/server/fetchHotels";
import { UserContext } from "@/context/userContext";
import Link from "next/link";

interface HotelRegisterProps {}

const HotelRegister: React.FC<HotelRegisterProps> = () => {
  const { user, isAdmin, addNewHotel } = useContext(UserContext);
  const router = useRouter();
  const [hotelLocation, setHotelLocation] = useState<ILocationDetail | null>(
    null
  );
  const { mapCenter, marker } = useGoogleMapsData(hotelLocation);

  const initialValues: IHotelRegister = {
    name: "",
    description: "",
    email: "",
    country: "",
    city: "",
    address: "",
    location: [0, 0],
    totalRooms: 0,
    services: [],
    rating: 1,
    images: [] as File[],
    hotel_admin_id: user?.id || "",
  };

  const countryOptions = [
    "Afganistán",
    "Albania",
    "Alemania",
    "Andorra",
    "Angola",
    "Antigua y Barbuda",
    "Arabia Saudita",
    "Argelia",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaiyán",
    "Bahamas",
    "Bangladés",
    "Barbados",
    "Baréin",
    "Bélgica",
    "Belice",
    "Benín",
    "Bielorrusia",
    "Birmania",
    "Bolivia",
    "Bosnia y Herzegovina",
    "Botsuana",
    "Brasil",
    "Brunéi",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Bután",
    "Cabo Verde",
    "Camboya",
    "Camerún",
    "Canadá",
    "Catar",
    "Chad",
    "Chile",
    "China",
    "Chipre",
    "Ciudad del Vaticano",
    "Colombia",
    "Comoras",
    "Corea del Norte",
    "Corea del Sur",
    "Costa de Marfil",
    "Costa Rica",
    "Croacia",
    "Cuba",
    "Dinamarca",
    "Dominica",
    "Ecuador",
    "Egipto",
    "El Salvador",
    "Emiratos Árabes Unidos",
    "Eritrea",
    "Eslovaquia",
    "Eslovenia",
    "España",
    "Estados Unidos",
    "Estonia",
    "Etiopía",
    "Filipinas",
    "Finlandia",
    "Fiyi",
    "Francia",
    "Gabón",
    "Gambia",
    "Georgia",
    "Ghana",
    "Granada",
    "Grecia",
    "Guatemala",
    "Guyana",
    "Guinea",
    "Guinea-Bisáu",
    "Guinea Ecuatorial",
    "Haití",
    "Honduras",
    "Hungría",
    "India",
    "Indonesia",
    "Irak",
    "Irán",
    "Irlanda",
    "Islandia",
    "Islas Marshall",
    "Islas Salomón",
    "Israel",
    "Italia",
    "Jamaica",
    "Japón",
    "Jordania",
    "Kazajistán",
    "Kenia",
    "Kirguistán",
    "Kiribati",
    "Kuwait",
    "Laos",
    "Lesoto",
    "Letonia",
    "Líbano",
    "Liberia",
    "Libia",
    "Liechtenstein",
    "Lituania",
    "Luxemburgo",
    "Madagascar",
    "Malasia",
    "Malaui",
    "Maldivas",
    "Malí",
    "Malta",
    "Marruecos",
    "Mauricio",
    "Mauritania",
    "México",
    "Micronesia",
    "Moldavia",
    "Mónaco",
    "Mongolia",
    "Montenegro",
    "Mozambique",
    "Namibia",
    "Nauru",
    "Nepal",
    "Nicaragua",
    "Níger",
    "Nigeria",
    "Noruega",
    "Nueva Zelanda",
    "Omán",
    "Países Bajos",
    "Pakistán",
    "Palaos",
    "Panamá",
    "Papúa Nueva Guinea",
    "Paraguay",
    "Perú",
    "Polonia",
    "Portugal",
    "Reino Unido",
    "República Centroafricana",
    "República Checa",
    "República Dominicana",
    "República del Congo",
    "República Democrática del Congo",
    "Ruanda",
    "Rumanía",
    "Rusia",
    "Samoa",
    "San Cristóbal y Nieves",
    "San Marino",
    "San Vicente y las Granadinas",
    "Santa Lucía",
    "Santo Tomé y Príncipe",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leona",
    "Singapur",
    "Siria",
    "Somalia",
    "Sri Lanka",
    "Suazilandia",
    "Sudáfrica",
    "Sudán",
    "Sudán del Sur",
    "Suecia",
    "Suiza",
    "Surinam",
    "Tailandia",
    "Tanzania",
    "Tayikistán",
    "Timor Oriental",
    "Togo",
    "Tonga",
    "Trinidad y Tobago",
    "Túnez",
    "Turkmenistán",
    "Turquía",
    "Tuvalu",
    "Ucrania",
    "Uganda",
    "Uruguay",
    "Uzbekistán",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Yibuti",
    "Zambia",
    "Zimbabue",
  ];

  const handleSubmit = async (
    values: IHotelRegister,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró el token. Por favor, inicie sesión de nuevo.");
      setSubmitting(false);
      return;
    }

    let imageUrls: string[] = [];
    if (values.images && values.images.length > 0) {
      try {
        for (const file of values.images) {
          if (file instanceof File) {
            const imageUrl = await uploadImageToCloudinary(file);
            imageUrls.push(imageUrl);
          } else if (typeof file === "string") {
            imageUrls.push(file);
          }
        }
      } catch (error) {
        console.log("Error al subir la imagen: ", error);
        alert("Error al subir la imagen. Inténtalo de nuevo.");
        setSubmitting(false);
        return;
      }
    }

    const formData = {
      ...values,
      images: imageUrls,
      hotel_admin_id: user?.id || "",
    };

    console.log("Datos que se envían al backend:", formData);

    try {
      const createdHotel = await postHotel(formData);
      if (createdHotel) {
        addNewHotel(createdHotel);
        alert("Hotel registrado exitosamente");
        router.push("/post-hotel-types");
      } else {
        alert("Error al registrar el hotel");
      }
    } catch (error) {
      console.error("Error al registrar el hotel:", error);
      alert(
        "Hubo un error al registrar el hotel. Por favor, intenta de nuevo."
      );
    } finally {
      setSubmitting(false);
    }
  };

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

  return (
    <div className="flex min-h-screen items-center justify-center">
      {isAdmin ? (
        <div className="flex w-full justify-center items-center">
          <div className="w-full max-w-md p-8">
            <div className="flex justify-center mb-8">
              <h1 className="text-4xl mb-2 pb-2 text-center font-bold">
                Publica tu hotel
              </h1>
            </div>
            <Formik
              initialValues={initialValues}
              validate={validatePostHotel}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, isSubmitting, values }) => (
                <Form className="space-y-2">
                  <div className="formDiv flex-1 mr-2">
                    <label htmlFor="name" className="formLabel">
                      Nombre del hotel
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="formInput"
                      placeholder="Nombre del hotel"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="formDiv flex-1 mr-2">
                    <label htmlFor="description" className="formLabel">
                      Descripción del hotel
                    </label>
                    <Field
                      type="text"
                      name="description"
                      className="formInput"
                      placeholder="Descripción del hotel"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="formDiv flex-1 mr-2">
                    <label htmlFor="email" className="formLabel">
                      Correo electrónico
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="formInput"
                      placeholder="Correo electrónico"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="formDiv flex-1 mr-2">
                    <label htmlFor="country" className="formLabel">
                      País
                    </label>
                    <Field
                      as="select"
                      type="text"
                      name="country"
                      className="formInput"
                      placeholder="País"
                    >
                      <option value="">Selecciona un país</option>
                      {countryOptions.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="formDiv flex-1 mr-2">
                    <label htmlFor="city" className="formLabel">
                      Ciudad
                    </label>
                    <Field
                      type="text"
                      name="city"
                      className="formInput"
                      placeholder="Ciudad"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="formDiv flex-1 mr-2">
                    <label htmlFor="address" className="formLabel">
                      Dirección
                    </label>
                    <Field
                      type="text"
                      name="address"
                      className="formInput"
                      placeholder="Dirección"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const address = e.target.value;
                        const country = values.country;
                        const city = values.city;
                        setHotelLocation({ country, city, address });
                        setFieldValue("address", address);
                      }}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  {hotelLocation && (
                    <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                      <GoogleMap
                        options={{
                          disableDefaultUI: true,
                          clickableIcons: true,
                          scrollwheel: false,
                        }}
                        zoom={14}
                        center={mapCenter}
                        mapTypeId={google.maps.MapTypeId.ROADMAP}
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                      >
                        {marker && <Marker position={mapCenter} />}
                      </GoogleMap>
                    </div>
                  )}

                  <div className="formDiv flex-1 mr-2">
                    <label htmlFor="location" className="formLabel">
                      Ubicación
                    </label>
                    <Field
                      type="text"
                      name="location"
                      className="formInput"
                      placeholder="Ubicación (lat, lng)"
                      value={`${mapCenter.lat}, ${mapCenter.lng}`}
                    />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="formDiv flex-1 mr-2">
                    <label htmlFor="services" className="formLabel">
                      Servicios
                    </label>
                    <Field
                      type="text"
                      name="services"
                      className="formInput"
                      placeholder="Servicios"
                      value={values.services.join(",")}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("services", e.target.value.split(","));
                      }}
                    />
                    <ErrorMessage
                      name="services"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="formDiv flex-1 mr-2">
                    <label htmlFor="services" className="formLabel">
                      Total de Cuartos
                    </label>
                    <Field
                      type="number"
                      name="totalRooms"
                      className="formInput"
                      placeholder="Total de Cuartos"
                    />
                  </div>
                  <div className="formDiv flex-1 mr-2">
                    <label htmlFor="images" className="formLabel">
                      Imagen del hotel
                    </label>
                    <Field name="images">
                      {({ field }: any) => (
                        <input
                          type="file"
                          multiple
                          onChange={async (e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              const files = Array.from(e.target.files);
                              const uploadedUrls = [];

                              for (const file of files) {
                                const imageUrl = await uploadImageToCloudinary(
                                  file
                                );
                                uploadedUrls.push(imageUrl);
                              }

                              setFieldValue("images", uploadedUrls);
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
                  <div>
                    <button
                      type="submit"
                      className="btn-secondary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Enviando..."
                      ) : (
                        <div className="flex items-center">
                          <h1 className="mr-1">Continue</h1>
                          <Image
                            src={continueImage}
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
      ) : (
        <div className="flex items-center justify-center bg-gray-100">
          <div className=" max-w-md bg-white shadow-md rounded-md p-4 text-center">
            <Image
              src="/logo.png"
              alt="Acceso Denegado"
              width={100}
              height={100}
              className="mb-4 mx-auto"
            />
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
};

export default HotelRegister;
