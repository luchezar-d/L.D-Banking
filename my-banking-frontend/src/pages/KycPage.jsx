import React, { useState } from 'react';
import { nationalities } from '../utils/nationalities';
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
    <div className="w-full bg-[#f9f9ff] min-h-[calc(100vh-5.5rem)] pt-[5.5rem]">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-extrabold mb-8 text-left text-purple-400">KYC Information & Document Upload</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div>
            <label className="block mb-2 text-base font-semibold text-gray-700" htmlFor="nationality">Nationality</label>
            <select
              id="nationality"
              value={nationality}
              onChange={e => setNationality(e.target.value)}
              className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-white text-gray-900"
              required
            >
              <option value="" disabled>Select your nationality</option>
              {nationalities.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-base font-semibold text-gray-700" htmlFor="public-figure">Are you a public figure?</label>
            <select
              id="public-figure"
              value={isPublicFigure}
              onChange={e => setIsPublicFigure(e.target.value)}
              className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-white text-gray-900"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-base font-semibold text-gray-700" htmlFor="additional-info">Additional Info <span className="text-gray-400">(optional)</span></label>
            <textarea
              id="additional-info"
              value={additionalInfo}
              onChange={e => setAdditionalInfo(e.target.value)}
              className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-white text-gray-900"
              rows={3}
              placeholder="Any additional info you'd like to provide"
            />
          </div>
          <div>
            <label className="block mb-2 text-base font-semibold text-gray-700" htmlFor="kyc-document">KYC Document</label>
            <input
              id="kyc-document"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-white text-gray-900"
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-2 text-left">{error}</div>}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-300 to-purple-400 text-white font-bold rounded-lg text-lg transition hover:from-purple-400 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload & Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
