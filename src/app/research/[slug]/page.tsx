import { notFound } from "next/navigation";
import { allResearchNotes } from "contentlayer/generated";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Section } from "@hyper/ui";
import { Mdx } from "@/components/mdx";

type ResearchPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allResearchNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: ResearchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = allResearchNotes.find((entry) => entry.slug === slug);
  if (!note) {
    return {};
  }
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: `/research/${note.slug}` },
    openGraph: {
      title: note.title,
      description: note.description,
      type: "article",
      publishedTime: note.publishedAt,
      authors: note.author ? [note.author] : undefined,
    },
  };
}

export default async function ResearchNotePage({ params }: ResearchPageProps) {
  const { slug } = await params;
  const note = allResearchNotes.find((entry) => entry.slug === slug);
  if (!note) {
    notFound();
  }

  return (
    <div className="space-y-0">
      <PageHeader
        eyebrow="Research"
        title={note.title}
        description={note.description}
        kicker={note.status?.toUpperCase()}
      />
      <Section id="content" padding="compact">
        <article className="prose prose-slate max-w-3xl dark:prose-invert">
          <Mdx code={note.body.code} />
        </article>
      </Section>
    </div>
  );
}
