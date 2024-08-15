import { UserContext } from "@/context/userContext";
import { useContext, useState } from "react";

export default function CustomerBookings() {
  const { getBookings } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  return (
    <div>
      <h1>Customer Dashboard</h1>
    </div>
  );
}
