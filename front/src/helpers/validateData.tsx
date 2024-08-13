import * as yup from "yup";
import {
  ICreateBooking,
  IHotelRegister,
  ILogin,
  IPostReview,
  IRegisterValues,
  IReview,
} from "@/interfaces";
import { FormValues } from "@/components/ResetPassword";

export const validateRegisterForm = (values: IRegisterValues) => {
  const errors: Partial<IRegisterValues> = {};
  if (!values.name) {
    errors.name = "Nombre requerido";
  } else if (values.name.length < 3 || values.name.length > 50) {
    errors.name = "El nombre debe tener entre 3 y 50 caracteres";
  }

  if (!values.lastName) {
    errors.lastName = "Nombre requerido";
  } else if (values.lastName.length < 3 || values.lastName.length > 50) {
    errors.lastName = "El apellido debe tener entre 3 y 50 caracteres";
  }

  if (!values.email) {
    errors.email = "Correo electrónico requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Correo electrónico inválido";
  }

  if (!values.password) {
    errors.password = "Contraseña requerida";
  } else if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(
      values.password
    )
  ) {
    errors.password =
      "La contraseña debe tener entre 8 y 12 caracteres, y contener al menos una mayúscula, un número y un carácter especial";
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
  } else if (values.country.length > 50) {
    errors.country = "El país no debe tener más de 50 caracteres";
  }

  if (!values.city) {
    errors.city = "Ciudad requerida";
  } else if (values.city.length > 50) {
    errors.city = "La ciudad no debe tener más de 50 caracteres";
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

export const validateResetPassword = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  if (!values.newPassword) {
    errors.newPassword = "Nueva contraseña requerida";
  } else if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(
      values.newPassword
    )
  ) {
    errors.newPassword =
      "La contraseña debe tener entre 8 y 12 caracteres, y contener al menos una mayúscula, un número y un carácter especial";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirmación de contraseña requerida";
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "Las contraseñas deben coincidir";
  }

  return errors;
};

export const validateEmail = (values: Partial<ILogin>) => {
  const errors: Partial<ILogin> = {};

  if (!values.email) {
    errors.email = "Correo electrónico requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Correo electrónico inválido";
  }

  return errors;
};

export const validatePostHotel = (values: IHotelRegister) => {
  const errors: Partial<IHotelRegister> = {};

  if (!values.name) {
    errors.name = "Nombre requerido";
  } else if (values.name.length > 50) {
    errors.name = "El nombre del hotel no debe tener más de 50 caracteres";
  }

  if (!values.description) {
    errors.description = "Descripción requerida";
  } else if (values.description.length > 500) {
    errors.description = "La descripción no debe tener más de 500 caracteres";
  }

  if (!values.email) {
    errors.email = "Correo electrónico requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Correo electrónico inválido";
  }

  if (!values.country) {
    errors.country = "País requerido";
  } else if (values.country.length > 50) {
    errors.country = "El país no debe tener más de 50 caracteres";
  }

  if (!values.city) {
    errors.city = "Ciudad requerida";
  } else if (values.city.length > 50) {
    errors.city = "La ciudad no debe tener más de 50 caracteres";
  }

  if (!values.address) {
    errors.address = "Dirección requerida";
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
