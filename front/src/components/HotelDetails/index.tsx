"use client";

import useGoogleMapsDataLocation from "../../lib/googleMaps/googleMapsData";
import { ICreateBooking, IHotelDetail, IRoomType } from "@/interfaces";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Rating from "../Rating";
import PostReview from "../PostReview";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validateFormBooking } from "@/helpers/validateData";
import { useEffect, useState } from "react";
import { getRoomTypesByHotelId, postBooking } from "@/lib/server/fetchHotels";
import GatewayPayment from "../PaymentGateaway";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

interface Props {
  hotel: IHotelDetail | null;
}

const extendedValidateFormBooking = (values: ICreateBooking) => {
  const errors: Partial<ICreateBooking> = validateFormBooking(values);

  const today = getTodayDate();

  // Validation for the roomTypesIdsAndDates array
  if (values.roomTypesIdsAndDates.length === 0) {
    errors.roomTypesIdsAndDates = [
      { roomTypeId: "", checkInDate: "", checkOutDate: "" },
    ];
  } else {
    values.roomTypesIdsAndDates.forEach((item, index) => {
      if (item.checkInDate && item.checkInDate < today) {
        if (!errors.roomTypesIdsAndDates) errors.roomTypesIdsAndDates = [];
        errors.roomTypesIdsAndDates[index] = {
          ...(errors.roomTypesIdsAndDates[index] || {}),
          checkInDate: "La fecha de entrada no puede ser anterior a hoy",
        };
      }

      if (item.checkOutDate && item.checkOutDate < item.checkInDate) {
        if (!errors.roomTypesIdsAndDates) errors.roomTypesIdsAndDates = [];
        errors.roomTypesIdsAndDates[index] = {
          ...(errors.roomTypesIdsAndDates[index] || {}),
          checkOutDate:
            "La fecha de salida no puede ser anterior a la fecha de entrada",
        };
      }
    });
  }

  return errors;
};

interface TokenPayload {
  id: string;
}

