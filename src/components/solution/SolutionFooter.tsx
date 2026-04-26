import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Props {
  title?: string;
  desc?: string;
}

export function SolutionFooter({
  title = '想为这条业务线启动一个项目?',
  desc = '告诉我们集群规模、卡型与时间窗,24 小时内回复。',
}: Props) {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.16),transparent_60%)]" />
      <div className="container-x relative flex flex-col items-start gap-4 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 text-ink-muted">{desc}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-accent-amber px-6 text-sm font-medium text-bg hover:bg-accent-amber/90"
          >
            项目咨询 <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/methodology"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border-strong bg-bg-surface px-6 text-sm font-medium text-ink hover:border-accent-violet/60 hover:bg-bg-elevated"
          >
            看方法学
          </Link>
        </div>
      </div>
    </section>
  );
}
