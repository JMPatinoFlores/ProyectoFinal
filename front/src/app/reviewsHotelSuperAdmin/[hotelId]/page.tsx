"use client";

import ReviewsHotelSuperAdmin from "@/components/ReviewsHotelSuperAdmin";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

interface Props {
    params: {
        hotelId: string;
    };
}

function ReviewsOfHotelOfSuperAdmin({ params }: Props) {
    const { hotelId } = params;
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearch = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    };
    const placeholder = "Busca reseñas del hotel."
    return (
        <div>
            <SearchBar placeholder={placeholder} onSearch={handleSearch} />
            <ReviewsHotelSuperAdmin searchQuery={searchQuery} hotelId={hotelId} />
        </div>
    );
}

export default ReviewsOfHotelOfSuperAdmin
