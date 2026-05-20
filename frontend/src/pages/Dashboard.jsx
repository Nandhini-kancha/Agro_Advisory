import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const defaultData = [
  { name: 'Week 1', health: 40, yield: 2400 },
  { name: 'Week 2', health: 60, yield: 4567 },
  { name: 'Week 3', health: 85, yield: 6998 },
  { name: 'Week 4', health: 95, yield: 9800 },
];

export default function Dashboard() {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    // Attempt to get projection data from the recent scan
    const savedProjection = localStorage.getItem('projection');
    if (savedProjection) {
      try {
        const parsed = JSON.parse(savedProjection);
        setData(parsed);
      } catch (e) {
        console.error("Failed to parse projection data");
      }
    }
  }, []);

  return (
    <div className="animate-fade-in">
      <h2>Farm Improvement Projections</h2>
      <p style={{ color: 'var(--color-soil-brown)' }}>
        Based on your recent disease scan, here is the projected recovery plan and yield estimate.
      </p>
      <div className="glass-panel" style={{ marginTop: '2rem', height: '400px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Expected Yield & Health Recovery</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="var(--color-leaf-green)" />
            <YAxis yAxisId="right" orientation="right" stroke="var(--color-soil-light)" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="health" fill="var(--color-leaf-green)" name="Soil Health Score" />
            <Bar yAxisId="right" dataKey="yield" fill="var(--color-soil-light)" name="Estimated Yield (kg)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
