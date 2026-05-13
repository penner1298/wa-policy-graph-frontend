import Link from 'next/link';

export default function EnterpriseBanner() {
  return (
    <section className="bg-void rounded-3xl p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-oracle/20 to-transparent opacity-50"></div>
      <div className="relative z-10 space-y-3 max-w-2xl text-center md:text-left">
        <h3 className="text-3xl font-bold text-snow">Need enterprise data?</h3>
        <p className="text-slate-400 text-lg leading-relaxed">
          We provide direct API access, cross-jurisdiction trend alerts, and municipal risk feeds for researchers, media, and underwriters.
        </p>
      </div>
      <Link 
        href="/enterprise"
        className="relative z-10 bg-snow text-void px-8 py-4 rounded-xl font-bold text-lg hover:bg-mist transition-all shadow-xl whitespace-nowrap block"
      >
        Explore Pro Tools &rarr;
      </Link>
    </section>
  );
}
