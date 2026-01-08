"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Database, Calculator, Zap, FileText, ChevronRight, BarChart3, Binary } from "lucide-react";
import Link from "next/link";

interface Document {
    id: number;
    title: string;
    content: string;
}

const docs: Document[] = [
    { id: 1, title: "Distributed Systems 101", content: "Reliability and scalability in large scale distributed systems using kafka and microservices." },
    { id: 2, title: "Next.js Best Practices", content: "Building fast web applications using react components and server side rendering." },
    { id: 3, title: "The Python Paradox", content: "Why great developers choose python for rapid prototyping and machine learning data pipelines." },
    { id: 4, title: "Java NIO Performance", content: "Optimizing high performance io operations in java using non blocking buffers and selectors." },
    { id: 5, title: "Search Engine Optimization", content: "How ranking algorithms decide which documents are most relevant for a given search query." },
];

export default function SearchEnginePage() {
    const [query, setQuery] = useState("");
    const [isIndexing, setIsIndexing] = useState(false);
    const [stats, setStats] = useState({ indexed: 0, latency: 0 });

    const results = useMemo(() => {
        if (!query.trim()) return [];

        const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
        if (terms.length === 0) return [];

        // Simple TF-IDF like scoring
        const scoredDocs = docs.map(doc => {
            const content = doc.content.toLowerCase();
            let score = 0;
            const termMatches: Record<string, number> = {};

            terms.forEach(term => {
                const count = (content.match(new RegExp(`\\b${term}\\b`, 'g')) || []).length;
                if (count > 0) {
                    // Match found
                    score += count * 10; // TF
                    // Simulate IDF (rarer terms get more weight)
                    const docFrequency = docs.filter(d => d.content.toLowerCase().includes(term)).length;
                    const idf = Math.log10(docs.length / docFrequency);
                    score += idf * 5;
                    termMatches[term] = count;
                }
            });

            return { ...doc, score, termMatches };
        }).filter(d => d.score > 0).sort((a, b) => b.score - a.score);

        return scoredDocs;
    }, [query]);

    useEffect(() => {
        setIsIndexing(true);
        const timer = setTimeout(() => {
            setIsIndexing(false);
            setStats({ indexed: 254001, latency: 0.12 });
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 selection:bg-orange-100 uppercase-none">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
                        Meghana Alaparthy
                    </Link>
                    <Link href="/achievements" className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors">
                        ← Back to Projects
                    </Link>
                </div>
            </nav>

            <main className="pt-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Search UI */}
                <div className="lg:col-span-8 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                <Search className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">V3 Ranking Engine</h1>
                                <p className="text-slate-500">Vector Space Model Implementation in Java.</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="bg-white rounded-2xl shadow-xl shadow-orange-500/5 border border-orange-100 overflow-hidden">
                        <div className="p-8 space-y-8">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search indexed documents... (e.g. 'java', 'distributed', 'fast')"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-lg font-medium"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                {isIndexing && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs font-mono text-slate-400">
                                        <div className="w-1 h-1 rounded-full bg-orange-500 animate-ping" />
                                        INDEXING_NIO...
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <AnimatePresence mode="popLayout">
                                    {results.length > 0 ? (
                                        results.map((res, idx) => (
                                            <motion.div
                                                key={res.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="group p-5 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                                        {res.title}
                                                    </h3>
                                                    <span className="text-[10px] font-mono bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                                                        Rank #{idx + 1}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                                    {res.content}
                                                </p>
                                                <div className="flex flex-wrap gap-4 items-center text-[11px] font-medium">
                                                    <div className="flex items-center gap-1.5 text-blue-600">
                                                        <Calculator className="w-3 h-3" />
                                                        Score: {res.score.toFixed(2)}
                                                    </div>
                                                    <div className="h-3 w-px bg-slate-200" />
                                                    {Object.entries(res.termMatches).map(([term, count]) => (
                                                        <div key={term} className="text-slate-500">
                                                            '{term}': {count}x
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : query.trim() ? (
                                        <div className="text-center py-12 text-slate-400 font-medium">
                                            No matching documents found in index.
                                        </div>
                                    ) : (
                                        <div className="bg-slate-50 rounded-xl p-8 border border-dashed border-slate-200 text-center">
                                            <div className="text-slate-500 text-sm">
                                                Type something to search across the simulated Java-indexed docstore.
                                            </div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Engineering Info */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-8">
                        <div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-orange-500" />
                                Index Stats
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tight mb-1">Indexed</div>
                                    <div className="text-xl font-black text-slate-900 font-mono tracking-tighter">
                                        {stats.indexed ? "254K" : "0"}
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tight mb-1">Latency</div>
                                    <div className="text-xl font-black text-slate-900 font-mono tracking-tighter">
                                        {stats.latency}ms
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Binary className="w-4 h-4 text-slate-400" /> Architectural Ownership
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    I designed a high-concurrency **Inverted Index** optimized for minimum garbage collection pressure. By utilizing custom memory-pooling and off-heap management (simulated via Java NIO), the system maintains sub-millisecond retrieval even under heavy indexing load.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4 text-slate-400" /> Ranking Rationale
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    The engine employs a hybrid scoring model incorporating **TF-IDF with BM25 normalization**. This ensures relevance is calculated based on document length and term saturation, preventing 'keyword stuffing' from biasing results—a critical feature for enterprise-grade search platforms.
                                </p>
                            </div>

                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 italic text-sm text-orange-800 leading-relaxed border-l-4 border-orange-400">
                                "Solving for scale meant moving beyond standard collections. Bridging the gap between **Java NIO Selectors** and a thread-safe index was key to hitting our latency targets."
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Database className="w-4 h-4 text-blue-400" /> Persistent Store
                        </h2>
                        <div className="text-xs text-slate-400 font-mono space-y-2">
                            <div className="flex justify-between">
                                <span>SHARDS:</span>
                                <span className="text-white">128</span>
                            </div>
                            <div className="flex justify-between">
                                <span>REPLICAS:</span>
                                <span className="text-white">3</span>
                            </div>
                            <div className="flex justify-between">
                                <span>CONSENSUS:</span>
                                <span className="text-white">RAFT_V2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
