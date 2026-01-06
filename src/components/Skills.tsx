"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Code2, Cloud, Database, Cpu, Lock } from "lucide-react";

export function Skills() {
    const categories = [
        { name: "Languages", icon: <Code2 />, skills: resumeData.skills.languages },
        { name: "Frameworks & Web", icon: <Cloud />, skills: resumeData.skills.frameworks },
        { name: "Cloud & DevOps", icon: <Cpu />, skills: resumeData.skills.cloudAndDevOps },
        { name: "Data & ML", icon: <Database />, skills: resumeData.skills.dataAndML },
        { name: "Other", icon: <Lock />, skills: resumeData.skills.other },
    ];

    return (
        <section id="skills" className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    Technical Skills
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-4 text-primary">
                                {category.icon}
                                <h3 className="font-semibold text-lg">{category.name}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, sIndex) => (
                                    <span
                                        key={sIndex}
                                        className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
