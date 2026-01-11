import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Read .env manually
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const apiKeyMatch = envContent.match(/VITE_GEMINI_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

if (!apiKey) {
    console.error('API Key not found in .env');
    process.exit(1);
}

console.log('API Key found (length):', apiKey.length);

async function testGemini() {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Testing gemini-flash-latest
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    const prompt = 'Say "Hello form Antigravity" if you can hear me.';

    try {
        console.log('Sending request to Gemini (model: gemini-2.0-flash)...');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log('Response received:', text);
    } catch (error) {
        console.error('Gemini API Error:', error);
        process.exit(1);
    }
}

testGemini();
