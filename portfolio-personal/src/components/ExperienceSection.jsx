import React from 'react';
import { motion } from 'framer-motion';

export default function ExperienceSection() {
  const experiences = [
    {
      role: 'Django Developer',
      company: 'Tech Solutions Inc.',
      period: '2024 - Present',
      description: 'Developing scalable backend systems, writing RESTful APIs, and optimizing database queries for high-traffic applications.',
    },
    {
      role: 'React Developer',
      company: 'Creative Agency',
      period: '2022 - 2024',
      description: 'Built interactive and performant user interfaces for various client projects. Collaborated closely with designers to ensure pixel-perfect implementation.',
    },
    {
      role: 'Freelance Web Developer',
      company: 'Self-Employed',
      period: '2021 - 2022',
      description: 'Worked with diverse clients to establish their online presence. Handled everything from initial design concepts to final deployment.',
    }
  ];

  return (
    <section id="experience" className="py-32 container mx-auto px-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
        <div>
          <h2 className="text-huge">Experience</h2>
          <span className="txt-cursive text-2xl text-white/60">My Journey</span>
        </div>
      </div>
      
      <div className="relative border-l border-brand-border ml-4 md:ml-8 flex flex-col gap-12 py-8">
        {experiences.map((exp, idx) => (
          <motion.div 
            key={idx}
            className="relative pl-8 md:pl-16"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(101,219,231,0.8)]" />
            
            <div className="glass-card p-8 hover:bg-white/10 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h3 className="text-2xl font-medium group-hover:text-accent-cyan transition-colors">{exp.role}</h3>
                <span className="px-4 py-1 border border-brand-border rounded-full text-sm text-white/70 whitespace-nowrap">
                  {exp.period}
                </span>
              </div>
              <h4 className="text-lg text-white/80 mb-4 font-serif italic">{exp.company}</h4>
              <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
