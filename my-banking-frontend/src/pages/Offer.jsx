import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicationById, acceptOffer } from '../api/applications';

export default function Offer() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    getApplicationById(id)
      .then(res => {
        setApp(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load application', err);
        setLoading(false);
      });
  }, [id]);

  const handleAccept = async () => {
    setAccepting(true);
    try {
      const res = await acceptOffer(id);
      setMessage(`✅ KYC completed: ${res.data.app.status}`);
      setApp(res.data.app); // update local status
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to process acceptance.');
    } finally {
      setAccepting(false);
    }
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading offer...</p>;

  if (!app) return <p style={{ padding: '2rem' }}>❌ Offer not found</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Offer for {app.fullName}</h1>
      <ul>
        <li><strong>Product:</strong> {app.productType}</li>
        <li><strong>City:</strong> {app.city}</li>
        <li><strong>Postal Code:</strong> {app.postalCode}</li>
        <li><strong>Status:</strong> {app.status}</li>
      </ul>

      <button onClick={handleAccept} disabled={accepting}>
        {accepting ? 'Processing...' : 'Accept Offer & Run KYC'}
      </button>

      <p>{message}</p>
    </div>
  );
}
