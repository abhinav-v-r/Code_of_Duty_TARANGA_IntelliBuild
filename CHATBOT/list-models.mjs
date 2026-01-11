import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const apiKeyMatch = envContent.match(/VITE_GEMINI_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

if (!apiKey) {
    console.error('API Key not found');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // There isn't a direct "listModels" on the instance in the JS SDK easily exposed in all versions, 
        // but we can try to use the model manager if available or just try a standard one.
        // Actually, looking at SDK docs, there might not be a helper for listModels in the high-level generic client easily.
        // However, we can try to just run a check on 'gemini-1.5-flash-latest' which is often the pointer.

        // Let's try to fetch a model that definitely exists or print helpful info.
        // Since ListModels suggested by error is an API endpoint, not necessarily a function we can call easily here without raw fetch.

        // Let's try raw fetch to the API endpoint to list models.
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log('Available Models:');
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log('No models found or error:', data);
        }

    } catch (error) {
        console.error('Error listing models:', error);
    }
}

listModels();
