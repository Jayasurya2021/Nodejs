import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { FiHeart, FiMinus, FiPlus, FiShare2, FiX, FiChevronRight, FiCheck } from 'react-icons/fi';
import StarRating from './StarRating';

const springConfig = { type: "spring", stiffness: 300, damping: 30 };
const springHover = { type: "spring", stiffness: 400, damping: 25 };

const ProductScrollHero = ({ product, state, children }) => {
  const {
    qty, setQty,
    selectedVariant, setSelectedVariant,
    selectedSize, setSelectedSize,
    isWishlisted, toggleWishlist,
    handleAddToCart,
    colors, sizes, displayImages,
    sellingPrice, originalPrice, discountPercent, currentStock, ratingSummary,
    activeImageIndex, setActiveImageIndex,
    isZoomed, setIsZoomed
  } = state;

  const containerRef = useRef(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [showStickyBar, setShowStickyBar] = useState(false);
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 650 && !showStickyBar) setShowStickyBar(true);
    else if (latest <= 650 && showStickyBar) setShowStickyBar(false);
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: springConfig }
  };

  const purchaseBoxContent = (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white pb-8"
    >
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-semibold">{product.brand}</p>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            <FiHeart size={18} className={isWishlisted ? 'fill-red-400' : ''} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <FiShare2 size={18} />
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mb-4">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-gray-900 leading-tight">{product.title}</h1>
      </motion.div>
      
      <motion.p variants={fadeUp} className="text-gray-500 text-base mb-6 leading-relaxed max-w-lg">{product.shortDescription}</motion.p>

      {/* Rating Summary */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
        <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full gap-2">
          <StarRating rating={Math.round(ratingSummary.averageRating)} size={14} />
          <span className="text-sm font-bold text-gray-900">{ratingSummary.averageRating.toFixed(1)}</span>
        </div>
        <a href="#reviews" className="text-sm text-gray-500 hover:text-black transition-colors underline decoration-gray-300 underline-offset-4 hover:decoration-black">
          See all {ratingSummary.totalReviews} reviews
        </a>
      </motion.div>

      {/* Price */}
      <motion.div variants={fadeUp} className="flex items-end gap-4 mb-8 pb-8 border-b border-gray-100">
        <span className="text-4xl font-black text-gray-900">
          ₹{sellingPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </span>
        {discountPercent > 0 && (
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xl text-gray-400 line-through font-medium">₹{originalPrice.toLocaleString('en-IN')}</span>
            <span className="text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-black tracking-widest uppercase">
              {discountPercent}% OFF
            </span>
          </div>
        )}
      </motion.div>

      {/* Color Selection */}
      {colors.length > 0 && (
        <motion.div variants={fadeUp} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Color</span>
            <span className="text-sm text-gray-500 font-medium">{selectedVariant?.colorName}</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {colors.map((color, index) => {
              const isSelected = selectedVariant === color.originalVariant;
              return (
                <motion.button
                  key={index}
                  whileHover={!isSelected ? { scale: 1.1 } : {}}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedVariant(color.originalVariant)}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${isSelected ? 'ring-2 ring-offset-2 ring-black' : 'ring-1 ring-gray-200 hover:ring-gray-300'}`}
                  title={color.name || 'Variant'}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    {color.swatch ? (
                      <img src={color.swatch} alt={color.name || 'Swatch'} className="w-full h-full object-cover" />
                    ) : color.image ? (
                      <img src={color.image} alt={color.name || 'Variant'} className="w-full h-full object-cover" />
                    ) : (
                      <span className="w-full h-full bg-gray-200 block"></span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Size Selection */}
      {sizes.length > 0 && (
        <motion.div variants={fadeUp} className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Size</span>
            <button className="text-xs text-gray-500 hover:text-black underline underline-offset-4 decoration-gray-300 hover:decoration-black transition-all">
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {sizes.map((size) => {
              const isAvailable = product.variants.some(v => v.sizes?.some(s => s.name === size && s.stock > 0) && v.colorName === selectedVariant?.colorName);
              const isSelected = selectedSize === size;
              return (
                <motion.button
                  key={size}
                  whileHover={isAvailable && !isSelected ? { y: -2 } : {}}
                  whileTap={isAvailable ? { scale: 0.95 } : {}}
                  disabled={!isAvailable}
                  onClick={() => {
                    const variant = product.variants.find(v => v.sizes?.some(s => s.name === size) && v.colorName === selectedVariant?.colorName);
                    if(variant) setSelectedVariant(variant);
                    setSelectedSize(size);
                  }}
                  className={`h-12 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300 ${
                    isSelected
                      ? 'bg-black text-white shadow-lg ring-2 ring-black ring-offset-1'
                      : isAvailable 
                        ? 'bg-gray-50 text-gray-900 hover:bg-gray-100 hover:shadow-sm' 
                        : 'bg-gray-50 text-gray-300 cursor-not-allowed opacity-60 diagonal-strike'
                  }`}
                >
                  {size}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Qty & Actions */}
      <motion.div variants={fadeUp} className="flex gap-4 mb-6">
        <div className="flex items-center bg-gray-50 rounded-lg p-1 w-32 h-14">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setQty((prev) => Math.max(1, prev - 1))}
            className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all"
          >
            <FiMinus size={16} />
          </motion.button>
          <div className="flex-1 text-center font-black text-lg">{qty}</div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setQty((prev) => (prev < currentStock ? prev + 1 : prev))}
            className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all"
          >
            <FiPlus size={16} />
          </motion.button>
        </div>

        <motion.button
          whileHover={currentStock > 0 ? { y: -2, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
          whileTap={currentStock > 0 ? { scale: 0.98, y: 0 } : {}}
          onClick={handleAddToCart}
          disabled={currentStock === 0}
          className={`flex-1 h-14 rounded-lg text-sm uppercase font-black tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 ${
            currentStock > 0
              ? 'bg-black text-white hover:bg-gray-900 shadow-xl'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentStock > 0 ? 'Add to Bag' : 'Out of Stock'}
        </motion.button>
      </motion.div>

      {/* Stock indicator */}
      <AnimatePresence mode="wait">
        {currentStock > 0 && currentStock <= 5 ? (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 mb-6 text-amber-600 bg-amber-50 p-3 rounded-lg"
          >
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
            <span className="text-sm font-bold">Hurry! Only {currentStock} left in stock.</span>
          </motion.div>
        ) : currentStock === 0 ? (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 mb-6 text-red-600 bg-red-50 p-3 rounded-lg"
          >
            <FiX size={16} />
            <span className="text-sm font-bold">Currently Unavailable</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Delivery Info */}
      <motion.div variants={fadeUp} className="bg-gray-50 rounded-xl p-5 space-y-4 mt-6">
        {[
          { icon: FiCheck, text: "Free express delivery on orders over ₹100", color: "text-green-500" },
          { 
            icon: (!product.returnPolicy || product.returnPolicy === 'No Returns') ? FiX : FiCheck, 
            text: (!product.returnPolicy || product.returnPolicy === 'No Returns') ? "No returns available for this product" : `${product.returnPolicy} & easy exchanges`,
            color: (!product.returnPolicy || product.returnPolicy === 'No Returns') ? "text-gray-400" : "text-gray-900"
          },
          { icon: FiCheck, text: "100% Authenticity guaranteed", color: "text-green-500" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.color === 'text-green-500' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
              <item.icon size={12} strokeWidth={4} />
            </div>
            <span className={`text-sm font-medium ${item.color === 'text-gray-400' ? 'text-gray-500 line-through decoration-gray-300' : 'text-gray-700'}`}>{item.text}</span>
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
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={springConfig}
            className="fixed top-0 left-0 right-0 h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm z-50 flex items-center justify-between px-6 lg:px-12"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-16 rounded-md overflow-hidden bg-gray-50 flex-shrink-0">
                <img 
                  src={displayImages[activeImageIndex]?.url || product.thumbnail?.url} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <h3 className="text-base font-black text-gray-900 truncate max-w-[250px] lg:max-w-[400px] mb-1">{product.title}</h3>
                <p className="text-xs text-gray-500 font-medium">
                  {selectedVariant?.colorName || ''} {selectedSize ? `• Size: ${selectedSize}` : ''}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-right hidden md:block">
                <p className="text-sm text-gray-500 font-medium line-through">₹{originalPrice.toLocaleString('en-IN')}</p>
                <p className="text-xl font-black text-gray-900">₹{sellingPrice.toLocaleString('en-IN')}</p>
              </div>
              <motion.button
                whileHover={currentStock > 0 ? { scale: 1.05 } : {}}
                whileTap={currentStock > 0 ? { scale: 0.95 } : {}}
                onClick={handleAddToCart}
                disabled={currentStock === 0}
                className={`px-8 py-4 rounded-lg text-xs uppercase font-black tracking-widest transition-colors ${
                  currentStock > 0
                    ? 'bg-black text-white hover:bg-gray-900 shadow-xl shadow-black/10'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentStock > 0 ? 'Add to Bag' : 'Out of Stock'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── DESKTOP (STICKY LAYOUT) ─── */}
      <div className="hidden md:flex flex-row gap-16 lg:gap-24 w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-0">
        
        {/* Left Column (stretches to full height) */}
        <div className="w-[50%] lg:w-[55%] relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-32 flex flex-col gap-4 p-4 lg:p-0"
          >
            {/* Main Image */}
            <motion.div 
              className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden bg-gray-50 shadow-sm"
              style={{ scale: imageScale, y: imageY }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  src={displayImages[activeImageIndex]?.url || product.thumbnail?.url || 'https://via.placeholder.com/800x1000'}
                  alt={product.title}
                  className={`w-full h-full object-cover transition-transform duration-700 origin-center ${isZoomed ? 'hover:scale-150 cursor-zoom-out' : 'cursor-zoom-in hover:scale-105'}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
              </AnimatePresence>
            </motion.div>

            {/* Thumbnails */}
            {displayImages.length > 1 && !isZoomed && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ...springConfig }}
                className="flex gap-4 overflow-x-auto py-2 no-scrollbar px-2 -mx-2"
              >
                {displayImages.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                      idx === activeImageIndex 
                        ? 'ring-2 ring-black ring-offset-2 opacity-100' 
                        : 'opacity-50 hover:opacity-100 hover:ring-1 hover:ring-gray-300'
                    }`}
                  >
                    <img src={image.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Scrollable Content */}
        <div className="w-[50%] lg:w-[45%] flex flex-col pt-4 pb-40 relative z-10">
           {purchaseBoxContent}
           <div className="mt-8">
              {children}
           </div>
        </div>
      </div>

      {/* ─── MOBILE (STACKED FALLBACK) ─── */}
      <div className="block md:hidden w-full">
        <div className="w-full aspect-[4/5] bg-gray-50 overflow-hidden relative mb-6">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={displayImages[activeImageIndex]?.url || product.thumbnail?.url || 'https://via.placeholder.com/800x1000'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          
          {/* Mobile Gallery Indicators */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {displayImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeImageIndex ? 'w-6 bg-black' : 'w-1.5 bg-black/30'}`} 
                />
              ))}
            </div>
          )}

          {/* Swipe areas for mobile */}
          {displayImages.length > 1 && (
             <>
               <div 
                 className="absolute top-0 bottom-0 left-0 w-1/4 z-0" 
                 onClick={() => setActiveImageIndex(prev => Math.max(0, prev - 1))}
               />
               <div 
                 className="absolute top-0 bottom-0 right-0 w-1/4 z-0" 
                 onClick={() => setActiveImageIndex(prev => Math.min(displayImages.length - 1, prev + 1))}
               />
             </>
          )}
        </div>
        <div className="px-5 sm:px-8 max-w-lg mx-auto">
          {purchaseBoxContent}
          <div className="mt-10 border-t border-gray-100 pt-8 pb-20">
             {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScrollHero;

