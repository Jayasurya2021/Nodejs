import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { MessageCircle, X, Send } from 'lucide-react';
import { toggleChat, closeChat } from '../redux/slices/uiSlice';
import axios from 'axios';

const ChatWidget = () => {
  const dispatch = useDispatch();
  const { isChatOpen } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  useEffect(() => {
    if (user && isChatOpen) {
      // Fetch chat history
      const fetchHistory = async () => {
        try {
          const { data } = await axios.get('/api/chat');
          setMessages(data.messages);
        } catch (error) {
          console.error("Error fetching chat history", error);
        }
      };
      fetchHistory();

      // Setup socket
      const newSocket = io(window.location.origin.includes('localhost') ? 'http://localhost:5000' : '/');
      setSocket(newSocket);

      newSocket.emit('join', user._id);

      newSocket.on('receive_message', (message) => {
        setMessages((prev) => [...prev, message]);
        // Mark as read when receiving if chat is open
        if (message.isFromAdmin) {
           axios.put('/api/chat/read', { senderId: message.sender._id || message.sender }).catch(e=>console.log(e));
        }
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user, isChatOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket || !user) return;

    socket.emit('send_message', {
      sender: user._id,
      receiver: null, // to admin
      text: input,
      isFromAdmin: false
    });
    
    setInput('');
  };

  if (!user || user.role === 'admin') return null; // Admins use dashboard chat

  return (
    <>
      {/* Floating Button (optional, but good if we want a global floating button) */}
      {!isChatOpen && (
        <button
          onClick={() => dispatch(toggleChat())}
          className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={16} />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Support Chat</h3>
                <p className="text-[10px] text-gray-300">We typically reply in a few minutes</p>
              </div>
            </div>
            <button onClick={() => dispatch(closeChat())} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-sm text-gray-400 mt-10">
                Send a message to start chatting with support.
              </div>
            )}
            {messages.map((msg, idx) => {
              const isMine = msg.sender?._id === user._id || msg.sender === user._id;
              return (
                <div key={msg._id || idx} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${isMine ? 'bg-black text-white rounded-br-sm' : 'bg-white border border-gray-100 text-black rounded-bl-sm'}`}>
                    <p>{msg.text}</p>
                    <span className={`text-[10px] block mt-1 ${isMine ? 'text-gray-400' : 'text-gray-400'}`}>
                      {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-gray-100 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-gray-800 transition-colors"
              >
                <Send size={14} className="-ml-0.5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
