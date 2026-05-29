import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Code2, CheckCircle2, Info, X } from 'lucide-react'

/* ─────────────────────────────────────────────
   PROJECT DATA (WHITE THEME ADAPTED)
───────────────────────────────────────────── */
const projects = [
    {
        id: 1,
        title: 'Aura Heights Tower',
        subtitle: 'Commercial Skyscraper · Dubai',
        description:
            'A 72-floor mixed-use tower integrating smart building automation, green terraces, and premium residential floors. Delivered 3 months ahead of schedule with zero structural defects.',
        features: [
            'LEED Platinum Certified design',
            'AI-driven climate and lighting automation',
            'Seismic base isolation system',
        ],
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
        tech: ['Smart Automation', 'Green Arch', 'BIM Modeling'],
        demo: '#',
        repo: '#',
        textAccent: 'text-[#7e22ce]',
        bgAccent: 'bg-[#7e22ce]',
        shadowAccent: 'shadow-[#7e22ce]/30',
        glowAccent: 'shadow-[inset_0_0_0_2px_rgba(126,34,206,0.3),_0_0_40px_rgba(126,34,206,0.15)]',
    },
    {
        id: 2,
        title: 'Cyan Oasis Villa',
        subtitle: 'Luxury Villa · Miami Beach',
        description:
            'An oceanfront masterpiece spanning 12,500 sq ft, featuring infinity pools, solar-powered systems, and bespoke hand-crafted interiors sourced from six continents.',
        features: [
            'Zero-energy passive cooling architecture',
            'Bespoke Italian marble interiors',
            'Integrated smart home ecosystem',
        ],
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
        tech: ['Passive Cooling', 'Solar Tech', 'Biophilic'],
        demo: '#',
        repo: '#',
        textAccent: 'text-[#0284c7]',
        bgAccent: 'bg-[#0284c7]',
        shadowAccent: 'shadow-[#0284c7]/30',
        glowAccent: 'shadow-[inset_0_0_0_2px_rgba(2,132,199,0.3),_0_0_40px_rgba(2,132,199,0.15)]',
    },
    {
        id: 3,
        title: 'Sapphire HQ',
        subtitle: 'Corporate Campus · London',
        description:
            'Conceived for a Fortune 500 company, this 280,000 sq ft campus redefines the modern workplace — featuring adaptive floorplates, rooftop gardens, and a net-zero footprint.',
        features: [
            'Dynamic adaptive floorplates',
            'Net-zero carbon footprint construction',
            'Biometric access & security network',
        ],
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=85',
        tech: ['Net-Zero', 'Adaptive Structure', 'Curtain Wall'],
        demo: '#',
        repo: '#',
        textAccent: 'text-[#059669]',
        bgAccent: 'bg-[#059669]',
        shadowAccent: 'shadow-[#059669]/30',
        glowAccent: 'shadow-[inset_0_0_0_2px_rgba(5,150,105,0.3),_0_0_40px_rgba(5,150,105,0.15)]',
    },
    {
        id: 4,
        title: 'Nebula Smart House',
        subtitle: 'Smart Residence · California',
        description:
            'A fully AI-controlled residence where lighting, climate, security, and entertainment adapt in real time to the inhabitant. Winner of the 2025 Innovation in Living Award.',
        features: [
            'Self-learning environmental controls',
            'Grid-independent energy storage',
            'Acoustically engineered living spaces',
        ],
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
        tech: ['AI Integration', 'IoT Ecosystem', 'Steel Frame'],
        demo: '#',
        repo: '#',
        textAccent: 'text-[#e11d48]',
        bgAccent: 'bg-[#e11d48]',
        shadowAccent: 'shadow-[#e11d48]/30',
        glowAccent: 'shadow-[inset_0_0_0_2px_rgba(225,29,72,0.3),_0_0_40px_rgba(225,29,72,0.15)]',
    },
]

