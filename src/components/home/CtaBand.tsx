import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.18),transparent_60%)]" />
      <div className="container-x relative py-20 text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          为下一批 GPU 交付,启动一次专业验收
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-ink-muted">
          提交集群规模、卡型与期望时间窗,24 小时内反馈方案与报价区间。
        </p>
        <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-accent-amber px-7 text-sm font-medium text-bg transition-colors hover:bg-accent-amber/90"
          >
            项目咨询 <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/resources"
            className="inline-flex h-12 items-center gap-2 rounded-md border border-border-strong bg-bg-surface/60 px-7 text-sm font-medium text-ink hover:border-accent-violet/60 hover:bg-bg-elevated"
          >
            下载样例报告
          </Link>
        </div>
        <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-ink-dim">
          北京品晰科技有限公司 · GPUTest 核芯
        </div>
      </div>
    </section>
  );
}
