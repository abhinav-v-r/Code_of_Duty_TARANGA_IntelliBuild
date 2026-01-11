/**
 * Google Gemini API Integration
 * Handles communication with Gemini AI
 */

// IMPORTANT: Replace this with your actual Gemini API key
// Get your API key from: https://aistudio.google.com/app/apikey
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE';

/**
 * Get response from Gemini API
 * @param {string} userMessage - User's message
 * @param {string} language - Selected language ('en' or 'ml')
 * @returns {Promise<string>} - Gemini's response
 */
export async function getGeminiResponse(userMessage, language) {
  // Check if API key is set
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your .env file');
  }

  try {
    // Import the Gemini SDK dynamically
    const { GoogleGenerativeAI } = await import('@google/generative-ai');

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    // Use gemini-flash-latest as it is confirmed working with the current API key
    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        }
      ]
    });

    // Create prompt based on language
    const languageInstruction = language === 'ml'
      ? 'You are a helpful assistant for seniors. Respond ONLY in Malayalam. Use simple, polite, and easy-to-understand sentences. Avoid technical jargon. Be friendly, patient, and respectful.'
      : 'You are a helpful assistant for seniors. Respond in English. Use simple, polite, and easy-to-understand sentences. Avoid technical jargon. Be friendly, patient, and respectful.';

    const prompt = `${languageInstruction}\n\nUser: ${userMessage}\n\nAssistant:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    return text.trim();
  } catch (error) {
    console.error('Gemini API Error:', error);
    // Return a more user-friendly error message or rethrow
    // Depending on how the caller handles it, rethrowing is usually best for logging
    throw new Error(error.message || 'Failed to get response from Gemini');
  }
}
