"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="h-16 header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02 z-50">
      <Link href="/" className="flex w-3/12 items-center">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={40}
          height={40}
          className="hover:scale-105 hover:rotate-12 transition duration-100"
          style={{ width: "auto", height: "auto" }}
        />
        <h2 className=" hover:text-red-500 duration-200 font-semibold text-lg p-2">
          RutaViajera{" "}
        </h2>
      </Link>
      <div className="hidden md:flex text-lg font-medium">
        <div className="flex items-center">
          <Link
            href="/home"
            className="p-4 border-b-2 border-red-500 border-opacity-0 hover:border-opacity-100 hover:text-red-500 duration-200 cursor-pointer active"
          >
            Inicio
          </Link>
          <Link
            href="#"
            className="p-4 border-b-2 border-red-500 border-opacity-0 hover:border-opacity-100 hover:text-red-500 duration-200 cursor-pointer"
          >
            Servicios
          </Link>
          <Link
            href="#"
            className="p-4 border-b-2 border-red-500 border-opacity-0 hover:border-opacity-100 hover:text-red-500 duration-200 cursor-pointer"
          >
            Nosotros
          </Link>
          <Link
            href="#"
            className="p-4 border-b-2 border-red-500 border-opacity-0 hover:border-opacity-100 hover:text-red-500 duration-200 cursor-pointer"
          >
            Contacto
          </Link>
        </div>
      </div>
      {session?.user ? (
        <div className="w-3/12 hidden md:flex justify-end items-center">
          <Link href="/dashboard" className=" w-2/3">
            <p className="flex justify-end hover:text-red-500 duration-200 text-sm p-2">
              {session.user.name}
            </p>
          </Link>
          <Link href="/">
            <button
              onClick={() => signOut()}
              className="p-2 flex justify-center items-center text-white rounded-md bg-red-500 hover:bg-red-600 font-medium"
            >
              <Image
                src={"/logout.png"}
                alt="logout"
                width={24}
                height={24}
                className="mr-2"
              />
              Salir
            </button>
          </Link>
        </div>
      ) : (
        <div className="w-3/12 hidden md:flex justify-end items-center font-medium">
          <div>
            <Link href="/login">
              <button className="mr-2 hover:text-red-500 duration-200 text-lg p-2">
                Ingresar
              </button>
            </Link>
            <Link href="/register">
              <button className="p-2 text-white rounded-md bg-red-500 hover:bg-red-600">
                Registrarse
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-red-500">
          <Image src={"/menu.png"} alt="menu" width={32} height={32} />
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col justify-center items-center">
            <Link
              href="/home"
              className="p-4 border-b-2 border-red-500 border-opacity-0 hover:border-opacity-100 hover:text-red-500 duration-200 cursor-pointer active"
            >
              Inicio
            </Link>
            <Link
              href="#"
              className="p-4 border-b-2 border-red-500 border-opacity-0 hover:border-opacity-100 hover:text-red-500 duration-200 cursor-pointer"
            >
              Servicios
            </Link>
            <Link
              href="#"
              className="p-4 border-b-2 border-red-500 border-opacity-0 hover:border-opacity-100 hover:text-red-500 duration-200 cursor-pointer"
            >
              Nosotros
            </Link>
            <Link
              href="#"
              className="p-4 border-b-2 border-red-500 border-opacity-0 hover:border-opacity-100 hover:text-red-500 duration-200 cursor-pointer"
            >
              Contacto
            </Link>
            {session?.user ? (
              <div className="flex justify-center">
                <Link href="/">
                  <button
                    onClick={() => signOut()}
                    className="p-2 flex justify-center items-center font-medium text-red-700"
                  >
                    Cerrar sesión
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Link href="/login">
                  <button className="p-2 flex flex-col justify-center items-center font-medium">
                    Iniciar sesión
                  </button>
                </Link>
                <Link href="/register">
                  <button className="p-2 flex justify-center items-center font-medium text-red-700">
                    Registrarse
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
