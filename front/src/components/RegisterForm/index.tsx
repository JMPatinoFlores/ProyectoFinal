"use client";

import { validateRegisterForm } from "@/helpers/validateData";
import { IRegisterValues } from "@/interfaces";
import { Formik, Form, Field, ErrorMessage } from "formik";
import registerImage from "../../../public/planea.jpg";
import Link from "next/link";

export default function RegisterForm() {
  const initialValues: IRegisterValues = {
    name: "",
    lastname: "",
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
    "Argentina",
    "Bolivia",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Ecuador",
    "El Salvador",
    "España",
    "Guatemala",
    "Honduras",
    "México",
    "Nicaragua",
    "Panamá",
    "Paraguay",
    "Perú",
    "República Dominicana",
    "Uruguay",
    "Venezuela",
  ];

  const areaCodes = [
    { country: "Argentina", code: "+54" },
    { country: "Bolivia", code: "+591" },
    { country: "Chile", code: "+56" },
    { country: "Colombia", code: "+57" },
    { country: "Costa Rica", code: "+506" },
    { country: "Cuba", code: "+53" },
    { country: "Ecuador", code: "+593" },
    { country: "El Salvador", code: "+503" },
    { country: "España", code: "+34" },
    { country: "Guatemala", code: "+502" },
    { country: "Honduras", code: "+504" },
    { country: "México", code: "+52" },
    { country: "Nicaragua", code: "+505" },
    { country: "Panamá", code: "+507" },
    { country: "Paraguay", code: "+595" },
    { country: "Perú", code: "+51" },
    { country: "República Dominicana", code: "+1" },
    { country: "Uruguay", code: "+598" },
    { country: "Venezuela", code: "+58" },
  ];

  const handleSubmit = async (
    values: IRegisterValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    // Simulación de envío de datos
    console.log("Datos enviados", values);
    alert("Datos enviados");
    setSubmitting(false);
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
      <div className="flex w-full md:w-1/2 justify-center items-cente">
        <div className="w-full max-w-md p-8">
          <div className="flex justify-center mb-8">
            <h1 className="text-4xl mb-2 pb-2 text-center font-bold">
              Registro
            </h1>
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
                    <label htmlFor="lastname" className="formLabel">
                      Apellido
                    </label>
                    <Field
                      type="text"
                      name="lastname"
                      placeholder="Apellido"
                      className="formInput"
                    />
                    <ErrorMessage
                      name="lastname"
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

                <div className="flex items-center justify-end">
                  <Link href={"#"} className="text-sm hover:text-[#f8263a]">
                    Olvidé mi contraseña
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn-secondary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Registrarse"}
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
