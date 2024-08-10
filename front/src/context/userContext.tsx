"use client";

import {
  IDecodeToken,
  ILoginUser,
  IReviewResponse,
  IUser,
  IUserContextType,
  IUserResponse,
} from "@/interfaces";
import {
  getAllReviews,
  postAdminRegister,
  postCustomerRegister,
  postLogin,
  postReview,
} from "@/lib/server/fetchUsers";
import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useEffect, useState } from "react";

export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  login: async () => false,
  googleLogin: async () => false,
  customerRegister: async () => false,
  hotelierRegister: async () => false,
  getReviews: async () => {},
  reviews: [],
  logOut: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reviews, setReviews] = useState<IReviewResponse[]>([]);

  const customerRegister = async (user: Omit<IUser, "id">) => {
    try {
      const data = await postCustomerRegister(user);
      console.log(data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const hotelierRegister = async (user: Omit<IUser, "id">) => {
    try {
      const data = await postAdminRegister(user);
      console.log(data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const login = async (credentials: ILoginUser) => {
    try {
      const data = await postLogin(credentials);
      console.log("Datos del servidor: ", data);
      if (data.token) {
        const decodedToken = jwtDecode<IDecodeToken>(data.token);
        console.log("Token decodificado", decodedToken);

        const user: IUserResponse = {
          id: decodedToken.id.toString(),
          name: decodedToken.name,
          lastName: data.user.lastName,
          email: decodedToken.email,
          phone: data.user.phone,
          country: data.user.country,
          city: data.user.city,
          address: data.user.address,
          birthDate: data.user.birthDate,
          isAdmin: decodedToken.isAdmin,
          hotels: data.hotels,
        };

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLogged(true);
        setIsAdmin(decodedToken.isAdmin);
        localStorage.setItem("token", data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      return false;
    }
  };

  const googleLogin = async (token: string, user: IUserResponse) => {
    try {
      if (token) {
        const decodedToken = jwtDecode<IDecodeToken>(token);
        console.log("Token decodificado", decodedToken);

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        setIsLogged(true);
        setIsAdmin(decodedToken.isAdmin);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error en el inicio de sesión con Google:", error);
      return false;
    }
  };

  const getReviews = useCallback(async () => {
    const data = await getAllReviews();
    console.log(data);
  }, []);

  const logOut = () => {
    const confirm = window.confirm("¿Seguro que quieres cerrar sesión?");
    if (confirm) {
      setUser(null);
      setIsLogged(false);
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLogged(true);
        const decodedToken = jwtDecode<IDecodeToken>(token);
        setIsAdmin(decodedToken.isAdmin);
      } else {
        setIsLogged(false);
      }

      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user) as IUserResponse);
      } else {
        setUser(null);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        isAdmin,
        setIsAdmin,
        login,
        googleLogin,
        hotelierRegister,
        customerRegister,
        getReviews,
        reviews,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
