"use client";

import { UserContext } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

function DashboardNavbar() {
  const { isAdmin } = useContext(UserContext);

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-800 text-gray-500 items-center w-32">
      <nav className="flex flex-col mx-4 my-6 space-y-4">
        <Link
          href="/dashboard/profile"
          className="flex items-center justify-center p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-700 focus:bg-gray-700 rounded-lg"
        >
          <span className="sr-only">Perfil</span>
          <Image
            src="/profile2.png"
            alt="Perfil"
            width={55}
            height={55}
            className="rounded-lg"
          />
        </Link>
        {isAdmin && (
          <div>
            <Link
              href="/dashboard/myhotels"
              className="flex items-center justify-center p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-700 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">Mis hoteles</span>
              <Image
                src="/myhotels.png"
                alt="Mis Hoteles"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </Link>
            <Link
              href="/dashboard/bookings"
              className="flex items-center justify-center p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-700 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">Reservas</span>
              <Image
                src="/booking.png"
                alt="Reservas"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </Link>
            <Link
              href="/dashboard/customers"
              className="flex items-center justify-center p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-700 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">Mis clientes</span>
              <Image
                src="/customers.png"
                alt="Mis clientes"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </Link>
          </div>
        )}
      </nav>
      <div className="mx-4 mb-6">
        <button className="flex items-center justify-center p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-700 focus:bg-gray-700 rounded-lg">
          <span className="sr-only">Ajustes</span>
          <Image
            src="/settings.png"
            alt="Ajustes"
            width={48}
            height={48}
            className="rounded-lg"
          />
        </button>
      </div>
    </div>
  );
}

export default DashboardNavbar;
