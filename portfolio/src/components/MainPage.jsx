import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import {
    ArrowRight, Phone, MapPin,
    Star, CheckCircle2, X, ChevronRight, Award, Briefcase,
    Users, Layers, Mail, User, Activity, Menu, ChevronDown,
    ChevronLeft
} from 'lucide-react'
import '../App.css'
import SmokeCursor from './Animation/SmokeCursor'
import HeroVideoBanner from './HeroVideoBanner'
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import ContactSection from './ContactSection';
import ContactInfoArea from './ContactInfoArea';
import FooterSection from './FooterSection';
import WhatsAppButton from './WhatsAppButton';

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
    const [activeFilter, setActiveFilter] = useState('all')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [hoveredNav, setHoveredNav] = useState(null)
    const [navHidden, setNavHidden] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()
        if (latest > previous && latest > 150) {
            setNavHidden(true)
        } else {
            setNavHidden(false)
        }
    })

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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

    return (
        <div className="app-container">
            <SmokeCursor />

            {/* ── HEADER ── */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: navHidden ? -100 : 0, opacity: navHidden ? 0 : 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
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
                            onClick={() => { setMobileMenuOpen(false); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) }}>
                            Get Consultation
                        </button>
                    </div>
                </div>
            )}

            {/* ── SLIDE BAR (replaces banner + hero) ── */}
            <HeroVideoBanner />

            {/* ── SERVICES SECTION ── */}
            <ServicesSection />

            {/* ── PROJECTS SECTION (scroll-driven premium cards) ── */}
            <ProjectsSection />

            {/* ── WHO WE ARE SECTION ── */}
            <AboutSection />

            {/* 1. CONTACT SECTION */}
            <ContactSection />

            {/* 2. CONTACT INFORMATION AREA */}
            <ContactInfoArea />

            {/* 3. WHATSAPP BUTTON */}
            <WhatsAppButton />

            {/* 4. FOOTER SECTION */}
            <FooterSection />
        </div>
    )
}

export default MainPage
