import React, { useState, useRef } from 'react';
import { scanDisease } from '../api';

export default function DiseaseScanner() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null); // Clear previous results
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const response = await scanDisease(file);
      
      if (response.error) {
        alert(response.error);
        setLoading(false);
        return;
      }

      setResult(response.prediction);
      
      // Save projection to localStorage for Dashboard
      if (response.projection) {
        localStorage.setItem('projection', JSON.stringify(response.projection));
      }
    } catch (error) {
      console.error('Error scanning disease:', error);
      alert('Failed to scan image. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Crop Disease Scanner</h2>
      <p>Upload a photo of your diseased crop leaf to get instant analysis.</p>
      
      <div 
        style={{ 
          border: '2px dashed var(--color-leaf-green)', 
          padding: '3rem', 
          textAlign: 'center', 
          borderRadius: '12px', 
          marginTop: '2rem',
          cursor: 'pointer',
          background: preview ? 'rgba(255,255,255,0.7)' : 'transparent'
        }}
        onClick={() => fileInputRef.current.click()}
      >
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
        />
        {preview ? (
          <div>
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
            <p style={{ marginTop: '1rem', color: 'var(--color-leaf-dark)' }}>Click to select a different image</p>
          </div>
        ) : (
          <p>Drag and drop your image here, or click to browse.</p>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <button 
          className="btn-primary" 
          onClick={handleUpload} 
          disabled={!file || loading}
          style={{ opacity: (!file || loading) ? 0.6 : 1 }}
        >
          {loading ? 'Analyzing...' : 'Scan Image'}
        </button>
      </div>

      {result && (
        <div className="glass-card animate-fade-in" style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-leaf-green)' }}>
          <h3 style={{ color: 'var(--color-leaf-green)' }}>Analysis Results</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            <p><strong>Disease Detected:</strong> {result.name}</p>
            <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
            <div style={{ background: 'var(--color-sand)', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Recommended Treatment:</h4>
              <p style={{ margin: 0 }}>{result.treatment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
