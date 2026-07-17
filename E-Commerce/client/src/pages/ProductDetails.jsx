import { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, clearProduct } from '../redux/slices/productSlice';
import { addToCartAndSync } from '../redux/slices/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiMinus, FiPlus, FiChevronRight, FiStar, FiCheck, FiShare2, FiX, FiChevronLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';
import ProductScrollHero from '../components/ProductScrollHero';

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full text-left">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">{title}</h3>
        <div className="text-gray-400">
          {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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
    
    const priceToAdd = sellingPrice;

    dispatch(addToCartAndSync({ 
      ...product, 
      price: priceToAdd,
      qty, 
      selectedVariant,
      selectedSize,
      color: selectedVariant?.colorName
    }));
    toast.success('Added to bag! 🛍️');
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

  const sellingPrice = selectedVariant 
    ? (selectedVariant.price || 0)
    : (product.variants?.[0]?.price || 0);
  
  const originalPrice = selectedVariant
    ? (selectedVariant.originalPrice || sellingPrice)
    : (product.variants?.[0]?.originalPrice || sellingPrice);

  const discountPercent = originalPrice > sellingPrice 
    ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100) 
    : 0;

  const currentStock = selectedVariant ? selectedVariant.stock : (product.variants?.[0]?.stock || 0);
  const ratingSummary = product.ratingSummary || { averageRating: 0, totalReviews: 0, ratings: { 5:0, 4:0, 3:0, 2:0, 1:0 } };

  const displayImages = (selectedVariant?.images && selectedVariant.images.length > 0) 
    ? selectedVariant.images 
    : (product.images || []);

  const heroState = {
    qty, setQty,
    selectedVariant, setSelectedVariant,
    selectedSize, setSelectedSize,
    isWishlisted, toggleWishlist,
    handleAddToCart,
    colors, sizes, displayImages,
    sellingPrice, originalPrice, discountPercent, currentStock, ratingSummary,
    activeImageIndex, setActiveImageIndex,
    isZoomed, setIsZoomed
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>

      <ProductScrollHero product={product} state={heroState}>
        {/* Description & Specs Accordions */}
        <div className="pt-6">
          <Accordion title="Description" defaultOpen={false}>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{product.description}</p>
          </Accordion>

          {product.features?.length > 0 && (
            <Accordion title="Details & Features">
              <ul className="space-y-2 text-sm text-gray-600 pl-4 list-disc marker:text-gray-300">
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </Accordion>
          )}

          {product.specifications?.length > 0 && (
            <Accordion title="Specifications">
              <div className="text-sm border-t border-gray-100">
                {product.specifications.map((spec, i) => (
                  <div key={i} className="flex py-3 border-b border-gray-100">
                    <span className="w-1/3 font-semibold text-gray-900 uppercase text-xs tracking-widest">{spec.key}</span>
                    <span className="w-2/3 text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            </Accordion>
          )}
        </div>
      </ProductScrollHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ─── RELATED PRODUCTS ─────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-yellow-500 text-xs uppercase tracking-[0.3em] font-semibold mb-2">You might like</p>
              <h2 className="text-3xl font-black tracking-tight">Related Products</h2>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            {relatedProducts.map((prod) => (
              <div key={prod._id} className="w-[200px] sm:w-[220px] lg:w-[240px] flex-shrink-0 snap-start">
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        </section>
      )}

        {/* ─── REVIEWS SECTION ───────────────────────────────────────────── */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
          id="reviews" 
          className="mt-24 border-t border-gray-100 pt-16"
        >
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
        </motion.section>
      </div>


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
