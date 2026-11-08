export const MNEMONICS = [
  {
    id: 1,
    title: "Altimeter Pressure Rule",
    tag: "ALTIMETRY",
    rule: "HIGH to LOW, look out BELOW!",
    explanation: "Flying from an area of High pressure to Low pressure without resetting subscale -> Altimeter OVER-READS. True altitude is LOWER than indicated. Immediate terrain collision risk!",
    color: "#FFE600"
  },
  {
    id: 2,
    title: "Altimeter Temperature Rule",
    tag: "ALTIMETRY",
    rule: "COLD AIR COMPRESSES, WARM AIR EXPANDS",
    explanation: "Cold air columns shrink isobaric surfaces toward the ground. Flying into colder-than-standard air causes the altimeter to OVER-READ (Aircraft is lower than indicated).",
    color: "#00F0FF"
  },
  {
    id: 3,
    title: "Buys Ballot's Law (Northern Hemisphere)",
    tag: "WINDS",
    rule: "Back to wind -> LOW is on your LEFT",
    explanation: "If you stand with your back to the wind in the Northern Hemisphere, atmospheric LOW pressure is always to your LEFT. In the Southern Hemisphere, LOW is to your RIGHT.",
    color: "#00E676"
  },
  {
    id: 4,
    title: "Wind Direction Shift: Veering vs Backing",
    tag: "WINDS",
    rule: "VEER = CLOCKWISE | BACK = COUNTER-CLOCKWISE",
    explanation: "Clockwise shift in wind direction (e.g., 270° to 310°) is VEERING. Counter-clockwise shift (e.g., 270° to 240°) is BACKING.",
    color: "#FF9100"
  },
  {
    id: 5,
    title: "Boundary Layer Friction & Altitude",
    tag: "WINDS",
    rule: "Climb out of friction: Wind VEERS & SPEEDS UP",
    explanation: "In Northern Hemisphere, climbing from ground out of the friction layer causes wind to VEER by 20°-40° and increase in speed by roughly double.",
    color: "#E040FB"
  },
  {
    id: 6,
    title: "Cloud Base Mental Math Formula",
    tag: "HUMIDITY",
    rule: "Base (ft AGL) = 400 × (T - Td)",
    explanation: "Difference between Surface Temperature (T) and Dewpoint (Td) multiplied by 400 gives convective cloud base in feet AGL. (Example: 30°C / 20°C -> 400 × 10 = 4,000 ft AGL).",
    color: "#FFE600"
  },
  {
    id: 7,
    title: "Density Altitude Quick Formula",
    tag: "PERFORMANCE",
    rule: "DA = PA + 120 × (OAT - ISA_temp)",
    explanation: "For every 1°C above standard ISA temperature, density altitude increases by 120 ft. High, Hot & Humid drastically degrades takeoff roll and engine power.",
    color: "#FF5252"
  },
  {
    id: 8,
    title: "Structural Icing Sweet Spots",
    tag: "ICING",
    rule: "Clear Ice: 0°C to -10°C | Rime Ice: -10°C to -20°C",
    explanation: "Clear ice forms from Large Supercooled Droplets (SLD) in Cumuliform clouds. Rime forms from small droplets freezing instantly in Stratiform clouds.",
    color: "#00F0FF"
  },
  {
    id: 9,
    title: "Thunderstorm Lifecycle: C-M-D",
    tag: "THUNDERSTORMS",
    rule: "Cumulus (Up) -> Mature (Rain + Up/Down) -> Dissipating (Down)",
    explanation: "Cumulus stage: updrafts up to 3000 fpm. Mature stage: start of surface rain, microbursts, hail, violent shear. Dissipating: downdrafts take over, anvil cloud remains.",
    color: "#FFD600"
  },
  {
    id: 10,
    title: "Warm Front Cloud Progression",
    tag: "FRONTS",
    rule: "Cirrus -> Cirrostratus -> Altostratus -> Nimbostratus",
    explanation: "Approaching warm front: First high thin Cirrus, then Cirrostratus (sun/moon 22° halo), then watery Altostratus, finally low dark Nimbostratus with continuous rain.",
    color: "#00E676"
  },
  {
    id: 11,
    title: "Tropical Revolving Storm Rotation",
    tag: "CYCLONES",
    rule: "NH: Counter-Clockwise & Inward | SH: Clockwise & Inward",
    explanation: "In Northern Hemisphere cyclones rotate Anti-clockwise (Cyclonic). Dangerous semi-circle is the RIGHT-hand semi-circle (wind speed + storm forward speed vector).",
    color: "#FF1744"
  },
  {
    id: 12,
    title: "Radiation Fog Formula for Formation",
    tag: "FOG",
    rule: "High RH + Clear Night + Light Wind (2-8 kts) + LAND ONLY",
    explanation: "Radiation fog forms only over land due to nocturnal ground cooling. Wind > 10 kts lifts it into Stratus; calm wind (< 2 kts) forms dew instead of fog. NEVER forms over sea.",
    color: "#B0BEC5"
  },
  {
    id: 13,
    title: "Jet Stream Core CAT Location",
    tag: "JET STREAMS",
    rule: "Cold side & Below the core = MAXIMUM CAT",
    explanation: "Clear Air Turbulence is strongest on the polar (cold, low-pressure) side and just below the jet stream core where horizontal and vertical wind shear peaks.",
    color: "#651FFF"
  },
  {
    id: 14,
    title: "CAVOK 4 Golden Commandments",
    tag: "METAR",
    rule: "Vis >= 10 km | No Cloud < 5000 ft or MSA | No CB/TCU | No SigWx",
    explanation: "All four conditions must strictly be satisfied simultaneously to report CAVOK in METAR/SPECI.",
    color: "#00E676"
  },
  {
    id: 15,
    title: "Mountain Wave Visual Signatures",
    tag: "TERRAIN",
    rule: "Lenticular at crests, Rotor beneath, Cap on ridge",
    explanation: "Standing altocumulus lenticularis (lens-shaped) clouds mark wave crests. Roll/rotor clouds below wave crests contain extreme turbulence and downdrafts exceeding 5,000 fpm.",
    color: "#FF9100"
  }
];

