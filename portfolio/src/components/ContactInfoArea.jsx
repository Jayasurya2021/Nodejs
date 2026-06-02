import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

export default function ContactInfoArea() {
    return (
        <section className="relative w-full bg-gray-50 text-black py-20 border-t border-b border-gray-100">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1600px]">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 uppercase">Get In Touch</h3>
                    <p className="text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                        Our team is available to discuss your project, answer questions, and help you choose the right solution for your business.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Email Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-6">
                            <Mail size={24} />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Email</h4>
                        <p className="text-gray-600 font-light">hello@youragency.com</p>
                    </motion.div>

                    {/* Phone Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-6">
                            <Phone size={24} />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Phone</h4>
                        <p className="text-gray-600 font-light">+91 XXXXX XXXXX</p>
                    </motion.div>

                    {/* Location Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-6">
                            <MapPin size={24} />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Location</h4>
                        <p className="text-gray-600 font-light">Tamil Nadu, India</p>
                    </motion.div>

                    {/* Working Hours Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-6">
                            <Clock size={24} />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Working Hours</h4>
                        <p className="text-gray-600 font-light">Monday – Saturday<br/>09:00 AM – 08:00 PM</p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
