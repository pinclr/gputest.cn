import { cn } from '@/lib/utils';

export interface TimelineStep {
  day: string;
  title: string;
  desc: string;
}

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="relative grid gap-0 md:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <div className="flex items-start gap-3 p-5">
            <div className="flex flex-col items-center">
              <div className="grid h-9 w-9 place-items-center rounded-full border border-border-strong bg-bg-elevated font-mono text-xs text-accent-amber">
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className="mt-2 hidden h-12 w-px bg-border md:block" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                {s.day}
              </div>
              <h4 className="mt-1 text-sm font-semibold">{s.title}</h4>
              <p className="mt-1 text-xs leading-5 text-ink-muted">{s.desc}</p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className={cn('absolute left-0 right-0 top-9 h-px bg-border md:block', 'hidden')} />
          )}
        </li>
      ))}
    </ol>
  );
}
