"use client";

import { useState } from "react";
import ProductsList from "@/components/ProductsList";
import SearchBar from "@/components/SearchBar";

function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ProductsList searchQuery={searchQuery} />
    </div>
  );
}

export default Home;