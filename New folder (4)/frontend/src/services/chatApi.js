import axios from 'axios';

const API_URL = 'http://localhost:8000/api/chat/';

export const sendMessageToBot = async (message) => {
    try {
        const response = await axios.post(API_URL, { message });
        return response.data;
    } catch (error) {
        console.error("Error communicating with backend:", error);
        throw new Error(
            error.response?.data?.error || "Unable to reach the chatbot service. Please try again later."
        );
    }
};
