"use client";

import ResetPassword from "@/components/ResetPassword";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ResetPasswordPage() {
  const params = useParams();
  const token = Array.isArray(params.token) ? params.token[0] : params.token;
  const [isTokenPresent, setIsTokenPresent] = useState(false);

  useEffect(() => {
    if (token) {
      setIsTokenPresent(true);
    }
  }, [token]);

  return (
    <div>
      <h1>Cambiar contraseña</h1>
      {isTokenPresent ? (
        <ResetPassword token={token} />
      ) : (
        <p>Token inválido o expirado.</p>
      )}
    </div>
  );
}
