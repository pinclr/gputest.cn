import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { MatrixGrid } from '@/components/matrix/MatrixGrid';
import { DigitRain } from '@/components/effects/DigitRain';
import { LiveStrip } from '@/components/home/LiveStrip';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* 背景层：数字雨（最底）+ 渐变光晕 + 收尾遮罩 */}
      <div className="pointer-events-none absolute inset-0">
        <DigitRain className="opacity-[0.32]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(109,40,217,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(229,161,0,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,22,40,0.55)_0%,rgba(10,22,40,0.35)_40%,rgba(10,22,40,0.85)_100%)]" />
      </div>

      <div className="container-x relative grid items-center gap-12 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-28">
        {/* 左：文案 + CTA */}
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink-muted backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-amber" />
            GPU 集群测试 · 第三方独立
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-6xl">
            核验
            <span className="bg-gradient-to-r from-accent-amber via-accent-violet to-accent-violet bg-clip-text text-transparent">
              每一颗芯
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-7 text-ink-muted">
            稳定性 · 性能 · 模型质量,单机与集群两层级。
            <br className="hidden md:block" />
            覆盖 AIDC 项目验收至单机批量测试的完整链路,出具可签字、可审计的中立第三方报告。
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex h-12 items-center gap-2 rounded-md bg-accent-amber px-6 text-sm font-medium text-bg transition-colors hover:bg-accent-amber/90"
            >
              项目咨询
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/self-serve"
              className="inline-flex h-12 items-center gap-2 rounded-md border border-border-strong bg-bg-surface/60 px-6 text-sm font-medium text-ink backdrop-blur transition-colors hover:border-accent-violet/60 hover:bg-bg-elevated"
            >
              <Zap className="h-4 w-4 text-accent-violet" />
              自助跑测
            </Link>
          </div>

          {/* 实时状态条 — 滚动反转计数 */}
          <div className="mt-9">
            <LiveStrip />
          </div>

          {/* 信任锚 */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-dim">
            <span className="font-mono uppercase tracking-widest text-ink-muted">方法学对齐</span>
            <span>NVIDIA Field Diag</span>
            <span className="text-border-strong">·</span>
            <span>DCGM Diag</span>
            <span className="text-border-strong">·</span>
            <span>MLPerf</span>
            <span className="text-border-strong">·</span>
            <span>NCCL-tests</span>
            <span className="text-border-strong">·</span>
            <span>OpenCompass</span>
          </div>
        </div>

        {/* 右：3×2 测试矩阵 */}
        <div className="relative animate-fade-in">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-accent-violet/10 via-transparent to-accent-amber/10 blur-2xl" />
          <div className="relative rounded-xl border border-border bg-bg-surface/70 p-5 backdrop-blur lg:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
                测试体系 · 3×2 矩阵
              </div>
              <div className="font-mono text-[10px] text-ink-dim">hover 查看详情</div>
            </div>
            <MatrixGrid density="compact" />
          </div>
        </div>
      </div>
    </section>
  );
}
