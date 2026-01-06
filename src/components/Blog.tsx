"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog";
import { ArrowRight, Clock } from "lucide-react";

export function Blog() {
    return (
        <section id="blog" className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    Latest Articles
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col h-full bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all hover:border-primary/50 group cursor-pointer"
                        >
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                <time>{post.date}</time>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Clock size={12} />
                                    {post.readTime}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                {post.title}
                            </h3>

                            <p className="text-muted-foreground text-sm mb-4 flex-grow">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto flex items-center text-primary font-medium text-sm gap-2">
                                Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
