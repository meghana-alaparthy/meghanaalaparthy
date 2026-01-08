"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import Link from "next/link";
import {
    Award,
    Rocket,
    Trophy,
    Shield,
    Brain,
    Code2,
    Gamepad2,
    Wrench,
    ArrowUpRight,
    Star,
    Layers,
    Search,
    Database,
    Lock,
    Zap,
    ScrollText
} from "lucide-react";

export default function AchievementsPage() {
    // Helper to get project icon and link
    const getProjectDetails = (name: string) => {
        if (name.includes("Search Engine")) return { icon: Search, href: "/projects/search-engine", label: "Test Engine" };
        if (name.includes("Log Aggregator")) return { icon: Database, href: "/projects/log-aggregator", label: "Watch Stream" };
        if (name.includes("PII Redaction")) return { icon: Lock, href: "/projects/pii-redaction", label: "View Demo" };
        if (name.includes("Multicast")) return { icon: Zap, href: "/projects/multicast-protocol", label: "Run Simulation" };
        if (name.includes("Predictive")) return { icon: Brain, href: "/projects/content-analytics", label: "View Stats" };
        if (name.includes("Legal")) return { icon: Shield, href: "/projects/legal-system", label: "Launch Mockup" };
        return { icon: Rocket, href: "#", label: "Learn More" };
    };

    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-foreground">
            {/* 1. Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden border-b border-border/50">
                <div className="absolute inset-0 bg-grid-slate-100/[0.03] dark:bg-grid-slate-900/[0.04] bg-[center_top_-1px]" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                            Impact & <br /> Recognition
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                            A curated showcase of engineering excellence, technical leadership, and the specialized projects driving my professional journey.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Professional Case Studies Section */}
            <section className="py-24 container mx-auto px-6">
                <div className="flex items-center gap-4 mb-16 px-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                        <Layers size={24} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black tracking-tight">Professional Case Studies</h2>
                        <p className="text-muted-foreground font-medium">Deep dives into architectural decisions and engineering outcomes.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resumeData.projects.map((project, index) => {
                        const details = getProjectDetails(project.name);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white dark:bg-secondary/10 rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                        <details.icon size={28} />
                                    </div>
                                    <span className="text-[10px] font-black tracking-widest uppercase py-1 px-3 bg-secondary rounded-full text-muted-foreground">
                                        {project.period}
                                    </span>
                                </div>

                                <h3 className="text-XL font-black mb-3 tracking-tight group-hover:text-primary transition-colors">
                                    {project.name}
                                </h3>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5 mb-8">
                                    {project.techStack.slice(0, 3).map((tech, i) => (
                                        <span key={i} className="text-[10px] font-bold text-primary/70 bg-primary/5 px-2 py-1 rounded-md border border-primary/10">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    href={details.href}
                                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-foreground text-background font-black rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 group/btn"
                                >
                                    {details.label}
                                    <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* 3. Beyond the Code (Achievements) */}
            <section className="py-24 bg-secondary/20 border-y border-border/50">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-4 mb-16">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                            <Star size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">Beyond the Code</h2>
                            <p className="text-muted-foreground font-medium">Recognition, leadership, and athletic achievements.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Technical Awards */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-background rounded-3xl p-10 border border-border shadow-sm"
                        >
                            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                                <Award className="text-primary" /> Technical Awards
                            </h3>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary font-black text-xs">01</div>
                                    <div>
                                        <p className="text-lg font-bold leading-tight mb-2">CS50 Puzzle Day Winner</p>
                                        <p className="text-muted-foreground text-sm">Successfully solved all logic puzzles at Harvard CS50’s global event as part of a collaborative engineering team.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Personal & Athletic */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-background rounded-3xl p-10 border border-border shadow-sm"
                        >
                            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                                <Trophy className="text-yellow-500" /> Championships & Leadership
                            </h3>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex-shrink-0 flex items-center justify-center text-yellow-600 font-black text-xs">02</div>
                                    <div>
                                        <p className="text-lg font-bold leading-tight mb-2">National Yoga Champion</p>
                                        <p className="text-muted-foreground text-sm">Winner of the Women's National Yogasanas Championship and multiple district/state level titles.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-blue-600 font-black text-xs">03</div>
                                    <div>
                                        <p className="text-lg font-bold leading-tight mb-2">University Leadership</p>
                                        <p className="text-muted-foreground text-sm">Served as Hostel Representative at Shiv Nadar University, managing student relations and facilities for 2 years.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. Interactive Lab (Footer Section) */}
            <section className="py-24 bg-[#0a0a0a] text-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-white/10 p-12 rounded-[3rem]">
                        <div className="max-w-xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black tracking-widest uppercase mb-6">
                                <Gamepad2 size={12} /> The Interactive Lab
                            </div>
                            <h2 className="text-4xl font-black mb-6 tracking-tight">The Boggle Engine</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                                Explore a live implementation of recursive backtracking algorithms. Play the game or use the autonomous solver tool.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start font-black">
                                <Link
                                    href="/boggle/game"
                                    className="px-8 py-4 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center gap-2"
                                >
                                    Play Boggle
                                </Link>
                                <Link
                                    href="/boggle/solver"
                                    className="px-8 py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 border border-white/10 transition-all active:scale-95 flex items-center gap-2"
                                >
                                    <Wrench size={18} />
                                    Launch Solver
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/20 blur-[100px] absolute -inset-4 animate-pulse" />
                            <div className="relative w-48 h-48 md:w-64 md:h-64 bg-zinc-900 border border-white/10 rounded-3xl flex items-center justify-center p-6 transform rotate-3 shadow-2xl">
                                <Code2 size={120} className="text-primary/40" />
                                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-green-500 animate-ping" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
