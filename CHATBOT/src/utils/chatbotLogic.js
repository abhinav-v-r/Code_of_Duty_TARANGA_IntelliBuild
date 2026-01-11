/**
 * Chatbot logic for matching user input and selecting appropriate responses
 * @param {string} userInput - The user's message
 * @param {string} detectedLanguage - The detected language code
 * @param {Object} chatbotData - The loaded chatbot data from JSON
 * @returns {string} - The chatbot's response
 */

import { detectLanguage } from './languageDetection';

/**
 * Find matching intent based on user input keywords
 * @param {string} userInput - User's message
 * @param {Array} intents - Array of intent objects from JSON
 * @returns {Object|null} - Matching intent or null
 */
function findMatchingIntent(userInput, intents) {
  const lowerInput = userInput.toLowerCase().trim();

  // If input is empty, return null
  if (!lowerInput) return null;

  // Score each intent based on keyword matches
  let bestMatch = null;
  let highestScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const keyword of intent.keywords) {
      // Check if keyword appears in user input (as whole word or part)
      const keywordLower = keyword.toLowerCase();
      if (lowerInput.includes(keywordLower)) {
        // Whole word matches score higher
        const wordBoundaryRegex = new RegExp(`\\b${keywordLower}\\b`, 'i');
        if (wordBoundaryRegex.test(lowerInput)) {
          score += 2; // Whole word match
        } else {
          score += 1; // Partial match
        }
      }
    }
    // Keep track of the best match
    if (score > highestScore) {
      highestScore = score;
      bestMatch = intent;
    }
  }

  // Only return match if score is meaningful (at least 1 point)
  return highestScore > 0 ? bestMatch : null;
}

/**
 * Get response for user input
 * @param {string} userInput - User's message
 * @param {Object} chatbotData - Chatbot data from JSON
 * @returns {string} - Chatbot response
 */
export function getChatbotResponse(userInput, chatbotData) {
  // If no input, return greeting
  if (!userInput || !userInput.trim()) {
    const detectedLang = 'en'; // Default for empty input
    return chatbotData.greeting[detectedLang] || chatbotData.greeting.en;
  }

  // Detect language from user input
  const detectedLang = detectLanguage(userInput);

  // Try to find matching intent
  const matchingIntent = findMatchingIntent(userInput, chatbotData.intents);

  if (matchingIntent) {
    // Return response in detected language, fallback to English if not available
    return (
      matchingIntent.responses[detectedLang] ||
      matchingIntent.responses.en ||
      chatbotData.defaultResponse.en
    );
  }

  // No matching intent found - return default response in detected language
  return (
    chatbotData.defaultResponse[detectedLang] ||
    chatbotData.defaultResponse.en
  );
}
