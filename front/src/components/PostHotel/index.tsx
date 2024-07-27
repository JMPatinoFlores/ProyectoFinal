"use client";

import { validatePostHotel } from "@/helpers/validateData";
import { IHotelRegister } from "@/interfaces";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import Link from "next/link";
import continueImage from "../../../public/continue.png";

export default function HotelRegister() {
  const initialValues: IHotelRegister = {
    name: "",
    description: "",
    email: "",
    country: "",
    city: "",
    address: "",
    location: "",
    services: "",
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
    // Simulación de envío de datos
    console.log("Datos enviados", values);
    alert("Datos enviados");
    setSubmitting(false);
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
            {({ setFieldValue, isSubmitting }) => (
              <Form className="space-y-2">
                <div className="formDiv flex-1 mr-2">
                  <label htmlFor="name" className="formLabel">
                    Nombre del hotel
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="formInput"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div className="formDiv flex-1 mr-2">
                  <label htmlFor="description" className="formLabel">
                    Descripción del hotel
                  </label>
                  <Field
                    type="text"
                    name="description"
                    placeholder="Nombre"
                    className="formInput"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div className="formDiv flex-1">
                  <label htmlFor="email" className="formLabel">
                    Correo electrónico del hotel
                  </label>
                  <Field
                    type="text"
                    name="email"
                    placeholder="ejemplo@mail.com"
                    className="formInput"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="formLabel">
                    País
                  </label>
                  <Field as="select" name="country" className="formInput">
                    <option value="">Selecciona un país</option>
                    {countryOptions.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div>
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
                <div>
                  <label htmlFor="address" className="formLabel">
                    Dirección del hotel
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
                {/* <div>
                  <label htmlFor="location" className="formLabel">
                    Ubicación del hotel
                  </label>
                  <Field
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Ubicación"
                    className="formInput"
                    readOnly
                  />
                  <div
                    ref={mapRef}
                    style={{
                      height: "300px",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  ></div>
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div> */}
                {/* <div>
                  <label htmlFor="rooms" className="formLabel">
                    Habitaciones
                  </label>
                  <Field
                    type="text"
                    name="rooms"
                    placeholder="Habitaciones"
                    className="formInput"
                  />
                  <ErrorMessage
                    name="rooms"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div> */}
                <div>
                  <label htmlFor="services" className="formLabel">
                    Servicios que ofrece tu hotel
                  </label>
                  <Field
                    type="text"
                    name="services"
                    placeholder="Describe los servicios de tu hotel"
                    className="formInput"
                  />
                  <ErrorMessage
                    name="services"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div>
                  <Link href={"#"}>
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
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
