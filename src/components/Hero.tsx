import { motion } from 'motion/react';
import { ArrowDown, Bot } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative py-24 flex flex-col items-center text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20 mb-4">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Challenge 1: Performance Parity Report
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-blue-500">
          Parity Pulse
        </h1>
        <p className="text-2xl md:text-3xl font-light text-slate-300">
          One Team. Two Stages. Equal Spotlight.
        </p>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          An interactive, data-driven fan experience shining an equal light on the Olympic and Paralympic athletes of Team USA. No simulated data. Strictly real achievements.
        </p>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-white text-[#002868] font-bold uppercase tracking-widest text-xs rounded hover:bg-slate-200 transition flex items-center gap-2">
            Explore Team USA <ArrowDown className="w-4 h-4" />
          </button>
          <button className="px-8 py-4 bg-[#0F172A] text-white font-bold uppercase tracking-widest text-xs rounded hover:bg-[#112240] transition flex items-center gap-2 border border-white/10">
            <Bot className="w-4 h-4 text-red-500" /> Open Gemini Analyst
          </button>
        </div>
      </motion.div>
    </section>
  );
};
