"use client";

import HotelAdmins from "@/components/HotelAdmins";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

function HotelAdminsSuperAdmin() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  return (
    <div>
      <SearchBar placeholder="Buscar por hotel" onSearch={handleSearch} />
      <HotelAdmins searchQuery={searchQuery} />
    </div>
  );
}

export default HotelAdminsSuperAdmin;
