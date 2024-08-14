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
} from "@/lib/server/fetchUsers";
import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  login: async () => false,
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

  const customerRegister = async (
    user: Omit<IUser, "id">
  ): Promise<boolean> => {
    try {
      const data = await postCustomerRegister(user);
      console.log(data);
      return true;
    } catch (error) {
      console.error("Error en el registro de cliente:", error);
      return false;
    }
  };

  const hotelierRegister = async (
    user: Omit<IUser, "id">
  ): Promise<boolean> => {
    try {
      const data = await postAdminRegister(user);
      console.log(data);
      return true;
    } catch (error) {
      console.error("Error en el registro de administrador:", error);
      return false;
    }
  };

  const login = async (credentials: ILoginUser): Promise<boolean> => {
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
          hotels: data.user.hotels,
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

  const getReviews = useCallback(async () => {
    try {
      const data = await getAllReviews();
      setReviews(data);
      console.log("Revisiones obtenidas:", data);
    } catch (error) {
      console.error("Error al obtener revisiones:", error);
    }
  }, []);

  const router = useRouter();
  const logOut = () => {
    const confirm = Swal.fire({
      title: "¿Estás seguro?",
      text: "Tu sesión se cerrará.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if(result.isConfirmed)
      {
      router.push("/");
      setUser(null);
      setIsLogged(false);
      setIsAdmin(false);
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }}
    })
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
