import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="container nav-container">
        <a href="/" className="nav-logo magic-hover__square">
          A.B
        </a>
        <div className="nav-links">
          <a href="#work" className="nav-link magic-hover__square">Work</a>
          <a href="#services" className="nav-link magic-hover__square">Services</a>
          <a href="#about" className="nav-link magic-hover__square">About</a>
          <a href="#contact" className="nav-link magic-hover__square">Contact</a>
        </div>
      </div>
    </motion.nav>
  );
}
