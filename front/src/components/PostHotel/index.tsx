"use client";

import { validatePostHotel } from "@/helpers/validateData";
import { IHotelRegister, ILocationDetail } from "@/interfaces";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import Link from "next/link";
import continueImage from "../../../public/continue.png";
import { useContext, useState } from "react";
import useGoogleMapsData from "@/lib/googleMaps/googleMapsData";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { HotelContext } from "@/context/hotelContext";
import PreviewImage from "../PreviewImage";
import { postHotel } from "@/lib/server/fetchHotels";
import { useRouter } from "next/navigation";

interface HotelRegisterProps {}

const HotelRegister: React.FC<HotelRegisterProps> = () => {
  const { addHotel } = useContext(HotelContext);
  const router = useRouter();
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
    hotel_admin_id: "",
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

  const [hotelLocation, setHotelLocation] = useState<ILocationDetail | null>(
    null
  );
  const { isLoaded, mapCenter, marker } = useGoogleMapsData(hotelLocation);

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
    values: IHotelRegister,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    let hotelAdminId = "";

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      hotelAdminId = decodedToken.id;
    }

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
      ...values,
      images: imageUrls,
      hotel_admin_id: hotelAdminId,
    };

    console.log("Datos enviados al backend:", formData);

    try {
      const data = await postHotel(formData);
      console.log("Data:", data);
      if(data) {
        router.push(`/dashboard`)
      }
      console.log(data);
      
    } catch (error) {
      console.log("Error al registrar hotel:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
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

                {/* {hotelLocation && (
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
                )} */}

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

                {/* Adicion del campo de imagen */}
                <div className="formDiv flex-1 mr-2">
                  <label htmlFor="images" className="formLabel">
                    Imagen del hotel
                  </label>
                  <Field name="images">
                    {({ field }: any) => (
                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const files = Array.from(e.target.files);
                            setFieldValue("images", files);
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

                {values.images && values.images.length > 0 && (
                  <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                    {values.images
                      .filter((item): item is File => item instanceof File)
                      .map((file, index) => (
                        <PreviewImage key={index} file={file} />
                      ))}
                  </div>
                )}
                
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
    </div>
  );
};

export default HotelRegister;
