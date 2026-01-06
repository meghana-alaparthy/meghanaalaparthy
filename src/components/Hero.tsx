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
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Building scalable web applications and distributed systems.
                        <br />
                        Currently engineering @ Paycom.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    <Link
                        href={resumeData.personalInfo.linkedin}
                        target="_blank"
                        className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-secondary-foreground"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={24} />
                    </Link>
                    <Link
                        href={resumeData.personalInfo.github}
                        target="_blank"
                        className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-secondary-foreground"
                        aria-label="GitHub"
                    >
                        <Github size={24} />
                    </Link>
                    <Link
                        href={`mailto:${resumeData.personalInfo.email}`}
                        className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-secondary-foreground"
                        aria-label="Email"
                    >
                        <Mail size={24} />
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="pt-4"
                >
                    <a
                        href="/Meghana_Alaparthy_Resume.pdf" // Placeholder for actual resume file
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                    >
                        <FileText size={20} />
                        Download Resume
                    </a>
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
