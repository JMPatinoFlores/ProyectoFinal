import { IHotelRegister, ILogin, IRegisterValues } from "@/interfaces";

export const validateRegisterForm = (values: IRegisterValues) => {
  const errors: Partial<IRegisterValues> = {};
  if (!values.name) {
    errors.name = "Nombre requerido";
  }

  if (!values.lastname) {
    errors.lastname = "Nombre requerido";
  }

  if (!values.email) {
    errors.email = "Correo electrónico requerido";
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

export const validateLoginForm = (values: ILogin) => {
  const errors: Partial<ILogin> = {};

  if (!values.email) {
    errors.email = "Correo electrónico requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Correo electrónico inválido";
  }

  if (!values.password) {
    errors.password = "Contraseña requerida";
  }

  return errors;
};

export const validatePostHotel = (values: IHotelRegister) => {
  const errors: Partial<IHotelRegister> = {};

  if (!values.name) {
    errors.name = "Nombre requerido";
  }

  if (!values.email) {
    errors.email = "Correo electrónico requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Correo electrónico inválido";
  }

  if (!values.country) {
    errors.country = "Selecciona un país";
  }

  if (!values.city) {
    errors.city = "Ciudad requerida";
  }

  if (!values.address) {
    errors.address = "Dirección requerida";
  }

  if (!values.location) {
    errors.location = "Ubicación requerida";
  }

  if (!values.services) {
    errors.services = "Agrega al menos un servicio";
  }

  return errors;
};

// export const validatePostHotelImage = (values: IHotelImage) => {
//   const errors: Partial<IHotelImage> = {};

//   if (!values.image) {
//     errors.image = "Sube una foto de tu hotel";
//   }

//   return errors;
// };
