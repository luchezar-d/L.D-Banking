import React, { useEffect, useState } from 'react';
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
    <div className="w-full bg-white min-h-[calc(100vh-5.5rem)] pt-[5.5rem]">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-extrabold mb-8 text-left text-purple-400">Offer Details</h2>
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-bold text-gray-700 w-32">Applicant:</span>
            <span className="text-purple-600 text-lg">{app.fullName}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-bold text-gray-700 w-32">Email:</span>
            <span className="text-purple-600 text-lg">{app.email}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-bold text-gray-700 w-32">Product:</span>
            <span className="text-purple-600 text-lg">{app.productType}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-bold text-gray-700 w-32">Amount:</span>
            <span className="text-purple-600 text-lg">${app.amount}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-bold text-gray-700 w-32">Status:</span>
            <span className="text-purple-600 text-lg">{app.status}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-300 to-purple-400 text-white font-bold rounded-lg text-lg transition hover:from-purple-400 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={() => navigate(`/offer/${id}/kyc`)}
          >
            Continue with this offer
          </button>
        </div>
      </div>
    </div>
  );
}
