"use client";

import ResetPassword from "@/components/ResetPassword";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    if (token) {
      setIsTokenValid(true);
    }
    setLoading(false);
  }, [token]);

  if (loading) return <p>Verificando token...</p>;

  return (
    <div>
      <h1>Cambiar contraseña</h1>
      {isTokenValid && token ? (
        <ResetPassword token={token} />
      ) : (
        <p>Token inválido o expirado.</p>
      )}
    </div>
  );
}
