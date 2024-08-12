import { useState } from "react";
import { ISearchBarProps } from "@/interfaces";
import Image from "next/image";

function SearchBar({ onSearch }: ISearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Búsqueda activada con query:", searchQuery);
    onSearch(searchQuery);
  };

  return (
    <div className="bg-slate-800 px-4 py-3 w-full">
      <form onSubmit={handleSearch}>
        <div className="w-full md:w-3/12">
          <div className="flex">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex rounded-l-md bg-white text-black py-2 px-4 focus:outline-none  border border-red-600"
              style={{ borderRight: "none" }}
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-r-md"
            >
              <Image src={"/search.png"} alt="search" width={24} height={24} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
