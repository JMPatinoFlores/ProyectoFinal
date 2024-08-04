"use client";

import ResetPassword from "@/components/ResetPassword";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isTokenPresent, setIsTokenPresent] = useState(false);

  useEffect(() => {
    if (token) {
      setIsTokenPresent(true);
    }
  }, [token]);

  return (
    <div>
      <h1>Cambiar contraseña</h1>
      {isTokenPresent && token ? (
        <ResetPassword token={token} />
      ) : (
        <p>Token inválido o expirado.</p>
      )}
    </div>
  );
}
