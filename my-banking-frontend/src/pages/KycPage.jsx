import React, { useState } from 'react';
import Footer from '../components/Footer';
import { nationalities } from '../utils/nationalities';
import { useParams, useNavigate } from 'react-router-dom';
import { sendKycConfirmationEmail } from '../utils/email';

export default function KycPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [nationality, setNationality] = useState('');
  const [isPublicFigure, setIsPublicFigure] = useState('no');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [app, setApp] = useState(null);

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
      // Fetch latest app info for email
      const appRes = await fetch(`/api/applications/${id}`);
      let appData = null;
      if (appRes.ok) {
        appData = await appRes.json();
        setApp(appData);
      }
      // Send KYC confirmation email after successful upload & accept
      try {
        await sendKycConfirmationEmail({
          name: appData?.fullName || '',
          product: appData?.productType || '',
          email: appData?.email || '',
        });
      } catch (emailErr) {
        // Optionally log or show error, but don't block navigation
        console.error('Failed to send KYC confirmation email:', emailErr);
      }
      navigate('/thank-you');
    } catch (err) {
      setError('Failed to upload and accept offer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] font-sans">
      <div className="flex flex-1 flex-col md:flex-row max-w-5xl mx-auto w-full px-4 pt-[5.5rem] pb-10 gap-10">
        {/* Left column: KYC form */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-8 text-left text-purple-400">KYC Information & Document Upload</h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div>
              <label className="block mb-2 text-base font-semibold text-gray-700" htmlFor="nationality">Nationality</label>
              <select
                id="nationality"
                value={nationality}
                onChange={e => setNationality(e.target.value)}
                className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-white text-gray-900 shadow"
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
                className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-white text-gray-900 shadow"
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
                className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-white text-gray-900 shadow"
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
                className="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-white text-gray-900 shadow"
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-2 text-left">{error}</div>}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-300 to-purple-500 text-white font-bold rounded-lg text-lg shadow transition hover:from-purple-400 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Upload & Finish'}
              </button>
            </div>
          </form>
        </div>
        {/* Right column: Slogan / reassurance */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left md:pl-16">
          <div className="text-2xl font-bold text-purple-400 mb-4">Your privacy is our priority.</div>
          <div className="text-base text-gray-500">Your documents are encrypted and securely stored.</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
