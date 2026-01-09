
import { Routes, Route, useLocation } from 'react-router-dom'
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
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'


function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/report-problem" element={
          <ProtectedRoute allowedRoles={['user']}>
            <ReportProblem />
          </ProtectedRoute>
        } />
        <Route path="/complaint/:id" element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <ComplaintDetail />
          </ProtectedRoute>
        } />
        <Route path="/DashBoard" element={
          <ProtectedRoute allowedRoles={['user']}>
            <DashBoard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
