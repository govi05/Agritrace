import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    axios.get('/api/admin/analytics')
      .then(res => setAnalytics(res.data));
  }, []);

  if (!analytics) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard">
      <h1>Platform Analytics</h1>
      <p>AgriChain-v2 — Telangana Network</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{analytics.totalFarmers}</h2>
          <p>Total Farmers</p>
        </div>
        <div className="stat-card">
          <h2>{analytics.totalTransactions?.toLocaleString()}</h2>
          <p>Total Transactions</p>
        </div>
        <div className="stat-card">
          <h2>{analytics.avgTrustScore}</h2>
          <p>Avg Trust Score</p>
        </div>
        <div className="stat-card">
          <h2>{analytics.certifiedBatches}</h2>
          <p>Certified Batches</p>
        </div>
      </div>

      {/* Read-only notice — no write access */}
      <p className="notice">
        Admin view is read-only. No blockchain write access.
      </p>
    </div>
  );
}
