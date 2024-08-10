import Link from "next/link";

interface ClienteProps {
    cliente: {
        id: number;
        name: string;
    };
}

const Cliente = ({ cliente }: ClienteProps) => {
    return (
        <div className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{cliente.name}</h3>
            <div className="mt-2">
                <Link href={`/clientes/crear`}>
                    <a className="text-blue-600 hover:underline mr-4">Crear</a>
                </Link>
                <Link href={`/clientes/editar/${cliente.id}`}>
                    <a className="text-yellow-600 hover:underline mr-4">Editar</a>
                </Link>
                <Link href={`/clientes/eliminar/${cliente.id}`}>
                    <a className="text-red-600 hover:underline mr-4">Eliminar</a>
                </Link>
                <Link href={`/clientes/ver-reservas/${cliente.id}`}>
                    <a className="text-green-600 hover:underline">Ver Reservas</a>
                </Link>
            </div>
        </div>
    );
};

export default Cliente;
