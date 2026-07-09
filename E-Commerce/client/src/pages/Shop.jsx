import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts, searchProducts, reset } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import { FiFilter, FiX } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

const Shop = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    sort: 'newest',
    search: ''
  });

  const { products, isLoading, isFetchingNextPage, isError, message, pages, page, total } = useSelector(
    (state) => state.products
  );

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '400px 0px' // Load when bottom is 400px away
  });

  // Extract query params and fetch initial data
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category') || '';
    const brand = searchParams.get('brand') || '';
    const sort = searchParams.get('sort') || 'newest';
    const isNewArrival = searchParams.get('isNewArrival') || '';
    const search = searchParams.get('search') || '';

    setFilters({ category, brand, sort, search });

    // Fetch initial page 1 (replace mode)
    if (search) {
      dispatch(searchProducts({ q: search, page: 1, limit: 12, append: false }));
    } else {
      dispatch(getProducts({ category, brand, sort, isNewArrival, page: 1, limit: 12, append: false }));
    }
    
    // Cleanup on unmount or query change
    return () => { dispatch(reset()); };
  }, [dispatch, location.search]);

  // Infinite Scroll Trigger
  useEffect(() => {
    if (inView && !isLoading && !isFetchingNextPage && page < pages) {
      const nextPage = page + 1;
      const searchParams = new URLSearchParams(location.search);
      const category = searchParams.get('category') || '';
      const brand = searchParams.get('brand') || '';
      const sort = searchParams.get('sort') || 'newest';
      const isNewArrival = searchParams.get('isNewArrival') || '';
      const search = searchParams.get('search') || '';

      if (search) {
        dispatch(searchProducts({ q: search, page: nextPage, limit: 12, append: true }));
      } else {
        dispatch(getProducts({ category, brand, sort, isNewArrival, page: nextPage, limit: 12, append: true }));
      }
    }
  }, [inView, isLoading, isFetchingNextPage, page, pages, dispatch, location.search]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    const params = new URLSearchParams(location.search);
    
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    
    // Changing filters should reset search
    if (name === 'category' || name === 'brand') {
      params.delete('search');
    }
    
    navigate(`/shop?${params.toString()}`);
  };

  const clearFilters = () => {
    navigate('/shop');
  };

  return (
    <motion.div
      initial="page-enter"
      animate="page-enter-active"
      exit="page-exit-active"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-border pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-widest uppercase">
            {filters.search ? `Search: "${filters.search}"` : 'Collection'}
          </h1>
          {!isLoading && <p className="text-sm text-gray-500 mt-2">{total} Products found</p>}
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* Sort Dropdown */}
          <div className="relative">
            <select 
              name="sort" 
              value={filters.sort}
              onChange={handleFilterChange}
              className="appearance-none bg-transparent border-none text-sm uppercase tracking-widest font-semibold focus:ring-0 cursor-pointer pr-8"
              disabled={!!filters.search} // Disable sort during search as textScore sorts it
            >
              <option value="newest">Newest Arrivals</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
            </select>
          </div>

          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center gap-2 text-sm uppercase tracking-widest font-semibold bg-gray-100 px-4 py-2"
          >
            <FiFilter /> Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* Sidebar Filters */}
        <div className={`w-full md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-24 space-y-8 bg-white z-10 md:bg-transparent p-4 md:p-0 border md:border-none border-gray-200">
            {isFilterOpen && (
              <div className="flex justify-end md:hidden">
                <button onClick={() => setIsFilterOpen(false)}><FiX size={20}/></button>
              </div>
            )}
            
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Category</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                {['Shirts', 'Jeans', 'Jackets', 'Accessories', 'Sneakers'].map((cat) => (
                  <li key={cat}>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                      <input 
                        type="radio" 
                        name="category" 
                        value={cat}
                        checked={filters.category === cat}
                        onChange={handleFilterChange}
                        className="accent-black w-4 h-4"
                      />
                      {cat}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Brand</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                {['Zara', 'H&M', 'Massimo Dutti', 'COS', 'Uniqlo'].map((brand) => (
                  <li key={brand}>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                      <input 
                        type="radio" 
                        name="brand" 
                        value={brand}
                        checked={filters.brand === brand}
                        onChange={handleFilterChange}
                        className="accent-black w-4 h-4"
                      />
                      {brand}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            
            {(filters.category || filters.brand || filters.search) && (
              <button 
                onClick={clearFilters}
                className="text-xs uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors w-full text-left"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {isError ? (
            <div className="text-red-500 text-center py-10">{message}</div>
          ) : products.length === 0 && !isLoading ? (
            <div className="text-center py-20 bg-gray-50">
              <h3 className="text-xl font-light mb-4">No products found.</h3>
              <button onClick={clearFilters} className="text-sm border-b border-black pb-1 uppercase tracking-widest font-bold">Explore All</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {/* Skeleton loading for initial load */}
              {isLoading && !isFetchingNextPage && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="shimmer aspect-[3/4] w-full mb-4"></div>
                      <div className="shimmer h-4 w-3/4 mb-2"></div>
                      <div className="shimmer h-3 w-1/2"></div>
                    </div>
                  ))}
                </div>
              )}

              {/* Infinite Scroll Trigger & Loader */}
              <div ref={ref} className="w-full py-10 flex justify-center items-center">
                {isFetchingNextPage && (
                  <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                )}
                {!isFetchingNextPage && page === pages && products.length > 0 && (
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">You've reached the end</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;
