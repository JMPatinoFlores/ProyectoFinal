import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export default function HotelierDashboard() {
  const { isLogged, user } = useContext(UserContext);

  return (
    <div>
      <div>
        {isLogged ? (
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h1 className="text-2xl font-bold">¡Hola, {user?.name}!</h1>
              <h2 className="text-muted-foreground">Tú información personal</h2>
            </div>
            <div className="grid gap-2">
              <h2 className="text-sm font-bold">Correo electrónico</h2>
              <p className="text-muted-foreground">esteban@example.com</p>
            </div>
            <div className="grid gap-2">
              <h2 className="text-sm font-bold">Número de teléfono</h2>
              <p className="text-muted-foreground">+1 (123) 456-7890</p>
            </div>
            <div className="grid gap-2 mb-5">
              <h2 className="text-sm font-bold">Dirección</h2>
              <p className="text-muted-foreground" style={{ color: "#588157" }}>
                Mansilla General 2513 2doA, de la Ciudad Autonoma de Buenos
                Aires
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h2>No estás logueado</h2>
          </div>
        )}
      </div>
    </div>
  );
}
