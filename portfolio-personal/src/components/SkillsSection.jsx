import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Wrench } from 'lucide-react';

export default function SkillsSection() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Layout size={28} />,
      skills: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
      gradient: 'from-cyan-500/20 to-blue-500/20',
      iconColor: 'text-cyan-400',
      glowColor: 'bg-cyan-500/20',
      borderColor: 'group-hover:border-cyan-500/50'
    },
    {
      title: 'Backend',
      icon: <Server size={28} />,
      skills: ['Node.js', 'Express', 'Django', 'Python', 'GraphQL', 'REST APIs'],
      gradient: 'from-emerald-500/20 to-green-500/20',
      iconColor: 'text-emerald-400',
      glowColor: 'bg-emerald-500/20',
      borderColor: 'group-hover:border-emerald-500/50'
    },
    {
      title: 'Database',
      icon: <Database size={28} />,
      skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'Prisma', 'Mongoose'],
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      glowColor: 'bg-purple-500/20',
      borderColor: 'group-hover:border-purple-500/50'
    },
    {
      title: 'Tools',
      icon: <Wrench size={28} />,
      skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Jest'],
      gradient: 'from-orange-500/20 to-red-500/20',
      iconColor: 'text-orange-400',
      glowColor: 'bg-orange-500/20',
      borderColor: 'group-hover:border-orange-500/50'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-[#050505] border-y border-brand-border">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-accent-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.h2 
            className="text-huge bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            My Skills
          </motion.h2>
          <motion.span 
            className="txt-cursive text-3xl text-accent-red mt-4 inline-block relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tools of the trade
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-accent-red/50 to-transparent"></div>
          </motion.span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              className="relative p-[1px] rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-transparent group hover:from-white/20 transition-all duration-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Outer glow effect */}
              <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`} />
              
              <div className={`relative h-full bg-[#0a0a0a] backdrop-blur-xl p-10 lg:p-12 rounded-[2rem] border border-white/5 ${category.borderColor} transition-all duration-500 overflow-hidden`}>
                
                {/* Decorative background circle */}
                <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 ${category.glowColor} transition-opacity duration-700 pointer-events-none`} />
                
                <div className="flex items-center gap-6 mb-10 relative z-10">
                  <div className={`p-4 rounded-2xl bg-white/5 ${category.iconColor} shadow-lg border border-white/10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500`}>
                    {category.icon}
                  </div>
                  <h3 className="text-3xl font-medium tracking-wide text-white/90">{category.title}</h3>
                </div>
                
                <motion.div 
                  className="flex flex-wrap gap-3 md:gap-4 relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {category.skills.map((skill, i) => (
                    <motion.span 
                      key={i} 
                      variants={itemVariants}
                      className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/70 font-medium text-sm md:text-base hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-default hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-1"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
