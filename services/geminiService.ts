
import { GoogleGenAI } from "@google/genai";
import { ImageSize } from "../types.ts";

const getApiKey = () => {
  return process.env.API_KEY || (window as any).process?.env?.API_KEY || "";
};

// Helper to generate text using the standard flash model for quick responses
export const generateFastResponse = async (prompt: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) return "API Anahtarı bulunamadı. Lütfen Vercel ayarlarından API_KEY değişkenini kontrol edin.";
  
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text || "Bir hata oluştu.";
};

// Helper to generate text using the pro model for advanced reasoning
export const generateThinkingResponse = async (prompt: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) return "API Anahtarı bulunamadı. Lütfen Vercel ayarlarından API_KEY değişkenini kontrol edin.";

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 32768 }
    },
  });
  return response.text || "Bir hata oluştu.";
};

// Helper for image generation with model selection based on requested quality
export const generateImage = async (prompt: string, size: ImageSize): Promise<string | null> => {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const model = size === '1K' ? 'gemini-2.5-flash-image' : 'gemini-3-pro-image-preview';
  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: model,
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: size
      }
    }
  });

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  return null;
};