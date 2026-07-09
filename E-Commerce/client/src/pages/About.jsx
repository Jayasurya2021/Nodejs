import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useCountUp } from 'framer-motion';
import { FiArrowRight, FiStar, FiHeart, FiAward, FiTruck, FiShield } from 'react-icons/fi';

// Animated counter hook
const useCounter = (end, duration = 2, shouldStart = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [end, duration, shouldStart]);
  return count;
};

const StatCard = ({ value, suffix, label, icon: Icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const count = useCounter(value, 2, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center group"
    >
      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-white" size={24} />
      </div>
      <div className="text-5xl font-black text-black mb-2">
        {count}{suffix}
      </div>
      <p className="text-gray-500 text-sm uppercase tracking-widest">{label}</p>
    </motion.div>
  );
};

const TEAM = [
  {
    name: "Alexander Reid",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    quote: "Fashion is an art form. Every garment tells a story."
  },
  {
    name: "Sophia Chen",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    quote: "Details are what separate good design from great design."
  },
  {
    name: "Marcus Williams",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    quote: "Excellence is not optional — it's our standard."
  },
  {
    name: "Priya Patel",
    role: "Style Director",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    quote: "Style is personal. We help you find yours."
  },
];

const VALUES = [
  { icon: FiStar, title: "Uncompromising Quality", desc: "Every piece is crafted from premium materials, tested to the highest standards before reaching you." },
  { icon: FiHeart, title: "Passion for Style", desc: "We don't just make clothes — we craft experiences that make you feel confident, powerful, and extraordinary." },
  { icon: FiAward, title: "Sustainable Luxury", desc: "Our commitment to the planet is as strong as our commitment to style. Ethically sourced, responsibly made." },
  { icon: FiShield, title: "Lifetime Guarantee", desc: "We stand behind every product we create. Quality you can trust, service you can rely on." },
];

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop"
          alt="About LUXE"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-yellow-400 text-xs uppercase tracking-[0.3em] font-semibold mb-6 block"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white text-5xl md:text-7xl font-black tracking-tight mb-6"
          >
            Crafted for the<br /><span className="italic font-light">Modern Gentleman</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-200 text-lg md:text-xl font-light max-w-2xl mx-auto"
          >
            Since 2015, LUXE has been redefining premium menswear — where timeless design meets modern innovation.
          </motion.p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop"
                alt="Brand Story"
                className="w-full h-[500px] object-cover object-top"
              />
              <div className="absolute -bottom-6 -right-6 bg-black text-white p-8 hidden md:block">
                <p className="text-4xl font-black">9+</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest">Years of Excellence</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <p className="text-yellow-500 text-xs uppercase tracking-[0.3em] font-semibold mb-3">Who We Are</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Born from a passion<br />for <em className="font-light">perfection</em>
              </h2>
            </div>
            <p className="text-gray-500 text-base leading-relaxed">
              LUXE was founded in 2015 by Alexander Reid, a former architect with an obsession for precision and detail. 
              Frustrated by the lack of truly premium, thoughtfully designed menswear, he set out to create something different.
            </p>
            <p className="text-gray-500 text-base leading-relaxed">
              Today, LUXE is synonymous with quality, sophistication, and a relentless pursuit of excellence. 
              Every garment in our collection is a result of months of design iteration, sourcing the finest materials 
              from around the world, and working with master craftsmen who share our vision.
            </p>
            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-all duration-300 group"
              >
                Explore Collection
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-yellow-400 text-xs uppercase tracking-[0.3em] font-semibold mb-3">By the Numbers</p>
            <h2 className="text-4xl font-black">Our Impact in Numbers</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: 150000, suffix: '+', label: 'Happy Customers', icon: FiHeart },
              { value: 500, suffix: '+', label: 'Unique Products', icon: FiStar },
              { value: 9, suffix: '+', label: 'Years of Excellence', icon: FiAward },
              { value: 48, suffix: '', label: 'Countries Served', icon: FiTruck },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <stat.icon className="text-yellow-400 mx-auto mb-4" size={32} />
                  <StatCard {...stat} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-yellow-500 text-xs uppercase tracking-[0.3em] font-semibold mb-3">What We Stand For</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Our Core Values</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VALUES.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-6 p-8 border border-gray-100 hover:border-black hover:shadow-xl transition-all duration-300 group card-hover"
            >
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-yellow-500 text-xs uppercase tracking-[0.3em] font-semibold mb-3">The People</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Meet the Team</h2>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm">
              Passionate individuals united by a shared love for craftsmanship and style.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="relative overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white text-xs italic px-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      "{member.quote}"
                    </p>
                  </div>
                </div>
                <h3 className="font-bold text-base tracking-wide">{member.name}</h3>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-yellow-500 text-xs uppercase tracking-[0.3em] font-semibold mb-3">How We Work</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">From Concept to Closet</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gray-200" />

          {[
            { step: "01", title: "Design", desc: "Our designers sketch hundreds of concepts, refining until perfection is achieved." },
            { step: "02", title: "Source", desc: "We travel the globe to source only the finest materials and fabrics." },
            { step: "03", title: "Craft", desc: "Master craftsmen bring each design to life with meticulous attention to detail." },
            { step: "04", title: "Deliver", desc: "Your order arrives beautifully packaged, ready to impress from first glance." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-black tracking-widest z-10 relative">
                {item.step}
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1920&auto=format&fit=crop"
          alt="CTA Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-6"
          >
            Ready to Elevate<br />Your Style?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg font-light mb-10 max-w-xl mx-auto"
          >
            Discover our latest collection and experience the LUXE difference today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/shop"
              className="px-10 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/signup"
              className="px-10 py-4 border border-white text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Join LUXE
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
