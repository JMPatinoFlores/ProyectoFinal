import React, { useState, ChangeEvent, useEffect } from "react";
import { data } from "../../helpers/countriesAndCities";
import { IHotelsFilterProps } from "@/interfaces";
import { FaStar } from "react-icons/fa";

function HotelsFilter({ onFilter }: IHotelsFilterProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(0);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(0);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(0);

  useEffect(() => {
    onFilter({
      rating: selectedRating,
      country: selectedCountry,
      city: selectedCity,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    });
  }, [selectedRating, selectedCountry, selectedCity, minPrice, maxPrice]);

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating || undefined);
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = Number(e.target.value);
    if (maxPrice === undefined || newMinPrice <= maxPrice) {
      setMinPrice(newMinPrice || undefined);
    }
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = Number(e.target.value);
    if (minPrice === undefined || newMaxPrice >= minPrice) {
      setMaxPrice(newMaxPrice || undefined);
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <div className="mb-4">
        <label className="block mb-2 text-gray-700 font-bold">
          Selecciona un País
        </label>
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="border rounded-md p-2 mt-1 w-full max-w-[500px]"
        >
          <option value="">Selecciona un País</option>
          {Object.keys(data).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-bold">
            Selecciona una Ciudad
          </label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="border rounded-md p-2 mt-1 w-full max-w-[500px]"
          >
            <option value="">Selecciona una Ciudad</option>
            {data[selectedCountry].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4 max-w-[500px]">
        <label className="block mb-2 text-gray-700 font-bold">Precio:</label>
        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max="500"
            value={minPrice !== undefined ? minPrice : 0}
            onChange={handleMinPriceChange}
            className="mx-2 w-full"
          />
          <input
            type="range"
            min="0"
            max="500"
            value={maxPrice !== undefined ? maxPrice : 500}
            onChange={handleMaxPriceChange}
            className="mx-2 w-full"
          />
          <span className="ml-4 text-gray-700 font-medium">{`$${
            minPrice !== undefined ? minPrice : 0
          } - $${maxPrice !== undefined ? maxPrice : 500}`}</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700 font-bold">
          Calificación:
        </label>
        <div className="flex flex-wrap items-center">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="flex items-center mb-2 sm:mb-0">
              <input
                type="radio"
                checked={selectedRating === rating}
                onChange={() => handleRatingChange(rating)}
                className="ml-2"
              />
              <div className="flex items-center ml-2">
                <p className="mr-2">{rating}</p>
                <FaStar style={{ color: "gold" }} />
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotelsFilter;
