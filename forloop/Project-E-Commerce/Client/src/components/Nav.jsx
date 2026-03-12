import { Link } from "react-router-dom";
import SearchEngine from "./SearchEngine";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="nav-logo">
                <Link to="/">Shop</Link>
            </div>
            <SearchEngine />
            <div className="nav-search">
                <input type="text" placeholder="Search products..." />
            </div>

            <div className="nav-links">
                <Link to="/men">Men</Link>
                <Link to="/tshirt">T-Shirts</Link>
                <Link to="/jeans">Jeans</Link>
            </div>

            <div className="nav-icons">
                <Link to="/login">Login</Link>
                <Link to="/cart">Cart 🛒</Link>
            </div>
        </nav>
    );
}

export default Navbar;