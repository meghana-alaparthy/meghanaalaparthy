"use client";

import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Linkedin, Twitter, Instagram, Send, Coffee } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

interface BlogClientProps {
    post: {
        slug: string;
        title: string;
        date: string;
        readTime: string;
        excerpt: string;
        tags: string[];
        content: string;
    };
}

export default function BlogClient({ post }: BlogClientProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const readingPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        return readingPercent.on("change", (latest) => {
            setPercent(Math.round(latest));
        });
    }, [readingPercent]);

    const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);

    useEffect(() => {
        if (post) {
            const headings = post.content.match(/^#{2,3} .+/gm);
            if (headings) {
                const extractedToc = headings.map(heading => {
                    const level = heading.startsWith('###') ? 3 : 2;
                    const text = heading.replace(/^#{2,3} /, '');
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return { id, text, level };
                });
                setToc(extractedToc);
            }
        }
    }, [post]);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = post.title;

    const socialLinks = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            color: "hover:bg-[#0077b5]"
        },
        {
            name: "X",
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
            color: "hover:bg-black"
        },
        {
            name: "WhatsApp",
            icon: Send,
            url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`,
            color: "hover:bg-[#25D366]"
        },
        {
            name: "Instagram",
            icon: Instagram,
            url: `https://www.instagram.com/`,
            color: "hover:bg-[#E1306C]"
        }
    ];

    return (
        <main className="min-h-screen pt-24 pb-20 bg-background text-foreground">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1.5 bg-secondary/30 z-[60]">
                <motion.div
                    className="h-full bg-primary origin-left shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    style={{ scaleX }}
                />
                <div className="absolute top-4 right-6 text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 backdrop-blur-sm">
                    {percent}% READ
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Sidebar: Share Links (Sticky) */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-32 flex flex-col gap-6 items-center">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black mb-2 [writing-mode:vertical-lr]">Share Article</span>
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-4 rounded-xl bg-secondary/50 text-muted-foreground transition-all duration-300 transform hover:scale-110 hover:text-white ${link.color} shadow-sm border border-border/50`}
                                    title={`Share on ${link.name}`}
                                >
                                    <link.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <article className="lg:col-span-8">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-12 group text-sm font-bold uppercase tracking-widest"
                        >
                            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Engineering Blog
                        </Link>

                        <header className="mb-16">
                            <div className="flex flex-wrap gap-3 mb-8">
                                {post.tags.map(tag => (
                                    <span key={tag} className="px-4 py-1.5 bg-primary/5 text-primary rounded-full text-[10px] uppercase tracking-[0.1em] font-black border border-primary/10">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-10 leading-[1.1] tracking-tighter text-foreground">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-10 py-8 border-y border-border/40">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary font-bold overflow-hidden border-2 border-primary/20 shadow-inner">
                                        <img src="/HeadShot.jpg" alt="Meghana" className="object-cover w-full h-full" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                        <User size={28} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Author</div>
                                        <div className="text-lg font-black tracking-tight">Meghana Alaparthy</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-10 text-muted-foreground text-sm font-medium">
                                    <span className="flex items-center gap-3">
                                        <Calendar size={18} className="text-primary" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-3">
                                        <Clock size={18} className="text-primary" />
                                        {post.readTime}
                                    </span>
                                </div>
                            </div>
                        </header>

                        <div className="prose prose-xl prose-slate dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-black prose-code:text-primary prose-pre:bg-secondary/30 prose-pre:border prose-pre:border-border/50 max-w-none prose-img:rounded-3xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                            <ReactMarkdown
                                components={{
                                    h2: ({ children }) => {
                                        const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                                        return <h2 id={id} className="pt-20 scroll-mt-32 text-4xl font-black tracking-tight border-t border-border/30 mt-20 mb-10">{children}</h2>;
                                    },
                                    h3: ({ children }) => {
                                        const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                                        return <h3 id={id} className="pt-8 scroll-mt-32 text-2xl font-bold mb-6">{children}</h3>;
                                    },
                                    p: ({ children }) => <p className="mb-8 leading-relaxed text-lg">{children}</p>,
                                    ul: ({ children }) => <ul className="mb-10 space-y-4 list-disc pl-6">{children}</ul>,
                                    li: ({ children }) => <li className="text-muted-foreground leading-relaxed">{children}</li>
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        <div className="mt-20 p-10 rounded-3xl bg-secondary/20 border border-primary/10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                            <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                                <Coffee size={32} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black mb-2">Enjoyed this deep dive?</h4>
                                <p className="text-muted-foreground max-w-md">
                                    I regularly write about distributed systems, performance tuning, and the challenges of scale. Let's connect on LinkedIn to discuss more!
                                </p>
                            </div>
                            <a
                                href="https://www.linkedin.com/in/meghanaalaparthy/"
                                target="_blank"
                                className="mt-4 md:mt-0 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                Let's Connect
                            </a>
                        </div>
                    </article>

                    {/* Right Sidebar: Table of Contents & Info */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32 space-y-12">
                            {toc.length > 0 && (
                                <div className="space-y-6">
                                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black border-l-4 border-primary pl-4">Table of Contents</h4>
                                    <nav className="flex flex-col gap-4">
                                        {toc.map((item) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className={`text-sm transition-all duration-300 hover:text-primary flex items-start gap-2 ${item.level === 3 ? 'pl-6 text-muted-foreground/60 scale-95 border-l border-border/50 ml-2' : 'text-muted-foreground font-bold'}`}
                                            >
                                                {item.level === 2 && <span className="text-primary opacity-30">#</span>}
                                                {item.text}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 shadow-sm">
                                <h4 className="text-sm font-black mb-4 flex items-center gap-3">
                                    <User size={16} className="text-primary" /> About the Author
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                                    Meghana is an SDE III at Paycom, specializing in high-performance cloud infrastructure and event-driven microservices.
                                </p>
                                <div className="flex gap-3">
                                    {socialLinks.slice(0, 2).map(link => (
                                        <a key={link.name} href={link.url} className="p-2 rounded-lg bg-white/50 border border-border hover:bg-white hover:text-primary transition-colors">
                                            <link.icon size={16} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
