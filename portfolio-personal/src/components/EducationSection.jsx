import React from 'react';
import { motion } from 'framer-motion';

export default function EducationSection() {
  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      period: '2017 - 2021',
      description: 'Graduated with honors. Specialized in Software Engineering and Web Technologies.',
    },
    {
      degree: 'Full-Stack Web Development Bootcamp',
      institution: 'Code Academy',
      period: '2021',
      description: 'Intensive 12-week program focusing on MERN stack, agile methodologies, and modern web development practices.',
    }
  ];

  const certifications = [
    'AWS Certified Developer - Associate',
    'Meta React Native Specialist',
    'Google Cloud Professional Cloud Architect'
  ];

  return (
    <section id="education" className="py-32 bg-[#050505] border-y border-brand-border">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-2/3">
            <div className="mb-12">
              <h2 className="text-huge text-4xl md:text-5xl lg:text-huge">Education</h2>
              <span className="txt-cursive text-2xl text-accent-cyan mt-2 block">Academic Background</span>
            </div>
            
            <div className="flex flex-col gap-8">
              {education.map((edu, idx) => (
                <motion.div 
                  key={idx}
                  className="glass-card p-8 group hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                    <h3 className="text-xl font-medium text-white group-hover:text-accent-cyan transition-colors">{edu.degree}</h3>
                    <span className="px-4 py-1 border border-brand-border rounded-full text-sm text-white/70 whitespace-nowrap self-start sm:self-auto">
                      {edu.period}
                    </span>
                  </div>
                  <h4 className="text-lg text-white/80 mb-4 font-serif italic">{edu.institution}</h4>
                  <p className="text-white/60 leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/3">
            <div className="mb-12 lg:mt-0">
              <h2 className="text-huge text-4xl md:text-5xl lg:text-huge">Certificates</h2>
              <span className="txt-cursive text-2xl text-accent-red mt-2 block">Professional</span>
            </div>
            
            <div className="flex flex-col gap-4">
              {certifications.map((cert, idx) => (
                <motion.div 
                  key={idx}
                  className="p-6 border border-brand-border rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <p className="text-lg font-medium">{cert}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
