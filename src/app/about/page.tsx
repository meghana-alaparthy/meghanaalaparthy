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
                            From Hyderabad to the Global Stage
                        </h2>
                        <p className="text-lg text-muted-foreground leading-loose">
                            My engineering journey began in Hyderabad, India, where I built my foundation in computer science.
                            However, looking for bigger challenges and a broader perspective on technology, I moved to the United States in 2022.
                            This transition wasn't just geographical; it was professional. It exposed me to high-scale distributed systems
                            and the rigorous standards of enterprise software development.
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
                            Ownership & Scale
                        </h2>
                        <p className="text-lg text-muted-foreground leading-loose">
                            At Paycom, I learned that being a Senior Engineer isn't just about writing code—it's about <strong>ownership</strong>.
                            I transitioned from simply implementing features to designing end-to-end architectures for payroll systems that handle millions of transactions.
                            I strive to build resilient, fault-tolerant services that users can rely on, day in and day out.
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
                                <span className="text-green-500 font-bold">✓</span>
                                <span className="text-muted-foreground">Deep expertise in backend scalability (Kafka, Redis, partitioning strategies).</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-500 font-bold">✓</span>
                                <span className="text-muted-foreground">A product-first mindset: I build to solve real user problems.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-500 font-bold">✓</span>
                                <span className="text-muted-foreground">Cross-functional leadership: Bridging the gap between Product, QA, and Engineering.</span>
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
