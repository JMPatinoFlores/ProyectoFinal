"use client";

import RoomsOfRoomType from "@/components/RoomsSuperAdmin";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

interface Props {
    params: {
        roomTypeId: string;
    };
}

function RoomTypesSuperAdminPage({ params }: Props) {
    const { roomTypeId } = params;
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearch = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    };

    const placeholder = "Busca un cuarto."

    return (
        <div>
            <SearchBar placeholder={placeholder} onSearch={handleSearch} />
            <RoomsOfRoomType searchQuery={searchQuery} roomTypeId={roomTypeId} />
        </div>
    );
}

export default RoomTypesSuperAdminPage;
