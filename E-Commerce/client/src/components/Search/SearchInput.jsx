import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import axios from 'axios';
import { useDebounce } from '../../hooks/useDebounce';
import { motion, AnimatePresence } from 'framer-motion';

const SearchInput = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length >= 2) {
        setIsLoading(true);
        try {
          const { data } = await axios.get(`/api/search/suggestions?q=${debouncedQuery}`);
          setSuggestions(data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      onClose();
      setQuery('');
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (slug) => {
    navigate(`/product/${slug}`);
    onClose();
    setQuery('');
    setSuggestions([]);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <form onSubmit={handleSubmit} className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories, brands..."
            className="w-full bg-gray-50 border border-gray-200 rounded-none py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </form>

        <AnimatePresence>
          {query.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              {isLoading ? (
                <div className="py-8 flex justify-center">
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : suggestions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {suggestions.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleSuggestionClick(item.slug)}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-200"
                    >
                      <img
                        src={item.thumbnail?.url || item.images?.url || 'https://via.placeholder.com/60'}
                        alt={item.title}
                        className="w-16 h-16 object-cover bg-gray-100"
                      />
                      <div>
                        <h4 className="text-sm font-bold truncate max-w-[200px] sm:max-w-[300px]">{item.title}</h4>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[10px] uppercase tracking-widest text-gray-500">{item.brand}</span>
                          <span className="text-[10px] text-gray-300">|</span>
                          <span className="text-[10px] uppercase tracking-widest text-gray-500">{item.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500 text-sm">
                  No results found for "{query}"
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SearchInput;
