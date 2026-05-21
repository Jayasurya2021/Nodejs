import React, { useState, useEffect } from "react";
import GroupCard from "./components/Card";
import ExpenseForm from "./components/ExpenseForm";
import SummaryModal from "./components/SummaryModal";
import { fetchUserProfile } from "./task2/profileService"; // Importing from task 2 folder

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "User",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  });

  const groups = [
    {
      groupName: "CSK Cricket Team",
      icon: "🏏",
      summary: "Ticket fees: $250.00",
    }
  ];

  useEffect(() => {
    const getProfile = async () => {
      const profile = await fetchUserProfile();
      if (profile) {
        setUserProfile(profile);
      }
    };
    getProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#EBF4F6] text-[#09637E] p-6 md:p-12 font-sans selection:bg-[#088395] selection:text-white transition-colors duration-700">
      {/* Header with Profile - Enhanced UI */}
      <header className="max-w-7xl mx-auto flex justify-between items-start mb-16 px-4">
        <div className="flex flex-col">
          <h1 className="text-5xl font-black tracking-tighter leading-none mb-2 animate-in slide-in-from-left duration-700">
            <span className="text-black">MAVI</span>
            <span className="text-[#088395]">SOLUTION</span>
          </h1>
          <p className="text-sm font-bold text-[#088395]/60 uppercase tracking-[0.4em] opacity-80 animate-in slide-in-from-left duration-1000">
            Manage your group expenses effortlessly.
          </p>
        </div>

        <div className="group flex items-center gap-4 bg-white/70 backdrop-blur-xl p-2 pr-8 border border-white/40 rounded-full shadow-[0_10px_30px_-10px_rgba(8,131,149,0.2)] hover:shadow-[0_15px_40px_-10px_rgba(8,131,149,0.3)] hover:scale-[1.05] transition-all duration-500 cursor-pointer animate-in slide-in-from-right duration-700">
          <div className="relative">
            <img
              src={userProfile.profile_pic}
              alt={userProfile.name}
              className="w-12 h-12 rounded-full border-2 border-[#088395]/20 shadow-sm group-hover:border-[#088395]/50 transition-all duration-500 bg-[#EBF4F6]"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm group-hover:scale-125 transition-transform duration-500"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black text-black leading-tight group-hover:text-[#088395] transition-colors duration-500">
              {userProfile.name}
            </span>
            <div className="flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-[#088395]/40 group-hover:bg-[#088395] transition-all"></span>
               <span className="text-[10px] text-[#088395]/60 font-black uppercase tracking-[0.2em]">DASHBOARD</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start px-4">
        {/* Left Column: Components Showcase */}
        <div className="lg:col-span-7 space-y-16">
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#088395]/40 mb-10 flex items-center gap-6">
              <span className="w-16 h-[2px] bg-gradient-to-r from-[#088395]/40 to-transparent"></span>
              YOUR GROUPS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {groups.map((group, index) => (
                <GroupCard
                  key={index}
                  groupName={group.groupName}
                  icon={group.icon}
                  summary={group.summary}
                />
              ))}
            </div>
          </section>

          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#088395]/40 mb-10 flex items-center gap-6">
              <span className="w-16 h-[2px] bg-gradient-to-r from-[#088395]/40 to-transparent"></span>
              SUMMARY ACTIONS
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative px-12 py-6 bg-[#088395] text-white font-black rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-12px_rgba(8,131,149,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(8,131,149,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300 text-xl"
            >
              <span className="relative z-10 flex items-center gap-4">
                View Summary
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-3 transition-transform duration-500"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </button>
          </section>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          <ExpenseForm />
        </div>
      </main>

      <SummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        totalAmount="420.00"
      />
    </div>
  );
}

export default App;

