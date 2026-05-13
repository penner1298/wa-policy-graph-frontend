"use client";
import { useState, useEffect, useRef } from 'react';

type HistoryItem = {
    query: string;
    response: string;
    citations: any[];
    suggestions: string[];
    loading?: boolean;
};

export default function Page() {
    const [searchQuery, setSearchQuery] = useState('');
    const [bloomQuery, setBloomQuery] = useState('');
    const [isBloomOpen, setIsBloomOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    
    const [conversationData, setConversationData] = useState<HistoryItem[]>([]);
    const [activeIndex, setActiveIndex] = useState(-1);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const typewriterRef = useRef<HTMLSpanElement>(null);

    // Canvas animation
    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext('2d'); if (!ctx) return;
        let width = window.innerWidth, height = window.innerHeight, mouseX = 0, mouseY = 0, time = 0, animationFrameId: number;
        const resize = () => { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; };
        const onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
        window.addEventListener('resize', resize); window.addEventListener('mousemove', onMouseMove);
        resize();
        let isCancelled = false;
        const draw = () => {
            if (isCancelled) return;
            ctx.clearRect(0, 0, width, height); ctx.strokeStyle = 'rgba(0, 77, 64, 0.15)'; ctx.lineWidth = 1.5; ctx.beginPath();
            for (let i = 0; i < 20; i++) {
                const yBase = (height / 20) * i;
                for (let x = 0; x <= width; x += 30) {
                    const dx = x - mouseX, dy = yBase - mouseY, dist = Math.sqrt(dx * dx + dy * dy);
                    const mouseInfluence = Math.max(0, 200 - dist) / 200;
                    const wave = Math.sin(x * 0.005 + time + i * 0.5) * 50;
                    const mouseBulge = Math.pow(mouseInfluence, 2) * 150 * Math.sin(time * 2);
                    const y = yBase + wave - mouseBulge;
                    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
            }
            ctx.stroke(); time += 0.01; animationFrameId = requestAnimationFrame(draw);
        };
        draw();
        return () => { isCancelled = true; window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMouseMove); cancelAnimationFrame(animationFrameId); };
    }, []);

    // Typewriter effect
    useEffect(() => {
        if (isBloomOpen || searchQuery.length > 0) return;
        
        const prompts = [
            "Penner, I need to know which cities have enacted a sales tax for police services this year.",
            "Create an automated reminder for me every time a school district has an executive session.",
            "Have there been problems with counties passing audits due to new state policies recently?"
        ];
        
        let promptIdx = 0;
        let i = 0;
        let timeout: ReturnType<typeof setTimeout>;
        let isDeleting = false;

        const tick = () => {
            if (!typewriterRef.current) return;
            const text = prompts[promptIdx];
            
            if (isDeleting) {
                i--;
                typewriterRef.current.innerText = text.slice(0, i);
                if (i <= 0) {
                    isDeleting = false;
                    promptIdx = (promptIdx + 1) % prompts.length;
                    timeout = setTimeout(tick, 500);
                } else {
                    timeout = setTimeout(tick, 30);
                }
            } else {
                i++;
                typewriterRef.current.innerText = text.slice(0, i);
                if (i === text.length) {
                    isDeleting = true;
                    timeout = setTimeout(tick, 2000);
                } else {
                    timeout = setTimeout(tick, 60);
                }
            }
        };
        
        timeout = setTimeout(tick, 100);

        return () => {
            clearTimeout(timeout);
        };
    }, [isBloomOpen, searchQuery]);

    // API Integration
    const executeQuery = async (query: string) => {
        setIsBloomOpen(true);
        
        const newIndex = conversationData.length;
        const newItem: HistoryItem = {
            query,
            response: "Thinking...",
            citations: [],
            suggestions: [],
            loading: true
        };
        
        setConversationData(prev => [...prev, newItem]);
        setActiveIndex(newIndex);
        setSearchQuery('');
        setBloomQuery('');

        try {
            const response = await fetch('/api/v1/oracle/synthesize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jurisdiction: "Washington State", query })
            });
            const data = await response.json();
            
            setConversationData(prev => {
                const updated = [...prev];
                updated[newIndex] = {
                    query,
                    response: data.narrative || "No narrative found.",
                    citations: data.citations || [],
                    suggestions: data.actions || ["Show more details", "Compare jurisdictions"],
                    loading: false
                };
                return updated;
            });
        } catch (err) {
            setConversationData(prev => {
                const updated = [...prev];
                updated[newIndex] = {
                    ...updated[newIndex],
                    response: "Error reaching the Oracle system.",
                    loading: false
                };
                return updated;
            });
        }
    };

    const handleMainSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            e.preventDefault();
            executeQuery(searchQuery.trim());
        }
    };
    
    const handleBloomSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && bloomQuery.trim()) {
            e.preventDefault();
            executeQuery(bloomQuery.trim());
        }
    };

    const closeBloom = () => {
        setIsBloomOpen(false);
    };

    const activeItem = conversationData[activeIndex];

    return (
        <div className="w-full relative">
            <div className="grain-overlay"></div>
            <canvas ref={canvasRef} id="topo-canvas" className="fixed inset-0 w-full h-full z-0 opacity-40"></canvas>

            {/* Auth Modal */}
            {isAuthModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-void/50 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] p-10 max-w-xl w-full border border-slate-200 shadow-2xl relative">
                        <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">✕</button>

                        <div className="flex items-center gap-5 mb-8 border-b border-slate-100 pb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-evergreen to-emerald-700 flex items-center justify-center shadow-lg shadow-evergreen/20 font-black text-white text-3xl">P</div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Hello there.</h3>
                                <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest mt-1">Penner, Apex Node</div>
                            </div>
                        </div>

                        <div className="text-slate-700 space-y-5 mb-10 text-lg leading-relaxed font-serif">
                            <p>This feature is in testing right now—and I know you're really going to love it.</p>
                            <p>You will be able to assign me to monitor and update you on the things you want to know about. The last-minute executive session... you'll get an email or text about it when it's published. The failure of your school district to pass an audit—you'll get the report in your inbox before the news even finds out.</p>
                            <p>You can task me with keeping you updated on what you care about. I'll be releasing this feature very soon!</p>
                            <p>If that interests you, sign up now for first access (free). Early supporters like you will get free automations when they become available.</p>
                            <p className="font-bold text-slate-900 font-sans italic pt-2">~ Penner</p>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); setIsAuthModalOpen(false); }} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                            <div className="flex gap-4">
                                <input type="text" required placeholder="Your Name" className="w-1/2 px-5 py-4 rounded-xl border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-evergreen/20 focus:border-evergreen transition-all shadow-sm font-medium" />
                                <input type="email" required placeholder="Your Email" className="w-1/2 px-5 py-4 rounded-xl border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-evergreen/20 focus:border-evergreen transition-all shadow-sm font-medium" />
                            </div>
                            <button type="submit" className="w-full bg-evergreen hover:bg-emerald-900 text-white py-4 rounded-xl font-black text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                Sign Up for First Access
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <header className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full z-50 relative">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-evergreen to-emerald-700 flex items-center justify-center shadow-lg font-black text-white text-xl">P.</div>
                    <div>
                        <h1 className="font-black text-evergreen tracking-tighter text-2xl leading-none">Penner.</h1>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-evergreen/60">Civic Intelligence Agent</span>
                        </div>
                    </div>
                </div>

                <a href="#" className="text-xs font-bold text-slate-500 hover:text-evergreen uppercase tracking-widest flex items-center gap-2 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    API / Agent Access
                </a>
            </header>

            <main className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center justify-center min-h-[80vh]">
                <div className={`text-center w-full transition-all duration-700 flex flex-col items-center mt-4 ${isBloomOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                    <div className="relative w-28 h-28 mb-12 group">
                        <div className="absolute inset-0 bg-evergreen/10 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-all duration-700"></div>
                        <div className="absolute inset-0 bg-emerald-500/10 rounded-[2rem] -rotate-3 group-hover:-rotate-6 transition-all duration-700"></div>
                        <div className="relative w-full h-full rounded-[2rem] bg-gradient-to-br from-evergreen to-emerald-700 shadow-[0_20px_50px_rgba(0,77,64,0.3)] flex items-center justify-center border border-white/50 transform transition-all duration-500 group-hover:scale-105">
                            <span className="text-5xl font-black text-white tracking-tighter">P.</span>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-[4rem] font-black text-slate-900 mb-10 tracking-tighter leading-[1.1] max-w-4xl">
                        I am your personal civic <br className="hidden md:block" /> intelligence agent.
                    </h1>

                    <div className="w-full max-w-3xl mx-auto transition-all duration-700 z-20 mb-12 relative group">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 font-medium text-xl px-16 py-6 md:py-8 overflow-hidden tracking-tight">
                            <span ref={typewriterRef} className="text-center w-full whitespace-normal break-words" style={{ opacity: searchQuery ? 0 : 1 }}></span>
                        </div>
                        <textarea 
                            rows={1}
                            className="w-full resize-none text-center py-6 md:py-7 px-8 rounded-[2.5rem] border-2 border-slate-200/80 hover:border-evergreen/40 bg-white/95 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-evergreen/10 focus:border-evergreen focus:ring-4 focus:ring-evergreen/10 outline-none transition-all duration-500 text-xl font-medium overflow-hidden text-slate-800 tracking-tight" 
                            placeholder=""
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                e.target.style.height = 'auto';
                                e.target.style.height = (e.target.scrollHeight) + 'px';
                            }}
                            onKeyDown={handleMainSubmit}
                        />
                    </div>

                    <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed text-balance">
                        I’m Penner. I read every city council agenda, school board minute, and state audit in Washington the second they are published so you don't have to. <br/><br/><strong className="text-slate-800 font-bold">Ask me what's happening in your town, or assign me a mission to watch an issue for you.</strong>
                    </p>
                </div>

                {/* BLOOM MODAL */}
                <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-void/30 backdrop-blur-md bloom-transition ${isBloomOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    <div className={`w-full max-w-6xl h-[85vh] bg-white rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden border border-slate-100 bloom-transition ${isBloomOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                        <button onClick={closeBloom} className="absolute top-8 right-8 z-[200] p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 bg-white shadow-sm border border-slate-100">✕</button>

                        <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 p-10 overflow-y-auto">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-8">Conversation</h2>
                            <div className="flex flex-col gap-3">
                                {conversationData.map((item, idx) => (
                                    <div 
                                        key={idx}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`p-4 rounded-xl border text-sm cursor-pointer break-words ${idx === activeIndex ? 'bg-evergreen/10 border-evergreen/20 text-evergreen font-bold' : 'bg-white border-slate-200 text-slate-600'}`}
                                    >
                                        "{item.query}"
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-2/3 flex flex-col bg-white relative">
                            <div className="sticky top-0 bg-white z-10 px-12 pt-12 pb-4 shrink-0">
                                <div className="text-xs font-black text-evergreen uppercase tracking-[0.2em]">Membrane Extraction</div>
                            </div>

                            <div className="px-12 pb-12 overflow-y-auto flex flex-col flex-grow">
                                {activeItem && (
                                    <div className="flex flex-col flex-grow">
                                        <div className={`text-lg leading-relaxed text-slate-800 font-medium p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-6 ${activeItem.loading ? 'animate-pulse text-slate-500' : ''}`}>
                                        {activeItem.response.split('\n\n').map((p, i) => (
                                            <p key={i} className="mb-4 last:mb-0">{p}</p>
                                        ))}
                                    </div>

                                    {!activeItem.loading && (
                                        <>
                                            <button onClick={() => setIsAuthModalOpen(true)} className="text-evergreen font-bold text-sm hover:underline mb-8 flex items-center justify-start gap-2 w-fit">
                                                <span>+ Assign Penner to Monitor This</span>
                                            </button>

                                            <div className="border-t border-slate-200 pt-8 mt-auto">
                                                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Official Citations</div>
                                                <div className="flex flex-wrap gap-2 mb-8">
                                                    {activeItem.citations.map((c, i) => (
                                                        c.url ? (
                                                            <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-bold cursor-pointer hover:bg-slate-200 border border-slate-200">
                                                                {c.text} ↗
                                                            </a>
                                                        ) : (
                                                            <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-bold border border-slate-200">
                                                                {c.text || c}
                                                            </span>
                                                        )
                                                    ))}
                                                    {activeItem.citations.length === 0 && (
                                                        <span className="text-sm text-slate-400">No citations extracted.</span>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-8">
                                                    {activeItem.suggestions.map((s, i) => (
                                                        <button 
                                                            key={i} 
                                                            onClick={() => executeQuery(s)}
                                                            className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold hover:bg-emerald-100 border border-emerald-200"
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className="relative">
                                                    <input 
                                                        type="text" 
                                                        className="w-full px-6 py-4 rounded-xl border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-evergreen/20" 
                                                        placeholder={activeItem.suggestions.length > 0 ? `e.g. ${activeItem.suggestions[0]}...` : "Ask a follow up..."}
                                                        value={bloomQuery}
                                                        onChange={(e) => setBloomQuery(e.target.value)}
                                                        onKeyDown={handleBloomSubmit}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* MEMBRANE API CALLOUT */}
            <a href="https://membrane-api.com" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 backdrop-blur-md border border-slate-200/60 text-xs font-medium text-slate-500 hover:text-evergreen hover:border-evergreen/30 hover:bg-white hover:shadow-md transition-all group">
                <svg className="w-4 h-4 text-emerald-500 group-hover:text-evergreen transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                <span>Powered by <strong className="text-slate-700 group-hover:text-evergreen transition-colors">Membrane API</strong> Zero-Hallucination Protocol</span>
            </a>
        </div>
    );
}
