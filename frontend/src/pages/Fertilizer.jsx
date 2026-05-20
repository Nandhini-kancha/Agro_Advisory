import React, { useState } from 'react';
import { getFertilizerRecommendation } from '../api';

export default function Fertilizer() {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
    crop: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      // Convert numeric fields from string to Number
      const data = {
        N: Number(formData.N),
        P: Number(formData.P),
        K: Number(formData.K),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        ph: Number(formData.ph),
        rainfall: Number(formData.rainfall),
        crop: formData.crop || 'unknown'
      };
      const response = await getFertilizerRecommendation(data);
      setResult(response);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      alert('Failed to fetch recommendation. Please check the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Fertilizer Recommendation</h2>
      <p>Enter your soil nutrients and environmental parameters to get a personalized fertilizer recommendation.</p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nitrogen (N)</label>
          <input type="number" name="N" value={formData.N} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phosphorus (P)</label>
          <input type="number" name="P" value={formData.P} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Potassium (K)</label>
          <input type="number" name="K" value={formData.K} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Temperature (°C)</label>
          <input type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Humidity (%)</label>
          <input type="number" step="0.1" name="humidity" value={formData.humidity} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>pH Level</label>
          <input type="number" step="0.1" name="ph" value={formData.ph} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Rainfall (mm)</label>
          <input type="number" step="0.1" name="rainfall" value={formData.rainfall} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Crop Name (optional)</label>
          <input type="text" name="crop" value={formData.crop} onChange={handleChange} placeholder="e.g. Rice, Wheat" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '1rem' }}>
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Analyzing...' : 'Get Recommendation'}
          </button>
        </div>
      </form>

      {result && (
        <div className="glass-card animate-fade-in" style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-leaf-green)' }}>
          <h3 style={{ color: 'var(--color-leaf-green)' }}>Recommendation</h3>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>Fertilizer:</strong> <span style={{ fontSize: '1.2rem', color: 'var(--color-leaf-dark)' }}>{result.recommendation}</span></p>
            <div style={{ background: 'var(--color-sand)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Reasoning:</h4>
              <p style={{ margin: 0 }}>{result.reason}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
