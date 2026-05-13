'use client';

import { useState } from 'react';

export default function GenerativeBlueprint() {
  const [topic, setTopic] = useState('');
  const [dossier, setDossier] = useState<{precedent: string, trap: string, blueprint: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!topic) return;
    setLoading(true);
    // Simulated dossier generation
    setTimeout(() => {
      setDossier({
        precedent: `Found ${Math.floor(Math.random() * 5) + 2} audits related to ${topic.toLowerCase()} grants and projects.`,
        trap: "The primary failure is lack of prevailing wage documentation and secondary validation on specialized fund disbursements.",
        blueprint: "Ensure the prime contractor submits certified payrolls weekly and implement a tiered approval matrix for all projects."
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      <div className="bg-oracle text-snow rounded-[2.5rem] p-8 shadow-oracle relative overflow-hidden group">
        {/* Topo Background Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M0 30 Q 15 15, 30 30 T 60 30\\' fill=\\'none\\' stroke=\\'white\\' stroke-width=\\'0.5\\'/%3E%3C/svg%3E')]"></div>

        <div className="relative z-10 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
            <svg className="w-6 h-6 text-snow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold tracking-tight">THE COMMUNITY HELPER</h3>
            <p className="text-blue-100 leading-relaxed">
              Are you curious about a city plan? Tell us what’s on your mind. We’ll look at past audits and recent meeting notes to give you a simple summary.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-snow placeholder-blue-200 outline-none focus:bg-white/20 transition-all text-sm" 
              placeholder="Example: 'New bike lanes'"
            />
            <button 
              onClick={handleAsk}
              disabled={loading}
              className="w-full bg-snow text-oracle py-4 rounded-2xl font-bold hover:shadow-lg transition-all shadow-md disabled:opacity-80"
            >
              {loading ? 'Analyzing Records...' : 'Get Record Summary'}
            </button>
          </div>

          <div className="pt-6 border-t border-white/10">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-3">WHAT THE RECORDS SHOW</h4>
            
            {!dossier ? (
              <div className="space-y-3 opacity-60">
                <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                <div className="h-2 bg-white/20 rounded-full w-full"></div>
                <div className="h-2 bg-white/20 rounded-full w-1/2"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-in fade-in duration-500">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">
                        Historical Precedent
                    </span>
                    <p className="text-sm text-white leading-relaxed font-semibold">{dossier.precedent}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">
                        The Trap
                    </span>
                    <p className="text-sm text-white leading-relaxed font-semibold">{dossier.trap}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">
                        The Blueprint
                    </span>
                    <p className="text-sm text-white leading-relaxed font-bold bg-black/10 p-3 rounded-lg border border-white/10">
                      {dossier.blueprint}
                    </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-evergreen transition-colors">
          <h4 className="font-bold text-slate-900 mb-2">Spot the patterns</h4>
          <p className="text-xs text-slate-500 leading-relaxed">Search our data in seconds to find the facts you need for investigative stories.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-evergreen transition-colors">
          <h4 className="font-bold text-slate-900 mb-2">Learn from others</h4>
          <p className="text-xs text-slate-500 leading-relaxed">See how other cities handled the same problems you’re facing today.</p>
        </div>
      </div>
    </>
  );
}
