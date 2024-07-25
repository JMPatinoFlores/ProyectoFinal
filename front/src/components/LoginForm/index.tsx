"use client";

import { validateLoginForm } from "@/helpers/validateData";
import { ILogin } from "@/interfaces";
import { ErrorMessage, Field, Form, Formik } from "formik";
import loginImage from "../../../public/loginImage2.jpg";
import Link from "next/link";

export default function LoginForm() {
  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: ILogin,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    // Simulación de envío de datos
    console.log("Datos enviados", values);
    alert("Inicio de sesión exitoso");
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginImage.src})` }}
      >
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-40">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-4">
              Encuentra tu próximo destino
            </h1>
            <p className="text-lg">Hospedaje que Abraza tus Sueños.</p>
          </div>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <div className="w-full max-w-md p-8">
          <div className="flex justify-center mb-8">
            <h1 className="text-4xl mb-2 pb-2 text-center font-bold">
              Iniciar sesión
            </h1>
          </div>
          <Formik
            initialValues={initialValues}
            validate={validateLoginForm}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-2">
                <div>
                  <label htmlFor="email" className="formLabel">
                    Correo electrónico
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
                    {isSubmitting ? "Enviando..." : "Ingresar"}
                  </button>
                </div>
                <div className="flex items-center justify-start">
                  <h3 className="mr-2 text-sm">¿Necesitas una cuenta?</h3>
                  <Link
                    href={"/register"}
                    className="text-sm text-[#f8263a] hover:text-[#f8263a]"
                  >
                    Crea una cuenta
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
