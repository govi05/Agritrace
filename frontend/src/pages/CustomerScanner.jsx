import React, { useState } from 'react';
import axios from 'axios';

export default function CustomerScanner() {
  const [batchId, setBatchId] = useState('');
  const [trace,   setTrace]   = useState(null);
  const [error,   setError]   = useState('');

  const handleScan = async () => {
    try {
      const res = await axios.get(`/api/customer/trace/${batchId}`);
      setTrace(res.data);
      setError('');
    } catch {
      setError('Product not found on blockchain');
    }
  };

  return (
    <div className="scanner">
      <h1>Product Trace</h1>
      <p>Seed-to-shelf journey</p>

      <div className="scan-input">
        <input
          type="text"
          placeholder="Enter batch ID or scan QR code"
          value={batchId}
          onChange={e => setBatchId(e.target.value)}
        />
        <button onClick={handleScan}>Verify</button>
      </div>

      {error && <p className="error">{error}</p>}

      {trace && (
        <div className="trace-result">
          <h2>{trace.product}</h2>
          <p>Farm: {trace.farm}</p>
          <p>Trust Score: {trace.trustScore}/100</p>
          <p>Certified: {trace.certified ? '✅ Yes' : '❌ No'}</p>

          <h3>Timeline</h3>
          {trace.timeline.map((event, i) => (
            <div key={i} className="timeline-event">
              <strong>{event.stage}</strong>
              <span>{event.date}</span>
              <p>{event.notes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
