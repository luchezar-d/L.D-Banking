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
    <div style={{ padding: '2rem' }}>
      <h1>All Applications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Product</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apps.map(app => (
                <tr key={app._id}>
                  <td>{app.fullName}</td>
                  <td>{app.email}</td>
                  <td>{app.productType}</td>
                  <td>{app.status}</td>
                  <td>
                    <button onClick={() => handleDelete(app._id)} disabled={deleting} style={{ color: 'red' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleDeleteAll} disabled={deleting || apps.length === 0} style={{ marginTop: 16, color: 'red' }}>
            Delete All
          </button>
        </>
      )}
    </div>
  );
}
