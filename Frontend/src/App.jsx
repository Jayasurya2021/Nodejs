import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashBoard from './pages/DashBoard';
import AdminPanel from './pages/AdminPanel';
import ReportProblem from './pages/ReportProblem';
import ComplaintDetail from './pages/ComplaintDetail';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/report" element={<ReportProblem />} />
        <Route path="/complaint/:id" element={<ComplaintDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
