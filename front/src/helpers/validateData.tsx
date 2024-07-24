import { IRegisterValues } from "@/interfaces";

export const validateRegisterForm = (values: IRegisterValues) => {
  const errors: Partial<IRegisterValues> = {};
  if (!values.name) {
    errors.name = "Nombre es requerido";
  }

  if (!values.lastname) {
    errors.lastname = "Nombre es requerido";
  }

  if (!values.email) {
    errors.email = "Correo electrónico es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Correo electrónico inválido";
  }

  if (!values.password) {
    errors.password = "Contraseña requerida";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirmación de contraseña requerida";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Las contraseñas deben coincidir";
  }

  if (!values.phone) {
    errors.phone = "Número de teléfono requerido";
  }

  if (!values.country) {
    errors.country = "País requerido";
  }

  if (!values.city) {
    errors.city = "Ciudad requerida";
  }

  if (!values.address) {
    errors.address = "Dirección requerida";
  }

  if (!values.birthDate) {
    errors.birthDate = "Fecha de nacimiento requerida";
  }

  return errors;
};
