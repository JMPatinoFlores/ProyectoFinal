"use client";

import { useState } from "react";
import ProductsList from "@/components/ProductsList";
import SearchBar from "@/components/SearchBar";
import HotelsFilter from "@/components/HotelsFilter";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  return (
    <div>
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      <ProductsList searchQuery={searchQuery} />
      <HotelsFilter />
    </div>
  );
}

export default Home;
