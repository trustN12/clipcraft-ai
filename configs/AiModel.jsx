import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const config = {
  responseMimeType: 'application/json',
};

const model = 'gemini-2.0-flash';

// Existing function
export async function generateScript(prompt) {
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({ model, config, contents });

  let result = '';
  for await (const chunk of response) {
    result += chunk.text;
  }

  return JSON.parse(result);
}

// ✅ New function to generate image prompts from script
export async function generateImageScript(prompt) {
  const contents = [
      {
          role: 'user',
          parts: [
              {
                  text: prompt, // Use the full prompt passed in
              },
          ],
      },
  ];

  const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
  });

  let result = '';
  for await (const chunk of response) {
      result += chunk.text;
  }

  try {
      return JSON.parse(result);
  } catch (err) {
      console.error('Failed to parse response:', err, result);
      throw new Error('Invalid response from Gemini model');
  }
}


