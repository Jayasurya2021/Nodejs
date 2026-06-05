import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectsSection() {
  const projects = [
    { title: 'E-Commerce App', category: 'Full Stack' },
    { title: 'Dashboard UI', category: 'Frontend' },
    { title: 'Finance Tracker', category: 'Mobile App' },
    { title: 'Social Platform', category: 'System Design' },
  ];

  return (
    <section id="work" className="projects-section container">
      <div className="section-header">
        <h2 className="text-huge">Selected Work</h2>
        <span className="txt-cursive text-lg">2021-2026</span>
      </div>
      <div className="project-list">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            className="project-item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h3 className="project-title magic-hover__square">{project.title}</h3>
            <span className="project-category">{project.category}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
