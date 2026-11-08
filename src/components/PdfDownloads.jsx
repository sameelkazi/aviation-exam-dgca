import React from 'react';
import { Download, FileText, CheckCircle2, Printer } from 'lucide-react';

export default function PdfDownloads() {
  const pdfs = [
    {
      id: 1,
      title: "Master Formula & Exam Cheat Sheet",
      file: "/downloads/01_DGCA_Formula_Cheat_Sheet_Daivam_Mehta.pdf",
      pages: "2 Pages (Vector PDF)",
      color: "#FFE600",
      tag: "QUICK REVISION",
      description: "Complete mathematical formulas, ISA constants, altimetry conversions (QNH/QFE/QNE/QFF), density altitude, cloud base 400 × (T - Td), wind components, and all 15 Golden Mnemonics."
    },
    {
      id: 2,
      title: "METAR & TAF Weather Code Master Decoder",
      file: "/downloads/02_METAR_TAF_Decoder_Guide_Daivam_Mehta.pdf",
      pages: "2 Pages (Vector PDF)",
      color: "#00F0FF",
      tag: "WEATHER CODES",
      description: "Anatomy of raw METAR strings, complete weather phenomena matrix (TS, RA, FZFG, HZ), 4 strict CAVOK commandments, RVR decoders, and 10 real-world Indian airport exam drills."
    },
    {
      id: 3,
      title: "Complete 21-Chapter Theory & Notes Handbook",
      file: "/downloads/03_Complete_Theory_Notes_21_Chapters.pdf",
      pages: "45 Pages (Complete Book)",
      color: "#00E676",
      tag: "THEORY & NOTES",
      description: "Comprehensive synthesis of IC Joshi 7th Edition and handwritten flight cadet notes. Full 21 chapters in bullet-point keyword format with comparison tables and golden exam rules."
    },
    {
      id: 4,
      title: "DGCA 818 Questions Bank & Answer Key",
      file: "/downloads/04_DGCA_818_Questions_Bank_with_Answers.pdf",
      pages: "128 Pages (Full Bank)",
      color: "#FF4757",
      textColor: "#FFF",
      tag: "PRACTICE BANK",
      description: "All 818 DGCA CPL/ATPL past questions mapped with complete options and verified answer keys highlighted for study, mock testing, and rapid revision."
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="brutal-card" style={{ background: '#FFFFFF' }}>
        <span className="brutal-badge" style={{ background: '#FF4757', color: '#FFF' }}>OFFLINE FLIGHT BAG</span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '4px' }}>
          DOWNLOAD OFFICIAL DGCA STUDY PDFS
        </h2>
        <p style={{ fontWeight: 600, color: '#444' }}>
          Generated specifically for Captain Daivam Mehta. Download and print these crystal-clear vector PDFs for offline tablet/iPad study and classroom ground school revision.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {pdfs.map(pdf => (
          <div 
            key={pdf.id}
            className="brutal-card brutal-card-hover"
            style={{ 
              background: '#FFFFFF', 
              borderTop: `8px solid ${pdf.color}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="brutal-badge" style={{ background: pdf.color, color: pdf.textColor || '#000' }}>
                  {pdf.tag}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800 }}>
                  {pdf.pages}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '8px' }}>
                {pdf.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: '#444', lineHeight: 1.4, marginBottom: '1.25rem' }}>
                {pdf.description}
              </p>
            </div>

            <a
              href={pdf.file}
              download
              className="brutal-btn"
              style={{ 
                background: pdf.color, 
                color: pdf.textColor || '#000',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
            >
              <Download size={16} /> DOWNLOAD PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
