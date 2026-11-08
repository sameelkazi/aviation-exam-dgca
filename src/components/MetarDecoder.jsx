import React, { useState } from 'react';
import { METAR_PRESETS } from '../data/aviationData';
import { Compass, Wind, Eye, CloudRain, Thermometer, Gauge, CheckCheck, AlertCircle } from 'lucide-react';

export default function MetarDecoder() {
  const [rawMetar, setRawMetar] = useState(METAR_PRESETS[0].code);

  // Simple yet robust regex-based parser for METAR elements
  const decodeMetar = (text) => {
    const tokens = text.trim().replace(/=/g, '').split(/\s+/);
    const result = {
      type: 'METAR',
      station: '',
      time: '',
      wind: '',
      vis: '',
      rvr: '',
      weather: [],
      clouds: [],
      tempDew: '',
      qnh: '',
      trend: '',
      isCavok: false
    };

    tokens.forEach((t) => {
      if (t === 'METAR' || t === 'SPECI') {
        result.type = t;
      } else if (!result.station && /^[A-Z]{4}$/.test(t)) {
        result.station = t;
      } else if (/^\d{6}Z$/.test(t)) {
        const day = t.substring(0, 2);
        const hour = t.substring(2, 4);
        const min = t.substring(4, 6);
        result.time = `Day ${day} at ${hour}:${min} UTC (${(parseInt(hour, 10) + 5) % 24}:${String((parseInt(min, 10) + 30) % 60).padStart(2, '0')} IST approx)`;
      } else if (/^(\d{3}|VRB)\d{2,3}(G\d{2,3})?KT$/.test(t)) {
        const m = t.match(/^(\d{3}|VRB)(\d{2,3})(?:G(\d{2,3}))?KT$/);
        const dir = m[1] === 'VRB' ? 'Variable' : `${m[1]}° True`;
        const spd = `${m[2]} knots`;
        const gust = m[3] ? `, Gusting to ${m[3]} knots` : '';
        result.wind = `${dir} at ${spd}${gust}`;
      } else if (/^\d{3}V\d{3}$/.test(t)) {
        result.wind += ` (Varying between ${t.split('V')[0]}° and ${t.split('V')[1]}°)`;
      } else if (t === 'CAVOK') {
        result.isCavok = true;
        result.vis = '10 km or more (CAVOK)';
        result.clouds.push('No clouds below 5,000 ft or MSA; No CB/TCU');
      } else if (/^\d{4}$/.test(t)) {
        const visM = parseInt(t, 10);
        result.vis = visM === 9999 ? '10 km or more (Clear)' : `${visM} meters`;
      } else if (/^R\d{2}[LCR]?\/\d{4}[UDN]?$/.test(t) || /^R\d{2}[LCR]?\/[MP]?\d{4}(?:V[MP]?\d{4})?[UDN]?$/.test(t)) {
        result.rvr = t;
      } else if (/^(FEW|SCT|BKN|OVC|VV)\d{3}(CB|TCU)?$/.test(t)) {
        const amt = t.substring(0, 3);
        const hgt = parseInt(t.substring(3, 6), 10) * 100;
        const cb = t.includes('CB') ? ' [CUMULONIMBUS - Severe Hazard!]' : t.includes('TCU') ? ' [Towering Cumulus]' : '';
        const amtDesc = amt === 'FEW' ? 'Few (1-2 oktas)' : amt === 'SCT' ? 'Scattered (3-4 oktas)' : amt === 'BKN' ? 'Broken (5-7 oktas - CEILING)' : amt === 'OVC' ? 'Overcast (8 oktas - CEILING)' : 'Vertical Visibility';
        result.clouds.push(`${amtDesc} at ${hgt.toLocaleString()} ft AGL${cb}`);
      } else if (/^(M?\d{2})\/(M?\d{2})$/.test(t)) {
        const parts = t.split('/');
        const temp = parts[0].replace('M', '-');
        const dew = parts[1].replace('M', '-');
        const spread = parseInt(temp, 10) - parseInt(dew, 10);
        const estBase = Math.max(0, spread * 400);
        result.tempDew = `Air Temp: ${temp}°C | Dewpoint: ${dew}°C (Spread: ${spread}°C → Est. Convective Cloud Base: ~${estBase} ft AGL)`;
      } else if (/^Q\d{4}$/.test(t)) {
        const qVal = t.substring(1);
        result.qnh = `${qVal} hPa (${(parseFloat(qVal) * 0.02953).toFixed(2)} inHg)`;
      } else if (/^A\d{4}$/.test(t)) {
        const inVal = (parseInt(t.substring(1), 10) / 100).toFixed(2);
        result.qnh = `${inVal} inHg`;
      } else if (['NOSIG', 'BECMG', 'TEMPO'].includes(t)) {
        result.trend = t === 'NOSIG' ? 'NOSIG (No significant change expected next 2 hours)' : t;
      } else if (/^[+-]?(TS|SH|FZ)?(RA|DZ|SN|SG|PL|GR|GS|FG|BR|HZ|FU|VA|DU|SA|SQ|SS)/.test(t)) {
        result.weather.push(t);
      }
    });

    return result;
  };

  const decoded = decodeMetar(rawMetar);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="brutal-card" style={{ background: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <span className="brutal-badge" style={{ background: '#00F0FF', color: '#000' }}>DECODER STUDIO</span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '4px' }}>
              LIVE METAR / TAF COCKPIT DECODER
            </h2>
          </div>
          <span className="brutal-badge" style={{ background: '#00E676', color: '#000' }}>ICAO ANNEX 3 STANDARD</span>
        </div>

        <p style={{ fontWeight: 600, color: '#444', marginBottom: '1rem' }}>
          Paste any raw aviation meteorological code or click an airport scenario below to see an instant decoded flight deck analysis:
        </p>

        {/* Airport Presets */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.25rem' }}>
          {METAR_PRESETS.map((p, idx) => (
            <button
              key={idx}
              className="brutal-btn brutal-btn-white"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
              onClick={() => setRawMetar(p.code)}
            >
              📍 {p.airport.split(',')[0]}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div style={{ position: 'relative' }}>
          <textarea
            className="brutal-input"
            rows="3"
            value={rawMetar}
            onChange={(e) => setRawMetar(e.target.value)}
            style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}
          />
        </div>
      </div>

      {/* Decoded Output Cards */}
      <div className="brutal-card" style={{ background: '#FAF8F5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <span className="brutal-badge" style={{ background: '#FFE600' }}>DECODED FLIGHT DISPATCH</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800 }}>
            STATION: {decoded.station || 'UNKNOWN'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
          {/* Station & Time */}
          <div className="brutal-card" style={{ background: '#FFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 900, marginBottom: '6px', color: '#0D47A1' }}>
              <Compass size={18} /> STATION & OBSERVATION TIME
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700 }}>
              ICAO Code: <b>{decoded.station || 'N/A'}</b>
            </p>
            <p style={{ fontSize: '0.85rem', color: '#333', marginTop: '4px' }}>
              {decoded.time || 'Timestamp pending'}
            </p>
          </div>

          {/* Wind */}
          <div className="brutal-card" style={{ background: '#FFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 900, marginBottom: '6px', color: '#E65100' }}>
              <Wind size={18} /> SURFACE WIND CONDITIONS
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700 }}>
              {decoded.wind || 'Calm (00000KT)'}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>
              Direction is reported in <b>Degrees True</b> (ATIS / Tower reports Magnetic).
            </p>
          </div>

          {/* Visibility & RVR */}
          <div className="brutal-card" style={{ background: '#FFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 900, marginBottom: '6px', color: '#2E7D32' }}>
              <Eye size={18} /> VISIBILITY & RUNWAY VISUAL RANGE
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700 }}>
              Prevailing Visibility: <b>{decoded.vis || 'Reported in Group'}</b>
            </p>
            {decoded.rvr && (
              <p style={{ fontSize: '0.85rem', color: '#B71C1C', fontWeight: 700, marginTop: '4px' }}>
                RVR: {decoded.rvr}
              </p>
            )}
          </div>

          {/* Weather Phenomena */}
          <div className="brutal-card" style={{ background: '#FFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 900, marginBottom: '6px', color: '#6A1B9A' }}>
              <CloudRain size={18} /> SIGNIFICANT WEATHER PHENOMENA
            </div>
            {decoded.weather.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {decoded.weather.map((w, idx) => (
                  <span key={idx} className="brutal-badge" style={{ background: '#FF4757', color: '#FFF' }}>
                    {w}
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.85rem', color: '#444' }}>Nil significant weather reported.</p>
            )}
          </div>

          {/* Clouds */}
          <div className="brutal-card" style={{ background: '#FFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 900, marginBottom: '6px', color: '#1565C0' }}>
              ☁️ CLOUD LAYERS & CEILING
            </div>
            {decoded.clouds.length > 0 ? (
              <ul style={{ listStyle: 'none', fontSize: '0.85rem', fontWeight: 700 }}>
                {decoded.clouds.map((c, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>• {c}</li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: '0.85rem', color: '#444' }}>No cloud detected / NSC</p>
            )}
          </div>

          {/* Temperature, Dewpoint & QNH */}
          <div className="brutal-card" style={{ background: '#FFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 900, marginBottom: '6px', color: '#D84315' }}>
              <Gauge size={18} /> THERMAL & ALTIMETER SETTING
            </div>
            <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>
              {decoded.tempDew || 'Temp/Dewpoint not parsed'}
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 900, marginTop: '6px', color: '#0D47A1' }}>
              QNH: {decoded.qnh || 'Standard'}
            </p>
          </div>
        </div>

        {/* TREND forecast banner */}
        {decoded.trend && (
          <div className="brutal-card" style={{ background: '#FFFDE7', marginTop: '1rem', border: '2px solid #000' }}>
            <span style={{ fontWeight: 900 }}>2-HOUR TREND FORECAST:</span>{' '}
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{decoded.trend}</span>
          </div>
        )}
      </div>
    </div>
  );
}
