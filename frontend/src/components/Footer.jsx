import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ padding: '0' }}>
        <p style={{ margin: 0, fontWeight: 500 }}>&copy; {new Date().getFullYear()} AgroAdviser. All rights reserved.</p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.8 }}>Empowering farmers with AI-driven insights.</p>
      </div>
    </footer>
  );
}
