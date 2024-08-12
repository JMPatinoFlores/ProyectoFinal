"use client";

import BookingsSuperAdmin from "@/components/BookingsSuperAdmin";

// `page.tsx` in `[customerId]` directory
interface Props {
    params: {
        customerId: string;
    };
}

function BookingsSuperAdminPage({ params }: Props) {
    const { customerId } = params;

    return (
        <BookingsSuperAdmin customerId={customerId} />
    );
}

export default BookingsSuperAdminPage;
