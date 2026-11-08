import React, { useState } from 'react';
import { CHAPTERS_LIST } from '../data/aviationData';
import { BookOpen, Search, ExternalLink, ChevronRight } from 'lucide-react';

export default function ChaptersExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(CHAPTERS_LIST[0]);

  const filtered = CHAPTERS_LIST.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.badge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="brutal-card" style={{ background: '#FFFFFF' }}>
        <span className="brutal-badge" style={{ background: '#00F0FF', color: '#000' }}>IC JOSHI 7TH EDITION</span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '4px' }}>
          21-CHAPTER AVIATION METEOROLOGY SYLLABUS
        </h2>
        <p style={{ fontWeight: 600, color: '#444', marginBottom: '1rem' }}>
          Every syllabus module organized with key high-yield exam takeaways, bullet-point keywords, and question bank mappings.
        </p>

        <input 
          type="text"
          className="brutal-input"
          placeholder="Filter chapters e.g. 'monsoon', 'icing', 'thunderstorm', 'altimetry', 'radar'..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
        {filtered.map(chap => (
          <div 
            key={chap.id}
            className="brutal-card brutal-card-hover"
            style={{ 
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="brutal-badge" style={{ background: '#000', color: '#FFE600' }}>
                  CH {chap.id < 10 ? `0${chap.id}` : chap.id}
                </span>
                <span className="brutal-badge" style={{ background: '#E0F7FA', color: '#006064' }}>
                  {chap.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '8px' }}>
                {chap.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '1rem' }}>
                Complete DGCA theory, mathematical formulas, and IC Joshi syllabus boundaries.
              </p>
            </div>

            <a
              href={`https://github.com/sameelkazi/aviation-exam-dgca/blob/main/chapters/${chap.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn brutal-btn-white"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', justifyContent: 'space-between' }}
            >
              <span>READ CHAPTER NOTES</span>
              <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
