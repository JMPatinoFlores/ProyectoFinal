"use client";

import { useEffect, useState } from "react";
import { useContext } from "react";
import { SuperAdminContext } from "../../context/superAdminContext";
import { IHotelOfSuperAdmin, IReviewOfSuperAdmin } from "@/interfaces";
import Rating from "../Rating"; // Assuming you have a Rating component
import { date } from "yup";

interface ReviewsHotelSuperAdminProps {
    hotelId: string;
    searchQuery: string
}

const ReviewsHotelSuperAdmin = ({ hotelId, searchQuery }: ReviewsHotelSuperAdminProps) => {
    const [reviews, setReviews] = useState<IReviewOfSuperAdmin[]>([]);
    const [filteredReviews, setFilteredReviews] = useState<IReviewOfSuperAdmin[]>([]);
    const [selectedReview, setSelectedReview] = useState<IReviewOfSuperAdmin | null>(null);
    const [hotel, setHotel] = useState<IHotelOfSuperAdmin | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const { fetchHotelById, fetchDeleteReviewOfHotel, fetchReviewsBySearch } = useContext(SuperAdminContext);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        if (hotelId) {
            const fetchData = async () => {
                const hotel = await fetchHotelById(hotelId);
                if (hotel && hotel.reviews) {
                    setHotel(hotel)
                    setReviews(hotel.reviews);
                } else if (hotel) {
                    setHotel(hotel)
                    console.log(hotel);
                    
                } else {
                    console.warn('No reviews found for the given hotelId');
                }
            };
            fetchData();
        }
    }, [hotelId]);

    useEffect(() => {
        if (!searchQuery) {
            const newReviews = reviews.map(review => {
                return {
                    ...review,
                    date: review.date.split('-').join('/')
                }
            })
            setFilteredReviews(newReviews);
        }
    }, [reviews]);

    useEffect(() => {
        if (searchQuery && hotel) {
            fetchReviewsBySearch(hotel.id, searchQuery).then((data) => {
                if (Array.isArray(data)) {
                    setFilteredReviews(data);
                } else {
                    console.error("fetchHotelsBySearch did not return an array.");
                    setFilteredReviews([]);
                }
            });
        } else {
            setFilteredReviews(reviews);
        }
    }, [searchQuery, reviews, fetchReviewsBySearch]);

    const handleViewDetails = (review: IReviewOfSuperAdmin) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedReview(null);
    };

    const paginatedReviews = Array.isArray(filteredReviews)
        ? filteredReviews.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
        : [];

    return (
        <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl text-center md:text-3xl font-bold flex-grow mb-4 md:mb-0">
                    Reseñas del hotel: {hotel?.name}
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {paginatedReviews.length > 0 ? paginatedReviews.map((review) => (
                    <div key={review.id} className="relative p-4 bg-gray-100 rounded-lg shadow-md flex flex-col">
                        <div className="mb-2">
                            <div className="flex">
                                <p className="font-bold pr-2">Cliente:</p>
                                <p>{review.customer.name} {review.customer.lastName}</p>
                            </div>
                            <div className="flex">
                                <p className="font-bold pr-2">Fecha:</p>
                                <p>{review.date}</p>
                            </div>
                            <div className="flex">
                                <p className="font-bold pr-2">Calificación:</p>
                                <div className="flex items-center justify-center">
                                    <Rating rating={review.rating.toString()} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            <button
                                className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                                onClick={() => handleViewDetails(review)}
                            >
                                Ver reseña
                            </button>
                            <button
                                className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                                onClick={async () => {
                                    const confirmed = window.confirm("¿Estás seguro que quieres eliminar esta reseña?");
                                    if (!confirmed) return;
                                    try {
                                        const response = await fetchDeleteReviewOfHotel(review.id);
                                        
                                        if (response) {
                                            const hotel = await fetchHotelById(hotelId);
                                            if (hotel && hotel.reviews) setReviews(hotel.reviews);
                                        } else {
                                            alert('Hubo un error al eliminar la reseña.')
                                        }
                                    } catch (error) {
                                        console.log("Error deleting review: ", error);
                                    }
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                )) : (<p>No hay reseñas disponibles.</p>)}

                {isModalOpen && selectedReview && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
                            <h2 className="text-xl text-center font-bold mb-4">Detalles de Reseña</h2>
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10">
                                <div className="w-full max-w-[600px]">
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-bold">Cliente:</label>
                                        <p className="w-2/3 p-2 border rounded bg-gray-100">{selectedReview.customer.name} {selectedReview.customer.lastName}</p>
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-bold">Fecha:</label>
                                        <p className="w-2/3 p-2 border rounded bg-gray-100">{selectedReview.date}</p>
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-semibold">Comentario:</label>
                                        <p className="w-2/3 p-2 border rounded bg-gray-100">{selectedReview.comment}</p>
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <label className="w-1/3 font-semibold">Rating:</label>
                                        <Rating rating={selectedReview.rating.toString()} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button
                                    className="bg-gray-300 text-black rounded-md p-1 px-2 mr-2 hover:bg-gray-400"
                                    onClick={handleCloseModal}
                                >
                                    Cerrar
                                </button>
                                <button
                                    className="bg-[#f83f3a] text-white rounded-md p-1 px-2 hover:bg-[#e63946]"
                                    onClick={async () => {
                                        const confirmed = window.confirm("¿Estás seguro que quieres eliminar esta reseña?");
                                        if (!confirmed) return;
                                        try {
                                            const response = await fetchDeleteReviewOfHotel(selectedReview.id);
                                            if (response) {
                                                const hotel = await fetchHotelById(hotelId);
                                                if (hotel && hotel.reviews) setReviews(hotel.reviews);
                                                handleCloseModal();
                                            } else {
                                                alert('Hubo un error al eliminar la reseña.')
                                            }
                                        } catch (error) {
                                            console.log("Error deleting review: ", error);
                                        }
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-4">
                {currentPage > 1 && (
                    <button
                        className="bg-gray-300 text-black rounded-md p-1 px-2 mr-2 hover:bg-gray-400"
                        onClick={handlePrevPage}
                    >
                        Página Anterior
                    </button>
                )}
                {currentPage * itemsPerPage < filteredReviews.length && (
                    <button
                        className="bg-gray-300 text-black rounded-md p-1 px-2 hover:bg-gray-400"
                        onClick={handleNextPage}
                    >
                        Página Siguiente
                    </button>
                )}
            </div>
        </div>
    );
};

export default ReviewsHotelSuperAdmin;
