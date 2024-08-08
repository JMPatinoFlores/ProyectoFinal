import React, { useState, ChangeEvent, useEffect } from 'react';
import { data } from '../../helpers/countriesAndCities'
import { IHotelsFilterProps, QueryParams } from '@/interfaces';

function HotelsFilter({onFilter}: IHotelsFilterProps) {
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(500);
    const [selectedRating, setSelectedRating] = useState<number>(0);

    useEffect(() => {
        onFilter({
            rating: selectedRating,
            country: selectedCountry,
            city: selectedCity,
            minPrice: minPrice,
            maxPrice: maxPrice
        });
    }, [selectedRating, selectedCountry, selectedCity, minPrice, maxPrice])

    const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
        setSelectedCity(''); // Reset city selection when country changes
    };

    const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
    };

    const handleRatingChange = (rating: number) => {
        setSelectedRating(rating);
    };

    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMinPrice = Number(e.target.value);
        if (newMinPrice <= maxPrice) {
            setMinPrice(newMinPrice);
        }
    };

    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMaxPrice = Number(e.target.value);
        if (newMaxPrice >= minPrice) {
            setMaxPrice(newMaxPrice);
        }
    };

    return (
        <div className="p-4 bg-gray-100">
            <div className="mb-4">
                <label className="block mb-2">
                    Country:
                    <select value={selectedCountry} onChange={handleCountryChange} className="ml-2 border p-2 rounded">
                        <option value="">Select a country</option>
                        {Object.keys(data).map((country) => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </label>
            </div>

            {selectedCountry && (
                <div className="mb-4">
                    <label className="block mb-2">
                        City:
                        <select value={selectedCity} onChange={handleCityChange} className="ml-2 border p-2 rounded">
                            <option value="">Select a city</option>
                            {data[selectedCountry].map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </label>
                </div>
            )}

            {/* Price Range Slider */}
            <div className="mb-4">
                <label className="block mb-2">
                    Price Range:
                    <div className="flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="500"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            className="mx-2"
                        />
                        <input
                            type="range"
                            min="0"
                            max="500"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            className="mx-2"
                        />
                        <span>{`$${minPrice} - $${maxPrice}`}</span>
                    </div>
                </label>
            </div>

            {/* Rating radio buttons */}
            <div className="mb-4">
                <label className="block mb-2">
                    Rating:
                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5].map(rating => (
                            <label key={rating} className="flex items-center">
                                <input
                                    type="radio"
                                    checked={selectedRating === rating}
                                    onChange={() => handleRatingChange(rating)}
                                    className="mr-2"
                                />
                                {rating} Star
                            </label>
                        ))}
                    </div>
                </label>
            </div>
        </div>
    );
};

export default HotelsFilter;
