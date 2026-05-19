import React from "react";

const SummaryModal = ({ isOpen, onClose, totalAmount = "420.00" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Expenses Summary
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Here is the total summary of your group expenses for this period.
          </p>
          
          <div className="w-full bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-6 mb-8 border border-zinc-100 dark:border-zinc-800">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Amount</span>
            <div className="text-4xl font-black text-zinc-900 dark:text-zinc-100 mt-1">
              ${totalAmount}
            </div>
          </div>
          
          <div className="flex flex-col w-full gap-3">
            <button 
              onClick={onClose}
              className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Confirm & Continue
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-transparent text-zinc-500 dark:text-zinc-400 font-semibold py-2 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
