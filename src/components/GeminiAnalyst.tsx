import { useState } from 'react';
import { Athlete, Insight } from '../types';
import { fetchGeminiInsights } from '../services/geminiService';
import { Bot, Loader2, FileWarning } from 'lucide-react';

export const GeminiAnalyst = ({ data }: { data: Athlete[] }) => {
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      // Reduce data size for prompt to avoid token limits by just passing aggregations
      const olympicCount = data.filter(d => d.olympic_type === 'Olympic').length;
      const paralympicCount = data.filter(d => d.olympic_type === 'Paralympic').length;
      
      const payload = {
        total_olympics: olympicCount,
        total_paralympics: paralympicCount,
        sample: data.slice(0, 100).map(d => ({ state: d.state, sport: d.sport, type: d.olympic_type }))
      };

      const res = await fetchGeminiInsights(
        'Generate an interesting insight comparing Olympic and Paralympic representation for Team USA.',
        'You are an AI analyst focused on the Team USA Parity report. Treat Olympic and Paralympic data with absolute equality.',
        payload
      );

      if (res.insights && res.insights.length > 0) {
        setInsight(res.insights[0]);
      } else {
        setError('No insights returned.');
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-[#0F172A] border border-white/5 rounded-xl p-4 flex flex-col overflow-hidden relative">
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
          <Bot className="w-4 h-4" /> Gemini Analyst
        </h3>
        <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-white/40">v2.5 FLASH</span>
      </div>

      <div className="flex-1 relative z-10 flex flex-col">
        {!insight && !loading && !error && (
          <div className="flex-1 flex flex-col justify-center items-center text-center py-6 mb-4">
             <Bot className="w-16 h-16 text-white/10 mb-2" />
             <p className="text-white/40 text-xs uppercase tracking-widest max-w-[150px]">
              Ready to generate insights
            </p>
          </div>
        )}

        {loading && (
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4 py-12 mb-4">
             <Loader2 className="w-6 h-6 animate-spin text-red-500" />
             <p className="text-[10px] uppercase text-white/40 tracking-wider">Analyzing...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border-l-2 border-red-500 rounded p-3 mb-4">
            <p className="text-[10px] text-red-400 font-mono">{error}</p>
          </div>
        )}

        {insight && !loading && (
          <div className="space-y-3 mb-4 overflow-y-auto pr-1 custom-scrollbar">
            <div className="bg-white/5 rounded p-3 border-l-2 border-red-500">
              <p className="text-[11px] font-bold mb-1 uppercase">{insight.insight_title}</p>
              <p className="text-xs text-slate-400 leading-relaxed italic">{insight.plain_english_summary}</p>
              <div className="mt-2 flex gap-2">
                <span className={`text-[9px] uppercase font-bold ${
                  insight.confidence_level === 'High' ? 'text-green-400' :
                  insight.confidence_level === 'Medium' ? 'text-amber-400' :
                  'text-red-400'
                }`}>
                  {insight.confidence_level} Confidence
                </span>
              </div>
            </div>

            <div className="bg-white/5 rounded p-3 border-l-2 border-amber-500">
              <p className="text-[11px] font-bold mb-1 uppercase text-amber-500">Caveat</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">{insight.caveat}</p>
            </div>
          </div>
        )}

        <div className="mt-auto">
          <button 
            onClick={handleGenerate}
            disabled={loading || data.length === 0}
            className="w-full py-2 bg-white text-[#002868] font-bold text-xs rounded hover:bg-slate-200 transition disabled:opacity-50 uppercase tracking-widest"
          >
            Generate Insight
          </button>
        </div>
      </div>
    </div>
  );
};
