"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CheckUser() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Esperamos a que la sesión cargue

    if (session) {
      const user = session.user;
      // Realiza una solicitud para verificar si el usuario está completamente registrado
      fetch(`/api/checkUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user?.email }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.complete) {
            // Si el registro está completo, redirigimos al dashboard
            router.push("/dashboard");
          } else {
            // Si no, redirigimos al formulario de datos adicionales
            router.push("/googleregisterform");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      router.push("/login"); // Redirigimos a la página de inicio de sesión si no hay sesión
    }
  }, [session, status, router]);

  return <div>Verificando usuario...</div>;
}
