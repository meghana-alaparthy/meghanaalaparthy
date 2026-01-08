"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Activity, Search, ShieldCheck, Database, Layers, Terminal, Cpu } from "lucide-react";
import Link from "next/link";

interface LogEntry {
    id: string;
    timestamp: string;
    service: "Auth" | "Payment" | "User" | "System";
    level: "INFO" | "WARN" | "ERROR";
    message: string;
}

const services = ["Auth", "Payment", "User", "System"] as const;
const levels = ["INFO", "WARN", "ERROR"] as const;

const logMessages = {
    Auth: [
        "User login successful",
        "Invalid password attempt",
        "Token refresh initiated",
        "Session expired for user_992",
        "MFA challenge succeeded"
    ],
    Payment: [
        "Transaction processed: $45.00",
        "Payment gateway timeout",
        "Invoice generated: #TR-4421",
        "Credit card validation failed",
        "Refund issued for order_881"
    ],
    User: [
        "User profile updated",
        "New avatar uploaded",
        "User account created",
        "Email verification sent",
        "User preference changed: dark_mode"
    ],
    System: [
        "Healhy check: OK",
        "Database connection pool spike",
        "CPU usage at 85%",
        "Storage cleaning completed",
        "Deployment: v2.4.1 successful"
    ]
};

export default function LogAggregatorPage() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [filter, setFilter] = useState<string>("ALL");
    const [levelFilter, setLevelFilter] = useState<string>("ALL");
    const [throughput, setThroughput] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const service = services[Math.floor(Math.random() * services.length)];
            const level = levels[Math.floor(Math.random() * levels.length)];
            const messages = logMessages[service];
            const message = messages[Math.floor(Math.random() * messages.length)];

            const newLog: LogEntry = {
                id: Math.random().toString(36).substr(2, 9),
                timestamp: new Date().toLocaleTimeString(),
                service,
                level,
                message
            };

            setLogs(prev => [newLog, ...prev].slice(0, 100));
            setThroughput(prev => Math.min(60000, Math.max(45000, prev + (Math.random() > 0.5 ? 500 : -500))));
        }, 800);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (throughput === 0) setThroughput(52431);
    }, [throughput]);

    const filteredLogs = logs.filter(log => {
        const serviceMatch = filter === "ALL" || log.service === filter;
        const levelMatch = levelFilter === "ALL" || log.level === levelFilter;
        return serviceMatch && levelMatch;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pb-20 selection:bg-blue-900">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight text-white">
                        Meghana Alaparthy
                    </Link>
                    <Link href="/achievements" className="text-sm font-medium text-slate-600 hover:text-blue-400 transition-colors">
                        ← Back to Projects
                    </Link>
                </div>
            </nav>

            <main className="pt-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Aggregator Engine */}
                <div className="lg:col-span-8 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                <Terminal className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white tracking-tight">Real-Time Log Aggregator</h1>
                                <p className="text-slate-400">Scaling observations for millions of events.</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
                        <div className="border-b border-slate-800 bg-slate-900/50 p-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-2">
                                <select
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="bg-slate-800 border border-slate-700 text-xs px-3 py-1.5 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="ALL">All Services</option>
                                    {services.map(s => <option key={s} value={s}>{s} Service</option>)}
                                </select>
                                <select
                                    onChange={(e) => setLevelFilter(e.target.value)}
                                    className="bg-slate-800 border border-slate-700 text-xs px-3 py-1.5 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="ALL">All Severities</option>
                                    <option value="INFO">Info</option>
                                    <option value="WARN">Warning</option>
                                    <option value="ERROR">Error</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-mono">
                                <span className="text-green-400 flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    {throughput.toLocaleString()} logs/sec
                                </span>
                                <span className="text-slate-500">v1.2-stable</span>
                            </div>
                        </div>

                        <div className="h-[500px] overflow-y-auto p-4 font-mono text-xs space-y-2 bg-black/40 scrollbar-thin scrollbar-thumb-slate-800" ref={scrollRef}>
                            <AnimatePresence mode="popLayout">
                                {filteredLogs.length === 0 ? (
                                    <div className="h-full flex items-center justify-center text-slate-600 italic">
                                        Waiting for log data...
                                    </div>
                                ) : (
                                    filteredLogs.map((log) => (
                                        <motion.div
                                            key={log.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="grid grid-cols-[100px_80px_60px_1fr] gap-4 py-1.5 border-b border-white/5 hover:bg-white/5 transition-colors group px-2"
                                        >
                                            <span className="text-slate-500">[{log.timestamp}]</span>
                                            <span className="font-bold text-blue-400 uppercase">{log.service}</span>
                                            <span className={`font-bold ${log.level === 'ERROR' ? 'text-red-500' :
                                                log.level === 'WARN' ? 'text-yellow-500' : 'text-green-500'
                                                }`}>
                                                {log.level}
                                            </span>
                                            <span className="text-slate-300 group-hover:text-white transition-colors">{log.message}</span>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Right Column: Key Architecture Info */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-sm space-y-10">
                        {/* Summary */}
                        <div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Cpu className="w-5 h-5 text-blue-400" />
                                The Stack
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">The Architecture</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        The system is built on a **decoupled event-driven architecture**. Producers (distributed services) push telemetry to a horizontally scalable **Kafka** cluster. A custom **C# processing layer** performs real-time stream enrichment and PII masking before indexing into **ElasticSearch** for sub-second visual analysis.
                                    </p>
                                </div>

                                <div className="p-4 bg-black/60 rounded-xl border border-slate-800 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-blue-500/10 rounded text-blue-400">
                                            <Layers className="w-4 h-4" />
                                        </div>
                                        <div className="text-xs">
                                            <div className="font-bold text-white">Message Backbone</div>
                                            <div className="text-slate-500">Kafka High-Availability Cluster</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-green-500/10 rounded text-green-400">
                                            <ShieldCheck className="w-4 h-4" />
                                        </div>
                                        <div className="text-xs">
                                            <div className="font-bold text-white">Stream Enforcement</div>
                                            <div className="text-slate-500">Real-time PII Scrubbing</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-purple-500/10 rounded text-purple-400">
                                            <Database className="w-4 h-4" />
                                        </div>
                                        <div className="text-xs">
                                            <div className="font-bold text-white">Persistent Store</div>
                                            <div className="text-slate-500">Hot-Cold ElasticSearch Indices</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">System Impact</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm italic border-l-2 border-slate-700 pl-4">
                                        "By centralizing telemetry, we eliminated the 'observability tax' on legacy services and reduced our cross-service MTTR by 85% during high-stakes payroll cycles."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-600 rounded-2xl p-6 shadow-lg shadow-blue-500/20">
                        <h3 className="font-bold flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4" /> System Health
                        </h3>
                        <div className="text-xs text-blue-100 opacity-80 leading-relaxed">
                            Cluster is running at optimal capacity. All consumer groups are synchronized with zero lag detected in the last 24 hours.
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
