// components/Sidebar.tsx

import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className={`fixed top-0 left-0 h-screen bg-gray-100 p-4 border-r border-gray-300 transition-transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64 md:relative md:block`}>
            <button
                onClick={toggleSidebar}
                className="md:hidden absolute top-4 right-4 p-2 bg-gray-200 rounded-md hover:bg-gray-300 z-10"
            >
                {isSidebarVisible ? 'Close' : 'Open'}
            </button>
            <h2 className="text-xl font-bold mb-6">Navegación</h2>
            <ul className="space-y-4">
                <li>
                    <Link href="/clientesSuperAdmin" className="block p-3 bg-gray-200 rounded-lg hover:bg-gray-300 text-center">
                        Clientes
                    </Link>
                </li>
                <li>
                    <Link href="/hotelAdminsSuperAdmin" className="block p-3 bg-gray-200 rounded-lg hover:bg-gray-300 text-center">
                        Administradores de Hoteles
                    </Link>
                </li>
                <li>
                    <Link href="/superAdminsSuperAdmin" className="block p-3 bg-gray-200 rounded-lg hover:bg-gray-300 text-center">
                        Super Admins
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
