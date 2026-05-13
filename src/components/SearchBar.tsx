'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{jurisdiction: string}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => setSuggestions(data))
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleSubmit = (e?: React.FormEvent, selectedQuery?: string) => {
    if (e) e.preventDefault();
    const finalQuery = selectedQuery || query;
    if (finalQuery) {
      router.push(`/search?q=${encodeURIComponent(finalQuery)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-evergreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input
          type="text"
          placeholder="Search for a city, a meeting, or a project..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="w-full pl-14 pr-6 py-5 rounded-full border-2 border-slate-200 bg-white shadow-2xl focus:border-evergreen focus:ring-4 focus:ring-evergreen/5 outline-none transition-all text-lg placeholder-slate-400"
        />
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-white border border-slate-200 rounded-3xl z-50 shadow-2xl overflow-hidden">
          {suggestions.map((s, i) => (
            <div
              key={i}
              onClick={() => {
                setQuery(s.jurisdiction);
                handleSubmit(undefined, s.jurisdiction);
              }}
              className="px-8 py-5 text-lg font-medium text-slate-700 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0 transition-colors"
            >
              {s.jurisdiction}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
