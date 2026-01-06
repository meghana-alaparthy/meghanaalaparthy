"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Trophy, Star, Medal } from "lucide-react";

export default function AchievementsPage() {
    return (
        <main className="min-h-screen pt-10 pb-20 bg-background text-foreground">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-12 border-b border-border/50 pb-8 text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-4 text-primary">Achievements</h1>
                    <p className="text-xl text-muted-foreground">
                        Recognition for technical excellence and leadership.
                    </p>
                </div>

                <div className="grid gap-8">
                    {/* Awards */}
                    <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            🏆 Awards & Recognition
                        </h2>
                        <ul className="space-y-4">
                            {resumeData.achievements.slice(0, 1).map((item, index) => (
                                <li key={index} className="flex gap-4">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <span className="text-lg text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Certifications & Others */}
                    <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            📜 Certifications & Leadership
                        </h2>
                        <ul className="space-y-4">
                            {resumeData.achievements.slice(1).map((item, index) => (
                                <li key={index} className="flex gap-4">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <span className="text-lg text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Projects */}
                <div className="bg-card rounded-xl border border-border p-8 shadow-sm mt-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        🎮 Interactive Projects
                    </h2>
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold">Boggle Game & Solver</h3>
                            <p className="text-muted-foreground mt-2">
                                A fully interactive Boggle game with an integrated solver.
                                Built with JavaScript and Python (logic adapted for web).
                            </p>
                            <div className="flex gap-2 mt-3 text-sm">
                                <span className="bg-secondary px-2 py-1 rounded">JavaScript</span>
                                <span className="bg-secondary px-2 py-1 rounded">Algorithm</span>
                                <span className="bg-secondary px-2 py-1 rounded">Game Dev</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <a
                                href="/boggle/game/"
                                target="_blank"
                                className="px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center w-full"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                Play Game (Challenge Mode)
                            </a>
                            <a
                                href="/boggle/solver/"
                                target="_blank"
                                className="px-5 py-2.5 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2 justify-center w-full"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                Use Solver Tool
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
