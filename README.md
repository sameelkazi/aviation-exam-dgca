# DGCA Aviation Meteorology — Complete CPL / ATPL Exam Master Suite ✈️🌤️

[![DGCA CPL ATPL](https://img.shields.io/badge/DGCA-CPL%20%7C%20ATPL-blue.svg)](https://dgca.gov.in)
[![Syllabus](https://img.shields.io/badge/Syllabus-IC%20Joshi%207th%20Ed-green.svg)](#complete-chapter-wise-theory-notes)
[![Questions](https://img.shields.io/badge/Questions-818%20Verified%20MCQs-orange.svg)](#chapter-wise-question-banks-818-questions)
[![Interactive Quiz](https://img.shields.io/badge/CLI%20Tool-Python%20Mock%20Exam-purple.svg)](#interactive-terminal-quiz-cli)

An exam-ready, high-yield Aviation Meteorology preparation repository tailored strictly for **DGCA CPL & ATPL** ground examinations in India.

Synthesized directly from:
* **IC Joshi (Aviation Meteorology, 7th Edition)**
* **Oxford Aviation Academy & Nordian Meteorology**
* **Handwritten Flight Cadet Ground School Notes**
* **818 Past DGCA Examination Questions & Verified Answer Keys (Volare QB)**

---

## ⚡ Quick Access Fast-Track Guides & Neo-Brutalist Flight Deck

| Resource | Description | Direct Link |
|:---|:---|:---|
| 🕹️ **Neo-Brutalist Flight Deck Web App** | Full interactive cockpit web app for **Capt. Daivam Mehta** (50-Q Mock simulator, Live METAR decoder, flight computers, mnemonics) | **[Launch Web App (`npm run dev`)](#-neo-brutalist-web-application-vercel-ready)** |
| 📥 **01. Formula Cheat Sheet (PDF)** | 2-page printable vector cheat sheet with ISA rules, altimetry conversions & 15 golden mnemonics | [`public/downloads/01_DGCA_Formula_Cheat_Sheet_Daivam_Mehta.pdf`](public/downloads/01_DGCA_Formula_Cheat_Sheet_Daivam_Mehta.pdf) |
| 📥 **02. METAR & TAF Decoder Guide (PDF)** | 2-page printable guide with weather code tables, CAVOK rules & 10 solved airport drills | [`public/downloads/02_METAR_TAF_Decoder_Guide_Daivam_Mehta.pdf`](public/downloads/02_METAR_TAF_Decoder_Guide_Daivam_Mehta.pdf) |
| 📥 **03. Complete 21-Chapter Handbook (PDF)** | 45-page comprehensive theory and revision handbook | [`public/downloads/03_Complete_Theory_Notes_21_Chapters.pdf`](public/downloads/03_Complete_Theory_Notes_21_Chapters.pdf) |
| 📥 **04. 818 Questions Bank & Solutions (PDF)**| 128-page complete question bank with verified answers | [`public/downloads/04_DGCA_818_Questions_Bank_with_Answers.pdf`](public/downloads/04_DGCA_818_Questions_Bank_with_Answers.pdf) |
| 📐 **Master Formula Cheat Sheet (MD)** | Mathematical constants, lapse rates, density altitude, wind components & 15 mnemonics | [`FORMULA_CHEAT_SHEET.md`](FORMULA_CHEAT_SHEET.md) |
| 📡 **METAR & TAF Master Decoder (MD)** | Markdown reference guide with full weather codes and examples | [`METAR_TAF_DECODER_GUIDE.md`](METAR_TAF_DECODER_GUIDE.md) |
| 💻 **Interactive CLI Quiz Engine** | Terminal-based mock test simulator (50-Q Full DGCA Mock, 10-Q Sprints, or Topic-wise tests) | [`scripts/interactive_quiz.py`](scripts/interactive_quiz.py) |
| 📦 **Master Question Bank JSON** | 818 structured questions with parsed options and answer keys | [`question_bank/VOLARE_ALL_QUESTIONS.json`](question_bank/VOLARE_ALL_QUESTIONS.json) |

---

## 🚀 Neo-Brutalist Web Application (Vercel Ready)

Built using **Vite + React** with custom Neo-Brutalist aviation flight deck aesthetics (bold 3.5px borders, hard drop shadows, radar greens, electric caution yellows):

### How to Run Locally:
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# -> Opens http://localhost:3000
```

### How to Deploy to Vercel:
1. Push to GitHub repository: `https://github.com/sameelkazi/aviation-exam-dgca`.
2. Go to **[vercel.com/new](https://vercel.com/new)** and import the repository.
3. Vercel automatically detects the Vite configuration and builds from `npm run build` with output directory `dist`.
4. Your site will be live instantly with global CDN and SSL!

---

## 📚 Complete Chapter-Wise Theory Notes

Designed for rapid retention: **bullet points of key keywords**, **Mermaid flowcharts**, **comparison tables**, and **strict IC Joshi syllabus boundaries**.

1. [**Chapter 01: Atmosphere & International Standard Atmosphere (ISA)**](chapters/01_atmosphere_and_isa.md)  
   *Atmospheric composition, layers (Troposphere, Tropopause, Stratosphere), ISA mean sea level values, standard lapse rates.*
2. [**Chapter 02: Atmospheric Pressure & Altimetry**](chapters/02_atmospheric_pressure_and_altimetry.md)  
   *QNH, QFE, QNE, QFF, standard pressure settings, altimeter temperature & pressure error corrections, transition altitude/level.*
3. [**Chapter 03: Temperature & Heat Exchange**](chapters/03_temperature_and_heat_exchange.md)  
   *Solar insolation, terrestrial radiation, conduction, convection, advection, latent vs sensible heat, diurnal variation, inversions.*
4. [**Chapter 04: Air Density & Aircraft Performance**](chapters/04_air_density_and_performance.md)  
   *Density altitude formulas, impact of pressure, temperature, and humidity on takeoff roll, engine thrust, and climb gradient.*
5. [**Chapter 05: Humidity & Adiabatic Processes**](chapters/05_humidity_and_adiabatic_processes.md)  
   *Relative humidity, dew point, vapour pressure, DALR ($3^\circ\text{C}/1000\text{ft}$), SALR ($1.5^\circ\text{C}/1000\text{ft}$), cloud base formula.*
6. [**Chapter 06: Winds & Atmospheric Circulation Dynamics**](chapters/06_winds_and_circulation_dynamics.md)  
   *Pressure Gradient Force, Coriolis force, geostrophic wind, gradient wind, cyclostrophic wind, friction layer, backing & veering.*
7. [**Chapter 07: Visibility, Fog, Mist & Haze**](chapters/07_visibility_fog_mist_and_haze.md)  
   *Radiation fog, advection fog, upslope fog, frontal fog, steam fog, RVR criteria, meteorological optical range.*
8. [**Chapter 08: Clouds & Vertical Motion**](chapters/08_clouds_and_vertical_motion.md)  
   *10 cloud genera (High, Medium, Low, Vertical), cloud classification, composition, convective vs stratiform clouds.*
9. [**Chapter 09: Atmospheric Stability & Lapse Rates**](chapters/09_atmospheric_stability_and_lapse_rates.md)  
   *Absolute stability, absolute instability, conditional instability, environmental lapse rate (ELR) vs DALR/SALR.*
10. [**Chapter 10: Optical & Electrical Phenomena**](chapters/10_optical_and_electrical_phenomena.md)  
    *Halos ($22^\circ\text{ ring}$ in Cirrostratus), Coronas, Rainbows, Glories, Saint Elmo’s fire, static discharge.*
11. [**Chapter 11: Precipitation & Mechanisms**](chapters/11_precipitation_and_mechanisms.md)  
    *Bergeron-Findeisen ice crystal process, collision-coalescence, rain, drizzle, snow, sleet, hail, graupel, virga.*
12. [**Chapter 12: Aircraft Icing & Hazards**](chapters/12_aircraft_icing_and_hazards.md)  
    *Clear ice ($0^\circ\text{C to } -10^\circ\text{C}$), Rime ice ($-10^\circ\text{C to } -20^\circ\text{C}$), Frost, aerodynamic effects, anti-ice vs de-ice.*
13. [**Chapter 13: Thunderstorms, Microbursts & Squall Lines**](chapters/13_thunderstorms_microbursts_and_squalls.md)  
    *Cumulus, Mature, Dissipating stages, downbursts, microburst wind shear recognition & recovery, gust fronts, squall lines.*
14. [**Chapter 14: Air Masses, Fronts & Mid-Latitude Depressions**](chapters/14_air_masses_fronts_and_depressions.md)  
    *Air mass classification, Warm front weather sequence, Cold front hazards, Occlusions, Polar Front theory.*
15. [**Chapter 15: Jet Streams & Clear Air Turbulence (CAT)**](chapters/15_jet_streams_and_clear_air_turbulence.md)  
    *Polar Front Jet, Subtropical Jet, Tropical Easterly Jet, jet core dimensions, CAT triggers, wind shear criteria.*
16. [**Chapter 16: Mountain Waves & Terrain Hazards**](chapters/16_mountain_waves_and_terrain_hazards.md)  
    *Lee waves, lenticular clouds, rotor zones, downdrafts, Föhn wind mechanism and temperature calculation.*
17. [**Chapter 17: Tropical Meteorology & Cyclones**](chapters/17_tropical_meteorology_and_cyclones.md)  
    *ITCZ structure, Tropical Revolving Storms (TRS/Cyclones), eye, eye wall, storm surge, dangerous vs navigable semi-circles.*
18. [**Chapter 18: Climatology of India & Monsoons**](chapters/18_climatology_of_india_and_monsoons.md)  
    *South-West Monsoon (onset, Arabian Sea & Bay of Bengal branches, monsoon trough, breaks), North-East Monsoon, Western Disturbances, Nor'westers (Kalbaishakhi), Andhi, Loo.*
19. [**Chapter 19: General Planetary Circulation**](chapters/19_general_planetary_circulation.md)  
    *Hadley, Ferrel, Polar cells, Trade winds, Doldrums, Subtropical Highs (Horse Latitudes), Polar Easterlies.*
20. [**Chapter 20: Aviation Meteorological Services & Briefings**](chapters/20_aviation_met_services_metar_taf_briefing.md)  
    *METAR, SPECI, TAF, SIGMET, AIRMET, GAMET, VOLMET broadcasts, briefing documentation.*
21. [**Chapter 21: Meteorological Radar, Satellites & Instruments**](chapters/21_weather_radar_satellites_and_instruments.md)  
    *Airborne Weather Radar (X-band 3 cm, tilt management, echoes, blind alley trap), Geostationary vs Polar satellites, VIS/IR/WV channels, Stevenson Screen.*

---

## 📝 Chapter-Wise Question Banks (818 Questions)

Every question is categorized, accompanied by multiple-choice options, and includes a **collapsible verified solution**:

| # | Question Bank Module | Questions | Direct Markdown Link |
|:---:|:---|:---:|:---|
| 01 | **Atmosphere & ISA** | 47 | [`question_bank/01_atmosphere_and_isa.md`](question_bank/01_atmosphere_and_isa.md) |
| 02 | **Altimetry & Pressure** | 58 | [`question_bank/02_altimetry_pressure.md`](question_bank/02_altimetry_pressure.md) |
| 03 | **Temperature & Density** | 39 | [`question_bank/03_temperature_density.md`](question_bank/03_temperature_density.md) |
| 04 | **Humidity & Adiabatic** | 33 | [`question_bank/04_humidity_adiabatic.md`](question_bank/04_humidity_adiabatic.md) |
| 05 | **Winds & Circulation** | 53 | [`question_bank/05_winds_circulation.md`](question_bank/05_winds_circulation.md) |
| 06 | **METAR, TAF & Briefings** | 42 | [`question_bank/06_metar_taf_briefing.md`](question_bank/06_metar_taf_briefing.md) |
| 07 | **Icing Hazards** | 37 | [`question_bank/07_icing_hazards.md`](question_bank/07_icing_hazards.md) |
| 08 | **Thunderstorms & Hazards** | 61 | [`question_bank/08_thunderstorms_hazards.md`](question_bank/08_thunderstorms_hazards.md) |
| 09 | **Clouds & Precipitation** | 45 | [`question_bank/09_clouds_precipitation.md`](question_bank/09_clouds_precipitation.md) |
| 10 | **Visibility & Fog** | 36 | [`question_bank/10_visibility_fog.md`](question_bank/10_visibility_fog.md) |
| 11 | **Stability & Lapse Rates** | 29 | [`question_bank/11_stability_lapse_rates.md`](question_bank/11_stability_lapse_rates.md) |
| 12 | **Air Masses & Fronts** | 48 | [`question_bank/12_air_masses_fronts.md`](question_bank/12_air_masses_fronts.md) |
| 13 | **Jet Streams & CAT** | 31 | [`question_bank/13_jet_streams_cat.md`](question_bank/13_jet_streams_cat.md) |
| 14 | **Mountain Waves** | 19 | [`question_bank/14_mountain_waves.md`](question_bank/14_mountain_waves.md) |
| 15 | **Tropical Meteorology & Cyclones** | 44 | [`question_bank/15_tropical_meteorology.md`](question_bank/15_tropical_meteorology.md) |
| 16 | **Indian Climatology & Monsoons** | 52 | [`question_bank/16_indian_climatology_monsoon.md`](question_bank/16_indian_climatology_monsoon.md) |
| 17 | **General Circulation & Global Wind** | 24 | [`question_bank/17_general_circulation.md`](question_bank/17_general_circulation.md) |
| 18 | **General Flight Met & Numerical Problems** | 120 | [`question_bank/18_general_flight_met_advanced.md`](question_bank/18_general_flight_met_advanced.md) |

---

## 🎮 Interactive Terminal Quiz CLI

Test yourself in a realistic DGCA exam simulation with instant scoring and explanations:

```bash
# Navigate to the project root
cd aviation-exam-dgca

# Run the quiz engine
python scripts/interactive_quiz.py
```

### Available Modes:
1. **Full DGCA CPL Mock Exam (50 Questions):**
   - 50 randomized questions covering all syllabus domains.
   - DGCA standard pass mark: **70% (35/50)**.
2. **Rapid Practice Sprint (10 Questions):**
   - Quick 10-question refresh.
3. **Topic-Specific Practice:**
   - Drill into any specific chapter (Altimetry, Icing, Monsoons, METAR, etc.).

---

## 💡 Top Golden Rules for DGCA Exam

1. **Altimetry:**
   - *"High to Low, Look out below"* (True altitude is **LOWER** than indicated).
   - *"Cold air compresses, warm air expands"* (Flying cold $\rightarrow$ altimeter over-reads).
2. **Lapse Rates:**
   - **DALR:** $3.0^\circ\text{C} / 1000\text{ ft}$ ($9.8^\circ\text{C} / \text{km}$).
   - **SALR:** $1.5^\circ\text{C} / 1000\text{ ft}$ (varies $4-9^\circ\text{C} / \text{km}$).
   - **ISA Lapse Rate:** $1.98^\circ\text{C} / 1000\text{ ft}$ ($\approx 2^\circ\text{C} / 1000\text{ ft}$).
3. **Cloud Base Calculation:**
   $$\text{Base (AGL in ft)} = \frac{T - T_d}{2.5} \times 1000 = 400 \times (T - T_d)$$
4. **Wind veering & backing:**
   - Veering = Clockwise change in wind direction.
   - Backing = Counter-clockwise change in wind direction.
   - Climbing out of surface friction layer in Northern Hemisphere: Wind **veers and increases**.
5. **Icing Severity:**
   - Worst structural icing: Clear ice in Cumuliform clouds at **$0^\circ\text{C to } -10^\circ\text{C}$** with large supercooled water droplets (SLD).

---

## 👨‍✈️ Contributions & License
Crafted for student pilots, flight cadets, and aviation professionals preparing for DGCA examinations.  
Open-source study companion under the [MIT License](LICENSE).
