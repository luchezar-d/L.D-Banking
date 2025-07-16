import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';

export default function Offer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/applications/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject('Not found'))
      .then(data => {
        setApp(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Offer not found.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5.5rem)]">
      <div className="animate-pulse text-purple-400 text-xl font-semibold">Loading...</div>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5.5rem)]">
      <div className="text-red-500 text-xl font-semibold">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] font-sans">
      <div className="flex flex-1 flex-col md:flex-row max-w-5xl mx-auto w-full px-4 py-10 gap-10">
        {/* Left column: Offer info */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-8 text-left text-purple-400">Offer Details</h2>
          <div className="grid grid-cols-1 gap-6 mb-10">
            <div className="flex flex-col">
              <span className="font-bold text-gray-700">Applicant:</span>
              <span className="text-purple-600 text-lg">{app.fullName}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-700">Email:</span>
              <span className="text-purple-600 text-lg">{app.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-700">Product:</span>
              <span className="text-purple-600 text-lg">{app.productType}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-700">Amount:</span>
              <span className="text-purple-600 text-lg">${app.amount}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-700">Status:</span>
              <span className="text-purple-600 text-lg">{app.status}</span>
            </div>
          </div>
          <button
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-300 to-purple-500 text-white font-bold rounded-lg text-lg shadow transition hover:from-purple-400 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={() => navigate(`/offer/${id}/kyc`)}
          >
            Continue with this offer
          </button>
        </div>
        {/* Right column: Slogan / onboarding */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <div className="text-2xl font-bold text-purple-400 mb-4">Secure your future with one click.</div>
          <div className="text-base text-gray-500">Fast, secure, and personalized banking for your needs.</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
