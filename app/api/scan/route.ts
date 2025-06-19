import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Extract base64 data (remove data URL prefix if present)
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    if (!process.env.HUGGINGFACE_API_KEY) {
      throw new Error("Hugging Face API key not configured");
    }

    // Using the correct and available TrOCR model
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/microsoft/trocr-large-printed",
      { inputs: base64Data },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000, // 60 second timeout
      }
    );

    // Handle response
    if (!response.data || typeof response.data !== "object") {
      throw new Error("Invalid API response format");
    }

    const text = response.data.generated_text || "No text found";
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("OCR API Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        error: "OCR_FAILED",
        message: error.response?.data?.error || error.message,
        status: error.response?.status,
      },
      { status: error.response?.status || 500 }
    );
  }
}
