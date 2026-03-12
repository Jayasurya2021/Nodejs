import { Link } from "react-router-dom";
import SearchEngine from "./SearchEngine";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex items-center justify-between">

      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
        <Link to="/">Shop</Link>
      </div>

      {/* Search */}
      <div className="w-1/3">
        <SearchEngine />
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 font-medium text-gray-700">
        <Link to="/men" className="hover:text-black transition">
          Men
        </Link>

        <Link to="/tshirt" className="hover:text-black transition">
          T-Shirts
        </Link>

        <Link to="/jeans" className="hover:text-black transition">
          Jeans
        </Link>
      </div>

      {/* Icons */}
      <div className="flex gap-6 items-center">
        <Link
          to="/login"
          className="text-gray-700 hover:text-black font-medium"
        >
          Login
        </Link>

        <Link
          to="/cart"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          🛒 Cart
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;