import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-brand-border mt-auto">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-2xl font-semibold tracking-tight">A.B</span>
            <p className="text-white/50 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
          </div>

          <div className="flex gap-8 text-sm font-medium uppercase tracking-wider">
            <a href="#work" className="text-white/70 hover:text-white transition-colors">Work</a>
            <a href="#about" className="text-white/70 hover:text-white transition-colors">About</a>
            <a href="#services" className="text-white/70 hover:text-white transition-colors">Services</a>
          </div>

          <button 
            onClick={scrollToTop}
            className="p-4 rounded-full border border-brand-border hover:bg-white hover:text-black transition-all group"
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
          
        </div>
      </div>
    </footer>
  );
}
