import React from "react";
import Image from "next/image";

export default function Landing() {
  return (
    <div className="relative z-20 flex items-center overflow-hidden bg-black w-full min-h-screen">
      <div className="absolute inset-0">
        <Image
          src={"/hotel.jpg"}
          alt="Hotel"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          className="opacity-50"
          priority
        />
      </div>
      <div className="relative z-10 w-full text-center text-white flex justify-center items-center">
        <div className="flex flex-col justify-center items-center sm:p-0 max-w-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center text-center sm:text-left">
            <h1 className="title font-extrabold text-lg sm:text-3xl">
              RutaViajera
            </h1>
            <p className="text-sm sm:text-lg mx-2 mt-2 sm:mt-0 underline">
              Donde cada viaje es una historia por contar.
            </p>
          </div>
          <h2 className="font-bold text-4xl sm:text-5xl mt-4 sm:mt-8">
            Tu Aventura
          </h2>
          <h2 className="font-bold text-4xl sm:text-5xl mb-4 sm:mb-8">
            Comienza Aquí
          </h2>
          <button className="btn-primary text-2xl sm:text-3xl py-2 px-4">
            Comenzar
          </button>
        </div>
      </div>
    </div>
  );
}
