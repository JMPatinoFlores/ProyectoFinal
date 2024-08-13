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
    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <ReviewsHotelSuperAdmin searchQuery={searchQuery} hotelId={hotelId} />
        </div>
    );
}

export default ReviewsOfHotelOfSuperAdmin
