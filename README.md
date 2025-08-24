# COVID-19 Analysis (D3.js v7)

Interactive, single-page visualizations exploring COVID-19 metrics by country. Built with **D3.js v7** and vanilla HTML/CSS. The app renders a choropleth world map plus linked charts (stringency, cases/deaths/vaccinations, GDP vs cases). Clicking a country on the map updates the other charts.

---

## Project purpose & objectives

- Provide an interactive, browser-based way to explore global COVID-19 trends.  
- Link geography (map) with time-series charts for rapid comparison and drill-down.  
- Show relationships between policy stringency, epidemiological trends, vaccination progress, and GDP per capita (as present in the source CSV).

---

## Visualizations

1. **World Map (Choropleth)** — colors countries by total cases for a **selected date**; clicking a country updates all charts.  
2. **Stringency Area Chart** — government response stringency over time for the selected country; includes brushing/zoom. (Function call present; chart code in separate file.)  
3. **Cases/Deaths/Vaccinations (Multi-line)** — time series of new cases, deaths, and vaccinations per million.  
4. **Vaccination Status (Multi-line)** — people vaccinated, fully vaccinated, and boosters per hundred over time.  
5. **GDP vs Cases (Dual-axis lines)** — new cases per million (left Y) and GDP per capita (right Y) over time for the selected country.  
6. **Clustered Bar Chart** — compares **GDP per capita** vs **new cases (smoothed)** for a fixed set of countries.

**Linked interactions:** Map → all charts via shared country selection.

---

## Data sources (as used in code)

- **Our World in Data COVID-19 CSV**  
  `https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv`  
- **World GeoJSON**  
  `https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson`

> Note: The narrative in the report references WHO, but the running application fetches data from **Our World in Data** endpoints listed above.

---

## How to run

1. Open `index.html` in a modern browser with internet access.  
2. Use the **date picker** (top of page) to choose a date for the map.  
3. **Click a country** on the map to populate/update the charts.

---

## Current progress

- Single page app (`index.html`) loading D3 v7 and visualization scripts.  
- Map selection triggers updates in the other charts.  
- Clustered bar compares GDP per capita vs smoothed new cases.

---

## Code documentation status

Inline comments exist; module/function docstrings are mostly absent. **TO BE DOCUMENTED.**

---

## References & reports

- **Sanitized Technical Report (non-coursework):** `docs/Report_sanitized.md`.  
- **Original report (archived):** `docs/Report.docx`

---

## Known limitations / TODO

- Map requires a date selection to populate values; consider a sensible default (e.g., latest available date).  
- Country name matching between GeoJSON and OWID requires validation.  
- Multi-cases chart scaling for deaths (currently *1000) needs correction.  
- Add module-level headers and docstrings.  
- Accessibility (ARIA labels, keyboard support, color contrast).

---

## Getting involved

1. Open an issue for bugs or inconsistencies.  
2. Submit PRs with targeted changes.  
3. Keep all new code client-side with D3.js v7 unless requirements change.
