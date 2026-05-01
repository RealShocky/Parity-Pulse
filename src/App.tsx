/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Athlete } from './types';
import { loadParityData } from './services/dataService';
import { Hero } from './components/Hero';
import { UnityDashboard } from './components/UnityDashboard';
import { DataProvenance } from './components/DataProvenance';
import { ParityLens } from './components/ParityLens';
import { GeminiAnalyst } from './components/GeminiAnalyst';
import { LA28Ahead } from './components/LA28Ahead';
import { ConstellationMap } from './components/ConstellationMap';
import { loginWithGoogle, logout, auth } from './lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<Athlete[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [missingFiles, setMissingFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setAuthChecking(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    async function init() {
      try {
        const result = await loadParityData();
        setData(result.data);
        setSources(result.sources);
        setMissingFiles(result.missingFiles);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  if (authChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white">
         <Loader2 className="animate-spin w-8 h-8 mr-3" /> Checking auth...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Parity Pulse</h1>
        <p className="text-neutral-400 mb-8 max-w-md text-center">
          Login to access the Team USA Performance Parity Report and utilize the Gemini Analyst.
        </p>
        <button 
          onClick={loginWithGoogle}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Login with Google
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white">
         <Loader2 className="animate-spin w-8 h-8 mr-3" /> Loading Real Data...
      </div>
    );
  }

  const olympicData = data.filter(d => d.olympic_type === 'Olympic');
  const paralympicData = data.filter(d => d.olympic_type === 'Paralympic');

  return (
    <div className="min-h-screen bg-[#050A18] text-slate-100 font-sans selection:bg-blue-500/30 font-sans flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 border-b border-white/10 bg-gradient-to-r from-[#002868] to-[#050A18]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
            <div className="w-5 h-5 flex flex-wrap gap-0.5">
              <div className="w-2 h-2 bg-[#E6162D]"></div>
              <div className="w-2 h-2 bg-[#002868]"></div>
              <div className="w-2 h-2 bg-[#002868]"></div>
              <div className="w-2 h-2 bg-[#E6162D]"></div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter uppercase leading-none mt-1">PARITY PULSE</h1>
            <p className="text-[10px] text-white/60 tracking-widest uppercase leading-none">One Team. Two Stages. Equal Spotlight.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-widest text-[#002868]">
           <button onClick={logout} className="px-4 py-2 bg-white text-[#002868] text-xs font-bold rounded hover:bg-slate-200 transition-colors">Sign Out {user.email?.split('@')[0]}</button>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {missingFiles.length > 0 && (
          <div className="bg-orange-500/10 border border-orange-500/50 text-orange-200 p-6 rounded-xl">
            <h3 className="font-semibold text-lg mb-2 text-orange-400">Data Missing</h3>
            <p className="mb-4 text-orange-200/80">The following necessary real data files are missing from the <code className="bg-black/30 px-1 py-0.5 rounded">/data</code> folder. The dashboard features will be limited.</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 text-orange-300">
              {missingFiles.map(f => <li key={f}>{f}</li>)}
            </ul>
            <p className="text-sm opacity-70">We enforce strict data provenance. Fake mock datasets cannot be used for this parity report.</p>
          </div>
        )}

        <Hero />
        
        <div className="flex flex-col lg:flex-row gap-4">
          <aside className="w-full lg:w-1/4 flex flex-col gap-4">
             <GeminiAnalyst data={data} />
          </aside>

          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            <UnityDashboard olympic={olympicData} paralympic={paralympicData} />
            <ConstellationMap data={data} />
            <ParityLens data={data} />
          </div>
        </div>

        <LA28Ahead />

        <DataProvenance sources={sources} />
      </main>
      
      <footer className="h-16 border-t border-white/5 bg-[#0A192F] px-6 flex items-center justify-between mt-12">
        <div className="flex items-center gap-6">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">&copy; 2026 Team USA x Google Cloud Hackathon</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Built with Vite, React, and Gemini AI</span>
        </div>
      </footer>
    </div>
  );
}
