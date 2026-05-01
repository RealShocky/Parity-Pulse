/* Optional NIL-safe TeamUSA browser aggregate extractor.
Use only on official public TeamUSA roster pages you are allowed to view in your browser.
It does NOT export athlete names, images, profile links, education, bios, finish times, or scores.
Set PROGRAM_TYPE to Olympic or Paralympic, then run exportTeamUSAAggregates(). */

const PROGRAM_TYPE = 'Olympic';
const YEAR = 2024;
function downloadCsv(filename, rows) {
  if (!rows.length) { console.warn('No aggregate rows found. Make sure the roster table is visible.'); return; }
  const headers = Object.keys(rows[0]);
  const esc = (v) => '"' + String(v ?? '').replaceAll('"', '""') + '"';
  const csv = [headers.join(','), ...rows.map(r => headers.map(h => esc(r[h])).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
}
function normalizeState(raw) { const m = String(raw || '').match(/,\s*([A-Z]{2})\b/); return m ? m[1] : ''; }
function normalizeCity(raw) { return String(raw || '').split(',')[0].trim(); }
function safeText(el) { return (el?.innerText || '').replace(/\s+/g, ' ').trim(); }
function extractVisibleRows() {
  const tableRows = [...document.querySelectorAll('table tbody tr')];
  return tableRows.map(tr => {
    const cells = [...tr.querySelectorAll('td')].map(safeText);
    const sport = cells[1] || '';
    const hometown = cells[3] || '';
    return { program_type: PROGRAM_TYPE, year: YEAR, sport, hometown_city: normalizeCity(hometown), hometown_state: normalizeState(hometown), source_name: 'Official TeamUSA roster page, browser-visible public table', source_url: location.href, last_verified: new Date().toISOString().slice(0, 10) };
  }).filter(r => r.sport && r.hometown_state);
}
function groupBy(rows, keys) {
  const map = new Map();
  for (const r of rows) {
    const id = keys.map(k => r[k]).join('|');
    if (!map.has(id)) { const base = {}; for (const k of keys) base[k] = r[k]; base.athlete_count = 0; base.source_name = r.source_name; base.source_url = r.source_url; base.last_verified = r.last_verified; base.nil_safe = 'yes'; base.notes = 'Generated in browser from public TeamUSA visible table. No athlete names or NIL fields exported.'; map.set(id, base); }
    map.get(id).athlete_count += 1;
  }
  return [...map.values()].sort((a,b) => b.athlete_count - a.athlete_count);
}
function exportTeamUSAAggregates() {
  const rows = extractVisibleRows();
  downloadCsv(`teamusa_${PROGRAM_TYPE.toLowerCase()}_sport_state_aggregate.csv`, groupBy(rows, ['program_type','year','sport','hometown_state']));
  downloadCsv(`teamusa_${PROGRAM_TYPE.toLowerCase()}_hometown_city_aggregate.csv`, groupBy(rows, ['program_type','year','hometown_city','hometown_state']));
  downloadCsv(`teamusa_${PROGRAM_TYPE.toLowerCase()}_sport_aggregate.csv`, groupBy(rows, ['program_type','year','sport']));
}
