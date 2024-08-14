import Image from "next/image";
import Link from "next/link";
import ReviewSlider from "@/components/ReviewsSlider";

export default function Landing() {
  return (
    <div>
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
          <div className="flex flex-col justify-center items-center p-4 sm:p-0 max-w-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center text-center sm:text-left mb-4">
              <h1 className="title font-extrabold text-2xl sm:text-4xl">
                RutaViajera
              </h1>
              <p className="text-base sm:text-lg mx-2 mt-2 sm:mt-0 underline">
                Donde cada viaje es una historia por contar.
              </p>
            </div>
            <h2 className="font-bold text-3xl sm:text-4xl mt-4 sm:mt-8">
              Tu Aventura
            </h2>
            <h2 className="font-bold text-3xl sm:text-4xl mb-4 sm:mb-8">
              Comienza Aquí
            </h2>
            <Link href={"/home"}>
              <button className="btn-primary text-xl sm:text-2xl uppercase">
                Comenzar
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto my-8 text-center pb-4 w-full px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col items-center w-full">
          <Image
            src={"/brujula.png"}
            alt="Brujula"
            width={100}
            height={100}
            className="py-4"
          />
          <h2 className="font-semibold text-lg">Descubre rutas</h2>
          <p className="text-gray-500">
            Con nuestras recomendaciones vivirás grandes aventuras.
          </p>
        </div>
        <div className="flex flex-col items-center w-full">
          <Image
            src={"/mapa.png"}
            alt="Mapa"
            width={100}
            height={100}
            className="py-4"
          />
          <h2 className="font-semibold text-lg">Planea tu viaje</h2>
          <p className="text-gray-500">
            Nosotros lo hacemos por ti, tú solo debes disfrutar.
          </p>
        </div>
        <div className="flex flex-col items-center w-full">
          <Image
            src={"/dom.png"}
            alt="Mar"
            width={100}
            height={100}
            className="py-4"
          />
          <h2 className="font-semibold text-lg">Crea experiencias</h2>
          <p className="text-gray-500">
            Tendrás las mejores aventuras que contar.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-items-center mx-auto text-center w-full px-4 sm:px-8 lg:px-16">
        <h2 className="font-bold text-xl mb-4">Testimonios</h2>
        <h3 className="font-medium text-gray-800 mb-4">
          ¿Qué dicen nuestros clientes?
        </h3>
        <ReviewSlider />
      </div>
    </div>
  );
}
