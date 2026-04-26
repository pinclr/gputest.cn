import { useEffect, useState } from 'react';
import { RollingNumber } from '@/components/effects/RollingNumber';
import { cn } from '@/lib/utils';

interface Metric {
  label: string;
  unit?: string;
  pillar: 'stability' | 'performance' | 'quality' | 'neutral';
  /** 初始值 */
  init: number;
  /** 每个 tick 的随机增量函数 */
  step: () => number;
  /** 千分位 */
  sep?: boolean;
  pad?: number;
}

const PILLAR_DOT: Record<Metric['pillar'], string> = {
  stability: 'bg-pillar-stability',
  performance: 'bg-pillar-performance',
  quality: 'bg-pillar-quality',
  neutral: 'bg-ink-muted',
};

const metrics: Metric[] = [
  {
    label: '累计测试卡数',
    pillar: 'neutral',
    init: 14826,
    step: () => Math.floor(Math.random() * 3),
    sep: true,
  },
  {
    label: '累计跑测时长',
    unit: 'h',
    pillar: 'stability',
    init: 81920,
    step: () => Math.floor(Math.random() * 5),
    sep: true,
  },
  {
    label: '在跑节点',
    pillar: 'performance',
    init: 38,
    step: () => (Math.random() > 0.5 ? 1 : -1),
    pad: 3,
  },
  {
    label: '本月模型质量评测',
    pillar: 'quality',
    init: 127,
    step: () => (Math.random() > 0.6 ? 1 : 0),
    pad: 4,
  },
];

export function LiveStrip() {
  const [values, setValues] = useState(() => metrics.map((m) => m.init));

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interval = reduced ? 4000 : 1500 + Math.random() * 800;
    const id = window.setInterval(() => {
      setValues((prev) => prev.map((v, i) => Math.max(0, v + metrics[i].step())));
    }, interval);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-md border border-border bg-bg-surface/60 px-4 py-2.5 backdrop-blur md:gap-6">
      <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-dim">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-ok opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status-ok" />
        </span>
        Live
      </div>
      {metrics.map((m, i) => (
        <div key={m.label} className="flex items-center gap-2">
          <span className={cn('h-1.5 w-1.5 rounded-full', PILLAR_DOT[m.pillar])} />
          <span className="text-[11px] uppercase tracking-widest text-ink-dim">{m.label}</span>
          <RollingNumber
            value={values[i]}
            separator={m.sep}
            pad={m.pad}
            className="text-sm font-semibold text-ink"
          />
          {m.unit && <span className="text-[11px] text-ink-dim">{m.unit}</span>}
        </div>
      ))}
    </div>
  );
}
