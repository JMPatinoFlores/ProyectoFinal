"use client";

import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import CustomerDashboard from "../CustomerDashboard";
import Profile from "../Profile";

function Dashboard() {
  const { isAdmin } = useContext(UserContext);

  return <div>{isAdmin ? <Profile /> : <CustomerDashboard />}</div>;
}

export default Dashboard;
