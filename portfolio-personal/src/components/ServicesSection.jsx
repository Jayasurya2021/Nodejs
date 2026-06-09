import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Database, Layout, Server } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      id: '01',
      title: 'Frontend Development',
      description: 'Building modern, responsive, and performant user interfaces using HTML, CSS, JavaScript, and Tailwind CSS.',
      icon: <Layout size={48} strokeWidth={1} />,
    },
    {
      id: '02',
      title: 'React Development',
      description: 'Creating dynamic single-page applications and interactive components using React and Next.js ecosystem.',
      icon: <Code size={48} strokeWidth={1} />,
    },
    {
      id: '03',
      title: 'Django Backend',
      description: 'Designing scalable architectures, RESTful APIs, and robust database models using Python and Django.',
      icon: <Server size={48} strokeWidth={1} />,
    },
    {
      id: '04',
      title: 'API Integration',
      description: 'Seamlessly connecting third-party services, payment gateways, and external data sources to your applications.',
      icon: <Database size={48} strokeWidth={1} />,
    },
    {
      id: '05',
      title: 'Responsive Design',
      description: 'Ensuring your application looks and functions perfectly across all devices, from mobile phones to large desktop screens.',
      icon: <Smartphone size={48} strokeWidth={1} />,
    },
  ];

  return (
    <section id="services" className="py-32 border-t border-brand-border container mx-auto px-8 max-w-7xl">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-huge">Services</h2>
        <span className="txt-cursive text-2xl text-white/60">What I do</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div 
            key={service.id}
            className="p-12 glass-card transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="txt-cursive text-4xl text-brand-border mb-8 group-hover:text-white transition-colors">{service.id}</div>
            <div className="mb-6 text-white/70 group-hover:text-accent-cyan transition-colors">{service.icon}</div>
            <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
            <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
