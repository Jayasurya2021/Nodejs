
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashBoard from './pages/DashBoard'
import ReportProblem from './pages/ReportProblem'
import AdminPanel from './pages/AdminPanel'
import ComplaintDetail from './pages/ComplaintDetail'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/report-problem" element={<ReportProblem />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/complaint/:id" element={<ComplaintDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
