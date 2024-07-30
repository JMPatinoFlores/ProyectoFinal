// src/components/SearchBar/index.tsx
import { useState } from "react";
import { ISearchBarProps } from "@/interfaces";


function SearchBar({ onSearch }: ISearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-4">
      <input
        type="search"
        placeholder="Buscar por país, ciudad o nombre."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-8 py-1 w-[300px] border border-2px border-[#000000] rounded-md"
      />
      <button type="submit" className="absolute right-2 top-1">
      </button>
    </form>
  );
}

export default SearchBar;
