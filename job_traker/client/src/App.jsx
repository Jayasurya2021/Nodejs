import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddApplication from './pages/AddApplication';
import ApplicationDetails from './pages/ApplicationDetails';
import EditApplication from './pages/EditApplication';
import DailyTracker from './pages/DailyTracker';
import Interviews from './pages/Interviews';
import Wishlist from './pages/Wishlist';
import CalendarPage from './pages/Calendar';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-slate-900 flex transition-colors font-sans">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 min-h-screen">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/:id" element={<ApplicationDetails />} />
            <Route path="/applications/:id/edit" element={<EditApplication />} />
            <Route path="/add-application" element={<AddApplication />} />
            <Route path="/daily-tracker" element={<DailyTracker />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;


