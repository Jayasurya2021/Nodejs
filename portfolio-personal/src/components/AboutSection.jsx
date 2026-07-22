import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-32 container mx-auto px-8 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <motion.div 
          className="w-full lg:w-1/2 relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="aspect-[4/5] bg-white/5 border border-brand-border overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800&auto=format&fit=crop" 
              alt="Developer Portrait" 
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent-red/20 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>

        <motion.div 
          className="w-full lg:w-1/2 flex flex-col gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-huge">About Me</h2>
            <span className="txt-cursive text-2xl text-accent-cyan">Who I am</span>
          </div>
          
          <div className="flex flex-col gap-6 text-lg text-white/70 leading-relaxed font-light">
            <p>
              I'm a passionate Full-Stack Developer with a strong interest in building modern, scalable, and user-friendly web applications. I specialize in the MERN stack (MongoDB, Express.js, React, and Node.js) and enjoy transforming ideas into real-world solutions through clean, maintainable code.
            </p>
            <p>
              My journey into software development has been driven by continuous learning and hands-on projects. I enjoy solving challenging problems, building responsive user interfaces, designing RESTful APIs, and creating secure backend systems.
            </p>
            <p>
              I'm always eager to learn new technologies, improve my development skills, and collaborate with teams to build impactful products. My goal is to grow as a software engineer while creating applications that deliver meaningful value to users.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-8 border-t border-brand-border pt-8">
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-medium">5+</span>
              <span className="txt-cursive text-white/60">Years Exp.</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-medium">50+</span>
              <span className="txt-cursive text-white/60">Projects</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-medium">100%</span>
              <span className="txt-cursive text-white/60">Commitment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
