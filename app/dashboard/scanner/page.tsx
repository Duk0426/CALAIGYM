"use client";

import { useState } from "react";

export default function ScannerPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setText("");
    setError("");
    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      if (!reader.result) return;

      try {
        const res = await fetch("/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: reader.result }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.error || "Scan failed");
          setLoading(false);
          return;
        }

        const data = await res.json();

        // data is array of OCR segments, join their text
        const extractedText = data.map((item: any) => item.text).join("\n");

        setText(extractedText || "No text found");
      } catch (err) {
        setError("Request failed");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Food Scanner</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading && <p>Scanning image...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {text && (
        <div className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">Extracted Text:</h2>
          <pre>{text}</pre>
        </div>
      )}
    </div>
  );
}
