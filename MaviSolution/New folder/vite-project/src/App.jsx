import React, { useState, useEffect } from "react";
import GroupCard from "./components/Card";
import ExpenseForm from "./components/ExpenseForm";
import SummaryModal from "./components/SummaryModal";
import { supabase } from "./lib/supabaseClient";

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
    async function fetchProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from('profiles')
            .select('name, profile_pic')
            .eq('id', user.id)
            .single();

          if (data) setUserProfile(data);
        }
      } catch (err) {
        console.log("Supabase fetch failed, using default profile.");
      }
    }
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#EBF4F6] text-[#09637E] p-6 md:p-12 font-sans selection:bg-[#088395] selection:text-white">
      {/* Header with Profile */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-16 px-4">
        <div className="flex flex-col">
          <h1 className="text-4xl font-black tracking-tighter leading-none mb-1">
            <span className="text-black">MAVI</span>
            <span className="text-[#088395]">SOLUTION</span>
          </h1>
          <p className="text-xs font-bold text-[#088395]/60 uppercase tracking-[0.3em]">
            Manage your group expenses effortlessly.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md p-1.5 pr-6 border border-white/20 rounded-full shadow-lg shadow-black/5 hover:scale-[1.02] transition-transform duration-300">
          <div className="relative">
            <img
              src={userProfile.profile_pic}
              alt={userProfile.name}
              className="w-11 h-11 rounded-full border-2 border-white shadow-sm"
            />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-black leading-tight">{userProfile.name}</span>
            <span className="text-[10px] text-[#088395] font-black uppercase tracking-widest opacity-60">DASHBOARD</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start px-4">
        {/* Left Column: Components Showcase */}
        <div className="lg:col-span-7 space-y-16">
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#088395]/40 mb-8 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-[#088395]/20"></span>
              GROUP CARD TASK 1
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#088395]/40 mb-8 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-[#088395]/20"></span>
              SUMMARY ACTION
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative px-10 py-5 bg-[#088395] text-white font-black rounded-2xl overflow-hidden shadow-xl shadow-[#088395]/20 hover:shadow-[#088395]/30 active:scale-95 transition-all text-lg"
            >
              <span className="relative z-10 flex items-center gap-3">
                Expenses Summary
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-2 transition-transform duration-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </section>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
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
