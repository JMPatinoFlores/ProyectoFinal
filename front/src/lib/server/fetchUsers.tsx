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
  const response = await fetch("http://localhost:3000/auth/cxSignUp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const postAdminRegister = async (user: Omit<IUser, "id">) => {
  const response = await fetch("http://localhost:3000/auth/adminSignUp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const postLogin = async (credentials: ILogin) => {
  const response = await fetch("http://localhost:3000/auth/SignIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
};

export const sendEmail = async (credentials: Partial<ILogin>) => {
  const response = await fetch("http://localhost:3000/auth/password-recovery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response;
};

export const tokenVerified = async (
  credentials: Omit<INewPassword, "confirmPassword">
) => {
  const response = await fetch(
    "http://localhost:3000/auth/api/reset-password",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }
  );
  return response;
};

export const postReview = async (review: ICreateReview) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  console.log("Token:", token);
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
};

export const getAllReviews = async () => {
  const response = await fetch("http://localhost:3000/reviews");
};

export const putUpdateProfile = async (userId: string, profileData: IEditProfileUser) => {
  try {
      const token = typeof window !== "undefined" && localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/customers/${userId}`, {
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

    const response = await fetch(`http://localhost:3000/hotel-admins/${userId}`, {
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