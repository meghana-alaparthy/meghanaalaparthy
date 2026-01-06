import { blogPosts } from "@/data/blog";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen pt-24 pb-20 bg-background text-foreground animate-in fade-in duration-500">
            <div className="container mx-auto px-4 max-w-3xl">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                <header className="mb-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-primary">{post.title}</h1>

                    <div className="flex items-center gap-6 text-muted-foreground text-sm">
                        <span className="flex items-center gap-2">
                            <Calendar size={16} />
                            {post.date}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock size={16} />
                            {post.readTime}
                        </span>
                    </div>
                </header>

                <div className="prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-primary max-w-none">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </div>
        </article>
    );
}
