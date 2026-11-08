import os
import re
import json
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

PDF_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "downloads")
os.makedirs(PDF_DIR, exist_ok=True)

class NumberedCanvas(canvas.Canvas):
    """Two-pass canvas to dynamically compute and draw 'Page X of Y' and header."""
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#555555"))
        
        # Header (pages after cover page)
        if self._pageNumber > 1:
            self.drawString(54, 800, "DGCA CPL / ATPL AVIATION METEOROLOGY  |  FLIGHT CADET: DAIVAM MEHTA")
            self.setStrokeColor(colors.HexColor("#000000"))
            self.setLineWidth(1)
            self.line(54, 792, 558, 792)
        
        # Footer
        self.setStrokeColor(colors.HexColor("#CCCCCC"))
        self.setLineWidth(0.5)
        self.line(54, 45, 558, 45)
        self.drawString(54, 32, "CONFIDENTIAL & EXAM-PREP  |  IC JOSHI 7TH ED. & VOLARE QUESTION BANK")
        self.drawRightString(558, 32, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()


def get_custom_styles():
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        name='DocTitle',
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor("#0A192F"),
        alignment=1, # Center
        spaceAfter=10
    ))
    styles.add(ParagraphStyle(
        name='DocSubtitle',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#E65100"),
        alignment=1,
        spaceAfter=20
    ))
    styles.add(ParagraphStyle(
        name='SectionHeader',
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor("#0D47A1"),
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    ))
    styles.add(ParagraphStyle(
        name='SubSectionHeader',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#1A237E"),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    ))
    styles.add(ParagraphStyle(
        name='BodyCustom',
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor("#212121"),
        spaceAfter=5
    ))
    styles.add(ParagraphStyle(
        name='BulletCustom',
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#212121"),
        leftIndent=15,
        spaceAfter=3
    ))
    styles.add(ParagraphStyle(
        name='FormulaBox',
        fontName='Courier-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor("#B71C1C"),
        backColor=colors.HexColor("#FFF8E1"),
        borderColor=colors.HexColor("#FFA000"),
        borderWidth=1,
        borderPadding=6,
        spaceBefore=4,
        spaceAfter=6
    ))
    styles.add(ParagraphStyle(
        name='MnemonicBox',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#1B5E20"),
        backColor=colors.HexColor("#E8F5E9"),
        borderColor=colors.HexColor("#4CAF50"),
        borderWidth=1,
        borderPadding=5,
        spaceBefore=3,
        spaceAfter=5
    ))
    styles.add(ParagraphStyle(
        name='TableHeader',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white,
        alignment=1
    ))
    styles.add(ParagraphStyle(
        name='TableCell',
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#212121")
    ))
    styles.add(ParagraphStyle(
        name='TableCellBold',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#0D47A1")
    ))
    return styles


def generate_formula_sheet_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=55,
        bottomMargin=55
    )
    styles = get_custom_styles()
    story = []

    # Title Banner
    story.append(Paragraph("DGCA AVIATION METEOROLOGY", styles['DocTitle']))
    story.append(Paragraph("MASTER FORMULA & EXAM CHEAT SHEET — FOR DAIVAM MEHTA", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor("#000000"), spaceAfter=15))

    # Section 1: Standard Atmosphere Constants
    story.append(Paragraph("1. ICAO International Standard Atmosphere (ISA) Constants", styles['SectionHeader']))
    isa_data = [
        [Paragraph("Parameter", styles['TableHeader']), Paragraph("MSL Standard Value", styles['TableHeader']), Paragraph("Variation / Rule of Thumb", styles['TableHeader'])],
        [Paragraph("MSL Pressure", styles['TableCellBold']), Paragraph("1013.25 hPa / 29.92 inHg / 760 mmHg", styles['TableCell']), Paragraph("1 hPa = 27 to 30 ft (Low levels: 30 ft/hPa)", styles['TableCell'])],
        [Paragraph("MSL Temperature", styles['TableCellBold']), Paragraph("+15.0°C (288.15 K)", styles['TableCell']), Paragraph("Decreases 1.98°C (~2°C) per 1000 ft (6.5°C/km)", styles['TableCell'])],
        [Paragraph("MSL Air Density", styles['TableCellBold']), Paragraph("1.225 kg/m³", styles['TableCell']), Paragraph("Decreases with altitude, temp increase, moisture", styles['TableCell'])],
        [Paragraph("Tropopause Height (ISA)", styles['TableCellBold']), Paragraph("36,090 ft (11,000 m)", styles['TableCell']), Paragraph("Poles: 8-10 km (-45°C) | Equator: 16-18 km (-80°C)", styles['TableCell'])],
        [Paragraph("Stratosphere Temp (ISA)", styles['TableCellBold']), Paragraph("-56.5°C (Isothermal up to 20 km)", styles['TableCell']), Paragraph("Above 20 km temp increases (Ozone absorption)", styles['TableCell'])],
        [Paragraph("Speed of Sound (MSL)", styles['TableCellBold']), Paragraph("661.47 kts (340.3 m/s)", styles['TableCell']), Paragraph("LSS = 38.94 * sqrt(Temperature in Kelvin)", styles['TableCell'])],
    ]
    t_isa = Table(isa_data, colWidths=[120, 180, 215])
    t_isa.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0D47A1")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CCCCCC")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F9F9F9")]),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_isa)
    story.append(Spacer(1, 10))

    # Section 2: Altimetry & Pressure Corrections
    story.append(Paragraph("2. Altimetry Formulas & Temperature Error Corrections", styles['SectionHeader']))
    story.append(Paragraph("• ISA Deviation: ISA Dev = OAT - (15 - 2 * (Alt / 1000))", styles['FormulaBox']))
    story.append(Paragraph("• Altimeter Temp Error Correction: True Alt = Indicated Alt + (4 * (Alt/1000) * ISA_Dev)", styles['FormulaBox']))
    story.append(Paragraph("• High to Low or Warm to Cold Rule: True Altitude is LOWER than Indicated. 'High to Low, Look out below!'", styles['MnemonicBox']))
    story.append(Paragraph("• QNH to QFE Conversion: QNH = QFE + (Field Elevation / 30 ft)", styles['FormulaBox']))
    story.append(Paragraph("• Pressure Altitude: PA = Elevation + (1013.25 - QNH) * 30", styles['FormulaBox']))
    story.append(Paragraph("• Density Altitude: DA = Pressure Altitude + [120 * (OAT - ISA_Temp_at_PA)]", styles['FormulaBox']))
    story.append(Spacer(1, 8))

    # Section 3: Adiabatic Lapse Rates & Cloud Base
    story.append(Paragraph("3. Lapse Rates & Cloud Base Determination", styles['SectionHeader']))
    story.append(Paragraph("• Dry Adiabatic Lapse Rate (DALR): 3.0°C / 1000 ft  (9.8°C / km or 1°C / 100 m) — Constant", styles['FormulaBox']))
    story.append(Paragraph("• Saturated Adiabatic Lapse Rate (SALR): ~1.5°C / 1000 ft (4°C to 9°C / km) — Varies with Temp & Moisture", styles['FormulaBox']))
    story.append(Paragraph("• Dew Point Lapse Rate in Unsaturated Air: 0.5°C / 1000 ft", styles['FormulaBox']))
    story.append(Paragraph("• Convective Cloud Base (AGL ft): Base = [(T - Td) / 2.5] * 1000  =  400 * (T - Td)", styles['FormulaBox']))
    story.append(Spacer(1, 8))

    # Section 4: Winds, Coriolis & Geostrophic Formulas
    story.append(Paragraph("4. Wind & Circulation Dynamics", styles['SectionHeader']))
    story.append(Paragraph("• Geostrophic Wind Formula: Vg = 1 / (2 * omega * rho * sin(phi)) * (dP / dn)", styles['FormulaBox']))
    story.append(Paragraph("• Crosswind Component: Crosswind = Wind_Speed * sin(Angle between Runway and Wind)", styles['FormulaBox']))
    story.append(Paragraph("• Headwind Component: Headwind = Wind_Speed * cos(Angle between Runway and Wind)", styles['FormulaBox']))
    story.append(Paragraph("• Buys Ballot's Law: Northern Hemisphere — Stand with back to wind, LOW pressure is on your LEFT.", styles['MnemonicBox']))
    story.append(Paragraph("• Friction Layer Effect: Climbing out in NH -> Wind VEERS (clockwise) and INCREASES in speed.", styles['MnemonicBox']))
    story.append(Spacer(1, 8))

    # Section 5: The 15 Golden Aviation Met Mnemonics
    story.append(PageBreak())
    story.append(Paragraph("5. The 15 Golden DGCA Exam Mnemonics for Daivam Mehta", styles['SectionHeader']))
    
    mnemonics = [
        ("1. Altimeter Pressure Rule", "HIGH to LOW, look out BELOW. (Altimeter OVERREADS; true altitude is LOWER than indicated)."),
        ("2. Altimeter Temp Rule", "COLD air COMPRESSES, WARM air EXPANDS. (Flying cold -> aircraft is lower than indicated)."),
        ("3. Buys Ballot's Law (NH)", "Back to the wind, LOW is on the LEFT (Northern Hemisphere). South: LOW is on the RIGHT."),
        ("4. Wind Direction Shift", "VEER = Clockwise (Right) | BACK = Counter-Clockwise (Left)."),
        ("5. Boundary Layer Friction", "Climb out of friction: Wind VEERS and SPEEDS UP. Descending into friction: Wind BACKS and SLOWS."),
        ("6. Cloud Base Rapid Calc", "400 * Spread = Base in ft AGL. (Spread = Surface Temp - Dew Point)."),
        ("7. Density Altitude Thumb", "DA = PA + (120 * ISA Deviation). High, Hot & Humid = Poor Performance!"),
        ("8. Icing Sweet Spots", "Clear Ice: 0°C to -10°C (Large droplets / Cumuliform). Rime Ice: -10°C to -20°C (Small droplets / Stratiform)."),
        ("9. Thunderstorm Stages", "C-M-D: Cumulus (Updrafts only) -> Mature (Updrafts + Downdrafts + Rain) -> Dissipating (Downdrafts only)."),
        ("10. Frontal Sequence (Warm)", "Cirrus -> Cirrostratus (Halo) -> Altostratus -> Nimbostratus (Continuous rain) -> Stratus/Fog."),
        ("11. Cyclone Wind Rotation", "Northern Hemisphere: COUNTER-CLOCKWISE & INWARD. Southern: CLOCKWISE & INWARD."),
        ("12. Fog Formation Magic", "Radiation Fog needs: High RH, Clear skies, Calm to Light wind (2-8 kts), Land only (NEVER over sea)."),
        ("13. Jet Stream Axis Rule", "Cold air to the LEFT in Northern Hemisphere -> Maximum CAT is on the COLD (polar) and LOW side of jet core."),
        ("14. CAVOK Minimums", "Visibility >= 10 km, NO cloud below 5,000 ft or MSA (whichever higher), NO CB / TCU, NO significant weather."),
        ("15. Mountain Wave Signs", "Lenticular (lens) clouds at crests, Roll/Rotor clouds in turbulent lower zone, Cap cloud on peak.")
    ]

    for title, desc in mnemonics:
        p_text = f"<b>{title}:</b> {desc}"
        story.append(Paragraph(p_text, styles['MnemonicBox']))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {output_path}")


