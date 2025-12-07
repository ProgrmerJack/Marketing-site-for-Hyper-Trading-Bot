import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getResearchPaper, getAllResearchPapers } from "@/data/research-papers";
import { ResearchPaperContent } from "./research-paper-content";

type ResearchPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const papers = getAllResearchPapers();
  return papers.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({ params }: ResearchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const paper = getResearchPaper(slug);
  if (!paper) {
    return {};
  }
  return {
    title: paper.title,
    description: paper.description,
    alternates: { canonical: `/research/${paper.slug}` },
    openGraph: {
      title: paper.title,
      description: paper.description,
      type: "article",
      publishedTime: paper.publishedAt,
      authors: paper.author ? [paper.author] : undefined,
    },
  };
}

export default async function ResearchNotePage({ params }: ResearchPageProps) {
  const { slug } = await params;
  const paper = getResearchPaper(slug);
  if (!paper) {
    notFound();
  }

  return <ResearchPaperContent paper={paper} />;
}
