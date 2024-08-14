"use client";

import Customers from '@/components/CustomersSuperAdmin';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';

function CustomersSuperAdmin() {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearch = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    };

    const placeholder = "Busca clientes."

    return (
        <div>
            <SearchBar placeholder={placeholder} onSearch={handleSearch} />
            <Customers searchQuery={searchQuery} />
        </div>
    );
}

export default CustomersSuperAdmin;
