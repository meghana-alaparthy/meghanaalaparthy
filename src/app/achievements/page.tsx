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

                <div className="space-y-6">
                    {resumeData.achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow"
                        >
                            <div className="flex-shrink-0 mt-1 text-yellow-500">
                                {index === 0 ? <Trophy size={28} /> : index === 1 ? <Medal size={28} /> : <Star size={28} />}
                            </div>
                            <div>
                                <p className="text-lg leading-relaxed">{achievement}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
