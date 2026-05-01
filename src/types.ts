export interface Athlete {
  id: string;
  name: string;
  sport: string;
  hometown: string;
  state: string;
  olympic_type: 'Olympic' | 'Paralympic';
  medals: number;
  lat?: number;
  lng?: number;
}

export interface Insight {
  insight_title: string;
  plain_english_summary: string;
  data_points_used: string[];
  caveat: string;
  confidence_level: 'High' | 'Medium' | 'Low';
  source_refs: string[];
}
