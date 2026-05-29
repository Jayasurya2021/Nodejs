import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useSpring, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import GradualBlur from './Animation/GradualBlur'

/* ─────────────────────────────────────────────
   SERVICES DATA
───────────────────────────────────────────── */
const services = [
    {
        id: '01',
        title: 'FRONTEND DEVELOPMENT',
        description: 'Build modern, responsive, and high-performance websites using React, Tailwind CSS, and modern frontend technologies.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85',
        accent: 'from-violet-500 to-purple-600',
        accentColor: '#7c3aed',
        lightAccent: 'bg-violet-50',
        borderAccent: 'border-violet-200',
        textAccent: 'text-violet-600',
    },
    {
        id: '02',
        title: 'BACKEND DEVELOPMENT',
        description: 'Develop secure APIs, authentication systems, databases, and scalable server-side applications.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
        accent: 'from-blue-500 to-cyan-600',
        accentColor: '#2563eb',
        lightAccent: 'bg-blue-50',
        borderAccent: 'border-blue-200',
        textAccent: 'text-blue-600',
    },
    {
        id: '03',
        title: 'MERN STACK DEVELOPMENT',
        description: 'End-to-end web applications using MongoDB, Express.js, React, and Node.js.',
        image: 'https://images.unsplash.com/photo-1618477247222-ac60c747bc20?auto=format&fit=crop&w=1200&q=85',
        accent: 'from-emerald-500 to-teal-600',
        accentColor: '#059669',
        lightAccent: 'bg-emerald-50',
        borderAccent: 'border-emerald-200',
        textAccent: 'text-emerald-600',
    },
    {
        id: '04',
        title: 'DJANGO DEVELOPMENT',
        description: 'Powerful Python Django applications with secure authentication, admin dashboards, and database management.',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&w=1200&q=85',
        accent: 'from-green-500 to-emerald-600',
        accentColor: '#16a34a',
        lightAccent: 'bg-green-50',
        borderAccent: 'border-green-200',
        textAccent: 'text-green-600',
    },
    {
        id: '05',
        title: 'API INTEGRATION',
        description: 'Integrate payment gateways, WhatsApp APIs, email services, authentication providers, and third-party systems.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
        accent: 'from-orange-500 to-amber-600',
        accentColor: '#ea580c',
        lightAccent: 'bg-orange-50',
        borderAccent: 'border-orange-200',
        textAccent: 'text-orange-600',
    },
    {
        id: '06',
        title: 'HOSTING & DEPLOYMENT',
        description: 'Domain setup, cloud deployment, SSL configuration, CI/CD automation, and server management.',
        image: 'https://images.unsplash.com/photo-1620283085068-5aab14e89466?auto=format&fit=crop&w=1200&q=85',
        accent: 'from-sky-500 to-blue-600',
        accentColor: '#0284c7',
        lightAccent: 'bg-sky-50',
        borderAccent: 'border-sky-200',
        textAccent: 'text-sky-600',
    },
    {
        id: '07',
        title: 'WEBSITE REDESIGN',
        description: 'Transform outdated websites into modern, premium, high-converting digital experiences.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
        accent: 'from-pink-500 to-rose-600',
        accentColor: '#e11d48',
        lightAccent: 'bg-pink-50',
        borderAccent: 'border-pink-200',
        textAccent: 'text-pink-600',
    },
    {
        id: '08',
        title: 'MAINTENANCE & SUPPORT',
        description: 'Continuous updates, performance optimization, bug fixing, monitoring, and technical support.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=85',
        accent: 'from-indigo-500 to-violet-600',
        accentColor: '#4f46e5',
        lightAccent: 'bg-indigo-50',
        borderAccent: 'border-indigo-200',
        textAccent: 'text-indigo-600',
    }
]

