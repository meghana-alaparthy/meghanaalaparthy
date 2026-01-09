"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { ExternalLink, Folder } from "lucide-react";

export function Projects() {
    return (
        <section id="projects" className="py-20 px-4 bg-secondary/10">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    Startups & Projects
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {resumeData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card p-6 rounded-xl border border-border flex flex-col hover:shadow-lg transition-shadow group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <Folder size={24} />
                                </div>
                                {/* Fallback if link existed, though resume data doesn't explicitly have them for all items. 
                    Can add logic here later if URLs are added to data. */}
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                {project.name}
                            </h3>
                            <span className="text-xs text-muted-foreground mb-4 block">
                                {project.period}
                            </span>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack?.map((tech, tIndex) => (
                                    <span key={tIndex} className="text-xs px-2 py-1 bg-secondary rounded text-secondary-foreground font-mono">
                                        {tech}
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

