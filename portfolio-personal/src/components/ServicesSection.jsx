import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Database } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      id: '01',
      title: 'Web Development',
      description: 'Building modern, responsive, and performant web applications using the latest technologies like React, Next.js, and Node.js.',
      icon: <Code size={48} strokeWidth={1} />,
    },
    {
      id: '02',
      title: 'Mobile Development',
      description: 'Creating cross-platform mobile experiences with React Native, ensuring a native feel on both iOS and Android.',
      icon: <Smartphone size={48} strokeWidth={1} />,
    },
    {
      id: '03',
      title: 'Backend Engineering',
      description: 'Designing scalable architectures, RESTful APIs, and robust database models using Node.js, Express, and PostgreSQL.',
      icon: <Database size={48} strokeWidth={1} />,
    },
  ];

  return (
    <section id="services" className="services-section container">
      <div className="section-header">
        <h2 className="text-huge">Services</h2>
        <span className="txt-cursive text-lg">What I do</span>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div 
            key={service.id}
            className="service-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="service-number">{service.id}</div>
            <div style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.7)' }}>{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
