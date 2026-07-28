import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function EducationSection() {
  const [hoveredCert, setHoveredCert] = useState(null);
  const [hoveredAchieve, setHoveredAchieve] = useState(null);
  const education = [
    {
      degree: 'Bachelor of Business Administration (BBA)',
      institution: 'S.S. Government Arts College, Tiruttani',
      period: '2020 – 2023',
      description: 'Completed a Bachelor\'s degree in Business Administration with a strong foundation in Management, Marketing, Finance, Business Communication, and Information Systems. Developed analytical thinking, problem-solving, teamwork, and communication skills that support modern software development.',
    }
  ];

  const certifications = [
    'MERN Stack Full Stack Web Development',
    'JavaScript (ES6+) Programming',
    'React.js Development',
    'Node.js & Express.js Development',
    'MongoDB Database Development',
    'Git & GitHub Version Control'
  ];

  const achievements = [
    '🚀 Built 5+ Full Stack MERN Projects',
    '🌐 Successfully Deployed Applications using Vercel & Render',
    '🔐 Implemented JWT Authentication and Google OAuth',
    '📱 Developed Fully Responsive Web Applications',
    '🗄️ Designed REST APIs with MongoDB Atlas',
    '💻 Version Control using Git & GitHub'
  ];

  return (
    <section id="education" className="py-32 bg-[#050505] border-y border-brand-border">
      <div className="container mx-auto px-8 max-w-5xl">
        <div className="flex flex-col gap-16">
          <div className="w-full">
            <div className="mb-12 text-center flex flex-col items-center">
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
          
          <div className="w-full">
            <div className="mb-12 text-center flex flex-col items-center">
              <h2 className="text-huge text-4xl md:text-5xl lg:text-huge">Professional Certifications</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" onMouseLeave={() => setHoveredCert(null)}>
              {certifications.map((cert, idx) => (
                <motion.div 
                  key={idx}
                  onMouseEnter={() => setHoveredCert(idx)}
                  className={`p-6 border border-brand-border rounded-lg transition-all duration-300 h-full flex items-center ${
                    hoveredCert !== null
                      ? hoveredCert === idx
                        ? 'scale-105 bg-white/10 border-accent-cyan/50 opacity-100 shadow-[0_0_20px_rgba(0,255,255,0.1)] z-10'
                        : 'scale-[0.95] opacity-40 bg-white/5'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <p className="text-lg font-medium">{cert}</p>
                </motion.div>
              ))}
            </div>

            <div className="mb-12 mt-16 text-center flex flex-col items-center">
              <h2 className="text-huge text-4xl md:text-5xl lg:text-huge">Achievements</h2>
              <span className="txt-cursive text-2xl text-accent-cyan mt-2 block">Key Milestones</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" onMouseLeave={() => setHoveredAchieve(null)}>
              {achievements.map((achievement, idx) => (
                <motion.div 
                  key={idx}
                  onMouseEnter={() => setHoveredAchieve(idx)}
                  className={`p-6 border border-brand-border rounded-lg transition-all duration-300 h-full flex items-center ${
                    hoveredAchieve !== null
                      ? hoveredAchieve === idx
                        ? 'scale-105 bg-white/10 border-accent-cyan/50 opacity-100 shadow-[0_0_20px_rgba(0,255,255,0.1)] z-10'
                        : 'scale-[0.95] opacity-40 bg-white/5'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <p className="text-lg font-medium">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
