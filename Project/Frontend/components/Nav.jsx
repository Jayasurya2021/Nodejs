import { useState } from "react";

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // simple static data
  const user = "Surya";
  const isAuthenticated = true;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="font-semibold text-xl text-blue-600">
            CommunityFix
          </div>

          {/* Desktop Menu */}
          {isAuthenticated && (
            <div className="hidden md:flex gap-4 text-gray-700">
              <button className="hover:text-blue-600">Dashboard</button>
              <button className="hover:text-blue-600">Report Problem</button>
              <button className="hover:text-blue-600">Admin Panel</button>
            </div>
          )}

          {/* Right Side */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden md:block text-sm">
                {user}
              </span>

              <button className="text-red-600 hover:underline">
                Logout
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                ☰
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button>Login</button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded">
                Register
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 mt-3">
            <button>Dashboard</button>
            <button>Report Problem</button>
            <button>Admin Panel</button>
            <button className="text-red-600">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
