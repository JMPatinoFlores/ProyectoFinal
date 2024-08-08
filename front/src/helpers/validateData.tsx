import * as yup from "yup";
import { ICreateBooking, IHotelRegister, ILogin, IRegisterValues } from "@/interfaces";

export const validateRegisterForm = (values: IRegisterValues) => {
  const errors: Partial<IRegisterValues> = {};
  if (!values.name) {
    errors.name = "Nombre requerido";
  }

  if (!values.lastName) {
    errors.lastName = "Nombre requerido";
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

export const validationSchema = yup.object().shape({
  image: yup.mixed().required("La imagen es requerida"),
});

export const validateFormBooking = (values: ICreateBooking) => {
  const errors: Partial<ICreateBooking> = {};

  if (!values.hotelId) {
    errors.hotelId = "Hotel ID requerido";
  }

  if (values.roomTypesIdsAndDates.length === 0) {
    errors.roomTypesIdsAndDates = [
      { roomTypeId: "", checkInDate: "", checkOutDate: "" },
    ];
  } else {
    values.roomTypesIdsAndDates.forEach((item, index) => {
      if (!item.roomTypeId) {
        if (!errors.roomTypesIdsAndDates) errors.roomTypesIdsAndDates = [];
        errors.roomTypesIdsAndDates[index] = {
          ...(errors.roomTypesIdsAndDates[index] || {}),
          roomTypeId: "Room Type ID requerido",
        };
      }
      if (!item.checkInDate) {
        if (!errors.roomTypesIdsAndDates) errors.roomTypesIdsAndDates = [];
        errors.roomTypesIdsAndDates[index] = {
          ...(errors.roomTypesIdsAndDates[index] || {}),
          checkInDate: "Fecha de entrada requerida",
        };
      }
      if (!item.checkOutDate) {
        if (!errors.roomTypesIdsAndDates) errors.roomTypesIdsAndDates = [];
        errors.roomTypesIdsAndDates[index] = {
          ...(errors.roomTypesIdsAndDates[index] || {}),
          checkOutDate: "Fecha de salida requerida",
        };
      }
    });
  }

  return errors;
};
