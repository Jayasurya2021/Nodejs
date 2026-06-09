import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.8 0-1.5-.5-2.8-1.4-3.8.4-1 .4-2.1-.1-3.8-1-.3-3.4 1.4-3.4 1.4A10.9 10.9 0 0 0 12 4.5c-1.3 0-2.6.2-3.8.5C6.7 3.5 4.3 3.8 4.3 3.8c-.5 1.7-.5 2.8-.1 3.8A5.7 5.7 0 0 0 2.8 12c0 5.3 3 6.5 6 6.8-.9.8-1.2 2-1.3 3.2v4"></path><path d="M4 19.5A3.5 3.5 0 0 1 2 17"></path></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }
    // Simulate sending
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-[#050505]">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-huge">Let's Talk</h2>
            <span className="txt-cursive text-2xl text-white/60">Get in touch</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="p-4 glass-card hover:bg-white/10 hover:-translate-y-1 transition-all rounded-full">
              <GithubIcon />
            </a>
            <a href="#" className="p-4 glass-card hover:bg-white/10 hover:-translate-y-1 transition-all rounded-full">
              <LinkedinIcon />
            </a>
            <a href="#" className="p-4 glass-card hover:bg-white/10 hover:-translate-y-1 transition-all rounded-full">
              <TwitterIcon />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card p-8 flex items-start gap-6">
              <div className="p-4 bg-white/5 rounded-full text-accent-red">
                <Mail size={32} />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Email</h3>
                <p className="text-white/70">hello@example.com</p>
                <p className="text-white/70">support@example.com</p>
              </div>
            </div>
            
            <div className="glass-card p-8 flex items-start gap-6">
              <div className="p-4 bg-white/5 rounded-full text-accent-cyan">
                <MapPin size={32} />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Location</h3>
                <p className="text-white/70">New York, NY</p>
                <p className="text-white/70">United States</p>
              </div>
            </div>

            <div className="glass-card p-8 flex items-start gap-6">
              <div className="p-4 bg-white/5 rounded-full text-white">
                <Phone size={32} />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Phone</h3>
                <p className="text-white/70">+1 (555) 123-4567</p>
                <p className="text-white/70">Mon - Fri, 9am - 6pm</p>
              </div>
            </div>
          </motion.div>

          <motion.form 
            className="flex flex-col gap-8 glass-card p-8 md:p-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
          >
            <h3 className="text-3xl font-medium mb-4">Send a Message</h3>
            
            <div className="flex flex-col gap-2">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-transparent border-b border-brand-border py-4 text-xl focus:border-white outline-none transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-transparent border-b border-brand-border py-4 text-xl focus:border-white outline-none transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <textarea 
                placeholder="Tell me about your project" 
                className="w-full bg-transparent border-b border-brand-border py-4 text-xl focus:border-white outline-none transition-colors resize-none"
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required 
              />
            </div>
            
            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="self-start mt-4 px-12 py-4 bg-white text-black rounded-full text-lg font-medium hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            
            {status === 'success' && (
              <p className="text-green-400 mt-4">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 mt-4">Please fill out all fields.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
