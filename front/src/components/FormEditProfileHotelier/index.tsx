"use client";
import { IEditProfileHotelier } from "@/interfaces";
import { putUpdateProfileHotelier } from "@/lib/server/fetchUsers";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";

function FormEditProfileHotelier() {
  const router = useRouter();

  const initialValues: IEditProfileHotelier = {
    name: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    address: "",
    phone: "",
    birthDate: ""
  };

  const handleSubmit = async (
    values: IEditProfileHotelier,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.log(
        "No se encontró información del usuario en el almacenamiento local."
      );
      setSubmitting(false);
      return;
    }

    const formData = {
      ...values,
    };

    try {
      const userobject = JSON.parse(storedUser);
      const userId = userobject.id;
      console.log("user ID: ", userId);

      await putUpdateProfileHotelier(userId, formData);
      alert("Perfil Actualizado Exitosamente.");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al actualizar el perfil: ", error);
      alert("Error al actualizar el perfil. Inténtalo de nuevo");
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
              Edita tu Perfil
            </h1>
            <p className="text-center text-gray-500">
              Para actualizar tu perfil, completa toda la información
              nuevamente.
            </p>
          </div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="formDiv mb-4">
                  <label htmlFor="name" className="formLabel">
                    Nombre
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="formInput"
                    placeholder="Nombre..."
                  />
                </div>
                <div className="formDiv mb-4">
                  <label htmlFor="lastName" className="formLabel">
                    Apellido
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    className="formInput"
                    placeholder="Apellido..."
                  />
                </div>
                <div className="formDiv mb-4">
                  <label htmlFor="email" className="formLabel">
                    Correo Electrónico
                  </label>
                  <Field
                    type="text"
                    name="email"
                    className="formInput"
                    placeholder="ejemplo@mail.com..."
                  />
                </div>
                <div className="formDiv mb-4">
                  <label htmlFor="country" className="formLabel">
                    País
                  </label>
                  <Field
                    type="text"
                    name="country"
                    className="formInput"
                    placeholder="País"
                  />
                </div>
                <div className="formDiv mb-4">
                  <label htmlFor="city" className="formLabel">
                    Ciudad
                  </label>
                  <Field
                    type="text"
                    name="city"
                    className="formInput"
                    placeholder="Ciudad"
                  />
                </div>
                <div className="formDiv mb-4">
                  <label htmlFor="address" className="formLabel">
                    Dirección
                  </label>
                  <Field
                    type="text"
                    name="address"
                    className="formInput"
                    placeholder="Dirección"
                  />
                </div>
                <div className="formDiv mb-4">
                  <label htmlFor="phone" className="formLabel">
                    Número de teléfono
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    className="formInput"
                    placeholder="Número de teléfono"
                  />
                </div>
                <div className="formDiv flex-1 mb-2">
                  <label
                    htmlFor="birthDate"
                    className="formLabel"
                  >
                    Fecha de entrada:
                  </label>
                  <Field
                    type="date"
                    name="birthDate"
                    className="formInput"
                  />
                  
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-black rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f8263a]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Actualizando..."
                    ) : (
                      <div className="flex items-center">
                        <span className="mr-2">Actualizar</span>
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
}

export default FormEditProfileHotelier;
