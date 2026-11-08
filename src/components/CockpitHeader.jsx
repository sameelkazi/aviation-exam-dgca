import React, { useState, useEffect } from 'react';
import { Plane, Clock, ShieldCheck, Compass, Award } from 'lucide-react';

export default function CockpitHeader({ currentTab, setTab }) {
  const [utcTime, setUtcTime] = useState('');
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().substring(11, 19) + ' UTC');
      setIstTime(now.toLocaleTimeString('en-IN', { hour12: false, timeZone: 'Asia/Kolkata' }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header style={{ marginBottom: '1.5rem' }}>
      {/* Top Black Avionics Status Bar */}
      <div className="cockpit-ticker">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="status-indicator"></span>
          <span>FLIGHT DECK: LIVE</span>
          <span style={{ color: '#888' }}>|</span>
          <span style={{ color: '#00F0FF' }}>DGCA CPL/ATPL READY</span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <span><Clock size={12} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />{utcTime}</span>
          <span style={{ color: '#FF9F1A' }}>{istTime}</span>
        </div>
      </div>

      {/* Main Brutalist Hero Banner */}
      <div className="brutal-card" style={{ marginTop: '1rem', background: '#FFE600', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="brutal-badge" style={{ background: '#000', color: '#FFE600' }}>CALLSIGN: DAIVAM MEHTA</span>
              <span className="brutal-badge" style={{ background: '#00F0FF', color: '#000' }}>DGCA TARGET: 90%+</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              CADET PILOT DAIVAM MEHTA ✈️
            </h1>
            <p style={{ fontWeight: 700, fontSize: '1rem', marginTop: '6px', color: '#111' }}>
              Aviation Meteorology Ground School & 818-Question Master Exam Cockpit
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
            <div className="brutal-badge" style={{ background: '#00E676', color: '#000', fontSize: '0.8rem' }}>
              ✓ 818 DGCA QUESTIONS
            </div>
            <div className="brutal-badge" style={{ background: '#FFF', color: '#000', fontSize: '0.8rem' }}>
              ✓ IC JOSHI 7TH ED. + NOTES
            </div>
            <div className="brutal-badge" style={{ background: '#FF4757', color: '#FFF', fontSize: '0.8rem' }}>
              ✓ 15 GOLDEN MNEMONICS
            </div>
          </div>
        </div>

        {/* Action Bar inside Hero - Responsive Touch Grid */}
        <div style={{ 
          marginTop: '1.25rem', 
          paddingTop: '1rem', 
          borderTop: '2px solid #000', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
          gap: '0.6rem', 
          width: '100%' 
        }}>
          <button 
            className="brutal-btn brutal-btn-white" 
            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem', width: '100%' }}
            onClick={() => setTab('quiz')}
          >
            🎯 50-Q MOCK
          </button>
          <button 
            className="brutal-btn brutal-btn-cyan" 
            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem', width: '100%' }}
            onClick={() => setTab('metar')}
          >
            📡 LIVE METAR
          </button>
          <button 
            className="brutal-btn brutal-btn-green" 
            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem', width: '100%' }}
            onClick={() => setTab('calc')}
          >
            📐 CALCULATORS
          </button>
          <button 
            className="brutal-btn brutal-btn-red" 
            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem', width: '100%' }}
            onClick={() => setTab('downloads')}
          >
            📥 4 PDFS
          </button>
        </div>
      </div>
    </header>
  );
}
