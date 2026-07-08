import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark-bg text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-bold text-2xl tracking-widest uppercase mb-6">LUXE.</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Redefining premium menswear. Crafted with precision, designed for the modern gentleman.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FiInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FiTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FiFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FiYoutube size={20} /></a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase mb-6 text-gray-300">Shop</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/shop?category=New+Arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?category=Shirts" className="hover:text-white transition-colors">Shirts</Link></li>
              <li><Link to="/shop?category=Jackets" className="hover:text-white transition-colors">Jackets</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase mb-6 text-gray-300">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase mb-6 text-gray-300">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-transparent border-b border-gray-600 pb-2 text-sm focus:outline-none focus:border-white transition-colors text-white"
              />
              <button 
                type="submit"
                className="text-left text-sm tracking-wider uppercase hover:text-gray-300 transition-colors pt-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LUXE MENSWEAR. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-6 text-gray-500 text-xs">
            <Link to="/privacy" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
            <Link to="/terms" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
