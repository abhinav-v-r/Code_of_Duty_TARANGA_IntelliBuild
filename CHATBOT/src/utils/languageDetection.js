/**
 * Simple language detection based on common words and patterns
 * Detects language of user input and returns language code
 * Supports only English and Malayalam
 * @param {string} text - The user's input text
 * @returns {string} - Language code (en or ml)
 */
export function detectLanguage(text) {
  // Convert to lowercase for easier matching
  const lowerText = text.toLowerCase().trim();

  // If empty, return default (English)
  if (!lowerText) return 'en';

  // Malayalam patterns - Detect Malayalam script (Unicode range 0D00-0D7F)
  // Also check for common Malayalam words
  const malayalamPatterns = [
    /[\u0D00-\u0D7F]/, // Malayalam Unicode range
    /\b(നമസ്കാരം|വണക്കം|സ്വാഗതം|നന്ദി|ദയവായി|വീണ്ടും|എങ്ങനെ|എന്ത്|എവിടെ|എപ്പോൾ|ആയിരുന്നു|ആണ്|ഉണ്ട്|ഇല്ല|എനിക്ക്|നിങ്ങൾക്ക്|ഞാൻ|നിങ്ങൾ|അവൻ|അവൾ|അവർ)\b/gi,
    /\b(ഹലോ|ഹായ്|നന്ദി|ക്ഷമിക്കണം|ശരി|അല്ല|ഉണ്ട്|ഇല്ല|എങ്ങനെയാണ്|എന്താണ്|എവിടെയാണ്|എപ്പോൾ|ആണ്|ഉണ്ട്)\b/gi,
  ];

  // Check if text contains Malayalam script or words
  if (malayalamPatterns.some(pattern => pattern.test(text))) {
    return 'ml';
  }

  // Default to English if no Malayalam patterns match
  // English is the default language
  return 'en';
}
