"use client";

import { validateRegisterForm } from "@/helpers/validateData";
import { IRegisterValues } from "@/interfaces";
import { Formik, Form, Field, ErrorMessage } from "formik";
import registerImage from "../../../public/planea.jpg";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export default function RegisterForm() {
  const { customerRegister } = useContext(UserContext);
  const router = useRouter();

  const { data: session } = useSession();
  console.log(session);

  const initialValues: IRegisterValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    birthDate: "",
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
    values: IRegisterValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const success = await customerRegister(values);

      if (success) {
        alert("Usuario registrado correctamente");
        await router.push("/login");
      } else {
        alert("Primer error");
        console.log(success);
      }
    } catch (error) {
      alert("Segundo error");
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex min-h-screen">
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${registerImage.src})` }}
      >
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-40">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-4">Explora el mundo</h1>
            <p className="text-lg">
              Destinos Impresionantes, Experiencias Inigualables.
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <div className="w-full max-w-md p-8">
          <div className="flex justify-center mb-8">
            <h1 className="text-4xl mb-2 pb-2 text-center font-bold">
              Registro
            </h1>
          </div>
          <div className="flex justify-center items-center border border-[#f8263a] rounded-md w-full p-2 mb-5">
            <button onClick={() => signIn()} className="flex">
              <Image
                src={"/google.png"}
                alt="google"
                width={24}
                height={24}
                className="mr-2"
              />
              <h2>Registrarse con Google</h2>
            </button>
          </div>
          <Formik
            initialValues={initialValues}
            validate={validateRegisterForm}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-2">
                <div className="flex justify-between">
                  <div className="formDiv flex-1 mr-2">
                    <label htmlFor="name" className="formLabel">
                      Nombre
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
                </div>
                <div>
                  <label htmlFor="birthDate" className="formLabel">
                    Fecha de nacimiento
                  </label>
                  <Field
                    type="date"
                    name="birthDate"
                    max={today}
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
                  <label htmlFor="email" className="formLabel">
                    Correo electrónico
                  </label>
                  <Field
                    type="email"
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
                  <label htmlFor="password" className="formLabel">
                    Contraseña
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="********"
                    className="formInput"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="formLabel">
                    Confirma tu contraseña
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="********"
                    className="formInput"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn-secondary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Registrarse"}
                  </button>
                  <div className="flex items-center justify-start mb-2 mt-1">
                    <h3 className="mr-2 text-sm">¿Ya tienes una cuenta?</h3>
                    <Link href={"/login"} className="text-sm text-[#f8263a]">
                      Inicia sesión
                    </Link>
                  </div>
                  <div className="flex justify-start text-center">
                    <h3 className="mr-2 text-sm">
                      ¿Quieres publicar tu hotel?
                    </h3>
                    <Link
                      href={"/register/hotelier"}
                      className="text-sm text-[#f8263a]"
                    >
                      Regístrate como hotelero
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
