import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function HeroVideoBanner() {
    // Premium, stable stock video from Mixkit (Modern City Skyscrapers)
    const VIDEO_URL = "https://videos.pexels.com/video-files/3255275/3255275-hd_1920_1080_25fps.mp4";

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black" id="hero">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60"
            >
                <source src={VIDEO_URL} type="video/mp4" />
            </video>

            {/* Dark Overlay Gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0A0A0A]" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <span className="w-12 h-[2px] bg-purple-500 rounded-full" />
                    <span className="text-sm font-bold tracking-[0.4em] text-white uppercase">
                        Visionary Architecture
                    </span>
                    <span className="w-12 h-[2px] bg-purple-500 rounded-full" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none drop-shadow-2xl mb-8"
                >
                    ENGINEERING
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-600">
                        LEGACIES
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="max-w-2xl text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-12 drop-shadow-md"
                >
                    Merging architectural brilliance with next-generation technology to shape tomorrow's urban skylines.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2, type: 'spring' }}
                >
                    <a
                        href="#projects"
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-white/10 border border-white/20 rounded-full backdrop-blur-md hover:bg-white hover:text-black hover:border-white shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)]"
                    >
                        Explore Our Work
                    </a>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
                <span className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-8 h-12 rounded-full border border-white/30 flex items-start justify-center p-2 backdrop-blur-sm"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ArrowDown size={14} className="text-purple-400" />
                    </motion.div>
                </motion.div>
            </motion.div>

        </section>
    );
}
