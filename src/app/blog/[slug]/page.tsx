import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@hyper/ui";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { getBlogPost, getAllBlogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";
import { BlogPostContent } from "./blog-post-content";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug);
    if (!post) {
        return {};
    }
    return {
        title: `${post.title} | HyperTrader Blog`,
        description: post.excerpt,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return <BlogPostContent post={post} />;
}
