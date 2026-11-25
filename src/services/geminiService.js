import { apiRequest } from './apiClient';

/**
 * Generates an AI travel itinerary via the Express backend (/api/ai/itinerary),
 * keeping the Gemini API key private on the server.
 */
export const generateGeminiItinerary = async (formData) => {
    const data = await apiRequest('/api/ai/itinerary', {
        method: 'POST',
        body: formData
    });
    return data.itinerary;
};

/**
 * Sends a chat turn to the Express backend (/api/ai/chat),
 * keeping system constraints and Gemini credentials server-side.
 */
export const getGeminiChatResponse = async (history, message) => {
    const data = await apiRequest('/api/ai/chat', {
        method: 'POST',
        body: { history, message }
    });
    return data.reply;
};
