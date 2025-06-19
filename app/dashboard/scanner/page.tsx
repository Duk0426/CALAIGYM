"use client";
import { useState, useRef } from "react";

export default function ScannerPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setText("");
    setError("");
    setImagePreview("");

    try {
      if (!file.type.startsWith("image/")) {
        throw new Error("Please upload an image file (JPEG/PNG)");
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image too large (max 5MB)");
      }

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Read file as base64
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });

      // Call API
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64Image }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Scan failed (Status: ${response.status})`
        );
      }

      setText(data.text);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Scan Error:", err);

      // Reset file input on error
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Document Scanner</h1>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
        disabled={loading}
      />

      {imagePreview && (
        <div className="mt-4">
          <h2 className="text-sm font-medium mb-2">Preview:</h2>
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-60 rounded border"
          />
        </div>
      )}

      {loading && (
        <div className="mt-4 flex items-center gap-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          <span>Processing...</span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {text && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h2 className="font-semibold mb-2">Extracted Text:</h2>
          <div className="p-3 bg-white rounded border whitespace-pre-wrap">
            {text}
          </div>
        </div>
      )}
    </div>
  );
}
