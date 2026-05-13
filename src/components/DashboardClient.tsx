'use client';

import DataTable from './DataTable';
import GenerativeBlueprint from './GenerativeBlueprint';
import { Finding } from '@/lib/db';

interface DashboardClientProps {
  initialFindings: Finding[];
}

export default function DashboardClient({ initialFindings }: DashboardClientProps) {
  // Sorting by dollar impact for initial view as requested
  const topFindings = [...initialFindings].sort((a, b) => b.dollar_impact - a.dollar_impact);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start pt-12 border-t border-slate-200/60">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Community Discoveries</h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded-full">Recent</span>
            <span className="px-3 py-1 text-slate-400 text-xs font-bold rounded-full hover:bg-slate-100 cursor-pointer transition-colors">Trending</span>
          </div>
        </div>
        <DataTable findings={topFindings} />
      </div>
      
      <div className="lg:col-span-1 space-y-6 sticky top-32">
        <GenerativeBlueprint />
      </div>
    </div>
  );
}
