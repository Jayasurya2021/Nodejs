import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } },
  };

  return (
    <section className="hero-section container">
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-row" variants={itemVariants}>
          <span className="txt-cursive text-huge">I'm a</span>
          <h1 className="text-huge magic-hover__square">Full-stack</h1>
        </motion.div>
        
        <motion.div className="hero-row" style={{ justifyContent: 'flex-end' }} variants={itemVariants}>
          <h1 className="text-huge magic-hover__square">Developer</h1>
        </motion.div>
        
        <motion.div className="hero-row" variants={itemVariants}>
          <span className="txt-cursive text-huge">&amp;</span>
          <h1 className="text-huge magic-hover__square">Software</h1>
        </motion.div>
        
        <motion.div className="hero-row" style={{ justifyContent: 'flex-end' }} variants={itemVariants}>
          <h1 className="text-huge magic-hover__square">Engineer</h1>
        </motion.div>
      </motion.div>
    </section>
  );
}
