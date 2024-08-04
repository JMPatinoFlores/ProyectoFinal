"use client";

import { INewPassword, IResetPasswordProps } from "@/interfaces";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPassword({ token }: IResetPasswordProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: INewPassword,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    if (values.newPassword !== values.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/auth/reset-password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword: values.newPassword }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al cambiar la contraseña.");
      }

      setSuccessMessage("Contraseña cambiada exitosamente.");
      setErrorMessage("");
      router.push("/login"); // Redirigir al usuario a la página de login
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Error desconocido");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Cambia tu contraseña</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="newPassword">Nueva Contraseña:</label>
              <Field type="password" name="newPassword" />
              <ErrorMessage name="newPassword" component="div" />
            </div>
            <div>
              <label htmlFor="confirmPassword">
                Confirmar Nueva Contraseña:
              </label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Cambiar Contraseña"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
