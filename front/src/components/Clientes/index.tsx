"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Cliente from "@/components/Cliente";

const Clientes = () => {
    const [clientes, setClientes] = useState([
        // Mock data; replace with actual data fetching logic
        { id: 1, name: "Juan Perez" },
        { id: 2, name: "Maria Lopez" },
        { id: 3, name: "Carlos Ruiz" },
    ]);

    const handleSearch = (query: string) => {
        // Implement search logic
        console.log("Search query:", query);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Clientes</h1>
            <div className="mt-6">
                {clientes.map((cliente) => (
                    <Cliente key={cliente.id} cliente={cliente} />
                ))}
            </div>
        </div>
    );
};

export default Clientes;
