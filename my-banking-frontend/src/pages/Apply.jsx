
import React, { useState } from 'react';
import { applyForProduct } from '../api/applications';
import { sendInitialOfferEmail } from '../utils/email';
import { CheckCircle, CreditCard, TrendingUp } from 'lucide-react';
import Footer from '../components/Footer';

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
      const res = await applyForProduct(form);
      
      setMessage('Application submitted!');
      
      // if (res && res.data && res.data.app && res.data.app._id) {
      //   await sendInitialOfferEmail({
      //     name: form.fullName,
      //     product: form.productType,
      //     offerLink: `https://l-d-banking.onrender.com/offer/${res.data.app._id}`,
      //     email: form.email,
      //   });
      // }
    } catch (err) {
      setMessage('Failed to submit application');
      
      alert('Failed to submit application: ' + (err?.response?.data?.error || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8ff] flex flex-col w-full">
      <main className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-start gap-12 px-4 md:px-8 py-12 mt-[5.5rem] min-h-[calc(100vh-5.5rem)]">
        {/* Form Card */}
        <div className="w-full md:w-1/2 bg-[#fafafa] p-6 md:p-8 rounded-lg shadow-md border border-gray-100 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-3 text-center">Apply for a Product</h2>
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium" htmlFor="fullName">Full Name</label>
              <input name="fullName" id="fullName" placeholder="Full Name" onChange={handleChange}
                className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium" htmlFor="email">Email</label>
              <input name="email" id="email" placeholder="Email" onChange={handleChange}
                className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-1 font-medium" htmlFor="city">City</label>
                <input name="city" id="city" placeholder="City" onChange={handleChange}
                  className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-1 font-medium" htmlFor="postalCode">Postal Code</label>
                <input name="postalCode" id="postalCode" placeholder="Postal Code" onChange={handleChange}
                  className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium" htmlFor="productType">Product</label>
              <select name="productType" id="productType" onChange={handleChange}
                className="w-full bg-white text-gray-900 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm">
                <option>Loan</option>
                <option>Flash Credit</option>
                <option>Credit Card</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium" htmlFor="amount">Amount</label>
              <input name="amount" id="amount" type="number" placeholder="Amount" onChange={handleChange}
                className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" />
            </div>
            <button type="submit"
              className="w-full py-3 mt-2 rounded-md bg-gradient-to-r from-[#a78bfa] to-[#7c3aed] text-white font-medium text-base shadow hover:from-[#7c3aed] hover:to-[#a78bfa] hover:shadow-lg transition">
              Submit
            </button>
          </form>
          <div className="mt-4 text-center text-gray-700 min-h-[2rem]">{message}</div>
        </div>
        {/* Features Card */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100 flex flex-col justify-center items-start">
          <h2 className="text-xl md:text-2xl font-medium text-[#7c3aed] mb-3">Why Choose L.D Banking?</h2>
          <ul className="space-y-3 md:space-y-4 text-base">
            <li className="flex items-center gap-3 text-gray-800">
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#a78bfa]" /> Flat fee, 0% interest
            </li>
            <li className="flex items-center gap-3 text-gray-800">
              <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-[#a78bfa]" /> Pay by card or transfer
            </li>
            <li className="flex items-center gap-3 text-gray-800">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#a78bfa]" /> Repay in monthly installments
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