export const METAR_PRESETS = [
  {
    code: "VIDP 241200Z 27012G22KT 240V300 4000 R28/1400D +TSRA FEW015CB BKN030 28/24 Q1008 NOSIG",
    airport: "Indira Gandhi Int'l, Delhi (VIDP)",
    scenario: "Monsoon Thunderstorm with High Wind Gusts & RVR Drop"
  },
  {
    code: "VABB 150600Z 09004KT 060V120 2000 HZ NSC 31/19 Q1012 NOSIG",
    airport: "Chhatrapati Shivaji Maharaj Int'l, Mumbai (VABB)",
    scenario: "Morning Winter Haze with Light Variable Wind"
  },
  {
    code: "VOBL 101200Z 00000KT 6000 FEW025CB SCT030 27/22 Q1016 TEMPO 2000 +TSRA",
    airport: "Kempegowda Int'l, Bengaluru (VOBL)",
    scenario: "Afternoon Pre-monsoon CB Activity with Temporary Storms"
  },
  {
    code: "VECC 020900Z 18015KT 3000 -RA SCT018 BKN030 26/24 Q1004 BECMG 5000 NSW",
    airport: "Netaji Subhash Chandra Bose Int'l, Kolkata (VECC)",
    scenario: "Monsoon Depression Rain with Low Stratus Ceiling"
  },
  {
    code: "VIDP 180300Z 00000KT 0150 R28/0350V0600D FZFG BKN001 M01/M01 Q1022",
    airport: "Delhi Winter Fog (VIDP)",
    scenario: "Dense Freezing Fog with RVR 350m (CAT III Operations)"
  },
  {
    code: "EGLL 121520Z 24018KT 9999 -SHRA FEW020CB SCT035 14/09 Q1013 TEMPO 4000 +SHRA",
    airport: "London Heathrow (EGLL)",
    scenario: "Post-Frontal Unstable Polar Air with Showers & CB"
  }
];

export const CHAPTERS_LIST = [
  { id: 1, title: "Atmosphere & ISA", file: "01_atmosphere_and_isa.md", badge: "Core Basics" },
  { id: 2, title: "Pressure & Altimetry", file: "02_atmospheric_pressure_and_altimetry.md", badge: "Heavy Numericals" },
  { id: 3, title: "Temperature & Heat Exchange", file: "03_temperature_and_heat_exchange.md", badge: "Physics & Inversion" },
  { id: 4, title: "Air Density & Performance", file: "04_air_density_and_performance.md", badge: "Flight Ops" },
  { id: 5, title: "Humidity & Adiabatic Processes", file: "05_humidity_and_adiabatic_processes.md", badge: "Lapse Rates" },
  { id: 6, title: "Winds & Circulation Dynamics", file: "06_winds_and_circulation_dynamics.md", badge: "Geostrophic & Forces" },
  { id: 7, title: "Visibility, Fog, Mist & Haze", file: "07_visibility_fog_mist_and_haze.md", badge: "Airport Ops" },
  { id: 8, title: "Clouds & Vertical Motion", file: "08_clouds_and_vertical_motion.md", badge: "10 Cloud Genera" },
  { id: 9, title: "Atmospheric Stability & Lapse Rates", file: "09_atmospheric_stability_and_lapse_rates.md", badge: "Stability Analysis" },
  { id: 10, title: "Optical & Electrical Phenomena", file: "10_optical_and_electrical_phenomena.md", badge: "Halos & Lightning" },
  { id: 11, title: "Precipitation & Mechanisms", file: "11_precipitation_and_mechanisms.md", badge: "Rain/Hail/Bergeron" },
  { id: 12, title: "Aircraft Icing & Hazards", file: "12_aircraft_icing_and_hazards.md", badge: "Critical Safety" },
  { id: 13, title: "Thunderstorms, Microbursts & Squalls", file: "13_thunderstorms_microbursts_and_squalls.md", badge: "Extreme Hazards" },
  { id: 14, title: "Air Masses, Fronts & Depressions", file: "14_air_masses_fronts_and_depressions.md", badge: "Synoptic Met" },
  { id: 15, title: "Jet Streams & Clear Air Turbulence", file: "15_jet_streams_and_clear_air_turbulence.md", badge: "High Altitude Ops" },
  { id: 16, title: "Mountain Waves & Terrain Hazards", file: "16_mountain_waves_and_terrain_hazards.md", badge: "Orographic Flight" },
  { id: 17, title: "Tropical Meteorology & Cyclones", file: "17_tropical_meteorology_and_cyclones.md", badge: "Indian Ocean Cyclones" },
  { id: 18, title: "Climatology of India & Monsoons", file: "18_climatology_of_india_and_monsoons.md", badge: "DGCA High Yield" },
  { id: 19, title: "General Planetary Circulation", file: "19_general_planetary_circulation.md", badge: "Hadley/Ferrel Cells" },
  { id: 20, title: "Aviation Met Services & Briefing", file: "20_aviation_met_services_metar_taf_briefing.md", badge: "METAR/TAF/SIGMET" },
  { id: 21, title: "Radar, Satellites & Instruments", file: "21_weather_radar_satellites_and_instruments.md", badge: "Avionics & Sensors" }
];
