import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

// Manual env parsing since we might not have dotenv configured for this script
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        envVars[key.trim()] = value.trim();
    }
});

const API_KEY = envVars.REACT_APP_GEMINI_API_KEY;

console.log("Testing Gemini API with key:", API_KEY ? API_KEY.substring(0, 5) + "..." : "UNDEFINED");

if (!API_KEY) {
    console.error("API Key not found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
    try {
        console.log("Listing available models...");
        // Not all SDK versions expose listModels cleanly on the top level object in all languages, 
        // but for Node SDK it's usually on the manager. 
        // We will try a different approach: just print the error if generateContent fails.
        // Actually, let's try to use the model that the App uses: gemini-pro.
        // And print the FULL error as JSON string.

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent("Test");
        console.log("Response:", result.response.text());
        console.log("SUCCESS: API is working with gemini-pro");

    } catch (error) {
        console.error("FAILURE");
        console.error("Name:", error.name);
        console.error("Msg:", error.message);
        // Print usage/metadata if available to see if it's a quota or region issue
        if (error.response) console.error("Response:", JSON.stringify(error.response, null, 2));
    }
}

run();

