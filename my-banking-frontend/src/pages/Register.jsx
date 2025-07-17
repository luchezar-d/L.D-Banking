import React, { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', isAdmin: false });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('User registered successfully!');
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch (err) {
      setMessage('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-purple-500 mb-4 text-center">Register User</h2>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 rounded border border-gray-300" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full px-4 py-2 rounded border border-gray-300" required />
        <label className="flex items-center gap-2">
          <input name="isAdmin" type="checkbox" checked={form.isAdmin} onChange={handleChange} />
          <span>Admin</span>
        </label>
        <button type="submit" className="w-full py-3 rounded bg-gradient-to-r from-purple-300 to-purple-500 text-white font-bold">Register</button>
        {message && <div className="text-center text-red-500 mt-2">{message}</div>}
      </form>
    </div>
  );
}
