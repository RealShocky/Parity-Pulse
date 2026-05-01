import { useState } from 'react';
import { Athlete } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const ParityLens = ({ data }: { data: Athlete[] }) => {
  const [activeTab, setActiveTab] = useState('Representation');

  const tabs = ['Representation', 'Hometowns', 'Milestones', 'LA28 Ready'];

  // Aggregate data for representations (e.g. state counts)
  const stateCounts = data.reduce((acc, curr) => {
    if (!acc[curr.state]) {
      acc[curr.state] = { State: curr.state, Olympic: 0, Paralympic: 0 };
    }
    acc[curr.state][curr.olympic_type] += 1;
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(stateCounts)
    .sort((a, b) => (b.Olympic + b.Paralympic) - (a.Olympic + a.Paralympic))
    .slice(0, 10);

  return (
    <div className="flex-1 bg-[#0F172A] border border-white/10 rounded-xl p-4 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                activeTab === tab ? 'border-b border-white pb-1 text-white' : 'text-white/40 hover:text-white pb-1'
              }`}
            >
              {tab}
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

      <div className="h-[350px] w-full relative bg-[#050A18] border border-white/5 rounded-lg overflow-hidden pt-4">
        {activeTab === 'Representation' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="State" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase' }} />
              <Bar dataKey="Olympic" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Paralympic" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 text-[10px] uppercase font-bold tracking-widest text-center px-4">
            Select Representation to view top States by athlete count.<br/><br/>
            Other metrics require further dataset processing.
          </div>
        )}
      </div>
    </div>
  );
};
