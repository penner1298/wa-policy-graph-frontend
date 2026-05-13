import Link from 'next/link';

export default function EnterprisePage() {
  return (
    <main className="min-h-screen bg-black text-slate-400 font-mono p-8 selection:bg-oracle/40">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <header className="border-b border-white/20 pb-8 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 bg-critical text-white text-[10px] font-bold">RESTRICTED_ACCESS</span>
              <span className="text-slate-700 text-[10px]">ENCRYPTION: AES-256</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tighter uppercase">Institutional_Risk_Terminal</h1>
            <p className="text-[10px] text-slate-500 mt-2 tracking-widest">ENTERPRISE_TIER // UNDERWRITER_FEED_V4.0</p>
          </div>
          <Link href="/" className="text-[10px] text-slate-600 hover:text-white uppercase transition-colors underline">Terminate_Session</Link>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 border border-white/10 bg-[#0A0A0A] p-8">
            <h2 className="text-white text-lg mb-6 border-l-4 border-oracle pl-4">Market_Positioning</h2>
            <p className="text-sm leading-relaxed mb-8 text-slate-300">
              Ditch the consumer-friendly filters. Our Enterprise Feed provides raw, real-time exposure mapping for the municipal bond market.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="border-t border-white/5 pt-4">
                <span className="text-oracle block mb-2 font-bold text-xs uppercase tracking-tighter">API_Direct_Connect</span>
                <p className="text-[11px] leading-relaxed">JSON-LD municipal risk feeds delivered via dedicated high-bandwidth nodes.</p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-oracle block mb-2 font-bold text-xs uppercase tracking-tighter">Sync_Trend_Alerts</span>
                <p className="text-[11px] leading-relaxed">Early-warning detection for cross-jurisdictional systemic control failures.</p>
              </div>
            </div>

            <div className="bg-critical/5 border border-critical/20 p-6 flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-bold uppercase">Ready_to_Upgrade?</p>
                <p className="text-[10px] text-critical mt-1 uppercase">Starting at $60,000 / Year / Node</p>
              </div>
              <button className="bg-critical text-white px-6 py-2 text-xs font-bold uppercase hover:bg-red-700 transition-colors">Request_Key</button>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="border border-white/10 bg-[#0A0A0A] p-6">
              <h3 className="text-white text-xs mb-4 uppercase tracking-widest">Network_Status</h3>
              <div className="flex flex-col gap-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-600">NODE_{i.toString().padStart(2, '0')}</span>
                    <span className="text-pass">ONLINE</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/10 bg-[#0A0A0A] p-6 italic">
              <p className="text-[11px] leading-relaxed text-slate-500">
                &ldquo;The only platform that mapped the 2024 regional internal control decay before the credit downgrades hit the news cycle.&rdquo;
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
