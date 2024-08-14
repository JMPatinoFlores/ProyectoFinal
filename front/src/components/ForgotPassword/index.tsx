import { useState } from "react";
import { ILogin } from "@/interfaces";
import { sendEmail } from "@/lib/server/fetchUsers";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validateEmail } from "@/helpers/validateData";

function ForgotPassword() {
  const [isOpen, setIsOpen] = useState(false);

  const initialValues: Partial<ILogin> = {
    email: "",
  };

  const handleSubmit = async (
    values: Partial<ILogin>,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const success = await sendEmail(values);
    if (success) {
      alert("Recibirás un correo electrónico");
      setIsOpen(true);
    } else {
      alert("Error");
    }
    setSubmitting(false);
    setIsOpen(false);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="mb-2 px-4 py-2 text-sm hover:text-red-500"
      >
        Olvidé mi contraseña
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 mr-3 mt-1 text-gray-600"
            >
              &times;
            </button>
            <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
              Recuperación de contraseña
            </h1>
            <p className="text-sm text-gray-600 text-center mt-8 mb-6">
              Introduce tu correo electrónico para restablecer tu contraseña
            </p>
            <Formik
              initialValues={initialValues}
              validate={validateEmail}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="mb-6">
                  <div>
                    <label className="block mb-2 text-sm text-gray-600">
                      Correo electrónico
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-32 bg-gradient-to-r from-red-400 to-red-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-4 mb-4"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgotPassword;
