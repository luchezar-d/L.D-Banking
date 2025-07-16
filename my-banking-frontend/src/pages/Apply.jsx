import React, { useState } from 'react';
import { applyForProduct } from '../api/applications';

export default function Apply() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    city: '',
    postalCode: '',
    productType: 'Loan',
    amount: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'amount' ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyForProduct(form);
      setMessage('✅ Application submitted!');
    } catch (err) {
      setMessage('❌ Failed to submit application');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8ff] flex flex-col w-full">
      <main className="w-full flex flex-col md:flex-row items-center justify-center gap-12 py-12 px-4 md:px-8">
        {/* Left: Form Card */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-10 flex flex-col justify-center border border-gray-100 max-w-xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Apply for a Product</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="fullName">Full Name</label>
              <input name="fullName" id="fullName" placeholder="Full Name" onChange={handleChange}
                className="w-full bg-[#f3f3fa] text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">Email</label>
              <input name="email" id="email" placeholder="Email" onChange={handleChange}
                className="w-full bg-[#f3f3fa] text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="city">City</label>
                <input name="city" id="city" placeholder="City" onChange={handleChange}
                  className="w-full bg-[#f3f3fa] text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="postalCode">Postal Code</label>
                <input name="postalCode" id="postalCode" placeholder="Postal Code" onChange={handleChange}
                  className="w-full bg-[#f3f3fa] text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="productType">Product</label>
              <select name="productType" id="productType" onChange={handleChange}
                className="w-full bg-[#f3f3fa] text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm">
                <option>Loan</option>
                <option>Flash Credit</option>
                <option>Credit Card</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="amount">Amount</label>
              <input name="amount" id="amount" type="number" placeholder="Amount" onChange={handleChange}
                className="w-full bg-[#f3f3fa] text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" />
            </div>
            <button type="submit"
              className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-[#a78bfa] to-[#7c3aed] text-white font-semibold text-lg shadow-lg hover:from-[#7c3aed] hover:to-[#a78bfa] hover:shadow-[#a78bfa]/40 transition">
              Submit
            </button>
          </form>
          <div className="mt-6 text-center text-gray-700 min-h-[2rem]">{message}</div>
        </div>
        {/* Right: Info Card */}
        <div className="flex-1 bg-white/80 rounded-2xl shadow-xl p-10 flex flex-col justify-center items-center border border-gray-100 max-w-xl w-full mt-10 md:mt-0">
          <h2 className="text-2xl font-bold text-[#7c3aed] mb-6 text-center">Why Choose L.D Banking?</h2>
          <ul className="space-y-6 text-lg">
            <li className="flex items-center gap-3 text-gray-800"><span className="text-[#a78bfa] text-xl">★</span> Flat fee, 0% interest</li>
            <li className="flex items-center gap-3 text-gray-800"><span className="text-[#a78bfa] text-xl">💳</span> Pay by card or transfer</li>
            <li className="flex items-center gap-3 text-gray-800"><span className="text-[#a78bfa] text-xl">📅</span> Repay in monthly installments</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
