import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import Masonry from '../components/Masonry';
import {
  FiTruck, FiRefreshCw, FiShield, FiHeadphones,
  FiStar, FiChevronLeft, FiChevronRight, FiArrowRight,
  FiInstagram, FiCheck
} from 'react-icons/fi';

// ─── Static Reviews Data ────────────────────────────────────────────────
const REVIEWS = [
  {
    id: 1, name: "Arjun Mehta", location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop&crop=face",
    rating: 5,
    text: "Absolutely stunning quality. The fabric is luxurious and the fit is perfect. LUXE has become my go-to for everything premium. Every compliment I've received about my style recently traces back to this brand.",
    product: "Classic Oxford Shirt", verified: true, date: "2 weeks ago"
  },
  {
    id: 2, name: "Rahul Sharma", location: "Delhi, India",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop&crop=face",
    rating: 5,
    text: "I was skeptical at first, but after my first order, I was completely hooked. The attention to detail is unmatched — the stitching, the buttons, the packaging. Worth every rupee spent.",
    product: "Merino Wool Jacket", verified: true, date: "1 month ago"
  },
  {
    id: 3, name: "Vikram Singh", location: "Bangalore, India",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop&crop=face",
    rating: 4,
    text: "Excellent craftsmanship and fast delivery. The slim-fit jeans are the most comfortable I've ever worn — I've already ordered two more pairs in different colors.",
    product: "Slim Fit Selvedge Denim", verified: true, date: "3 weeks ago"
  },
  {
    id: 4, name: "Priya Kapoor", location: "Chennai, India",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop&crop=face",
    rating: 5,
    text: "Bought this as a gift for my husband — he hasn't stopped wearing it! The quality is exceptional and LUXE's customer service went above and beyond when I had a question about sizing.",
    product: "Premium Cashmere Sweater", verified: true, date: "5 days ago"
  },
  {
    id: 5, name: "Karthik Nair", location: "Hyderabad, India",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&h=100&auto=format&fit=crop&crop=face",
    rating: 5,
    text: "The linen shirt I ordered is breathable, stylish, and incredibly versatile. Wore it to a business meeting and got multiple compliments. LUXE truly understands the modern professional wardrobe.",
    product: "Relaxed Linen Shirt", verified: true, date: "1 week ago"
  },
  {
    id: 6, name: "Ananya Reddy", location: "Pune, India",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&auto=format&fit=crop&crop=face",
    rating: 4,
    text: "Shipping was faster than expected and the packaging was beautiful — it felt like receiving a luxury gift. The quality of the fabric is noticeably superior to anything else I've purchased online.",
    product: "Italian Cotton Polo", verified: true, date: "2 months ago"
  },
];

// Calculate average rating
const avgRating = REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length;
const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
  star,
  count: REVIEWS.filter((r) => r.rating === star).length,
  percentage: (REVIEWS.filter((r) => r.rating === star).length / REVIEWS.length) * 100,
}));

import StarRating from '../components/StarRating';

// ─── Feature Badges ─────────────────────────────────────────────────────
const FEATURES = [
  { icon: FiTruck, title: "Free Shipping", desc: "On orders over ₹100", color: "bg-blue-50", iconColor: "text-blue-600" },
  { icon: FiRefreshCw, title: "Easy Returns", desc: "30-day hassle-free returns", color: "bg-green-50", iconColor: "text-green-600" },
  { icon: FiShield, title: "Secure Payment", desc: "SSL encrypted checkout", color: "bg-purple-50", iconColor: "text-purple-600" },
  { icon: FiHeadphones, title: "24/7 Support", desc: "Expert style assistance", color: "bg-amber-50", iconColor: "text-amber-600" },
];