def generate_metar_taf_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=55,
        bottomMargin=55
    )
    styles = get_custom_styles()
    story = []

    story.append(Paragraph("DGCA AVIATION METEOROLOGY", styles['DocTitle']))
    story.append(Paragraph("METAR & TAF WEATHER CODE MASTER DECODER — FOR DAIVAM MEHTA", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor("#000000"), spaceAfter=15))

    story.append(Paragraph("1. Anatomy of a METAR String", styles['SectionHeader']))
    story.append(Paragraph("Example: <b>METAR VIDP 241200Z 27012G22KT 240V300 4000 R28/1400D +TSRA FEW015CB BKN030 28/24 Q1008 NOSIG=</b>", styles['FormulaBox']))
    
    breakdown_data = [
        [Paragraph("Code Element", styles['TableHeader']), Paragraph("Decoded Value", styles['TableHeader']), Paragraph("Operational Pilot Meaning", styles['TableHeader'])],
        [Paragraph("VIDP", styles['TableCellBold']), Paragraph("New Delhi IGI Airport", styles['TableCell']), Paragraph("ICAO 4-letter station indicator", styles['TableCell'])],
        [Paragraph("241200Z", styles['TableCellBold']), Paragraph("Day 24, 1200 UTC (Z)", styles['TableCell']), Paragraph("Observation timestamp in UTC (IST = UTC + 5:30)", styles['TableCell'])],
        [Paragraph("27012G22KT", styles['TableCellBold']), Paragraph("Wind 270° True at 12 kt, Gust 22 kt", styles['TableCell']), Paragraph("Runway crosswind calculations required", styles['TableCell'])],
        [Paragraph("240V300", styles['TableCellBold']), Paragraph("Varying 240° to 300°", styles['TableCell']), Paragraph("Wind direction varying by >= 60° (speed >= 3 kt)", styles['TableCell'])],
        [Paragraph("4000", styles['TableCellBold']), Paragraph("Prevailing Visibility 4000 m", styles['TableCell']), Paragraph("General horizontal optical visibility", styles['TableCell'])],
        [Paragraph("R28/1400D", styles['TableCellBold']), Paragraph("RVR Rwy 28 is 1400m, Decreasing", styles['TableCell']), Paragraph("Runway Visual Range (U=up, D=down, N=no change)", styles['TableCell'])],
        [Paragraph("+TSRA", styles['TableCellBold']), Paragraph("Heavy Thunderstorm with Rain", styles['TableCell']), Paragraph("Hazardous flight conditions in vicinity", styles['TableCell'])],
        [Paragraph("FEW015CB", styles['TableCellBold']), Paragraph("1-2 oktas CB at 1,500 ft AGL", styles['TableCell']), Paragraph("Cumulonimbus present (Severe turbulence/icing)", styles['TableCell'])],
        [Paragraph("BKN030", styles['TableCellBold']), Paragraph("5-7 oktas base at 3,000 ft AGL", styles['TableCell']), Paragraph("Ceiling established at 3,000 ft AGL", styles['TableCell'])],
        [Paragraph("28/24", styles['TableCellBold']), Paragraph("Temp: 28°C / Dewpoint: 24°C", styles['TableCell']), Paragraph("Spread is 4°C (Cloud base ~ 1600 ft AGL)", styles['TableCell'])],
        [Paragraph("Q1008", styles['TableCellBold']), Paragraph("QNH: 1008 hPa", styles['TableCell']), Paragraph("Altimeter setting (sub-scale rounded down)", styles['TableCell'])],
        [Paragraph("NOSIG", styles['TableCellBold']), Paragraph("No Significant Change expected", styles['TableCell']), Paragraph("TREND valid for 2 hours following report", styles['TableCell'])],
    ]
    t_break = Table(breakdown_data, colWidths=[90, 195, 230])
    t_break.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0D47A1")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CCCCCC")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F9F9F9")]),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('TOPPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_break)
    story.append(Spacer(1, 10))

    story.append(Paragraph("2. Master Weather Descriptors & Phenomenon Matrix", styles['SectionHeader']))
    weather_codes = [
        [Paragraph("Intensity / Proximity", styles['TableHeader']), Paragraph("Descriptor", styles['TableHeader']), Paragraph("Precipitation", styles['TableHeader']), Paragraph("Obscuration / Other", styles['TableHeader'])],
        [Paragraph("- Light<br/>Moderate (no sign)<br/>+ Heavy<br/>VC Vicinity (8-16 km)", styles['TableCell']),
         Paragraph("MI Shallow<br/>BC Patches<br/>PR Partial<br/>DR Low Drifting<br/>BL Blowing<br/>SH Showers<br/>TS Thunderstorm<br/>FZ Freezing", styles['TableCell']),
         Paragraph("DZ Drizzle<br/>RA Rain<br/>SN Snow<br/>SG Snow Grains<br/>PL Ice Pellets<br/>GR Hail (>= 5mm)<br/>GS Small Hail / Graupel<br/>UP Unidentified", styles['TableCell']),
         Paragraph("FG Fog (vis &lt; 1000m)<br/>BR Mist (vis 1000-5000m)<br/>HZ Haze (RH &lt; 80%)<br/>FU Smoke<br/>VA Volcanic Ash<br/>DU Dust<br/>SA Sand<br/>SQ Squall | SS Sandstorm", styles['TableCell'])],
    ]
    t_codes = Table(weather_codes, colWidths=[120, 130, 130, 135])
    t_codes.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E65100")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CCCCCC")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_codes)
    story.append(Spacer(1, 10))

    story.append(Paragraph("3. The 4 Strict Criteria for CAVOK", styles['SectionHeader']))
    story.append(Paragraph("<b>CAVOK</b> replaces visibility, RVR, weather phenomena, and cloud groups ONLY when ALL FOUR are met:", styles['BodyCustom']))
    story.append(Paragraph("1. Visibility is <b>10 km or more</b> (9999).", styles['BulletCustom']))
    story.append(Paragraph("2. <b>NO CLOUD</b> below 5,000 ft (1,500 m) or below highest Minimum Sector Altitude (MSA), whichever is greater.", styles['BulletCustom']))
    story.append(Paragraph("3. <b>NO Cumulonimbus (CB)</b> and <b>NO Towering Cumulus (TCU)</b> at any level.", styles['BulletCustom']))
    story.append(Paragraph("4. <b>NO significant weather phenomena</b> at or around the aerodrome.", styles['BulletCustom']))
    story.append(Spacer(1, 10))

    story.append(PageBreak())
    story.append(Paragraph("4. 10 DGCA Real-World Exam Drills Decoded", styles['SectionHeader']))
    drills = [
        ("Drill 1: VABB 150600Z 09004KT 060V120 2000 HZ NSC 31/19 Q1012 NOSIG=", "Mumbai: Wind 090°/04 kt varying 060°-120°. Vis 2000 m in Haze (HZ, RH < 80%). No Significant Cloud (NSC). Temp 31°C, Dewpoint 19°C. QNH 1012 hPa. No significant change expected."),
        ("Drill 2: VECC 020900Z 18015KT 3000 -RA SCT018 BKN030 26/24 Q1004 BECMG 5000 NSW=", "Kolkata: Wind 180°/15 kt. Vis 3000 m in light rain. Clouds: 3-4 oktas at 1800 ft, 5-7 oktas ceiling at 3000 ft. Becoming visibility 5000 m, No Significant Weather (NSW)."),
        ("Drill 3: VOBL 101200Z 00000KT 6000 FEW025CB SCT030 27/22 Q1016 TEMPO 2000 +TSRA=", "Bengaluru: Calm wind. Vis 6000 m. 1-2 oktas CB at 2500 ft, 3-4 oktas at 3000 ft. Temp 27°C, DP 22°C. QNH 1016 hPa. Temporarily: Vis dropping to 2000 m in heavy thunderstorm with rain."),
        ("Drill 4: VOMM 050000Z 32008KT 0800 R07/1000U FG VV002 21/21 Q1014 BECMG 2000 BR=", "Chennai: Vis 800 m in Fog (FG). RVR Rwy 07 is 1000 m and upward/increasing (U). Sky obscured, vertical visibility 200 ft (VV002). Becoming vis 2000 m in mist (BR)."),
        ("Drill 5: VIDP 180300Z 00000KT 0150 R28/0350V0600D FZFG BKN001 M01/M01 Q1022=", "Delhi Winter: Calm wind. Vis 150 m. RVR Rwy 28 varying 350 m to 600 m, decreasing (D). Freezing Fog (FZFG). Ceiling 100 ft. Sub-zero Temp: -1°C, Dewpoint: -1°C (M = minus).")
    ]
    for title, exp in drills:
        story.append(Paragraph(f"<b>{title}</b>", styles['SubSectionHeader']))
        story.append(Paragraph(exp, styles['BodyCustom']))
        story.append(Spacer(1, 4))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {output_path}")


