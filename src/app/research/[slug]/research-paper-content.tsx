"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Link from "next/link";
import type { Route } from "next";
import { ArrowLeft, Calendar, Tag, User, FileText, ChevronRight, ExternalLink, BookMarked, Share2, Copy, Twitter, Linkedin, Check, BookOpen } from "lucide-react";
import { Container } from "@hyper/ui";
import type { ResearchPaper } from "@/data/research-papers";
import { getAllResearchPapers } from "@/data/research-papers";
import { useState, useEffect, useRef } from "react";
import "katex/dist/katex.min.css";

interface ResearchPaperContentProps {
    paper: ResearchPaper;
}

export function ResearchPaperContent({ paper }: ResearchPaperContentProps) {
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

    // Get related papers
    const relatedPapers = getAllResearchPapers()
        .filter(p => p.slug !== paper.slug)
        .slice(0, 3);

    const publishDate = new Date(paper.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // Extract headings from content
    useEffect(() => {
        const extractedHeadings: { id: string; text: string; level: number }[] = [];
        const lines = paper.content.split('\n');
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
    }, [paper.content]);

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
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(paper.title)}`, '_blank');
    };

    const shareToLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Reading Progress Bar - Direct style binding for reliable tracking */}
            <div className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-slate-200/50 dark:bg-slate-800/50">
                <div
                    className={`h-full bg-gradient-to-r ${paper.gradient} transition-[width] duration-75 ease-out`}
                    style={{ width: `${scrollProgress * 100}%` }}
                />
            </div>

            {/* Ambient Background */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className={`absolute -top-1/2 left-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br ${paper.gradient} opacity-[0.04] blur-3xl dark:opacity-[0.08]`} 
                />
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`absolute -bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br ${paper.gradient} opacity-[0.03] blur-3xl dark:opacity-[0.06]`} 
                />
            </div>

            {/* Floating Decorative Elements */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute top-1/4 right-[10%] h-32 w-32 rounded-full bg-gradient-to-br ${paper.gradient} opacity-10 blur-2xl`}
                />
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute bottom-1/3 left-[5%] h-40 w-40 rounded-full bg-gradient-to-br ${paper.gradient} opacity-10 blur-2xl`}
                />
            </div>

            {/* Hero Section */}
            <section className="relative isolate overflow-hidden">
                {/* Gradient Hero Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${paper.gradient}`} />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Floating Elements */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 0.2, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute -right-10 top-1/4 h-72 w-72 rounded-full bg-white/20 blur-3xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -50 }}
                        animate={{ opacity: 0.15, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                        className="absolute -left-20 bottom-1/4 h-80 w-80 rounded-full bg-white/15 blur-3xl"
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
                                    <Link href="/research" className="text-white/60 transition-colors hover:text-white">
                                        Research
                                    </Link>
                                </li>
                                <ChevronRight className="h-3.5 w-3.5 text-white/40" />
                                <li className="text-white/80 font-medium truncate max-w-[200px]">
                                    Paper
                                </li>
                            </ol>
                        </motion.nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="space-y-6"
                        >
                            {/* Status & Type */}
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-black/10">
                                    <FileText className="h-4 w-4" />
                                    Research Paper
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/30 backdrop-blur-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-100 ring-1 ring-emerald-400/30">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                    {paper.status}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                                {paper.title}
                            </h1>

                            {/* Description */}
                            <p className="text-lg md:text-xl leading-relaxed text-white/85 max-w-3xl">
                                {paper.description}
                            </p>

                            {/* Meta Info & Share */}
                            <div className="flex flex-wrap items-center justify-between gap-6 pt-4 text-white/70">
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-white/60">Author</div>
                                            <div className="font-medium text-white">{paper.author}</div>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block h-8 w-px bg-white/20" />
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                                            <Calendar className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-white/60">Published</div>
                                            <div className="font-medium text-white">{publishDate}</div>
                                        </div>
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

                            {/* Tags */}
                            {paper.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {paper.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-white/90 ring-1 ring-white/10 transition-all hover:bg-white/15 hover:ring-white/20"
                                        >
                                            <Tag className="h-3 w-3" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
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
                                <article ref={articleRef} className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-slate-950/50">
                                    {/* Decorative top gradient */}
                                    <div className={`h-1.5 bg-gradient-to-r ${paper.gradient}`} />
                                    
                                    <div className="p-6 sm:p-8 md:p-12 lg:p-16">
                                        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-3 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 dark:prose-strong:text-white prose-code:before:content-none prose-code:after:content-none prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium prose-code:text-slate-700 dark:prose-code:text-slate-300 prose-li:marker:text-slate-400 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-950/30 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300 prose-table:text-sm prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-th:font-semibold prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3 prose-tr:border-b prose-tr:border-slate-200 dark:prose-tr:border-slate-700">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm, remarkMath]}
                                                rehypePlugins={[rehypeKatex]}
                                                components={{
                                                    code(props) {
                                                        const { children, className, ...rest } = props;
                                                        const match = /language-(\w+)/.exec(className || "");
                                                        const codeString = String(children).replace(/\n$/, "");
                                                        
                                                        if (match) {
                                                            return (
                                                                <div className="not-prose my-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
                                                                    <div className="flex items-center justify-between bg-slate-800 px-4 py-2.5 border-b border-slate-700">
                                                                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{match[1]}</span>
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
                                                                        {codeString}
                                                                    </SyntaxHighlighter>
                                                                </div>
                                                            );
                                                        }
                                                        return (
                                                            <code className={className} {...rest}>
                                                                {children}
                                                            </code>
                                                        );
                                                    },
                                                    table(props) {
                                                        return (
                                                            <div className="not-prose my-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-md">
                                                                <table className="w-full" {...props} />
                                                            </div>
                                                        );
                                                    },
                                                    h2({ children }) {
                                                        const text = String(children);
                                                        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                                        return (
                                                            <h2 id={id} className="flex items-center gap-3 scroll-mt-24">
                                                                <span className={`h-6 w-1 rounded-full bg-gradient-to-b ${paper.gradient}`} />
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
                                                    a(props) {
                                                        const { href, children, ...rest } = props;
                                                        if (href?.startsWith("/")) {
                                                            return (
                                                                <Link href={href as Route} {...rest}>
                                                                    {children}
                                                                </Link>
                                                            );
                                                        }
                                                        return (
                                                            <a
                                                                href={href}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                {...rest}
                                                            >
                                                                {children}
                                                                <ExternalLink className="ml-1 inline-block h-3 w-3" />
                                                            </a>
                                                        );
                                                    },
                                                }}
                                            >
                                                {paper.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </article>
                            </motion.div>

                            {/* Sidebar - Desktop Only */}
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
                                            <nav className="space-y-1 max-h-[300px] overflow-y-auto">
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

                                    {/* Quick Info Card */}
                                    <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
                                        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                                            <BookMarked className="h-4 w-4" />
                                            Paper Info
                                        </h3>
                                        <dl className="space-y-4 text-sm">
                                            <div>
                                                <dt className="text-slate-500 dark:text-slate-400">Status</dt>
                                                <dd className="mt-1 font-semibold text-emerald-600 dark:text-emerald-400 capitalize">{paper.status}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-slate-500 dark:text-slate-400">Published</dt>
                                                <dd className="mt-1 font-medium text-slate-900 dark:text-white">{publishDate}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-slate-500 dark:text-slate-400">Author</dt>
                                                <dd className="mt-1 font-medium text-slate-900 dark:text-white">{paper.author}</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    {/* Share Card */}
                                    <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
                                        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                                            <Share2 className="h-4 w-4" />
                                            Share Paper
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

                                    {/* CTA Card */}
                                    <div className={`rounded-2xl bg-gradient-to-br ${paper.gradient} p-6 text-white shadow-xl`}>
                                        <h3 className="font-bold text-lg mb-2">Interested in our research?</h3>
                                        <p className="text-white/80 text-sm mb-4">Get access to full methodology and performance data.</p>
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30"
                                        >
                                            Request Access
                                            <ExternalLink className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.aside>
                        </div>

                        {/* Related Papers */}
                        {relatedPapers.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="mt-16"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Related Research</h2>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {relatedPapers.map((relatedPaper) => (
                                        <Link
                                            key={relatedPaper.slug}
                                            href={`/research/${relatedPaper.slug}`}
                                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900/80"
                                        >
                                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${relatedPaper.gradient}`} />
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 text-emerald-700 dark:text-emerald-400">
                                                    {relatedPaper.status}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {relatedPaper.title}
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                                {relatedPaper.description}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* Back Navigation */}
                        <div className="mt-12 flex justify-center">
                            <Link
                                href="/research"
                                className={`group inline-flex items-center gap-3 rounded-full bg-gradient-to-r ${paper.gradient} px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5`}
                            >
                                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                                Explore More Research
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
