import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectsSection() {
  const projects = [
    { 
      title: 'E-Commerce App', 
      category: 'Full Stack',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop'
    },
    { 
      title: 'Dashboard UI', 
      category: 'Frontend',
      tech: ['React', 'Tailwind', 'Recharts'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
    },
    { 
      title: 'Finance Tracker', 
      category: 'Mobile App',
      tech: ['React Native', 'Firebase'],
      image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=800&auto=format&fit=crop'
    },
    { 
      title: 'Social Platform', 
      category: 'System Design',
      tech: ['Next.js', 'PostgreSQL', 'Redis'],
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop'
    },
  ];

  return (
    <section id="work" className="py-32 container mx-auto px-8 max-w-7xl">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-huge">Selected Work</h2>
        <span className="txt-cursive text-2xl text-white/60">2021-2026</span>
      </div>
      <div className="flex flex-col gap-12">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-b border-brand-border gap-8 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Background Hover Image */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <span className="txt-cursive text-xl text-accent-cyan">{project.category}</span>
              <h3 className="text-4xl md:text-6xl font-medium magic-hover__square">{project.title}</h3>
              <div className="flex gap-3 mt-2 flex-wrap">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-4 py-1 text-sm border border-brand-border rounded-full text-white/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative z-10 flex gap-4 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-4 md:mt-0">
              <a href="#" className="px-6 py-2 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform">
                Live Demo
              </a>
              <a href="#" className="px-6 py-2 border border-brand-border rounded-full font-medium hover:bg-white/10 transition-colors">
                GitHub
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
