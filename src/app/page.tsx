import { Hero } from "@/components/Hero";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Gamepad2, BookOpen, ScrollText } from "lucide-react";
import { resumeData } from "@/data/resume";

export default function Home() {
    return (
        <main className="min-h-screen bg-background font-sans">
            <Hero />

            {/* About & Core Tech Preview */}
            <section className="py-16 px-4 border-b border-border/40">
                <div className="container max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-foreground">About Me</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            I'm a <strong>Software Developer III at Paycom</strong> specializing in architecting high-scale distributed systems.
                            Currently targeting <strong>Senior (SDE IV)</strong> roles, I focus on building the backbone of payroll and HR operations for millions of users,
                            leveraging microservices, event-driven patterns with Kafka, and high-performance cloud infrastructure.
                        </p>
                        <Link href="/about" className="inline-flex items-center text-primary font-medium hover:underline">
                            Read about my technical journey <ArrowRight size={16} className="ml-1" />
                        </Link>

                        <div className="flex flex-wrap gap-4 text-sm font-medium text-foreground/80 pt-2">
                            <span className="bg-secondary px-3 py-1 rounded-md flex items-center gap-1.5">
                                <BadgeCheck size={14} className="text-blue-500" /> Professional SDE III
                            </span>
                            <span className="bg-secondary px-3 py-1 rounded-md">📍 Dallas, TX</span>
                            <span className="bg-secondary px-3 py-1 rounded-md">🚀 Platform & Architecture</span>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-foreground">Core Tech Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            {["Java", "Python", "PHP", "Spring Boot", "Microservices", "Azure", "React", "PostgreSQL", "Docker"].map(tech => (
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
                    <h2 className="text-3xl font-bold mb-10 text-center">Featured Case Studies</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {resumeData.projects.slice(0, 4).map((project, index) => (
                            <div key={index} className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                                <p className="text-muted-foreground mb-4 text-sm flex-grow">
                                    {project.description}
                                </p>
                                <div className="text-sm font-medium text-blue-600 mb-6">
                                    🚀 {project.outcome}
                                </div>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.techStack.map(tech => (
                                        <span key={tech} className="text-xs border px-2 py-1 rounded bg-secondary/50">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-border/50">
                                    <Link href="/achievements" className="text-primary text-sm font-medium hover:underline flex items-center">
                                        View Case Study <ArrowRight size={14} className="ml-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href="/achievements" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
                            View All Projects & Demos <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Visual Navigation Cards to key sections */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <Link href="/boggle/game" className="group block p-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-none hover:shadow-xl transition-all relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:bg-white/20 transition-colors" />
                            <div className="mb-4 p-3 bg-white/20 w-fit rounded-xl text-white">
                                <Gamepad2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Boggle Multiplayer</h3>
                            <p className="text-indigo-100 text-sm">Real-time room syncing & global leaderboard. Built with MongoDB.</p>
                        </Link>

                        <Link href="/blog" className="group block p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all">
                            <div className="mb-4 p-3 bg-primary/10 w-fit rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Technical Blog</h3>
                            <p className="text-muted-foreground text-sm">Deep dives into distributed systems and architectural patterns.</p>
                        </Link>

                        <Link href="/resume" className="group block p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all">
                            <div className="mb-4 p-3 bg-primary/10 w-fit rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <ScrollText size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Full Resume</h3>
                            <p className="text-muted-foreground text-sm">Download the formal PDF or view skills and work history.</p>
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
