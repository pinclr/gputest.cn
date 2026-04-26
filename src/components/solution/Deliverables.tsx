import { Check } from 'lucide-react';

export interface Deliverable {
  title: string;
  desc: string;
}

export function Deliverables({ items }: { items: Deliverable[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((d) => (
        <div key={d.title} className="surface flex items-start gap-3 p-5">
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-status-ok/15 text-status-ok">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <div>
            <h4 className="text-sm font-semibold">{d.title}</h4>
            <p className="mt-1 text-sm leading-6 text-ink-muted">{d.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
