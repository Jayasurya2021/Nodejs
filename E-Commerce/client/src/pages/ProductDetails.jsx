import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, clearProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiMinus, FiPlus, FiChevronRight, FiStar, FiCheck, FiShare2, FiX, FiChevronLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';
import { useInView } from 'react-intersection-observer';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Reviews & Related State
  const [reviews, setReviews] = useState([]);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewsTotalPages, setReviewsTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, title: '', comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  const { ref: galleryRef, inView: isGalleryInView } = useInView({
    threshold: 0,
    rootMargin: "-100px 0px 0px 0px"
  });

  const { product, isLoading, isError, message } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProductById(id));
    fetchRelatedProducts();
    return () => { dispatch(clearProduct()); };
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
      setActiveImageIndex(0);
      if (product.variants[0].sizes?.length > 0) {
        setSelectedSize(product.variants[0].sizes[0].name);
      }
    }
  }, [product]);

  // Reset active image index when variant changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedVariant]);

  useEffect(() => {
    fetchReviews();
  }, [id, reviewsPage, sortBy]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/product/${id}?page=${reviewsPage}&limit=5&sort=${sortBy}`);
      setReviews(data.reviews);
      setReviewsTotalPages(data.pages);
    } catch (error) {
      console.error('Failed to fetch reviews', error);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}/related`);
      setRelatedProducts(data);
    } catch (error) {
      console.error('Failed to fetch related products', error);
    }
  };

  const handleAddToCart = () => {
    if (!user || Object.keys(user).length === 0) return dispatch({ type: 'ui/openLoginModal' });
    
    const stockAvailable = selectedVariant ? selectedVariant.stock : (product.variants?.[0]?.stock || 0);
    if (stockAvailable === 0) { 
      toast.error('Out of stock'); 
      return; 
    }
    
    const priceToAdd = discountPrice;

    dispatch(addToCart({ 
      ...product, 
      price: priceToAdd,
      qty, 
      variant: selectedVariant,
      size: selectedSize,
      color: selectedVariant?.colorName
    }));
    toast.success('Added to bag! 🛍️');
    window.dispatchEvent(new CustomEvent('app-navigate', { detail: '/cart' }));
  };

  const toggleWishlist = async () => {
    if (!user || Object.keys(user).length === 0) {
      dispatch({ type: 'ui/openLoginModal' });
      return;
    }
    
    try {
      if (isWishlisted) {
        await axios.delete(`/api/users/wishlist/${id}`, { withCredentials: true });
        setIsWishlisted(false);
        toast.success('Removed from wishlist');
      } else {
        await axios.post(`/api/users/wishlist/${id}`, {}, { withCredentials: true });
        setIsWishlisted(true);
        toast.success('Added to wishlist! ❤️');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update wishlist');
    }
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if (!user || Object.keys(user).length === 0) {
      toast.error('Please login to submit a review');
      navigate('/login?redirect=/product/' + id);
      return;
    }
    
    setSubmittingReview(true);
    try {
      const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
      await axios.post('/api/reviews', {
        productId: id,
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.comment
      }, config);
      
      toast.success('Review submitted successfully!');
      setShowReviewModal(false);
      setNewReview({ rating: 5, title: '', comment: '' });
      fetchReviews();
      dispatch(getProductById(id)); // Refresh product to get updated ratingSummary
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  // Group variants by size and color for better UI
  const { sizes, colors } = useMemo(() => {
    if (!product?.variants) return { sizes: [], colors: [] };
    const s = [...new Set(product.variants.flatMap(v => v.sizes?.map(sizeObj => sizeObj.name) || []).filter(Boolean))];
    const c = product.variants.map((v, i) => ({
      id: v._id || i,
      name: v.colorName || '',
      swatch: v.swatchImage?.url || null,
      image: v.images?.[0]?.url || null,
      originalVariant: v
    }));
    return { sizes: s, colors: c };
  }, [product]);

  if (isLoading || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="animate-pulse flex flex-col md:flex-row gap-10 w-full">
          <div className="shimmer aspect-[3/4] w-full md:w-1/2" />
          <div className="flex flex-col gap-6 w-full md:w-1/2 mt-10">
            <div className="shimmer h-8 w-3/4" />
            <div className="shimmer h-4 w-1/4" />
            <div className="shimmer h-6 w-1/2" />
            <div className="shimmer h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) return <div className="text-center py-20 text-red-500">{message}</div>;

  const currentPrice = selectedVariant 
    ? (selectedVariant.price || 0)
    : (product.variants?.[0]?.price || 0);
  
  const discountPrice = product.discount > 0 
    ? currentPrice * (1 - product.discount / 100) 
    : currentPrice;

  const currentStock = selectedVariant ? selectedVariant.stock : (product.variants?.[0]?.stock || 0);
  const ratingSummary = product.ratingSummary || { averageRating: 0, totalReviews: 0, ratings: { 5:0, 4:0, 3:0, 2:0, 1:0 } };

  const displayImages = (selectedVariant?.images && selectedVariant.images.length > 0) 
    ? selectedVariant.images 
    : (product.images || []);

  const renderStickySidebar = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white border border-gray-100 p-5 rounded-xl shadow-lg"
    >
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={displayImages[0]?.url || product.thumbnail?.url || 'https://via.placeholder.com/150'}
          alt={product.title}
          className="h-20 w-16 object-cover rounded-md shadow-sm flex-shrink-0"
        />
        <div>
          <h2 className="text-sm font-black line-clamp-2">{product.title}</h2>
          <div className="text-lg font-black mt-1">₹{discountPrice.toFixed(2)}</div>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={currentStock === 0}
        className={`w-full h-10 text-xs uppercase font-black tracking-widest transition-all duration-300 ${
          currentStock > 0
            ? 'bg-black text-white hover:bg-gray-900 shadow-md'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {currentStock > 0 ? 'Add to Bag' : 'Out of Stock'}
      </button>
    </motion.div>
  );

  const renderTopicBox = () => (
    <motion.div layoutId="product-topic" className="bg-white">
      <div className="flex items-center justify-between mb-2">
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
      </div>

      <div className="mb-4">
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight">{product.title}</h1>
      </div>
      
      <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.shortDescription}</p>

      {/* Rating Summary */}
      <div className="flex items-center gap-3 mb-5">
        <StarRating rating={Math.round(ratingSummary.averageRating)} size={16} />
        <span className="text-sm font-semibold">{ratingSummary.averageRating.toFixed(1)}</span>
        <a href="#reviews" className="text-sm text-gray-400 hover:text-black transition-colors underline underline-offset-2">
          ({ratingSummary.totalReviews} reviews)
        </a>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4 mb-7 pb-7 border-b border-gray-100">
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
      </div>

      {/* Color Selection */}
      {colors.length > 0 && (
        <div className="mb-7">
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
        </div>
      )}

      {/* Size Selection */}
      {sizes.length > 0 && (
        <div className="mb-8">
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
        </div>
      )}

      {/* Qty & Actions */}
      <div className="flex gap-3 mb-6">
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
      </div>

      {/* Stock indicator */}
      {currentStock > 0 && currentStock <= 5 ? (
        <div className="flex items-center gap-2 mb-4 text-amber-600">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold">Only {currentStock} left in stock!</span>
        </div>
      ) : currentStock === 0 && (
        <div className="flex items-center gap-2 mb-4 text-red-600">
          <FiX size={14} />
          <span className="text-xs font-semibold">Currently Unavailable</span>
        </div>
      )}

      {/* Delivery Info */}
      <div className="bg-gray-50 p-4 space-y-3 mb-6 mt-4">
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
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Breadcrumbs */}
      <div className="flex items-center text-xs text-gray-400 uppercase tracking-widest mb-10 gap-2">
        <span className="cursor-pointer hover:text-black transition-colors" onClick={() => navigate('/')}>Home</span>
        <FiChevronRight size={12} />
        <span className="cursor-pointer hover:text-black transition-colors" onClick={() => navigate('/shop')}>Shop</span>
        <FiChevronRight size={12} />
        <span className="cursor-pointer hover:text-black transition-colors" onClick={() => navigate(`/shop?category=${product.category}`)}>{product.category}</span>
        <FiChevronRight size={12} />
        <span className="text-black font-semibold truncate max-w-[200px]">{product.title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 relative">
        {/* ─── LEFT COLUMN ─────────────────────────────────────────── */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div ref={galleryRef}>
            <div 
              className="aspect-[3/4] bg-gray-100 overflow-hidden relative group cursor-zoom-in"
            onClick={() => setIsZoomed(!isZoomed)}
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
                className={`w-full h-full object-cover transition-transform duration-500 origin-center ${isZoomed ? 'hover:scale-150 cursor-zoom-out' : ''}`}
              />
            </AnimatePresence>
            
            {/* Image navigation arrows */}
            {displayImages.length > 1 && !isZoomed && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => Math.max(0, prev - 1)); }}
                  disabled={activeImageIndex === 0}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                >
                  <FiChevronRight className="rotate-180" size={18} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => Math.min(displayImages.length - 1, prev + 1)); }}
                  disabled={activeImageIndex === displayImages.length - 1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                >
                  <FiChevronRight size={18} />
                </button>
              </>
            )}
          </div>
          
          {displayImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-1 mt-4">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-28 border-2 transition-all duration-200 ${activeImageIndex === index ? 'border-black' : 'border-transparent opacity-50 hover:opacity-80'}`}
                >
                  <img src={image.url} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          </div>
          
          {/* Animated Sticky Sidebar (Desktop) */}
          <div className="hidden md:block sticky top-24 z-10 pt-8">
            <AnimatePresence>
              {!isGalleryInView && renderStickySidebar()}
            </AnimatePresence>
          </div>
        </div>

        {/* ─── RIGHT COLUMN ───────────────────────────────────────────── */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="block md:hidden">
            {renderTopicBox()}
          </div>
          <div className="hidden md:block">
             {renderTopicBox()}
          </div>

          {/* Description & Specs */}
          <div className="border-t border-gray-100 pt-6 mt-6 md:mt-0">
            <h3 className="text-xs font-black uppercase tracking-widest mb-3">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-line">{product.description}</p>

            {product.features?.length > 0 && (
              <>
                <h3 className="text-xs font-black uppercase tracking-widest mb-3">Features</h3>
                <ul className="space-y-2 text-sm text-gray-500 mb-6 pl-4 list-disc">
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </>
            )}

            {product.specifications?.length > 0 && (
              <>
                <h3 className="text-xs font-black uppercase tracking-widest mb-3">Specifications</h3>
                <div className="text-sm">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className={`flex py-2 px-3 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <span className="w-1/3 font-semibold text-gray-700">{spec.key}</span>
                      <span className="w-2/3 text-gray-500">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ─── REVIEWS SECTION ───────────────────────────────────────────── */}
          <section id="reviews" className="mt-16 border-t border-gray-100 pt-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <p className="text-yellow-500 text-xs uppercase tracking-[0.3em] font-semibold mb-2">Customer Feedback</p>
                <h2 className="text-3xl font-black tracking-tight">Reviews &amp; Ratings</h2>
              </div>
              <button
                onClick={() => setShowReviewModal(true)}
                className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors self-start md:self-auto"
              >
                Write a Review
              </button>
            </div>

            {/* Rating Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="flex flex-col items-center justify-center bg-gray-50 p-8 text-center">
                <div className="text-7xl font-black text-black mb-3">{ratingSummary.averageRating.toFixed(1)}</div>
                <StarRating rating={Math.round(ratingSummary.averageRating)} size={22} />
                <p className="text-gray-500 text-sm mt-3">Based on {ratingSummary.totalReviews} reviews</p>
              </div>

              <div className="md:col-span-2 space-y-3 flex flex-col justify-center">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratingSummary.ratings?.[star] || 0;
                  const percentage = ratingSummary.totalReviews === 0 ? 0 : (count / ratingSummary.totalReviews) * 100;
                  return (
                    <div key={star} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-14 flex-shrink-0">
                        <span className="text-sm font-semibold">{star}</span>
                        <FiStar size={12} className="text-amber-400 fill-amber-400" />
                      </div>
                      <div className="flex-1 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-amber-400 rounded-full"
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-12 flex-shrink-0">{count} ({Math.round(percentage)}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sort & List */}
            {ratingSummary.totalReviews > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                  <p className="text-sm text-gray-500">{ratingSummary.totalReviews} reviews</p>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border-none bg-transparent font-semibold focus:outline-none cursor-pointer uppercase tracking-wide"
                  >
                    <option value="newest">Newest First</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                  </select>
                </div>

                <div className="space-y-6">
                  {reviews.map((review, i) => (
                    <motion.div
                      key={review._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white border border-gray-100 p-6 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <StarRating rating={review.rating} size={14} />
                            <span className="text-xs text-gray-400 ml-auto">
                              {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                          </div>
                          <h4 className="font-black text-sm mb-2">{review.title}</h4>
                          <p className="text-gray-500 text-sm leading-relaxed mb-3">{review.comment}</p>
                          
                          {review.images?.length > 0 && (
                            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                              {review.images.map((img, index) => (
                                <img key={index} src={img.url} alt="Review" className="w-16 h-16 object-cover bg-gray-100" />
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 pt-4 border-t border-gray-50 text-xs">
                            <span className="font-bold">{review.user?.name || review.name}</span>
                            {review.verified && <span className="text-green-600 font-bold uppercase tracking-widest flex items-center gap-1"><FiCheck size={10}/> Verified</span>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Reviews Pagination */}
                {reviewsTotalPages > 1 && (
                  <div className="flex justify-center mt-10 gap-2">
                    <button 
                      onClick={() => setReviewsPage(p => Math.max(1, p - 1))}
                      disabled={reviewsPage === 1}
                      className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black disabled:opacity-30 disabled:hover:border-gray-200"
                    >
                      <FiChevronLeft />
                    </button>
                    <div className="flex items-center justify-center px-4 text-sm font-semibold">
                      Page {reviewsPage} of {reviewsTotalPages}
                    </div>
                    <button 
                      onClick={() => setReviewsPage(p => Math.min(reviewsTotalPages, p + 1))}
                      disabled={reviewsPage === reviewsTotalPages}
                      className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black disabled:opacity-30 disabled:hover:border-gray-200"
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-200">
                <FiStar size={32} className="mx-auto text-gray-300 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">No reviews yet</h3>
                <p className="text-sm text-gray-500 mb-6">Be the first to review this product!</p>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="px-6 py-3 bg-white border-2 border-black text-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                >
                  Write a Review
                </button>
              </div>
            )}
          </section>

        </div>
      </div>

      {/* ─── RELATED PRODUCTS ─────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 border-t border-gray-100 pt-16">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-yellow-500 text-xs uppercase tracking-[0.3em] font-semibold mb-2">You might like</p>
              <h2 className="text-3xl font-black tracking-tight">Related Products</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.slice(0,4).map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        </section>
      )}


      {/* ─── Write Review Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showReviewModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowReviewModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white w-full max-w-lg p-8 relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX size={18} />
                </button>

                <h3 className="text-xl font-black uppercase tracking-widest mb-6">Write a Review</h3>
                <form className="space-y-5" onSubmit={submitReviewHandler}>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Your Rating</label>
                    <StarRating rating={newReview.rating} size={28} interactive onRate={(r) => setNewReview((p) => ({ ...p, rating: r }))} />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Review Title</label>
                    <input
                      type="text" required
                      value={newReview.title}
                      onChange={(e) => setNewReview((p) => ({ ...p, title: e.target.value }))}
                      placeholder="Summarize your experience"
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Your Review</label>
                    <textarea
                      required rows={4}
                      value={newReview.comment}
                      onChange={(e) => setNewReview((p) => ({ ...p, comment: e.target.value }))}
                      placeholder="Share your experience with this product..."
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="w-full py-4 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-50"
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetails;
