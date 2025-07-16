import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = '/';  // ✅ redirect to Home
    } else {
      setError('❌ Invalid username or password');
    }
  };


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-[#7c3aed] mb-6 tracking-tight text-center font-serif">Admin Login</h1>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <input
            className="w-full px-4 py-3 rounded-md border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] text-base shadow-sm transition"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            className="w-full px-4 py-3 rounded-md border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] text-base shadow-sm transition"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-gradient-to-r from-[#a78bfa] to-[#7c3aed] text-white font-semibold text-lg shadow hover:from-[#7c3aed] hover:to-[#a78bfa] hover:shadow-lg transition"
          >
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-600 font-medium">{error}</p>}
      </div>
    </div>
  );
}
