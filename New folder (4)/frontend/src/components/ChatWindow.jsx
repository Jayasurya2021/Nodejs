import { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { sendMessageToBot } from '../services/chatApi';

const ChatWindow = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! 👋 Welcome to Clin Biosciences. How can I help you today?", isUser: false }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [typingMessageId, setTypingMessageId] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, typingMessageId]);

    const handleSendMessage = async (text) => {
        // Add user message
        const userMsg = { id: Date.now(), text, isUser: true };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            // Simulate brief network delay for realism if local is too fast
            await new Promise(resolve => setTimeout(resolve, 600));
            
            const response = await sendMessageToBot(text);
            
            const botMsgId = Date.now() + 1;
            setTypingMessageId(botMsgId);
            setMessages(prev => [...prev, {
                id: botMsgId,
                text: response.reply,
                isUser: false,
                isNew: true
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "⚠️ Sorry, I'm having trouble connecting to my servers right now.",
                isUser: false,
                isNew: false
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearChat = () => {
        setMessages([
            { id: 1, text: "Hello! 👋 Welcome to Clin Biosciences. How can I help you today?", isUser: false }
        ]);
        setTypingMessageId(null);
    };

    return (
        <div className="flex flex-col w-full max-w-md h-[600px] max-h-[90vh] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden mx-auto mt-10">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 text-white bg-clin-blue">
                <div>
                    <h1 className="font-semibold text-md">Clin Biosciences Assistant</h1>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-xs text-blue-100">Online</span>
                    </div>
                </div>
                <button 
                    onClick={handleClearChat}
                    className="p-1.5 text-blue-200 hover:text-white transition-colors"
                    title="Clear Chat"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 chat-scroll">
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        text={msg.text}
                        isUser={msg.isUser}
                        isNewBotMessage={msg.isNew && msg.id === typingMessageId}
                        onTypewriterComplete={() => {
                            if (msg.id === typingMessageId) {
                                setTypingMessageId(null);
                            }
                        }}
                    />
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <ChatInput 
                onSendMessage={handleSendMessage} 
                disabled={isLoading || typingMessageId !== null} 
            />
        </div>
    );
};

export default ChatWindow;
