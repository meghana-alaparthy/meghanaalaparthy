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


