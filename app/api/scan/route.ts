// app/api/scan/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const { imageBase64 } = await request.json();

  if (!imageBase64) {
    return NextResponse.json(
      { error: "No imageBase64 provided" },
      { status: 400 }
    );
  }

  try {
    const base64Data = imageBase64.split(",")[1] ?? imageBase64;

    const response = await axios.post(
      "https://api-inference.huggingface.co/pipeline/ocr",
      { inputs: base64Data },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Hugging Face OCR API error:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to scan image" },
      { status: 500 }
    );
  }
}
