import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, clearProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { motion } from 'framer-motion';
import { FiHeart, FiMinus, FiPlus, FiChevronRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProductById(id));
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      if (product.sizes?.length > 0) setSelectedSize(product.sizes[0]);
      if (product.colors?.length > 0) setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product.countInStock === 0) {
      toast.error('Out of stock');
      return;
    }
    dispatch(
      addToCart({
        ...product,
        qty,
        size: selectedSize,
        color: selectedColor?.name,
      })
    );
    toast.success('Added to bag');
    navigate('/cart');
  };

  if (isLoading || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-center">
        <div className="animate-pulse flex flex-col md:flex-row gap-10 w-full">
          <div className="bg-gray-200 aspect-[3/4] w-full md:w-1/2"></div>
          <div className="flex flex-col gap-6 w-full md:w-1/2 mt-10">
            <div className="h-8 bg-gray-200 w-3/4"></div>
            <div className="h-4 bg-gray-200 w-1/4"></div>
            <div className="h-6 bg-gray-200 w-1/2"></div>
            <div className="h-32 bg-gray-200 w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) return <div className="text-center py-20 text-red-500">{message}</div>;

  return (
    <motion.div
      initial="page-enter"
      animate="page-enter-active"
      exit="page-exit-active"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Breadcrumbs */}
      <div className="flex items-center text-xs text-gray-500 uppercase tracking-widest mb-10 gap-2">
        <span className="cursor-pointer hover:text-black" onClick={() => navigate('/')}>Home</span>
        <FiChevronRight />
        <span className="cursor-pointer hover:text-black" onClick={() => navigate('/shop')}>Shop</span>
        <FiChevronRight />
        <span className="text-black font-semibold">{product.category}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
            <motion.img
              key={activeImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={product.images[activeImageIndex]?.url || 'https://via.placeholder.com/600x800'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnail row */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-28 border-2 transition-colors ${
                    activeImageIndex === index ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={image.url} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.brand}</p>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-medium">
              ${(product.price * (1 - product.discount / 100)).toFixed(2)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">${product.price.toFixed(2)}</span>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-bold tracking-widest uppercase">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Color Selection */}
          {product.colors?.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold uppercase tracking-widest">Color</span>
                <span className="text-sm text-gray-500">{selectedColor?.name}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor?.name === color.name ? 'border-black scale-110' : 'border-transparent border-gray-200'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes?.length > 0 && (
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold uppercase tracking-widest">Size</span>
                <button className="text-xs border-b border-gray-400 text-gray-500 hover:text-black hover:border-black transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-12 flex items-center justify-center border text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-border hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="flex flex-col gap-4 mb-10">
            <div className="flex gap-4">
              <div className="flex items-center border border-border w-32">
                <button 
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <FiMinus size={16} />
                </button>
                <div className="flex-1 text-center font-medium">{qty}</div>
                <button 
                  onClick={() => setQty((prev) => (prev < product.countInStock ? prev + 1 : prev))}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <FiPlus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className={`flex-1 h-12 text-sm uppercase font-bold tracking-widest transition-colors ${
                  product.countInStock > 0 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.countInStock > 0 ? 'Add to Bag' : 'Out of Stock'}
              </button>

              <button className="w-12 h-12 border border-border flex items-center justify-center hover:border-black transition-colors">
                <FiHeart size={20} />
              </button>
            </div>
          </div>

          {/* Accordion Info */}
          <div className="border-t border-border pt-6 mt-6">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">
              {product.description}
            </p>
            
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Details</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 font-light space-y-2 mb-6">
              <li>Material: {product.material || 'Premium Cotton blend'}</li>
              <li>Care: Machine wash cold, do not tumble dry</li>
              <li>Fit: True to size. Take your normal size.</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
