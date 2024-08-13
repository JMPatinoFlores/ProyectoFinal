"use client";

import ReviewsHotelSuperAdmin from "@/components/ReviewsHotelSuperAdmin";

interface Props {
    params: {
        hotelId: string;
    };
}

function ReviewsOfHotelOfSuperAdmin({ params }: Props) {
    const { hotelId } = params;
    return (
        <ReviewsHotelSuperAdmin hotelId={hotelId} />
    );
}

export default ReviewsOfHotelOfSuperAdmin
