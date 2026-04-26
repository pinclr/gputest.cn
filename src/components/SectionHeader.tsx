import type { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  desc?: string;
  align?: 'left' | 'center';
  action?: ReactNode;
}

export function SectionHeader({ eyebrow, title, desc, align = 'left', action }: SectionHeaderProps) {
  return (
    <div
      className={
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'flex flex-col items-start justify-between gap-4 md:flex-row md:items-end'
      }
    >
      <div>
        <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
          {eyebrow}
        </div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        {desc && <p className="mt-3 max-w-2xl text-ink-muted">{desc}</p>}
      </div>
      {action}
    </div>
  );
}
