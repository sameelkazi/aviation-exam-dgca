import React, { useState } from 'react';
import Latex from './Latex';
import { Calculator, Wind, Cloud, Gauge, AlertTriangle, BookOpen, Sigma } from 'lucide-react';

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span className="brutal-badge" style={{ background: '#FFE600' }}>COCKPIT FLIGHT COMPUTERS</span>
            <h2 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', fontWeight: 900, textTransform: 'uppercase', marginTop: '4px' }}>
              DGCA NUMERICAL CALCULATORS & LaTeX FORMULAS
            </h2>
          </div>
          <span className="brutal-badge" style={{ background: '#00F0FF', color: '#000' }}>LaTeX POWERED</span>
        </div>
        <p style={{ fontWeight: 600, color: '#444', marginTop: '4px' }}>
          Real-time interactive computation with mathematical LaTeX formulas for all standard DGCA CPL & ATPL exam numericals.
        </p>
      </div>

      {/* 4 Interactive Calculators */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }}>
        {/* Calculator 1: Cloud Base */}
        <div className="brutal-card" style={{ background: '#FFFDE7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Cloud size={20} color="#F57F17" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900 }}>1. CONVECTIVE CLOUD BASE</h3>
          </div>
          
          <div className="math-display-card">
            <Latex math="\text{Base}_{\text{AGL}} = 400 \times (T - T_d) = \frac{T - T_d}{2.5} \times 1000" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '12px 0' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 800 }}>SURFACE TEMP T (°C)</label>
              <input 
                type="number" 
                className="brutal-input" 
                value={cbTemp} 
                onChange={(e) => setCbTemp(Number(e.target.value))} 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 800 }}>DEW POINT T_d (°C)</label>
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
            <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900, color: '#F57F17' }}>
              {cloudBaseAgl.toLocaleString()} FT AGL
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Spread: {cbTemp - cbDew}°C</span>
          </div>
        </div>

        {/* Calculator 2: Density Altitude */}
        <div className="brutal-card" style={{ background: '#FFEBEE' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Gauge size={20} color="#D32F2F" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900 }}>2. DENSITY ALTITUDE</h3>
          </div>
          
          <div className="math-display-card">
            <Latex math="DA = PA + 120 \times (OAT - ISA_{PA})" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', margin: '12px 0' }}>
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
            <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900, color: '#D32F2F' }}>
              {densityAlt.toLocaleString()} FT
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.75rem', fontWeight: 700, marginTop: '4px', flexWrap: 'wrap' }}>
              <span>PA: {pressureAlt} ft</span>
              <span>ISA Dev: {isaDev > 0 ? `+${isaDev.toFixed(1)}` : isaDev.toFixed(1)}°C</span>
            </div>
          </div>
        </div>

        {/* Calculator 3: Crosswind Component */}
        <div className="brutal-card" style={{ background: '#E0F7FA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Wind size={20} color="#00838F" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900 }}>3. RUNWAY CROSSWIND</h3>
          </div>
          
          <div className="math-display-card">
            <Latex math="V_{\text{cross}} = V_{\text{wind}} \cdot \sin(\theta), \quad V_{\text{head}} = V_{\text{wind}} \cdot \cos(\theta)" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', margin: '12px 0' }}>
            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 800 }}>RWY (°)</label>
              <input type="number" className="brutal-input" value={rwyHeading} onChange={(e) => setRwyHeading(Number(e.target.value))} />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 800 }}>WIND (°)</label>
              <input type="number" className="brutal-input" value={windDir} onChange={(e) => setWindDir(Number(e.target.value))} />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 800 }}>SPD (KT)</label>
              <input type="number" className="brutal-input" value={windSpd} onChange={(e) => setWindSpd(Number(e.target.value))} />
            </div>
          </div>

          <div className="brutal-card" style={{ background: '#FFFFFF', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888' }}>CROSSWIND COMPONENT</span>
            <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900, color: '#00838F' }}>
              {crosswindComp} KNOTS
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>
              {isTailwind ? `⚠️ TAILWIND: ${Math.abs(headwindComp)} kts` : `HEADWIND: ${headwindComp} kts`}
            </span>
          </div>
        </div>

        {/* Calculator 4: Altimeter Temperature Error */}
        <div className="brutal-card" style={{ background: '#F3E5F5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <AlertTriangle size={20} color="#7B1FA2" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900 }}>4. ALTIMETER TEMP ERROR</h3>
          </div>
          
          <div className="math-display-card">
            <Latex math="\Delta h = 4 \times \left(\frac{h_{\text{ind}}}{1000}\right) \times \Delta ISA" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '12px 0' }}>
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
            <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900, color: '#7B1FA2' }}>
              {trueAlt.toLocaleString()} FT
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: tempCorrection < 0 ? '#B71C1C' : '#1B5E20' }}>
              Error: {tempCorrection > 0 ? `+${tempCorrection}` : tempCorrection} ft ({altIsaDev < 0 ? 'Aircraft LOWER than indicated!' : 'Aircraft higher'})
            </span>
          </div>
        </div>
      </div>

      {/* Master LaTeX Formula Reference Sheet */}
      <div className="brutal-card" style={{ background: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Sigma size={22} color="#0D47A1" />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase' }}>
            MASTER AVIATION METEOROLOGY LaTeX EQUATIONS & DERIVATIONS
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1rem' }}>
          {/* Equation 1: Geostrophic Wind */}
          <div className="brutal-card" style={{ background: '#FAF8F5' }}>
            <span className="brutal-badge" style={{ background: '#0D47A1', color: '#FFF' }}>WINDS & FORCES</span>
            <h4 style={{ fontWeight: 800, margin: '6px 0' }}>Geostrophic Wind Equation</h4>
            <div className="math-display-card">
              <Latex math="V_g = \frac{1}{2\Omega\rho\sin\phi}\frac{\Delta P}{\Delta n} = \frac{1}{\rho f}\frac{\Delta P}{\Delta n}" />
            </div>
            <p style={{ fontSize: '0.8rem', color: '#555' }}>
              Where <Latex math="f = 2\Omega\sin\phi" inline={true} /> is the Coriolis parameter, <Latex math="\rho" inline={true} /> is air density, and <Latex math="\Delta P/\Delta n" inline={true} /> is horizontal pressure gradient.
            </p>
          </div>

          {/* Equation 2: Local Speed of Sound & Mach */}
          <div className="brutal-card" style={{ background: '#FAF8F5' }}>
            <span className="brutal-badge" style={{ background: '#E65100', color: '#FFF' }}>SPEED OF SOUND & MACH</span>
            <h4 style={{ fontWeight: 800, margin: '6px 0' }}>Local Speed of Sound (LSS)</h4>
            <div className="math-display-card">
              <Latex math="a = \sqrt{\gamma R T_K} \approx 38.94 \times \sqrt{T_K} \quad (\text{kts})" />
            </div>
            <div className="math-display-card">
              <Latex math="M = \frac{\text{TAS}}{a} = \frac{\text{TAS}}{38.94 \times \sqrt{T_K}}" />
            </div>
          </div>

          {/* Equation 3: Hydrostatic Equation */}
          <div className="brutal-card" style={{ background: '#FAF8F5' }}>
            <span className="brutal-badge" style={{ background: '#2E7D32', color: '#FFF' }}>HYDROSTATICS</span>
            <h4 style={{ fontWeight: 800, margin: '6px 0' }}>Hydrostatic Equation & Pressure Lap</h4>
            <div className="math-display-card">
              <Latex math="\frac{dP}{dz} = -\rho g = -\frac{P g}{R T}" />
            </div>
            <p style={{ fontSize: '0.8rem', color: '#555' }}>
              Rule of thumb: <Latex math="1\text{ hPa} \approx 27\text{ to }30\text{ ft}" inline={true} /> at Mean Sea Level, increasing to <Latex math="1\text{ hPa} \approx 50\text{ ft}" inline={true} /> at FL180.
            </p>
          </div>

          {/* Equation 4: Radar Reflectivity */}
          <div className="brutal-card" style={{ background: '#FAF8F5' }}>
            <span className="brutal-badge" style={{ background: '#6A1B9A', color: '#FFF' }}>RADAR PHYSICS</span>
            <h4 style={{ fontWeight: 800, margin: '6px 0' }}>Rayleigh Scattering & Reflectivity</h4>
            <div className="math-display-card">
              <Latex math="Z = \sum_{i} D_i^6 \quad (\text{mm}^6/\text{m}^3)" />
            </div>
            <div className="math-display-card">
              <Latex math="\text{dBZ} = 10 \log_{10}\left(\frac{Z}{1\text{ mm}^6/\text{m}^3}\right)" />
            </div>
            <p style={{ fontSize: '0.8rem', color: '#555' }}>
              Reflectivity depends on droplet diameter to the 6th power. Hail or large wet drops produce explosive radar returns.
            </p>
          </div>

          {/* Equation 5: Adiabatic Lapse Rates */}
          <div className="brutal-card" style={{ background: '#FAF8F5' }}>
            <span className="brutal-badge" style={{ background: '#C2185B', color: '#FFF' }}>THERMODYNAMICS</span>
            <h4 style={{ fontWeight: 800, margin: '6px 0' }}>Standard Lapse Rates Comparison</h4>
            <div className="math-display-card">
              <Latex math="\Gamma_d = \frac{g}{c_p} \approx 9.8^\circ\text{C}/\text{km} \approx 3.0^\circ\text{C}/1000\text{ ft}" />
            </div>
            <div className="math-display-card">
              <Latex math="\Gamma_s \approx 1.5^\circ\text{C}/1000\text{ ft} \quad (4^\circ\text{C to }9^\circ\text{C}/\text{km})" />
            </div>
          </div>

          {/* Equation 6: QFE to QNH */}
          <div className="brutal-card" style={{ background: '#FAF8F5' }}>
            <span className="brutal-badge" style={{ background: '#FF5722', color: '#FFF' }}>ALTIMETRY DERIVATION</span>
            <h4 style={{ fontWeight: 800, margin: '6px 0' }}>QNH / QFE / QFF Relationships</h4>
            <div className="math-display-card">
              <Latex math="\text{QNH} = \text{QFE} + \frac{\text{Elevation (ft)}}{30\text{ ft/hPa}}" />
            </div>
            <p style={{ fontSize: '0.8rem', color: '#555' }}>
              <b>QFE:</b> Pressure at airfield datum.<br />
              <b>QNH:</b> Reduced to MSL using standard ISA column.<br />
              <b>QFF:</b> Reduced to MSL using actual OAT & isotherm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
