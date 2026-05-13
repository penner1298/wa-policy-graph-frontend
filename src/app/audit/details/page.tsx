import Database from 'better-sqlite3';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Finding } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AuditPage({ searchParams }: { searchParams: { report_num?: string } }) {
  const report_num = searchParams.report_num;
  if (!report_num) notFound();

  const dbPath = path.resolve(process.cwd(), '../sao-scraper/sao_2024.db');
  const db = new Database(dbPath, { readonly: true });
  
  const audit = db.prepare('SELECT * FROM findings WHERE report_num = ?').get(report_num) as Finding | undefined;

  if (!audit) notFound();

  return (
    <main className="min-h-screen bg-obsidian p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <header className="border-b border-white/10 pb-6">
          <Link href="/" className="text-[10px] text-oracle font-mono uppercase hover:underline mb-4 block">&larr; Return_To_Ledger</Link>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Audit_Report_File</span>
              <h1 className="text-3xl font-bold text-slate-50 tracking-tight mt-1">{audit.jurisdiction}</h1>
              <p className="text-sm text-slate-400 font-mono mt-2 uppercase tracking-widest">{audit.type} {"//"} REPORT_#{audit.report_num}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Impact_Mapped</span>
              <p className={`text-2xl font-bold font-mono mt-1 ${audit.dollar_impact > 0 ? 'text-critical' : 'text-slate-300'}`}>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(audit.dollar_impact)}
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <div className="glass p-6">
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Findings_Summary</h3>
              <p className="text-sm text-slate-200 leading-relaxed">{audit.summary}</p>
            </div>
            <div className="glass p-6 border-critical/30">
              <h3 className="text-xs font-mono text-critical uppercase tracking-widest mb-4 border-b border-critical/10 pb-2">Root_Cause_Analysis</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono italic">&ldquo;{audit.root_cause}&rdquo;</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="glass p-6 bg-gunmetal">
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">File_Metadata</h3>
              <dl className="flex flex-col gap-4 font-mono text-[11px]">
                <div>
                  <dt className="text-slate-600 uppercase">Category</dt>
                  <dd className="text-slate-300 mt-1">{audit.category}</dd>
                </div>
                <div>
                  <dt className="text-slate-600 uppercase">Status</dt>
                  <dd className="text-pass mt-1">EXTRACTED_BY_MEMBRANE_V1</dd>
                </div>
              </dl>
              <button className="w-full mt-8 border border-white/10 bg-white/5 text-slate-300 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download_Original_PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
