"use client";

import { useState, useEffect } from "react";

interface PreviewImageProps {
  file: File;
}

export default function PreviewImage({ file }: PreviewImageProps) {
  const [preview, setPreview] = useState<string>("");
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const img = new Image();
          img.src = reader.result as string;
          img.onload = () => {
            setPreview(reader.result as string);
            setDimensions({ width: img.width, height: img.height });
          };
        }
      };
    }
  }, [file]);

  return (
    <div>
      {preview && (
        <img
          style={{ width: "300px" }}
          src={preview}
          alt="Preview"
          width={dimensions.width}
          height={dimensions.height}
        />
      )}
    </div>
  );
}
