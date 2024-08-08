import React, { useState, ChangeEvent } from 'react';
import { data } from '../../helpers/countriesAndCities'

const HotelsFilter: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');

    const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
        setSelectedCity(''); // Reset city selection when country changes
    };

    const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
    };

    return (
        <div>
            <label>
                Country:
                <select value={selectedCountry} onChange={handleCountryChange}>
                    <option value="" disabled>Select a country</option>
                    {Object.keys(data).map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </label>
            {selectedCountry && (
                <label>
                    City:
                    <select value={selectedCity} onChange={handleCityChange}>
                        <option value="" disabled>Select a city</option>
                        {data[selectedCountry].map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </label>
            )}
        </div>
    );
};

export default HotelsFilter;
