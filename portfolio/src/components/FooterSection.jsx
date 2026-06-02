import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

const GithubIcon = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.34 6.52-1.6 6.52-7.09 0-1.57-.56-2.83-1.5-3.84.15-.38.65-1.82-.15-3.79 0 0-1.2-.38-3.9 1.45a13.38 13.38 0 0 0-7 0C6.2 1.3 5 1.68 5 1.68c-.8 1.97-.3 3.41-.15 3.79-.94 1.01-1.5 2.27-1.5 3.84 0 5.49 3.34 6.75 6.52 7.09a4.8 4.8 0 0 0-1 3.03V22" /><path d="M9 20c-5 1.5-5-2.5-7-3" /></svg>;

const LinkedinIcon = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;

const InstagramIcon = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;

export default function FooterSection() {
    const quickLinks = [
        { name: 'Home', href: '#' },
        { name: 'Services', href: '#services' },
        { name: 'Projects', href: '#projects' },
        { name: 'About', href: '#about' },
        { name: 'Testimonials', href: '#reviews' },
        { name: 'Contact', href: '#contact' },
    ];

    const services = [
        'Frontend Development',
        'Backend Development',
        'MERN Stack Development',
        'Django Development',
        'API Integration',
        'Hosting & Deployment',
        'Maintenance & Support'
    ];

    const socialLinks = [
        { name: 'GitHub', icon: GithubIcon, href: '#' },
        { name: 'LinkedIn', icon: LinkedinIcon, href: '#' },
        { name: 'Instagram', icon: InstagramIcon, href: '#' },
        { name: 'WhatsApp', icon: MessageCircle, href: '#' },
    ];

    return (
        <footer className="bg-white text-black pt-20 md:pt-32 pb-8 border-t border-gray-100">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1600px]">

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-8 pb-20 border-b border-gray-100"
                >
                    <div className="max-w-3xl text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                            Ready to start your next project?
                        </h2>
                        <p className="text-gray-500 text-lg md:text-xl font-light">
                            Let's transform your ideas into a modern, scalable, and high-performing digital solution.
                        </p>
                    </div>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-black px-8 py-5 rounded-full font-bold uppercase tracking-wider text-sm hover:text-black hover:bg-purple-600 transition-colors duration-300 flex items-center gap-2 shrink-0 group"
                    >
                        Start Your Project
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </motion.div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 py-20">

                    {/* Brand & Description */}
                    <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="text-3xl font-black tracking-tighter mb-6">
                            <span>YOUR</span><span className="text-purple-600">AGENCY</span>
                        </div>
                        <p className="text-gray-500 font-light leading-relaxed max-w-sm mb-8">
                            We build modern digital experiences through innovative development, scalable architecture, and long-term technology partnerships.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-purple-600 hover:text-white transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 lg:col-start-6 flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-6 text-sm">Quick Links</h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-500 hover:text-purple-600 transition-colors duration-300 font-light">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-6 text-sm">Services</h4>
                        <ul className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 w-full">
                            {services.map((service, index) => (
                                <li key={index} className="sm:mt-0 mt-0">
                                    <span className="text-gray-500 font-light hover:text-purple-600 transition-colors duration-300 cursor-pointer">
                                        {service}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 font-light text-sm text-center md:text-left">
                        © 2026 Your Agency Name. All Rights Reserved.
                    </p>
                    <p className="text-gray-400 font-light text-sm text-center md:text-right">
                        Designed & Developed by Your Agency Name.
                    </p>
                </div>
            </div>
        </footer>
    );
}
