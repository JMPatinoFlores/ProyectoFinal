"use client";

import { validationSchema } from "@/helpers/validateData";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import PreviewImage from "../PreviewImage";

interface FormValues {
  image: File | null;
}

export default function PostHotelImage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setFieldValue("image", event.target.files[0]);
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setUploading(true);
    const formData = new FormData();
    if (values.image) {
      formData.append("file", values.image);
    }
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const responseData = await response.json();
      console.log("Se subió correctamente:", responseData);
      setUploading(false);
    } catch (error) {
      console.error("No se puede subir la:", error);
      setUploading(false);
    }

    setSubmitting(false);
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl mb-2 pb-2 text-center font-bold">
            Sube una imagen de tu hotel
          </h1>
        </div>
        <Formik
          initialValues={{ image: null }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-2">
              <div className="formDiv">
                <label htmlFor="image" className="formLabel">
                  Imagen
                </label>
                <Field name="image">
                  {({ field }: any) => (
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                      placeholder="Selecciona una imagen"
                      className="formInput"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <button
                type="submit"
                className="btn-secondary"
                disabled={isSubmitting || uploading}
              >
                {uploading ? "Subiendo..." : "Subir imagen"}
              </button>
              {selectedFile && <PreviewImage file={selectedFile} />}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
