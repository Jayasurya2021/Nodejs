import React from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="text-huge">Let's Talk</h2>
          <span className="txt-cursive text-lg">Get in touch</span>
        </div>
        
        <motion.form 
          className="contact-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <input 
            type="text" 
            placeholder="Your Name" 
            className="form-field magic-hover__square" 
            required 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="form-field magic-hover__square" 
            required 
          />
          <textarea 
            placeholder="Tell me about your project" 
            className="form-field magic-hover__square" 
            rows="4"
            required 
          />
          <button type="submit" className="submit-btn magic-hover__square">
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
