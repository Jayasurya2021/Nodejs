import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        setFormData({
            name: '', company: '', email: '', phone: '',
            projectType: '', budget: '', timeline: '', description: ''
        });
    };

    const inputClasses = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 md:py-4 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 font-light placeholder:text-gray-400";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-2 tracking-wide uppercase text-xs";

    return (
        <section id="contact" className="relative w-full bg-white text-black py-24 md:py-32">
            <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
                        Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Great Together</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed mb-6">
                        Every successful project starts with understanding your vision.
                    </p>
                    <p className="text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                        Before we begin, we'd like to learn more about your business, goals, and project requirements. Share your details below and our team will carefully review your inquiry to prepare the most suitable solution for your needs. Once we've reviewed your requirements, we'll get in touch to discuss the next steps and project possibilities.
                    </p>
                </motion.div>

                {/* Project Inquiry Form */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100">
                        <h3 className="text-2xl font-bold tracking-tight mb-8 uppercase text-center">Project Inquiry Form</h3>
                        
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="py-20 text-center flex flex-col items-center justify-center"
                                >
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6 mx-auto">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h4 className="text-3xl font-bold mb-4">Thank you for reaching out.</h4>
                                    <p className="text-xl text-gray-600 font-light mb-4">We've successfully received your project inquiry.</p>
                                    <p className="text-gray-500 max-w-lg mx-auto font-light leading-relaxed">
                                        Our team will carefully review your requirements, project goals, and expectations before contacting you. This helps us provide accurate recommendations and the best possible solution for your project. We look forward to working with you.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form 
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6 md:space-y-8"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        <div>
                                            <label className={labelClasses}>Full Name *</label>
                                            <input required type="text" name="name" value={formData.name} onChange={handleChange} className={inputClasses} placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Company / Business Name</label>
                                            <input type="text" name="company" value={formData.company} onChange={handleChange} className={inputClasses} placeholder="Acme Corp" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        <div>
                                            <label className={labelClasses}>Email Address *</label>
                                            <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} placeholder="john@example.com" />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Phone Number *</label>
                                            <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} placeholder="+91 98765 43210" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Project Type *</label>
                                        <select required name="projectType" value={formData.projectType} onChange={handleChange} className={inputClasses}>
                                            <option value="" disabled>Select a project type</option>
                                            <option value="web-development">Web Development</option>
                                            <option value="mobile-app">Mobile App Development</option>
                                            <option value="ecommerce">E-Commerce Solution</option>
                                            <option value="ui-ux">UI/UX Design</option>
                                            <option value="custom-software">Custom Software</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        <div>
                                            <label className={labelClasses}>Budget Range</label>
                                            <select name="budget" value={formData.budget} onChange={handleChange} className={inputClasses}>
                                                <option value="" disabled>Select budget range</option>
                                                <option value="under-5k">Under $5,000</option>
                                                <option value="5k-10k">$5,000 - $10,000</option>
                                                <option value="10k-25k">$10,000 - $25,000</option>
                                                <option value="25k-50k">$25,000 - $50,000</option>
                                                <option value="50k-plus">$50,000+</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Expected Timeline</label>
                                            <select name="timeline" value={formData.timeline} onChange={handleChange} className={inputClasses}>
                                                <option value="" disabled>Select expected timeline</option>
                                                <option value="asap">As soon as possible</option>
                                                <option value="1-3-months">1 - 3 months</option>
                                                <option value="3-6-months">3 - 6 months</option>
                                                <option value="6-plus-months">6+ months</option>
                                                <option value="not-sure">Not sure yet</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Project Description *</label>
                                        <textarea required name="description" value={formData.description} onChange={handleChange} rows="5" className={`${inputClasses} resize-none`} placeholder="Tell us about your project, goals, and any specific requirements..."></textarea>
                                    </div>

                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit" 
                                        className="w-full bg-black text-white py-4 md:py-5 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        Submit Project Inquiry
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
