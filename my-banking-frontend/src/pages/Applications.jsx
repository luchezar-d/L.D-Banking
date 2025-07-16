import React, { useEffect, useState } from 'react';
import { getAllApplications } from '../api/applications';

export default function Applications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const fetchApps = () => {
    setLoading(true);
    getAllApplications()
      .then(res => {
        setApps(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Failed to fetch applications:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    setDeleting(true);
    try {
      await fetch(`/api/applications/${id}`, { method: 'DELETE' });
      fetchApps();
    } catch (err) {
      alert('Failed to delete application');
    }
    setDeleting(false);
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Delete ALL applications?')) return;
    setDeleting(true);
    try {
      await fetch('/api/applications', { method: 'DELETE' });
      fetchApps();
    } catch (err) {
      alert('Failed to delete all applications');
    }
    setDeleting(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f8ff] flex flex-col w-full">
      <main className="w-full max-w-screen-xl mx-auto flex flex-col items-center justify-center py-12 px-4 md:px-8">
        <section className="w-full bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">All Applications</h1>
          <button
            onClick={handleDeleteAll}
            disabled={deleting || loading || apps.length === 0}
            className="px-6 py-2 rounded-lg border-2 border-red-400 text-red-500 font-semibold bg-white hover:bg-red-50 hover:text-white hover:bg-gradient-to-r hover:from-red-400 hover:to-red-600 hover:border-red-600 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete All
          </button>
        </div>
        {loading ? (
          <p className="text-gray-500 text-center py-8">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left rounded-lg overflow-hidden bg-transparent">
              <thead>
                <tr className="bg-[#f3f3fa] text-gray-700">
                  <th className="py-3 px-4 font-semibold">Full Name</th>
                  <th className="py-3 px-4 font-semibold">Email</th>
                  <th className="py-3 px-4 font-semibold">Product</th>
                  <th className="py-3 px-4 font-semibold">Amount</th>
                  <th className="py-3 px-4 font-semibold">City</th>
                  <th className="py-3 px-4 font-semibold">Postal Code</th>
                  <th className="py-3 px-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apps.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-gray-400 py-8">No applications found.</td>
                  </tr>
                ) : (
                  apps.map(app => (
                    <tr key={app._id} className="border-b border-gray-100 hover:bg-[#f3f3fa] transition">
                      <td className="py-3 px-4 text-gray-900">{app.fullName}</td>
                      <td className="py-3 px-4 text-gray-900">{app.email}</td>
                      <td className="py-3 px-4 text-gray-900">{app.productType}</td>
                      <td className="py-3 px-4 text-gray-900">{app.amount}</td>
                      <td className="py-3 px-4 text-gray-900">{app.city}</td>
                      <td className="py-3 px-4 text-gray-900">{app.postalCode}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDelete(app._id)}
                          disabled={deleting}
                          className="px-4 py-2 rounded border-2 border-red-400 text-red-500 font-semibold bg-white hover:bg-red-50 hover:text-white hover:bg-gradient-to-r hover:from-red-400 hover:to-red-600 hover:border-red-600 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        </section>
      </main>
    </div>
  );
}
