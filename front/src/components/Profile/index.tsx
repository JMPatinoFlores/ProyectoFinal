"use client";

import { UserContext } from "@/context/userContext";
import Image from "next/image";
import { useContext } from "react";

export default function Profile() {
  const { isLogged, user } = useContext(UserContext);
  console.log(user);

  return (
    <div>
      <div className="flex-1">
        <h1 className="text-4xl font-semibold m-6 p-2">Mi perfil</h1>
      </div>
      <div>
        <div className="w-2/3 mx-auto max-h-screen h-1/3">
          {isLogged ? (
            <div>
              <div className="flex justify-between my-12">
                <div className="">
                  <h1 className="text-4xl font-bold">¡Hola, {user?.name}!</h1>
                </div>
                <button className="flex px-4 py-3 text-red-600 hover:text-red-700 focus:text-red-700 hover:bg-red-100 focus:bg-red-100 border border-red-600 rounded-md mr-2">
                  <Image
                    src={"/edit.png"}
                    alt="Editar"
                    width={24}
                    height={24}
                    className="invert mr-2"
                  />
                  Editar perfil
                </button>
              </div>
              <div>
                <div className="border border-y-4 border-gray-900 p-4 rounded-lg w-2/3 mx-auto">
                  <h2 className="text-2xl font-light p-2 underline decoration-red-500 underline-offset-8">
                    Tú información personal
                  </h2>
                  <div className="border-b-2 rounded-md p-2 m-2">
                    <h2 className="font-semibold">Fecha de nacimiento</h2>
                    <p className="text-muted-foreground">{user?.birthDate}</p>
                  </div>
                  <div className="border-b-2 rounded-md p-2 m-2">
                    <h2 className="font-semibold">Correo electrónico</h2>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>
                  <div className="border-b-2 rounded-md p-2 m-2">
                    <h2 className="font-semibold">Número de teléfono</h2>
                    <p className="text-muted-foreground">{user?.phone}</p>
                  </div>
                  <div className="border-b-2 rounded-md p-2 m-2 mb-2">
                    <h2 className="font-semibold">Dirección</h2>
                    <p
                      className="text-muted-foreground"
                      style={{ color: "#588157" }}
                    >
                      {user?.address}, {user?.city}, {user?.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2>No estás logueado</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
