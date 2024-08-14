"use client";

import HotelAdmins from '@/components/HotelAdmins';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';

function HotelAdminsSuperAdmin() {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearch = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    };

    const placeholder = "Busca un administrador de hotel."

    return (
        <div>
            <SearchBar placeholder={placeholder} onSearch={handleSearch} />
            <HotelAdmins searchQuery={searchQuery} />
        </div>
    )
}

export default HotelAdminsSuperAdmin