const TypingIndicator = () => {
    return (
        <div className="flex justify-start mb-4">
            <div className="flex items-center gap-1 p-3 text-sm text-gray-500 bg-gray-100 rounded-2xl rounded-tl-sm">
                <span>🤖</span>
                <div className="flex gap-1 ml-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span className="ml-2 text-xs italic">Typing...</span>
            </div>
        </div>
    );
};

export default TypingIndicator;
