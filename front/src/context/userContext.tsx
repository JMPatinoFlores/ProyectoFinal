"use client";

import {
  IDecodeToken,
  ILoginUser,
  IUser,
  IUserContextType,
  IUserResponse,
} from "@/interfaces";
import {
  postAdminRegister,
  postCustomerRegister,
  postLogin,
} from "@/lib/server/fetchUsers";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  login: async () => false,
  customerRegister: async () => false,
  hotelierRegister: async () => false,
  logOut: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Partial<IUserResponse> | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  const customerRegister = async (user: Omit<IUser, "id">) => {
    try {
      const data = await postCustomerRegister(user);
      console.log(data); // cambiar al await login
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
      console.log(data);
      if (data.token) {
        const decodedToken = jwtDecode<IDecodeToken>(data.token);
        console.log("Token decodificado", decodedToken);

        const user: IUserResponse = {
          id: decodedToken.id,
          email: decodedToken.email,
        };

        if (data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
        }

        setIsLogged(true);
        localStorage.setItem("token", data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      return false;
    }
  };

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
      } else {
        setIsLogged(false);
      }

      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
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
        login,
        hotelierRegister,
        customerRegister,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
