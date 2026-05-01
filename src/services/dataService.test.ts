import { describe, it, expect, vi } from 'vitest';
import { loadParityData } from './dataService';

// Mock fetch
global.fetch = vi.fn() as any;

describe('dataService', () => {
  it('handles missing files gracefully', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false
    });

    const result = await loadParityData();
    expect(result.data).toEqual([]);
    expect(result.missingFiles.length).toBe(2);
    expect(result.sources.length).toBe(2);
    expect(result.sources[0].error).toBeDefined();
  });

  it('parses valid CSV properly', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      text: async () => `name,sport,hometown,state,lat,lng,medals\nJohn Doe,Swimming,Los Angeles,CA,34.0,-118.0,2`
    });

    const result = await loadParityData();
    // Two sources fetched, so 2 rows total
    expect(result.data.length).toBe(2);
    expect(result.data[0].name).toBe('John Doe');
    expect(result.data[0].medals).toBe(2);
    expect(result.data[0].olympic_type).toBe('Olympic');
    expect(result.data[1].olympic_type).toBe('Paralympic');
  });
});
