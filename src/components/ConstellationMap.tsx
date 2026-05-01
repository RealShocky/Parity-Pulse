import { useState } from 'react';
import { Athlete } from '../types';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const ConstellationMap = ({ data }: { data: Athlete[] }) => {
  const [filter, setFilter] = useState<'All' | 'Olympic' | 'Paralympic'>('All');

  const filteredData = data.filter(d => filter === 'All' || d.olympic_type === filter);
  
  // Create scatter data based on Lat/Lng
  const scatterData = filteredData
    .filter(d => d.lat !== undefined && d.lng !== undefined)
    .map(d => ({
      ...d,
      x: d.lng,
      y: d.lat
    }));

  return (
    <div className="bg-[#0F172A] border border-white/10 rounded-xl p-4 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          {['All', 'Olympic', 'Paralympic'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                filter === f ? 'border-b border-white pb-1 text-white' : 'text-white/40 hover:text-white pb-1'
              }`}
            >
              {f === 'All' ? 'Hometown Map' : f + ' Only'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span className="text-[9px] uppercase tracking-tighter text-white/60">Olympic</span>
          <span className="w-2 h-2 rounded-full bg-blue-500 ml-2"></span>
          <span className="text-[9px] uppercase tracking-tighter text-white/60">Paralympic</span>
        </div>
      </div>

      <div className="h-[400px] w-full relative bg-[#050A18] border border-white/5 rounded-lg overflow-hidden group">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {scatterData.length > 0 ? (
           <ResponsiveContainer width="100%" height="100%">
           <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
             <XAxis 
               type="number" 
               dataKey="x" 
               domain={['auto', 'auto']} 
               hide 
             />
             <YAxis 
               type="number" 
               dataKey="y" 
               domain={['auto', 'auto']} 
               hide 
             />
             <Tooltip 
               cursor={{ strokeDasharray: '3 3' }}
               content={({ active, payload }) => {
                 if (active && payload && payload.length) {
                   const pt = payload[0].payload;
                   return (
                     <div className="bg-neutral-800 border border-white/10 p-3 rounded-lg shadow-xl">
                       <p className="font-bold">{pt.name}</p>
                       <p className="text-sm text-neutral-300">{pt.hometown}, {pt.state}</p>
                       <p className="text-xs text-neutral-400 mt-1">{pt.sport} &bull; {pt.olympic_type}</p>
                     </div>
                   );
                 }
                 return null;
               }}
             />
             <Scatter name="Athletes" data={scatterData}>
               {scatterData.map((entry, index) => (
                 <Cell 
                   key={`cell-${index}`} 
                   fill={entry.olympic_type === 'Olympic' ? '#3b82f6' : '#ef4444'} 
                   opacity={0.7}
                 />
               ))}
             </Scatter>
           </ScatterChart>
         </ResponsiveContainer>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/40 text-[10px] uppercase font-bold tracking-widest">
            No geographic data available
          </div>
        )}
        <div className="absolute bottom-4 left-4 p-2 bg-[#0F172A] border border-white/10 rounded text-[9px] uppercase tracking-widest text-white/60">
          Displaying: {scatterData.length} Roster-Verified Hometowns
        </div>
      </div>
    </div>
  );
};
