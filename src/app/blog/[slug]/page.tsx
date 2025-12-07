"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { PremiumCard } from "@/components/cards/PremiumCard";
import { getBlogPost } from "@/data/blog-posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="relative min-h-screen">
            {/* Hero Section */}
            <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 md:py-32">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />

                <Container className="relative z-10">
                    <div className="mx-auto max-w-4xl">
                        <Link
                            href="/blog"
                            className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Blog
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                                    {post.category}
                                </span>
                                <span className="text-sm text-slate-400">/</span>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </div>
                                <span className="text-sm text-slate-400">/</span>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <Clock className="h-4 w-4" />
                                    {post.readTime}
                                </div>
                            </div>

                            <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                                {post.title}
                            </h1>

                            <p className="text-xl leading-relaxed text-slate-300">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center gap-4 pt-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-white">{post.author}</div>
                                    <div className="text-sm text-slate-400">Research Lead</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Content Section */}
            <section className="relative py-16 md:py-24">
                <Container>
                    <div className="mx-auto max-w-4xl">
                        <PremiumCard
                            variant="glass-secondary"
                            accent="cyan"
                            className="p-8 md:p-12"
                        >
                            <article className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({ className, children, ref, ...props }) {
                                            const match = /language-(\w+)/.exec(className || "");
                                            return match ? (
                                                <SyntaxHighlighter
                                                    style={vscDarkPlus as any}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, "")}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                        table({ children }) {
                                            return (
                                                <div className="overflow-x-auto">
                                                    <table>{children}</table>
                                                </div>
                                            );
                                        },
                                    }}
                                >
                                    {post.content}
                                </ReactMarkdown>
                            </article>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-700">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Tag className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </PremiumCard>

                        {/* Navigation */}
                        <div className="mt-12 flex justify-center">
                            <Link
                                href="/blog"
                                className="group inline-flex items-center gap-2 rounded-full border-2 border-blue-200 bg-blue-50 px-8 py-4 font-semibold text-blue-700 transition-all duration-300 hover:border-blue-300 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-900/50"
                            >
                                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                                Read More Articles
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
