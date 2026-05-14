import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Metrics from './components/Metrics';
import Stack from './components/Stack';
import Process from './components/Process';
import { CTA, Footer } from './components/CtaFooter';

import UserDetails from './components/UserDetails';

function App() {
  return (
    <div className="min-h-screen bg-bg text-[#e8f4ff] font-sans">
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
    </div>
  );
}


export default App;
