import { useState } from "react";
import Link from "next/link";

interface SideBarProps {
    isSidebarVisible: boolean;
    setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
    toggleSidebar: () => void
}

const Sidebar = ({ isSidebarVisible, setSidebarVisible, toggleSidebar }: SideBarProps) => {



    return (
        <div className={`absolute min-h-full md:min-h-screen bg-gray-100 p-4 border-r border-gray-300 transition-transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64 md:relative md:block z-50`}>
            <div className="flex flex-col">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden mb-4 inline-flex w-[50px] h-[50px] p-2 bg-gray-200 rounded-md hover:bg-gray-300 justify-center items-center"
                >
                    <div>
                        <div className="w-[35px] h-[5px] bg-black my-[6px]"></div>
                        <div className="w-[35px] h-[5px] bg-black my-[6px]"></div>
                        <div className="w-[35px] h-[5px] bg-black my-[6px]"></div>
                    </div>
                </button>
                <h2 className="text-xl font-bold mb-6">Navegación</h2>
            </div>
            <ul className="space-y-4">
                <li>
                    <Link href="/customersSuperAdmin" className="block p-3 bg-gray-200 rounded-lg hover:bg-gray-300 text-center">
                        Clientes
                    </Link>
                </li>
                <li>
                    <Link href="/hotelAdminsSuperAdmin" className="block p-3 bg-gray-200 rounded-lg hover:bg-gray-300 text-center">
                        Administradores de Hoteles
                    </Link>
                </li>
                <li>
                    <Link href="/superAdmins" className="block p-3 bg-gray-200 rounded-lg hover:bg-gray-300 text-center">
                        Super Admins
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
