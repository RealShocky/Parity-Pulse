import Papa from 'papaparse';
import { Athlete } from '../types';

const API_BASE = '/api/data';

interface DataFetchResult {
  data: Athlete[];
  sources: {
    name: string;
    url: string;
    rowCount: number;
    lastUpdated: string;
    caveat: string;
    error?: string;
  }[];
  missingFiles: string[];
}

export const loadParityData = async (): Promise<DataFetchResult> => {
  const sources = [
    {
      filename: 'olympic_roster_2024_real.csv',
      name: 'Olympic Roster 2024',
      url: `${API_BASE}/olympic_roster_2024_real.csv`,
      caveat: 'Data is strictly derived from public Team USA announcements.',
      type: 'Olympic'
    },
    {
      filename: 'paralympic_roster_2024_real.csv',
      name: 'Paralympic Roster 2024',
      url: `${API_BASE}/paralympic_roster_2024_real.csv`,
      caveat: 'Data is strictly derived from public Team USA announcements.',
      type: 'Paralympic'
    }
  ];

  let athletes: Athlete[] = [];
  const reportSources: DataFetchResult['sources'] = [];
  const missingFiles: string[] = [];

  for (const src of sources) {
    try {
      const resp = await fetch(src.url);
      if (!resp.ok) {
        missingFiles.push(src.filename);
        reportSources.push({
          name: src.name,
          url: src.url,
          rowCount: 0,
          lastUpdated: new Date().toISOString(),
          caveat: src.caveat,
          error: 'File missing or unauthorized'
        });
        continue;
      }
      
      const text = await resp.text();
      const parsed = Papa.parse<any>(text, { header: true, skipEmptyLines: true });
      
      const mapped = parsed.data.map((row, index) => ({
        id: `${src.type}-${index}`,
        name: row.Name || row.name || 'Unknown',
        sport: row.Sport || row.sport || 'Unknown',
        hometown: row.Hometown || row.hometown || 'Unknown',
        state: row.State || row.state || 'Unknown',
        olympic_type: src.type as 'Olympic' | 'Paralympic',
        medals: parseInt(row.Medals || row.medals || '0', 10),
        lat: parseFloat(row.lat || row.Latitude || '0') || undefined,
        lng: parseFloat(row.lng || row.Longitude || '0') || undefined,
      }));

      athletes = athletes.concat(mapped);
      reportSources.push({
        name: src.name,
        url: src.url,
        rowCount: mapped.length,
        lastUpdated: new Date().toISOString(),
        caveat: src.caveat
      });
    } catch (err) {
      missingFiles.push(src.filename);
    }
  }

  return {
    data: athletes,
    sources: reportSources,
    missingFiles
  };
};
