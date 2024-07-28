import Link from "next/link";
import SearchBar from "../SearchBar";

function Navbar() {
  return (
    <header className="flex items-center h-16 px-4 bg-[#F1F1F1] bg-opacity-5">
      <Link
        href="/"
        className="flex items-center gap-2 font-semibold md:text-base "
      >
        <img src="/logo.png" alt="Logo" className="w-6 h-6 mr-5" />
      </Link>

      <nav className="text-md font-medium">
        <Link
          href="/home"
          className="font-medium mr-6 hover:text-[#f83f3a] hover:border-b-2 hover:border-[#f83f3a] transition duration-300"
        >
          Inicio
        </Link>
        <Link
          href="#"
          className="font-medium mr-6 hover:text-[#f83f3a] hover:border-b-2 hover:border-[#f83f3a] transition duration-300"
        >
          Mapa
        </Link>
        <Link
          href="#"
          className="font-medium mr-6 hover:text-[#f83f3a] hover:border-b-2 hover:border-[#f83f3a] transition duration-300"
        >
          Mis reservas
        </Link>
      </nav>

      <div className="relative flex-1 ml-auto sm:flex-initial">
        <Link href="#">
          <button className=" bg-[#f83f3a] text-white rounded-md p-1 px-2 ml-3 hover:bg-[#e63946]">
            Iniciar Sesión
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;