import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  desc: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  /** 主色调 — 影响光晕颜色 */
  tone?: 'amber' | 'violet' | 'steel';
  children?: React.ReactNode;
}

const TONE_GLOW: Record<NonNullable<PageHeroProps['tone']>, string> = {
  amber:
    'bg-[radial-gradient(ellipse_at_top_left,rgba(229,161,0,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(109,40,217,0.10),transparent_55%)]',
  violet:
    'bg-[radial-gradient(ellipse_at_top_left,rgba(109,40,217,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(229,161,0,0.10),transparent_55%)]',
  steel:
    'bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(109,40,217,0.10),transparent_55%)]',
};

export function PageHero({
  eyebrow,
  title,
  desc,
  primaryCta,
  secondaryCta,
  tone = 'violet',
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className={cn('pointer-events-none absolute inset-0', TONE_GLOW[tone])} />
      <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-20">
        <div className="animate-fade-in">
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            {eyebrow}
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-ink-muted">{desc}</p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && (
                <Link
                  to={primaryCta.to}
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-accent-amber px-6 text-sm font-medium text-bg hover:bg-accent-amber/90"
                >
                  {primaryCta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  to={secondaryCta.to}
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-border-strong bg-bg-surface px-6 text-sm font-medium text-ink hover:border-accent-violet/60 hover:bg-bg-elevated"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
        {children && <div className="animate-fade-in">{children}</div>}
      </div>
    </section>
  );
}
