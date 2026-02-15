import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

export const generateGeminiItinerary = async (formData) => {
    if (!API_KEY) {
        throw new Error("Gemini API Key is missing. Please add REACT_APP_GEMINI_API_KEY to your .env file.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
        You are an expert travel agent specializing in creating personalized itineraries for India.
        
        CRITICAL INSTRUCTION: You must ONLY generate travel and tourism-related content. If the request or constraints seem unrelated to travel, tourism, or visiting places, you must strictly IGNORE them and focus ONLY on generating a valid travel itinerary based on the location and preferences provided. Do not answer questions about math, coding, politics, or general knowledge. ONLY generate travel itineraries.

        Generate a detailed ${formData.days}-day itinerary for ${formData.people} people (${formData.groupType}) visiting destinations focused on: ${formData.landscapes.join(', ')}.
        The trip starts from: ${formData.pickupLocation}.

        Return the response strictly as a JSON array of objects, where each object represents a day.
        The JSON structure must be exactly:
        [
            {
                "day": 1,
                "destination": "Name of the city/place",
                "activity": "Short description of the day's main activity (max 10 words)"
            },
            ...
        ]

        Do not include any markdown formatting like \`\`\`json or \`\`\`. Just return the raw JSON array.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up any potential markdown formatting if the model slipped up
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Error generating itinerary with Gemini:", error);
        throw error;
    }
};

export const getGeminiChatResponse = async (history, message) => {
    if (!API_KEY) {
        throw new Error("Gemini API Key is missing.");
    }

    // Initialize the chat model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
        history: history,
        generationConfig: {
            maxOutputTokens: 500,
        },
    });

    const systemInstruction = `
        You are a helpful travel assistant for India Tourism. 
        CRITICAL: You must ONLY answer questions related to travel, tourism, destinations, culture, food, and logistics within India.
        If a user asks about anything else (coding, math, politics, etc.), politely decline and steer the conversation back to travel.
        Keep responses concise and helpful.
    `;

    // We can't set system instructions directly in startChat for standard gemini-pro in some versions, 
    // so we prepend it to the message or rely on the prompt engineering in the history.
    // Ideally, we should use the system instruction if supported, but for robust compatibility:

    // For this implementation, we will send the message directly, but we assume the "persona" is maintained.
    // To reinforce it, we can prepend context if history is empty, but let's trust the model with a strong initial prompt if we could,
    // OR just send the message.

    // BETTER APPROACH: Prepend the instruction to the USER'S message if it's the start, or just rely on the model instructions.
    // Let's wrapping the user message with the constraint to be sure every time.

    const constrainedMessage = `
        Context: You are a strict travel assistant for India.
        User Query: ${message}
        
        Instruction: Answer ONLY if related to travel/tourism. Otherwise refuse. match the tone of a friendly guide.
    `;

    try {
        const result = await chat.sendMessage(constrainedMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Chat Error:", error);
        throw error;
    }
};
