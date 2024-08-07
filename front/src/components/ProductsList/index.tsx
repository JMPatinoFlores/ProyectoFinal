"use client";

import { useState, useEffect, useContext } from "react";
import ProductCard from "../ProductCard";
import { IHotelDetail, IProductsListProps } from "@/interfaces";
import { HotelContext } from "@/context/hotelContext";

function ProductsList({ searchQuery }: IProductsListProps) {
  const [hotels, setHotels] = useState<IHotelDetail[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<IHotelDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { fetchHotels, fetchHotelsBySearch } = useContext(HotelContext);

  useEffect(() => {
    fetchHotels()
      .then((data) => {
        setHotels(data);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
        setHotels([]);
      });
  }, [fetchHotels]);

  useEffect(() => {
    if (searchQuery) {
      fetchHotelsBySearch(searchQuery)
        .then((data) => {
          setFilteredHotels(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error("Error fetching hotels by search:", error);
          setFilteredHotels([]);
        });
    } else {
      setFilteredHotels(hotels);
    }
  }, [searchQuery, hotels, fetchHotelsBySearch]);

  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      {filteredHotels.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-[#f83f3a] text-white rounded-md p-1 px-2 ml-3 hover:bg-[#e63946]"
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            className="bg-[#f83f3a] text-white rounded-md p-1 px-2 ml-3 hover:bg-[#e63946]"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
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