// ─── Categories ─────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "1", label: "OUTERWEAR", url: "/shop?category=Outerwear",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    tag: "Bestseller", height: 750
  },
  {
    id: "2", label: "SHIRTS", url: "/shop?category=Shirts",
    img: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop",
    tag: "New In", height: 450
  },
  {
    id: "3", label: "DENIM", url: "/shop?category=Denim",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
    tag: "Trending", height: 500
  },
  {
    id: "4", label: "SNEAKERS", url: "/shop?category=Sneakers",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    tag: "Limited", height: 350
  },
  {
    id: "5", label: "ACCESSORIES", url: "/shop?category=Accessories",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
    tag: "Curated", height: 600
  },
  {
    id: "6", label: "JEANS", url: "/shop?category=Jeans",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
    tag: "Classic", height: 400
  },
  {
    id: "7", label: "JACKETS", url: "/shop?category=Jackets",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    tag: "Essential", height: 550
  },
  {
    id: "8", label: "DRESSES", url: "/shop?category=Dresses",
    img: "https://images.unsplash.com/photo-1515347619362-67fd89885c40?q=80&w=800&auto=format&fit=crop",
    tag: "Elegant", height: 650
  },
  {
    id: "9", label: "T-SHIRTS", url: "/shop?category=T-Shirts",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    tag: "Casual", height: 400
  },
  {
    id: "10", label: "ACTIVEWEAR", url: "/shop?category=Activewear",
    img: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=800&auto=format&fit=crop",
    tag: "Performance", height: 500
  },
  {
    id: "11", label: "SWIMWEAR", url: "/shop?category=Swimwear",
    img: "https://images.unsplash.com/photo-1563630381190-77c336ea545a?q=80&w=800&auto=format&fit=crop",
    tag: "Summer", height: 400
  },
  {
    id: "12", label: "SHOES", url: "/shop?category=Shoes",
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
    tag: "Footwear", height: 600
  },
  {
    id: "13", label: "BAGS", url: "/shop?category=Bags",
    img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    tag: "Carry", height: 450
  }
];

