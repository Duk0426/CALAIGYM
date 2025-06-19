"use client";

import { useState } from "react";
import { scanImageWithHuggingFace } from "@/lib/huggingface";

export function FoodScanner() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");

  const handleUpload = async () => {
    if (!image) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(",")[1];
      const text = await scanImageWithHuggingFace(base64);
      setResult(text);
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Scan
      </button>
      {result && <p className="mt-4">Result: {result}</p>}
    </div>
  );
}
