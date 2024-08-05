"use client";

import { UserContext } from "@/context/userContext";
import { IDecodeToken } from "@/interfaces";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const GoogleLoginButton = () => {
  const { googleLogin } = useContext(UserContext);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google/login";
  };

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        console.log(token);

        if (token) {
          const decodedToken = jwtDecode<IDecodeToken>(token);
          const user = {
            id: decodedToken.id,
            name: decodedToken.name,
            email: decodedToken.email,
            isAdmin: decodedToken.isAdmin,
          };

          const success = await googleLogin(token, user);

          if (success) {
            alert("Iniciaste sesión correctamente");
            router.push("/dashboard");
          } else {
            alert("Error al iniciar sesión");
          }
        } else {
          console.log("No se encontró token en la respuesta JSON");
          setError("No se encontró token en la respuesta JSON");
        }
      } catch (err) {
        console.error("Error al obtener datos de autenticación:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido");
        }
      }
    };

    if (
      typeof window !== "undefined" &&
      window.location.pathname === "/api/auth/callback/google/login"
    ) {
      handleAuthCallback();
    }
  }, [googleLogin, router]);

  return (
    <div className="flex justify-center items-center border border-[#f8263a] rounded-md w-full p-2 mb-5">
      <button onClick={handleGoogleLogin} className="flex">
        <Image
          src={"/google.png"}
          alt="google"
          width={24}
          height={24}
          className="mr-2"
        />
        <h2>Iniciar sesión con Google</h2>
      </button>
    </div>
  );
};

export default GoogleLoginButton;
