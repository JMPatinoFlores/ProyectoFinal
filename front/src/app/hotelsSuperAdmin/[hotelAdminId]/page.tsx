"use client";

import HotelsSuperAdmin from "@/components/HotelsSuperAdmin";

// `page.tsx` in `[hotelAdminId]` directory
interface Props {
    params: {
        hotelAdminId: string;
    };
}

function HotelsSuperAdminPage({ params }: Props) {
    const { hotelAdminId } = params;

    return (
        <HotelsSuperAdmin hotelAdminId={hotelAdminId} />
    );
}

export default HotelsSuperAdminPage;
