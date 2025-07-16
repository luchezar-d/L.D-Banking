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
      <div className="animate-pulse text-blue-600 text-xl font-semibold">Loading...</div>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5.5rem)]">
      <div className="text-red-500 text-xl font-semibold">{error}</div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto mt-[5.5rem] bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-2xl rounded-2xl p-8 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Offer Details</h2>
      <div className="w-full flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Applicant:</span>
          <span className="text-gray-900">{app.fullName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-900">{app.email}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Product:</span>
          <span className="text-blue-600 font-bold">{app.productType}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Amount:</span>
          <span className="text-green-600 font-bold">${app.amount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Status:</span>
          <span className={`font-bold ${app.status === 'Approved' ? 'text-green-700' : 'text-yellow-600'}`}>{app.status}</span>
        </div>
      </div>
      <button
        className="mt-2 w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg shadow hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={() => navigate(`/offer/${id}/kyc`)}
      >
        Continue with this offer
      </button>
    </div>
  );
}
