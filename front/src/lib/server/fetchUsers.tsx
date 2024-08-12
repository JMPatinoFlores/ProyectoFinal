const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

import {
  ICreateReview,
  ILogin,
  INewPassword,
  IReview,
  IUser,
} from "@/interfaces";

export const postCustomerRegister = async (user: Omit<IUser, "id">) => {
  try {
    const response = await fetch("http://localhost:3000/auth/cxSignUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error en la solicitud: " + response.status);
    }
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};

export const postAdminRegister = async (user: Omit<IUser, "id">) => {
  try {
    const response = await fetch("http://localhost:3000/auth/adminSignUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error en la solicitud: " + response.status);
    }
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};

export const postLogin = async (credentials: ILogin) => {
  try {
    const response = await fetch("http://localhost:3000/auth/SignIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error en la solicitud: " + response.status);
    }
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};

export const sendEmail = async (credentials: Partial<ILogin>) => {
  try {
    const response = await fetch(
      "http://localhost:3000/auth/password-recovery",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }
    );
    return response;
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};

export const tokenVerified = async (
  credentials: Omit<INewPassword, "confirmPassword">
) => {
  try {
    const response = await fetch(
      "http://localhost:3000/auth/api/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }
    );
    return response;
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};

export const postReview = async (review: ICreateReview) => {
  const token = getToken();
  console.log("Token:", token);
  try {
    const response = await fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(review),
    });

    if (response.ok) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      console.error("Detalles del error:", errorData);
      throw new Error("Error al enviar la reseña.");
    }
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};

export const getAllReviews = async () => {
  try {
    const response = await fetch("http://localhost:3000/reviews");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error en la solicitud: " + response.status);
    }
  } catch (error) {
    console.error("Error en la operación:", error);
    throw error;
  }
};
