import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Scenario {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export function Scenarios({
  items,
  tone = 'violet',
}: {
  items: Scenario[];
  tone?: 'amber' | 'violet' | 'steel' | 'quality';
}) {
  const toneColor = {
    amber: 'text-accent-amber bg-accent-amber/8',
    violet: 'text-accent-violet bg-accent-violet/8',
    steel: 'text-pillar-performance bg-pillar-performance/8',
    quality: 'text-pillar-quality bg-pillar-quality/8',
  }[tone];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((s) => (
        <div key={s.title} className="surface p-6">
          <div className={cn('inline-flex h-10 w-10 items-center justify-center rounded-md', toneColor)}>
            <s.icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-muted">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
