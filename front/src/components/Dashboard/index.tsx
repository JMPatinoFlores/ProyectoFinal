"use client";

import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import CustomerDashboard from "../CustomerDashboard";
import HotelierDashboard from "../HotelierDashboard";

function Dashboard() {
  const { isAdmin } = useContext(UserContext);

  return <div>{isAdmin ? <HotelierDashboard /> : <CustomerDashboard />}</div>;
}

export default Dashboard;
