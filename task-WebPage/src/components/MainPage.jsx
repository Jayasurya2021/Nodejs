import { useState, useEffect } from 'react'
import {
    Compass,
    Shield,
    Workflow,
    Clock,
    ArrowRight,
    Phone,
    MapPin,
    Star,
    Building,
    CheckCircle2,
    X,
    ChevronRight,
    Award,
    Briefcase,
    Users,
    Layers,
    Sparkles,
    Mail,
    User,
    Activity,
    Menu,
    ChevronDown
} from 'lucide-react'
import '../App.css'
import bannerImage from '../assets/images/banerimage.webp'
import useScrollReveal from '../hooks/useScrollReveal';
import logoImage from '../assets/images/logo.png'


function MainPage() {


    // Consultation Modal State
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: 'luxury-villa',
        message: '',
        agree: true
    })

    // Portfolio Interactive Filter State
    const [activeFilter, setActiveFilter] = useState('all')

    // Mobile navigation drawer state
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Header background scroll threshold
    const [isScrolled, setIsScrolled] = useState(false)

    // Contact Form State
    const [contactForm, setContactForm] = useState({
        name: '', email: '', phone: '', projectType: '', message: ''
    })
    const [contactSubmitted, setContactSubmitted] = useState(false)

    const revealRef = useScrollReveal();
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitted(true)
        setTimeout(() => {
            setIsSubmitted(false)
            setIsModalOpen(false)
            // reset form
            setFormData({
                name: '',
                email: '',
                projectType: 'luxury-villa',
                message: '',
                agree: true
            })
        }, 2500)
    }

    const handleContactChange = (e) => {
        const { name, value } = e.target
        setContactForm(prev => ({ ...prev, [name]: value }))
    }

    const handleContactSubmit = (e) => {
        e.preventDefault();
        // Simulate successful submission for showcase only
        setContactSubmitted(true);
        setTimeout(() => {
            setContactSubmitted(false);
            setContactForm({ name: '', email: '', phone: '', projectType: '', message: '' });
        }, 3000);
    };

    // Portfolio items data
    const portfolioItems = [
        {
            id: 1,
            title: 'Aura Heights',
            category: 'commercial',
            location: 'Dubai, UAE',
            image: '/assets/future_landmark.png', // Fallback path if custom image loads
            area: '450,000 sq ft',
            year: '2025'
        },
        {
            id: 2,
            title: 'Cyan Oasis Villa',
            category: 'villa',
            location: 'Miami, USA',
            image: '/assets/luxury_villa.png',
            area: '12,500 sq ft',
            year: '2024'
        },
        {
            id: 3,
            title: 'Sapphire Headquarters',
            category: 'commercial',
            location: 'London, UK',
            image: '/assets/future_landmark.png',
            area: '280,000 sq ft',
            year: '2026'
        },
        {
            id: 4,
            title: 'Nebula Smart House',
            category: 'villa',
            location: 'California, USA',
            image: '/assets/luxury_villa.png',
            area: '8,400 sq ft',
            year: '2025'
        },
        {
            id: 5,
            title: 'The Azure Penthouse',
            category: 'interior',
            location: 'New York, USA',
            image: '/assets/luxury_villa.png',
            area: '6,200 sq ft',
            year: '2023'
        },
        {
            id: 6,
            title: 'Vortex Tech Hub',
            category: 'commercial',
            location: 'Singapore',
            image: '/assets/future_landmark.png',
            area: '620,000 sq ft',
            year: '2026'
        }
    ]

    const filteredPortfolio = activeFilter === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeFilter)

    return (
        <div className="app-container">
            {/* 0. Top Banner Background */}
            <div className="top-banner-container">
                <img src={bannerImage} alt="Building Banner" className="top-banner-img" />
                <div className="top-banner-overlay"></div>
            </div>

            {/* 1. Header / Navbar */}
            <header className={`main-header ${isScrolled ? 'header-scrolled' : ''}`}>
                <div className="header-inner">
                    {/* Logo */}
                    <div className="logo-container">
                        <img src={logoImage} alt="ARKHE Logo" style={{ height: '40px', width: 'auto' }} />
                    </div>

                    {/* Desktop Navigation Capsule */}
                    <nav className="desktop-nav glass">
                        <a href="#about" className="nav-link">About</a>
                        <a href="#services" className="nav-link">Services</a>
                        <a href="#projects" className="nav-link">Projects</a>
                        <a href="#vision" className="nav-link">Vision</a>
                        <a href="#reviews" className="nav-link">Reviews</a>
                    </nav>

                    {/* Consultation Button */}
                    <div className="header-actions">
                        <button
                            className="btn-primary btn-glow"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Get Consultation
                        </button>
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
                <div className="mobile-nav-overlay glass" onClick={() => setMobileMenuOpen(false)}>
                    <div className="mobile-nav-menu" onClick={(e) => e.stopPropagation()}>
                        <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
                            <X size={28} />
                        </button>
                        <div className="mobile-logo-container">
                            <img src={logoImage} alt="ARKHE Logo" style={{ height: '32px', width: 'auto' }} />
                        </div>
                        <nav className="mobile-links">
                            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
                            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
                            <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
                            <a href="#vision" onClick={() => setMobileMenuOpen(false)}>Vision</a>
                            <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
                        </nav>
                        <button
                            className="btn-primary w-full"
                            style={{ width: '100%', justifyContent: 'center', marginTop: '24px', padding: '14px 24px' }}
                            onClick={() => {
                                setMobileMenuOpen(false);
                                setIsModalOpen(true);
                            }}
                        >
                            Get Consultation
                        </button>
                    </div>
                </div>
            )}

            {/* 2. Hero Section */}
            <section id="hero" className="hero-section">
                <div className="hero-grid container">
                    {/* Hero Left Content */}
                    <div className="hero-content">


                    </div>
                </div>
                <div className="container" style={{ marginTop: '720px', position: 'relative', zIndex: 10 }}>
                    {/* Glass Stats Capsule (Repositioned to bottom of banner) */}
                    <div className="stats-capsule glass animate-slide-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', width: '100%' }}>
                        <div className="stat-column">
                            <span className="stat-number">15+</span>
                            <div className="stat-label">
                                <Award size={14} className="stat-icon" />
                                <span>Years of Excellence</span>
                            </div>
                        </div>

                        <div className="stat-column">
                            <span className="stat-number">250+</span>
                            <div className="stat-label">
                                <Briefcase size={14} className="stat-icon" />
                                <span>Projects Delivered</span>
                            </div>
                        </div>

                        <div className="stat-column">
                            <span className="stat-number">500+</span>
                            <div className="stat-label">
                                <Users size={14} className="stat-icon" />
                                <span>Happy Clients</span>
                            </div>
                        </div>

                        <div className="stat-column">
                            <span className="stat-number">12</span>
                            <div className="stat-label">
                                <Layers size={14} className="stat-icon" />
                                <span>Ongoing Projects</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Infinite Moving Services Ticker Ribbon */}
            <section id="services" className="ticker-section">
                <div className="ticker-container">
                    <div className="ticker-wrapper">
                        <div className="animate-marquee">
                            <span className="ticker-item"><span className="neon-circle"></span> LUXURY VILLAS</span>
                            <span className="ticker-item"><span className="neon-circle"></span> COMMERCIAL PROJECTS</span>
                            <span className="ticker-item"><span className="neon-circle"></span> INTERIOR CONSTRUCTION</span>
                            <span className="ticker-item"><span className="neon-circle"></span> SMART HOMES</span>
                            <span className="ticker-item"><span className="neon-circle"></span> SUSTAINABLE RENOVATION</span>
                            <span className="ticker-item"><span className="neon-circle"></span> ARCHITECTURAL BLUEPRINTS</span>

                            {/* Duplicate for seamless infinite loop */}
                            <span className="ticker-item"><span className="neon-circle"></span> LUXURY VILLAS</span>
                            <span className="ticker-item"><span className="neon-circle"></span> COMMERCIAL PROJECTS</span>
                            <span className="ticker-item"><span className="neon-circle"></span> INTERIOR CONSTRUCTION</span>
                            <span className="ticker-item"><span className="neon-circle"></span> SMART HOMES</span>
                            <span className="ticker-item"><span className="neon-circle"></span> SUSTAINABLE RENOVATION</span>
                            <span className="ticker-item"><span className="neon-circle"></span> ARCHITECTURAL BLUEPRINTS</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. "Where Vision Meets Craft" Section */}
            <section id="about" className="vision-section">
                <div className="container">
                    <div className="vision-grid">
                        {/* Vision Left: Core Values & Description */}
                        <div className="vision-content">
                            <div className="section-header-tag">
                                <span className="accent-bar"></span>
                                <span>OUR STORY & VISION</span>
                            </div>

                            <h2 className="vision-title">
                                Where Vision Meets Craft
                            </h2>

                            <p className="vision-desc">
                                Since 2008, ARKHE has been at the forefront of premium construction and
                                architectural design. We merge traditional craftsmanship with cutting-edge
                                technology, creating structures that are not just buildings — but living legacies.
                            </p>

                            {/* Benefit Grid (4 Cards) */}
                            <div ref={revealRef} className="benefit-grid reveal-container">
                                <div className="benefit-card glass glass-interactive reveal-item">
                                    <div className="benefit-icon-wrapper">
                                        <Building size={20} />
                                    </div>
                                    <div className="benefit-info">
                                        <h4 className="benefit-card-title">Premium Materials</h4>
                                        <p className="benefit-card-text">Finest sourced globally</p>
                                    </div>
                                </div>

                                <div className="benefit-card glass glass-interactive reveal-item">
                                    <div className="benefit-icon-wrapper">
                                        <Shield size={20} />
                                    </div>
                                    <div className="benefit-info">
                                        <h4 className="benefit-card-title">Expert Engineers</h4>
                                        <p className="benefit-card-text">Certified & experienced</p>
                                    </div>
                                </div>

                                <div className="benefit-card glass glass-interactive reveal-item">
                                    <div className="benefit-icon-wrapper">
                                        <Workflow size={20} />
                                    </div>
                                    <div className="benefit-info">
                                        <h4 className="benefit-card-title">Sustainable Build</h4>
                                        <p className="benefit-card-text">Eco-conscious methods</p>
                                    </div>
                                </div>

                                <div className="benefit-card glass glass-interactive reveal-item">
                                    <div className="benefit-icon-wrapper">
                                        <Clock size={20} />
                                    </div>
                                    <div className="benefit-info">
                                        <h4 className="benefit-card-title">Timely Delivery</h4>
                                        <p className="benefit-card-text">On-schedule always</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vision Right: Luxury Pool Villa Rendering */}
                        <div className="vision-visual">
                            <div className="vision-image-wrapper">
                                <div className="blue-ambient-glow-2"></div>
                                <img
                                    src="/assets/luxury_villa.png"
                                    alt="Modern Luxury Villa at Night"
                                    className="vision-main-img"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
                                    }}
                                />

                                {/* Floating Overlay Info Badge */}
                                <div className="vision-info-badge glass">
                                    <div className="badge-icon-holder">
                                        <Sparkles size={24} className="badge-icon-spin" />
                                    </div>
                                    <div className="badge-numbers">15+</div>
                                    <div className="badge-label">YEARS OF EXCELLENCE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Interactive Portfolio/Projects Section with Filters */}
            <section ref={revealRef} id="projects" className="portfolio-section">
                <div className="container">
                    <div className="portfolio-header">
                        <div>
                            <div className="section-header-tag">
                                <span className="accent-bar"></span>
                                <span>FEATURED PORTFOLIO</span>
                            </div>
                            <h2 className="portfolio-title">Landmark Blueprints</h2>
                        </div>

                        {/* Category Filters */}
                        <div className="filter-group glass">
                            <button
                                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('all')}
                            >
                                All Projects
                            </button>
                            <button
                                className={`filter-btn ${activeFilter === 'villa' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('villa')}
                            >
                                Luxury Villas
                            </button>
                            <button
                                className={`filter-btn ${activeFilter === 'commercial' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('commercial')}
                            >
                                Commercial
                            </button>
                            <button
                                className={`filter-btn ${activeFilter === 'interior' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('interior')}
                            >
                                Interiors
                            </button>
                        </div>
                    </div>

                    {/* Interactive Project Grid */}
                    <div className="project-grid">
                        {filteredPortfolio.map((project) => (
                            <div key={project.id} className="project-card glass glass-interactive">
                                <div className="project-img-container">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="project-img"
                                        onError={(e) => {
                                            e.target.src = project.category === 'villa'
                                                ? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
                                                : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
                                        }}
                                    />
                                    <div className="project-overlay">
                                        <span className="project-location glass">
                                            <MapPin size={12} /> {project.location}
                                        </span>
                                    </div>
                                </div>
                                <div className="project-details">
                                    <div className="project-top-row">
                                        <span className="project-cat">{project.category.toUpperCase()}</span>
                                        <span className="project-year">{project.year}</span>
                                    </div>
                                    <h3 className="project-card-title">{project.title}</h3>
                                    <div className="project-meta-row">
                                        <span className="project-area">{project.area}</span>
                                        <button
                                            className="project-details-link"
                                            onClick={() => setIsModalOpen(true)}
                                        >
                                            Inquire <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Testimonials Reviews Section */}
            <section id="reviews" className="reviews-section">
                <div className="container">
                    <div className="reviews-header text-center">
                        <div className="section-header-tag justify-center">
                            <span className="accent-bar"></span>
                            <span>CLIENT TESTIMONIALS</span>
                        </div>
                        <h2 className="reviews-title">What Our Patrons Say</h2>
                    </div>

                    <div ref={revealRef} className="reviews-grid reveal-container">
                        <div className="review-card glass glass-interactive reveal-item">
                            <div className="review-stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="star-filled" />)}
                            </div>
                            <p className="review-text">
                                "ARKHE transformed our vision into an architectural masterpiece. The luxury pool
                                villa design is truly exceptional, and the blue neon accents are breathtaking at night.
                                Absolute professionals in timing and communication."
                            </p>
                            <div className="reviewer-info">
                                <div className="reviewer-avatar rev-1"></div>
                                <div>
                                    <h5 className="reviewer-name">Marcus Sterling</h5>
                                    <p className="reviewer-role">CEO, Sterling Holdings</p>
                                </div>
                            </div>
                        </div>

                        <div className="review-card glass glass-interactive reveal-item">
                            <div className="review-stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="star-filled" />)}
                            </div>
                            <p className="review-text">
                                "The corporate tower build was an massive undertaking, but the engineers at ARKHE
                                executed it flawlessly. Their sustainable methods saved us 15% in utility plans.
                                Highly recommended for premium projects."
                            </p>
                            <div className="reviewer-info">
                                <div className="reviewer-avatar rev-2"></div>
                                <div>
                                    <h5 className="reviewer-name">Helena Rostova</h5>
                                    <p className="reviewer-role">Director of Operations, Rostova Biotech</p>
                                </div>
                            </div>
                        </div>

                        <div className="review-card glass glass-interactive reveal-item">
                            <div className="review-stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="star-filled" />)}
                            </div>
                            <p className="review-text">
                                "Outstanding interior integration. The smart home modules combined with architectural
                                finishes are sublime. They truly understand premium luxury and state-of-the-art living."
                            </p>
                            <div className="reviewer-info">
                                <div className="reviewer-avatar rev-3"></div>
                                <div>
                                    <h5 className="reviewer-name">David Cho</h5>
                                    <p className="reviewer-role">Founder, Cho Architecturals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Consultation CTA / Footer */}
            <footer className="main-footer">
                <div className="footer-cta container glass">
                    <div className="footer-cta-text">
                        <h2>Ready to craft your future landmark?</h2>
                        <p>Connect with our architectural specialists for a complimentary consultation session.</p>
                    </div>
                    <button
                        className="btn-primary btn-glow btn-large"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Start Your Journey <ArrowRight size={20} />
                    </button>
                </div>

                <div className="footer-links container">
                    <div className="footer-brand">
                        <div className="logo-container">
                            <img src={logoImage} alt="ARKHE Logo" style={{ height: '40px', width: 'auto' }} />
                        </div>
                        <p>Shaping premium urban landscapes since 2008 with integrity and engineering innovation.</p>
                        <div className="contact-details">
                            <div className="contact-item">
                                <Phone size={14} className="contact-icon" />
                                <span>+1 (800) 555-0199</span>
                            </div>
                            <div className="contact-item">
                                <Mail size={14} className="contact-icon" />
                                <span>concierge@arkhe.design</span>
                            </div>
                        </div>
                    </div>

                    <div className="footer-nav-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#about">About Our Vision</a></li>
                            <li><a href="#services">Services Suite</a></li>
                            <li><a href="#projects">Blueprints Portfolio</a></li>
                            <li><a href="#reviews">Patron Reviews</a></li>
                        </ul>
                    </div>

                    <div className="footer-nav-col">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="#services">Luxury Villadom</a></li>
                            <li><a href="#services">Commercial Structures</a></li>
                            <li><a href="#services">Sustainable Design</a></li>
                            <li><a href="#services">Smart Ecosystems</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom container">
                    <p>&copy; {new Date().getFullYear()} ARKHE Premium Construction. All rights reserved.</p>
                    <div className="footer-socials">
                        <a href="#" className="social-icon-link">TW</a>
                        <a href="#" className="social-icon-link">LN</a>
                        <a href="#" className="social-icon-link">IG</a>
                        <a href="#" className="social-icon-link">FB</a>
                    </div>
                </div>
            </footer>

            {/* 8. STATE-DRIVEN PREMIUM CONSULTATION MODAL */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-wrapper glass animate-scale-up" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                            <X size={22} />
                        </button>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="modal-form">
                                <div className="modal-header">
                                    <div className="modal-icon-header">
                                        <Sparkles size={24} className="text-highlight" />
                                    </div>
                                    <h3>Request a Consultation</h3>
                                    <p>Tell us about your landmark project and our luxury architects will get back to you.</p>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name"><User size={16} /> Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="glass-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email"><Mail size={16} /> Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="glass-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="projectType"><Activity size={16} /> Project Classification</label>
                                    <div className="select-container">
                                        <select
                                            id="projectType"
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleInputChange}
                                            className="glass-input glass-select"
                                        >
                                            <option value="luxury-villa">Luxury Villa Build</option>
                                            <option value="commercial">Commercial Tower</option>
                                            <option value="smart-home">Integrated Smart Mansion</option>
                                            <option value="renovation">High-End Renovation</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Project Description</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows="3"
                                        placeholder="Describe your design vision, estimated scale, and location..."
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="glass-input"
                                    ></textarea>
                                </div>

                                <div className="checkbox-group">
                                    <input
                                        type="checkbox"
                                        id="agree"
                                        name="agree"
                                        checked={formData.agree}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="agree">
                                        I agree to the ARKHE Privacy Protocol & terms of luxury concierge.
                                    </label>
                                </div>

                                <button type="submit" className="btn-primary btn-glow w-full mt-4">
                                    Send Concierge Request
                                </button>
                            </form>
                        ) : (
                            <div className="modal-success-state">
                                <div className="success-icon-wrapper">
                                    <CheckCircle2 size={64} className="text-highlight success-bounce" />
                                </div>
                                <h3>Request Transmitted</h3>
                                <p className="text-secondary mt-2">
                                    Greetings, {formData.name}. Your design brief has been securely catalogued.
                                    An elite architectural concierge advisor will call you within 12 business hours.
                                </p>
                                <div className="loading-success-line">
                                    <div className="loading-success-progress"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}


export default MainPage