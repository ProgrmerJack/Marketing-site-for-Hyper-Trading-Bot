"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@hyper/ui";
import { Calendar, Clock, ArrowLeft, Tag, Share2, BookOpen, ChevronRight, Copy, Twitter, Linkedin, Check } from "lucide-react";
import type { BlogPost } from "@/data/blog-posts";
import { getAllBlogPosts } from "@/data/blog-posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useEffect, useRef } from "react";
import "katex/dist/katex.min.css";

interface BlogPostContentProps {
    post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
    const [copied, setCopied] = useState(false);
    const [shareMenuOpen, setShareMenuOpen] = useState(false);
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeHeading, setActiveHeading] = useState<string>("");
    const [scrollProgress, setScrollProgress] = useState(0);
    const articleRef = useRef<HTMLElement>(null);
    
    // Manual scroll progress tracking with requestAnimationFrame for smooth updates
    useEffect(() => {
        let ticking = false;
        
        const updateProgress = () => {
            // Use document.body as fallback, get total scrollable height
            const htmlElement = document.documentElement;
            const bodyElement = document.body;
            const maxScroll = Math.max(
                htmlElement.scrollHeight - htmlElement.clientHeight,
                bodyElement.scrollHeight - bodyElement.clientHeight
            );
            
            const scrollTop = window.scrollY || htmlElement.scrollTop;
            
            // Set progress to 0 if no scrollable area, otherwise calculate percentage
            if (maxScroll > 0) {
                const progress = scrollTop / maxScroll;
                setScrollProgress(Math.min(Math.max(progress, 0), 1));
            } else {
                // If page is still loading or no scrollable area, check again after a bit
                setScrollProgress(0);
            }
            ticking = false;
        };
        
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        };
        
        // Wait a bit for content to load before initial calculation
        const timer = setTimeout(updateProgress, 100);
        
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", updateProgress, { passive: true });
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", updateProgress);
        };
    }, []);

    // Get related posts
    const relatedPosts = getAllBlogPosts()
        .filter(p => p.slug !== post.slug && p.category === post.category)
        .slice(0, 3);

    const gradientMap: Record<string, string> = {
        "Research": "from-violet-600 via-purple-600 to-indigo-700",
        "Engineering": "from-cyan-600 via-blue-600 to-indigo-700",
        "Risk Management": "from-emerald-600 via-teal-600 to-cyan-700",
        "Compliance": "from-amber-600 via-orange-600 to-red-600",
        "Strategy": "from-pink-600 via-rose-600 to-red-600",
        "Infrastructure": "from-blue-600 via-indigo-600 to-violet-700",
        "Technical Deep Dives": "from-indigo-600 via-blue-600 to-cyan-700",
    };

    const gradient = gradientMap[post.category] || "from-blue-600 via-indigo-600 to-purple-700";

    // Extract headings from content
    useEffect(() => {
        const extractedHeadings: { id: string; text: string; level: number }[] = [];
        const lines = post.content.split('\n');
        lines.forEach(line => {
            const match = line.match(/^(#{2,3})\s+(.+)$/);
            if (match) {
                const level = match[1].length;
                const text = match[2];
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                extractedHeadings.push({ id, text, level });
            }
        });
        setHeadings(extractedHeadings);
    }, [post.content]);

    // Track active heading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -66% 0px' }
        );

        const headingElements = document.querySelectorAll('h2[id], h3[id]');
        headingElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [headings]);

    // Share functions
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    const copyLink = async () => {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareToTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`, '_blank');
    };

    const shareToLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Reading Progress Bar - Direct style binding for reliable tracking */}
            <div className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-slate-200/50 dark:bg-slate-800/50">
                <div
                    className={`h-full bg-gradient-to-r ${gradient} transition-[width] duration-75 ease-out`}
                    style={{ width: `${scrollProgress * 100}%` }}
                />
            </div>

            {/* Ambient Background */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className={`absolute -top-1/2 left-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br ${gradient} opacity-[0.03] blur-3xl dark:opacity-[0.07]`} 
                />
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="absolute -bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 opacity-[0.03] blur-3xl dark:opacity-[0.05]" 
                />
            </div>

            {/* Floating Decorative Elements */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute top-1/4 right-[10%] h-32 w-32 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-2xl`}
                />
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/3 left-[5%] h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 opacity-10 blur-2xl"
                />
            </div>

            {/* Hero Section */}
            <section className="relative isolate overflow-hidden">
                {/* Gradient Hero Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                
                {/* Floating Elements */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.15, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                        className="absolute -left-32 bottom-10 h-96 w-96 rounded-full bg-white/10 blur-3xl"
                    />
                </div>

                <Container className="relative z-10 py-16 md:py-24 lg:py-32">
                    <div className="mx-auto max-w-4xl">
                        {/* Breadcrumb */}
                        <motion.nav
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mb-8"
                        >
                            <ol className="flex items-center gap-2 text-sm">
                                <li>
                                    <Link href="/" className="text-white/60 transition-colors hover:text-white">
                                        Home
                                    </Link>
                                </li>
                                <ChevronRight className="h-3.5 w-3.5 text-white/40" />
                                <li>
                                    <Link href="/blog" className="text-white/60 transition-colors hover:text-white">
                                        Blog
                                    </Link>
                                </li>
                                <ChevronRight className="h-3.5 w-3.5 text-white/40" />
                                <li className="text-white/80 font-medium truncate max-w-[200px]">
                                    {post.title}
                                </li>
                            </ol>
                        </motion.nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="space-y-6"
                        >
                            {/* Category & Meta */}
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-black/10">
                                    <BookOpen className="h-4 w-4" />
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-4 text-white/70">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-sm">
                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <span className="text-white/40">•</span>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        <span className="text-sm">{post.readTime}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                                {post.title}
                            </h1>

                            {/* Excerpt */}
                            <p className="text-xl leading-relaxed text-white/80 max-w-3xl">
                                {post.excerpt}
                            </p>

                            {/* Author Card & Share */}
                            <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-white/30 to-white/10 text-xl font-bold text-white shadow-xl shadow-black/20 backdrop-blur-sm ring-2 ring-white/20">
                                            {post.author.charAt(0)}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-400 ring-2 ring-white/20" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white text-lg">{post.author}</div>
                                        <div className="text-sm text-white/60">Research Team Lead</div>
                                    </div>
                                </div>
                                
                                {/* Share Button with Dropdown */}
                                <div className="relative">
                                    <button 
                                        onClick={() => setShareMenuOpen(!shareMenuOpen)}
                                        className="hidden md:inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
                                    >
                                        <Share2 className="h-4 w-4" />
                                        Share
                                    </button>
                                    
                                    {shareMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 dark:bg-slate-800/95 dark:ring-white/10 overflow-hidden z-50"
                                        >
                                            <button
                                                onClick={copyLink}
                                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                                {copied ? 'Copied!' : 'Copy Link'}
                                            </button>
                                            <button
                                                onClick={shareToTwitter}
                                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                <Twitter className="h-4 w-4" />
                                                Share on X
                                            </button>
                                            <button
                                                onClick={shareToLinkedIn}
                                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                <Linkedin className="h-4 w-4" />
                                                Share on LinkedIn
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Content Section */}
            <section className="relative py-12 md:py-20">
                <Container>
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 lg:grid-cols-[1fr,280px]">
                            {/* Main Article */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                {/* Article Card */}
                                <article ref={articleRef} className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-slate-950/50">
                                    {/* Decorative top gradient */}
                                    <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
                                    
                                    <div className="p-8 md:p-12 lg:p-16">
                                        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 dark:prose-strong:text-white prose-code:before:content-none prose-code:after:content-none prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium prose-li:marker:text-slate-400 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-950/20 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-table:overflow-hidden prose-table:rounded-xl prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3 prose-tr:border-b prose-tr:border-slate-200 dark:prose-tr:border-slate-700">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm, remarkMath]}
                                                rehypePlugins={[rehypeKatex]}
                                                components={{
                                                    code({ className, children }) {
                                                        const match = /language-(\w+)/.exec(className || "");
                                                        return match ? (
                                                            <div className="not-prose my-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
                                                                <div className="flex items-center justify-between bg-slate-800 px-4 py-2 border-b border-slate-700">
                                                                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{match[1]}</span>
                                                                    <div className="flex gap-1.5">
                                                                        <div className="h-3 w-3 rounded-full bg-red-500/80" />
                                                                        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                                                        <div className="h-3 w-3 rounded-full bg-green-500/80" />
                                                                    </div>
                                                                </div>
                                                                <SyntaxHighlighter
                                                                    style={oneDark}
                                                                    language={match[1]}
                                                                    PreTag="div"
                                                                    customStyle={{
                                                                        margin: 0,
                                                                        borderRadius: 0,
                                                                        padding: "1.25rem",
                                                                        fontSize: "0.875rem",
                                                                        lineHeight: "1.7",
                                                                    }}
                                                                >
                                                                    {String(children).replace(/\n$/, "")}
                                                                </SyntaxHighlighter>
                                                            </div>
                                                        ) : (
                                                            <code className={className}>
                                                                {children}
                                                            </code>
                                                        );
                                                    },
                                                    table({ children }) {
                                                        return (
                                                            <div className="not-prose my-8 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-md">
                                                                <table className="w-full">{children}</table>
                                                            </div>
                                                        );
                                                    },
                                                    h2({ children }) {
                                                        const text = String(children);
                                                        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                                        return (
                                                            <h2 id={id} className="flex items-center gap-3 scroll-mt-24">
                                                                <span className={`h-8 w-1 rounded-full bg-gradient-to-b ${gradient}`} />
                                                                {children}
                                                            </h2>
                                                        );
                                                    },
                                                    h3({ children }) {
                                                        const text = String(children);
                                                        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                                        return (
                                                            <h3 id={id} className="scroll-mt-24">
                                                                {children}
                                                            </h3>
                                                        );
                                                    },
                                                }}
                                            >
                                                {post.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>

                                    {/* Tags Section */}
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="border-t border-slate-200 bg-slate-50/50 px-8 py-6 dark:border-slate-800 dark:bg-slate-900/50 md:px-12 lg:px-16">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                                                    <Tag className="h-4 w-4" />
                                                    <span>Tagged:</span>
                                                </div>
                                                {post.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:ring-slate-300 hover:shadow dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:ring-slate-600"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </article>
                            </motion.div>

                            {/* Sidebar - Table of Contents */}
                            <motion.aside
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="hidden lg:block"
                            >
                                <div className="sticky top-8 space-y-6">
                                    {/* Table of Contents */}
                                    {headings.length > 0 && (
                                        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
                                            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                                                <BookOpen className="h-4 w-4" />
                                                Contents
                                            </h3>
                                            <nav className="space-y-1">
                                                {headings.map((heading) => (
                                                    <a
                                                        key={heading.id}
                                                        href={`#${heading.id}`}
                                                        className={`block py-1.5 text-sm transition-colors ${
                                                            heading.level === 3 ? 'pl-4' : ''
                                                        } ${
                                                            activeHeading === heading.id
                                                                ? 'text-blue-600 dark:text-blue-400 font-medium'
                                                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                                        }`}
                                                    >
                                                        {heading.text}
                                                    </a>
                                                ))}
                                            </nav>
                                        </div>
                                    )}

                                    {/* Share Card */}
                                    <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
                                        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                                            <Share2 className="h-4 w-4" />
                                            Share Article
                                        </h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={copyLink}
                                                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                            </button>
                                            <button
                                                onClick={shareToTwitter}
                                                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                <Twitter className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={shareToLinkedIn}
                                                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                <Linkedin className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.aside>
                        </div>

                        {/* Related Articles */}
                        {relatedPosts.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="mt-16"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Related Articles</h2>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {relatedPosts.map((relatedPost) => (
                                        <Link
                                            key={relatedPost.slug}
                                            href={`/blog/${relatedPost.slug}`}
                                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900/80"
                                        >
                                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${relatedPost.gradient}`} />
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {new Date(relatedPost.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                            </div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* Back Navigation */}
                        <div className="mt-12 flex justify-center">
                            <Link
                                href="/blog"
                                className={`group inline-flex items-center gap-3 rounded-full bg-gradient-to-r ${gradient} px-8 py-4 font-semibold text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5`}
                            >
                                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                                Explore More Articles
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
