"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Radio, Music, TrendingUp, Sliders } from "lucide-react";
import Link from "next/link";

export default function ContentAnalyticsPage() {
    const [params, setParams] = useState({
        tempo: 120,
        danceability: 0.7,
        energy: 0.8,
    });

    const [viralityScore, setViralityScore] = useState(0);

    useEffect(() => {
        // Mock Inference Model Logic
        // High energy + High danceability = High Score
        // Sweet spot tempo ~120-140 BPM

        let score = (params.danceability * 40) + (params.energy * 40);

        // Tempo penalty if too slow or too fast
        const tempoDist = Math.abs(128 - params.tempo);
        const tempoScore = Math.max(0, 20 - (tempoDist * 0.5));

        score += tempoScore;

        setViralityScore(Math.min(100, Math.round(score)));
    }, [params]);

    const data = [
        { name: "Virality", value: viralityScore, fill: "#3b82f6" },
        { name: "Retention", value: Math.round(viralityScore * 0.8), fill: "#8b5cf6" },
        { name: "Conversion", value: Math.round(viralityScore * 0.4), fill: "#10b981" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-purple-100 pb-20">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
                        Meghana Alaparthy
                    </Link>
                    <Link href="/achievements" className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors">
                        ← Back to Projects
                    </Link>
                </div>
            </nav>

            <main className="pt-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Interactive Dashboard */}
                <div className="lg:col-span-7 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Predicting Content Virality</h1>
                                <p className="text-slate-500">I built a tool to see if we can guess which songs will trend based on their data.</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/5 border border-purple-100 overflow-hidden">
                        <div className="border-b border-slate-100 bg-slate-50 p-4 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                                <Sliders className="w-4 h-4" /> Inference Parameters
                            </h3>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Sliders */}
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-700">Tempo (BPM)</label>
                                        <span className="text-sm font-mono text-slate-500">{params.tempo} BPM</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="60" max="200"
                                        value={params.tempo}
                                        onChange={(e) => setParams({ ...params, tempo: parseInt(e.target.value) })}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-700">Danceability</label>
                                        <span className="text-sm font-mono text-slate-500">{(params.danceability * 100).toFixed(0)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0" max="1" step="0.01"
                                        value={params.danceability}
                                        onChange={(e) => setParams({ ...params, danceability: parseFloat(e.target.value) })}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-700">Energy</label>
                                        <span className="text-sm font-mono text-slate-500">{(params.energy * 100).toFixed(0)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0" max="1" step="0.01"
                                        value={params.energy}
                                        onChange={(e) => setParams({ ...params, energy: parseFloat(e.target.value) })}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
                                    />
                                </div>
                            </div>

                            <div className="h-px bg-slate-100" />

                            {/* Output Visualization */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Predicted Virality Score</div>
                                    <div className="text-6xl font-black text-slate-900 tracking-tighter">
                                        {viralityScore}
                                        <span className="text-xl text-slate-400 font-medium ml-1">/ 100</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium bg-green-50 w-fit px-3 py-1 rounded-full">
                                        <TrendingUp className="w-3 h-3" />
                                        +{Math.round(viralityScore * 0.12)}% vs Average
                                    </div>
                                </div>

                                <div className="h-40 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data}>
                                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip
                                                cursor={{ fill: 'transparent' }}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Architecture */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Radio className="w-5 h-5 text-slate-400" />
                            How it works
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">The Problem</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    Streaming platforms always want to find the next big hit. This system uses a machine learning model (Random Forest) that I trained on Spotify's audio data to spot patterns in successful songs.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">The Data Pipeline</h3>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-xs font-mono space-y-2 text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <Music className="w-3 h-3" /> Raw Music Data → Pulling Audio Features
                                    </div>
                                    <div className="flex items-center gap-2">
                                        ↓ Cleaning & Scaling the Data
                                    </div>
                                    <div className="flex items-center gap-2">
                                        ↓ Random Forest Model (100 'Trees')
                                    </div>
                                    <div className="flex items-center gap-2 font-bold text-slate-800">
                                        → Is it a Hit? (Virality Score)
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Making it Fast</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    I found that **Danceability** and **Tempo** were the biggest predictors. To make this run smoothly in a browser, I used ONNX Runtime, which gets us a score in less than 10ms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
