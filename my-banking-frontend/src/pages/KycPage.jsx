import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function KycPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [nationality, setNationality] = useState('');
  const [isPublicFigure, setIsPublicFigure] = useState('no');
  const [additionalInfo, setAdditionalInfo] = useState('');
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
    if (!nationality) {
      setError('Please enter your nationality.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('kycDocument', file);
      formData.append('nationality', nationality);
      formData.append('isPublicFigure', isPublicFigure);
      formData.append('additionalInfo', additionalInfo);
      // Send all KYC info to backend (which should forward to AWS)
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
    <div className="max-w-lg mx-auto mt-[5.5rem] bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">KYC Information & Document Upload</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <div>
          <label className="block mb-2 text-base font-semibold text-gray-700">Nationality</label>
          <input
            type="text"
            value={nationality}
            onChange={e => setNationality(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter your nationality"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-base font-semibold text-gray-700">Are you a public figure?</label>
          <select
            value={isPublicFigure}
            onChange={e => setIsPublicFigure(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-base font-semibold text-gray-700">Additional Info <span className="text-gray-400">(optional)</span></label>
          <textarea
            value={additionalInfo}
            onChange={e => setAdditionalInfo(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            rows={3}
            placeholder="Any additional info you'd like to provide"
          />
        </div>
        <div>
          <label className="block mb-2 text-base font-semibold text-gray-700">KYC Document</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload & Continue'}
        </button>
      </form>
    </div>
  );
}
