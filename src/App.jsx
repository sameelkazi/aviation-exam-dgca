import React, { useState } from 'react';
import CockpitHeader from './components/CockpitHeader';
import QuizSimulator from './components/QuizSimulator';
import MetarDecoder from './components/MetarDecoder';
import FlightCalculators from './components/FlightCalculators';
import MnemonicsWall from './components/MnemonicsWall';
import ChaptersExplorer from './components/ChaptersExplorer';
import PdfDownloads from './components/PdfDownloads';
import { 
  CheckSquare, Radio, Calculator, BookOpen, 
  Lightbulb, Download 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz', 'metar', 'calc', 'mnemonics', 'chapters', 'downloads'

  return (
    <div>
      <div className="app-container">
        {/* Hero Cockpit Header */}
        <CockpitHeader currentTab={activeTab} setTab={setActiveTab} />

        {/* Brutalist Navigation Tab Bar */}
        <nav className="tab-bar">
          <button 
            className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            <CheckSquare size={16} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />
            🎯 EXAM SIMULATOR (818 Qs)
          </button>

          <button 
            className={`tab-btn ${activeTab === 'metar' ? 'active' : ''}`}
            onClick={() => setActiveTab('metar')}
          >
            <Radio size={16} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />
            📡 METAR / TAF DECODER
          </button>

          <button 
            className={`tab-btn ${activeTab === 'calc' ? 'active' : ''}`}
            onClick={() => setActiveTab('calc')}
          >
            <Calculator size={16} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />
            📐 FLIGHT COMPUTERS
          </button>

          <button 
            className={`tab-btn ${activeTab === 'mnemonics' ? 'active' : ''}`}
            onClick={() => setActiveTab('mnemonics')}
          >
            <Lightbulb size={16} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />
            🧠 15 GOLDEN MNEMONICS
          </button>

          <button 
            className={`tab-btn ${activeTab === 'chapters' ? 'active' : ''}`}
            onClick={() => setActiveTab('chapters')}
          >
            <BookOpen size={16} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />
            📖 21 CHAPTERS
          </button>

          <button 
            className={`tab-btn ${activeTab === 'downloads' ? 'active' : ''}`}
            onClick={() => setActiveTab('downloads')}
            style={{ background: activeTab === 'downloads' ? '#FF4757' : '#FFFFFF', color: activeTab === 'downloads' ? '#FFF' : '#000' }}
          >
            <Download size={16} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />
            📥 DOWNLOAD 4 PDFS
          </button>
        </nav>

        {/* Tab Content Display */}
        <main style={{ minHeight: '500px' }}>
          {activeTab === 'quiz' && <QuizSimulator />}
          {activeTab === 'metar' && <MetarDecoder />}
          {activeTab === 'calc' && <FlightCalculators />}
          {activeTab === 'mnemonics' && <MnemonicsWall />}
          {activeTab === 'chapters' && <ChaptersExplorer />}
          {activeTab === 'downloads' && <PdfDownloads />}
        </main>

        {/* Cockpit Footer */}
        <footer style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '3px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          <div>
            <b>FLIGHT DECK:</b> CAPT. DAIVAM MEHTA | DGCA CPL/ATPL GROUND EXAMINATION SUITE
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a 
              href="https://github.com/sameelkazi/aviation-exam-dgca" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> GITHUB REPO
            </a>
            <span>•</span>
            <span>VERCEL HOSTED</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
