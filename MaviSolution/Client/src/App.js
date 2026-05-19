import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Metrics from './components/Metrics';
import Stack from './components/Stack';
import Process from './components/Process';
import { CTA, Footer } from './components/CtaFooter';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserDetails from './components/UserDetails';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg text-[#e8f4ff] font-sans">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Marquee />
              <Services />
              <Metrics />
              <Stack />
              <Process />
              <CTA />
              <UserDetails />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
