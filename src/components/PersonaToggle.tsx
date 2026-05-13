interface PersonaToggleProps {
  activePersona: 'Journalist' | 'Think Tank' | 'Risk Underwriter' | 'Oracle (Public Official)';
  setActivePersona: (persona: 'Journalist' | 'Think Tank' | 'Risk Underwriter' | 'Oracle (Public Official)') => void;
}

export default function PersonaToggle({ activePersona, setActivePersona }: PersonaToggleProps) {
  const personas = ['Journalist', 'Think Tank', 'Risk Underwriter', 'Oracle (Public Official)'];
  
  return (
    <div className="flex w-full space-x-2">
      {personas.map((persona) => (
        <button
          key={persona}
          onClick={() => setActivePersona(persona as 'Journalist' | 'Think Tank' | 'Risk Underwriter' | 'Oracle (Public Official)')}
          className={`flex-1 px-3 py-3 rounded border transition-colors duration-100 ease-out text-xs font-semibold uppercase tracking-widest ${
            activePersona === persona
              ? 'border-oracle bg-oracle/10 text-oracle'
              : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-slate-500 hover:text-slate-300'
          }`}
        >
          {persona.replace(' (Public Official)', '')}
        </button>
      ))}
    </div>
  );
}