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
    <nav className="flex justify-between items-center py-4 px-8 border-b border-gray-200">
      <Link to="/" className="text-purple-700 font-bold text-xl">L.D Banking</Link>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && (
          <>
            <Link to="/apply">Apply</Link>
            <Link to="/applications">Applications</Link>
            <span 
              className="cursor-pointer text-red-600"
              onClick={handleLogout}
            >
              Logout
            </span>
          </>
        )}
      </div>
    </nav>
  );
}
