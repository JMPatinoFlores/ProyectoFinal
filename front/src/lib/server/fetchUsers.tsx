import { ILogin, IUser } from "@/interfaces";

export const postRegister = async (user: Omit<IUser, "id">) => {
  const response = await fetch("http://localhost:3000/auth/cxSignUp", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user)
  })
  const data = await response.json()
  return data
};

export const postLogin = async (credentials: ILogin) => {
  const response = await fetch("http://localhost:3000/auth/SignIn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await response.json()
  return data
};

export const postRegisterAdmin = async (user: Omit<IUser, "id">) => {
  const response = await fetch("http://localhost:3000/auth/adminSignUp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};


export const getAllCustomers = async () => {
  const response = await fetch("http://localhost:3000/customers/allCustomers");
  const data = await response.json()
  return data;
}

export const getAllHotels = async () => {
  const response = await fetch("http://localhost:3000/hotel-admins/getAllHotels");
  const data = await response.json()
  return data;
}