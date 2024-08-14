import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (value: string) => void;
    defaultValue: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, defaultValue }) => {
    const [inputValue, setInputValue] = useState(defaultValue);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-lg font-bold mb-4">Actualizar número de habitación</h2>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="mt-4 p-2 border border-gray-300 rounded-md w-full"
                />
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black p-2 rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onConfirm(inputValue)}
                        className="bg-blue-500 text-white p-2 rounded-md"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
