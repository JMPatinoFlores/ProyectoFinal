"use client";

import { useState } from "react";
import ProductsList from "@/components/ProductsList";
import SearchBar from "@/components/SearchBar";
import HotelsFilter from "@/components/HotelsFilter";
import { QueryParams } from "@/interfaces";

function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [queryParams, setQueryParams] = useState<string>("");

  const handleSearch = (query: string) => {
    console.log("HandleSearch en Home con query:", query);
    setSearchQuery(query);
  };

  function buildQueryString(params: QueryParams): void {
    const query = (Object.keys(params) as (keyof QueryParams)[])
      .filter((key) => {
        const value = params[key];
        return (
          value !== undefined && value !== null && value !== "" && value !== 0
        );
      })
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            String(params[key])
          )}`
      )
      .join("&");
    setQueryParams(query);
  }

  const placeholder = "Busca hoteles."

  return (
    <div>
      <SearchBar placeholder={placeholder} onSearch={handleSearch} />
      <ProductsList queryParams={queryParams} searchQuery={searchQuery} />
      <HotelsFilter onFilter={buildQueryString} />
    </div>
  );
}

export default Home;
