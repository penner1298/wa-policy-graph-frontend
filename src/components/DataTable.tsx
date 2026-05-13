'use client';

import { useRouter } from 'next/navigation';
import { Finding } from '@/lib/db';

export default function DataTable({ findings }: { findings: Finding[] }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-6">
      {findings.slice(0, 4).map((finding) => (
        <div 
          key={finding.report_num} 
          onClick={() => router.push(`/audit/details?report_num=${finding.report_num}`)}
          className="bg-white p-8 rounded-3xl shadow-luxe border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
            <div className="space-y-1 pr-4">
              <h4 className="text-2xl font-bold text-slate-900 group-hover:text-evergreen transition-colors">
                {finding.jurisdiction} {finding.type}
              </h4>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                {finding.jurisdiction} | Report #{finding.report_num}
              </p>
            </div>
            <div className="text-left md:text-right shrink-0">
              <div className={`text-3xl font-mono font-bold ${finding.dollar_impact > 0 ? 'text-deficit' : 'text-surplus'}`}>
                {finding.dollar_impact > 0 
                  ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, notation: "compact", compactDisplay: "short" }).format(finding.dollar_impact)
                  : '$45M'}
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${finding.dollar_impact > 0 ? 'text-deficit' : 'text-surplus'}`}>
                {finding.dollar_impact > 0 ? 'Financial Variance' : 'Fully Funded'}
              </div>
            </div>
          </div>
          
          <div className="bg-mist p-6 rounded-2xl border border-slate-200/60 mb-6">
            <p className="text-xs font-bold text-evergreen uppercase mb-2 tracking-widest">What this means:</p>
            <p className="text-slate-600 leading-relaxed line-clamp-3">
              {finding.summary}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span 
              onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/search?category=${encodeURIComponent(finding.category)}`);
              }}
              className="px-3 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-200 uppercase tracking-wider hover:bg-evergreen/10 hover:text-evergreen hover:border-evergreen/20 transition-colors"
            >
              {finding.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
