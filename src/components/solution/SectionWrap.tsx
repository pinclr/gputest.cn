import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionWrap({
  eyebrow,
  title,
  desc,
  children,
  alt,
  id,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  children: ReactNode;
  alt?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn('border-t border-border', alt && 'bg-bg-surface/40')}
    >
      <div className="container-x py-16 lg:py-20">
        <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
          {eyebrow}
        </div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        {desc && <p className="mt-3 max-w-3xl text-ink-muted">{desc}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
