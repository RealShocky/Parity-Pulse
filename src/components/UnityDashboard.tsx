import { Athlete } from '../types';
import { motion } from 'motion/react';
import { Users, MapPin, Target, Trophy } from 'lucide-react';

interface PanelProps {
  title: string;
  data: Athlete[];
  accentColor: string;
}

const StatPanel = ({ title, data, accentColor }: PanelProps) => {
  const sportsCount = new Set(data.map(d => d.sport)).size;
  const hometownCount = new Set(data.map(d => d.hometown)).size;
  const medalsCount = data.reduce((acc, curr) => acc + curr.medals, 0);
  const colorHex = accentColor.includes('blue') ? '#3b82f6' : '#ef4444';

  return (
    <div className={`p-5 rounded-xl border border-white/10 bg-gradient-to-br from-[#0A192F] to-[#112240] relative overflow-hidden h-full flex flex-col justify-between`}>
      <div 
        className={`absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl`} 
        style={{ backgroundColor: colorHex, opacity: 0.15 }} 
      />
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-sm font-black tracking-widest uppercase">{title}</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
        <div>
          <div className="flex items-center gap-2 text-white/40 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-[10px] uppercase font-semibold tracking-wider">Athletes</span>
          </div>
          <div className="text-3xl font-bold font-mono leading-none">{data.length}</div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 text-white/40 mb-1">
            <Target className="w-4 h-4" />
            <span className="text-[10px] uppercase font-semibold tracking-wider">Sports</span>
          </div>
          <div className="text-3xl font-bold font-mono leading-none">{sportsCount}</div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-white/40 mb-1">
            <MapPin className="w-4 h-4" />
            <span className="text-[10px] uppercase font-semibold tracking-wider">Hometowns</span>
          </div>
          <div className="text-xl font-bold leading-none mt-1">{hometownCount} Cities</div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-white/40 mb-1">
            <Trophy className="w-4 h-4" />
            <span className="text-[10px] uppercase font-semibold tracking-wider">Medals</span>
          </div>
          <div className="text-xl font-bold leading-none mt-1">{medalsCount} Recorded</div>
        </div>
      </div>
      
      <div className="mt-6 h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full w-[85%] ${accentColor}`} />
      </div>
    </div>
  );
};

export const UnityDashboard = ({ olympic, paralympic }: { olympic: Athlete[], paralympic: Athlete[] }) => {
  return (
    <section className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4 items-stretch">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <StatPanel title="Olympic Team USA" data={olympic} accentColor="bg-red-500" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="h-full">
          <StatPanel title="Paralympic Team USA" data={paralympic} accentColor="bg-blue-500" />
        </motion.div>
      </div>
    </section>
  );
};
