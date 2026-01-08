"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Briefcase, Globe } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative py-20 px-4 flex flex-col items-center justify-center text-center bg-secondary/20">
                <div className="max-w-3xl mx-auto space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/HeadShot.jpg"
                            alt="Meghana Alaparthy"
                            className="object-cover w-full h-full"
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight"
                    >
                        Engineering for Scale & Impact
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground leading-relaxed"
                    >
                        My journey from Vijayawada to building distributed systems in the US.
                    </motion.p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 px-4">
                <div className="container max-w-3xl mx-auto space-y-16">

                    {/* Chapter 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
                            <Globe className="w-6 h-6" />
                            From Vision to Production
                        </h2>
                        <p className="text-lg text-muted-foreground leading-loose">
                            My journey began in Vijayawada, India, fueled by a curiosity for how complex systems operate under the hood. In 2022, I transitioned to the US to pursue a Master’s in Computer Science at the University of Oklahoma, where I specialized in distributed systems and high-concurrency environments.
                            What started as academic research quickly evolved into industry application during my tenure at Paycom, where I now lead critical backend initiatives as an SDE III.
                        </p>
                    </motion.div>

                    {/* Chapter 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
                            <Briefcase className="w-6 h-6" />
                            Architecting at Scale: The Paycom Chapter
                        </h2>
                        <p className="text-lg text-muted-foreground leading-loose">
                            Since joining Paycom in 2023, my focus has shifted from implementation to **system design and longevity**. I’ve been instrumental in dismantling monolithic legacy systems, replacing them with resilient, event-driven microservices that power our core payroll engine.
                            Promotion to SDE III was a milestone that affirmed my commitment to not just writing code, but building infrastructure that survives traffic spikes and complex edge cases. I focus on observability, performance tuning, and cross-functional leadership to ensure our platforms are as stable as they are fast.
                        </p>
                    </motion.div>

                    {/* Current Focus */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card p-8 rounded-2xl border border-border shadow-sm"
                    >
                        <h3 className="text-2xl font-bold mb-4">What I Bring to the Table</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">✓</span>
                                <span className="text-muted-foreground">Expertise in **Distributed Systems Architecture** and Event-Driven Pipelines.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">✓</span>
                                <span className="text-muted-foreground">Strategic technical leadership: Guiding architectural trade-offs between performance, cost, and scale.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-500 font-bold">✓</span>
                                <span className="text-muted-foreground">Cross-functional collaboration: Bridging the gap between engineering, product, and enterprise security.</span>
                            </li>
                        </ul>
                    </motion.div>

                    <div className="text-center pt-8">
                        <Link href="/resume" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl">
                            View My Professional Experience <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>

                </div>
            </section>
        </main>
    );
}
