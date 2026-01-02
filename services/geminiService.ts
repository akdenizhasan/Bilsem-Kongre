
import { GoogleGenAI } from "@google/genai";
import { ImageSize } from "../types.ts";

// Helper to generate text using the standard flash model for quick responses
export const generateFastResponse = async (prompt: string): Promise<string> => {
  // Always initialize right before use as per guidelines to ensure current API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text || "Bir hata oluştu.";
};

// Helper to generate text using the pro model for advanced reasoning
export const generateThinkingResponse = async (prompt: string): Promise<string> => {
  // Create a new instance right before making an API call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
  // Create a new instance right before making an API call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const isPro = size !== '1K';
  const model = isPro ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
  
  const response = await ai.models.generateContent({
    model: model,
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        // imageSize option is only available for gemini-3-pro-image-preview
        ...(isPro ? { imageSize: size } : {})
      }
    }
  });

  // Nano banana models return images in candidates.content.parts
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  return null;
};
