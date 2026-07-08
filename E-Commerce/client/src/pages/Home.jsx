import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <motion.div
      initial="page-enter"
      animate="page-enter-active"
      exit="page-exit-active"
      className="w-full"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1920&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-top scale-105"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            THE NEW ESSENTIALS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl font-light"
          >
            Discover our latest collection of premium menswear. Designed for comfort, tailored for perfection.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              to="/shop" 
              className="px-10 py-4 bg-white text-black text-sm uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors duration-300"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories Placeholder */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest">Featured Categories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Category Card 1 */}
          <div className="group relative h-[500px] overflow-hidden cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" 
              alt="Outerwear" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-2xl font-bold tracking-widest mb-2">OUTERWEAR</h3>
              <span className="text-sm border-b border-white pb-1 group-hover:pl-4 transition-all duration-300">Shop Now</span>
            </div>
          </div>
          
          {/* Category Card 2 */}
          <div className="group relative h-[500px] overflow-hidden cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop" 
              alt="Shirts" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-2xl font-bold tracking-widest mb-2">SHIRTS</h3>
              <span className="text-sm border-b border-white pb-1 group-hover:pl-4 transition-all duration-300">Shop Now</span>
            </div>
          </div>

          {/* Category Card 3 */}
          <div className="group relative h-[500px] overflow-hidden cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop" 
              alt="Denim" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-2xl font-bold tracking-widest mb-2">DENIM</h3>
              <span className="text-sm border-b border-white pb-1 group-hover:pl-4 transition-all duration-300">Shop Now</span>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for New Arrivals Slider */}
      <section className="py-24 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest">New Arrivals</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
           Product Slider component will be rendered here.
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
