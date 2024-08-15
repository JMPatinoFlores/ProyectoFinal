"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

const GoogleHotelierRegisterButton = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleGoogleRegister = () => {
    window.location.href =
      "https://back-rutaviajera.onrender.com/auth/api/google/register/hotelAdmin";
  };

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
          localStorage.setItem("token", token);
          alert("Registro exitoso. Ahora puedes iniciar sesión.");
          router.push("/login");
        } else {
          // Obtener posibles errores de la respuesta
          const error = urlParams.get("error");
          const message = urlParams.get("message");

          if (error && message) {
            console.log("Error del backend:", message);
            setError(message);
            alert(`Error: ${message}`);
          } else {
            setError("No se encontró token en la respuesta.");
            alert("Ocurrió un error durante el registro.");
          }
        }
      } catch (err) {
        console.error("Error al obtener datos de autenticación:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido");
        }
        alert(`Error: ${error}`);
      }
    };

    if (
      typeof window !== "undefined" &&
      window.location.pathname ===
        "/api/auth/callback/google/register/hotelAdmin"
    ) {
      handleAuthCallback();
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center border border-[#f8263a] rounded-md w-full p-2 mb-5">
      <button onClick={handleGoogleRegister} className="flex">
        <Image
          src={"/google.png"}
          alt="google"
          width={24}
          height={24}
          className="mr-2"
        />
        <h2>Registrarse con Google</h2>
      </button>
    </div>
  );
};

export default GoogleHotelierRegisterButton;
