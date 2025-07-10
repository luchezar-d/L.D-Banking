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
    <div style={{ padding: '2rem' }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Login</button>
      </form>
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
}
