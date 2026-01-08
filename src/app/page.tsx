import { Hero } from "@/components/Hero";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { resumeData } from "@/data/resume";

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
                        <Link href="/achievements" className="group block p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all">
                            <div className="mb-4 p-3 bg-primary/10 w-fit rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Awards & Recognition</h3>
                            <p className="text-muted-foreground">Some of the things I'm proud of outside of daily coding.</p>
                        </Link>

                        <Link href="/blog" className="group block p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all">
                            <div className="mb-4 p-3 bg-primary/10 w-fit rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">My Blog</h3>
                            <p className="text-muted-foreground">I write about technical stuff I find interesting and systems I've built.</p>
                        </Link>
                        <Link href="/resume" className="group block p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all">
                            <div className="mb-4 p-3 bg-primary/10 w-fit rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Full Resume</h3>
                            <p className="text-muted-foreground">The formal version of my work history and skills.</p>
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
