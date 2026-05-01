import { Calendar, ArrowRight } from 'lucide-react';

export const LA28Ahead = () => {
  return (
    <section className="bg-gradient-to-br from-[#0A192F] to-[#112240] p-8 md:p-12 rounded-xl border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-white to-blue-500" />
      
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold mb-4">The Road to LA28</h2>
        <p className="text-slate-300 text-lg mb-8">
          The 2028 Summer Games mark a historic return to Los Angeles. As we prepare, Parity Pulse provides the fundamental framework for how fans will track, compare, and celebrate the Olympic and Paralympic trajectories with absolute equality.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#050A18] border border-white/5 p-6 rounded-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
            <div className="flex items-center gap-3 mb-2 text-blue-400 relative z-10">
              <Calendar className="w-5 h-5" />
              <h3 className="font-bold tracking-widest uppercase text-xs">Olympic Games</h3>
            </div>
            <p className="text-2xl font-black font-mono relative z-10">July 14 – July 30, 2028</p>
          </div>
          <div className="bg-[#050A18] border border-white/5 p-6 rounded-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
            <div className="flex items-center gap-3 mb-2 text-red-400 relative z-10">
              <Calendar className="w-5 h-5" />
              <h3 className="font-bold tracking-widest uppercase text-xs">Paralympic Games</h3>
            </div>
            <p className="text-2xl font-black font-mono relative z-10">August 15 – August 27, 2028</p>
          </div>
        </div>

        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-white text-slate-400 transition-colors">
          Read the Parity Methodology <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
