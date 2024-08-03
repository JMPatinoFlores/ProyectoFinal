import { ILogin, IUser } from "@/interfaces";

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
