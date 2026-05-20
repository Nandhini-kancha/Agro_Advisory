import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scan, Sprout, MessageSquare, ArrowRight } from 'lucide-react';

const useTypewriter = (text, speed = 100) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayText(''); // Reset
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayText;
};

export default function Home() {
  const headingText = useTypewriter("Welcome to AgroAdviser", 100);

  return (
    <div className="animate-fade-in">
      <section className="hero-section">
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', minHeight: '4.2rem', color: 'var(--color-leaf-dark)' }}>
          {headingText}{headingText !== "Welcome to AgroAdviser" && <span className="cursor-blink">|</span>}
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-soil-brown)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: '1.8' }}>
          Your intelligent farming companion. Harness the power of AI to instantly identify crop diseases and receive customized fertilizer recommendations tailored to your soil.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/scanner" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}>
            <Scan size={20} /> Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section style={{ padding: '2rem 0' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--color-soil-dark)', marginBottom: '1rem' }}>Our Features</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-soil-brown)', maxWidth: '600px', margin: '0 auto 2rem' }}>Discover the tools we offer to help you maximize your crop yield and maintain healthy plants.</p>
        
        <div className="features-grid">
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ backgroundColor: 'rgba(46, 139, 87, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--color-leaf-green)' }}>
              <Scan size={40} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Disease Scanner</h3>
            <p style={{ color: 'var(--color-soil-brown)', marginBottom: '1.5rem', flexGrow: 1 }}>
              Upload a photo of your crop leaf and our AI will instantly detect diseases and suggest actionable remedies.
            </p>
            <Link to="/scanner" className="btn-primary" style={{ textDecoration: 'none', width: '100%' }}>Try Scanner</Link>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ backgroundColor: 'rgba(139, 90, 43, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--color-soil-light)' }}>
              <Sprout size={40} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Fertilizer Advice</h3>
            <p style={{ color: 'var(--color-soil-brown)', marginBottom: '1.5rem', flexGrow: 1 }}>
              Input your soil's NPK and pH values to get accurate, personalized fertilizer recommendations for your crops.
            </p>
            <Link to="/fertilizer" className="btn-primary" style={{ textDecoration: 'none', background: 'var(--color-leaf-dark)', width: '100%' }}>Get Advice</Link>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ backgroundColor: 'rgba(92, 64, 51, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--color-soil-brown)' }}>
              <MessageSquare size={40} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Advisor Chat</h3>
            <p style={{ color: 'var(--color-soil-brown)', marginBottom: '1.5rem', flexGrow: 1 }}>
              Have questions? Chat directly with our AI farming assistant for general agricultural guidance and support.
            </p>
            <Link to="/chat" className="btn-primary" style={{ textDecoration: 'none', background: 'var(--color-soil-light)', width: '100%' }}>Start Chat</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
