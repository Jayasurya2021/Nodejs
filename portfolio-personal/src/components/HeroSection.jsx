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
    <section className="min-h-screen flex items-center pt-20 container mx-auto px-8 max-w-7xl">
      <motion.div 
        className="flex flex-col gap-2 md:gap-4 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex items-center gap-4 md:gap-8 flex-wrap w-full" variants={itemVariants}>
          <span className="txt-cursive text-huge">I'm a</span>
          <h1 className="text-huge magic-hover__square">MERN</h1>
        </motion.div>
        
        <motion.div className="flex items-center gap-4 md:gap-8 flex-wrap w-full justify-end" variants={itemVariants}>
          <h1 className="text-huge magic-hover__square">Full-stack</h1>
        </motion.div>
        
        <motion.div className="flex items-center gap-4 md:gap-8 flex-wrap w-full" variants={itemVariants}>
          <h1 className="text-huge magic-hover__square text-accent-cyan">Web</h1>
        </motion.div>
        
        <motion.div className="flex items-center gap-4 md:gap-8 flex-wrap w-full justify-end" variants={itemVariants}>
          <h1 className="text-huge magic-hover__square text-accent-red">Developer</h1>
        </motion.div>
        
        <motion.div className="flex items-center justify-center mt-12 w-full" variants={itemVariants}>
            <a href="#contact" className="px-8 py-4 bg-white text-black rounded-full text-xl font-medium hover:scale-105 transition-transform duration-300">
                Let's Talk
            </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