const HotelDetail: React.FC<Props> = ({ hotel }) => {
  const { isLoaded, mapCenter, marker } = useGoogleMapsDataLocation(hotel);
  const [userId, setUserId] = useState<string | null>(null);
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);
  const [selectedHotelId, setSelectedHotelId] = useState<string>("");
  const [showConfirmBooking, setShowConfirmBooking] = useState(false);


    useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
      console.log("Token devuelto: ", token);
    if (token) {
      const decodedToken: TokenPayload = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.id);
    }
  }, []);
  
    useEffect(() => {
      if (hotel) {
        // Usa roomstype directamente del hotel
        setRoomTypes(hotel.roomstype || []);
      }
    }, [hotel]);

    const initialValues: ICreateBooking = {
      customerId: userId || "",
      hotelId: hotel?.id || "",
      roomTypesIdsAndDates: [
        { roomTypeId: "", checkInDate: "", checkOutDate: "" },
      ],
    };

    const handleSubmit = async (booking: ICreateBooking) => {

      const formData = {
        customerId: booking.customerId,
        hotelId: booking.hotelId,
        roomTypesIdsAndDates: booking.roomTypesIdsAndDates.map((item) => ({
          roomTypeId: item.roomTypeId,
          checkInDate: item.checkInDate,
          checkOutDate: item.checkOutDate,
        })),
      };

      try {
        const response = await postBooking(formData);
        console.log("Datos de la reserva realizada:", response);
        if (response) {
          alert("Reserva hecha exitosamente");
          setShowConfirmBooking(true);
        }
      } catch (error) {
        console.log("Error al realizar la reserva: ", error);
      }
    };

    if (!hotel)
      return (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      );

    if (!isLoaded)
      return (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      );

    if (!mapCenter)
      return (
        <div className="flex justify-center items-center h-64">
          <p>Loading map...</p>
        </div>
      );

  return (
    <div className="flex flex-col items-center mx-auto w-4/5">
      <div className="w-full mb-4">
        <div className="flex w-full h-96 mb-4">
          <Image
            unoptimized
            src={hotel.images[0]}
            alt={hotel.name}
            width={400}
            height={300}
            className="object-cover rounded-lg flex-1 m-2"
          />
          <div className="w-full mb-4 flex-1 m-4">
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold text-center pb-4">
                {hotel.name}
              </h2>
              <Rating rating={hotel.rating} />
            </div>
            <hr className="hr-text mb-3" data-content="" />
            <h2 className="text-2xl font-semibold">Descripción</h2>
            <p className="pb-4">{hotel.description}</p>
            <h2 className="text-2xl font-semibold">Servicios del Hotel</h2>
            <ul className="list-disc pl-5">
              {hotel.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex">
          <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden m-2 flex-1">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{ height: "400px", width: "100%" }}
                center={mapCenter}
                zoom={12}
              >
                {marker && <Marker position={marker.getPosition()} />}
              </GoogleMap>
            )}
          </div>
          <div className="flex-1 m-4">
            <h2 className="font-semibold text-2xl">Reservar</h2>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validate={extendedValidateFormBooking}
            >
              {({ isSubmitting, values }) => (
                <Form className="space-y-4">
                  {values.roomTypesIdsAndDates.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div className="formDiv flex-1 mb-2">
                        <label htmlFor="roomType" className="formLabel">
                          Tipo de Habitación
                        </label>
                        <Field
                          as="select"
                          name={`roomTypesIdsAndDates[${index}].roomTypeId`}
                          className="formInput"
                        >
                          <option value="">
                            Seleccione un tipo de habitación
                          </option>
                          {roomTypes.length > 0 ? (
                            roomTypes.map((roomType) => (
                              <option
                                key={String(roomType.id)}
                                value={roomType.id}
                              >
                                {roomType.name}; ${roomType.price}; Capacidad: {roomType.capacity};
                                Baños: {roomType.totalBathrooms}; Camas:{" "}
                                {roomType.totalBeds}
                              </option>
                            ))
                          ) : (
                            <option value="">
                              No hay tipos de habitación disponibles
                            </option>
                          )}
                        </Field>
                      </div>
                      <div className="formDiv flex-1 mb-4">
                        <div className="flex space-x-4">
                          <div className="w-1/2">
                            <label
                              htmlFor={`roomTypesIdsAndDates[${index}].checkInDate`}
                              className="formLabel"
                            >
                              Fecha de entrada:
                            </label>
                            <Field
                              type="date"
                              name={`roomTypesIdsAndDates[${index}].checkInDate`}
                              className="formInput"
                            />
                            <ErrorMessage
                              name={`roomTypesIdsAndDates[${index}].checkInDate`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                          <div className="w-1/2">
                            <label
                              htmlFor={`roomTypesIdsAndDates[${index}].checkOutDate`}
                              className="formLabel"
                            >
                              Fecha de salida:
                            </label>
                            <Field
                              type="date"
                              name={`roomTypesIdsAndDates[${index}].checkOutDate`}
                              className="formInput"
                            />
                            <ErrorMessage
                              name={`roomTypesIdsAndDates[${index}].checkOutDate`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="formDiv flex-1 mb-4 text-center">
                    <button
                      type="submit"
                      className="btn-secondary w-full flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Reservando..."
                      ) : (
                        <div className="flex items-center">
                          <h1 className="mr-2">Reservar</h1>
                          <Image
                            src={"/continue.png"}
                            alt="Continue"
                            width={24}
                            height={24}
                          />
                        </div>
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            {showConfirmBooking && (
              <div className="flex justify-center mb-[-1000px] mt-[10px]">
                <GatewayPayment />
              </div>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 m-2">
            <h2 className="font-semibold text-2xl">Reseñas</h2>
            {hotel?.reviews && hotel.reviews.length > 0 ? (
              <ul>
                {hotel.reviews.map((review, index) => (
                  <li key={index} className="mb-4">
                    <p className="text-lg font-medium">
                      {review?.customer?.name} {review?.customer?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{review.date}</p>
                    <p>{"⭐".repeat(review.rating)}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay reseñas disponibles.</p>
            )}
          </div>
          <div className="flex-1 m-4">
            <PostReview />
          </div>
        </div>
      </div>

      <div className="w-full mb-4"></div>
    </div>
  );
};

export default HotelDetail;