
import React, { useState } from 'react';
import { applyForProduct } from '../api/applications';
import { sendInitialOfferEmail } from '../utils/email';
import { CheckCircle, CreditCard, TrendingUp } from 'lucide-react';
import Footer from '../components/Footer';
import { v4 as uuidv4 } from 'uuid';

export default function Apply() {
  const [form, setForm] = useState({
    // Account Information
    companyName: '',
    companyType: 'Customer',
    industry: '',
    // Contact Information
    firstName: '',
    lastName: '',
    email: '',
    // Product Selection
    productType: 'Loan',
    // Loan Information
    loanAmount: '',
    termMonths: '',
    interestRate: '',
    purpose: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: ['loanAmount', 'termMonths', 'interestRate'].includes(name) ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['companyName', 'industry', 'firstName', 'lastName', 'email', 'loanAmount', 'termMonths', 'interestRate', 'purpose'];
    const missingFields = requiredFields.filter(field => !form[field]);
    
    if (missingFields.length > 0) {
      setMessage(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    // Generate UUIDs for the structured payload
    const accountUUID = uuidv4();
    const contactUUID = uuidv4();
    const loanUUID = uuidv4();
    
    // Construct structured payload for MongoDB and Lambda
    const structuredPayload = {
      productType: form.productType,
      loanUUID: loanUUID,
      account: {
        uuid: accountUUID,
        name: form.companyName,
        type: form.companyType,
        industry: form.industry
      },
      contact: {
        uuid: contactUUID,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email
      },
      loan: {
        amount: form.loanAmount,
        termMonths: form.termMonths,
        interestRate: form.interestRate,
        purpose: form.purpose
      }
    };
    
    try {
      const res = await applyForProduct(structuredPayload);
      setMessage('Application submitted successfully! Your data has been saved to our database and synced with Salesforce.');
      
      // Optional: Reset form after successful submission
      setForm({
        companyName: '',
        companyType: 'Customer',
        industry: '',
        firstName: '',
        lastName: '',
        email: '',
        productType: 'Loan',
        loanAmount: '',
        termMonths: '',
        interestRate: '',
        purpose: ''
      });
      
    } catch (err) {
      console.error('Application submission error:', err);
      const errorMessage = err?.response?.data?.error || err.message || 'Unknown error occurred';
      setMessage(`Failed to submit application: ${errorMessage}`);
      alert(`Failed to submit application: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8ff] flex flex-col w-full">
      <main className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-start gap-12 px-4 md:px-8 py-12 mt-[5.5rem] min-h-[calc(100vh-5.5rem)]">
        {/* Form Card */}
        <div className="w-full md:w-1/2 bg-[#fafafa] p-6 md:p-8 rounded-lg shadow-md border border-gray-100 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-3 text-center">Apply for Banking Product</h2>
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            
            {/* Account Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-600 mb-3">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700 mb-1 font-medium" htmlFor="companyName">Company Name *</label>
                  <input 
                    name="companyName" 
                    id="companyName" 
                    placeholder="Company Name" 
                    value={form.companyName}
                    onChange={handleChange}
                    className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium" htmlFor="companyType">Company Type</label>
                  <select 
                    name="companyType" 
                    id="companyType" 
                    value={form.companyType}
                    onChange={handleChange}
                    className="w-full bg-white text-gray-900 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Partner">Partner</option>
                    <option value="Prospect">Prospect</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium" htmlFor="industry">Industry *</label>
                  <input 
                    name="industry" 
                    id="industry" 
                    placeholder="Industry" 
                    value={form.industry}
                    onChange={handleChange}
                    className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" 
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-600 mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-1 font-medium" htmlFor="firstName">First Name *</label>
                    <input 
                      name="firstName" 
                      id="firstName" 
                      placeholder="First Name" 
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" 
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-1 font-medium" htmlFor="lastName">Last Name *</label>
                    <input 
                      name="lastName" 
                      id="lastName" 
                      placeholder="Last Name" 
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" 
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium" htmlFor="email">Email *</label>
                  <input 
                    name="email" 
                    id="email" 
                    type="email"
                    placeholder="Email" 
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" 
                    required
                  />
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-600 mb-3">Product Selection</h3>
              <div>
                <label className="block text-gray-700 mb-1 font-medium" htmlFor="productType">Product Type</label>
                <select 
                  name="productType" 
                  id="productType" 
                  value={form.productType}
                  onChange={handleChange}
                  className="w-full bg-white text-gray-900 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm"
                >
                  <option value="Loan">Loan</option>
                  <option value="Flash Credit">Flash Credit</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </div>
            </div>

            {/* Loan Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-600 mb-3">Loan Information</h3>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-1 font-medium" htmlFor="loanAmount">Loan Amount *</label>
                    <input 
                      name="loanAmount" 
                      id="loanAmount" 
                      type="number" 
                      placeholder="10000" 
                      value={form.loanAmount}
                      onChange={handleChange}
                      className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" 
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-1 font-medium" htmlFor="termMonths">Term (Months) *</label>
                    <input 
                      name="termMonths" 
                      id="termMonths" 
                      type="number" 
                      placeholder="12" 
                      value={form.termMonths}
                      onChange={handleChange}
                      className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" 
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-1 font-medium" htmlFor="interestRate">Interest Rate (%) *</label>
                    <input 
                      name="interestRate" 
                      id="interestRate" 
                      type="number" 
                      step="0.1"
                      placeholder="7.5" 
                      value={form.interestRate}
                      onChange={handleChange}
                      className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" 
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-1 font-medium" htmlFor="purpose">Purpose *</label>
                    <input 
                      name="purpose" 
                      id="purpose" 
                      placeholder="Startup Capital" 
                      value={form.purpose}
                      onChange={handleChange}
                      className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] transition shadow-sm" 
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit"
              className="w-full py-3 mt-4 rounded-md bg-gradient-to-r from-[#a78bfa] to-[#7c3aed] text-white font-medium text-base shadow hover:from-[#7c3aed] hover:to-[#a78bfa] hover:shadow-lg transition">
              Submit Application
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