def generate_notes_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=55,
        bottomMargin=55
    )
    styles = get_custom_styles()
    story = []

    story.append(Paragraph("DGCA CPL / ATPL AVIATION METEOROLOGY", styles['DocTitle']))
    story.append(Paragraph("COMPLETE THEORY & REVISION HANDBOOK (21 CHAPTERS) — FOR DAIVAM MEHTA", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor("#000000"), spaceAfter=15))

    chapters_dir = os.path.join(os.path.dirname(__file__), "..", "chapters")
    chapter_files = sorted([f for f in os.listdir(chapters_dir) if f.endswith(".md")])

    for cf in chapter_files:
        full_path = os.path.join(chapters_dir, cf)
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Parse title
        m_title = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
        title = m_title.group(1) if m_title else cf

        story.append(Paragraph(title, styles['SectionHeader']))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#0D47A1"), spaceAfter=8))

        # Extract lines
        lines = content.split("\n")
        in_table = False
        table_rows = []

        for line in lines:
            line_str = line.strip()
            if not line_str or line_str.startswith("#"):
                continue
            if line_str.startswith("```"):
                continue
            
            # Markdown Table parser
            if "|" in line_str and not line_str.startswith("```"):
                parts = [p.strip() for p in line_str.split("|")[1:-1]]
                if all(set(p).issubset({'-', ':', ' '}) for p in parts):
                    continue # separator row
                table_rows.append([Paragraph(re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', p), styles['TableCell']) for p in parts])
                in_table = True
                continue
            elif in_table:
                if len(table_rows) > 1:
                    t = Table(table_rows, colWidths=[515 / len(table_rows[0])] * len(table_rows[0]))
                    t.setStyle(TableStyle([
                        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1A237E")),
                        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CCCCCC")),
                        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F9F9F9")]),
                        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
                        ('TOPPADDING', (0,0), (-1,-1), 3),
                        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
                    ]))
                    story.append(t)
                    story.append(Spacer(1, 6))
                in_table = False
                table_rows = []

            def clean_latex_math(match):
                raw = match.group(1)
                s = raw
                s = s.replace(r'\times', ' x ').replace(r'\approx', ' ~ ').replace(r'\ge', ' >= ').replace(r'\le', ' <= ').replace(r'\cdot', ' * ').replace(r'\propto', ' proportional to ')
                s = s.replace(r'\Delta', 'Delta ').replace(r'\Omega', 'Omega ').replace(r'\omega', 'omega ')
                s = s.replace(r'\phi', 'phi ').replace(r'\rho', 'rho ').replace(r'\theta', 'theta ')
                s = s.replace(r'\circ', '°')
                s = re.sub(r'\\text\{(.+?)\}', r'\1', s)
                s = re.sub(r'\^\{?([0-9a-zA-Z+-]+)\}?', r'<sup>\1</sup>', s)
                s = re.sub(r'_\{?([0-9a-zA-Z+-]+)\}?', r'<sub>\1</sub>', s)
                s = re.sub(r'\\frac\{(.+?)\}\{(.+?)\}', r'(\1 / \2)', s)
                return f"<b>{s.strip()}</b>"

            # Format bullet points
            clean_line = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', line_str)
            clean_line = re.sub(r'\*(.+?)\*', r'<i>\1</i>', clean_line)
            clean_line = re.sub(r'\$(.+?)\$', clean_latex_math, clean_line)

            if line_str.startswith("* ") or line_str.startswith("- "):
                bullet_content = clean_line[2:]
                story.append(Paragraph(f"• {bullet_content}", styles['BulletCustom']))
            elif line_str.startswith("1. ") or line_str.startswith("2. ") or line_str.startswith("3. ") or line_str.startswith("4. ") or line_str.startswith("5. "):
                story.append(Paragraph(clean_line, styles['BulletCustom']))
            elif line_str.startswith("## ") or line_str.startswith("### "):
                sub_h = line_str.replace("## ", "").replace("### ", "")
                story.append(Paragraph(sub_h, styles['SubSectionHeader']))
            else:
                story.append(Paragraph(clean_line, styles['BodyCustom']))

        if in_table and len(table_rows) > 1:
            t = Table(table_rows, colWidths=[515 / len(table_rows[0])] * len(table_rows[0]))
            t.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1A237E")),
                ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CCCCCC")),
                ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F9F9F9")]),
                ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ]))
            story.append(t)
            story.append(Spacer(1, 6))
            in_table = False
            table_rows = []

        story.append(Spacer(1, 12))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {output_path}")


