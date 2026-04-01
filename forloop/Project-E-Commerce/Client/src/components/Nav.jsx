import { Link } from "react-router-dom";
import { useState } from "react";
import SearchEngine from "./SearchEngine";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md px-6 md:px-12 py-4 flex items-center justify-between">

      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
        <Link to="/">Shop</Link>
      </div>

      {/* Desktop Search */}
      <div className="hidden md:block w-1/3">
        <SearchEngine />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 font-medium text-gray-700">
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

      {/* Right Section */}
      <div className="hidden md:flex gap-6 items-center">
        <Link
          to="/clientRegister"
          className="text-gray-700 hover:text-black font-medium"
        >
          Register
        </Link>

        <Link
          to="/cart"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          🛒 Cart
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 md:hidden">

          <SearchEngine />

          <Link to="/men" onClick={() => setMenuOpen(false)}>
            Men
          </Link>

          <Link to="/tshirt" onClick={() => setMenuOpen(false)}>
            T-Shirts
          </Link>

          <Link to="/jeans" onClick={() => setMenuOpen(false)}>
            Jeans
          </Link>

          <Link to="/clientRegister" onClick={() => setMenuOpen(false)}>
            Register
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            🛒 Cart
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;