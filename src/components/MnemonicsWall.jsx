import React, { useState } from 'react';
import { MNEMONICS } from '../data/aviationData';
import { Lightbulb, Tag, Check } from 'lucide-react';

export default function MnemonicsWall() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const tags = ['ALL', ...Array.from(new Set(MNEMONICS.map(m => m.tag)))];

  const filtered = MNEMONICS.filter(m => activeFilter === 'ALL' || m.tag === activeFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="brutal-card" style={{ background: '#FFFFFF' }}>
        <span className="brutal-badge" style={{ background: '#00E676', color: '#000' }}>DGCA GOLDEN SECRETS</span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '4px' }}>
          15 GOLDEN FLIGHT METEOROLOGY MNEMONICS
        </h2>
        <p style={{ fontWeight: 600, color: '#444', marginBottom: '1rem' }}>
          Essential memory rules for Captain Daivam Mehta to crack tricky DGCA multiple-choice questions in under 10 seconds.
        </p>

        {/* Tag Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {tags.map(t => (
            <button
              key={t}
              className={`brutal-btn ${activeFilter === t ? 'brutal-btn-yellow' : 'brutal-btn-white'}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
              onClick={() => setActiveFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Flashcards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {filtered.map(item => (
          <div 
            key={item.id} 
            className="brutal-card brutal-card-hover" 
            style={{ 
              background: '#FFFFFF', 
              borderTop: `6px solid ${item.color || '#000'}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="brutal-badge" style={{ background: '#000', color: '#FFE600' }}>#{item.id}</span>
                <span className="brutal-badge" style={{ background: item.color, color: '#000' }}>{item.tag}</span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '8px' }}>
                {item.title}
              </h3>

              <div 
                style={{ 
                  background: '#FFF9C4', 
                  border: '2px solid #000', 
                  padding: '8px 12px', 
                  fontFamily: 'var(--font-mono)', 
                  fontWeight: 900, 
                  fontSize: '0.95rem',
                  color: '#B71C1C',
                  marginBottom: '10px'
                }}
              >
                ⚡ {item.rule}
              </div>

              <p style={{ fontSize: '0.85rem', color: '#333', lineHeight: 1.4, fontWeight: 500 }}>
                {item.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
