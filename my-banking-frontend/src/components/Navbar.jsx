import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md font-sans" style={{ minHeight: '5.5rem' }}>
      <div className="w-full flex items-center justify-between px-8 py-4" style={{ minHeight: '5.5rem' }}>
        <Link to="/" className="text-2xl font-extrabold text-[#7c3aed] tracking-tight drop-shadow-sm font-serif">L.D Banking</Link>
        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#a78bfa]"
          aria-label="Open menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="w-7 h-7 text-[#7c3aed]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/apply"
              className="text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
              onClick={() => setMenuOpen(false)}
            >
              Apply
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="/applications"
              className="text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
              onClick={() => setMenuOpen(false)}
            >
              Applications
            </Link>
          )}
          {!isLoggedIn && (
            <Link
              to="/login"
              className="text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
          {isLoggedIn && (
            <span
              className="cursor-pointer text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 z-50 animate-fade-in flex flex-col items-center py-4 gap-4">
          <Link
            to="/"
            className="text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/apply"
              className="text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
              onClick={() => setMenuOpen(false)}
            >
              Apply
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="/applications"
              className="text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
              onClick={() => setMenuOpen(false)}
            >
              Applications
            </Link>
          )}
          {!isLoggedIn && (
            <Link
              to="/login"
              className="text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
          {isLoggedIn && (
            <span
              className="cursor-pointer text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
        </div>
      )}
    </nav>
  );
}
