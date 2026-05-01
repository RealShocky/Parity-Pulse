import { Database, ShieldCheck } from 'lucide-react';

export const DataProvenance = ({ sources }: { sources: any[] }) => {
  return (
    <section className="border-t border-white/10 pt-16">
      <div className="flex items-center gap-3 mb-8">
        <Database className="w-6 h-6 text-slate-400" />
        <h2 className="text-2xl font-bold tracking-tight">Data Provenance</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {sources.map((s, i) => (
          <div key={i} className="bg-[#0F172A] border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-100 opacity-0" />
            <div className="flex items-start justify-between mb-4 relative z-10">
              <h3 className="font-bold text-sm tracking-widest uppercase">{s.name}</h3>
              {s.error ? (
                <span className="text-[10px] font-bold tracking-widest uppercase bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20">{s.error}</span>
              ) : (
                <span className="text-[10px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            <div className="space-y-3 text-xs text-slate-400 relative z-10">
              <p className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-500 uppercase tracking-widest font-bold text-[9px]">Source URL</span> <code className="text-blue-400 font-mono">{s.url}</code></p>
              <p className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-500 uppercase tracking-widest font-bold text-[9px]">Rows Indexed</span> <span className="font-mono">{s.rowCount}</span></p>
              <p className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-500 uppercase tracking-widest font-bold text-[9px]">Last Fetched</span> <span className="font-mono">{new Date(s.lastUpdated).toLocaleDateString()}</span></p>
              <div className="mt-4 p-3 bg-white/5 rounded border border-white/5 text-slate-300">
                <span className="font-bold tracking-widest uppercase text-[9px] text-amber-500 block mb-1">Caveat</span>
                <span className="leading-relaxed italic">{s.caveat}</span>
              </div>
            </div>
          </div>
        ))}
        {sources.length === 0 && (
          <div className="col-span-2 p-8 text-center text-neutral-500 bg-neutral-900 rounded-xl border border-neutral-800">
            No datasets have been loaded. Please check your data directory.
          </div>
        )}
      </div>
    </section>
  );
};
