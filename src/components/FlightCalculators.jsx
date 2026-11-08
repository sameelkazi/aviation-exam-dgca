import React, { useState } from 'react';
import { Calculator, Wind, Cloud, Gauge, AlertTriangle } from 'lucide-react';

export default function FlightCalculators() {
  // 1. Cloud Base
  const [cbTemp, setCbTemp] = useState(30);
  const [cbDew, setCbDew] = useState(22);
  const cloudBaseAgl = Math.max(0, (cbTemp - cbDew) * 400);

  // 2. Density Altitude
  const [fieldElev, setFieldElev] = useState(777); // Delhi elevation ~777 ft
  const [qnhVal, setQnhVal] = useState(1010);
  const [oatVal, setOatVal] = useState(38); // Hot Delhi summer
  const pressureAlt = Math.round(fieldElev + (1013.25 - qnhVal) * 30);
  const isaTempAtPA = 15 - 2 * (pressureAlt / 1000);
  const isaDev = oatVal - isaTempAtPA;
  const densityAlt = Math.round(pressureAlt + 120 * isaDev);

  // 3. Crosswind
  const [rwyHeading, setRwyHeading] = useState(280);
  const [windDir, setWindDir] = useState(310);
  const [windSpd, setWindSpd] = useState(20);
  const angleDiffRad = Math.abs(rwyHeading - windDir) * (Math.PI / 180);
  const crosswindComp = Math.round(windSpd * Math.sin(angleDiffRad));
  const headwindComp = Math.round(windSpd * Math.cos(angleDiffRad));
  const isTailwind = Math.abs(rwyHeading - windDir) > 90 && Math.abs(rwyHeading - windDir) < 270;

  // 4. Altimeter Temp Error
  const [indAlt, setIndAlt] = useState(10000);
  const [altOat, setAltOat] = useState(-20);
  const isaAtAlt = 15 - 2 * (indAlt / 1000);
  const altIsaDev = altOat - isaAtAlt;
  const tempCorrection = Math.round(4 * (indAlt / 1000) * altIsaDev);
  const trueAlt = indAlt + tempCorrection;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="brutal-card" style={{ background: '#FFFFFF' }}>
        <span className="brutal-badge" style={{ background: '#FFE600' }}>COCKPIT FLIGHT COMPUTERS</span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '4px' }}>
          DGCA NUMERICAL FLIGHT CALCULATORS
        </h2>
        <p style={{ fontWeight: 600, color: '#444' }}>
          Real-time interactive computation for all standard DGCA CPL/ATPL numerical problems.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* Calculator 1: Cloud Base */}
        <div className="brutal-card" style={{ background: '#FFFDE7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Cloud size={20} color="#F57F17" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900 }}>1. CONVECTIVE CLOUD BASE</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '12px' }}>
            Formula: <b>Base (ft AGL) = 400 × (T - Td)</b>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 800 }}>SURFACE TEMP (°C)</label>
              <input 
                type="number" 
                className="brutal-input" 
                value={cbTemp} 
                onChange={(e) => setCbTemp(Number(e.target.value))} 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 800 }}>DEW POINT (°C)</label>
              <input 
                type="number" 
                className="brutal-input" 
                value={cbDew} 
                onChange={(e) => setCbDew(Number(e.target.value))} 
              />
            </div>
          </div>

          <div className="brutal-card" style={{ background: '#FFFFFF', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888' }}>ESTIMATED BASE (AGL)</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#F57F17' }}>
              {cloudBaseAgl.toLocaleString()} FT AGL
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Spread: {cbTemp - cbDew}°C</span>
          </div>
        </div>

        {/* Calculator 2: Density Altitude */}
        <div className="brutal-card" style={{ background: '#FFEBEE' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Gauge size={20} color="#D32F2F" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900 }}>2. DENSITY ALTITUDE</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '12px' }}>
            Formula: <b>DA = PA + 120 × (OAT - ISA)</b>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 800 }}>ELEV (FT)</label>
              <input type="number" className="brutal-input" value={fieldElev} onChange={(e) => setFieldElev(Number(e.target.value))} />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 800 }}>QNH (HPA)</label>
              <input type="number" className="brutal-input" value={qnhVal} onChange={(e) => setQnhVal(Number(e.target.value))} />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 800 }}>OAT (°C)</label>
              <input type="number" className="brutal-input" value={oatVal} onChange={(e) => setOatVal(Number(e.target.value))} />
            </div>
          </div>

          <div className="brutal-card" style={{ background: '#FFFFFF', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888' }}>DENSITY ALTITUDE</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D32F2F' }}>
              {densityAlt.toLocaleString()} FT
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.75rem', fontWeight: 700, marginTop: '4px' }}>
              <span>PA: {pressureAlt} ft</span>
              <span>ISA Dev: {isaDev > 0 ? `+${isaDev.toFixed(1)}` : isaDev.toFixed(1)}°C</span>
            </div>
          </div>
        </div>

        {/* Calculator 3: Crosswind Component */}
        <div className="brutal-card" style={{ background: '#E0F7FA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Wind size={20} color="#00838F" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900 }}>3. RUNWAY CROSSWIND</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '12px' }}>
            Formula: <b>X-Wind = Speed × sin(θ)</b>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 800 }}>RWY HDG (°)</label>
              <input type="number" className="brutal-input" value={rwyHeading} onChange={(e) => setRwyHeading(Number(e.target.value))} />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 800 }}>WIND DIR (°)</label>
              <input type="number" className="brutal-input" value={windDir} onChange={(e) => setWindDir(Number(e.target.value))} />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 800 }}>WIND SPD (KT)</label>
              <input type="number" className="brutal-input" value={windSpd} onChange={(e) => setWindSpd(Number(e.target.value))} />
            </div>
          </div>

          <div className="brutal-card" style={{ background: '#FFFFFF', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888' }}>CROSSWIND COMPONENT</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00838F' }}>
              {crosswindComp} KNOTS
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>
              {isTailwind ? `⚠️ TAILWIND: ${Math.abs(headwindComp)} kts` : `HEADWIND: ${headwindComp} kts`}
            </span>
          </div>
        </div>

        {/* Calculator 4: Altimeter Temperature Error */}
        <div className="brutal-card" style={{ background: '#F3E5F5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <AlertTriangle size={20} color="#7B1FA2" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900 }}>4. ALTIMETER TEMP ERROR</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '12px' }}>
            Formula: <b>Correction = 4 × (Alt/1000) × ISA Dev</b>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 800 }}>INDICATED ALT (FT)</label>
              <input type="number" className="brutal-input" value={indAlt} onChange={(e) => setIndAlt(Number(e.target.value))} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 800 }}>OAT AT ALTITUDE (°C)</label>
              <input type="number" className="brutal-input" value={altOat} onChange={(e) => setAltOat(Number(e.target.value))} />
            </div>
          </div>

          <div className="brutal-card" style={{ background: '#FFFFFF', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888' }}>TRUE ALTITUDE</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#7B1FA2' }}>
              {trueAlt.toLocaleString()} FT
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: tempCorrection < 0 ? '#B71C1C' : '#1B5E20' }}>
              Error: {tempCorrection > 0 ? `+${tempCorrection}` : tempCorrection} ft ({altIsaDev < 0 ? 'Aircraft is LOWER than indicated!' : 'Aircraft is higher'})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
