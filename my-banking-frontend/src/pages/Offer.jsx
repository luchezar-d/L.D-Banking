import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplicationById } from '../api/applications';

export default function Offer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getApplicationById(id)
      .then(res => {
        setApp(res.data);
        setLoading(false);
      })
      .catch(err => {
        
        setError(
          err?.response?.data?.message ||
          err?.message ||
          'Offer not found.'
        );
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f9ff] font-inter">
      <div className="animate-pulse text-purple-400 text-xl font-semibold">Loading...</div>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f9ff] font-inter">
      <div className="text-red-500 text-xl font-semibold">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f9f9ff] font-inter">
      <div className="flex flex-1 items-center justify-center pt-[7.5rem] pb-10">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {/* Left column: Offer Details */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold mb-8 text-left text-purple-400">Offer Details</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 text-base md:text-lg">Applicant:</span>
                <span className="ml-2 text-lg md:text-xl text-purple-500 font-medium">
                  {app.contact?.firstName && app.contact?.lastName 
                    ? `${app.contact.firstName} ${app.contact.lastName}` 
                    : 'N/A'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 text-base md:text-lg">Email:</span>
                <span className="ml-2 text-lg md:text-xl text-purple-500 font-medium">{app.contact?.email || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 text-base md:text-lg">Company:</span>
                <span className="ml-2 text-lg md:text-xl text-purple-500 font-medium">{app.account?.name || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 text-base md:text-lg">Product:</span>
                <span className="ml-2 text-lg md:text-xl text-purple-500 font-medium">{app.productType || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 text-base md:text-lg">Amount:</span>
                <span className="ml-2 text-lg md:text-xl text-purple-500 font-medium">
                  {app.loan?.amount ? `$${app.loan.amount.toLocaleString()}` : 'N/A'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 text-base md:text-lg">Term:</span>
                <span className="ml-2 text-lg md:text-xl text-purple-500 font-medium">
                  {app.loan?.termMonths ? `${app.loan.termMonths} months` : 'N/A'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 text-base md:text-lg">Interest Rate:</span>
                <span className="ml-2 text-lg md:text-xl text-purple-500 font-medium">
                  {app.loan?.interestRate ? `${app.loan.interestRate}%` : 'N/A'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 text-base md:text-lg">Status:</span>
                <span className="ml-2 text-lg md:text-xl text-purple-500 font-medium">{app.status || 'Applied'}</span>
              </div>
            </div>
            <button
              className="mt-8 w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-300 to-purple-500 text-white font-bold rounded-lg text-lg shadow transition hover:from-purple-400 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              onClick={() => navigate(`/offer/${id}/kyc`)}
            >
              Continue with this offer
            </button>
          </div>
          {/* Right column: Slogan / onboarding */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <div className="text-2xl font-bold text-purple-400 mb-4">Secure your future with one click.</div>
            <div className="text-base text-gray-500">Fast, secure, and personalized banking for your needs.</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
