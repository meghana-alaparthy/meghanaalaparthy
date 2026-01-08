"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import Link from "next/link";

export default function AchievementsPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 bg-slate-50 text-slate-900">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-12 border-b border-slate-200 pb-8">
                    <h1 className="text-4xl font-bold mb-4 text-slate-900">Achievements & Projects</h1>
                    <p className="text-xl text-slate-600">
                        Technical leadership, awards, and interactive case studies.
                    </p>
                </div>

                <div className="grid gap-8">
                    {/* Awards */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                            🏆 Awards & Recognition
                        </h2>
                        <ul className="space-y-4">
                            {resumeData.achievements.slice(0, 1).map((item, index) => (
                                <li key={index} className="flex gap-4">
                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                                    <span className="text-lg text-slate-600">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Certifications */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                            📜 Certifications & Leadership
                        </h2>
                        <ul className="space-y-4">
                            {resumeData.achievements.slice(1).map((item, index) => (
                                <li key={index} className="flex gap-4">
                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                                    <span className="text-lg text-slate-600">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Interactive Projects */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-slate-800">
                            🚀 Principal Architect Case Studies
                        </h2>

                        <div className="space-y-12">
                            {resumeData.projects.map((project, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-8 items-start justify-between border-b border-slate-100 pb-12 last:border-b-0 last:pb-0">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-900">{project.name}</h3>
                                        <div className="text-sm font-mono text-slate-400 mt-1 mb-3">{project.period}</div>
                                        <p className="text-slate-600 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {project.techStack.map((tech, techIndex) => (
                                                <span key={techIndex} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full md:w-auto flex flex-col gap-3 shrink-0">
                                        {/* Dynamic Linking based on Project Name */}
                                        {project.name.includes("PII") && (
                                            <Link
                                                href="/projects/pii-redaction"
                                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 justify-center shadow-lg shadow-blue-500/20 active:scale-95"
                                            >
                                                View Live Demo
                                            </Link>
                                        )}
                                        {project.name.includes("Content Analytics") && (
                                            <Link
                                                href="/projects/content-analytics"
                                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 justify-center shadow-lg shadow-blue-500/20 active:scale-95"
                                            >
                                                View Dashboard
                                            </Link>
                                        )}
                                        {project.name.includes("Legal") && (
                                            <Link
                                                href="/projects/legal-system"
                                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 justify-center shadow-lg shadow-blue-500/20 active:scale-95"
                                            >
                                                Launch Mockup
                                            </Link>
                                        )}
                                        {project.name.includes("Search Engine") && (
                                            <Link
                                                href="/projects/search-engine"
                                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 justify-center shadow-lg shadow-blue-500/20 active:scale-95"
                                            >
                                                Test Engine
                                            </Link>
                                        )}
                                        {project.name.includes("Log Aggregator") && (
                                            <Link
                                                href="/projects/log-aggregator"
                                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 justify-center shadow-lg shadow-blue-500/20 active:scale-95"
                                            >
                                                Watch Stream
                                            </Link>
                                        )}
                                        {project.name.includes("Multicast") && (
                                            <Link
                                                href="/projects/multicast-protocol"
                                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 justify-center shadow-lg shadow-blue-500/20 active:scale-95"
                                            >
                                                Run Simulation
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Games */}
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 shadow-lg text-white">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            🎮 Mini-Games
                        </h2>
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold">Boggle Challenge</h3>
                                <p className="text-indigo-100 mt-2 max-w-lg">
                                    Full-stack game with recursive backtracking solver logic running in the browser.
                                    Compete against a perfect AI agent.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <a
                                    href="/boggle/game/"
                                    target="_blank"
                                    className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-xl"
                                >
                                    Play Game
                                </a>
                                <a
                                    href="/boggle/solver/"
                                    target="_blank"
                                    className="px-6 py-3 bg-indigo-700/50 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors border border-indigo-400/50"
                                >
                                    Solver Tool
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
