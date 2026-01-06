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
            </div>
        </main>
    );
}
