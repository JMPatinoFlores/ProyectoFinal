"use client";

import HotelsSuperAdmin from "@/components/HotelsSuperAdmin";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

interface Props {
  params: {
    hotelAdminId: string;
  };
}

function HotelsSuperAdminPage({ params }: Props) {
  const { hotelAdminId } = params;
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  const placeholder = "Busca un hotel.";

  return (
    <div>
      <SearchBar placeholder={placeholder} onSearch={handleSearch} />
      <HotelsSuperAdmin searchQuery={searchQuery} hotelAdminId={hotelAdminId} />
    </div>
  );
}

export default HotelsSuperAdminPage;
