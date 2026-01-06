"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { resumeData } from "@/data/resume";

export function Hero() {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center items-center relative overflow-hidden bg-background px-4 pt-16">
            {/* Background Decoration */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl w-full text-center z-10 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 inline-block">
                        Software Developer III
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent">
                        {resumeData.personalInfo.name}
                    </h1>

                    {/* Strategic Impact Stats */}
                    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-8 text-muted-foreground font-medium">
                        <div className="flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Improved system latency by 40%</span>
                        </div>
                        <div className="hidden md:block text-slate-300">|</div>
                        <div className="flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <span>Designed services handling 50k+ TPS</span>
                        </div>
                    </div>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
                        Targeting <strong>Senior Software Engineer / Staff Engineer</strong> roles focusing on distributed systems and high-scale architectures.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col items-center gap-6"
                >
                    {/* Primary CTA */}
                    <a
                        href="/Meghana_Alaparthy_Resume.pdf"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-white text-lg font-semibold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 ring-offset-2 focus-visible:ring-2"
                    >
                        <FileText size={22} />
                        View Full Resume
                    </a>

                    {/* Secondary Socials */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href={resumeData.personalInfo.linkedin}
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white/50 hover:bg-white text-muted-foreground hover:text-foreground transition-all text-sm font-medium"
                        >
                            <Linkedin size={16} /> LinkedIn
                        </Link>
                        <Link
                            href={resumeData.personalInfo.github}
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white/50 hover:bg-white text-muted-foreground hover:text-foreground transition-all text-sm font-medium"
                        >
                            <Github size={16} /> GitHub
                        </Link>
                        <Link
                            href={`mailto:${resumeData.personalInfo.email}`}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white/50 hover:bg-white text-muted-foreground hover:text-foreground transition-all text-sm font-medium"
                        >
                            <Mail size={16} /> Email
                        </Link>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
            >
                <ArrowDown size={24} />
            </motion.div>
        </section>
    );
}
