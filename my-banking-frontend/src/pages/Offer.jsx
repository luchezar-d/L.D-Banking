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

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-4 bg-white shadow rounded p-6 mt-[5.5rem]">
      <h2 className="text-2xl font-bold mb-4">Offer Details</h2>
      <div className="mb-2"><span className="font-semibold">Applicant:</span> {app.fullName}</div>
      <div className="mb-2"><span className="font-semibold">Email:</span> {app.email}</div>
      <div className="mb-2"><span className="font-semibold">Product:</span> {app.productType}</div>
      <div className="mb-2"><span className="font-semibold">Amount:</span> {app.amount}</div>
      <div className="mb-2"><span className="font-semibold">Status:</span> {app.status}</div>
      <button
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        onClick={() => navigate(`/offer/${id}/kyc`)}
      >
        Continue with this offer
      </button>
    </div>
  );
}
