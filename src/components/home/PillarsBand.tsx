import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Gauge, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const pillars = [
  {
    key: 'stability',
    icon: ShieldCheck,
    title: '稳定性',
    en: 'Stability',
    desc: '基于 NVIDIA Field Diag、DCGM Diag、gpu-burn 等业界标准工具,叠加 168 小时真实负载 soak 与故障注入。',
    color: 'text-pillar-stability',
    border: 'border-pillar-stability/30',
    bg: 'bg-pillar-stability/5',
    href: '/methodology#stability',
  },
  {
    key: 'performance',
    icon: Gauge,
    title: '性能',
    en: 'Performance',
    desc: '对照厂商标称指标,覆盖单机算力、集群多机扩展效率与端到端时延,提供完整性能基线。',
    color: 'text-pillar-performance',
    border: 'border-pillar-performance/30',
    bg: 'bg-pillar-performance/5',
    href: '/methodology#performance',
  },
  {
    key: 'quality',
    icon: Sparkles,
    title: '模型质量',
    en: 'Model Quality',
    desc: '对照 NVIDIA H100 参考输出的 diff、量化精度损失、长上下文与跨硬件一致性,服务国产卡选型与迁移决策。',
    color: 'text-pillar-quality',
    border: 'border-pillar-quality/30',
    bg: 'bg-pillar-quality/5',
    href: '/methodology#quality',
  },
] as const;

export function PillarsBand() {
  return (
    <section className="border-b border-border bg-bg-surface/40">
      <div className="container-x py-16 lg:py-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
              三大支柱
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              一份报告，覆盖三个维度
            </h2>
            <p className="mt-3 max-w-2xl text-ink-muted">
              客户最关心的三个问题——会不会坏？跑得多快？输出对不对？我们用业界标准工具与自研方法学，对每一个维度给出可审计的答案。
            </p>
          </div>
          <Link
            to="/methodology"
            className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            完整方法学 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <Link
              key={p.key}
              to={p.href}
              className={cn(
                'group surface relative overflow-hidden p-6 transition-all hover:bg-bg-elevated',
                p.border,
              )}
            >
              <div className={cn('absolute inset-x-0 top-0 h-px', p.color.replace('text-', 'bg-'))} />
              <div className={cn('inline-flex h-10 w-10 items-center justify-center rounded-md', p.bg, p.color)}>
                <p.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                <span className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                  {p.en}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{p.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs text-ink-muted transition-colors group-hover:text-ink">
                查看 {p.title} 测试范围
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
