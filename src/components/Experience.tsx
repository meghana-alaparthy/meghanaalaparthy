"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
    return (
        <section id="experience" className="py-20 px-4 bg-secondary/20">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    Work Experience
                </motion.h2>

                <div className="space-y-12">
                    {resumeData.experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 border-l-2 border-primary/20 hover:border-primary/50 transition-colors"
                        >
                            <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-background border-2 border-primary" />

                            <div className="mb-6">
                                <div className="flex flex-wrap items-baseline gap-x-4 mb-2">
                                    <h3 className="text-2xl font-semibold text-foreground">
                                        {exp.company}
                                    </h3>
                                    <span className="flex items-center text-sm text-muted-foreground gap-1">
                                        <MapPin size={14} />
                                        {exp.location}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {exp.roles.map((role, rIndex) => (
                                        <div key={rIndex} className="bg-card/50 p-4 rounded-lg border border-border/50">
                                            <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                                                <h4 className="font-medium text-primary flex items-center gap-2">
                                                    <Briefcase size={16} />
                                                    {role.title}
                                                </h4>
                                                <span className="text-sm bg-accent px-2 py-1 rounded text-accent-foreground flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {role.period}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <ul className="mt-4 space-y-2 list-disc list-outside ml-4 text-muted-foreground">
                                    {exp.highlights.map((highlight, hIndex) => (
                                        <li key={hIndex} className="leading-relaxed">
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
