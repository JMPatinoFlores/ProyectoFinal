const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

import {
  ICreateReview,
  IEditProfileHotelier,
  IEditProfileUser,
  ILogin,
  INewPassword,
  IReview,
  IUser,
} from "@/interfaces";

export const postCustomerRegister = async (user: Omit<IUser, "id">) => {
  try {
    const response = await fetch("https://back-rutaviajera.onrender.com/auth/cxSignUp", {
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
    const response = await fetch("https://back-rutaviajera.onrender.com/auth/adminSignUp", {
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
    const response = await fetch("https://back-rutaviajera.onrender.com/auth/SignIn", {
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
      "https://back-rutaviajera.onrender.com/auth/password-recovery",
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
      "https://back-rutaviajera.onrender.com/auth/api/reset-password",
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
    const response = await fetch("https://back-rutaviajera.onrender.com/reviews", {
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
    const response = await fetch("https://back-rutaviajera.onrender.com/reviews");
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

export const putUpdateProfile = async (userId: string, profileData: IEditProfileUser) => {
  try {
      const token = typeof window !== "undefined" && localStorage.getItem("token");

    const response = await fetch(`https://back-rutaviajera.onrender.com/customers/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el perfil");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw new Error("Error al actualizar el perfil");
  }
};
export const putUpdateProfileHotelier = async (userId: string, profileData: IEditProfileHotelier) => {
  try {
      const token = typeof window !== "undefined" && localStorage.getItem("token");

    const response = await fetch(`https://back-rutaviajera.onrender.com/hotel-admins/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el perfil");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw new Error("Error al actualizar el perfil");
  }
};