// ─── MARQUEE BRANDS ──────────────────────────────────────────────────────
const BRANDS = ["ZARA", "H&M", "MASSIMO DUTTI", "COS", "UNIQLO", "MANGO", "RESERVED", "WEEKDAY", "ARKET", "& OTHER STORIES"];

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [reviewPage, setReviewPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const reviewsRef = useRef(null);

  useEffect(() => {
    if (user?.role === 'seller') {
      navigate('/seller/dashboard');
    }
  }, [user, navigate]);

  const REVIEWS_PER_PAGE = 3;
  const totalReviewPages = Math.ceil(REVIEWS.length / REVIEWS_PER_PAGE);
  const visibleReviews = REVIEWS.slice(reviewPage * REVIEWS_PER_PAGE, (reviewPage + 1) * REVIEWS_PER_PAGE);

  useEffect(() => {
    dispatch(getProducts({ sort: 'newest' }));
  }, [dispatch]);

  // Auto-rotate review page
  useEffect(() => {
    const timer = setInterval(() => {
      setReviewPage((p) => (p + 1) % totalReviewPages);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalReviewPages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {/* ─── HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1920&auto=format&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover object-top"
            style={{ animation: 'float 16s ease-in-out infinite' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle z-10"
            style={{
              width: `${Math.random() * 10 + 4}px`,
              height: `${Math.random() * 10 + 4}px`,
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 1.3}s`,
              animationDuration: `${7 + i * 1.5}s`,
            }}
          />
        ))}

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-yellow-400 text-xs uppercase tracking-[0.4em] font-semibold mb-6 block"
          >
            New Season Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white text-6xl md:text-8xl font-black tracking-tight mb-4 leading-none"
          >
            THE NEW<br />
            <span className="italic font-light text-5xl md:text-7xl">ESSENTIALS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-200 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light"
          >
            Discover our latest collection of premium menswear. Designed for comfort, tailored for perfection.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/shop"
              className="px-12 py-4 bg-white text-black text-sm uppercase tracking-widest font-bold hover:bg-gray-100 active:scale-95 transition-all duration-300"
            >
              Explore Collection
            </Link>
            <Link
              to="/about"
              className="px-12 py-4 border border-white text-white text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-300"
            >
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-white to-transparent"
          />
          <span className="text-white text-[10px] tracking-widest uppercase opacity-60">Scroll</span>
        </div>
      </section>

      {/* ─── TRUST BADGES ─────────────────────────────────────────────── */}
      <section className="py-8 border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4"
              >
                <div className={`w-10 h-10 ${feature.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className={feature.iconColor} size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">{feature.title}</p>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND MARQUEE ─────────────────────────────────────────────── */}
      <section className="py-6 bg-black overflow-hidden">
        <div className="relative">
          <div className="marquee-track">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <span key={i} className="text-gray-400 text-xs tracking-[0.3em] uppercase font-semibold mx-8 flex-shrink-0">
                {brand}
                <span className="text-yellow-400 mx-8">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED CATEGORIES ──────────────────────────────────────── */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <p className="text-yellow-500 text-xs uppercase tracking-[0.3em] font-semibold mb-2">Explore</p>
            <h2 className="text-4xl font-black tracking-tight">Shop by Category</h2>
          </div>
          <Link to="/shop" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors hidden md:flex items-center gap-2 group">
            View All <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="w-full relative min-h-[500px]">
          <Masonry
            items={CATEGORIES}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.97}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>
      </section>

      {/* ─── NEW ARRIVALS ──────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <p className="text-yellow-500 text-xs uppercase tracking-[0.3em] font-semibold mb-2">Just Dropped</p>
              <h2 className="text-4xl font-black tracking-tight">New Arrivals</h2>
            </div>
            <Link to="/shop?isNewArrival=true" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 transition-colors hidden md:flex items-center gap-2 group">
              See All New <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="shimmer aspect-[3/4] w-full mb-4" />
                  <div className="shimmer h-4 w-3/4 mb-2" />
                  <div className="shimmer h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {products.slice(0, 4).map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── FULL WIDTH BANNER ─────────────────────────────────────────── */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1920&auto=format&fit=crop"
          alt="Featured Banner"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-md"
            >
              <span className="text-yellow-400 text-xs uppercase tracking-[0.3em] font-semibold block mb-4">Limited Edition</span>
              <h2 className="text-white text-5xl font-black leading-tight mb-4">
                Winter<br />Collection<br /><em className="font-light text-3xl">2024</em>
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-8">
                Premium outerwear crafted for the coldest days, designed to make the boldest statement.
              </p>
              <Link
                to="/shop?category=Jackets"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors group"
              >
                Shop Collection
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MORE PRODUCTS ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <p className="text-yellow-500 text-xs uppercase tracking-[0.3em] font-semibold mb-2">Featured</p>
            <h2 className="text-4xl font-black tracking-tight">Trending Now</h2>
          </div>
          <Link to="/shop" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 transition-colors hidden md:flex items-center gap-2 group">
            View All <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="shimmer aspect-[3/4] w-full mb-4" />
                <div className="shimmer h-4 w-3/4 mb-2" />
                <div className="shimmer h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {products.slice(0, 8).map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.07 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-14">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 border-2 border-black text-black px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 group"
              >
                View All Products
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="uppercase tracking-widest text-sm">No products available yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* ─── PAYMENT SECTION ───────────────────────────────────────────── */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-1">
              <p className="text-yellow-400 text-xs uppercase tracking-[0.3em] font-semibold mb-2">Checkout</p>
              <h2 className="text-3xl font-black mb-4">Secure &amp; Flexible<br />Payment Options</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                We support a wide range of payment methods so you can shop in the way that works best for you. Every transaction is 256-bit SSL encrypted.
              </p>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: "Visa", bg: "bg-[#1A1F71]", text: "text-white", symbol: "VISA" },
                { name: "Mastercard", bg: "bg-[#EB001B]", text: "text-white", symbol: "MC" },
                { name: "UPI", bg: "bg-white", text: "text-black", symbol: "UPI" },
                { name: "Razorpay", bg: "bg-[#2D69E5]", text: "text-white", symbol: "R/" },
                { name: "Net Banking", bg: "bg-green-700", text: "text-white", symbol: "NB" },
                { name: "Cash on Delivery", bg: "bg-gray-700", text: "text-white", symbol: "COD" },
              ].map((pm, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`${pm.bg} ${pm.text} rounded-lg p-4 flex flex-col justify-between h-20 border border-white/10`}
                >
                  <span className="text-xs opacity-60 uppercase tracking-widest">{pm.name}</span>
                  <span className="text-xl font-black tracking-tight">{pm.symbol}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FiShield, text: "256-bit SSL Encryption" },
              { icon: FiCheck, text: "PCI-DSS Compliant" },
              { icon: FiRefreshCw, text: "Instant Refunds" },
              { icon: FiTruck, text: "Free Shipping >₹100" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-400">
                <item.icon size={16} className="text-yellow-400 flex-shrink-0" />
                <span className="text-xs">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS SECTION ───────────────────────────────────────────── */}
      <section ref={reviewsRef} className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-yellow-500 text-xs uppercase tracking-[0.3em] font-semibold mb-2">Social Proof</p>
              <h2 className="text-4xl font-black tracking-tight">What Our Customers Say</h2>
            </div>

            {/* Rating Summary */}
            <div className="flex items-center gap-8 bg-gray-50 px-8 py-6 rounded-none border border-gray-100">
              <div className="text-center">
                <p className="text-5xl font-black text-black">{avgRating.toFixed(1)}</p>
                <StarRating rating={Math.round(avgRating)} size={18} />
                <p className="text-xs text-gray-500 mt-1">{REVIEWS.length} reviews</p>
              </div>
              <div className="space-y-2 min-w-[160px]">
                {ratingDistribution.map(({ star, count, percentage }) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs w-2 text-gray-500">{star}</span>
                    <FiStar size={10} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                    <div className="flex-1 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-amber-400 rounded-full"
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-4">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Review Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={reviewPage}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {visibleReviews.map((review) => (
              <motion.div
                key={review.id}
                className="bg-white border border-gray-100 p-6 hover:shadow-xl hover:border-black/10 transition-all duration-300 card-hover"
              >
                {/* Stars */}
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={review.rating} size={14} />
                  {review.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-green-600 font-semibold uppercase tracking-wider">
                      <FiCheck size={10} strokeWidth={3} /> Verified
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                  "{review.text}"
                </p>

                {/* Product badge */}
                <div className="mb-5">
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 uppercase tracking-widest font-semibold">
                    {review.product}
                  </span>
                </div>

                {/* Reviewer */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-9 h-9 rounded-full object-cover object-top"
                  />
                  <div>
                    <p className="text-sm font-bold">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.location} · {review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setReviewPage((p) => Math.max(0, p - 1))}
            disabled={reviewPage === 0}
            className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalReviewPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewPage(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === reviewPage ? 'bg-black w-6' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setReviewPage((p) => Math.min(totalReviewPages - 1, p + 1))}
            disabled={reviewPage === totalReviewPages - 1}
            className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* ─── INSTAGRAM SECTION ─────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <FiInstagram size={28} className="mx-auto mb-3 text-gray-400" />
            <h2 className="text-3xl font-black">@luxemenswear</h2>
            <p className="text-gray-500 text-sm mt-2">Follow us for daily style inspiration</p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[
              "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=300&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=300&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=300&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=300&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300&auto=format&fit=crop",
            ].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group relative aspect-square overflow-hidden cursor-pointer"
              >
                <img src={src} alt="Instagram" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <FiInstagram className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300" size={24} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-yellow-400 text-xs uppercase tracking-[0.3em] font-semibold mb-4">Stay Connected</p>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Get Exclusive<br />Access
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              Subscribe to receive early access to new arrivals, exclusive offers, and style inspiration delivered directly to your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.querySelector('input');
                if (input.value) {
                  input.value = '';
                }
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:border-white/60 transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-600 text-xs mt-4">
              No spam, ever. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
