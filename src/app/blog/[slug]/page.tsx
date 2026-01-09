import { getPostBySlug, getAllPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import BlogClient from "./BlogClient";


export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return <BlogClient post={post} />;
}
