import { useState, useEffect } from 'react';

const MessageBubble = ({ text, isUser, isNewBotMessage, onTypewriterComplete }) => {
    const [displayedText, setDisplayedText] = useState(isUser || !isNewBotMessage ? text : '');
    const [currentIndex, setCurrentIndex] = useState(0);

    // Typewriter effect logic
    useEffect(() => {
        if (!isUser && isNewBotMessage && currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 15); // Speed of typing
            return () => clearTimeout(timeout);
        } else if (!isUser && isNewBotMessage && currentIndex === text.length) {
            if (onTypewriterComplete) {
                onTypewriterComplete();
            }
        }
    }, [currentIndex, isUser, isNewBotMessage, text, onTypewriterComplete]);

    // Format text with bolding
    const formatText = (content) => {
        const parts = content.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 text-sm rounded-2xl ${isUser ? 'bg-clin-blue text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}>
                {!isUser && <span className="mr-2">🤖</span>}
                <span className="whitespace-pre-wrap leading-relaxed">
                    {formatText(displayedText)}
                </span>
            </div>
        </div>
    );
};

export default MessageBubble;