/* ─────────────────────────────────────────────
   SERVICE ROW COMPONENT
───────────────────────────────────────────── */
function ServiceRow({ service, index, activeService, setActiveService }) {
    const ref = useRef(null)
    const [ishover, setIsHover] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !ishover) {
                    setActiveService(index)
                }
            },
            { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [index, setActiveService])

    const isActive = activeService === index

    return (
        <motion.div

            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
            onMouseEnter={() => {
                setIsHover(true)
                setActiveService(index)
            }}
            onMouseLeave={() => {
                setIsHover(false)
            }}

            className="group relative"
        >
            {/* Active left accent bar */}
            <div
                className="absolute left-0 top-0 h-full w-[3px] rounded-full transition-all duration-700"
                style={{
                    background: isActive
                        ? `linear-gradient(to bottom, ${service.accentColor}, ${service.accentColor}88)`
                        : 'transparent',
                    opacity: isActive ? 1 : 0
                }}
            />

            <div className={`flex items-start gap-8 md:gap-16 py-10 md:py-14 px-4 md:px-10 border-b cursor-pointer transition-all duration-500 relative overflow-hidden
                ${isActive
                    ? 'border-gray-200 bg-gray-50/80'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/40'
                }`}
            >
                {/* Row hover shimmer */}
                <div className={`absolute inset-0 bg-gradient-to-r from-white via-gray-50/50 to-transparent transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />

                {/* — NUMBER — */}
                <div className="relative shrink-0 w-20 md:w-32 overflow-hidden">
                    <motion.span
                        animate={{
                            opacity: isActive ? 1 : 0.18,
                            scale: isActive ? 1 : 0.88,
                            y: isActive ? 0 : 8,
                            filter: isActive ? 'blur(0px)' : 'blur(1.5px)'
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="block text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
                        style={{
                            color: isActive ? service.accentColor : '#9ca3af'
                        }}
                    >
                        {service.id}
                    </motion.span>
                </div>

                {/* — TITLE + DESC — */}
                <div className="flex-1 min-w-0 z-10">
                    <div className="overflow-hidden mb-3">
                        <motion.h3
                            animate={{
                                opacity: isActive ? 1 : 0.35,
                                y: isActive ? 0 : 6,
                                letterSpacing: isActive ? '-0.01em' : '0.01em'
                            }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className={`text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase leading-tight transition-colors duration-700
                                ${isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}
                        >
                            {service.title}
                        </motion.h3>
                    </div>

                    <AnimatePresence>
                        {isActive && (
                            <motion.p
                                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg font-normal"
                            >
                                {service.description}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {/* Mobile image */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 200 }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className={`lg:hidden mt-6 rounded-2xl overflow-hidden border ${service.borderAccent} relative shadow-lg`}
                            >
                                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* — ARROW BUTTON — */}
                <div className="hidden md:flex shrink-0 z-10">
                    <motion.div
                        animate={{
                            opacity: isActive ? 1 : 0.3,
                            rotate: isActive ? -45 : 0,
                            scale: isActive ? 1.1 : 1
                        }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500
                            ${isActive
                                ? `${service.borderAccent} ${service.textAccent} ${service.lightAccent}`
                                : 'border-gray-200 text-gray-400 group-hover:border-gray-300 group-hover:text-gray-500'
                            }`}
                    >
                        <ArrowUpRight size={20} />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

/* ─────────────────────────────────────────────
   MAIN SERVICES SECTION
───────────────────────────────────────────── */
export default function ServicesSection() {
    const [activeService, setActiveService] = useState(0)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
    const yParallaxSpring = useSpring(yParallax, { stiffness: 80, damping: 25 })

    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
            x: (e.clientX - rect.left - rect.width / 2) / rect.width,
            y: (e.clientY - rect.top - rect.height / 2) / rect.height
        })
    }, [])

    const springX = useSpring(mousePos.x * 10, { stiffness: 60, damping: 20 })
    const springY = useSpring(mousePos.y * 7, { stiffness: 60, damping: 20 })

    const current = services[activeService]

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative w-full bg-white text-gray-900"
            onMouseMove={handleMouseMove}
        >
            {/* ── AMBIENT LIGHT BLOBS (light theme) ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-[10%] -left-[10%] w-[45vw] h-[45vw] rounded-full bg-purple-100 blur-[130px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute bottom-[5%] right-[0%] w-[35vw] h-[35vw] rounded-full bg-blue-100 blur-[130px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
                    className="absolute top-[50%] left-[40%] w-[20vw] h-[20vw] rounded-full bg-indigo-100 blur-[100px]"
                />
            </div>

            <div className="container mx-auto px-6 lg:px-12 max-w-[1440px] relative z-10">

                {/* ── HEADER ── */}
                <div className="pt-28 pb-16 md:pb-24 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-8 h-[2px] bg-purple-500 rounded-full" />
                                <span className="text-xs font-bold tracking-[0.3em] text-purple-600 uppercase">Our Expertise</span>
                            </div>
                            <h2 className="text-[clamp(4rem,12vw,11rem)] font-black tracking-[-0.04em] leading-[0.9] text-gray-900">
                                SERVICES
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-gray-400 text-sm md:text-base max-w-xs leading-relaxed font-light hidden md:block"
                        >
                            End-to-end digital solutions crafted with precision, passion, and modern technology.
                        </motion.p>
                    </div>
                </div>

                {/* ── MAIN LAYOUT ── */}
                <div className="flex flex-col lg:flex-row gap-0 lg:gap-20 relative">

                    {/* Left: Service List */}
                    <div className="w-full lg:w-[58%] flex flex-col pb-48">
                        {services.map((service, index) => (
                            <ServiceRow
                                key={service.id}
                                service={service}
                                index={index}
                                activeService={activeService}
                                setActiveService={setActiveService}
                            />
                        ))}
                    </div>

                    {/* Right: Sticky Preview (Desktop) */}
                    <div className="hidden lg:block lg:w-[42%] relative">
                        <div className="sticky top-[12vh] h-[76vh]">
                            {/* Parallax wrapper */}
                            <motion.div
                                style={{ x: springX, y: springY }}
                                className="w-full h-full"
                            >
                                <div
                                    className="relative w-full h-full rounded-[32px] overflow-hidden border border-gray-100"
                                    style={{
                                        boxShadow: `0 24px 80px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04), 0 0 60px -20px ${current.accentColor}33`
                                    }}
                                >
                                    {/* Cinematic image crossfade */}
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeService}
                                            src={current.image}
                                            alt={current.title}
                                            initial={{ opacity: 0, scale: 1.08, filter: 'blur(16px)' }}
                                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                                            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                                            style={{ y: yParallaxSpring }}
                                            className="absolute -top-[15%] left-0 w-full h-[130%] object-cover z-10"
                                        />
                                    </AnimatePresence>

                                    {/* Light gradient overlay at bottom */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent z-20" />

                                    {/* Active service badge */}
                                    <div className="absolute bottom-8 left-8 right-8 z-30">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeService}
                                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                                className="flex items-end justify-between"
                                            >
                                                <div>
                                                    <span className="block text-white/50 text-xs font-bold tracking-widest uppercase mb-1">
                                                        {current.id} / 08
                                                    </span>
                                                    <h4 className="text-white text-xl font-bold tracking-tight drop-shadow-sm">
                                                        {current.title}
                                                    </h4>
                                                </div>
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg`}>
                                                    <ArrowUpRight size={16} className="text-white" />
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* GradualBlur at top and bottom of image preview */}
                                    <GradualBlur
                                        position="top"
                                        height="4rem"
                                        strength={1}
                                        divCount={5}
                                        curve="bezier"
                                        zIndex={25}
                                    />
                                    <GradualBlur
                                        position="bottom"
                                        height="8rem"
                                        strength={2}
                                        divCount={6}
                                        curve="bezier"
                                        zIndex={25}
                                    />

                                    {/* Subtle glass ring */}
                                    <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] z-30 pointer-events-none" />
                                </div>
                            </motion.div>

                            {/* Colored glow bloom below image */}
                            <motion.div
                                key={activeService}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7 }}
                                className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-12 bg-gradient-to-r ${current.accent} blur-2xl opacity-20 rounded-full pointer-events-none`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* GradualBlur at the bottom edge of the section for smooth page transition */}
            <GradualBlur
                position="bottom"
                height="8rem"
                strength={2.5}
                divCount={8}
                curve="bezier"
                exponential={true}
                opacity={0.6}
                zIndex={5}
            />
        </section>
    )
}
