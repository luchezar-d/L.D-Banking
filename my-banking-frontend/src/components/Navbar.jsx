import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-white shadow-md h-20 font-sans">
      <div className="w-full h-20 flex items-center justify-between px-8">
        <Link to="/" className="text-2xl font-extrabold text-[#7c3aed] tracking-tight drop-shadow-sm font-serif">L.D Banking</Link>
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/apply"
              className="text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
            >
              Apply
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="/applications"
              className="text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
            >
              Applications
            </Link>
          )}
          {!isLoggedIn && (
            <Link
              to="/login"
              className="text-lg font-semibold text-gray-900 hover:text-[#7c3aed] transition-colors duration-200 tracking-wide font-sans"
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
    </nav>
  );
}
