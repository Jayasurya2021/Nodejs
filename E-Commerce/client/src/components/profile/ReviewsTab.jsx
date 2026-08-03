import { useState, useEffect } from 'react';
import { Star, Edit3, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const ReviewsTab = () => {
  const [reviews, setReviews] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviewData = async () => {
    try {
      const [mineRes, pendingRes] = await Promise.all([
        axios.get('/api/reviews/mine', { withCredentials: true }),
        axios.get('/api/reviews/pending', { withCredentials: true })
      ]);
      setReviews(mineRes.data);
      setPendingReviews(pendingRes.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load reviews data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewData();
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={14} 
            className={star <= rating ? 'fill-black text-black' : 'text-gray-200'} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-wide">My Reviews</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your product reviews and ratings</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {reviews.length === 0 ? (
          <div className="p-12 text-center">
            <Star size={40} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-lg font-bold mb-2">No Reviews Yet</h3>
            <p className="text-gray-500">You haven't reviewed any products.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {reviews.map((review) => (
              <div key={review._id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-gray-50 transition-colors">
                <div className="w-20 h-20 flex-shrink-0 border border-gray-200 rounded-md overflow-hidden bg-white">
                  <img src={review.product?.images?.[0]?.url || 'https://placehold.co/100x100'} alt={review.product?.title || 'Product'} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Link to={`/product/${review.product?._id}`} className="font-bold text-sm hover:underline line-clamp-1">
                        {review.product?.title || 'Unknown Product'}
                      </Link>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Reviewed on {new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                    "{review.comment}"
                  </p>
                  
                  <div className="mt-4 flex gap-4">
                    <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
                      <Edit3 size={12} /> Edit
                    </button>
                    <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-red-600 transition-colors">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div className="bg-amber-50 rounded-xl border border-amber-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold tracking-wide mb-4 text-amber-800">Pending Reviews ({pendingReviews.length})</h3>
          <div className="space-y-4">
            {pendingReviews.map((item) => (
              <div key={item.product._id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-amber-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                    <img src={item.product.images?.[0]?.url || 'https://placehold.co/50x50'} alt={item.product.title || 'Product'} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{item.product.title || 'Unknown Product'}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                      Delivered {formatDistanceToNow(new Date(item.deliveredAt))} ago
                    </p>
                  </div>
                </div>
                <button className="bg-white border border-black text-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded hover:bg-black hover:text-white transition-colors">
                  Write Review
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
