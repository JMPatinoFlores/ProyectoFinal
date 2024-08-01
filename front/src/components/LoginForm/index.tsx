"use client";

import { validateLoginForm } from "@/helpers/validateData";
import { ILogin } from "@/interfaces";
import { ErrorMessage, Field, Form, Formik } from "formik";
import loginImage from "../../../public/loginImage2.jpg";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

export default function LoginForm() {
  const { login, isLogged } = useContext(UserContext);
  const router = useRouter();

  const { data: session } = useSession();
  console.log(session);

  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: ILogin,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const success = await login(values);
    if (success) {
      alert("Iniciaste sesión correctamente");
      router.push("/home");
    } else {
      alert("Error al iniciar sesión");
    }
    console.log("Datos enviados", values);
    alert("Inicio de sesión exitoso");
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginImage.src})` }}
      >
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-40">
          <div className="text-white text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Encuentra tu próximo destino
            </h1>
            <p className="text-lg">Hospedaje que Abraza tus Sueños.</p>
          </div>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <div className="w-full max-w-md p-8">
          <div className="flex justify-center mb-8">
            <h1 className="text-3xl md:text-4xl mb-2 pb-2 text-center font-bold">
              Iniciar sesión
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
              <h2>Iniciar sesión con Google</h2>
            </button>
          </div>
          <h1 className="text-center my-2">- O -</h1>
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
                    className="btn-secondary w-full"
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
