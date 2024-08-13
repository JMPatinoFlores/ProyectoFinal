"use client";

import { UserContext } from "@/context/userContext";
import { ICreateReview, IPostReview, IReview } from "@/interfaces";
import { postReview } from "@/lib/server/fetchUsers";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";

export function PostReview() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { id } = useParams();
  const { user, isAdmin } = useContext(UserContext);

  const initialValues = {
    comment: "",
    rating: 0,
  };

  const handleSubmit = async (
    values: IPostReview,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (!user?.id) {
      alert("Inicia sesión para continuar");
      setSubmitting(false);
      return;
    }

    const review: ICreateReview = {
      comment: values.comment,
      rating: values.rating,
      clienteId: user.id,
      hotelId: id as string,
    };

    try {
      const data = await postReview(review);
      console.log("Reseña enviada: ", data);
      alert("¡Gracias por tus comentarios!");
    } catch (error) {
      console.error("Error", error);
    }
    setSubmitting(false);
  };

  return (
    <div className="w-full m-2">
      {!isAdmin && (
        <div>
          <h3 className="font-light">¿Cómo calificarías tu experiencia?</h3>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={(values) => {
              const errors: Partial<IReview> = {};
              if (values.rating === 0) {
                alert("Selecciona tu calificación");
              }
              return errors;
            }}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="rating" className="font-light">
                    {" "}
                  </label>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => {
                      const currentRate = index + 1;
                      console.log(currentRate);
                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            name="rating"
                            value={currentRate}
                            className="hidden"
                            onClick={() => {
                              setFieldValue("rating", currentRate);
                              setRating(currentRate);
                              console.log("Rating: ", currentRate);
                            }}
                          />
                          <FaStar
                            className="cursor-pointer"
                            color={
                              currentRate <= (hover || rating)
                                ? "#FBC02D"
                                : "#C9C9C9"
                            }
                            size={30}
                            onMouseEnter={() => setHover(currentRate)}
                            onMouseLeave={() => setHover(rating)}
                          />
                        </label>
                      );
                    })}
                  </div>
                  <ErrorMessage
                    name="rating"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="comment">Describe tu experiencia</label>
                  <Field
                    required
                    as="textarea"
                    name="comment"
                    className="w-full p-2 border rounded-md"
                    rows={4}
                  />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-secondary"
                  disabled={isSubmitting}
                >
                  Enviar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default PostReview;
