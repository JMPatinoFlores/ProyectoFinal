"use client";

import RoomTypesHotel from "@/components/RoomTypesSuperAdmin";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

interface Props {
    params: {
        hotelId: string;
    };
}

function RoomTypesSuperAdminPage({ params }: Props) {
    const { hotelId } = params;
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearch = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    };

    const placeholder = "Busca un tipo de cuarto."

    return (
        <div>
            <SearchBar placeholder={placeholder} onSearch={handleSearch} />
            <RoomTypesHotel searchQuery={searchQuery} hotelId={hotelId} />
        </div>
    );
}

export default RoomTypesSuperAdminPage;
