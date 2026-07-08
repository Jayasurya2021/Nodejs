import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import { FiFilter, FiX } from 'react-icons/fi';

const Shop = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    sort: 'newest'
  });

  const { products, isLoading, isError, message, pages, page } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category') || '';
    const brand = searchParams.get('brand') || '';
    const sort = searchParams.get('sort') || 'newest';
    const isNewArrival = searchParams.get('isNewArrival') || '';

    setFilters({ category, brand, sort });

    dispatch(getProducts({ category, brand, sort, isNewArrival }));
  }, [dispatch, location.search]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    
    // Build query string
    const params = new URLSearchParams();
    if (newFilters.category) params.append('category', newFilters.category);
    if (newFilters.brand) params.append('brand', newFilters.brand);
    if (newFilters.sort) params.append('sort', newFilters.sort);
    
    navigate(`/shop?${params.toString()}`);
  };

  return (
    <motion.div
      initial="page-enter"
      animate="page-enter-active"
      exit="page-exit-active"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex justify-between items-center mb-8 border-b border-border pb-6">
        <h1 className="text-3xl font-bold tracking-widest uppercase">Collection</h1>
        
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="hidden md:block relative">
            <select 
              name="sort" 
              value={filters.sort}
              onChange={handleFilterChange}
              className="appearance-none bg-transparent border-none text-sm uppercase tracking-widest font-semibold focus:ring-0 cursor-pointer pr-8"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
            </select>
          </div>

          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center gap-2 text-sm uppercase tracking-widest font-semibold"
          >
            <FiFilter /> Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* Sidebar Filters (Desktop) */}
        <div className={`w-full md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-24 space-y-8">
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
            
            {(filters.category || filters.brand) && (
              <button 
                onClick={() => navigate('/shop')}
                className="text-xs uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col gap-4">
                  <div className="bg-gray-200 aspect-[3/4] w-full"></div>
                  <div className="h-4 bg-gray-200 w-3/4"></div>
                  <div className="h-3 bg-gray-200 w-1/2"></div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-red-500 text-center py-10">{message}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-light mb-4">No products found matching your criteria.</h3>
              <button onClick={() => navigate('/shop')} className="text-sm border-b border-black pb-1 uppercase tracking-widest font-bold">Clear Filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center mt-16 space-x-2">
                  {[...Array(pages).keys()].map((x) => (
                    <Link
                      key={x + 1}
                      to={`/shop?page=${x + 1}${filters.category ? `&category=${filters.category}` : ''}${filters.brand ? `&brand=${filters.brand}` : ''}`}
                      className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                        x + 1 === page
                          ? 'bg-black text-white border-black'
                          : 'bg-transparent text-gray-500 border-border hover:border-black hover:text-black'
                      }`}
                    >
                      {x + 1}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;
