import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Sidebar from '../SidebarSuperAdmin';

const SuperAdminSignUpForm: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className='flex'>
            <Sidebar setSidebarVisible={setSidebarVisible} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
            <div className='mx-auto'>

                <button
                    onClick={toggleSidebar}
                    className="m-4 md:hidden inline-flex w-auto h-auto p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                    <div>
                        <div className="w-[35px] h-[5px] bg-black my-[6px]"></div>
                        <div className="w-[35px] h-[5px] bg-black my-[6px]"></div>
                        <div className="w-[35px] h-[5px] bg-black my-[6px]"></div>
                    </div>
                </button>
                <div className="max-w-4xl md:m-10 min-w-[400px] max-h-[400px] mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Crea un Super Admin</h1>
                    <Formik
                        initialValues={{
                            email: '',
                            name: '',
                            password: ''
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string().email('Email inválido').required('Email requerido'),
                            name: Yup.string().required('Nombre requerido'),
                            password: Yup.string()
                                .min(8, 'La contraseña debe tener al menos 8 caracteres')
                                .matches(/[A-Z]/, 'La contraseña debe tener al menos una mayúscula')
                                .matches(/[a-z]/, 'La contraseña debe tener al menos una minúscula')
                                .matches(/\d/, 'La contraseña debe tener al menos un número')
                                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe tener al menos un carácter especial')
                                .required('Contraseña requerida')
                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                const token = localStorage.getItem("token");
                                if (!token) throw new Error('No estás autorizado.');
                                const response = await fetch('https://back-rutaviajera.onrender.com/auth/superAdminSignUp', {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer: ${token}`
                                    },
                                    body: JSON.stringify(values)
                                });
                                console.log(response);

                                if (!response.ok) {
                                    alert('Hubo un problema al crear el super admin, intenta nuevamente.');
                                    throw new Error('Error en la solicitud.');
                                }
                                alert('Super Admin creado exitosamente.');
                            } catch (error) {
                                console.error('Error during sign up:', error);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700">Email</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700">Nombre</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700">Contraseña</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-[#f83f3a] hover:bg-[#e63946] text-white p-2 rounded w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Enviando...' : 'Crear Super Admin'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminSignUpForm;
