"use client";

import Clientes from '@/components/Clientes';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';

function ClientesSuperAdmin() {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearch = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    };

    return (
        <div>
            <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
            <Clientes />
        </div>
    )
}

export default ClientesSuperAdmin