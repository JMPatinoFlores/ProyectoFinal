import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/userContext";
import SessionWrapper from "@/lib/auth/SessionWrapper";
import { HotelProvider } from "@/context/hotelContext";
import { ThemeModeScript } from "flowbite-react";
import { SuperAdminProvider } from "@/context/superAdminContext";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RutaViajera",
  description: "Donde cada viaje es una historia por contar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <SessionWrapper>
          <div className="min-h-screen flex flex-col justify-between">
            <SuperAdminProvider>
              <UserProvider>
                <HotelProvider>
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </HotelProvider>
              </UserProvider>
            </SuperAdminProvider>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
