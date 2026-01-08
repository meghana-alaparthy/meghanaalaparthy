import { getAllPosts } from "@/data/blog";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export function Blog() {
    const blogPosts = getAllPosts();

    return (
        <section id="blog" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-black mb-12 text-center tracking-tight">
                    Engineering Insights
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="block group h-full">
                            <article className="flex flex-col h-full bg-card rounded-2xl border border-border/60 p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:border-primary/50 hover:-translate-y-2 relative overflow-hidden group">
                                {/* Decorative Gradient */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {post.tags?.slice(0, 2).map(tag => (
                                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/5 text-primary uppercase tracking-wider border border-primary/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h3>

                                <p className="text-muted-foreground text-sm mb-8 flex-grow line-clamp-4 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="pt-6 border-t border-border/50 flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <time className="font-medium">{post.date}</time>
                                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                        <span className="flex items-center gap-1 font-medium">
                                            <Clock size={12} className="text-primary" />
                                            {post.readTime}
                                        </span>
                                    </div>
                                    <div className="p-2 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
