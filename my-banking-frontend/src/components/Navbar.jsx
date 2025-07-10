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
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold text-purple-700">
        L.D Banking
      </div>
      <div className="space-x-6">
        <Link 
          to="/" 
          className="text-gray-700 hover:text-purple-700 transition"
        >
          Home
        </Link>
        {isLoggedIn && (
          <>
            <Link 
              to="/apply" 
              className="text-gray-700 hover:text-purple-700 transition"
            >
              Apply
            </Link>
            <Link 
              to="/applications" 
              className="text-gray-700 hover:text-purple-700 transition"
            >
              Applications
            </Link>
          </>
        )}
        {!isLoggedIn ? (
          <Link 
            to="/login" 
            className="text-purple-700 hover:text-purple-900 font-semibold transition"
          >
            Login
          </Link>
        ) : (
          <span 
            className="cursor-pointer text-red-600 hover:text-red-800 font-semibold transition"
            onClick={handleLogout}
          >
            Logout
          </span>
        )}
      </div>
    </nav>
  );
}
