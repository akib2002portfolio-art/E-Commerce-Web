import { useRef, useState } from "react";

import { storageService } from "../services/storageService";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export function ImageUpload({
  value,
  onChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  async function handleSelectImage(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      const url =
        await storageService.uploadProductImage(
          file,
        );

      onChange(url);
    } catch (error) {
      console.error(error);

      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    if (!value) return;

    try {
      await storageService.deleteProductImage(
        value,
      );

      onChange(null);
    } catch (error) {
      console.error(error);

      alert("Failed to delete image.");
    }
  }

  return (
    <div className="space-y-4">

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleSelectImage}
      />

      {value ? (
        <div className="space-y-4">

          <img
            src={value}
            alt="Preview"
            className="h-56 w-full rounded-md border border-hairline object-cover"
          />

          <button
            type="button"
            onClick={handleRemove}
            className="rounded-md border border-red-300 px-4 py-2 text-red-600 hover:bg-red-50"
          >
            Remove Image
          </button>

        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() =>
            inputRef.current?.click()
          }
          className="flex h-56 w-full items-center justify-center rounded-md border-2 border-dashed border-hairline transition hover:bg-bone"
        >
          {uploading
            ? "Uploading..."
            : "Choose Product Image"}
        </button>
      )}

    </div>
  );
}