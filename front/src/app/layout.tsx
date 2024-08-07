import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/userContext";
import SessionWrapper from "@/lib/auth/SessionWrapper";
import { HotelProvider } from "@/context/hotelContext";

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
      <body className={inter.className}>
        <SessionWrapper>
          <div className="min-h-screen flex flex-col justify-between">
            <UserProvider>
              <HotelProvider>
                <Navbar />
                  <main className="flex-1">{children}</main>
                <Footer />
              </HotelProvider>
            </UserProvider>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
