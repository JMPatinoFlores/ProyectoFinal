"use client";

import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { IHotelDetail, IProductsListProps } from "@/interfaces";

function ProductsList({ searchQuery }: IProductsListProps) {
  const [hotels, setHotels] = useState<IHotelDetail[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<IHotelDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

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

  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="grid grid-cols-1 gap-6 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6">
    <h1 className="text-3xl font-bold text-center text-gray-800 mt-2 mb-6 col-span-full">
      Lista de Hoteles
    </h1>
    {paginatedHotels.length > 0 ? (
      paginatedHotels.map((hotel, index) => (
        <ProductCard key={index} hotel={hotel} />
      ))
    ) : (
      <p>No hay resultados que coincidan con su búsqueda.</p>
    )}
    {filteredHotels.length > 8 && (
      <div className="flex justify-center mt-4">
        <button
          className="bg-[#f83f3a] text-white rounded-md p-1 px-2 ml-3 hover:bg-[#e63946]"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          className="bg-[#f83f3a] text-white rounded-md p-1 px-2 ml-3 hover:bg-[#e63946]"
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(filteredHotels.length / itemsPerPage)}
        >
          Siguiente
        </button>
        <span className="ml-4">
          Página {currentPage} de {Math.ceil(filteredHotels.length / itemsPerPage)}
        </span>
      </div>
    )}
  </div>
  );
}

export default ProductsList;
