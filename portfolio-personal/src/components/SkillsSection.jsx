import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Wrench } from 'lucide-react';

export default function SkillsSection() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Layout size={32} />,
      skills: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript']
    },
    {
      title: 'Backend',
      icon: <Server size={32} />,
      skills: ['Node.js', 'Express', 'Django', 'Python', 'GraphQL', 'REST APIs']
    },
    {
      title: 'Database',
      icon: <Database size={32} />,
      skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'Prisma', 'Mongoose']
    },
    {
      title: 'Tools',
      icon: <Wrench size={32} />,
      skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Jest']
    }
  ];

  return (
    <section id="skills" className="py-32 bg-white/5 border-y border-brand-border">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-huge">My Skills</h2>
          <span className="txt-cursive text-2xl text-accent-red mt-2">Tools of the trade</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              className="glass-card p-10 hover:bg-white/10 transition-colors duration-300 group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white/5 rounded-full text-white group-hover:text-accent-cyan transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-medium">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 border border-brand-border rounded-full text-white/80 hover:bg-white hover:text-black hover:border-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
