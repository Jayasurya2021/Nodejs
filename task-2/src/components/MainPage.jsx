import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Compass, Shield, Workflow, Clock, ArrowRight, Phone, MapPin,
    Star, Building, CheckCircle2, X, ChevronRight, Award, Briefcase,
    Users, Layers, Sparkles, Mail, User, Activity, Menu, ChevronDown,
    ChevronLeft
} from 'lucide-react'
import '../App.css'
import SmokeCursor from './SmokeCursor'
import HeroSlider from './SlideBar'

/* ─────────────────────────────────────────────
   SLIDE BAR COMPONENT (replaces building banner)
───────────────────────────────────────────── */
function SlideBar() {
    const slides = [
        {
            id: 1,
            tag: 'EST. 2008 · LUXURY CONSTRUCTION',
            title: 'Building Future',
            highlight: 'Landmarks',
            subtitle: 'Merging architectural brilliance with next-generation technology to shape tomorrow\'s urban skylines.',
            cta: 'Explore Our Work',
            bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=90',
        },
        {
            id: 2,
            tag: 'PREMIUM VILLAS · WORLDWIDE',
            title: 'Crafted For',
            highlight: 'Excellence',
            subtitle: 'Every detail, every material, every line — designed for those who demand nothing less than perfection.',
            cta: 'View Villas',
            bg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=90',
        },
        {
            id: 3,
            tag: 'SUSTAINABLE · INNOVATIVE · BOLD',
            title: 'Engineering',
            highlight: 'Legacies',
            subtitle: 'Sustainable design principles woven into iconic commercial structures that define city skylines for generations.',
            cta: 'Our Projects',
            bg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=90',
        },
    ]

    const [current, setCurrent] = useState(0)
    const [animating, setAnimating] = useState(false)
    const [direction, setDirection] = useState('next')
    const intervalRef = useRef(null)

    const goTo = (idx, dir = 'next') => {
        if (animating) return
        setDirection(dir)
        setAnimating(true)
        setTimeout(() => {
            setCurrent(idx)
            setAnimating(false)
        }, 600)
    }

    const next = () => goTo((current + 1) % slides.length, 'next')
    const prev = () => goTo((current - 1 + slides.length) % slides.length, 'prev')

    useEffect(() => {
        intervalRef.current = setInterval(next, 6000)
        return () => clearInterval(intervalRef.current)
    }, [current])

    const slide = slides[current]

    return (

        <div className="slidebar-root">
            {/* Background layers */}
            <div
                className={`slidebar-bg ${animating ? `slidebar-bg-exit-${direction}` : 'slidebar-bg-active'}`}
                style={{ backgroundImage: `url(${slide.bg})` }}
            />
            <div className="slidebar-overlay" />

            {/* Animated grid lines */}
            <div className="slidebar-grid" />

            {/* Content */}
            <div className={`slidebar-content ${animating ? 'slidebar-content-exit' : 'slidebar-content-enter'}`}>
                <div className="slidebar-tag">
                    <span className="sb-dot" />
                    <span>{slide.tag}</span>
                </div>

                <h1 className="slidebar-title">
                    {slide.title} <br />
                    <span className="slidebar-highlight">{slide.highlight}</span>
                </h1>

                <p className="slidebar-sub">{slide.subtitle}</p>

                <div className="slidebar-actions">
                    <a href="#projects" className="sb-btn-primary">
                        {slide.cta} <ArrowRight size={18} />
                    </a>
                    <a href="#about" className="sb-btn-outline">
                        Learn More
                    </a>
                </div>
            </div>

            {/* Controls */}
            <div className="slidebar-controls">
                <button className="sb-ctrl-btn" onClick={prev} aria-label="Previous">
                    <ChevronLeft size={20} />
                </button>

                <div className="sb-dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`sb-dot-btn ${i === current ? 'active' : ''}`}
                            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>

                <button className="sb-ctrl-btn" onClick={next} aria-label="Next">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Progress bar */}
            <div className="sb-progress-bar" key={current}>
                <div className="sb-progress-fill" />
            </div>

            {/* Slide counter */}
            <div className="sb-counter">
                <span className="sb-counter-current">0{current + 1}</span>
                <span className="sb-counter-sep">/</span>
                <span className="sb-counter-total">0{slides.length}</span>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
function useScrollReveal(options = {}) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    obs.unobserve(el)
                }
            },
            { threshold: 0.12, ...options }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return [ref, visible]
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
function MainPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: '', email: '', projectType: 'luxury-villa', message: '', agree: true
    })
    const [activeFilter, setActiveFilter] = useState('all')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [hoveredNav, setHoveredNav] = useState(null)
    const [contactForm, setContactForm] = useState({
        name: '', email: '', phone: '', projectType: '', message: ''
    })
    const [contactSubmitted, setContactSubmitted] = useState(false)
    const [hoveredCard, setHoveredCard] = useState(null)
    const [hoveredProject, setHoveredProject] = useState(null)

    // Scroll reveal refs
    const [benefitRef, benefitVisible] = useScrollReveal()
    const [portfolioRef, portfolioVisible] = useScrollReveal()
    const [reviewRef, reviewVisible] = useScrollReveal()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitted(true)
        setTimeout(() => {
            setIsSubmitted(false)
            setIsModalOpen(false)
            setFormData({ name: '', email: '', projectType: 'luxury-villa', message: '', agree: true })
        }, 2500)
    }

    const handleContactChange = (e) => {
        const { name, value } = e.target
        setContactForm(prev => ({ ...prev, [name]: value }))
    }

    const handleContactSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: contactForm.name, email: contactForm.email,
                    phone: contactForm.phone, service: contactForm.projectType,
                    message: contactForm.message
                }),
            })
            const data = await response.json()
            if (data.success) {
                setContactSubmitted(true)
                setTimeout(() => {
                    setContactSubmitted(false)
                    setContactForm({ name: '', email: '', phone: '', projectType: '', message: '' })
                }, 3000)
            } else {
                alert('Error: ' + data.message)
            }
        } catch (error) {
            // Demo mode: show success anyway
            setContactSubmitted(true)
            setTimeout(() => {
                setContactSubmitted(false)
                setContactForm({ name: '', email: '', phone: '', projectType: '', message: '' })
            }, 3000)
        }
    }

    const portfolioItems = [
        { id: 1, title: 'Aura Heights', category: 'commercial', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', area: '450,000 sq ft', year: '2025' },
        { id: 2, title: 'Cyan Oasis Villa', category: 'villa', location: 'Miami, USA', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', area: '12,500 sq ft', year: '2024' },
        { id: 3, title: 'Sapphire HQ', category: 'commercial', location: 'London, UK', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80', area: '280,000 sq ft', year: '2026' },
        { id: 4, title: 'Nebula Smart House', category: 'villa', location: 'California, USA', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', area: '8,400 sq ft', year: '2025' },
        { id: 5, title: 'The Azure Penthouse', category: 'interior', location: 'New York, USA', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', area: '6,200 sq ft', year: '2023' },
        { id: 6, title: 'Vortex Tech Hub', category: 'commercial', location: 'Singapore', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', area: '620,000 sq ft', year: '2026' },
    ]

    const filteredPortfolio = activeFilter === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeFilter)

    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#services', label: 'Services' },
        { href: '#projects', label: 'Projects' },
        { href: '#vision', label: 'Vision' },
        { href: '#reviews', label: 'Reviews' },
    ]

    const benefitCards = [
        { icon: <Building size={20} />, title: 'Premium Materials', text: 'Finest sourced globally' },
        { icon: <Shield size={20} />, title: 'Expert Engineers', text: 'Certified & experienced' },
        { icon: <Workflow size={20} />, title: 'Sustainable Build', text: 'Eco-conscious methods' },
        { icon: <Clock size={20} />, title: 'Timely Delivery', text: 'On-schedule always' },
    ]

    return (
        <div className="app-container">
            <SmokeCursor />

            {/* ── HEADER ── */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                    padding: isScrolled ? '1rem 5%' : '1.5rem 5%',
                    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
                    backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                    boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'all 0.4s ease'
                }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                    style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.05em' }}
                >
                    <span style={{ color: isScrolled ? '#111827' : '#fff' }}>ARK</span>
                    <span style={{ color: '#a855f7' }}>HE</span>
                </motion.div>

                {/* Desktop Nav */}
                <nav
                    className="hidden md:flex relative overflow-hidden"
                    onMouseLeave={() => setHoveredNav(null)}
                    style={{
                        display: 'flex', gap: '0.25rem', padding: '0.5rem',
                        borderRadius: '9999px',
                        backgroundColor: isScrolled ? 'rgba(243, 244, 246, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    {navLinks.map((link) => {
                        const isActive = hoveredNav === link.label
                        return (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                className="relative z-10 transition-colors duration-300"
                                onMouseEnter={() => setHoveredNav(link.label)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ 
                                    padding: '0.5rem 1.25rem',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    borderRadius: '9999px',
                                    color: isActive 
                                        ? '#7e22ce' 
                                        : (isScrolled ? '#4b5563' : '#fff')
                                }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0"
                                        style={{ backgroundColor: '#fff', borderRadius: '9999px', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    />
                                )}
                                {link.label}
                            </motion.a>
                        )
                    })}
                </nav>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            padding: '0.75rem 1.75rem',
                            backgroundColor: '#7e22ce',
                            color: '#fff',
                            fontWeight: 600,
                            borderRadius: '9999px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(126, 34, 206, 0.4)'
                        }}
                    >
                        Get Consultation
                    </motion.button>
                    <button className="md:hidden" onClick={() => setMobileMenuOpen(true)} style={{ background: 'none', border: 'none', color: isScrolled ? '#111827' : '#fff', cursor: 'pointer' }}>
                        <Menu size={28} />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Drawer */}
            {mobileMenuOpen && (
                <div className="mobile-nav-overlay glass" onClick={() => setMobileMenuOpen(false)}>
                    <div className="mobile-nav-menu" onClick={e => e.stopPropagation()}>
                        <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
                            <X size={28} />
                        </button>
                        <div className="mobile-logo-container">
                            <span className="logo-ark">VOO</span><span className="logo-he">RA</span>
                        </div>
                        <nav className="mobile-links">
                            {navLinks.map(l => (
                                <a key={l.label} href={l.href} onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
                            ))}
                        </nav>
                        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 24, padding: '14px 24px' }}
                            onClick={() => { setMobileMenuOpen(false); setIsModalOpen(true) }}>
                            Get Consultationxccxc
                        </button>
                    </div>
                </div>
            )}

            {/* ── SLIDE BAR (replaces banner + hero) ── */}
            <HeroSlider />

            {/* ── ABOUT / VISION SECTION ── */}
            <motion.section
                id="about"
                className="vision-section relative py-32 bg-gray-50 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                        {/* Sticky Image Side */}
                        <div className="lg:sticky top-32 order-2 lg:order-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-100 blur-3xl opacity-50 rounded-full" />
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
                                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                                    alt="Modern Luxury Villa"
                                    className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
                                />
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="absolute bottom-8 left-8 right-8 glass rounded-2xl flex items-center justify-between"
                                    style={{ padding: '32px' }}
                                >
                                    <div>
                                        <div className="text-4xl font-bold text-gray-900">15+</div>
                                        <div className="text-sm font-semibold text-purple-600 tracking-wider">YEARS OF EXCELLENCE</div>
                                    </div>
                                    <Sparkles size={36} className="text-purple-600 animate-pulse" />
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Scrolling Content Side */}
                        <div className="order-1 lg:order-2 flex flex-col justify-center h-full pt-10">
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-3 bg-purple-100/50 text-purple-700 rounded-full w-fit mb-8 border border-purple-200"
                                style={{ padding: '12px 24px' }}
                            >
                                <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
                                <span className="text-xs font-bold tracking-widest uppercase">Our Story & Vision</span>
                            </motion.div>

                            <motion.h2
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
                            >
                                Where Vision Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Craft</span>
                            </motion.h2>

                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-lg text-gray-600 leading-relaxed mb-12"
                            >
                                Since 2008, ARKHE has been at the forefront of premium construction and
                                architectural design. We merge traditional craftsmanship with cutting-edge
                                technology, creating structures that are not just buildings — but living legacies.
                            </motion.p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {benefitCards.map((card, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-purple-200 transition-all cursor-pointer group"
                                        style={{ padding: '32px' }}
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                            {card.icon}
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h4>
                                        <p className="text-sm text-gray-500">{card.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ── PORTFOLIO SECTION ── */}
            <section id="projects" className="py-32 bg-white relative">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8" style={{ marginBottom: '4rem' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-3 text-purple-600 mb-4">
                                <span className="w-8 h-1 bg-purple-600 rounded-full" />
                                <span className="text-sm font-bold tracking-widest uppercase">Featured Portfolio</span>
                            </div>
                            <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-900">
                                Landmark Blueprints
                            </h2>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{
                                display: 'flex', flexWrap: 'wrap', gap: '0.25rem',
                                padding: '0.25rem', backgroundColor: '#faf5ff',
                                borderRadius: '9999px', border: '1px solid #f3e8ff',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                            }}
                        >
                            {[
                                { id: 'all', label: 'All Projects' },
                                { id: 'villa', label: 'Luxury Villas' },
                                { id: 'commercial', label: 'Commercial' },
                                { id: 'interior', label: 'Interiors' },
                            ].map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className="transition-all duration-300 relative"
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: activeFilter === filter.id ? '#fff' : '#581c87',
                                        border: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {activeFilter === filter.id && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 z-0"
                                            style={{ backgroundColor: '#9333ea', borderRadius: '9999px', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, boxShadow: '0 4px 10px rgba(147, 51, 234, 0.3)' }}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span style={{ position: 'relative', zIndex: 10 }}>{filter.label}</span>
                                </button>
                            ))}
                        </motion.div>
                    </div>


                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredPortfolio.map((project, i) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -50 }}
                                    transition={{ duration: 0.5, type: 'spring' }}
                                    key={project.id}
                                    className="group relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/5] cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                                    <div className="absolute inset-0 flex flex-col justify-end text-white" style={{ padding: '2rem' }}>
                                        <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-16 w-full">
                                            <div className="flex justify-between items-center mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                                                <span className="text-xs font-bold tracking-widest text-purple-300 uppercase">{project.category}</span>
                                                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">{project.year}</span>
                                            </div>

                                            <h3 className="text-3xl font-bold text-white drop-shadow-md">
                                                {project.title}
                                            </h3>

                                            <div className="absolute top-full mt-4 left-0 right-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                                                <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                                                    <MapPin size={16} className="text-purple-400" /> {project.location}
                                                </div>
                                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-purple-600 transition-colors">
                                                    <ArrowRight size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default MainPage
