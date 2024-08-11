import {
  ICreateReview,
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
