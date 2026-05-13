import { getFindings } from '@/lib/db';
import DataTable from '@/components/DataTable';
import SearchBar from '@/components/SearchBar';

export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string };
}) {
  const allFindings = getFindings();
  const q = searchParams.q?.toLowerCase();
  const cat = searchParams.category;

  const results = allFindings.filter(f => {
    if (q) {
      return (f.jurisdiction || '').toLowerCase().includes(q) || 
             (f.summary || '').toLowerCase().includes(q);
    }
    if (cat) {
      return f.category === cat;
    }
    return true;
  }).sort((a, b) => b.dollar_impact - a.dollar_impact);

  return (
    <main className="min-h-screen bg-obsidian p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <header className="border-b border-white/10 pb-4">
          <h1 className="text-xl font-semibold text-slate-50 uppercase tracking-widest">
            Search_Results
          </h1>
          <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mt-1">
            Query: {q || cat || 'ALL'} {"//"} Found {results.length} Matches
          </p>
        </header>

        <div className="max-w-xl">
          <SearchBar />
        </div>

        <DataTable findings={results} />
      </div>
    </main>
  );
}
