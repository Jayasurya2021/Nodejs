import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full py-8 z-50 mix-blend-difference"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="container mx-auto px-8 max-w-7xl flex justify-between items-center">
        <a href="/" className="text-2xl font-semibold tracking-tight magic-hover__square">
          A.B
        </a>
        <div className="hidden md:flex gap-12">
          <a href="#work" className="text-lg font-medium uppercase tracking-wider magic-hover__square">Work</a>
          <a href="#services" className="text-lg font-medium uppercase tracking-wider magic-hover__square">Services</a>
          <a href="#about" className="text-lg font-medium uppercase tracking-wider magic-hover__square">About</a>
          <a href="#contact" className="text-lg font-medium uppercase tracking-wider magic-hover__square">Contact</a>
        </div>
      </div>
    </motion.nav>
  );
}
