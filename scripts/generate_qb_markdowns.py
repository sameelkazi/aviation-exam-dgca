import json
import os

with open('question_bank/VOLARE_ALL_QUESTIONS.json', encoding='utf-8') as f:
    questions = json.load(f)

by_topic = {}
for q in questions:
    t = q['topic']
    by_topic.setdefault(t, []).append(q)

titles = {
    '01_atmosphere_and_isa': 'Atmosphere, ISA & Vertical Structure',
    '02_pressure_and_altimetry': 'Atmospheric Pressure & Altimetry',
    '03_temperature_and_heat': 'Temperature, Heat Transfer & Inversions',
    '04_density_and_performance': 'Air Density & Aircraft Performance',
    '05_humidity_and_adiabatic': 'Humidity, Adiabatic Processes & Water Vapour',
    '06_winds_and_dynamics': 'Winds, Pressure Gradient & Circulation Dynamics',
    '07_visibility_and_fog': 'Visibility, Fog, Mist & Haze',
    '08_clouds_and_motion': 'Clouds Classification & Vertical Motion',
    '09_atmospheric_stability': 'Atmospheric Stability & Lapse Rates',
    '10_precipitation': 'Precipitation Types & Formation Mechanisms',
    '11_aircraft_icing': 'Aircraft Icing & Accretion Hazards',
    '12_thunderstorms_microbursts': 'Thunderstorms, Microbursts & Severe Weather',
    '13_fronts_and_depressions': 'Air Masses, Fronts & Frontal Depressions',
    '14_jet_streams_and_cat': 'Jet Streams & Clear Air Turbulence (CAT)',
    '15_mountain_waves': 'Mountain Waves & Orographic Hazards',
    '16_tropical_cyclones': 'Tropical Meteorology, ITCZ & Cyclones',
    '17_general_circulation': 'General Planetary Circulation & Pressure Belts',
    '18_metar_taf_codes': 'METAR, SPECI, TAF & Aviation Met Codes',
    '19_radar_satellites_instruments': 'Weather Radar, Satellites & Met Instruments',
    '20_general_review': 'Comprehensive General Aviation Meteorology Review'
}

for topic, q_list in by_topic.items():
    title = titles.get(topic, topic.replace('_', ' ').title())
    md_lines = [
        f'# Chapter Question Bank: {title}',
        '\n> **Source:** Professional Aviation Meteorology Question Bank (EASA/DGCA CPL & ATPL Standard)',
        f'> **Total Questions:** {len(q_list)}\n',
        '---\n'
    ]
    
    for idx, q in enumerate(q_list, 1):
        q_id = q["id"]
        md_lines.append(f'### Question {idx} (Ref #{q_id})')
        md_lines.append(f'{q["question"]}\n')
        opts = q['options']
        if opts.get('A'): md_lines.append(f'- **A:** {opts["A"]}')
        if opts.get('B'): md_lines.append(f'- **B:** {opts["B"]}')
        if opts.get('C'): md_lines.append(f'- **C:** {opts["C"]}')
        if opts.get('D'): md_lines.append(f'- **D:** {opts["D"]}')
        md_lines.append('')
        md_lines.append('<details>')
        md_lines.append('<summary><b>View Correct Answer</b></summary>\n')
        ans = q["answer"]
        md_lines.append(f'- **Correct Answer:** **Option {ans}**')
        md_lines.append('</details>\n')
        md_lines.append('---\n')
        
    filepath = os.path.join('question_bank', f'{topic}.md')
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(md_lines))
        
print(f'Generated {len(by_topic)} question bank markdown files successfully!')
