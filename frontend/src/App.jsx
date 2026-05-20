import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home as HomeIcon, Scan, Sprout, MessageSquare, LayoutDashboard } from 'lucide-react';
import Home from './pages/Home';
import DiseaseScanner from './pages/DiseaseScanner';
import AdvisorChat from './pages/AdvisorChat';
import Dashboard from './pages/Dashboard';
import Fertilizer from './pages/Fertilizer';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/" className="brand">🌱 AgroAdviser</Link>
        <div className="links" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><HomeIcon size={18} /> Home</Link>
          <Link to="/scanner" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Scan size={18} /> Disease Scanner</Link>
          <Link to="/fertilizer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Sprout size={18} /> Fertilizer Advice</Link>
          <Link to="/chat" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MessageSquare size={18} /> Advisor Chat</Link>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><LayoutDashboard size={18} /> Dashboard</Link>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scanner" element={<DiseaseScanner />} />
          <Route path="/fertilizer" element={<Fertilizer />} />
          <Route path="/chat" element={<AdvisorChat />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
