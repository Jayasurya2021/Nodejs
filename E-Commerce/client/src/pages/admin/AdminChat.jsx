import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { MessageCircle, Send, User } from 'lucide-react';
import axios from 'axios';

const AdminChat = () => {
  const { user } = useSelector((state) => state.auth);
  
  const [chats, setChats] = useState([]);
  const [activeChatUserId, setActiveChatUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch all chats
  const fetchChats = async () => {
    try {
      const { data } = await axios.get('/api/chat/admin');
      setChats(data.chats);
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchChats();

      // Setup socket
      const newSocket = io(window.location.origin.includes('localhost') ? 'http://localhost:5000' : '/');
      setSocket(newSocket);

      newSocket.emit('join', user._id);
      newSocket.emit('join_admin'); // join admin room

      newSocket.on('receive_message', (message) => {
        // If it's for the currently open chat, append it
        if (activeChatUserId && 
            (message.sender._id === activeChatUserId || message.receiver?._id === activeChatUserId ||
             message.sender === activeChatUserId || message.receiver === activeChatUserId)) {
          setMessages((prev) => [...prev, message]);
        }
        
        // Always refresh chat list to update latest message
        fetchChats();
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user, activeChatUserId]);

  // Fetch messages for a specific user
  useEffect(() => {
    if (activeChatUserId) {
      const fetchMessages = async () => {
        try {
          const { data } = await axios.get(`/api/chat/admin/${activeChatUserId}`);
          setMessages(data.messages);
        } catch (error) {
          console.error("Error fetching chat history", error);
        }
      };
      fetchMessages();
    }
  }, [activeChatUserId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket || !activeChatUserId) return;

    socket.emit('send_message', {
      sender: user._id,
      receiver: activeChatUserId,
      text: input,
      isFromAdmin: true
    });
    
    setInput('');
  };

  if (!user || user.role !== 'admin') return <div className="p-8">Access Denied</div>;

  return (
    <div className="flex h-[calc(100vh-100px)] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden m-6">
      
      {/* Sidebar - Chat List */}
      <div className="w-1/3 border-r border-gray-100 flex flex-col">
        <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold flex items-center gap-2">
          <MessageCircle size={18} /> Support Inquiries
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div 
              key={chat._id} 
              onClick={() => setActiveChatUserId(chat._id)}
              className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${activeChatUserId === chat._id ? 'bg-gray-100 border-l-4 border-l-black' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex flex-shrink-0 items-center justify-center overflow-hidden">
                  {chat.user?.profileImage ? (
                    <img src={chat.user.profileImage} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} className="text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{chat.user?.name || 'Unknown User'}</h4>
                  <p className="text-xs text-gray-500 truncate">{chat.latestMessage?.text}</p>
                </div>
              </div>
            </div>
          ))}
          {chats.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-500">
              No chats yet.
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChatUserId ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 font-bold bg-white">
              Chat with User
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => {
                const isMine = msg.isFromAdmin;
                return (
                  <div key={msg._id || idx} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl p-3 text-sm shadow-sm ${isMine ? 'bg-black text-white rounded-br-sm' : 'bg-white border border-gray-100 text-black rounded-bl-sm'}`}>
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
                  placeholder="Type a reply..."
                  className="w-full bg-gray-100 rounded-lg pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 w-8 h-8 bg-black text-white rounded-md flex items-center justify-center disabled:opacity-50 hover:bg-gray-800 transition-colors"
                >
                  <Send size={14} className="-ml-0.5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <MessageCircle size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-semibold">Select a chat to view</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminChat;
