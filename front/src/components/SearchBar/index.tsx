"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { searchHotels } from '@/api/mockApi';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Buscar...', className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      try {
        const hotels = await searchHotels(query);
        const hotelNames = hotels.map((hotel) => hotel.name);
        console.log(hotelNames); // TO DO: render hotel names
        router.push(`/search?q=${query}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className={className}>
      <input
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="pl-8 py-1 w-[300px] border border-2px border-[#000000] rounded-md"
      />
      <button
        type="submit"
        className="bg-[#f83f3a] text-white rounded-md p-1 px-2 ml-3 hover:bg-[#e63946]"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
