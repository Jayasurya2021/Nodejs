import React, { useRef } from 'react';
import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { FiHeart, FiMinus, FiPlus, FiStar, FiCheck, FiShare2, FiX, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import StarRating from './StarRating';

const ProductScrollHero = ({ product, state, children }) => {
  const {
    qty, setQty,
    selectedVariant, setSelectedVariant,
    selectedSize, setSelectedSize,
    isWishlisted, toggleWishlist,
    handleAddToCart,
    colors, sizes, displayImages,
    currentPrice, discountPrice, currentStock, ratingSummary,
    activeImageIndex, setActiveImageIndex,
    isZoomed, setIsZoomed
  } = state;

  // Container ref for the entire section to track scroll progress
  const containerRef = useRef(null);

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [showStickyBar, setShowStickyBar] = useState(false);
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show the sticky bar once the user scrolls past approx the purchase box (e.g. 600px down)
    if (latest > 650 && !showStickyBar) {
      setShowStickyBar(true);
    } else if (latest <= 650 && showStickyBar) {
      setShowStickyBar(false);
    }
  });

  // Scale the image slightly down (1 to 0.85) and add a parallax translate effect
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  // Variants for staggered fade-in animations on the right side
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const PurchaseBox = () => (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white pb-8"
    >
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold">{product.brand}</p>
        <div className="flex gap-2">
          <button
            onClick={toggleWishlist}
            className={`w-9 h-9 border flex items-center justify-center transition-all duration-300 ${isWishlisted ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-200 hover:border-black'}`}
          >
            <FiHeart size={16} className={isWishlisted ? 'fill-red-400' : ''} />
          </button>
          <button className="w-9 h-9 border border-gray-200 flex items-center justify-center hover:border-black transition-colors">
            <FiShare2 size={16} />
          </button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mb-4">
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight">{product.title}</h1>
      </motion.div>
      
      <motion.p variants={fadeUp} className="text-gray-500 text-sm mb-4 leading-relaxed">{product.shortDescription}</motion.p>

      {/* Rating Summary */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
        <StarRating rating={Math.round(ratingSummary.averageRating)} size={16} />
        <span className="text-sm font-semibold">{ratingSummary.averageRating.toFixed(1)}</span>
        <a href="#reviews" className="text-sm text-gray-400 hover:text-black transition-colors underline underline-offset-2">
          ({ratingSummary.totalReviews} reviews)
        </a>
      </motion.div>

      {/* Price */}
      <motion.div variants={fadeUp} className="flex items-center gap-4 mb-7 pb-7 border-b border-gray-100">
        <span className="text-3xl font-black">
          ₹{discountPrice.toFixed(2)}
        </span>
        {product.discount > 0 && (
          <>
            <span className="text-lg text-gray-400 line-through">₹{currentPrice.toFixed(2)}</span>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 font-black tracking-widest uppercase">
              -{product.discount}% OFF
            </span>
          </>
        )}
      </motion.div>

      {/* Color Selection */}
      {colors.length > 0 && (
        <motion.div variants={fadeUp} className="mb-7">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-widest">Color</span>
            <span className="text-xs text-gray-500 font-medium">{selectedVariant?.colorName}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(color.originalVariant)}
                className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-all duration-200 flex items-center justify-center ${selectedVariant === color.originalVariant ? 'border-black scale-110 shadow-lg' : 'border-gray-200 hover:border-gray-400'}`}
                title={color.name || 'Variant'}
              >
                {color.swatch ? (
                  <img src={color.swatch} alt={color.name || 'Swatch'} className="w-full h-full object-cover" />
                ) : color.image ? (
                  <img src={color.image} alt={color.name || 'Variant'} className="w-full h-full object-cover" />
                ) : (
                  <span className="w-full h-full bg-gray-200"></span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Size Selection */}
      {sizes.length > 0 && (
        <motion.div variants={fadeUp} className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-widest">Size</span>
            <button className="text-xs border-b border-gray-400 text-gray-500 hover:text-black hover:border-black transition-colors pb-0.5">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const isAvailable = product.variants.some(v => v.sizes?.some(s => s.name === size && s.stock > 0) && v.colorName === selectedVariant?.colorName);
              
              return (
              <button
                key={size}
                disabled={!isAvailable}
                onClick={() => {
                  const variant = product.variants.find(v => v.sizes?.some(s => s.name === size) && v.colorName === selectedVariant?.colorName);
                  if(variant) setSelectedVariant(variant);
                  setSelectedSize(size);
                }}
                className={`w-14 h-11 flex items-center justify-center border text-sm font-semibold transition-all duration-200 ${
                  selectedSize === size
                    ? 'bg-black text-white border-black shadow-lg scale-105'
                    : isAvailable 
                      ? 'bg-white text-black border-gray-200 hover:border-black' 
                      : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                }`}
              >
                {size}
              </button>
            )})}
          </div>
        </motion.div>
      )}

      {/* Qty & Actions */}
      <motion.div variants={fadeUp} className="flex gap-3 mb-6">
        <div className="flex items-center border border-gray-200 w-32">
          <button
            onClick={() => setQty((prev) => Math.max(1, prev - 1))}
            className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <FiMinus size={14} />
          </button>
          <div className="flex-1 text-center font-bold">{qty}</div>
          <button
            onClick={() => setQty((prev) => (prev < currentStock ? prev + 1 : prev))}
            className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <FiPlus size={14} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={currentStock === 0}
          className={`flex-1 h-12 text-sm uppercase font-black tracking-widest transition-all duration-300 active:scale-[0.97] ${
            currentStock > 0
              ? 'bg-black text-white hover:bg-gray-900 shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentStock > 0 ? 'Add to Bag' : 'Out of Stock'}
        </button>
      </motion.div>

      {/* Stock indicator */}
      {currentStock > 0 && currentStock <= 5 ? (
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4 text-amber-600">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold">Only {currentStock} left in stock!</span>
        </motion.div>
      ) : currentStock === 0 && (
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4 text-red-600">
          <FiX size={14} />
          <span className="text-xs font-semibold">Currently Unavailable</span>
        </motion.div>
      )}

      {/* Delivery Info */}
      <motion.div variants={fadeUp} className="bg-gray-50 p-4 space-y-3 mb-6 mt-4">
        {[
          { icon: FiCheck, text: "Free delivery on orders over ₹100" },
          { icon: FiCheck, text: "Easy 30-day returns & exchanges" },
          { icon: FiCheck, text: "Authenticity guaranteed" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
            <item.icon size={14} className="text-green-500 flex-shrink-0" strokeWidth={3} />
            <span>{item.text}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );

  return (
    <div ref={containerRef} className="w-full relative">
      
      {/* ─── STICKY BUY BAR (TOP) ─── */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 h-20 bg-white shadow-md z-50 flex items-center justify-between px-6 lg:px-12"
          >
            <div className="flex items-center gap-4">
              <img 
                src={displayImages[activeImageIndex]?.url || product.thumbnail?.url} 
                alt={product.title} 
                className="w-12 h-16 object-cover rounded-sm"
              />
              <div className="hidden sm:block">
                <h3 className="text-sm font-bold truncate max-w-[250px] lg:max-w-[400px]">{product.title}</h3>
                <p className="text-xs text-gray-500">{selectedVariant?.colorName || ''} {selectedSize ? `| Size: ${selectedSize}` : ''}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="font-black">₹{discountPrice.toFixed(2)}</span>
              <button
                onClick={handleAddToCart}
                disabled={currentStock === 0}
                className={`px-6 py-3 text-xs uppercase font-black tracking-widest transition-all duration-300 ${
                  currentStock > 0
                    ? 'bg-black text-white hover:bg-gray-900 shadow-md'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentStock > 0 ? 'Add to Bag' : 'Out of Stock'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── DESKTOP (STICKY LAYOUT) ─── */}
      <div className="hidden md:flex flex-row gap-12 lg:gap-20 w-full relative z-0">
        
        {/* Left Column (stretches to full height) */}
        <div className="w-[55%] relative">
          {/* Sticky Inner Container */}
          <div className="sticky top-24 h-[calc(100vh-6rem)] flex items-center justify-center p-8 lg:p-12">
          {/* We reduce the max-width to create the "20-30% reduction with whitespace" effect */}
          <motion.div 
            className="w-full max-w-[75%] aspect-[3/4] relative group rounded-lg overflow-hidden shadow-2xl"
            style={{ scale: imageScale, y: imageY }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                src={displayImages[activeImageIndex]?.url || product.thumbnail?.url || 'https://via.placeholder.com/600x800'}
                alt={product.title}
                className={`w-full h-full object-cover transition-transform duration-500 origin-center ${isZoomed ? 'hover:scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </AnimatePresence>
            
            {/* Gallery Controls */}
            {displayImages.length > 1 && !isZoomed && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => Math.max(0, prev - 1)); }}
                  disabled={activeImageIndex === 0}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                >
                  <FiChevronRight className="rotate-180" size={18} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => Math.min(displayImages.length - 1, prev + 1)); }}
                  disabled={activeImageIndex === displayImages.length - 1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                >
                  <FiChevronRight size={18} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {displayImages.map((_, idx) => (
                    <div key={idx} className={`w-2 h-2 rounded-full transition-colors ${idx === activeImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Right Column - Scrollable Content */}
        <div className="w-[45%] flex flex-col pt-4 pb-32 relative z-10">
           <PurchaseBox />
           <div className="mt-8 border-t border-gray-100 pt-8">
              {children}
           </div>
        </div>
      </div>

      {/* ─── MOBILE (STACKED FALLBACK) ─── */}
      <div className="block md:hidden w-full">
        <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden relative mb-6">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={displayImages[activeImageIndex]?.url || product.thumbnail?.url || 'https://via.placeholder.com/600x800'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          {displayImages.length > 1 && (
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 overflow-x-auto no-scrollbar bg-white/80 p-2 rounded-lg backdrop-blur-sm max-w-[90%]">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-12 h-16 border-2 transition-all duration-200 ${activeImageIndex === index ? 'border-black' : 'border-transparent opacity-50 hover:opacity-80'}`}
                  >
                    <img src={image.url} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
             </div>
          )}
        </div>
        <PurchaseBox />
        <div className="mt-10 border-t border-gray-100 pt-6">
           {children}
        </div>
      </div>
    </div>
  );
};

export default ProductScrollHero;
