import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function KycPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('kycDocument', file);
      const uploadRes = await fetch(`/api/offer/${id}/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!uploadRes.ok) throw new Error('Upload failed');
      const acceptRes = await fetch(`/api/offer/${id}/accept`, { method: 'POST' });
      if (!acceptRes.ok) throw new Error('Accept failed');
      navigate('/applications');
    } catch (err) {
      setError('Failed to upload and accept offer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow rounded p-8">
      <h2 className="text-2xl font-bold mb-4">KYC Document Upload</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="mb-4"
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload & Continue'}
        </button>
      </form>
    </div>
  );
}