def generate_question_bank_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=35,
        rightMargin=35,
        topMargin=50,
        bottomMargin=50
    )
    styles = get_custom_styles()
    story = []

    story.append(Paragraph("DGCA AVIATION METEOROLOGY", styles['DocTitle']))
    story.append(Paragraph("818 QUESTIONS BANK & ANSWER KEY — FOR DAIVAM MEHTA", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor("#000000"), spaceAfter=15))

    json_path = os.path.join(os.path.dirname(__file__), "..", "question_bank", "VOLARE_ALL_QUESTIONS.json")
    with open(json_path, "r", encoding="utf-8") as f:
        questions = json.load(f)

    story.append(Paragraph(f"Total Verified Questions: <b>{len(questions)}</b> | Sources: DGCA / Volare Question Bank", styles['BodyCustom']))
    story.append(Spacer(1, 10))

    # Render questions in clean blocks
    for q in questions:
        q_num = q["id"]
        q_text = q["question"]
        q_ans = q.get("answer", "")
        options = q.get("options", {})

        q_block = []
        q_head = f"<b>Q{q_num}.</b> {q_text}"
        q_block.append(Paragraph(q_head, styles['SubSectionHeader']))

        opts_text = []
        for opt_key in sorted(options.keys()):
            is_correct = (opt_key == q_ans)
            marker = f"<b>[{opt_key}]</b>" if not is_correct else f"<b><font color='#1B5E20'>[{opt_key}] (CORRECT ANSWER) ✓</font></b>"
            opts_text.append(Paragraph(f"{marker} {options[opt_key]}", styles['BulletCustom']))
        
        for ot in opts_text:
            q_block.append(ot)
        
        q_block.append(Spacer(1, 4))
        story.append(KeepTogether(q_block))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {output_path}")


if __name__ == "__main__":
    generate_formula_sheet_pdf(os.path.join(PDF_DIR, "01_DGCA_Formula_Cheat_Sheet_Daivam_Mehta.pdf"))
    generate_metar_taf_pdf(os.path.join(PDF_DIR, "02_METAR_TAF_Decoder_Guide_Daivam_Mehta.pdf"))
    generate_notes_pdf(os.path.join(PDF_DIR, "03_Complete_Theory_Notes_21_Chapters.pdf"))
    generate_question_bank_pdf(os.path.join(PDF_DIR, "04_DGCA_818_Questions_Bank_with_Answers.pdf"))
    print("All 4 PDFs generated successfully!")
