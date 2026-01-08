"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Server, Wifi, Activity, Zap } from "lucide-react";
import Link from "next/link";

type Packet = {
    id: number;
    target: number;
    active: boolean;
};

export default function MulticastProtocolPage() {
    const [packets, setPackets] = useState<Packet[]>([]);
    const [sequence, setSequence] = useState(0);

    const checkPacketArrival = () => {
        // cleanup old packets
        setPackets(prev => prev.filter(p => p.active));
    };

    const broadcast = () => {
        const newPackets = [1, 2, 3].map(target => ({
            id: sequence + target,
            target,
            active: true
        }));
        setSequence(s => s + 3);
        setPackets([...packets, ...newPackets]);

        // Auto remove after animation
        setTimeout(() => {
            setPackets(prev => prev.slice(3));
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-cyan-900 pb-20">
            {/* Navigation (Dark Mode) */}
            <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight text-white">
                        Meghana Alaparthy
                    </Link>
                    <Link href="/achievements" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">
                        ← Back to Projects
                    </Link>
                </div>
            </nav>

            <main className="pt-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Network Simulation */}
                <div className="lg:col-span-7 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                                <Network className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Sending Data Fast</h1>
                                <p className="text-slate-400">A custom networking protocol built for speed.</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden relative min-h-[400px]">
                        <div className="absolute top-0 w-full border-b border-slate-800 bg-slate-900/50 p-4 flex items-center justify-between z-10">
                            <h3 className="font-semibold text-slate-300 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-cyan-400" /> Network Canvas
                            </h3>
                            <button
                                onClick={broadcast}
                                className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center gap-2"
                            >
                                <Wifi className="w-3 h-3" /> Broadcast Pulse
                            </button>
                        </div>

                        <div className="p-12 h-full flex flex-col justify-between items-center relative gap-20 mt-8">
                            {/* Sender Node */}
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)] border-4 border-blue-400">
                                    <Server className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-blue-400">SOURCE</div>
                            </div>

                            {/* Receiver Nodes */}
                            <div className="flex gap-16 md:gap-32 relative z-10">
                                {[1, 2, 3].map((id) => (
                                    <div key={id} className="relative">
                                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-600">
                                            <Server className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500">CLIENT_{id}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Packets */}
                            <div className="absolute inset-0 pointer-events-none">
                                <AnimatePresence>
                                    {packets.map((packet) => (
                                        <motion.div
                                            key={packet.id}
                                            initial={{ x: "50%", y: 80, scale: 0 }}
                                            animate={{
                                                x: packet.target === 1 ? "20%" : packet.target === 2 ? "50%" : "80%", // Approximation for demo
                                                y: 300,
                                                scale: 1
                                            }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            transition={{ duration: 0.8, ease: "linear" }}
                                            className="absolute top-0 left-0"
                                        >
                                            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Metric Overlay */}
                        <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-500">
                            PROTOCOL: UDP_MCAST_V2 <br />
                            LATENCY: &lt; 2ms
                        </div>
                    </div>
                </div>

                {/* Right Column: Architecture */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            The Tech Behind It
                        </h2>

                        <div className="space-y-6 text-slate-300">
                            <div>
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Why not just use TCP?</h3>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    Standard TCP has too much 'overhead'—it takes too long to say hello before sending data. For stock market ticks, even a few milliseconds is too slow. UDP is like shouting in a room; it's instant, but you need a way to make sure everyone heard you.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">What if data goes missing?</h3>
                                <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 text-xs font-mono space-y-2 text-slate-400">
                                    <div className="flex gap-2">
                                        <span className="text-green-400">SEQ_ACK:</span> Receivers track Sequence Numbers.
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-red-400">NAK:</span> If Gap detected (e.g., received 4 after 2), send Negative Ack for 3.
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">How fast is it?</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-slate-900 rounded border border-slate-700">
                                        <div className="text-[10px] text-slate-500 uppercase">Throughput</div>
                                        <div className="text-lg font-bold text-white">100k msg/s</div>
                                    </div>
                                    <div className="p-3 bg-slate-900 rounded border border-slate-700">
                                        <div className="text-[10px] text-slate-500 uppercase">Latency/Hop</div>
                                        <div className="text-lg font-bold text-white">45µs</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