/* ─────────────────────────────────────────────
   STACKED PROJECT CARD
───────────────────────────────────────────── */
function StackedCard({ project, index, total }) {
    // Top position increases slightly for each card to create the stacked deck look
    const stickyTop = `calc(10vh + ${index * 30}px)`

    // Margin bottom dictates how long the user scrolls before the next card overlaps.
    // The gap is reduced to 40vh for a tighter stacking feel.
    // The last card is given 60vh margin so the page can scroll far enough to pin it on top of the 3rd card.
    const scrollSpacing = index === total - 1 ? '10vh' : '10vh'

    return (
        <div
            className="sticky w-full flex justify-center"
            style={{
                top: stickyTop,
                marginBottom: scrollSpacing,
                zIndex: index
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-6xl h-[80vh] md:h-[75vh] rounded-[40px] bg-white border border-gray-200 p-6 md:p-10 flex flex-col group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"
            >
                {/* ── HEADER ── */}
                <div className="flex justify-between items-start mb-6 md:mb-8 w-full shrink-0">
                    <div className="flex items-center gap-4 md:gap-8">
                        {/* Big Number */}
                        <motion.h2
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                            className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none"
                        >
                            0{index + 1}
                        </motion.h2>
                        {/* Subtitle & Title */}
                        <div className="flex flex-col justify-center gap-1 mt-1">
                            <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">
                                {project.subtitle}
                            </span>
                            <h3 className="text-xl md:text-3xl font-black text-gray-900 uppercase tracking-wider">
                                {project.title}
                            </h3>
                        </div>
                    </div>

                    {/* Live Project Button */}
                    <a
                        href={project.demo}
                        className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-bold text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 transform group-hover:scale-105"
                    >
                        Live Project
                    </a>
                </div>

                {/* ── INNER CONTENT AREA ── */}
                <div className="relative flex-1 w-full bg-gray-50 rounded-[20px] border border-gray-100 overflow-hidden flex flex-col md:flex-row shadow-inner group/inner">

                    {/* Left Content */}
                    <div className="w-full md:w-5/12 p-6 md:p-12 flex flex-col justify-center relative z-10 bg-gradient-to-r from-gray-50 via-gray-50 to-transparent md:bg-none backdrop-blur-sm md:backdrop-blur-none bg-gray-50">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h4 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-4 md:mb-6 leading-none">
                                {project.title}
                            </h4>
                            <p className="text-gray-600 font-medium text-sm md:text-base mb-8 max-w-sm leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-col gap-6 mt-auto">
                                <div>
                                    <span className={`text-xs font-bold uppercase tracking-widest mb-3 block ${project.textAccent}`}>
                                        Technologies
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t, i) => (
                                            <motion.span
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                                                key={t}
                                                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700 shadow-sm transition-colors hover:border-gray-300"
                                            >
                                                {t}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content / Image */}
                    <div className="w-full md:w-7/12 h-56 md:h-full relative overflow-hidden bg-gray-200 shrink-0">
                        <motion.img
                            initial={{ scale: 1.15 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/inner:scale-105"
                        />
                        {/* Gradient fades to merge with the left content area cleanly */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/50 to-transparent w-32 hidden md:block z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/50 to-transparent h-24 md:hidden bottom-0 z-10"></div>

                        {/* Interactive overlay on image */}
                        <div className={`absolute inset-0 opacity-0 group-hover/inner:opacity-30 transition-opacity duration-700 pointer-events-none mix-blend-color ${project.bgAccent}`}></div>
                    </div>

                </div>
            </motion.div>
        </div>
    )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function ProjectsSection() {
    return (
        <section
            id="projects"
            className="relative w-full bg-white pt-32 pb-0"
        >

            {/* Animated Background Gradients (Light Theme) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-100/50 blur-[120px] animate-pulse" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-100/40 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Section Header */}
            <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-12 h-[2px] bg-purple-600 rounded-full" />
                        <span className="text-sm font-bold tracking-widest text-purple-600 uppercase">Selected Works</span>
                        <span className="w-12 h-[2px] bg-purple-600 rounded-full" />
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Creations</span>
                    </h2>
                </motion.div>
            </div>

            {/* Stacked Cards Container */}
            <div className="relative w-full px-6 max-w-7xl mx-auto pb-[10vh]">
                {projects.map((project, i) => (
                    <StackedCard
                        key={project.id}
                        project={project}
                        index={i}
                        total={projects.length}
                    />
                ))}
            </div>
        </section>
    )
}
