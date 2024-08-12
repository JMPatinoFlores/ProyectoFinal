"use client";

import { useContext, useEffect } from "react";
import Profile from "../Profile";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";

function Dashboard() {
  const router = useRouter();
  const { isLogged } = useContext(UserContext);

  if (!isLogged) {
    router.push("/login");
  }

  return <Profile />;
}

export default Dashboard;
