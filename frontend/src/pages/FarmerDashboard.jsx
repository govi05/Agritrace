import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FarmerDashboard({ farmId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`/api/farmer/${farmId}/dashboard`)
      .then(res => setData(res.data));
  }, [farmId]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h1>Farm Dashboard</h1>
      <p>Farm: {data.farmId}</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{data.trustScore}</h2>
          <p>Trust Score</p>
        </div>
        <div className="stat-card">
          <h2>{data.activeSensors}</h2>
          <p>Active Sensors</p>
        </div>
        <div className="stat-card">
          <h2>{data.totalReadings?.toLocaleString()}</h2>
          <p>Total Readings</p>
        </div>
        <div className="stat-card">
          <h2>{data.compliance}%</h2>
          <p>Compliance Rate</p>
        </div>
      </div>
    </div>
  );
}
