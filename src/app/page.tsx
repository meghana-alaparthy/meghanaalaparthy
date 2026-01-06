import { Hero } from "@/components/Hero";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground animate-in fade-in duration-500">
            <Hero />

            {/* Featured Entry Points */}
            <section className="py-20 bg-secondary/30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Explore My Work</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

                        <Link href="/resume" className="group p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Experience & Skills</h3>
                            <p className="text-muted-foreground mb-6">Deep dive into my professional journey at Paycom and my technical stack.</p>
                            <div className="flex items-center justify-center text-primary font-medium">
                                View Resume <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link href="/achievements" className="group p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Achievements</h3>
                            <p className="text-muted-foreground mb-6">Awards, Hackathons, and Recognitions I've received over the years.</p>
                            <div className="flex items-center justify-center text-primary font-medium">
                                View Awards <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link href="/blog" className="group p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Technical Writing</h3>
                            <p className="text-muted-foreground mb-6">Thoughts on scalability, microservices, and modern web development.</p>
                            <div className="flex items-center justify-center text-primary font-medium">
                                Read Blog <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 text-center text-muted-foreground text-sm border-t border-border bg-background">
                <p>© {new Date().getFullYear()} Meghana Alaparthy. Built with Next.js & Tailwind.</p>
            </footer>
        </main>
    );
}
