import { getPostBySlug, getAllPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import BlogClient from "./BlogClient";

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return <BlogClient post={post} />;
}
