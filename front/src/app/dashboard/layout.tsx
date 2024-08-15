"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-36 bg-gray-800 z-40`}
      >
        <DashboardNavbar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="md:hidden p-4 bg-gray-800 text-white flex items-center justify-between">
          <button onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <h1 className="text-lg font-bold">Dashboard</h1>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">{children}</div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
