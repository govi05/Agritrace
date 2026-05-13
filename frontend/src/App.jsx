import React, { useState } from 'react';
import FarmerDashboard  from './pages/FarmerDashboard';
import CustomerScanner  from './pages/CustomerScanner';
import AdminDashboard   from './pages/AdminDashboard';

export default function App() {
  const [role, setRole] = useState('');

  if (!role) {
    return (
      <div className="signin">
        <h1>AgriTrace</h1>
        <p>Access your portal below</p>
        <div className="role-buttons">
          <button onClick={() => setRole('farmer')}>
            Farmer — Sensor dashboard & crop logs
          </button>
          <button onClick={() => setRole('customer')}>
            Customer — Scan & product trace
          </button>
          <button onClick={() => setRole('admin')}>
            Admin — Platform analytics & contracts
          </button>
        </div>
        <p className="version">
          AgriTrace v1.0 · AgriChain-v2 · NPOP Compliant
        </p>
      </div>
    );
  }

  return (
    <div className="app">
      <nav>
        <span>AgriTrace</span>
        <button onClick={() => setRole('')}>Sign Out</button>
      </nav>

      {role === 'farmer'   && <FarmerDashboard farmId="FARM-AP-001" />}
      {role === 'customer' && <CustomerScanner />}
      {role === 'admin'    && <AdminDashboard />}
    </div>
  );
}
