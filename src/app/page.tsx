import { Hero } from "@/components/Hero";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <Hero />

            {/* About & Core Tech Preview */}
            <section className="py-16 px-4 border-b border-border/40">
                <div className="container max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-foreground">About Me</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            From Hyderabad to Dallas, my journey has been defined by a passion for building scalable systems.
                            As a <strong>Software Developer III</strong>, I specialize in backend architecture and high-throughput services.
                        </p>
                        <Link href="/about" className="inline-flex items-center text-primary font-medium hover:underline">
                            Read my full story <ArrowRight size={16} className="ml-1" />
                        </Link>

                        <div className="flex gap-4 text-sm font-medium text-foreground/80 pt-2">
                            <span className="bg-secondary px-3 py-1 rounded-md">📍 Dallas, TX</span>
                            <span className="bg-secondary px-3 py-1 rounded-md">💼 5 Years Exp.</span>
                            <span className="bg-secondary px-3 py-1 rounded-md">🚀 Backend & Platform</span>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-foreground">Core Tech Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            {["Java", "Spring Boot", "Kafka", "Microservices", "Azure", "React", "PostgreSQL", "Docker"].map(tech => (
                                <span key={tech} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Flagship Projects */}
            <section className="py-20 px-4 bg-secondary/30">
                <div className="container max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold mb-10 text-center">Flagship Projects</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Project 1 */}
                        <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold mb-2">High-Scale Payroll Engine</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Architected a distributed payroll processing module handling data for 1M+ employees.
                            </p>
                            <div className="text-sm font-medium text-green-600 mb-6">
                                🟢 Reduced processing time by 35% via parallelization
                            </div>
                            <div className="flex gap-2">
                                <span className="text-xs border px-2 py-1 rounded">C#</span>
                                <span className="text-xs border px-2 py-1 rounded">SQL</span>
                                <span className="text-xs border px-2 py-1 rounded">Redis</span>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold mb-2">Event-Driven Microservices Platform</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Decoupled legacy monolith into 12+ independently deployable services using Kafka.
                            </p>
                            <div className="text-sm font-medium text-blue-600 mb-6">
                                🔵 Achieved 99.99% system availability
                            </div>
                            <div className="flex gap-2">
                                <span className="text-xs border px-2 py-1 rounded">Kafka</span>
                                <span className="text-xs border px-2 py-1 rounded">Kubernetes</span>
                                <span className="text-xs border px-2 py-1 rounded">Java</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-10">
                        <a href="/resume" className="text-primary font-medium hover:underline">View All Projects →</a>
                    </div>
                </div>
            </section>

            {/* Visual Navigation Cards to key sections */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <Link href="/achievements" className="group block p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all">
                            <div className="mb-4 p-3 bg-primary/10 w-fit rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Achievements & Awards</h3>
                            <p className="text-muted-foreground">Recognition for technical excellence.</p>
                        </Link>

                        <Link href="/blog" className="group block p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all">
                            <div className="mb-4 p-3 bg-primary/10 w-fit rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Engineering Blog</h3>
                            <p className="text-muted-foreground">Technical deep-dives and system design.</p>
                        </Link>
                        <Link href="/resume" className="group block p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all">
                            <div className="mb-4 p-3 bg-primary/10 w-fit rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Full Resume</h3>
                            <p className="text-muted-foreground">Detailed experience and skills.</p>
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
