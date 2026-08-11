import { useState } from 'react';

const ChatInput = ({ onSendMessage, disabled }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 bg-white border-t border-gray-200 rounded-b-xl">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={disabled}
                placeholder="Ask about Clin Biosciences..."
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-clin-blue focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
            />
            <button
                type="submit"
                disabled={!message.trim() || disabled}
                className="flex items-center justify-center p-2 text-white transition-colors rounded-full bg-clin-blue hover:bg-blue-800 disabled:bg-blue-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            </button>
        </form>
    );
};

export default ChatInput;
