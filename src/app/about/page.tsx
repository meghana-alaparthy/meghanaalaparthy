"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Globe } from "lucide-react";
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
                            I started my engineering journey in Vijayawada, India, and moved to the US in 2022 for my master's at OU. I've always enjoyed digging into how large systems work, which naturally led me toward distributed computing.
                        </p>
                        <p className="text-lg text-muted-foreground leading-loose">
                            After graduating, I joined Paycom, where I'm currently an SDE III. It's been a fast-paced environment where I've had the chance to work on some genuinely complex backend problems—mostly involving breaking down older monolithic services into microservices and dealing with the data consistency challenges that come with that.
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
                            Work at Paycom
                        </h2>
                        <p className="text-lg text-muted-foreground leading-loose">
                            I started as an intern, which was a great introduction to how enterprise payroll actually functions at scale. Since coming back full-time, I've been focused on reliability and system design.
                        </p>
                        <p className="text-lg text-muted-foreground leading-loose">
                            A lot of my recent work involves ensuring our systems can handle traffic spikes without manual intervention. I spend a good amount of time thinking about idempotency, retry logic, and how to keep different parts of the system in sync when they're decoupled. It's challenging but rewarding work.
                        </p>
                    </motion.div>

                    {/* Current Focus */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card p-8 rounded-2xl border border-border shadow-sm"
                    >
                        <h3 className="text-2xl font-bold mb-4">Current Focus</h3>
                        <p className="text-lg text-muted-foreground leading-loose">
                            Right now, I'm deepening my expertise in distributed architecture. I'm particularly interested in how we can make our systems more self-healing and efficient. I enjoy the balance of coding effective solutions while also stepping back to look at the broader architectural picture.
                        </p>
                    </motion.div>

                    <div className="text-center pt-8">
                        <Link href="/resume" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg">
                            View Full Resume <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>

                </div>
            </section>
        </main>
    );
}
