import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import axios from 'axios';
import { useDebounce } from '../../hooks/useDebounce';
import { motion, AnimatePresence } from 'framer-motion';

const SearchInput = ({ isMobile = false }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      setIsFocused(false);
      setQuery('');
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (keyword) => {
    navigate(`/shop?search=${encodeURIComponent(keyword)}`);
    setIsFocused(false);
    setQuery('');
    setSuggestions([]);
  };

  const showDropdown = isFocused && query.length >= 2;

  return (
    <div ref={wrapperRef} className={`relative w-full ${isMobile ? '' : 'group'}`}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isFocused ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'}`} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search products, brands..."
          className={`w-full text-sm transition-all duration-300 outline-none ${
            isMobile 
              ? 'bg-gray-100 border-none rounded-lg py-3 pl-11 pr-10 focus:ring-1 focus:ring-black'
              : 'bg-gray-100/70 border border-transparent hover:border-gray-200 focus:bg-white focus:border-black rounded-full py-2.5 pl-11 pr-10 shadow-none focus:shadow-sm'
          }`}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-0 right-0 bg-white shadow-xl border border-gray-100 overflow-hidden z-50 ${
              isMobile ? 'top-full mt-2 rounded-xl' : 'top-[calc(100%+12px)] rounded-2xl'
            }`}
          >
            {isLoading ? (
              <div className="py-8 flex justify-center">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="max-h-96 overflow-y-auto py-2">
                {suggestions.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleSuggestionClick(item.title)}
                    className="flex items-center gap-3 p-3 mx-2 my-1 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <FiSearch className="text-gray-400 w-4 h-4" />
                    <span className="text-sm text-gray-700 truncate">{item.title}</span>
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
  );
};

export default SearchInput;
