"use client";
// src/components/ProductsList/index.tsx
import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { IHotelDetail, IProductsListProps } from "@/interfaces";

function ProductsList({ searchQuery }: IProductsListProps) {
  const [hotels, setHotels] = useState<IHotelDetail[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<IHotelDetail[]>([]);

  useEffect(() => {
    fetch("/hotels.json")
      .then((response) => response.json())
      .then((data) => setHotels(data));
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredHotels = hotels.filter((hotel) => {
        return (
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredHotels(filteredHotels);
    } else {
      setFilteredHotels(hotels);
    }
  }, [searchQuery, hotels]);

  return (
    <div className="grid gap-6 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-2 mb-6 col-span-full">
        Lista de Hoteles
      </h1>
      {filteredHotels.length > 0 ? (
        filteredHotels.map((hotel, index) => (
          <ProductCard key={index} hotel={hotel} />
        ))
      ) : (
        <p>No hay resultados que coincidan con su búsqueda.</p>
      )}
    </div>
  );
}

export default ProductsList;
