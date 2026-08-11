import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 flex flex-col items-center justify-center font-sans">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-clin-blue mb-2">Clin Biosciences</h1>
        <p className="text-gray-500">Interactive Company Chatbot Prototype</p>
      </div>
      <ChatWindow />
    </div>
  );
}

export default App;
