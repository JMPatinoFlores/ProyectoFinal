"use client";

import { useState, useEffect, useContext } from "react";
import ProductCard from "../ProductCard";
import { IHotelDetail, IProductsListProps } from "@/interfaces";
import { HotelContext } from "@/context/hotelContext";

function ProductsList({ searchQuery, queryParams }: IProductsListProps) {
  const [hotels, setHotels] = useState<IHotelDetail[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<IHotelDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const { fetchHotels, fetchHotelsBySearch, fetchHotelsByFilters } =
    useContext(HotelContext);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    if (searchQuery) {
      console.log("Ejecutando búsqueda con:", searchQuery);
      fetchHotelsBySearch(searchQuery).then((data) => {
        if (Array.isArray(data)) {
          setFilteredHotels(data);
        } else {
          setFilteredHotels([]);
        }
      });
    } else if (queryParams) {
      fetchHotelsByFilters(queryParams).then((data) => {
        if (Array.isArray(data)) {
          setFilteredHotels(data);
        } else {
          setFilteredHotels([]);
        }
        console.log(data);
        
      });
    } else {
      fetchHotels().then((data) => {
        if (Array.isArray(data)) {
          setFilteredHotels(data);
        } else {
          setFilteredHotels([]);
        }
      });
    }
  }, [searchQuery, queryParams, fetchHotels, fetchHotelsBySearch]);

  const paginatedHotels = Array.isArray(filteredHotels)
    ? filteredHotels.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-2 mb-6">
        Lista de Hoteles
      </h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-full">
          {paginatedHotels.length > 0 ? (
            paginatedHotels.map((hotel, index) => (
              <ProductCard key={index} hotel={hotel} />
            ))
          ) : (
            <p>No hay resultados que coincidan con su búsqueda.</p>
          )}
        </div>
      </div>
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
            disabled={
              currentPage >= Math.ceil(filteredHotels.length / itemsPerPage)
            }
          >
            Siguiente
          </button>
          <span className="ml-4">
            Página {currentPage} de{" "}
            {Math.ceil(filteredHotels.length / itemsPerPage)}
          </span>
        </div>
      )}
    </div>
  );
}

export default ProductsList;
