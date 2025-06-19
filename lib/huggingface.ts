import axios from "axios";

export async function scanImageWithHuggingFace(imageBase64: string) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  const response = await axios.post(
    "https://api-inference.huggingface.co/models/microsoft/trocr-base-handwritten",
    { inputs: imageBase64 },
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  return response.data?.[0]?.generated_text || "";
}
