# Gemini API Setup Guide

## Getting Your Gemini API Key

1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Setting Up the API Key

Create a file named `.env` in the root directory of the project with the following content:

```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with your actual Gemini API key.

## Important Notes

- **Never commit the `.env` file to version control** (it's already in .gitignore)
- The `.env` file should be in the root directory (same level as package.json)
- After adding the API key, restart the development server

## Restarting the Server

After creating/updating the `.env` file:

1. Stop the current server (Ctrl + C)
2. Start it again: `npm run dev`

## Troubleshooting

If you see errors about the API key:
- Make sure the `.env` file is in the root directory
- Make sure the variable name is exactly `VITE_GEMINI_API_KEY`
- Restart the development server after creating/updating `.env`
- Check that your API key is valid and active
