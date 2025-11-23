import { Container } from "@hyper/ui";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  kicker?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  kicker,
  children,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-[color:var(--color-line-muted)] bg-[rgb(var(--card))/0.7] py-24 dark:bg-slate-950/95">
      <Container className="relative z-10 flex flex-col gap-6">
        {eyebrow ? (
          <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--color-line-muted)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-primary)]">
            {eyebrow}
          </span>
        ) : null}
        {kicker ? (
          <p className="text-sm uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
            {kicker}
          </p>
        ) : null}
        <h1 className="relative z-20 max-w-3xl font-display text-4xl leading-tight tracking-tight text-slate-900 opacity-100 dark:text-white md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-black/70 dark:text-white/70">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(93,100,255,0.12),_transparent_60%)]"
      />
    </header>
  );
}
